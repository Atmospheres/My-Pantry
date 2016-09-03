$(document).ajaxComplete(function(){
  $('.details').popover({"trigger": "click", "html":"true"});
  $('.details').click(get_data_for_popover_and_display);
});
get_data_for_popover_and_display = function() {
  var el = $(this);
  if(el.hasClass('recipe-loaded')){
  }
  else {
    var _data = $(this).attr('alt');
    var recipeHtml = 'http://api.yummly.com/v1/api/recipe/' + this.value + '?_app_id=3e5b7dbe&_app_key=1d681685a57dac07e6df0b1c0df38de6';
    var recipe = [];
    $.getJSON(recipeHtml, function (json) {
         $.each(json, function (key, val) {
            // build HTML String from returned json key/
         })
    });
    el.attr('data-content', '<img src="./Images/Recipe1.jpg" alt="100%x200" data-holder-rendered="true" style="height: 200px; width: 100%; display: block;"/>' +
      '<div class="caption">' +
      '<h3 class="caption-text">Poutine</h3>' +
      '<p class="caption-text">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>' +
      '<p><a href="#" role="button" class="btn btn-primary">Save Favorite</a></p>' +
      '</div>' +
      '</div>');
    el.popover('show');
    el.addClass('recipe-loaded')
  }
}
