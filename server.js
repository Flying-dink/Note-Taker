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

//Post Route
router.post("/notes", {req ,res} => {
    let newNote = req.body;
    
    readFile("./bd/bd.json", "utf8", (err, data) => {
        if (err) {
            console.log(`err at the database ${err}`);
        } else {
            if (data.legnth > 0) {
                obj = JSON.parse(data);//if db.json is Not empty
             } else {
                obj = [];//if  it is empty
             }
        
        
        newNote.id = v4().substring(0.4);
        obj.push(newNote);
        
        writeFile("./db/db.json", JSON.stringify(obj),"utf8", (err) => {
            if (err) {
                throw err;
            }
            console.log("Note Saved.");

            //Refreshes the note list again with the res. json(noteData) sends back the notes as response-
            readFile("./db/db.json", "utf8", function (err, data)  {
                let noteData = [];
                if (err) {
                    throw err;
                    //if notes array is not empty
                    if (data.length >0) {
                        noteData = JSON.parse(data);
                        res.json(noteData);
                    }else{ 
                        console.log ("No notes saved");
                    }
                });
            }); 

        }
    });
}};

