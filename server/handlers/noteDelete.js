//notesHandler.js

var NoteModel = require("../models/NoteModel");

module.exports = function(req, reply) {
    if (req.state.loggedIn != "true") return reply.redirect("/login");
    var note = new NoteModel({id: req.params.id});
    note.delete(req.params.id, function(err) {
        if (err) return reply.redirect("/notes");
        reply.redirect("/notes");
    });
};