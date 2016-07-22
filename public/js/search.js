(function ($) {
    $('button').on('click', function (e) {
      // remove resultset if this has already been run
      $('.recipes ul').remove();

      var ingredientsArray = $('select option:selected').text().split(',');
      var ingredientsExclude = $('select option:selected').text();
      var diets = $('select option:selected').text();
      var allergies = $('select option:selected').text();

      // make the AJAX request
      $.getJSON('http://api.yummly.com/v1/api/recipes?_app_id=3e5b7dbe&_app_key=1d681685a57dac07e6df0b1c0df38de6&=onion%20soup' + '&requirePictures=true', function (json) {
          // do all this on success
          var recipes = [],
              $ul;

          $.each(json, function (key, val) {
            recipes.push('<li id="coolstuff">Brad</li>')
            if (key === "matches"){
              recipes.push('<li id="coolstuff">Brad</li>')
              //for (i = 0; i < 1; i++) {
              //  recipes.push('<li class="recipeName">' + 'brad' + '</li>');
              //}
            }
          });
          if (recipes.length < 1) {
            recipes.push('<li>No results for parameters, try again!</li>');
          }
          $ul = $('<ul />').appendTo('.recipes');
          $ul.append(recipes);
        });
        e.preventDefault();
    });
}(jQuery));
