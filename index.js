// const http = require('http'); //import an http module (because need to make http request), just like import library in C#
// http.createServer((req,res)=>{//create argument obj to store user request and response
//     res.write('<h1> Welcome to my class </h1>');
//     res.end(); // must use, otherwise will create infinite loop

// }).listen(8080);//designate the port number to listen to, apache server usually use 8080
// //in terminal, run npm start --> go to browser localhost:8080 --> show the message

//imports
const express = require('express');
const morgan = require('morgan');
//app init
const app = express();
//Morgan
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(require('./routes/index.routes.js'))//save the stuff in this js in app obj
//first route (route=Eg: /main)
app.get('/', (req, res)=>{
    res.json({
        message: "Welcome to the class"
    })
});
app.listen('8080');
