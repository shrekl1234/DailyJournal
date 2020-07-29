//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
let ejs = require("ejs");

const homeStartingContent = "Hey there, This is homepage of your Journal";
const aboutContent = "I'm just making your life easy!!!!!";
const contactContent = "Tum to hame jante ho";

var title = "";
const posts = [];
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.use(express.static("images"));

app.get("/", function(req, res) {

  res.render("home", {

    homeStartingContent: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  let post = {
    lowerCaseTitle: _.lowerCase(req.body.titleText),
    title: req.body.titleText,
    post: req.body.postText
  };
  posts.push(post);
  res.redirect("/");
});
const x = "";
app.get("/post/:postTitle", function(req, res) {

  console.log(req.params.postTitle);
  posts.findIndex(function(i) {
    if (i.title === req.params.postTitle || i.title.toLowerCase() === _.lowerCase(req.params.postTitle)) {
      res.render("post", {

        title: i.title,
        post: i.post

      });
    }
  });
});






app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
