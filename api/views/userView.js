const writeHead=require("./writeHead.js");

exports.sendLoginDatatoClient = function(request, response, obj) {
    let reponseObj = {};
    console.log(obj, "obj");
    if (obj) {
      // filled response means we have a hitp
        responseObj = {
            userData: obj
        };
    }
    else {
      //could mean error, no hit, need separation
        responseObj = {
            status: 404
        };
    }
    console.log(responseObj);
    writeHead.get(response, responseObj, 200, "text/html");
};