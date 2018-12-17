var http = require("http");
var express = require('express');
var bodyParser = require('body-parser');
console.log("Started server");

var aRouter = express();
var myServer = http.createServer(aRouter);
aRouter.use(bodyParser.json());
aRouter.use(bodyParser.urlencoded({ extended: true }));
aRouter.use(express.static(__dirname + "/client"));

// mongodb stuff
var mongoose = require('mongoose');



mongoose.connect('mongodb+srv://Seda:DojWE4a0k%211j@freecluster-ig2di.mongodb.net/forumAPI?retryWrites=true');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("Database works!");
    // working!
});


var TopicModel = require('./models/topic');
var CommentModel = require('./models/comment');


aRouter.get('/topic', function(req, res){
    //return list of topics
    TopicModel.find({}, {title : 1, _id : 1}, function(err, topics){
        if(err)
        {
            console.log(err);
            res.send("error");
            return;
        }
        console.log(topics);
        res.send(topics);
    });
 });

 aRouter.get('/topic/:topicid', function(req, res){
    // return a specific topic
    TopicModel.findById(req.params.topicid, {title : 1, _id: 0}, function(err, topic){
        if(err)
        {
            console.log(err);
            res.send("error");
            return;
        }
        console.log(topic);
        res.send(topic);
    });
});

// Create a new topic
aRouter.post('/topic', function(req, res){
    console.log(req.body.title);
    var newTopic = new TopicModel({title:req.body.title});
    newTopic.save(function(err){
        if (err)
        {
            console.log(err);
            res.send("error");
            return;
        } 
        console.log("Topic with title " + newTopic.title + " added to database with id: " + newTopic._id);
        res.send(newTopic._id);
    });
});

// Create a new comment
aRouter.post('/topic/:topicid/comments', function(req, res){
    TopicModel.findById(req.params.topicid, function(err, topic){
        if(err)
        {
            console.log(err);
            res.send("error finding topic");
            return;
        }

        // create new comment with fields filled from body of POST request
        var newComment = new CommentModel({user:req.body.user, text:req.body.text});

        // log the new comment
        console.log("New Comment: ")
        console.log(newComment);
        console.log("======================")

        // add the comment to the associated topic
        topic.comments.push(newComment);

        // save the now commented-on topic
        topic.save(function(err){
            if(err)
            {
                console.log(err);
                res.send("error saving updated topic");
            }
            console.log("Success adding comment!");
        });
        // respond with the id of the new comment
        res.send(newComment._id);
    });
    // create a new comment under topic, topicidea, and return a commentid
});

aRouter.get('/topic/:topicid/comments', function(req, res){
    TopicModel.findById(req.params.topicid, {comments : 1, _id : 0}, function(err, topic){
        if(err)
        {
            console.log(err);
            res.send("error");
            return;
        }
        console.log(topic);
        res.send(topic);
    });
});

aRouter.get("/*", function(req, res){
   res.send("Not found"); 
});


myServer.listen(9000, '0.0.0.0');