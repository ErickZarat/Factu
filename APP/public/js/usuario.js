var uri = 'http://factuws-95180.app.xervo.io/api/v1/usuario';


$('#progressBar').show();

function editarPass(id){
  $('#mdlCambiar').modal('open');

  $.ajax({
    url: uri+'/'+id,
    type: 'GET',
    success: function(data){
      $('#txtChName').val(data.nombre);
      $('#txtChEmail').val(data.email);
      $('#txtChFecha').val(formatDateWS(data.agregado));
      $('#txtChUsername').val(data.username);
    },
    headers: {"x-access-token": window.localStorage.getItem('token')},
    error: function(){
      alerta('error en peticion');
    }

  });

  $('#btnCambiar').click(function(){

    if($('#txtChPassword').val() !== $('#txtCh2Password').val()){
      Materialize.toast('Las contraseñas no coinciden!', 3000);
      $('#txtChPassword').val('');
      $('#txtCh2Password').val('');
      return false;
    }
    var usr = {
      id: id,
      nombre: $('#txtChName').val(),
      email: $('#txtChEmail').val(),
      agregado: $('#txtChFecha').val(),
      username: $('#txtChUsername').val(),
      passwd: $('#txtChPassword').val()
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
      $('#txtEdEmail').val(data.email);
      $('#txtEdFecha').val(formatDateWS(data.agregado));
      $('#txtEdUsername').val(data.username);
      $('#txtEdPassword').val(data.passwd);
    },
    headers: {"x-access-token": window.localStorage.getItem('token')},
    error: function(){
      alerta('error en peticion');
    }

  });

  $('#btnModificar').click(function(){
    var usr = {
      id: id,
      nombre: $('#txtEdName').val(),
      email: $('#txtEdEmail').val(),
      agregado: $('#txtEdFecha').val(),
      username: $('#txtEdUsername').val(),
      passwd: $('#txtEdPassword').val()
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
  row = '<tr><td>'+value.id+'</td><td>'+value.nombre+'</td><td>'+value.username+'</td><td>'+value.email+'</td><td>'+value.rolNombre+'</td><td>'+formatDate(value.agregado)+'</td>'
  + '<td><button class="btn-floating btn-flat tooltipped" data-position="bottom" data-delay="50" data-tooltip="Editar" onclick="editar('+value.id+')"><i class="material-icons blue-grey-text">edit</i></button>'
  + '<button class="btn-floating btn-flat tooltipped" data-position="bottom" data-delay="50" data-tooltip="Editar Contraseña" onclick="editarPass('+value.id+')"><i class="material-icons blue-grey-text">settings</i></button>'
  + '<button class="tooltipped btn-floating btn-flat" data-position="bottom" data-delay="50" data-tooltip="Eliminar" onclick="eliminar('+value.id+')"><i class="material-icons blue-grey-text">delete</i></button>' +'</td></tr>';
  $('#tblUsuarios').append(row);
  row = '';
}

$(document).ready(function(){
  //Peticion de usuario
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
    var usr = {
      nombre: $('#txtName').val(),
      email: $('#txtEmail').val(),
      agregado: getCurrentDate(),
      username: $('#txtUsername').val(),
      passwd: $('#txtPassword').val()
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
        $('#tblUsuarios tr').remove();
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
