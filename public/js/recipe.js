get_data_for_popover_and_display = function() {
  var el = $(this);
  if(el.hasClass('recipe-loaded')){
  }
  else {
    var _data = $(this).attr('alt');
    var recipeUrl = 'http://api.yummly.com/v1/api/recipe/' + this.value + '?_app_id=3e5b7dbe&_app_key=1d681685a57dac07e6df0b1c0df38de6';
    var recipeHtml = '';
    var ingredientsHtml = '';
    var nutritionHtml = '';
    var ratingHtml = '';
    var servingsHtml = '';
    var sourceHtml = '';

    $.getJSON(recipeUrl, function (json) {
         $.each(json, function (key, val) {
           if (key === "ingredientLines"){
             ingredientsHtml = '<h4>Ingredients:</h4><ul>';
             for (i = 0; i < val.length ; i++){
               ingredientsHtml += ('<li>' + val[i] + '</li>');
             }
             ingredientsHtml += '</ul>';
           }
           else if (key === "nutritionEstimates"){
             if(val.length > 0){
             nutritionHtml = 'Cal. per Serving: ' + val[0].value + '<br>';
             }
           }
           else if (key === "rating"){
             ratingHtml += 'Rating: ' + val + '</p>';
           }
           else if (key === "numberOfServings"){
             servingsHtml += '<p>Servings: ' + val + '<br>';
           }
           else if (key === "source"){
             sourceHtml += '<p><a type="button" class="btn btn-primary details" href="'+ val.sourceRecipeUrl +'" >Source</a>';
           }
         })
       recipeHtml += ingredientsHtml;
       recipeHtml += servingsHtml;
       recipeHtml += nutritionHtml;
       recipeHtml += ratingHtml;
       recipeHtml += sourceHtml;
       el.attr('data-content', recipeHtml).success(el.popover('toggle'));
       el.addClass('recipe-loaded');
     });
  }
};

function saveRecipe(event){
  event.preventDefault();
  var recipeUrl = 'http://api.yummly.com/v1/api/recipe/' + this.value + '?_app_id=3e5b7dbe&_app_key=1d681685a57dac07e6df0b1c0df38de6';
  var json = $.getJSON(recipeUrl, function (data){
  console.log(JSON.stringify(data));
   $.ajax({
       type: 'POST',
       data: data,
       url: '/saverecipe',
       dataType: 'JSON'
   });
 });
};
