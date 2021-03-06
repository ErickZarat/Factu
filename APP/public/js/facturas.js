var uri = apiServer+'factura';

$('#progressBar').show();

function descargar(id){
window.open(appServer + 'generarfactura?facturaId='+id+'&print=FALSE');
}

function eliminarFac(id){
  $('#mdlEliminar').modal('open');
  $('#btnEliminar').click(function(){

  $.ajax({
      url: uri,
      headers: {"x-access-token": window.localStorage.getItem('token')},
      data: {id: id},
      error: function(){
        alert('error en peticion');
      },
      success: function(data){
        Materialize.toast(data.msg, 3000, 'rounded', function(){location.reload();})
      },
      type: 'DELETE'
    });

  });
}


function addRow(value){
  rol = window.localStorage.getItem('rol');
  if(rol == 'ADMIN' || rol == 'ADMINISTRATIVO'){
    eliminar = '<button class="tooltipped btn-floating btn-flat" data-position="bottom" data-delay="50" data-tooltip="Eliminar" onclick="eliminarFac('+value.id+')"><i class="material-icons blue-grey-text">delete</i></button>';
  } else {
    eliminar = '';
  }
  row = '<tr><td>'+value.id+'</td><td>'+formatDate(value.fecha)+'</td><td>'+value.nombreCliente+'</td><td>'+value.nombreVendedor+'</td><td>'+value.estado+'</td><td>'+value.total.toFixed(2)+'</td>'
  + '<td><button class="btn-floating btn-flat tooltipped" data-position="bottom" data-delay="50" data-tooltip="Descargar" onclick="descargar('+value.id+')"><i class="material-icons blue-grey-text">get_app</i></button>'
  + eliminar +'</td></tr>';
  $('#tblFacturas').append(row);
  row = '';
}

$(document).ready(function(){
  //Peticion de cliente
  $.ajax({
    url: uri,
    headers: {"x-access-token": window.localStorage.getItem('token')},
    error: function() {
      alert('Error en peticion');
    },
    success: function(data) {
      $.each(data, function(i, value){
        addRow(value);
      });
      $('#progressBar').hide();
    },
    type: 'GET'
  });

  $('#btnAgregar').click(function(){
    var est = '';

    if($('#chbEstado').is(':checked')){
      est = '1'
    }else {
      est = '2';
    }

    var usr = {
      nombre: $('#txtName').val(),
      nit: $('#txtNit').val(),
      agregado: getCurrentDate(),
      telefono: $('#txtTelefono').val(),
      direccion: $('#txtDireccion').val(),
      estado: est
    }

    $.ajax({
      url: uri,
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

  $('#txtSearch').bind('input',function(){
    $('#progressBar').show();
    var busqueda = $('#txtSearch').val();
    var customUrl = uri;

    if(busqueda !== ''){
      customUrl += '/buscar/' + busqueda;
    } else {
      customUrl = uri;
    }
    $.ajax({
      url: customUrl,
      type: 'GET',
      headers: {"x-access-token": window.localStorage.getItem('token')},
      success: function(data){
        $('#tblFacturas tr').remove();
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
