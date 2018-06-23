var mongoose=require("mongoose");
var campGround=require("./models/campgrounds");
var Comment=require("./models/comment");
var data=[
    {
      name:"Cloud's Rest",
      image:"https://s3-media3.fl.yelpcdn.com/bphoto/-_TqRGH_wx8w0V8PhXd7ZA/ls.jpg",
      description:"blah blah blah"
    },
    {
      name:"Land's End",
      image:"https://i.pinimg.com/736x/df/4b/f5/df4bf5031c1584f566e6da93afc9a90a--washington-state-campgrounds-washington-state-camping.jpg",
      description:"blah blah blah"
    },
    {
      name:"Argentina",
      image:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Gallanach_Campsite_-_geograph.org.uk_-_36570.jpg/250px-Gallanach_Campsite_-_geograph.org.uk_-_36570.jpg",
      description:"blah blah blah"
    }
    
    
    ]

function seedDB(){
    campGround.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed all cg");
    });
    
    
   data.forEach(function(seed){
        campGround.create(seed,function(err,campground){
            if(err){
                console.log(err);
            }else{
                console.log("added a new campground");
                
                Comment.create({
                    text:"This place is great",
                    author:"Homer"
                },function(err,comment){
                    if(err){
                        console.log(err);
                    }else{
                        campground.comments.push(comment);
                        campground.save();
                        console.log("created a new comment")
                    }
                })
            }
        });
    });
}

module.exports=seedDB;