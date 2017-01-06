
var configuracion = {

  ///////////////// OBTENER TODO CONFIGURACION ///////////////////////////////////
  obtener: function(req, res, connection){
    if (connection) {
      connection.query('SELECT * FROM configuracion;',
      function(error, resultado){
        if(error){
          res.json({"msg":"Error al obtener"});
        }else {
          if (typeof resultado == undefined || typeof resultado == 'undefined' ) { res.json({"msg":"No hay configuracions"}); }
          else{ res.json(resultado[0]); }
        }
      });
    }
  },
  /////////////////////////////////////////////////////////////////////////////

  ////////////// MODICICACION DE CONFIGURACION //////////////////////////////////////////
  modificar: function(req, res, data, connection){
    if (connection) {
      connection.query('UPDATE configuracion SET ? WHERE id=1;',data,
      function(error, resultado){
        if(error){
          res.json({"msg":"Configuracion no modificado" + error});
        }else {
          if (resultado !== 'undefined'){
            res.json({"msg": "modificado correctamente"});
          } else {
            res.json({"msg": "No se pudo modificar el configuracion"}, resultado);
          }
        }
      });
    }
  }
  /////////////////////////////////////////////////////////////////////////////


};
module.exports = configuracion;
