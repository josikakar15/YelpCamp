var express      = require('express'),
 app             = express(),
 bodyParser      = require('body-parser'),
 mongoose        = require('mongoose'),
 flash           = require("connect-flash"),
 campGround      = require("./models/campgrounds"),
 methodeOverride = require('method-override'),
 passport        = require("passport"),
 localStrategy   = require('passport-local'),
 Comment         = require("./models/comment"),
 User            = require('./models/user'),
 seedDB          = require("./seed");
 
 
 var campgroundRoutes=require("./routes/campgrounds"),
     commentRoutes   =require("./routes/comments"),
     authRoutes      =require("./routes/index");

//seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/ublic"));
app.use(methodeOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:"This is gonna be my site",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
     res.locals.success=req.flash("success");
    
    next();
});





app.set("view engine","ejs");


app.use(authRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);






app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelp Server has started");
})