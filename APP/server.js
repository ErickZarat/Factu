/*
* Author : ErickZarat
*/
var express		  =	require('express');
var session		  =	require('express-session');
var bodyParser  = require('body-parser');
var path  			= require('path');
var cors 				= require('cors');
var multer      = require('multer');
var app			    =	express();
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + '/public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, 'fotoEmpresa');
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

//setting ejs engine, for views
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.use(cors());

//setting session params
// SECRET: $h@k3Tr3nd
app.use(session({secret: 'aa68852f213c0b7ddeccd80821e212ac',saveUninitialized: true,resave: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

var usrSession;


app.get('/',function(req,res){
  sess = req.session;
  if(sess.usr){
    if( sess.rolNombre == 'ADMIN' || sess.rolNombre == 'COMUN' || sess.rolNombre == 'ADMINISTRATIVO') {
      res.render('facturas.html');
    } else {
      res.render('caja.html');
    }
  }
  else{ res.render('index.html'); }
});

app.post('/api/photo',function(req,res){
  upload(req,res,function(err) {
    if(err) {
      return res.end("Error uploading file." + err);
      res.redirect('/configuracion');
    }
    res.redirect('/configuracion');
  });
});


app.get('/facturas', function(req, res){
  sess = req.session;
  if(sess.usr){
    if( sess.rolNombre == 'ADMIN' || sess.rolNombre == 'COMUN' || sess.rolNombre == 'ADMINISTRATIVO') {
      res.render('facturas.html');
    } else {
      res.redirect('/');
    }
  }
  else{ res.redirect('/'); }
});

app.get('/generarfactura', function(req, res){
  if(req.session.usr){ res.render('facturagenerada.html'); }
  else{ res.redirect('/'); }
});

app.get('/agregarfactura', function(req, res){
  if(req.session.usr){
      res.render('agregarfactura.html');
  }
  else{ res.redirect('/'); }
});

app.get('/caja', function(req, res){
  sess = req.session;
  if(sess.usr){
    if( sess.rolNombre == 'ADMIN' || sess.rolNombre == 'OPERATIVO') {
      res.render('caja.html');
    } else {
      res.redirect('/');
    }
  }
  else{ res.redirect('/'); }
});

app.get('/productos', function(req, res){
  sess = req.session;
  if(sess.usr){
    if( sess.rolNombre == 'ADMIN' || sess.rolNombre == 'COMUN') {
      res.render('productos.html');
    }else {
      res.redirect('/');
    }
  }
  else{ res.redirect('/'); }
});

app.get('/clientes', function(req, res){
  sess = req.session;
  if(sess.usr){
    if( sess.rolNombre == 'ADMIN' || sess.rolNombre == 'COMUN') {
      res.render('clientes.html');
    }else {
      res.redirect('/');
    }
  }
  else{ res.redirect('/'); }
});

app.get('/usuarios', function(req, res){
  sess = req.session;
  if(sess.usr){
    if( sess.rolNombre == 'ADMIN') {
      res.render('usuarios.html');
    }else {
      res.redirect('/');
    }
  }
  else{ res.redirect('/'); }
});

app.get('/configuracion', function(req, res){
  sess = req.session;
  if(sess.usr){
    if(sess.rolNombre == 'ADMIN') {
      res.render('configuracion.html');
    }else {
      res.redirect('/');
    }
  }
  else{ res.redirect('/'); }
});

app.get('/cajachica', function(req, res){
  sess = req.session;
  if(sess.usr){
    if( sess.rolNombre == 'ADMIN' || sess.rolNombre == 'OPERATIVO') {
      res.render('cajaChica.html');
    }else {
      res.redirect('/');
    }
  }
  else{ res.redirect('/'); }
});

app.post('/session',function(req,res){
  usrSession=req.session;
  usrSession.name=req.body.nombre;
  usrSession.usr=req.body.username;
  usrSession.email=req.body.email;
  usrSession.rolNombre=req.body.rolNombre;
  res.redirect('/facturas');
});


app.get('/logout',function(req,res){

  req.session.destroy(function(err){
    if(err){ console.log(err); }
    else { res.redirect('/'); }
  });

});

///// DEVELOPMENT CONFIG
/*app.listen(3000, function(){
  console.log('Listen on port: 3000');
});*/

///// PRODUCTION CONFIG
var port = process.env.PORT || 3000;
app.listen(port,function(){
console.log("App Started on PORT " + process.env.PORT);
});
