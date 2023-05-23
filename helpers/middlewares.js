function mustbeInteger(req, res, next){
    const id = req.params.id;// the params must have id
    if(!Number.isInteger(parseInt(id))){ //id is string in json
        res.status(400).json({message: 'ID must be in integer'})
    }else{
        next()
    }
}
function checkFieldPost(req, res, next){
    const {title, content, tags} = req.body //filter and get these 3 elements from the req array body
    if(title && content && tags){
        next();
    }else{
        res.status(400).json({message: 'Fields should not be empty'})
    }
}
module.exports = {
    mustbeInteger,
    checkFieldPost
}
