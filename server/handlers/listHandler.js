// listHandler.js

var NoteList = require("../models/NoteList");

module.exports = function(req, reply) {
    if (req.state.loggedIn != "true") return reply.redirect("/login");
    var noteList = new NoteList();
    noteList.loadList(req.state.user, function(err) {
        if (err) return reply.view("note", {message: err});
        reply.view("noteList", {notes: noteList.toJSON(), title: "notes", loggedIn: req.state.loggedIn});
    });
};
