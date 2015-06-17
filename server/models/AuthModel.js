var Backbone = require("backbone");
var Bcrypt = require("bcrypt");
var async = require("async");
var Db = require("../../Db");
var hasha = require("hasha");

var AuthModel = Backbone.Model.extend({
    defaults: {
        user: "",
        salt: "",
        hash: "",
        time: Date.now(),
        users: {},
        db: {}
    },
    initialize: function() {
        this.set("db", Db);
    },
    validate: function(username, password, callback) {
        var db = this.get("db");
        var query = db.prepare("SELECT * FROM users WHERE username = $username");
        query.get({
            $username: username
        }, function(err, user) {
            if (!user) return callback(null, false);
            console.log("db password: " + user.hash);
            console.log("input password: " + password);
            Bcrypt.compare(password, user.hash, function(err, isValid) {
                if (err) console.log(err, password, user.hash);
                callback(null, isValid, {user: user.name});
            });
        });
    },
    genHash: function(password, callback) {
        Bcrypt.genSalt(10, function(err, salt) {
            Bcrypt.hash(password, salt, function(err, hash) {
                callback(null, salt, hash);
            });
        });
    },
    createToken: function(username, callback) {
        var db = this.get("db");
        var hashedToken = hasha(username);
        var statement = db.prepare("UPDATE users SET token = $token WHERE username = $username");
        statement.run({
            $token: hashedToken,
            $username: username
        }, function(err) {
            if (err) return callback(err);
            console.log("query done");
            callback(null, hashedToken);
        });
    }
});

module.exports = AuthModel;
