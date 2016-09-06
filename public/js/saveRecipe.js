$(document).ajaxComplete(function(){
  $('.save-favorite').click(saveFavorite);
});

function saveFavorite(event){
  event.preventDefault();
  var recipeUrl = 'http://api.yummly.com/v1/api/recipe/' + this.value + '?_app_id=3e5b7dbe&_app_key=1d681685a57dac07e6df0b1c0df38de6';
  var json = $.getJSON(recipeUrl, function (json) {
  });

  var db = req.db;
  var collection = db.get('usercollection');

  collection.insert({
    json
  }), function(err, doc){
    if(err){
      res.send("There was a problem adding the information to the database.");
    }
    else{
      res.redirect("favorites");
    }
  }
}
