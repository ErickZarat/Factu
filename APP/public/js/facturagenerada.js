var server = 'http://factuws-95180.app.xervo.io/api/v1/'
var uri = {
  conf: server + 'configuracion',
  prodfact: server + 'prodfact',
  factura: server + 'factura'
}
var
 form = $('body'),
 cache_width = form.width(),
 a4 = [595.28, 841.89];

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
   form.width(cache_width);
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
  var row = '<tr><td>'+value.cant+'</td><td>'+value.producto+'</td><td>'+value.precio.toFixed(2)+'</td><td>'+precioT.toFixed(2)+'</td></tr>'
  $('#tblDescripcion').append(row);
  row = '';
}

function actualizarTabla(data){
  $('#tblDescripcion tr').remove();

  var subtotal = 0;
  var rows = '';
  $.each(data, function(i, value){
    precioT = value.precio * value.cant;
    agregarProductoTabla(value, precioT);

    subtotal += precioT;
  });
  var iva = (JSON.parse(window.localStorage.getItem('config')).iva / 100) * subtotal;
  var total = subtotal + iva;
  var rowsTotal = '<tr><td/><td/><td/><td><strong>SubTotal Q</strong></td><td>'+subtotal.toFixed(2)+'</td></tr>'
  +'<tr><td/><td/><td/><td><strong>IVA(12)% Q</strong></td><td>'+iva.toFixed(2)+'</td></tr>'
  +'<tr><td/><td/><td/><td><strong>TOTAL Q</strong></td><td id="tdTotal">'+total.toFixed(2)+'</td></tr>'
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
      $('#txtEmail').text('Email'+data.email);
    }, error: function(){
      alert('error en peticion');
    }
  });

  $.ajax({
    url: uri.factura + '/' + getUrlParameter('facturaId'),
    type: 'GET',
    headers: {"x-access-token": window.localStorage.getItem('token')},
    success: function(data){
      $('#tblCliente').append('<tr><td>'+data.nombreCliente+'</td></tr>');
      $('#tblVendedor').append('<tr><td>'+data.nombreVendedor+'</td><td>'+formatDate(data.fecha)+'</td></tr>');
      $('#txtNumFac').text('Factura #' + data.id);
      $.ajax({
        url: uri.prodfact + '/' + getUrlParameter('facturaId'),
        type: 'GET',
        headers: {"x-access-token": window.localStorage.getItem('token')},
        success: function(data){
          actualizarTabla(data);

          if(getUrlParameter('print') !== 'TRUE'){
            $('body').scrollTop(0);
            createPDF();
            window.setTimeout(function(){
              self.close();
            }, 2000);
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
