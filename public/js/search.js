(function ($) {
    $('#search').on('click', function (e) {
      // remove resultset if this has already been run
      $('.recipes').empty();


      var recipeName = document.getElementById('recipeName').value;
      var recipeNameString = '&q=' + recipeName;

      var ingredientHtml = '&allowedIngredient[]=';
      var ingredientsArray = document.getElementById('ingredients').value.split(",");
      var ingredientsString = '';
      if (ingredientsArray[0] !== ""){
        for (i = 0; i < ingredientsArray.length; i++){
          ingredientsArray[i] = ingredientHtml + ingredientsArray[i].trim();
        }
        for (i = 0; i < ingredientsArray.length; i++){
          ingredientsString += ingredientsArray[i];
        }
      }

      var excludedIngredientHtml = '&excludedIngredient[]=';
      var excludedIngredientsArray = document.getElementById('ingredientsExclude').value.split(",");
      var excludedIngredientsString = '';
      if (excludedIngredientsArray[0] !== ""){
        for (i = 0; i < excludedIngredientsArray.length; i++){
          excludedIngredientsArray[i] = excludedIngredientHtml + excludedIngredientsArray[i].trim();
        }
        for (i = 0; i < excludedIngredientsArray.length; i++){
          excludedIngredientsString += excludedIngredientsArray[i];
        }
      }

      // var diets = $('select option:selected').text();
      // var allergies = $('select option:selected').text();

      var apiHtml = 'http://api.yummly.com/v1/api/recipes?_app_id=3e5b7dbe&_app_key=1d681685a57dac07e6df0b1c0df38de6' +recipeNameString;
      if (ingredientsString){
        apiHtml += ingredientsString;
      }
      if (excludedIngredientsString){
        apiHtml += excludedIngredientsString;
      }
      apiHtml += '&requirePictures=true';
      apiHtml = apiHtml.replace(' ', '%20');

      $.getJSON(apiHtml, function (json) {
        var recipes = [],
            $recipes;

        $.each(json, function (key, val) {
          if (key === "matches"){
            for (i = 0; i < val.length ; i++) {
              if (i%3 === 0){
                recipes.push('<div class="row">');
              }
              recipes.push('<div class="col-sm-6 col-md-4">');
              recipes.push('<div class="thumbnail">' + '<img src="'+ val[i].imageUrlsBySize[90] + '" alt="100%x200" data-holder-rendered="true" style="height: 300px; width: 100%; display: block;"/>');
              recipes.push('<div class="caption">' + '<h3 class="caption-text">' + val[i].recipeName + '</h3>');
              recipes.push('<p class="caption-text">' + val[i].sourceDisplayName + '</p>');
              recipes.push('<p><a href="#" id="details" data-toggle="popover" title="Popover Header" data-content="popover content"> Details </a>');
              recipes.push('<a href="#" class="btn btn-primary"> Favorite </a></p>');
              recipes.push('</div></div></div>');
              if ((i+1)%3 === 0){
                recipes.push('</div>');
              }
            }
          }
        });
      if (recipes.length < 1) {
      recipes.push('<p>No results for parameters, try again!</p>');
      }
      $recipes = $('<div />').appendTo('.recipes');
      $recipes.append(recipes.join(''));
    });
    e.preventDefault();
  });
}(jQuery));
