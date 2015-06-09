//notesHandler.js

var NoteModel = require("../models/NoteModel");

module.exports = function(req, reply) {
    var note = new NoteModel();
    note.load(req.params.id, function(err) {
        if (err) return reply.view("notes", {message: err, title: "List not found"});
        console.log(note.toJSON());
        reply.view("notes", {title: note.get("name"), noteList: note.toJSON()});
    });
};
