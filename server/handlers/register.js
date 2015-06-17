//register.js

var UserModel = require("../models/UserModel");
var forms = require("forms");
var fields = forms.fields;
var validators = forms.validators;
var widgets = forms.widgets;

var registerForm = forms.create({
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
    }),
    firstName: fields.string({
        required: true,
        widget: widgets.text({
          placeholder: "Username"
        })
    }),
    lastName: fields.string({
        required: true,
        widget: widgets.text({
          placeholder: "Username"
        })
    })
});

module.exports = function(req, reply) {
    if (req.method == "post") {
        var user = new UserModel({username: req.payload.username, firstName: req.payload.firstName, lastName: req.payload.lastName, password: req.payload.password});
        user.create(function(err) {
            if (err) return reply.redirect("register", {message: err});
            reply.redirect("register", {message: "User created"});
        });
    } else {
        reply.view("register", {title: "NoteShare", pageTitle: "Register", formMethod: "POST", formBody: registerForm.toHTML(), formAction: "/register", formButton: "Register"});
    }
};
