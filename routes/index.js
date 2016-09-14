var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET favorites page. */
router.get('/favorites', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('favorites', {
            "favorites" : docs
        });
    });
});

router.post('/saverecipe', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

// router.delete('/deleterecipe/:id', function(req, res){
//   var db = req.db;
//   var collection = dv.get('usercollection');
//   var recipeToDelete = req.params.id;
//   collection.remove({'_id' : userToDelete }, function(err) {
//     res.send((err === null_) ? {msg: ''} : {msg:'error: ' + err});
//   });
// });

module.exports = router;
