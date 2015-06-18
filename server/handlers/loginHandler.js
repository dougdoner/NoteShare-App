//Caolan's forms module for building forms
var forms = require("forms");
var fields = forms.fields;
var validators = forms.validators;
var widgets = forms.widgets;
var AuthModel = require("../models/AuthModel");
var auth = new AuthModel();

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
    if (req.method == "post") {
        console.log("Payload: ", req.payload);
        console.log("user state: ", req.state);
        auth.validate(req.payload.username, req.payload.password, function(err, isValid, credentials) {
            if (err) console.log(err);
            console.log("is it valid?: " + isValid);
            if (isValid) {
                auth.createToken(req.payload.username, function(err, string) {
                    console.log(string);
                    return reply.redirect("/notes").state("user", req.payload.username).state("token", string).state("loggedIn", "true");
                });
            } else reply.redirect("/login");
        });
    } else {
        if (req.state.loggedIn != "true") {
            reply.view("login", {title: "NoteShare", pageTitle: "Login", formMethod: "POST", formBody: loginForm.toHTML(), formAction: "/login", formButton: "Login"});
        }
        else reply.redirect("/notes");
    }
};
