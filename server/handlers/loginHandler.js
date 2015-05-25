//Caolan's forms module for building forms
var forms = require("forms");
var fields = forms.fields;
var validators = forms.validators;
var widgets = forms.widgets;

var loginForm = forms.create({
  username: fields.string({
    required: true,
    widget: widgets.text({
      placeholder: "Username"
    })
  }),
  password: fields.password({
    required: validators.required('Enter your password'),
    widget: widgets.password({
      placeholder: "password"
    })
  })
});

module.exports = function(req, reply) {
    reply.view("login", {title: "NoteShare", pageTitle: "Login", formBody: loginForm.toHTML(), formAction: "/login", formButton: "Login"});
};
