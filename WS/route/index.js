
var ruta = require('express').Router(),
    usuario = require('./usuario.js'),
    cliente = require('./cliente.js'),
    configuracion = require('./configuracion.js'),
    caja = require('./cajachica.js'),
    producto = require('./producto'),
    factura = require('./factura'),
    estado = require('./estado.js'),
    mysql = require('mysql'),
    parametros = {
    	host : 'localhost',
    	user : 'root',
    	password : 'admin',
    	database : 'factu'
    }

var connection = mysql.createConnection(parametros);

/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// USUARIO ///////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

ruta.post('/login', function(req, res){
  var usr = {
    username: req.body.username,
    passwd: req.body.passwd
  }
  usuario.login(req, res, usr ,connection);
})

/////// VALIDACION DE TOKEN /////////////////////
ruta.use( '/', function(req, res, next){
  usuario.tokenMiddleware(req, res, next);
});

////// REGISTRO DE USUARIO VALIDADAS ////////////
ruta.post('/usuario', function(req, res){
  var usr = {
    username:req.body.username,
    passwd:req.body.passwd,
    nombre:req.body.nombre,
    email:req.body.email,
    agregado:req.body.agregado
  }
  usuario.agregar(req, res, usr, connection);
});

////////////// BUSQUEDA DE USUARIO //////////////////
ruta.get('/usuario/buscar/:nombre', function(req, res){
  usuario.buscar(req, res, req.params.nombre, connection);
});

ruta.get('/usuario/:id', function(req, res){
  usuario.obtenerId(req, res, req.params.id, connection);
});

ruta.get('/usuario/', function(req, res){
  usuario.obtener(req, res, connection);
});

////////////// ELIMINAR USUARIO /////////////////////
ruta.delete('/usuario', function(req, res){
  usuario.eliminar(req, res, req.body.id, connection);
});

////////////// MODIFICAR USUARIO /////////////////////
ruta.put('/usuario/', function(req, res){
  var usr = {
    username:req.body.username,
    passwd:req.body.passwd,
    nombre:req.body.nombre,
    email:req.body.email,
    agregado:req.body.agregado,
    id: req.body.id
  }
  usuario.modificar(req, res, usr, connection);
});


/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// CLIENTE ///////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

////// REGISTRO DE CLIENTE ////////////
ruta.post('/cliente', function(req, res){
  var data = {
    nit:req.body.nit,
    nombre:req.body.nombre,
    telefono:req.body.telefono,
    direccion:req.body.direccion,
    estado:req.body.estado,
    agregado:req.body.agregado
  }
  cliente.agregar(req, res, data, connection);
});

////////////// BUSQUEDA DE CLIENTE //////////////////
ruta.get('/cliente/buscar/:nombre', function(req, res){
  cliente.buscar(req, res, req.params.nombre, connection);
});

ruta.get('/cliente/:id', function(req, res){
  cliente.obtenerId(req, res, req.params.id, connection);
});

ruta.get('/cliente/', function(req, res){
  cliente.obtener(req, res, connection);
});

////////////// ELIMINAR CLIENTE /////////////////////
ruta.delete('/cliente', function(req, res){
  cliente.eliminar(req, res, req.body.id, connection);
});

////////////// MODIFICAR CLIENTE /////////////////////
ruta.put('/cliente/', function(req, res){
  var data = {
    nit:req.body.nit,
    nombre:req.body.nombre,
    telefono:req.body.telefono,
    direccion:req.body.direccion,
    estado:req.body.estado,
    agregado:req.body.agregado,
    id: req.body.id
  }
  cliente.modificar(req, res, data, connection);
});

/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// CONFIGURACION /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


////////////// OBTENER CONFIGURACION /////////////////////
ruta.get('/configuracion/', function(req, res){
  configuracion.obtener(req, res, connection);
});

////////////// MODIFICAR CONFIGURACION /////////////////////
ruta.put('/configuracion/', function(req, res){
  var data = {
    id: req.body.id,
    nombre: req.body.nombre,
    telefono: req.body.telefono,
    email: req.body.email,
    iva: req.body.iva,
    moneda: req.body.moneda,
    direccion: req.body.direccion,
    ciudad: req.body.ciudad,
    region: req.body.region,
    codpostal: req.body.codpostal,
    img: req.body.img
  }
  configuracion.modificar(req, res, data, connection);
});
/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// ESTADO ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
ruta.get('/estado/categoria/:cate', function(req, res){
  estado.obtenerCat(req, res,req.params.cate, connection);
});

ruta.get('/estado/byid/:id', function(req, res){
  estado.obtenerId(req, res,req.params.id, connection);
});

/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// PRODUCTO //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// FACTURA ///////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// CAJA CHICA ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
module.exports = ruta;
