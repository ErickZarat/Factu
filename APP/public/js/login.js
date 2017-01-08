function createSession(data){
  $.ajax({
    url: 'http://localhost:3000/session',
    data: data,
     type: 'POST',
     success: function(data){
       location.href = 'http://localhost:3000/facturas'
     },
     error: function(){
       alert('error en peticion');
     }
  });
}

$(document).ready(function(){
  $("#login" ).submit(function( event ) {

    $.ajax({
      url: 'http://localhost:3001/api/v1/login',
      data: {username: $('#txtUsername').val(), passwd: $('#txtPassword').val()},
       type: 'POST',
       success: function(data){
         window.localStorage.setItem('token', data.token);
         createSession(data.user);
       },
       error: function(){
         alert('error en peticion');
       }
    });

    event.preventDefault();
  });
});
