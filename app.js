var http = require('http');
var crypto = require('crypto');
var fs = require('fs');



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
		console.log(data.username);
		//check if user already exist
		database.collection("username").find({username: data.username}).toArray(function(err, docs){
			//crypto password
			if(!docs.length){
				saltHashPassword(data.password);
				function genRandomString (length){
				    return crypto.randomBytes(Math.ceil(length/2))
				            .toString('hex') /** convert to hexadecimal format */
				            .slice(0,length);   /** return required number of characters */
				};
				function sha512(password, salt){
				    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
				    hash.update(password);
				    var value = hash.digest('hex');
				    return {
				        salt:salt,
				        passwordHash:value
				    };
				};
				function saltHashPassword(userpassword) {
				    var salt = genRandomString(16); /** Gives us salt of length 16 */
				    var passwordData = sha512(userpassword, salt);
				    console.log('UserPassword = '+userpassword);
				    console.log('Passwordhash = '+passwordData.passwordHash);
				    console.log('nSalt = '+passwordData.salt);
				}
				//inserting Data
				database.collection("username").insertOne(data, function(error, results){
		  		console.log("1 documnent inserted" + data);
				response.end(JSON.stringify(results));

  			});
			}else{
				var userExist = {
					"already": data
				};
				response.end(JSON.stringify(userExist));
			};
		});
	});
};

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
