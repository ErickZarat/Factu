
var ruta = require('express').Router(),
    usuario = require('./usuario.js'),
    cliente = require('./cliente.js'),
    configuracion = require('./configuracion.js'),
    cajachica = require('./cajachica.js'),
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

////// REGISTRO DE PRODUCTO ////////////
ruta.post('/producto', function(req, res){
  var data = {
    cod:req.body.cod,
    producto:req.body.producto,
    estado:req.body.estado,
    agregado:req.body.agregado,
    precio:req.body.precio,
  }
  producto.agregar(req, res, data, connection);
});

////////////// BUSQUEDA DE PRODUCTO //////////////////
ruta.get('/producto/buscar/:prod', function(req, res){
  producto.buscar(req, res, req.params.prod, connection);
});

ruta.get('/producto/:id', function(req, res){
  producto.obtenerId(req, res, req.params.id, connection);
});

ruta.get('/producto/', function(req, res){
  producto.obtener(req, res, connection);
});

////////////// ELIMINAR PRODUCTO /////////////////////
ruta.delete('/producto', function(req, res){
  producto.eliminar(req, res, req.body.id, connection);
});

////////////// MODIFICAR PRODUCTO /////////////////////
ruta.put('/producto/', function(req, res){
  var data = {
    id:req.body.id,
    cod:req.body.cod,
    producto:req.body.producto,
    estado:req.body.estado,
    agregado:req.body.agregado,
    precio:req.body.precio,
  }
  producto.modificar(req, res, data, connection);
});


/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// FACTURA ///////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

////// REGISTRO DE FACTURA ////////////
ruta.post('/factura', function(req, res){
  var data = {
    fecha:req.body.fecha,
    cliente:req.body.cliente,
    vendedor: req.body.vendedor,
    estado: req.body.estado,
    total: req.body.total
  }
  factura.agregar(req, res, data, connection);
});

////////////// BUSQUEDA DE FACTURA //////////////////
ruta.get('/factura/buscar/:desc', function(req, res){
  factura.buscar(req, res, req.params.desc, connection);
});

ruta.get('/factura/:id', function(req, res){
  factura.obtenerId(req, res, req.params.id, connection);
});

ruta.get('/factura/', function(req, res){
  factura.obtener(req, res, connection);
});

////////////// ELIMINAR FACTURA /////////////////////
ruta.delete('/factura', function(req, res){
  factura.eliminar(req, res, req.body.id, connection);
});

////////////// MODIFICAR FACTURA /////////////////////
ruta.put('/factura/', function(req, res){
  var data = {
    id:req.body.id,
    fecha:req.body.fecha,
    cliente:req.body.cliente,
    vendedor: req.body.vendedor,
    estado: req.body.estado,
    total: req.body.total
  }
  factura.modificar(req, res, data, connection);
});

/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// CAJA CHICA ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
////// REGISTRO DE CAJA CHICA ////////////
ruta.post('/cajachica', function(req, res){
  var data = {
    desc:req.body.desc,
    fecha:req.body.fecha,
    gasto:req.body.gasto
  }
  cajachica.agregar(req, res, data, connection);
});

////////////// BUSQUEDA DE CAJA CHICA //////////////////
ruta.get('/cajachica/buscar/:desc', function(req, res){
  cajachica.buscar(req, res, req.params.desc, connection);
});

ruta.get('/cajachica/:id', function(req, res){
  cajachica.obtenerId(req, res, req.params.id, connection);
});

ruta.get('/cajachica/', function(req, res){
  cajachica.obtener(req, res, connection);
});

////////////// ELIMINAR CAJA CHICA /////////////////////
ruta.delete('/cajachica', function(req, res){
  cajachica.eliminar(req, res, req.body.id, connection);
});

////////////// MODIFICAR CAJA CHICA /////////////////////
ruta.put('/cajachica/', function(req, res){
  var data = {
    desc:req.body.desc,
    fecha:req.body.fecha,
    gasto:req.body.gasto,
    id: req.body.id
  }
  cajachica.modificar(req, res, data, connection);
});


/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
module.exports = ruta;
