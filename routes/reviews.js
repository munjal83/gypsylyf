var express = require("express");
var router = express.Router({mergeParams: true});
var Park = require("../models/park");
var Review = require("../models/review");
var middlewareObj = require("../middleware");

//NEW review
router.get('/new',middlewareObj.isLoggedIn, function(req, res){
    Park.findById(req.params.id, function(err, park){
        if(err){
            console.log(err);
        } else {
            res.render("reviews/new", {park: park});
        }
    })
});

//CREATE review
router.post('/', middlewareObj.isLoggedIn, function(req, res){
   Park.findById(req.params.id, function(err, park){
       if(err){
           console.log(err);
           res.redirect('/parks');
       } else {
           Review.create(req.body.review, function(err, review){
              if(err){
                  req.flash("error", "Opps! Something went wrong!");
                  console.log(err);
              } else {
                  review.author.id = req.user._id;
                  review.author.username = req.user.username;
                  review.save();
                  park.reviews.push(review);
                  park.save();
                  req.flash("success", "New review added successfully!");
                  res.redirect('/parks/' + park._id);
              }
           });
       }
   }) 
});

//EDIT review
router.get('/:review_id/edit', middlewareObj.checkReviewOwnership, function(req, res){
    Review.findById(req.params.review_id, function(err, foundReview) {
        if(err){
            res.redirect("back")
        } else {
                res.render("reviews/edit", {park_id: req.params.id, review: foundReview});
        }
    });

});

//UPDATE review
router.put('/:review_id',middlewareObj.checkReviewOwnership, function(req, res){
   Review.findByIdAndUpdate(req.params.review_id, req.body.review, function(err, updatedReview){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/parks/" + req.params.id);
       }
    }) 
});

//DELETE review
router.delete('/:review_id',middlewareObj.checkReviewOwnership, function(req, res){
    Review.findByIdAndRemove(req.params.review_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Review deleted successfully!");
            res.redirect("/parks/" + req.params.id);
        }
    })
})

module.exports = router;