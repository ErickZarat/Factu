function formatDate(date){
  var d = new Date(date);
  return  (d.getDay() + 1) + '/' +(d.getMonth() + 1) + '/' + d.getFullYear();
}

function formatDateWS(date){
  var d = new Date(date);
  return  d.getFullYear() + '/' +(d.getMonth() + 1) + '/' + (d.getDay() + 1) ;
}

function getCurrentDate(){
  var today = new Date();

  var dd = today.getDay()+1;
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();

  if(dd<10){
    dd='0'+dd;
  }
  if(mm<10){
    mm='0'+mm;
  }
  return yyyy + '/' + mm + '/' + dd;

}

$(document).ready(function(){
  $(".button-collapse").sideNav();
  $('.tooltipped').tooltip({delay: 50});
  $('.modal').modal();
});
