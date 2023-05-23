const { rejects } = require('assert');
const fs = require('fs'); //file system, for read and write
const { resolve } = require('path');
const getNewId = (array)=>{ //generate primary key
    if(array.Length>0){
        return array[array.length -1].id +1 // the id of last one +1
    }else{
        return 1;
    }
}
const newDate = ()=> new Date().toString(); //return new date
function mustBeInArray(array, id){
    return new Promise((resolve, reject)=>{ //usually promise has these 2 arguments
        const row = array.find(r => r.id==id) //work like if statement
        //!row? reject() : resolve();
        if(!row){
            reject({
                message: "ID not found",
                status: "404"
            })
        }
        resolve(row);
    });
}
function writeJSONFile(fileName, content){
    fs.writeFileSync(
        fileName, 
        JSON.stringify(content), //require string argument
        "utf8", //write file option
        (err)=>{
            if(err){
                console.log("Helper file writeJSONFile: " + err) //good practice to state the function name giving error
            }
        });
}
//export to other class
module.exports = {
    getNewId, 
    newDate, 
    mustBeInArray, 
    writeJSONFile
}

