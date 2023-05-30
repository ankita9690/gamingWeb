
//requiring packages
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
const _=require("lodash");
// security
var md5 = require('md5');

//setting packages
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

////////////////////////////////////////////////////// MONGODB //////////////////////////////////////////////////////
mongoose.connect("mongodb+srv://ankitakundliya:Anki1230@cluster0.mx9by2w.mongodb.net/gamingWEB",{useNewUrlParser:true}); //ankita2kundliya@gamil.com

// account schema
const accountSchema=new mongoose.Schema({
  emailID: String,
  password: {
    type:String,
    require:[true,"create password"],
    minLength: [6,"Must be at least 6"]
  }
});
// account collection
const accCollections=new mongoose.model('accCollections',accountSchema);

// profile Schema
const profileSchema=new mongoose.Schema({
  playerName:String,
  playerEmail: String,
  playerPhoneNo: {
    type: Number,
    min: 10
  }
});
// profile collection
const profilecols=new mongoose.model('profilecols',profileSchema);


////////////////////////////////////////////////////// GET METHOD //////////////////////////////////////////////////////
app.get("/",function(req,res){
  res.render("home");
});
app.get("/guestpage",function(req,res){
  res.render("guestpage");
});
app.get("/parallax",function(req,res){
  res.render("parallax");
});
app.get("/signup",function(req,res){
  res.render("signup");
});
app.get("/signin",function(req,res){
  res.render("signin");
});
app.get("/profile",function(req,res){
  res.render("profile");
});
app.get("/finalprofile", function(req, res) {
  const enteredemail = req.query.enteredemail; // Get the email from the query parameter
  profilecols.findOne({ playerEmail: enteredemail }, function(err, found) {
    if (!err) {
      if (found) {
        res.render("finalprofile", {
          fpname: found.playerName,
          fpemail: found.playerEmail,
          fpnum: found.playerPhoneNo
        });
        console.log("playername in final profile page");
      }
    }
  });
});
app.get("/emailejs",function(req,res){
  res.render("email");
});
app.get("/gamepage",function(req,res){
  res.render("gamepage");
});
app.get("/about",function(req,res){
  res.render("about");
});
app.get("/query",function(req,res){
  res.render("query");
});
// games
app.get("/snake",function(req,res){
  res.render("gamesejs/snake");
});
app.get("/puzzle",function(req,res){
  res.render("gamesejs/puzzle");
});
app.get("/guesscolor",function(req,res){
  res.render("gamesejs/guesscolor");
});
app.get("/card",function(req,res){
  res.render("gamesejs/card");
});
app.get("/simon",function(req,res){
  res.render("gamesejs/simon");
});
app.get("/drumkit",function(req,res){
  res.render("gamesejs/drumkit");
});
app.get("/tictactoe",function(req,res){
  res.render("gamesejs/tictactoe");
});
app.get("/flappybird",function(req,res){
  res.render("gamesejs/flappybird");
});
//alert display
app.get("/accCreated",function(req,res){
  res.render("alertejs/accCreated");
});
app.get("/accExist",function(req,res){
  res.render("alertejs/accExist");
});
app.get("/pswdErr",function(req,res){
  res.render("alertejs/pswdErr");
});
app.get("/userErr",function(req,res){
  res.render("alertejs/userErr");
});


