var campGround=require("../models/campgrounds.js");
var Comment=require("../models/comment.js");

 var middlewareObj={};



middlewareObj.checkCGOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        campGround.findById(req.params.id,function(err,foundcampground){
        if(err){
            req.flash("error","campground not found.");
            res.redirect("back");
        }else{
            if(foundcampground.author.id.equals(req.user._id)){
             next();
            }else{
                req.flash("error","You don't have the permission to do that.");
                res.redirect("back");
            }
        }
    })
    }else{
        req.flash("error","You need to be logged in to do that.");
        res.redirect("back");
    }
    
};

middlewareObj.checkCOwnership=function (req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundcomment){
        if(err){
            res.redirect("back");
        }else{
            if(foundcomment.author.id.equals(req.user._id)){
             next();
            }else{
                req.flash("error","You don't have the permission to do that.");
                res.redirect("back");
            }
        }
    })
    }else{
        req.flash("error","You need to be logged in to do that.");
        res.redirect("back");
    }
    
};

middlewareObj.isLoggedIn=function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that.")
    res.redirect("/login");
};




module.exports=middlewareObj;