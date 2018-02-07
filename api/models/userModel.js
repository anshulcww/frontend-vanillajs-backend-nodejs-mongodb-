var db = require("./../dbconfig/db");
var crypto = require('crypto');
exports.getUserByUsername =(body, done) =>{
	//check whether username exists
		db.get().collection("username").find({username: body.username}).toArray(function(err, docs){
			console.log(docs, "dosbsj");
					if(err){
						done('DB-Error');
					}else{
						if(!docs.length){
						saltHashPassword(body.password);
						
					
						console.log(saltPassword);

						//inserting Data
						body.password = saltPassword;
						console.log(body.password);
						db.get().collection("username").insertOne(body, function(error, results){
				  		console.log("1 documnent inserted" + JSON.stringify(body));
				  		console.log(JSON.stringify(results));
				  		done(results);

		  			});
					}else{
					var userExist = {
						"already": body
					};
					console.log("already");
					done(userExist);
				};
				console.log(docs, ">>>>>>>>>>>");
				
			}
					//crypto password
					
	});
};	

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
						    
						    saltPassword={
						    	"newPassword": userpassword,
						    	"newSalt": passwordData.salt
						    }
						    console.log('UserPassword = '+userpassword);
						    console.log('Passwordhash = '+passwordData.passwordHash);
						    console.log('nSalt = '+passwordData.salt);

						}