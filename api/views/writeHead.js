exports.get = (response, responseObj, status, contentType) => {
    console.log("writing head");
    response.writeHead(status, {
        "Content-Type": contentType
    });
    if (typeof responseObj === "string") {
        response.write(responseObj);

    }
    else {
        response.write(JSON.stringify(responseObj));
    }
    response.end();

};
