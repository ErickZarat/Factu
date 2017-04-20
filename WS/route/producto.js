
var producto = {


  ////////////// REGISTRO DE PRODUCTO //////////////////////////////////////////
  agregar: function(req, res, data, connection){
    if (connection) {
      connection.query('INSERT INTO producto SET ?;',[data],
      function(error, resultado){
        if(error){
          res.json({"msg":"Producto no agregado" + error});
        }else {
          if (resultado.insertId > 0){
            res.json({"msg": "Agregado correctamente", "insertId": resultado.insertId});
          } else {
            res.json({"msg": "No se pudo agregar el producto"});
          }
        }
      });
    }},
    /////////////////////////////////////////////////////////////////////////////

    ///////////////// BUSQUEDA PRODUCTO ///////////////////////////////////////////
    buscar: function(req, res, data, connection){
      if (connection) {
        connection.query('SELECT p.id, p.cod,p.img, p.producto, p.estado AS idEstado, e.desc AS estado, p.agregado, p.precio FROM producto p, estado e where (cod like ? OR p.producto like ?) AND e.id =p.estado;',['%'+data+'%', '%'+data+'%'],
        function(error, resultado){
          if(error){
            res.json({"msg":"Error al buscar"+error});
          }else {
            if (typeof resultado == undefined || typeof resultado == 'undefined' ) { res.json({"msg":"No hay productos"}); }
            else{ res.json(resultado); }
          }
        });
      }
    },
    /////////////////////////////////////////////////////////////////////////////

    ///////////////// ELIMINAR PRODUCTO ///////////////////////////////////////////
    eliminar: function(req, res, id, connection){
      if (connection) {
        connection.query('DELETE FROM producto WHERE id=?;',id,
        function(error, resultado){
          if(error){
            res.json({"msg":"Error al ELIMINAR"});
          }else {
            if (typeof resultado == undefined || typeof resultado == 'undefined' ) { res.json({"msg":"No hay productos"}); }
            else{ res.json({"msg":"producto eliminado"}); }
          }
        });
      }
    },
    ////////////////////////////////////////////////////////////////////////////

    ///////////////// OBTENER TODO PRODUCTO ///////////////////////////////////
    obtener: function(req, res, connection){
      if (connection) {
        connection.query('SELECT p.id, p.cod,p.img, p.producto, p.estado AS idEstado, e.desc AS estado, p.agregado, p.precio FROM producto p, estado e WHERE e.id=p.estado;',
        function(error, resultado){
          if(error){
            res.json({"msg":"Error al obtener"});
          }else {
            if (typeof resultado == undefined || typeof resultado == 'undefined' ) { res.json({"msg":"No hay productos"}); }
            else{ res.json(resultado); }
          }
        });
      }
    },
    /////////////////////////////////////////////////////////////////////////////

    ///////////////// OBTENER POR ID PRODUCTO ///////////////////////////////////
    obtenerId: function(req, res, id, connection){
      if (connection) {
        connection.query('SELECT p.id, p.cod,p.img, p.producto, p.estado AS idEstado, e.desc AS estado, p.agregado, p.precio FROM producto p, estado e WHERE p.id=? AND p.estado=e.id;',id,
        function(error, resultado){
          if(error){
            res.json({"msg":"Error al obtener"});
          }else {
            if (typeof resultado == undefined || typeof resultado == 'undefined' ) { res.json({"msg":"No existe el producto"}); }
            else{ res.json(resultado[0]); }
          }
        });
      }
    },
    /////////////////////////////////////////////////////////////////////////////

    ////////////// MODICICACION DE PRODUCTO //////////////////////////////////////////
    modificar: function(req, res, data, connection){
      if (connection) {
        connection.query('UPDATE producto SET ? WHERE id=?;',[data, data.id],
        function(error, resultado){
          if(error){
            res.json({"msg":"Producto no modificado" + error});
          }else {
            if (resultado.updateId > 0 || resultado !== 'undefined'){
              res.json({"msg": "modificado correctamente"});
            } else {
              res.json({"msg": "No se pudo modificar el producto"});
            }
          }
        });
      }}
      /////////////////////////////////////////////////////////////////////////////


    };
    module.exports = producto;
