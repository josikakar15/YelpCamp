var express=require("express");
var router=express.Router();
var campGround=require("../models/campgrounds");
var middleware=require("../middleware");


router.get("/",function(req,res){
    campGround.find({},function(err,allcampgrounds){
        if(err){
            console.log(err);
        }else{
             res.render("campgrounds/index",{campgrounds:allcampgrounds, currentUser:req.user});
        }
    })
        
       
});

router.post("/",middleware.isLoggedIn,function(req,res){
    var name=req.body.name;
    var price=req.body.price;
    var image=req.body.image;
    var desc=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var newcampGround={name:name, price:price,image:image, description:desc, author:author};
   campGround.create(newcampGround,function(err,newlycreated){
       if(err){
           console.log(err);
       }else{
            res.redirect("/campgrounds");
       }
   })
   
    
});

router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

router.get("/:id",function(req,res){
  campGround.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
      if(err){
          console.log(err);
      }else{
          console.log(foundCampground);
          res.render("campgrounds/show",{campground:foundCampground});
      }
  }) ; 

});


router.get("/:id/edit",middleware.checkCGOwnership,function(req,res){
     campGround.findById(req.params.id,function(err,foundcampground){
         res.render("campgrounds/edit",{campground:foundcampground});
     })
   
});

router.put("/:id",middleware.checkCGOwnership,function(req,res){
    campGround.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedcampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+updatedcampground._id);
        }
    });
});

router.delete("/:id",middleware.checkCGOwnership,function(req,res){
    campGround.findByIdAndRemove(req.params.id,function(err,deletedcampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});




module.exports=router;