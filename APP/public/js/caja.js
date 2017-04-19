
var uri = {
  cajachica: apiServer + 'cajachica-fecha',
  factura: apiServer + 'factura-fecha'
}

var ingresos = 0;
var egresos = 0;
var total = 0;

$(document).ready(function(){
  $('footer').hide();
  $('.hid').hide();

  $('#btnImprimir').click(function(){
    $(".car").toggleClass("s6 s12");
    $('.hide-print').hide();
    window.print();
    $(".car").toggleClass("s6 s12");
    $('.hide-print').show();
  });

  $('#btnGenerar').click(function(){
    $('#tblCaja tr').remove();
    $('#tblIngresos tr').remove();
    $('#tblEgresos tr').remove();
    ingresos = 0;
    egresos = 0;
    total = 0;

    var fechasParams = {
      inicial: formatDateWS($('#txtInicial').val()),
      final: formatDateWS($('#txtFinal').val())
    }
    console.log(fechasParams);
    $.ajax({
      url: uri.factura,
      headers: {"x-access-token": window.localStorage.getItem('token')},
      type: 'POST',
      data:fechasParams,
      success: function(data){
        $.each(data, function(i, value){

          ingresos += value.total;
          var row = '<tr><td>'+value.id+'</td><td>'+value.nombreVendedor+'</td><td></td>'+value.fecha+'<td>'+value.total.toFixed(2)+'</td></tr>'
          $('#tblIngresos').append(row);

        });
        $('#tblCaja').append('<tr><td>Facturas</td><td>'+ingresos.toFixed(2)+'</td></tr>');
        $.ajax({
          url: uri.cajachica,
          headers: {"x-access-token": window.localStorage.getItem('token')},
          type: 'POST',
          data:fechasParams,
          success: function(data){

            $.each(data, function(i, value){

                egresos += value.gasto;
                var row = '<tr><td>'+value.id+'</td><td>'+value.desc+'</td><td>'+value.gasto.toFixed(2)+'</td></tr>'
                $('#tblEgresos').append(row);

            });

            $('#tblCaja').append('<tr><td>Caja Chica</td><td>'+egresos.toFixed(2)+'</td></tr>');
            $('#tblCaja').append('<tr><td>Total</td><td>'+(ingresos-egresos).toFixed(2)+'</td></tr>');

          }, error: function(){
          }
        });
      }, error: function(){
      }
    });
    $('.hid').show();
  });
});
