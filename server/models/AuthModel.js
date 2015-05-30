var Backbone = require("backbone");
var Bcrypt = require("bcrypt");
var async = require("async");
var DbModel = require("./DbModel");
var AuthModel = Backbone.Model.extend({
    defaults: {
        user: "",
        salt: "",
        hash: "",
        time: Date.now(),
        users: {}
    },
    validate: function(username, password, callback) {
        var db = new DbModel();
        var query = db.prepare("SELECT * FROM users WHERE username = $username");
        query.get({
            $username: username
        }, function(err, user) {
            if (!user) return callback(null, false);

            console.log("db password: " + user.hash);
            console.log("input password: " + password);
            Bcrypt.compare(password, user.hash, function(err, isValid) {
                if (err) console.log(err, password, user.hash);
                callback(err, isValid, {name: user.username});
            });
        });
    },
    genHash: function(password, callback) {
        Bcrypt.genSalt(10, function(err, salt) {
            Bcrypt.hash(password, salt, function(err, hash) {
                callback(null, salt, hash);
            });
        });
    }
});

module.exports = AuthModel;
