let userModel = require("./../models/userModel.js");
let userView = require("./../views/userView.js");

exports.get = (request, response, path) => {
		console.log(path);

	switch (path){
		case "username":
			username(request, response);
			break;
		/*case "email":
			email(req, res);
			break;
		case "password":
			password(req, res);
			break;
		case "findname":
			findname(req, res);
			break;*/
			default:
			break;
	}

function username(request, response, data){
	var body = "";

	request.on("data", function(data){
		body += data;
		console.log(JSON.parse(body));

	});
	request.on("end", function(){
		userModel.getUserByUsername(JSON.parse(body), (usernameRes) => {
			if(usernameRes){
				console.log(JSON.stringify(usernameRes), ">>>>>>>>>>");
				userView.sendLoginDatatoClient(request, response, usernameRes);
			}else{
				userView.sendLoginDatatoClient(request, response, null);
			}
		});
	});
}
};


/*var data = "";
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
						            .toString('hex') 
						            .slice(0,length);   
						};
						function sha512(password, salt){
						    var hash = crypto.createHmac('sha512', salt); 
						    hash.update(password);
						    var value = hash.digest('hex');
						    return {
						        salt:salt,
						        passwordHash:value
						    };
						};
						function saltHashPassword(userpassword) {
						    var salt = genRandomString(16); 
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
		});*/