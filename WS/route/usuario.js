
var jwt=require('jsonwebtoken');
var conf=require('../conf.js');

var usr = {

  ///////////////// INICIO DE SESION ///////////////////////////////////////////
  login: function(req, res, usuario, connection){
    if (connection) {
      connection.query('SELECT u.id, u.nombre, u.email, u.agregado, u.username, u.passwd, u.rol rolId, r.nombre rolNombre, r.descripcion rolDesc FROM usuario u, rol r WHERE u.rol = r.id AND username=? and passwd=?;', [usuario.username, usuario.passwd],
      function(error, resultado){
        if(error){
          res.json({"msg":"Usuario y/o clave incorrecta"});
        }else {
          if (typeof resultado[0] == undefined || typeof resultado[0] == 'undefined' ) { res.json({"msg":"Error al iniciar sesion"}); }
          else{ res.json(genToken(resultado[0])); }
        }
      });
    }
  },
  /////////////////////////////////////////////////////////////////////////////

  ////////////// REGISTRO DE USUARIO //////////////////////////////////////////
  agregar: function(req, res, data, connection){
    if (connection) {
      connection.query('INSERT INTO usuario SET ?;',[data],
      function(error, resultado){
        if(error){
          res.json({"msg":"Usuario no agregado" + error});
        }else {
          if (resultado.insertId > 0){
            res.json({"msg": "Agregado correctamente"});
          } else {
            res.json({"msg": "No se pudo agregar el usuario"});
          }
        }
      });
    }},
    /////////////////////////////////////////////////////////////////////////////

    ///////////////// BUSQUEDA USUARIO ///////////////////////////////////////////
    buscar: function(req, res, nombre, connection){
      if (connection) {
        connection.query('SELECT u.id, u.nombre, u.email, u.agregado, u.username, u.passwd, u.rol rolId, r.nombre rolNombre, r.descripcion rolDesc FROM usuario u, rol r WHERE u.rol = r.id AND u.nombre LIKE ?;','%'+nombre+'%',
        function(error, resultado){
          if(error){
            res.json({"msg":"Error al buscar"});
          }else {
            if (typeof resultado == undefined || typeof resultado == 'undefined' ) { res.json({"msg":"No hay usuarios"}); }
            else{ res.json(resultado); }
          }
        });
      }
    },
    /////////////////////////////////////////////////////////////////////////////

    ///////////////// ELIMINAR USUARIO ///////////////////////////////////////////
    eliminar: function(req, res, id, connection){
      if (connection) {
        connection.query('DELETE FROM usuario WHERE id=?;',id,
        function(error, resultado){
          if(error){
            res.json({"msg":"Error al ELIMINAR"});
          }else {
            if (typeof resultado == undefined || typeof resultado == 'undefined' ) { res.json({"msg":"No hay usuarios"}); }
            else{ res.json({"msg":"usuario eliminado"}); }
          }
        });
      }
    },
    ////////////////////////////////////////////////////////////////////////////

    ///////////////// OBTENER TODO USUARIO ///////////////////////////////////
    obtener: function(req, res, connection){
      if (connection) {
        connection.query('SELECT u.id, u.nombre, u.email, u.agregado, u.username, u.passwd, u.rol rolId, r.nombre rolNombre, r.descripcion rolDesc FROM usuario u, rol r WHERE u.rol = r.id;',
        function(error, resultado){
          if(error){
            res.json({"msg":"Error al obtener"});
          }else {
            if (typeof resultado == undefined || typeof resultado == 'undefined' ) { res.json({"msg":"No hay usuarios"}); }
            else{ res.json(resultado); }
          }
        });
      }
    },
    /////////////////////////////////////////////////////////////////////////////

    ///////////////// OBTENER POR ID USUARIO ///////////////////////////////////
    obtenerId: function(req, res, id, connection){
      if (connection) {
        connection.query('SELECT u.id, u.nombre, u.email, u.agregado, u.username, u.passwd, u.rol rolId, r.nombre rolNombre, r.descripcion rolDesc FROM usuario u, rol r WHERE u.rol = r.id and u.id=?;',id,
        function(error, resultado){
          if(error){
            res.json({"msg":"Error al obtener"});
          }else {
            if (typeof resultado == undefined || typeof resultado == 'undefined' ) { res.json({"msg":"No existe el usuario"}); }
            else{ res.json(resultado[0]); }
          }
        });
      }
    },
    /////////////////////////////////////////////////////////////////////////////

    ////////////// MODICICACION DE USUARIO //////////////////////////////////////////
    modificar: function(req, res, data, connection){
      if (connection) {
        connection.query('UPDATE usuario SET ? WHERE id=?;',[data, data.id],
        function(error, resultado){
          if(error){
            res.json({"msg":"Usuario no modificado" + error});
          }else {
            if (resultado.updateId > 0 || resultado !== 'undefined'){
              res.json({"msg": "modificado correctamente"});
            } else {
              res.json({"msg": "No se pudo modificar el usuario"});
            }
          }
        });
      }},
      /////////////////////////////////////////////////////////////////////////////

    /////////////// VALIDACION TOKEN MODDLEWARE /////////////////////////////////
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
    },
    ////////////////////////////////////////////////////////////////////////////
  };

  ///////////// CONFIGURACION DE TOKEN //////////////////////////////////////////
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
  ///////////////////////////////////////////////////////////////////////////////

  module.exports = usr;
