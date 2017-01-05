/**
 * Author ErickZarat
 */
var ruta=require('express').Router();
    module.exports=(function(modelo){
        /*var usuario=require('../controller/ControladorUsuario.js')(modelo);
        var factura=require('../controller/ControladorFactura.js')(modelo);
        var estado=require('../controller/ControladorEstado.js')(modelo);
        var cajaChica=require('../controller/ControladorCajaChica.js')(modelo);
        var productos=require('../controller/ControladorProductos.js')(modelo);
        var cliente=require('../controller/ControladorCliente.js')(modelo);
        var configuracion=require('../controller/ControladorConfiguracion.js')(modelo);

        ruta.get('/',function(peticion,respuesta){
            respuesta.send("Servicio iniciado");
        });

        
            Rutas para Usuario


        ruta.post('/usuario/login',usuario.login);

        ruta.get('/token',usuario.tokenGenerator);

        //Token Validation
        ruta.use(usuario.tokenMiddleware);

        ruta.post('/usuario/registro',usuario.registro);

        ruta.get('/estado',estado.getAll);

        ruta.get('/factura/:id',factura.get);
        ruta.post('/factura',factura.add);
        ruta.put('/factura/:id',factura.edit);
        ruta.delete('/factura/:id', factura.delete);

        ruta.put('/cliente/:id',cliente.edit);
        ruta.post('/cliente',cliente.add);
        ruta.get('/cliente/:id',cliente.get);

        ruta.get('/apoyo/:id', apoyo.list);
        ruta.get('/categoria/:id', categoria.list);

        ruta.get('/problema/:id', problema.list);
        ruta.post('/problema',problema.add);

        ruta.get('/prueba/:id', prueba.list);
        ruta.post('/prueba', prueba.add);

        ruta.get('/solucion/:id', solucion.list);
        ruta.put('/solucion/:id',solucion.edit );
        ruta.post('/solucion', solucion.add);
        */
        return ruta;
});
