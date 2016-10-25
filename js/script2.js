$(function() {

$(".draggable").draggable({
	// grid: [ 20, 20 ],
	appendTo: '#droppable',
  containment: "window",
	cursor: 'move',
	revertDuration: 100,
	revert: 'invalid',
	helper: 'clone'
});

$("#droppable").droppable({
    accept: ".draggable",
	  drop: function (event, ui) {
		    ui.helper.clone().appendTo('#droppable');
    }
});


});


// running order() will tell us the order of the list items
$('.dump').click(function(){
  var lis = []
  $(".output .draggable").each(function(){
    lis.push($(this).attr('id'));
  });
  $('.result').val(lis);
});