////////////////////////////////////////////////////// POST METHOD //////////////////////////////////////////////////////
app.post("/",function(req,res){
  var check=req.body.button;
  if(check === "getstarted"){
    res.redirect("/parallax");
  }
  else if(check === "guestbtn"){
    res.redirect("/guestpage");
  }
  else if(check === "signupbtn"){
    res.redirect("/signup");
  }
  else if(check === "signinbtn"){
      res.redirect("/signin");
    }
  else if(check === "profilebtn"){
    res.redirect("/emailejs");
  }
  else if(check === "homepage"){
    res.redirect("/");
  }
  else if(check === "gamesbtn"){
    res.redirect("/gamepage")
  }
  else if(check === "aboutbtn"){
    res.redirect("/about");
  }
  else if(check === "querybtn"){
    res.redirect("/query");
  }
// games
  else if(check === "snakebtn"){
    res.redirect("/snake");
  }
  else if(check === "puzzlebtn"){
    res.redirect("/puzzle");
  }
  else if(check === "guesscolorbtn"){
    res.redirect("/guesscolor");
  }
  else if(check === "cardbtn"){
    res.redirect("/card");
  }
  else if(check === "simonbtn"){
    res.redirect("/simon");
  }
  else if(check === "drumkitbtn"){
    res.redirect("/drumkit");
  }
  else if(check === "tictactoebtn"){
    res.redirect("/tictactoe");
  }
  else if(check === "flappybirdbtn"){
    res.redirect("/flappybird");
  }
});

app.post("/signup",function(req,res){
    const ejsuseremail=req.body.newuseremail;
    const ejsuserpswd=md5(req.body.newuserpswd);
    const checkbtn=req.body.button;
    if(checkbtn === "usersignup"){
      const newusercons=new accCollections({
        emailID: ejsuseremail,
        password: ejsuserpswd
      });
      accCollections.findOne({emailID:ejsuseremail})
        .then(function (found) {
          if(!found){
            newusercons.save();
            res.redirect("/accCreated");
          }else{
            res.redirect("/accExist");
          }
        })
        .catch(function (err) {
          console.log(err);
        });
      }else{
        res.redirect("/signin");
      }
});

app.post("/signin",function(req,res){
  const enteredemail=req.body.useremail;
  const enteredpswd=md5(req.body.userpswd);
  const checkbtn=req.body.button;
  if(checkbtn === "userlogin"){
    accCollections.findOne({emailID:enteredemail},function(err,found){
      if(!err){
        if(found){
          if(found.password === enteredpswd){
            // console.log("password matched");
            res.redirect(`/finalprofile?enteredemail=${enteredemail}`);
          }else{
            res.redirect("/pswdErr");
          }
        }else{
          res.redirect("/userErr");
        }
      }else{
        console.log(err);
      }
  });
}else{
  res.redirect("/signup");
}
});


app.post("/profile",function(req,res){
  const enteredname=req.body.playername;
  const enteredemail=req.body.playeremail;
  const enterednum=req.body.playernum;
  const profile1=new profilecols({
    playerName:enteredname,
    playerEmail:enteredemail,
    playerPhoneNo:enterednum
  });
  profilecols.findOne({playerEmail:enteredemail},function(err,found){
    if(!err){
      if(found){
        if(found.playerEmail === enteredemail){
            profilecols.updateOne({playerName:found.playerName},{$set:{playerName:enteredname, playerPhoneNo:enterednum}},function(err,result){
              if(!err){
                // console.log("Successfully update profile");
                res.redirect("/finalprofile");
              }
            });
        }
      }else{
        // console.log("new profile saved");
        profile1.save();
        res.redirect(`/finalprofile?enteredemail=${enteredemail}`);
      }
    }else{
      console.log(err);
    }
  });
});

app.post("/finalprofile",function(req,res){
  const btnclicked=req.body.button;
  if(btnclicked === "editbtn"){
    res.redirect("/profile");
  }else{
    res.redirect("/gamepage");
  }
});

app.post("/emailejs",function(req,res){
  const enteredemail=req.body.emailvalue;
  res.redirect(`/finalprofile?enteredemail=${enteredemail}`);
})

// alert posts
app.post("/accCreated",function(req,res){
  res.redirect("/profile");
});
app.post("/accExist",function(req,res){
  res.redirect("/signin");
});
app.post("/pswdErr",function(req,res){
  res.redirect("/signin");
});
app.post("/userErr",function(req,res){
  res.redirect("/signup");
});


// Close MongoDB connection when the Node.js process is terminated
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

// Start the server
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
});
