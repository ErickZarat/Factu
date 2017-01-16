var apiServer = 'http://factuws-95180.app.xervo.io/api/v1/';
//var server = 'http://factu-95214.app.xervo.io/';
//var apiServer = 'http://localhost:3001/api/v1/';
var appServer = 'http://localhost:3000/'
var uri = {
  factura: appServer + 'facturas',
  session: appServer + 'session',
  login: apiServer + 'login',
  config: apiServer + 'configuracion'
}

function createSession(data){
  console.log(data);
  $.ajax({
    url: uri.session,
    data: data,
     type: 'POST',
     success: function(data){
       location.href = uri.factura
     },
     error: function(){
       alert('error en peticion');
     }
  });
}

$(document).ready(function(){


  $("#login" ).submit(function( event ) {
    $.ajax({
      url: uri.login,
      data: {username: $('#txtUsername').val(), passwd: $('#txtPassword').val()},
       type: 'POST',
       success: function(data){
         if(data.msg !== undefined) {
           Materialize.toast(data.msg + ', datos erroneos', 3000, 'rounded');
           return;
         }
         window.localStorage.setItem('token', data.token);
         window.localStorage.setItem('vendedorNombre', data.user.nombre);
         window.localStorage.setItem('vendedorId', data.user.id);
         window.localStorage.setItem('rolId', data.user.rolId);
         window.localStorage.setItem('rol', data.user.rolNombre);

         /////////////////////////////////////////////////////////////////
         ////////////////////// traer configuracion //////////////////////
         ////////////////////////////////////////////////////////////////
         $.ajax({
           url: uri.config,
           headers: {"x-access-token": window.localStorage.getItem('token')},
            type: 'GET',
            success: function(data){
              window.localStorage.setItem('config', JSON.stringify(data));
            },
            error: function(){
              alert('error en peticion');
            }
         });

         createSession(data.user);
       },
       error: function(){
         alert('error en peticion');
       }
    });

    event.preventDefault();
  });
});
