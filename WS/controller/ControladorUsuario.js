
var jwt=require('jsonwebtoken');
var conf=require('../conf.js');
module.exports=function (modelo) {
    return{
        prueba:function (req,res) {
            res.send("<h1>Its Works!</h1>");
        },
        login:function (req,res) {
            modelo.sequelize.query("CALL sp_autenticarUsuario('"+req.body.nick+"','"+req.body.contrasena+"');")
                .then(function (user) {
                    if(user.length>0)
                        res.json(genToken(user));
                    else
                        res.json({"user":[]});
                }).error(function (err) {
                    res.send({"mensaje":"Error "+err,"status":"500"});
            });
        },
        registro:function (req,res) {
            modelo.sequelize.query("CALL sp_registraUsuario('"+req.body.nombre+"','"+req.body.correo+"','"+req.body.facebook+"','"+req.body.telefono+"','"+req.body.fechaNacimiento+"','"+req.body.nick+"','"+req.body.contrasena+"','"+req.body.rol+"');")
                .then(function () {
                    res.send({"mensaje":"Registro insertado correctamente","status":"200"});
                }).error(function (err) {
                    res.send({"mensaje":"Error "+err,"status":"500"});
            });
        },
        tokenGenerator:function(req,res){
            res.send(genToken('admin'));
        },
        tokenMiddleware:function(req,res,next){
            var token=req.headers['x-access-token'] || req.body.token || req.query.token;
            if(token){
                jwt.verify(token,conf.secret,function(err,decoded){
                    if(err){
                        return res.status(403).send({
                            success:false,
                            message:'Fallo al validar token'
                        });
                    }
                    req.user=decoded;
                    next();
                });
            }else{
                return res.status(403).send({
                    success:false,
                    message:'No se proporciono token'
                });
            }
        }
    }
};
function expiresIn(dias){
    var dateObj=new Date();
    return dateObj.setDate(dateObj.getDate()+dias);
}
function genToken(user){
    var payload=jwt.sign({
            "company":"ShakeTrend"
        },
        conf.secret);
    var token={
        "token":payload,
        "user":user,
        "exp": expiresIn(1)
    }
    return token;
}
