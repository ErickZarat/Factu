
var prodfact = {


  ////////////// REGISTRO DE Producto a Factura //////////////////////////////////////////
  agregar: function(req, res, data, connection){
    if (connection) {
      connection.query('INSERT INTO prod_fact SET ?;',[data],
      function(error, resultado){
        if(error){
          res.json({"msg":"registro no agregado" + error});
        }else {
          if (resultado.insertId > 0){
            res.json({"msg": "Agregado correctamente"});
          } else {
            res.json({"msg": "No se pudo agregar el caja"});
          }
        }
      });
    }},
    /////////////////////////////////////////////////////////////////////////////

    ///////////////// ELIMINAR PRODUCTO DE FACTURA ///////////////////////////////////////////
    eliminar: function(req, res, id, connection){
      if (connection) {
        connection.query('DELETE FROM prod_fact WHERE id=?;',id,
        function(error, resultado){
          if(error){
            res.json({"msg":"Error al ELIMINAR"});
          }else {
            if (typeof resultado == undefined || typeof resultado == 'undefined' ) { res.json({"msg":"No hay cajas"}); }
            else{ res.json({"msg":"registro eliminado"}); }
          }
        });
      }
    },
    ////////////////////////////////////////////////////////////////////////////

    ///////////////// OBTENER POR ID Factura ///////////////////////////////////
    obtenerFac: function(req, res, fac, connection){
      if (connection) {
        connection.query('SELECT * FROM prod_fact f, producto p WHERE f.fact=? AND p.id=f.prod;',fac,
        function(error, resultado){
          if(error){
            res.json({"msg":"Error al obtener"});
          }else {
            if (typeof resultado == undefined || typeof resultado == 'undefined' ) { res.json({"msg":"No existe el caja"}); }
            else{ res.json(resultado); }
          }
        });
      }
    },
    /////////////////////////////////////////////////////////////////////////////
    };
    module.exports = prodfact;
