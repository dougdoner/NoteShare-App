//noteAdd.js

var NoteModel = require("../models/NoteModel");
var forms = require("forms");
var forms = require("forms");
var fields = forms.fields;
var validators = forms.validators;
var widgets = forms.widgets;

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
        note.create(2, function(err) {
            if (err) return reply.redirect("/note/create", {message: err});
            reply.redirect("/note/create", {message: "Note created"});
        });
    }
    else {
        reply.view("login", {formClass: "noteAdd", title: "NoteShare", pageTitle: "Add Note", formMethod: "POST", formBody: noteForm.toHTML(), formAction: "/note/create", formButton: "Create Note"});
    }
};
