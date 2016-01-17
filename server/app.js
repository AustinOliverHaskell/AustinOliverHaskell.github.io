console.log("Opened App . js");

var http = require("http");

var server = http.createServer(

	function (req, res) {
		
		console.log("URL: " + req.url);
		
		if(req.url === "/someurl") {

			//set the response code and content type and return 
			res.writeHead(200, {"Content-Type": "text/plain"});
			res.end("this is some url");

		} else if (req.url === "/someotherurl") {

			//set the response code and content type and return 
			res.writeHead(200, {"Content-Type": "text/plain"});
			res.end("this is some other url");

		} else { //error

			//send an error message
			res.writeHead(404, {"Content-Type": "text/plain"});
			res.end("Data not found");
		}
		
		res.writeHead(200, {"content-type" : "text/html"});
		res.end("<html></html>"); // Html goes here
	}
);

console.log("Server has started on port 3000");

server.listen(3000);

