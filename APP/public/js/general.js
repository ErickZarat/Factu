function formatDate(date){
  var d = new Date(date);
  return  (d.getDay() + 1) + '/' +(d.getMonth() + 1) + '/' + d.getFullYear();
}

function formatDateWS(date){
  var d = new Date(date);
  return  d.getFullYear() + '/' +(d.getMonth() + 1) + '/' + (d.getDay() + 1) ;
}

$(document).ready(function(){
  $(".button-collapse").sideNav();
  $('.tooltipped').tooltip({delay: 50});
  $('.modal').modal();
});
