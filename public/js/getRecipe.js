$(document).ready(function(){
  $('#details').popover({"trigger": "manual", "html":"true"});
  $('#details').click(get_data_for_popover_and_display);
});
get_data_for_popover_and_display = function() {
  var el = $(this);
  var _data = el.attr('alt');
  el.attr('data-content', 'Hello B-Rad');
  el.popover('show');
  var _data = $(this).attr('alt');
  $.ajax({
       type: 'GET',
       url: '/myresource',
       data: _data,
       dataType: 'html',
       success: function(data) {
           $(this).attr('data-content', data);
           $(this).popover('show');
       }
  });
}
