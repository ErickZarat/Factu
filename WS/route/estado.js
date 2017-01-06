
var estado = {

  ///////////////// OBTENER TODO ESTADO ///////////////////////////////////
  obtenerCat: function(req, res, categoria, connection){
    if (connection) {
      connection.query('SELECT * FROM estado WHERE cat=?;',categoria,
      function(error, resultado){
        if(error){
          res.json({"msg":"Error al obtener " + error});
        }else {
          if (typeof resultado == undefined || typeof resultado == 'undefined' ) { res.json({"msg":"No hay estados"}); }
          else{ res.json(resultado); }
        }
      });
    }
  },
  /////////////////////////////////////////////////////////////////////////////
  ///////////////// OBTENER ID ESTADO ///////////////////////////////////
  obtenerId: function(req, res, id, connection){
    if (connection) {
      connection.query('SELECT * FROM estado WHERE id=?;', id,
      function(error, resultado){
        if(error){
          res.json({"msg":"Error al obtener"});
        }else {
          if (typeof resultado == undefined || typeof resultado == 'undefined' ) { res.json({"msg":"No hay estados"}); }
          else{ res.json(resultado[0]); }
        }
      });
    }
  },
  /////////////////////////////////////////////////////////////////////////////
};
module.exports = estado;
