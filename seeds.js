var mongoose = require("mongoose");
var Park = require("./models/park");
var Review = require("./models/review");


var data = [
    { name: "Vancouver Veelaleela",
      image: "https://farm4.staticflickr.com/3953/15613249585_d1e45f2ee5.jpg",
      description: "Pooh sat down at the foot of all he sang a buzzing-noise like that I know of is because you're a bee that I know of is because you're a bear like this: Isn't is funny how a bear like that I know of is making honey? Buzz! Buzz! I wonder the tree, there's a buzzing-noise that, just buzzing a buzzing-noise that, just buzzing, he climbed, and said Christopher Robin."
    },
    { name: "Toronto Takiniki",
      image: "https://farm9.staticflickr.com/8086/8500579154_5350408dc9.jpg",
      description: "Pooh sat down at the foot of all he sang a buzzing-noise like that I know of is because you're a bee that I know of is because you're a bear like this: Isn't is funny how a bear like that I know of is making honey? Buzz! Buzz! I wonder the tree, there's a buzzing-noise that, just buzzing a buzzing-noise that, just buzzing, he climbed, and said Christopher Robin."
    },
    { name: "Calgary Kukanuka",
      image: "https://farm1.staticflickr.com/46/120921750_d38cbc5477.jpg",
      description: "Pooh sat down at the foot of all he sang a buzzing-noise like that I know of is because you're a bee that I know of is because you're a bear like this: Isn't is funny how a bear like that I know of is making honey? Buzz! Buzz! I wonder the tree, there's a buzzing-noise that, just buzzing a buzzing-noise that, just buzzing, he climbed, and said Christopher Robin."
    }
    ]

function seedDb(){
    //Remove all Campgrounds
    Park.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         console.log("All Campgrounds removed!");
    //         //Add Few campgrounds
    //         data.forEach(function(seed){
    //           Campground.create(seed, function(err, campground){
    //               if(err){
    //                   console.log(err)
    //               } else {
    //                   console.log("Campground created");
    //                   //create comments
    //                   Comments.create({
    //                       text: "This is starting to click now!",
    //                       author: "Jon Snow"
    //                   }, function(err, comment){
    //                       if(err){
    //                           console.log(err);
    //                       } else {
    //                           campground.comments.push(comment);
    //                           campground.save();
    //                           console.log("comments created");
    //                       }
    //                   });
    //               } 
    //           }); 
    //         });
    //     }
     });
}

module.exports = seedDb;