var http = require("http");
var express = require('express');
console.log("Started server");

var aRouter = express();
var myServer = http.createServer(aRouter);

aRouter.use(express.static('client'));


aRouter.get('/users/:userid', function(req, res){
   res.send("You asked for data from User "+req.params.userid); 
});

aRouter.get('/', function(req, res){
    res.sendFile('static/index.html');
});

aRouter.get('/*', function(req, res){
   res.send("This is a different request"); 
});


myServer.listen(8080, '0.0.0.0');