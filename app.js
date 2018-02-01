var http = require('http');



var database;






//Creating A Server
http.createServer(function(request, response){

	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
	response.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Token");
	response.setHeader('Content-Type', 'application/json');
	console.log('Server hit..');
	if(request.method == "OPTIONS"){
		response.end();
	}else{
	var data = "";
	request.on('data', function(chunk){
		data += chunk;		
		console.log(chunk);
	});
	request.on('end', function(){
		console.log(data);
		data = JSON.parse(data);
		console.log(data);
		database.collection("username").insertOne(data, function(error, results){
  		console.log("1 documnent inserted" + data);
		response.end(JSON.stringify(results));

  	});
	});
	}

	// Gets the Form Data
}).listen(8000, function(){
	console.log('listening on port 8000....')
});


//creating a database
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/login";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  database = db.db("login");
  database.createCollection("username" ,function(err, res){
  	if(err) throw err;
  	console.log("collection created!");
  });
});
