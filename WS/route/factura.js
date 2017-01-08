
var factura = {


  ////////////// REGISTRO DE FACTURA //////////////////////////////////////////
  agregar: function(req, res, data, connection){
    if (connection) {
      connection.query('INSERT INTO factura SET ?;',[data],
      function(error, resultado){
        if(error){
          res.json({"msg":"Factura no agregado" + error});
        }else {
          if (resultado.insertId > 0){
            res.json({"msg": "Agregado correctamente"});
          } else {
            res.json({"msg": "No se pudo agregar el factura"});
          }
        }
      });
    }},
    /////////////////////////////////////////////////////////////////////////////

    ///////////////// BUSQUEDA FACTURA ///////////////////////////////////////////
    buscar: function(req, res, data, connection){
      if (connection) {
        connection.query('SELECT f.id, f.cliente, c.nombre AS nombreCliente, c.telefono AS telCliente, f.vendedor, u.nombre AS nombreVendedor, f.estado, f.fecha, f.total FROM factura f, cliente c, usuario u where (f.id=? OR c.nombre like ?) AND c.id=f.cliente and u.id=f.vendedor ;',[data, '%'+data+'%'],
        function(error, resultado){
          if(error){
            res.json({"msg":"Error al buscar"});
          }else {
            if (typeof resultado == undefined || typeof resultado == 'undefined' ) { res.json({"msg":"No hay facturas"}); }
            else{ res.json(resultado); }
          }
        });
      }
    },
    /////////////////////////////////////////////////////////////////////////////

    ///////////////// ELIMINAR FACTURA ///////////////////////////////////////////
    eliminar: function(req, res, id, connection){
      if (connection) {
        connection.query('DELETE FROM factura WHERE id=?;',id,
        function(error, resultado){
          if(error){
            res.json({"msg":"Error al ELIMINAR"});
          }else {
            if (typeof resultado == undefined || typeof resultado == 'undefined' ) { res.json({"msg":"No hay facturas"}); }
            else{ res.json({"msg":"factura eliminado"}); }
          }
        });
      }
    },
    ////////////////////////////////////////////////////////////////////////////

    ///////////////// OBTENER TODO FACTURA ///////////////////////////////////
    obtener: function(req, res, connection){
      if (connection) {
        connection.query('SELECT f.id, f.cliente, c.nombre AS nombreCliente, c.telefono AS telCliente, f.vendedor, u.nombre AS nombreVendedor, f.estado, f.fecha, f.total FROM factura f, cliente c, usuario u where f.cliente=c.id AND u.id=f.vendedor;',
        function(error, resultado){
          if(error){
            res.json({"msg":"Error al obtener"});
          }else {
            if (typeof resultado == undefined || typeof resultado == 'undefined' ) { res.json({"msg":"No hay facturas"}); }
            else{ res.json(resultado); }
          }
        });
      }
    },
    /////////////////////////////////////////////////////////////////////////////

    ///////////////// OBTENER POR ID FACTURA ///////////////////////////////////
    obtenerId: function(req, res, id, connection){
      if (connection) {
        connection.query('SELECT f.id, f.cliente, c.nombre AS nombreCliente, c.telefono AS telCliente, f.vendedor, u.nombre AS nombreVendedor, f.estado, f.fecha, f.total FROM factura f, cliente c, usuario u where f.cliente=c.id AND u.id=f.vendedor AND f.id=?;',id,
        function(error, resultado){
          if(error){
            res.json({"msg":"Error al obtener"+error});
          }else {
            if (typeof resultado == undefined || typeof resultado == 'undefined' ) { res.json({"msg":"No existe el factura"}); }
            else{ res.json(resultado[0]); }
          }
        });
      }
    },
    /////////////////////////////////////////////////////////////////////////////

    ////////////// MODICICACION DE FACTURA //////////////////////////////////////////
    modificar: function(req, res, data, connection){
      if (connection) {
        connection.query('UPDATE factura SET ? WHERE id=?;',[data, data.id],
        function(error, resultado){
          if(error){
            res.json({"msg":"Factura no modificado" + error});
          }else {
            if (resultado.updateId > 0 || resultado !== 'undefined'){
              res.json({"msg": resultado});
            } else {
              res.json({"msg": "No se pudo modificar el factura"});
            }
          }
        });
      }}
      /////////////////////////////////////////////////////////////////////////////


    };
    module.exports = factura;
