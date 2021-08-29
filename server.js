const router = require("express").Router();
const {readFile, writeFile} = require("fs");
const {v4} = require("uuid");

//Get Route

router.get("./notes",(req,res) => {
    readFile("./db/db.json","utf8",function (err,data)  {
        let noteData = [];
        if (err) {
            throw err;
        }
        
        if (data.length > 0) {
            noteData = JSON.parse(data);
            res.json(noteData);
         }else {
                console.log("No notes saved");
            }
        
    });
});