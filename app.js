const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });
app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

const ArticleSchema = {
  title: String,
  content: String,
};
const Article = mongoose.model("Article", ArticleSchema);

app
  .route("/articles")
  .get(function (req, res) {
    Article.find(function (err, articlesresult) {
      if (!err) {
        res.send(articlesresult);
      } else {
        res.send(err);
      }
    });
  })
  .post(function (req, res) {
    const item = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    item.save(function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully added a post request");
      }
    });
  })
  .delete(function (req, res) {
    Article.deleteMany({}, function (err) {
      if (!err) {
        res.send("Successfully deleted the item");
      } else {
        res.send(err);
      }
    });
  });
app
  .route("/articles/:name")
  .get(function (req, res) {
    const searchtitle = req.params.name;
    Article.findOne({ title: searchtitle }, function (err, result) {
      if (!err) {
        res.send(result);
      } else {
        res.send(err);
      }
    });
  })
  .put(function (req, res) {
    Article.update(
      { title: req.params.name },
      { title: req.body.title, content: req.body.content },
      { overwrite: true },
      function (err) {
        if (!err) {
          res.send("Successfuly added");
        }
      }
    );
  }).
  patch(function(req,res){
    Article.update({title:req.params.name},
      {$set:req.body},
      function(err){
        if(!err){
          res.send("Successfully updated");
        }
      });
  }).delete(function(req,res){
    Article.deleteOne({title:req.params.name},function(err){
      if(!err){
        res.send("Successfully Deleted");
      }
    })
  });
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
