apiServer = 'http://104.236.20.251:3002/api/v1/';
var uri = {
  conf: apiServer + 'configuracion',
  prodfact: apiServer + 'prodfact',
  factura: apiServer + 'factura'
}
var
 form = $('body'),
 cache_width = form.width(),
 a4 = [600,800];

function createPDF() {
  getCanvas().then(function(canvas) {
   var
    img = canvas.toDataURL("image/png"),
    doc = new jsPDF({
     unit: 'px',
     format: 'a4'
    });
   doc.addImage(img, 'JPEG', 0, 0);
   doc.save("fac-"+ getUrlParameter('facturaId') + ".pdf");
  });

 }

 // create canvas object
 function getCanvas() {
  form.width((a4[0] * 1.33333) - 80).css('max-width', 'none');
  return html2canvas(form, {
   imageTimeout: 2000,
   removeContainer: true
  });
 }

function agregarProductoTabla(value, precioT){
  var row = '<tr><td><img src="../uploads/productos/'+value.img+'" class="img-prd" class="left"/></td><td class="padd-5">'+value.cant+'</td><td class="padd-5">'+value.producto+'</td><td class="padd-5">'+value.precio.toFixed(2)+'</td><td class="padd-5">'+precioT.toFixed(2)+'</td></tr>'
  $('#tblDescripcion').append(row);
  row = '';
}

function actualizarTabla(data){
  $('#tblDescripcion tr').remove();

  var total = 0;
  var rows = '';
  $.each(data, function(i, value){
    precioT = value.precio * value.cant;
    agregarProductoTabla(value, precioT);

    total += precioT;
  });
  var rowsTotal = '<tr><td/><td/><td/><td class="padd-5"><strong>TOTAL Q</strong></td><td id="tdTotal">'+total.toFixed(2)+'</td></tr>'
  $('#tblDescripcion').append(rowsTotal);
}

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
  sURLVariables = sPageURL.split('&'),
  sParameterName,
  i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

function formatDate(date){
  var d = new Date(date);
  console.log(date);
  return  (d.getDate()) + '/' +(d.getMonth() + 1) + '/' + d.getFullYear();
}

$(document).ready(function(){
  $.ajax({
    url: uri.conf,
    type: 'GET',
    headers: {"x-access-token": window.localStorage.getItem('token')},
    success: function(data){
      $('#txtEmpresa').text(data.nombre);
      $('#txtLocalizacion').text(data.direccion + ', ' + data.ciudad + ' ' + data.region );
      $('#txtTelefono').text("Telefono: " + data.telefono);
      $('#txtEmail').text('Email: '+data.email);
    }, error: function(){
      alert('error en peticion');
    }
  });

  $.ajax({
    url: uri.factura + '/' + getUrlParameter('facturaId'),
    type: 'GET',
    headers: {"x-access-token": window.localStorage.getItem('token')},
    success: function(data){
      $('#tblCliente').append(data.nombreCliente);
      $('#tblVendedor').append(data.nombreVendedor);
      $('#tblFecha').append(formatDate(data.fecha));
      var nomEstado = '';
      console.log('estado: '+ data.idEstado)
      if(data.idEstado == 5){
          nomEstado = 'Cotizacion';
          $('#txtNota').append('<strong>NOTA: </strong>La cotización tiene una válidez de 15 días a partir de la fecha descrita en este documento.<br>La forma de pago es del 50% de anticipo y 50% contraentrega.<br>Los precios incluyen IVA.');
      } else {
          nomEstado = 'Factura';
          $('#txtNota').append('<strong>!Gracias por su compra!</strong>');
      }
      $('#txtNumFac').text(nomEstado+' #' + data.id);
      $.ajax({
        url: uri.prodfact + '/' + getUrlParameter('facturaId'),
        type: 'GET',
        headers: {"x-access-token": window.localStorage.getItem('token')},
        success: function(data){
          actualizarTabla(data);

          if(getUrlParameter('print') !== 'TRUE'){
            $('body').scrollTop(0);
            createPDF();
            setTimeout(function(){ self.close() }, 2500);
          } else {
            window.print();
            self.close();
          }

        }, error: function(){
          alert('error en peticion');
        }
      });


    }, error: function(){
      alert('error en peticion');
    }
  });

});
