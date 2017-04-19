var uri = apiServer +'cliente';


$('#progressBar').show();

function eliminar(id){
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

function editar(id){
  $('#mdlEditar').modal('open');

  $.ajax({
    url: uri+'/'+id,
    type: 'GET',
    success: function(data){
      $('#txtEdName').val(data.nombre);
      $('#txtEdNit').val(data.nit);
      $('#txtEdTelefono').val(data.telefono);
      $('#txtEdDireccion').val(data.direccion);
      $('#txtEdAgregado').val(formatDateWS(data.agregado));
      if(data.idEstado == '1'){
        $('#chbEdEstado').prop('checked', true);
      }else {
        $('#chbEdEstado').prop('checked', false);
      }

    },
    headers: {"x-access-token": window.localStorage.getItem('token')},
    error: function(){
      alerta('error en peticion');
    }

  });

  $('#btnModificar').click(function(){
    var est = '';

    if($('#chbEdEstado').is(':checked')){
      est = '1'
    }else {
      est = '2';
    }

    var usr = {
      id: id,
      agregado: $('#txtEdAgregado').val(),
      nombre: $('#txtEdName').val(),
      nit: $('#txtEdNit').val(),
      telefono: $('#txtEdTelefono').val(),
      direccion: $('#txtEdDireccion').val(),
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
      type: 'PUT'
    });
  });
}

function addRow(value){
  var rol = window.localStorage.getItem('rol');
  if(rol == 'ADMIN'){
    controls = '<button class="btn-floating btn-flat tooltipped" data-position="bottom" data-delay="50" data-tooltip="Editar" onclick="editar('+value.id+')"><i class="material-icons blue-grey-text">edit</i></button>'
    + '<button class="tooltipped btn-floating btn-flat" data-position="bottom" data-delay="50" data-tooltip="Eliminar" onclick="eliminar('+value.id+')"><i class="material-icons blue-grey-text">delete</i></button>'
  } else {
    controls = '';
  }
  row = '<tr><td>'+value.nombre+'</td><td>'+value.nit+'</td><td>'+value.telefono+'</td><td>'+value.direccion+'</td><td>'+value.estado+'</td><td>'+formatDate(value.agregado)+'</td>'
  + '<td>'+ controls +'</td></tr>';
  $('#tblClientes').append(row);
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
});
