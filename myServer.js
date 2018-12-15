var http = require("http");
console.log("Started server");
var myServer = http.createServer(function(request, response){
   //console.log(request);
   //console.log(response);

   //console.log(request.headers);
   //console.log("*******************");
   //console.log(request.rawHeaders.method)
   //console.log(request.rawHeaders.url)
   //console.log(request.url);
   console.log(request.method);
   console.log(request.url);

   response.setHeader('Content-Type', 'text/html');
   var searchResult = request.url.search('/users/:');
   if(searchResult != -1)
   {
      var number = request.url.split(':');
      response.write("<p> Your requested data on user number " + number[1] + "</p>");
   }
   else
   {
      response.write("<p> Invalid Request! </p>");
   }
});

myServer.listen(8080, '0.0.0.0');