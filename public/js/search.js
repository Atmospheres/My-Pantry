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

      var dietHtml = '';
      if(document.getElementById('lacto-veg').checked){
        dietHtml += '&allowedDiet[]=388^Lacto vegetarian';
      }
      if(document.getElementById('ovo-veg').checked){
        dietHtml += '&allowedDiet[]=389^Ovo vegetarian';
      }
      if(document.getElementById('paleo').checked){
        dietHtml += '&allowedDiet[]=403^Paleo';
      }
      if(document.getElementById('pescetarian').checked){
        dietHtml += '&allowedDiet[]=390^Pescetarian';
      }
      if(document.getElementById('vegan').checked){
        dietHtml += '&allowedDiet[]=386^vegan';
      }
      if(document.getElementById('vegetarian').checked){
        dietHtml += '&allowedDiet[]=387^Lacto-ovo vegetarian';
      }

      var allergyHtml = '';
      if(document.getElementById('dairy-free').checked){
        allergyHtml += '&allowedAllergy[]=396^Dairy-Free';
      }
      if(document.getElementById('egg-free').checked){
        allergyHtml += '&allowedAllergy[]=397^Egg-Free';
      }
      if(document.getElementById('gluten-free').checked){
        allergyHtml += '&allowedAllergy[]=393^gluten-Free';
      }
      if(document.getElementById('peanut-free').checked){
        allergyHtml += '&allowedAllergy[]=394^Peanut-Free';
      }
      if(document.getElementById('seafood-free').checked){
        allergyHtml += '&allowedAllergy[]=398^Seafood-Free';
      }
      if(document.getElementById('seseme-free').checked){
        allergyHtml += '&allowedAllergy[]=399^Seseme-Free';
      }
      if(document.getElementById('sulfite-free').checked){
        allergyHtml += '&allowedAllergy[]=401^Sulfite-Free';
      }
      if(document.getElementById('tree-nut-free').checked){
        allergyHtml += '&allowedAllergy[]=395^Tree Nut-Free';
      }
      if(document.getElementById('wheat-free').checked){
        allergyHtml += '&allowedAllergy[]=392^Wheat-Free';
      }

      var apiHtml = 'http://api.yummly.com/v1/api/recipes?_app_id=3e5b7dbe&_app_key=1d681685a57dac07e6df0b1c0df38de6' +recipeNameString;
      if (ingredientsString){
        apiHtml += ingredientsString;
      }
      if (excludedIngredientsString){
        apiHtml += excludedIngredientsString;
      }
      if (dietHtml){
        apiHtml += dietHtml;
      }
      if (allergyHtml){
        apiHtml += allergyHtml;
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
              recipes.push('<div class="thumbnail">' + '<img src="'+ val[i].imageUrlsBySize[90] + '" alt="' + val[i].recipeName + '" data-holder-rendered="true" style="height: 300px; width: 100%; display: block;"/>');
              recipes.push('<div class="caption">' + '<h3 class="caption-text">' + val[i].recipeName + '</h3>');
              recipes.push('<p class="caption-text">' + val[i].sourceDisplayName + '</p>');
              recipes.push('<p><button type="button" class="btn btn-primary details" data-toggle="popover" title="' + val[i].recipeName + '" value="' + val[i].id + '"> Details </button> ');
              recipes.push('<button type="button" class="btn btn-primary save-favorite" method="post" action="saveFavorite" value="' + val[i].id + '"> Favorite </button></p>');
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
