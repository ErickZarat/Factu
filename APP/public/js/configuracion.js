var uri = apiServer+'configuracion';

$('#progressBar').show

$(document).ready(function(){
  $.ajax({
    url: uri,
    type: 'GET',
    headers: {"x-access-token": window.localStorage.getItem('token')},
    success: function(data){
      $('#txtNombre').val(data.nombre);
      $('#txtTelefono').val(data.telefono);
      $('#txtEmail').val(data.email);
      $('#txtIva').val(data.iva);
      $('#txtMoneda').val(data.moneda);
      $('#txtDireccion').val(data.direccion);
      $('#txtCiudad').val(data.ciudad);
      $('#txtRegion').val(data.region);
      $('#txtCodPostal').val(data.codpostal);
      $('#progressBar').hide();
    },
    error: function(){
      alert('error en peticion');
    }
  });


  $('#btnActualizar').click(function(){
    $('#progressBar').show();
    var conf = {
      id: 1,
      nombre: $('#txtNombre').val(),
      telefono: $('#txtTelefono').val(),
      email: $('#txtEmail').val(),
      iva: $('#txtIva').val(),
      moneda: $('#txtMoneda').val(),
      direccion: $('#txtDireccion').val(),
      ciudad: $('#txtCiudad').val(),
      region: $('#txtRegion').val(),
      codpostal: $('#txtCodPostal').val(),
      img: ""
    }

    $.ajax({
      url: uri,
      type: 'PUT',
      headers: {"x-access-token": window.localStorage.getItem('token')},
      data:conf,
      success: function(data){
        Materialize.toast(data.msg, 3000, 'rounded', function(){ location.reload });
        $('#progressBar').hide();
      },
      error: function(){
        alert('error en peticion');
      }
    });
  });
});
