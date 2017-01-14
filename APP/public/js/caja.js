var server = 'http://factuws-95180.app.xervo.io/api/v1/'
var uri = {
  cajachica: server + 'cajachica/',
  factura: server + 'factura/'
}

var ingresos = 0;
var egresos = 0;
var total = 0;

$(document).ready(function(){
  $('footer').hide();
  $('.hid').hide();

  $('#btnImprimir').click(function(){
    window.print();
  });

  $('#btnGenerar').click(function(){
    $('#tblCaja tr').remove();
    $('#tblIngresos tr').remove();
    $('#tblEgresos tr').remove();
    ingresos = 0;
    egresos = 0;
    total = 0;

    var fechasParams = {
      inicial: new Date($('#txtInicial').val()),
      final: new Date($('#txtFinal').val())
    }
    console.log(fechasParams);
    $.ajax({
      url: uri.factura,
      headers: {"x-access-token": window.localStorage.getItem('token')},
      type: 'GET',
      success: function(data){
        $.each(data, function(i, value){
          var fecha = new Date(value.fecha);
          if(fecha >= fechasParams.inicial && fecha <= fechasParams.final){
            ingresos += value.total;
            var row = '<tr><td>'+value.id+'</td><td>'+value.nombreVendedor+'</td><td>'+value.total+'</td></tr>'
            $('#tblIngresos').append(row);
          }
        });
        $('#tblCaja').append('<tr><td>Facturas</td><td>'+ingresos+'</td></tr>');
      }, error: function(){
      }
    });
    $.ajax({
      url: uri.cajachica,
      headers: {"x-access-token": window.localStorage.getItem('token')},
      type: 'GET',
      success: function(data){

          $.each(data, function(i, value){
            var fecha = new Date(value.fecha);
            if(fecha <= fechasParams.inicial && fecha <= fechasParams.final){
            egresos += value.gasto;
            var row = '<tr><td>'+value.id+'</td><td>'+value.desc+'</td><td>'+value.gasto+'</td></tr>'
            $('#tblEgresos').append(row);
          }
        });

        $('#tblCaja').append('<tr><td>Caja Chica</td><td>'+egresos+'</td></tr>');
        $('#tblCaja').append('<tr><td>Total</td><td>'+(ingresos-egresos)+'</td></tr>');

      }, error: function(){
      }
    });
    $('.hid').show();
  });
});
