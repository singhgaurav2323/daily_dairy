

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://admin_gaurav:Test1234@cluster0-4eqq5.mongodb.net/journel', {useNewUrlParser: true});

const listSchema = mongoose.Schema({
  name : String,
  content : String
});

const List =  mongoose.model("List", listSchema);


const homeStartingContent = "It's about the content which speak the most. the thought which having the great and advance effect on the mind and the soul. So as to be thoughfull person we first need to be interactive and consoling one to be framed to somone else first. SO welcome all to the deliberate place for this that is a blog place to share and listen some stuff and understand each word for the best.";
const aboutContent = "Life has phases and changes which always being surprising to all and especially for self. Never the less we have to accept that all for our sake and progress , we  term it to bold but someone having other opinion about that who say to be what and change the other , that is also not bad but the fact is all about the point of view of everyone to present and interact to all. Hence her is a friend who listen and store all that you can easily share and retrieve all that any point of time . So welcome you to your personal diary and just have sharing part so that no one else can have it";
const contactContent = "So if you like all let share some part and be coonect some great part not only by words but by desire. There should be a part of me first or him fist its about connection . So i welcome all to this part and here it about to grow up the circle. Else will be update in future";

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
  List.find({}, function(err, data){
    res.render("home" ,{home :homeStartingContent ,poster :data});
  });
});

app.get("/about", function(req, res){
  res.render("about",{about :aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contact :contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose" ,function(req, res){
    var item = new List ({
    name : req.body.postTitle,
    content : req.body.postBody
  });

  item.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){
  
const reqobj =  req.params.postId;
List.findOne({_id: reqobj}, function(err, obj){
      res.render("post", {
                        title: obj.name, 
                        content: obj.content
                      });
                    });
});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log(" The Server has started ");
});
