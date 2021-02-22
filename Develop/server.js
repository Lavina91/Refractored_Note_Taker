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




// -------------- ROUTES ----------------------------------

// GET 

// route to my index.html
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

// route to my note.html
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// route to my db.json 
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, 'db/db.json')));

app.get('/api/notes/:id', (req,res) => {
    let savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    res.json(savedNotes[Number(req.params.id)])
})
//  ==============================================
// POST 

// create a post route for saveNote

// =================================================
//DELETE

// create a delete route for deleteNote







// --------------------------------------------------------

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));