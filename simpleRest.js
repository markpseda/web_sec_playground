var http = require("http");
var express = require('express');
var bodyParser = require('body-parser');
console.log("Started server");

var aRouter = express();
var myServer = http.createServer(aRouter);
aRouter.use(bodyParser.json());
aRouter.use(bodyParser.urlencoded({ extended: true }));
aRouter.use(express.static(__dirname + "/client"));

var users = [];

var userCount = 0;

users.push({data:"Mark", id:"something"});
users.push({data:"Sam", id:"strange"});

aRouter.get('/users/:userid', function(req, res){
   //res.send("You asked for data from User "+req.params.userid);
   res.send(users.find(x => x.id === req.params.userid));
});

aRouter.get('/users', function(req, res){
    //res.send("You asked for data from User "+req.params.userid);
    res.send(users);
 });

aRouter.post('/users', function(req, res){
    userCount++;
    users.push({data:req.body, id:userCount.toString()});
   res.send(userCount.toString());
});

aRouter.put('/users/:userid', function(req, res){
    var user = users.find(x => x.id === req.params.userid);
    user.data = req.body;
    res.send(user);
});

aRouter.delete('/users/:userid', function(req,res){
    var i = users.findIndex(x => x.id === req.params.userid);
    if( i > -1)
    {
        users.splice(i, 1);
        res.send("deleted user");
    }
    else
    {
        res.send("user not found");
    }
});

aRouter.get("/*", function(req, res){
   res.send("Not found"); 
});


myServer.listen(8080, '0.0.0.0');