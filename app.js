var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOveride = require("method-override");
var flash = require("connect-flash");
var Park = require("./models/park");
var Review = require("./models/review");
var User = require("./models/user")
var seedDb = require("./seeds");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var geocoder = require('geocoder');

//requiring routes
var reviewRoutes = require("./routes/reviews");
var parkRoutes = require("./routes/parks");
var indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/gypsylyf");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOveride("_method"));
app.use(flash());
//seedDb();
app.locals.moment = require('moment');


//PASSPORT AUTHENTICATION
app.use(require("express-session")({
    secret: "My future lies somewhere west",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use('/parks', parkRoutes);
app.use('/parks/:id/reviews', reviewRoutes);
app.use('/', indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Express Server is up and running"); 
});
    
