var Backbone = require("backbone");
var Bcrypt = require("bcrypt");

var AuthModel = Backbone.Model.extend({
    defaults: {
        user: "",
        salt: "",
        hash: ""
    },

    validate: function(username, password, callback) {

    },
    genHash: function(password) {

    },

});

module.exports = AuthModel;
