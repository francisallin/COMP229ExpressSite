// const express = require('express');
// const router= express.Router();
// const post= require('../models/post.model');
 const m = require('../helpers/middlewares');
// Routes 

const router = require('./index.routes');
const post = require('../models/post.model');
module.exports= router;

//All posts
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
router.get('/:id', m.mustbeInteger, async (req, res)=>{ //id is dynamic
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
//insert a new post
router.post('/', m.checkFieldPost, async (req, res) => {
    await post.insertPost(req.body)
    .then(post=>res.status(201).json({
        message: `The post #${post.id} has been created`,
        content: post
    }))
    .catch(err=>res.status(500).json({message: err.message}))
})
//update a post
router.put('/:id', m.mustbeInteger, m.checkFieldPost, async (req, res)=>{
    const id = req.params.id;
    await post.updatePost(id, req.body)
    .then(post => res.json({
        message: `The post #${id} has been updated`,
        content: post
    }))
    .catch (err => {
        if (err.status) {
            res.status(err.status).json({
                message: err.message
            })
        }
        res.status(500).json({message: err.message})
    })
})
//delete a post
router.delete('/:id', m.mustbeInteger, async (req, res)=>{
    const id = req.params.id;
    await post.deletePost(id)
    .then(post => res.json({
        message: `The post #${id} has been deleted`
    }))
    .catch(err => {
        if (err.status){
            res.status(err.status).json({
                message: err.message
            })
        }
        res.status(500).json({message: err.message})
    })
})