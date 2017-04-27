var express = require("express");
var router = express.Router();
var Park = require("../models/park");
var middleware = require("../middleware");
var geocoder = require('geocoder');

//INDEX - show all parks
router.get("/", function(req, res){
    // Get all parks from DB
    Park.find({}, function(err, allParks){
       if(err){
           console.log(err);
       } else {
          res.render("parks/index",{parks: allParks, page: 'parks'});
       }
    });
});

//CREATE - add new park to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  // get data from form and add to parks array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  }
  var price = req.body.price;
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newPark = {name: name, image: image, description: desc, price: price, author:author, location: location, lat: lat, lng: lng};
    // Create a new park and save to DB
    Park.create(newPark, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to parks page
            console.log(newlyCreated);
            res.redirect("/parks");
        }
    });
  });
});

//NEW - render the new park form
router.get('/new',middleware.isLoggedIn, function(req, res) {
    res.render("parks/new");
});

//SHOW - displays more info about one park
router.get('/:id', function(req, res){
    Park.findById(req.params.id).populate("reviews").exec(function(err, foundPark){
        if(err){
            console.log(err);
        } else {
            res.render("parks/show", {park: foundPark });
        }
    });
});

//EDIT - render an edit form for a park
router.get("/:id/edit", middleware.checkParkOwnership, function (req, res){
    Park.findById(req.params.id, function(err, foundPark){
        res.render("parks/edit", {park: foundPark});
    });
}); 

router.put("/:id",middleware.checkParkOwnership, function(req, res){
    // find and update the correct park
    Park.findByIdAndUpdate(req.params.id, req.body.park, function(err, updatedPark){
       if(err){
           res.redirect("/parks");
       } else {
           //redirect somewhere(show page)
           res.redirect("/parks/" + req.params.id);
       }
    });
});

//DELETE the park
router.delete('/:id',middleware.checkParkOwnership, function(req, res){
    Park.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/parks');
        } else {
            res.redirect('/parks');
        }
    });
});

module.exports = router;