var MongoClient = require("mongodb").MongoClient;
assert = require("assert");
let state = {
	db: null
};
let database;

exports.connect = (url, done) => {
	if(state.db) return done();
	MongoClient.connect(url, (err, db) => {
		if(err){
			return done(err);
		}
		state.db = db.db("login");
		done();
		database = state.db;
		database.createCollection("username" ,function(err, res){
	  	if(err) throw err;
		});
	});
};

exports.get = () => {
  return state.db
}

/*exports.close = (done) => {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null;
      state.mode = null;
      done(err);
    })
  }
};*/
