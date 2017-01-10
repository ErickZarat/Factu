var server = 'http://localhost:3001/api/v1/',
  uri = {
    cliente: server + 'cliente',
    producto: server + 'producto',
    factura: server + 'factura',
    config: server + 'configuracion'
  }

  var listaProductos = new Array();

  function agregarProductoTabla(value){
    var row = '<tr><td>'+value.cod+'</td><td>'+value.cant+'</td><td>'+value.desc+'</td><td>'+value.precioU+'</td><td>'+value.precioT+'</td></tr>'
    $('#tblFactura').append(row);
    row = '';
  }

  function actualizarTabla(){
    $('#tblFactura tr').remove();

    var subtotal = 0;
    var rows = '';
    listaProductos.forEach(function(value, i, array){
      agregarProductoTabla(value);
      subtotal += value.precioT;
    });
    var iva = (JSON.parse(window.localStorage.getItem('config')).iva / 100) * subtotal;
    var total = subtotal + iva;
    var rowsTotal = '<tr><td/><td/><td/><td><strong>SubTotal Q</strong></td><td>'+subtotal+'</td></tr>'
    +'<tr><td/><td/><td/><td><strong>IVA(12)% Q</strong></td><td>'+iva+'</td></tr>'
    +'<tr><td/><td/><td/><td><strong>TOTAL Q</strong></td><td id="tdTotal">'+total+'</td></tr>'
    $('#tblFactura').append(rowsTotal);
  }

  function AgregarAFactura(id){
    var prod = {
      cod: $('#tdCod-'+id).text(),
      cant: $('#txtCant-'+id).val(),
      desc: $('#tdProd-'+id).text(),
      precioU: $('#tdPrecio-'+id).val(),
      precioT:  $('#tdPrecio-'+id).val() * $('#txtCant-'+id).val()
    };
    listaProductos.push(prod);

    actualizarTabla();
  }

  function seleccionarUsuario(id){
    $('#txtName').val($('#tdNombre-'+id).text());
    $('#txtNit').val($('#tdNit-'+id).text());
    $('#txtTelefono').val($('#tdTel-'+id).text());
    $('#txtIdCliente').val(id);
  }

  function addProductoRow(value){
    row = '<tr><td id="tdCod-'+value.id+'">'+value.cod+'</td>'
    +'<td id="tdProd-'+value.id+'">'+value.producto+'</td>'
    +'<td><input type="text" id="txtCant-'+value.id+'" value="1" style="width: 60%;"></td>'
    +'<td><input type="text" id="tdPrecio-'+value.id+'" value="'+value.precio+'" style="width: 60%;"></td>'
    +'<td><button type="button" class="btn blue waves-effect" onclick="AgregarAFactura('+value.id+')"><i class="material-icons">add_shopping_cart</i></td></tr>';
    $('#tblProductos').append(row);
    row = '';
  }

  function addClienteRow(value){
    row = '<tr><td id="tdNombre-'+value.id+'">'+value.nombre+'</td>'
    +'<td id="tdNit-'+value.id+'">'+value.nit+'</td>'
    +'<td id="tdTel-'+value.id+'">'+value.telefono+'</td>'
    +'<td id="tdDir-'+value.id+'">'+value.direccion+'</td>'
    +'<td><button type="button" class="waves-effect btn blue modal-action modal-close" onclick="seleccionarUsuario('+value.id+')"><i class="material-icons">done</i></td></tr>';
    $('#tblClientes').append(row);
    row = '';
  }

$(document).ready(function(){
  $('#txtFecha').val(formatDate(getCurrentDate()));
  $('#txtVendedor').val(window.localStorage.getItem('vendedorNombre'));

  $('#btnImprimir').click(function() {
     var printContents = document.getElementById('factPrint').innerHTML;
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;
});

  $('#btnImprimir').click(function(){
    var fact = {
      fecha: getCurrentDate(),
      cliente: $('#txtIdCliente').val(),
      vendedor: window.localStorage.getItem('vendedorId'),
      estado: 3,
      total: $('#tdTotal').text()
    }

    console.log(fact);
    $.ajax({
      url: uri.factura,
      headers: {"x-access-token": window.localStorage.getItem('token')},
      type: 'POST',
      data: fact,
      success: function(data){
        Materialize.toast(data.msg, 3000, 'rounded', function(){});
      },
      error: function(){
        alert('error en peticion')
      }
    });
  });

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

//////////////////////////////////////////////////////////////////
/////////////////////  Agregar Cliente //////////////////////////
/////////////////////////////////////////////////////////////////
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
        Materialize.toast(data.msg, 3000, 'rounded');
        $('#txtName').val(usr.nombre);
        $('#txtNit').val(usr.nit);
        $('#txtTelefono').val(usr.telefono);
        $('#txtIdCliente').val(data.insertId);
      },
      type: 'POST'
    });
  });

  //////////////////////////////////////////////////////////////////
  /////////////////////  Traer Clientes //////////////////////////
  /////////////////////////////////////////////////////////////////
  $.ajax({
    url: uri.cliente,
    headers: {"x-access-token": window.localStorage.getItem('token')},
    error: function() {
      alert('Error en peticion');
    },
    success: function(data) {
      $.each(data, function(i, value){
        addClienteRow(value);
      });
    },
    type: 'GET'
  });

  //////////////////////////////////////////////////////////////////
  /////////////////////  Buscar Cliente ////////////////////////////
  /////////////////////////////////////////////////////////////////
  $('#txtSearchCliente').bind('input',function(){
    var busqueda = $('#txtSearchCliente').val();
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
          addClienteRow(value);
        });
      },
      error: function(){
        alert('error en peticion');
      }
    });
  });
  //////////////////////////////////////////////////////////////////
  /////////////////////  Traer Productos //////////////////////////
  /////////////////////////////////////////////////////////////////
  $.ajax({
    url: uri.producto,
    headers: {"x-access-token": window.localStorage.getItem('token')},
    error: function() {
      alert('Error en peticion');
    },
    success: function(data) {
      $.each(data, function(i, value){
        addProductoRow(value);
      });
    },
    type: 'GET'
  });

  //////////////////////////////////////////////////////////////////
  /////////////////////  Agregar Producto //////////////////////////
  /////////////////////////////////////////////////////////////////
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

  //////////////////////////////////////////////////////////////////
  /////////////////////  Buscar Producto //////////////////////////
  /////////////////////////////////////////////////////////////////
  $('#txtSearchProducto').bind('input',function(){
    var busqueda = $('#txtSearchProducto').val();
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
          addProductoRow(value);
        });
      },
      error: function(){
        alert('error en peticion');
      }
    });
  });


});
