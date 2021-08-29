const router = require("express").Router();
const {readFile, writeFile} = require("fs");
const {v4} = require("uuid");

//Get Route

router.get("./notes",(req,res) => {
    readFile("./db/db.json","utf8", function (err,data)  {
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
    
    readFile("./db/db.json", "utf8", (err, data) =>  {
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

//Delete Route

router.delete("/notes/:id",(req,res) => {
    readFile("./db/db.json", "utf8", (err,data) => {
        if (err) {
            throw err;
        }
        let objNew = JSON.parse(data);  
        //parses db. json into mutable json format
        const deleteThis = objNew.findeIndex((note) => note.id ===req.params.id);
        //searches db for matching note id, retuens its index
        objNew.splice(deleteThis,1); //deletes that specific  note object from array of note objects
        const output = writeFile("./db/db.json", JSON. stringify(objNew), (err) => {
            if (err) {
                throw err;

            }
            console.log("Note rewritten");

        });
        res.send(output); 
        //send the rewritten file as response


    });
});

