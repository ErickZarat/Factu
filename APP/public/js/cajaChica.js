var uri = 'http://factuws-95180.app.xervo.io/api/v1/cajachica';


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
      $('#txtEdDesc').val(data.cod);
      $('#txtEdGasto').val(data.producto);
      $('#txtEdAgregado').val(formatDateWS(data.agregado));
    },
    headers: {"x-access-token": window.localStorage.getItem('token')},
    error: function(){
      alerta('error en peticion');
    }

  });

  $('#btnModificar').click(function(){
    var prd = {
      id: id,
      gasto: $('#txtEdGasto').val(),
      desc: $('#txtEdDesc').val(),
      fecha: $('#txtEdAgregado').val()
    }

    $.ajax({
      url: uri,
      headers: {"x-access-token": window.localStorage.getItem('token')},
      data: prd,
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
  row = '<tr><td>'+value.id+'</td><td>'+value.desc+'</td><td>'+formatDate(value.fecha)+'</td><td>'+value.gasto+'</td>'
  + '<td><button class="btn-floating btn-flat tooltipped" data-position="bottom" data-delay="50" data-tooltip="Editar" onclick="editar('+value.id+')"><i class="material-icons blue-grey-text">edit</i></button>'
  + '<button class="tooltipped btn-floating btn-flat" data-position="bottom" data-delay="50" data-tooltip="Eliminar" onclick="eliminar('+value.id+')"><i class="material-icons blue-grey-text">delete</i></button>' +'</td></tr>';
  $('#tblRegistros').append(row);
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
    var caja = {
      desc: $('#txtDesc').val(),
      gasto: $('#txtGasto').val(),
      fecha: getCurrentDate()
    }

    $.ajax({
      url: uri,
      headers: {"x-access-token": window.localStorage.getItem('token')},
      data: caja,
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
        $('#tblRegistros tr').remove();
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
