var Backbone = require("backbone");
var Bcrypt = require("bcrypt");
var DbModel = require("./DbModel");
var AuthModel = Backbone.Model.extend({
    defaults: {
        user: "",
        salt: "",
        hash: "",
        time: Date.now(),
        db: {}
    },
    initialize: function() {
        this.set("db", new DbModel());
    },
    validate: function(username, password, callback) {
        var users;
        var db = this.get("db");
        db.userSelectAll(function(result) {
            users = result;
        });
    },
    genHash: function(password) {

    }
});

module.exports = AuthModel;
