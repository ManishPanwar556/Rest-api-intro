const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true});
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const ArticleSchema={
    title:String,
    content:String
}
const Article=mongoose.model("Article",ArticleSchema);

app.get("/articles",function(req,res){
    Article.find(function(err,articlesresult){
        if(!err){
            res.send(articlesresult);
        }
        else{
            res.send(err);
        }
    })
})
app.post("/articles",function(req,res){
    const item=new Article({
        title:req.body.title,
        content:req.body.content
    });
    item.save(function(err){
        if(err){
            res.send(err);
        }
        else{
            res.send("Successfully added a post request");
        }
    });
});

app.delete("/articles",function(req,res){
    Article.deleteMany({},function(err){
        if(!err){
            res.send("Successfully deleted the item");
        }
        else{
            res.send(err);
        }
    });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});