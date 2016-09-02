$(document).ready(function() {
    var e=$(this);
    e.off('hover');
    $.get(e.data('poload'),function(d){
      e.popover({content: d}).popover('show');
    });
});
