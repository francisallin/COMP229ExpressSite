//imports the functions from helper
const helper = require('../helper.js');
const { writeJSONFile, getNewId, newDate } = require('../helpers/helper.js');
//variable, can use let or var but use const here because it is not changing
const filename = '../posts.json';
//get array from filename
let posts = require(filename);
//read
//get all posts
const getPosts = ()=>{
    return new Promise ((resolve, reject)=>{
        //if else for responding to null array
        if(posts.length ===0){ //triple "=" to match case && value
            reject({
                message: "Sarry, no posts available to display!",
                status: 202
            })
        }
        else {
            resolve(posts)
        }        
    })
}
//get particular post
const getpost = (id) =>{
    return Promise ((resolve, reject)=>{ // no need create new promise, because mustBeInArray already create one
        helper.mustBeInArray(posts, id)
        .then(post => resolve (post))//can chain another .then() if needed
        .catch(err => reject(err))//if reject      
    })
}
//inserting a post
const insertPost = (newPost)=>{
    //array.push(id) <-- id should be unique, use getNewId
    return new Promise ((resolve, reject)=>{ //the functions called does not create new promise
        const id = {id: helper.getNewId(posts)}//make a new id for the newPost
        const date = {
            createdAt: newDate(),//get sys date
            updatedAt: newDate()
        }
        newPost = {...id, ...date, ...newPost};//... = spread operator, pack up everything as obj attr
        posts.push(newPost);
        writeJSONFile(filename, posts);
        resolve(newPost, 200);
    })
}
//update post
const updatePost = (id, newPost)=>{
    return new Promise((res, rej)=>{ 
        helper.mustBeInArray(posts, id)
        .then(
            post => {
                const index = posts.findIndex(p => p.id == post.id);//return id of the particular post and store in index
                id = {id: post.id}//not getNewId because just get original id
                const date = {
                    createdAt: post.createdAt,
                    updatedAt: newDate()
                }
                posts[index] = {...id, ...date, ...newPost} //loop through posts, make new post at that index
                writeJSONFile(filename, posts);
                resolve(posts[index]);
            }
        )
        .catch(err => reject(err))      
    })
}
//delete post
const deletePost = (id)=>{
    return new Promise((res, rej)=>{ 
        helper.mustBeInArray(posts, id)
        .then(()=>{
            //filter will loop throught the array
            posts = posts.filter(p => p.id !==id) //update posts, but skip the mentioned id
            writeJSONFile(filename, posts)
            resolve()//optional parameter: 200
            //empty param because no need return anything after deletion
            //others need because some other functions may use the param, eg angular will get the array and change to HTML
        })
        .catch(err => reject(err))      
    })
}