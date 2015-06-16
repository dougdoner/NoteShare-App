// listHandler.js

var NoteList = require("../models/NoteList");

module.exports = function(req, reply) {
    var noteList = new NoteList();
    noteList.loadList(function(err) {
        if (err) return reply.view("note", {message: err});
        reply.view("noteList", {notes: noteList.toJSON(), title: "notes"});
    });
};
