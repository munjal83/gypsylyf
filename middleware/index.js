var Park = require("../models/park.js");
var Review = require("../models/review.js");

var middlewareObj = {}

middlewareObj.checkParkOwnership = function(req, res, next){
    //is the user logged in?
    if(req.isAuthenticated()) {
        Park.findById(req.params.id, function(err, foundPark){
            if(err){
                req.flash("error", "Park not found");
                res.redirect("back");
            } else {
                //does the user own the park?
                if(foundPark.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "Permission Denied! Please obtain authorization to use this feature!");
                    res.redirect("back");
                }   
            }
        });
    } else {
        req.flash("error", "Please Login to use this feature!");
        res.redirect("back");
    }
}

middlewareObj.checkReviewOwnership = function(req, res, next){
    //is the user logged in?
    if(req.isAuthenticated()) {
        Review.findById(req.params.review_id, function(err, foundReview){
            if(err){
                console.log(err);
            } else {
                //does the user own the review?
                if(foundReview.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "Permission Denied! Please obtain authorization to use this feature!");
                    res.redirect("back");
                }   
            }
        });
    } else {
        req.flash("error", "Please Login to use this feature!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login to use this feature!");
    res.redirect('/login');
}

module.exports = middlewareObj;