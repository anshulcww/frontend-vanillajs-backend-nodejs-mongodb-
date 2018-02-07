var http = require('http');
var url = require("url");
var MONGODB_URI = process.env.MONGODB_URI||'mongodb://localhost:27017/login';
var db = require("./api/dbconfig/db");

var http_IP = process.env.IP||'127.0.0.1';
var port = process.env.PORT||8000;
//Creating A Server
var server = http.createServer(function(request, response){

	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
	response.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Token");
	response.setHeader('Content-Type', 'application/json');
	require('./api/router/router.js').get(request, response);
	

	// Gets the Form Data
})

//creating a database

db.connect(MONGODB_URI, function(err, db) {
 	if(err){
 		console.log("unable to connect to mongodb");
 	}else{
 		server.listen(port);
 		console.log("listening", http_IP, port);
 	}
});

/* if (err) throw err;
  console.log("Database created!");
  database = db.db("login");
  database.createCollection("username" ,function(err, res){
  	if(err) throw err;
  	console.log("collection created!");
  });*/