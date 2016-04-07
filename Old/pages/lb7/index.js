/* import the functionality in the 'express' 
package that we downloaded using npm */
var express = require("express");

/* use the express() to make an express application object.
the application object will listen for requests, send them
through the middleware, and eventually the defined routes
will handle the request and generate a response */
var app = express();


/*this middleware will log the method and url for each request */
app.use(function(req, res, next){
	/*log the request object's method (GET, POST, etc) and URL */
	console.log("Method: " + req.method + " URL: " + req.url);
	
	/*give permission for the next middleware in the pipe to use
	  the request and response objects */
	next();
});

/* tell the app to use express's static file server to serve any files
   in the project directory's 'public' directory. If a requested file
   is found it is served and the middleware chain is stopped */
app.use(express.static("./public"));

app.get("/present", function(req, res){
	
	/* express response objects are more powerful than http
	   there is a json function that stringifies the json,
	   sets the content type, and sets the response body */
	res.json(presentMembers);

});

// Listen for server requests
app.listen(3000); 

// Log
console.log("Server listening on port 3000");


























