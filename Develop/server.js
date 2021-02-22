// Dependencies
const fs = require('fs');

const express = require('express');
const path = require('path');


// setting up the express app 
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))




// -------------- ROUTES --------------------------------------

// GET 

// route to my index.html
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

// route to my note.html
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// route to my db.json 
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, 'db/db.json')));

app.get('/api/notes/:id', (req,res) => {
    // creating a variable that is equal to a json parse file of db.json file
    let savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    res.json(savedNotes[Number(req.params.id)])
})
//  =======================================================
// POST 

// create a post route for saveNote

app.post('/api/notes', (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let uniqueID = (savedNotes.length).toString();
    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("Note saved to db.json. Content: ", newNote);
    res.json(savedNotes);
})

// ===========================================================
//DELETE

// create a delete route for deleteNote

app.delete("/api/notes/:id", function (req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteID = req.params.id;
    let newID = 0;
    console.log(`Deleting note with ID ${noteID}`);
    savedNotes = savedNotes.filter(currNote => {
        return currNote.id != noteID;
    })

    for (currNote of savedNotes) {
        currNote.id = newID.toString();
        newID++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})





// --------------------------------------------------------

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));