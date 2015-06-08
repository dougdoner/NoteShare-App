//notesHandler.js

var ListModel = require("../models/listModel");

module.exports = function(req, reply) {
    var list = new ListModel();
    list.load(req.params.id, function(err) {
        if (err) return reply.view("notes", {message: err, title: "List not found"});
        console.log(list.toJSON());
        reply.view("notes", {title: list.get("name"), noteList: list.toJSON()});
    });
};
