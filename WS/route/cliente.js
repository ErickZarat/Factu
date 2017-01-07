
var cliente = {


  ////////////// REGISTRO DE CLIENTE //////////////////////////////////////////
  agregar: function(req, res, data, connection){
    if (connection) {
      connection.query('INSERT INTO cliente SET ?;',[data],
      function(error, resultado){
        if(error){
          res.json({"msg":"Cliente no agregado" + error});
        }else {
          if (resultado.insertId > 0){
            res.json({"msg": "Agregado correctamente"});
          } else {
            res.json({"msg": "No se pudo agregar el cliente"});
          }
        }
      });
    }},
    /////////////////////////////////////////////////////////////////////////////

    ///////////////// BUSQUEDA CLIENTE ///////////////////////////////////////////
    buscar: function(req, res, nombre, connection){
      if (connection) {
        connection.query('SELECT c.id, c.nit, c.nombre, c.telefono, c.direccion, c.estado AS idEstado, e.desc AS estado, c.agregado FROM cliente c, estado e where nombre like ? AND  e.id=c.estado;',['%'+nombre+'%'],
        function(error, resultado){
          if(error){
            res.json({"msg":"Error al buscar"});
          }else {
            if (typeof resultado == undefined || typeof resultado == 'undefined' ) { res.json({"msg":"No hay clientes"}); }
            else{ res.json(resultado); }
          }
        });
      }
    },
    /////////////////////////////////////////////////////////////////////////////

    ///////////////// ELIMINAR CLIENTE ///////////////////////////////////////////
    eliminar: function(req, res, id, connection){
      if (connection) {
        connection.query('DELETE FROM cliente WHERE id=?;',id,
        function(error, resultado){
          if(error){
            res.json({"msg":"Error al ELIMINAR"});
          }else {
            if (typeof resultado == undefined || typeof resultado == 'undefined' ) { res.json({"msg":"No hay clientes"}); }
            else{ res.json({"msg":"cliente eliminado"}); }
          }
        });
      }
    },
    ////////////////////////////////////////////////////////////////////////////

    ///////////////// OBTENER TODO CLIENTE ///////////////////////////////////
    obtener: function(req, res, connection){
      if (connection) {
        connection.query('SELECT c.id, c.nit, c.nombre, c.telefono, c.direccion, c.estado AS idEstado, e.desc AS estado, c.agregado FROM cliente c, estado e WHERE c.estado=e.id;',
        function(error, resultado){
          if(error){
            res.json({"msg":"Error al obtener"});
          }else {
            if (typeof resultado == undefined || typeof resultado == 'undefined' ) { res.json({"msg":"No hay clientes"}); }
            else{ res.json(resultado); }
          }
        });
      }
    },
    /////////////////////////////////////////////////////////////////////////////

    ///////////////// OBTENER POR ID CLIENTE ///////////////////////////////////
    obtenerId: function(req, res, id, connection){
      if (connection) {
        connection.query('SELECT c.id, c.nit, c.nombre, c.telefono, c.direccion, c.estado AS idEstado, e.desc AS estado, c.agregado FROM cliente c, estado e WHERE c.estado=e.id AND c.id=?;',id,
        function(error, resultado){
          if(error){
            res.json({"msg":"Error al obtener"});
          }else {
            if (typeof resultado == undefined || typeof resultado == 'undefined' ) { res.json({"msg":"No existe el cliente"}); }
            else{ res.json(resultado[0]); }
          }
        });
      }
    },
    /////////////////////////////////////////////////////////////////////////////

    ////////////// MODICICACION DE CLIENTE //////////////////////////////////////////
    modificar: function(req, res, data, connection){
      if (connection) {
        connection.query('UPDATE cliente SET ? WHERE id=?;',[data, data.id],
        function(error, resultado){
          if(error){
            res.json({"msg":"Cliente no modificado" + error});
          }else {
            if (resultado.updateId > 0 || resultado !== 'undefined'){
              res.json({"msg": "modificado correctamente"});
            } else {
              res.json({"msg": "No se pudo modificar el cliente"});
            }
          }
        });
      }}
      /////////////////////////////////////////////////////////////////////////////


    };
    module.exports = cliente;
