//jshint esversion:6
//I&II
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB");
const articleSchema = {
  title: String,
  content: String
}
const Article = mongoose.model("Article", articleSchema);


//TODO---------------------------------------------------
/*
//III get all articles
app.get("/articles", function(req, res) {
  Article.find(function(err, foundArticles) {
    if (!err) {
      //console.log(foundArticles);
      res.send(foundArticles);
    } else {
      res.send(err);
    }

  })

})

//IV Post a new article
app.post("/articles",function(req,res){
  //console.log(req.body.title);
  //console.log(req.body.content);
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });

  //newArticle.save();
  newArticle.save(function(err){
    if(!err){
      res.send("Successfully added a new article");
    }else{
      res.send(err);
    }
  });

});

//V. Delete all articles
app.delete("/articles",function(req,res){
  Article.deleteMany(function(err){
    if(!err){
      res.send("Successfully deleted all articles");
    }else{
      res.send(err);
    }
  });

});
*/

////////////////////////Requests Targetting all Articles////////////////////////
//VI Refactoring code III-IV-V--------------------------------------------------
//Chained Route Handlers Using Express
//https://expressjs.com/en/guide/routing.html   app.route()
app.route("/articles")

//III get all articles
.get(function(req, res) {
  Article.find(function(err, foundArticles) {
    if (!err) {
      //console.log(foundArticles);
      res.send(foundArticles);
    } else {
      res.send(err);
    }

  });

})

//IV Post a new article
.post(function(req,res){
  //console.log(req.body.title);
  //console.log(req.body.content);
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  })

  //newArticle.save();
  newArticle.save(function(err){
    if(!err){
      res.send("Successfully added a new article");
    }else{
      res.send(err);
    }
  });

})

//V. Delete all articles
.delete(function(req,res){
  Article.deleteMany(function(err){
    if(!err){
      res.send("Successfully deleted all articles");
    }else{
      res.send(err);
    }
  })

})


////////////////////////Requests Targetting A Specific Article////////////////////////
//VII.Get a specific Article
app.route("/articles/:articleTitle")
.get(function(req,res){
  Article.findOne({title: req.params.articleTitle},function(err,foundArticle){
    if(foundArticle){
      res.send(foundArticle);
    }else{
      res.send("No articles matching that title was found");
    }
  });

})

//VIII.PUT a specific Article
.put(function(req,res){
  Article.replaceOne( //.update  in older version
    {title: req.params.articleTitle}, //condition
    {title: req.body.title, content: req.body.content}, //update
    function(err){
      if(!err){
        res.send("Successfullly updated article.");
      }
    }
  );
})
//IX.PATCH a specific Article
.patch(function(req, res) {
  Article.updateOne(
    { title: req.params.articleTitle}, //condition
    req.body, //update //https://mongoosejs.com/docs/api/model.html#model_Model-updateOne
    // {$set: req.body} in older version

    function(err) {
      if (!err) {
        res.send("Successfullly updated article.");
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
})

//X Delete a specific Article
.delete(function(req, res) {
  Article.deleteOne(
    { title: req.params.articleTitle},
    function(err) {
      if (!err) {
        res.send("Successfullly deleted article.");
      } else {
        res.send(err);
        console.log(err);
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
