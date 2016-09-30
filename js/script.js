// this IIFE will activate sorting
(function() {
  $( "#sortable" ).sortable({
    connectWith: "#sortable2",
    placeholder: "ui-state-highlight"
  });
  $( "#sortable" ).disableSelection();
})();

(function() {
  $( "#sortable2" ).sortable({
    connectWith: "#sortable",
    placeholder: "ui-state-highlight"
  });
  $( "#sortable2" ).disableSelection();
})();




// running order() will tell us the order of the list items
$('.dump').click(function(){
   var idsInOrder = $("#sortable2").sortable("toArray");
  //  console.log(idsInOrder);
  $('.result').val(idsInOrder);
});


// duplication function
$('.ui-state-default span').click(function(){
  $(this).parent().clone().appendTo($(this).parent().parent());
});


// refresh warning
// window.onbeforeunload = function() {
//   return "Data will be lost if you leave the page, are you sure?";
// };
