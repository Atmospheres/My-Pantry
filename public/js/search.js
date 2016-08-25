(function ($) {
    $('button').on('click', function (e) {
      // remove resultset if this has already been run
      $('.recipes ul').remove();

      var ingredientsArray = $('select option:selected').text().split(',');
      var ingredientsExclude = $('select option:selected').text();
      var diets = $('select option:selected').text();
      var allergies = $('select option:selected').text();

      // make the AJAX request
      $.getJSON('http://api.yummly.com/v1/api/recipes?_app_id=3e5b7dbe&_app_key=1d681685a57dac07e6df0b1c0df38de6&q=ginger' + '&requirePictures=true', function (json) {
        // do all this on success
        var recipes = [],
            $recipes;

        $.each(json, function (key, val) {
          if (key === "matches"){
            //recipes.push('<li id="recipe">Brad</li>')
            recipes.push('<div data-example-id="thunmbnail-with-custom-content" class="bs-example"');
            for (i = 0; i < val.length ; i++) {
              if (i%3 === 0){
                recipes.push('<div class="row">');
              }
              recipes.push('<div class="col-sm-6 col-md-4">');
              recipes.push('<div class="thumbnail">' + '<img src="'+ val[i].smallImageUrls[0] + '" alt="100%x200" data-holder-rendered="true" style="height: 200px; width: 100%; display: block;"/>');
              recipes.push('<div class="caption">' + '<h3 class="caption-text">' + val[i].recipeName + '</h3>');
              recipes.push('<p class="caption-text">' + val[i].sourceDisplayName + '</p>');
              recipes.push('</div></div></div>');
              if ((i+1)%3 === 0){
                recipes.push('</div>');
              }
            }
            recipes.push('</div>');
          }
        });
      if (recipes.length < 1) {
      recipes.push('<p>No results for parameters, try again!</p>');
      }
      $recipes = $('<div />').appendTo('.recipes');
      $recipes.append(recipes);
    });
    e.preventDefault();
  });
}(jQuery));
