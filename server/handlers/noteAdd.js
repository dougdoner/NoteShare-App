//noteAdd.js

var NoteModel = require("../models/NoteModel");
var forms = require("forms");
var forms = require("forms");
var fields = forms.fields;
var validators = forms.validators;
var widgets = forms.widgets;
var db = require("../../Db");

var noteForm = forms.create({
  noteName: fields.string({
    required: true,
    widget: widgets.text({
      placeholder: "Note Name"
    })
  })
});

module.exports = function(req, reply) {
    if (req.method == "post") {
        var note = new NoteModel({name: req.payload.noteName});
        var userId = db.prepare("SELECT * FROM users WHERE username = $username");
        userId.get({
            $username: req.state.user
        }, function(err, result) {
            if (err) return console.log(err);
            if (!result) return console.log("User not found");
            note.create(result.userId, function(err) {
                var statement = db.prepare("SELECT * FROM lists WHERE listName = $listName");
                statement.get({
                    $listName: req.payload.noteName
                }, function(err, result) {
                    if (err) return reply.redirect("/note/create", {message: err});
                    reply.redirect("/note/" + result.listId, {message: "Note created"});
                });
            });
        });
    }
    else {
        reply.view("login", {formClass: "noteAdd", title: "NoteShare", pageTitle: "Add Note", formMethod: "POST", formBody: noteForm.toHTML(), formAction: "/note/create", formButton: "Create Note"});
    }
};
