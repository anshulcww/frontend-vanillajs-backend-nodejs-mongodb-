var url = require('url');
const userModel = require("./../models/userModel.js");



//get function

exports.get = (request, response) => {
	let headers = {};

		if(request.method === "OPTIONS"){
				//console.log("!OPTIONS");
			    // IE8 does not allow domains to be specified, just the *
			    // headers["Access-Control-Allow-Origin"] = req.headers.origin;
			    console.log("!options");
				response.end();
			}else{
				request.requesturl = url.parse(request.url, true);
				let path = request.requesturl.pathname.substr(1);  //removing first / from url altogether
				let splittedPath = path.split("/");
				if(true){
					switch(splittedPath[0]){
						case ("user"):
						require("../controllers/userController.js").get(request, response, splittedPath.splice(1).join(""));
						break;
						default:
              			require("../controllers/notFoundController.js").get(request, response);
              			break;
					}
				}else{

						require("../controllers/notFoundController.js").get(request, response);

					}
	};
};


