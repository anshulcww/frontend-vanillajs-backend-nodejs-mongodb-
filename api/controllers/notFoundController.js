let view=require("./../views/fourView.js");

exports.get=(req,res)=>{
    view.send404Response(req,res);
};
