var server = 'http://localhost:3001/api/v1/',
  uri = {
    cliente: server + 'cliente',
    producto: server + 'producto',
    factura: server + 'factura'
  }

$(document).ready(function(){
  $('#txtFecha').val(formatDate(getCurrentDate()));
  console.log(window.localStorage.getItem('vendedorNombre'));
  $('#txtVendedor').val(window.localStorage.getItem('vendedorNombre'));


  $('#btnAgregarCliente').click(function(){
    var est = '';

    if($('#chbCEstado').is(':checked')){
      est = '1'
    }else {
      est = '2';
    }

    var usr = {
      nombre: $('#txtCName').val(),
      nit: $('#txtCNit').val(),
      agregado: getCurrentDate(),
      telefono: $('#txtCTelefono').val(),
      direccion: $('#txtCDireccion').val(),
      estado: est
    }

    $.ajax({
      url: uri.cliente,
      headers: {"x-access-token": window.localStorage.getItem('token')},
      data: usr,
      error: function(){
        alert('error en peticion');
      },
      success: function(data){
        Materialize.toast(data.msg, 3000, 'rounded', function(){location.reload();})
      },
      type: 'POST'
    });
  });

  $('#txtSearchCliente').bind('input',function(){
    $('#progressBar').show();
    var busqueda = $('#txtSearch').val();
    var customUrl = uri.cliente;

    if(busqueda !== ''){
      customUrl += '/buscar/' + busqueda;
    } else {
      customUrl = uri.cliente;
    }
    $.ajax({
      url: customUrl,
      type: 'GET',
      headers: {"x-access-token": window.localStorage.getItem('token')},
      success: function(data){
        $('#tblClientes tr').remove();
        $.each(data, function(i, value){
          addRow(value);
        });
        $('#progressBar').hide();
      },
      error: function(){
        alert('error en peticion');
      }
    });

  });

  $('#btnAgregarProducto').click(function(){

    var est = '';

    if($('#chbPEstado').is(':checked')){
      est = '1'
    }else {
      est = '2';
    }

    var prd = {
      cod: $('#txtPCod').val(),
      producto: $('#txtPName').val(),
      estado: est,
      precio: $('#txtPPrecio').val(),
      agregado: getCurrentDate()
    }

    $.ajax({
      url: uri.producto,
      headers: {"x-access-token": window.localStorage.getItem('token')},
      data: prd,
      error: function(){
        alert('error en peticion');
      },
      success: function(data){
        Materialize.toast(data.msg, 3000, 'rounded');
      },
      type: 'POST'
    });
  });

  $('#txtSearchProducto').bind('input',function(){
    $('#progressBar').show();
    var busqueda = $('#txtSearch').val();
    var customUrl = uri.producto;

    if(busqueda !== ''){
      customUrl += '/buscar/' + busqueda;
    } else {
      customUrl = uri.producto;
    }
    $.ajax({
      url: customUrl,
      type: 'GET',
      headers: {"x-access-token": window.localStorage.getItem('token')},
      success: function(data){
        $('#tblProductos tr').remove();
        $.each(data, function(i, value){
          addRow(value);
        });
        $('#progressBar').hide();
      },
      error: function(){
        alert('error en peticion');
      }
    });

  });


});
