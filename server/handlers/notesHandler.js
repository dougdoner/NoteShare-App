//notesHandler.js

var NoteModel = require("../models/NoteModel");

module.exports = function(req, reply) {
    if (req.state.loggedIn !== true) return reply.redirect("login");
    var note = new NoteModel({id: req.params.id});
    note.load(req.params.id, function(err) {
        if (err) return reply.view("notes", {message: err, title: "List not found"});
        console.log("Contents of note.toJSON(): ", note.toJSON());
        reply.view("notes", {action: "/note/" + req.params.id + "/create", title: note.get("name"), noteList: note.toJSON(), noteId: req.params.id});
    });
};
