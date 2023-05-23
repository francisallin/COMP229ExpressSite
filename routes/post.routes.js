const router = require('./index.routes');
const {post} = require('./index.routes');
router.get('/', async (req, res)=>{ //async function
    //await keyword pause the function until a promise is resolved, then return fulfilled value
    //makes async function look like sync function    
    await post.getPosts() 
    .then(posts=>res.json(posts))
    .catch(err=>{
        if (err){
            res.json({
                message: "Something went wrong",
                status: 202
            })
        }
    })
})
// one particular post
router.get('/:id', async (req, res)=>{ //id is dynamic
    const id = req.params.id
    await post.getPosts(id)
    .then(posts=>res.json(posts))
    .catch(err=>{
        if (err){
            res.json({
                message: "Something went wrong",
                status: 202
            })
        }
    })
})