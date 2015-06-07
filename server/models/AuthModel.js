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
        users: {},
        db: {}
    },
    initialize: function() {
        this.set("db", new DbModel());
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
        var stringChoice = "FHLKSEHLKFNhlksfh83hnlshflh27gr9bnjk2873hr2lk3hrkj2b3kjrbh23hfoui2h3oifh2bh3jkfhoui2h3fuoi89";
        var randString = "";
        for (var i = 0; i < 6; i++) {
            randString += stringChoice.charAt(Math.floor((Math.random() * 92)));
        }
        var statement = db.prepare("UPDATE users SET token = $token WHERE username = $username");
        statement.run({
            $token: randString,
            $username: username
        }, function(err) {console.log("query done"); });
        callback(null, randString);
    }
});

module.exports = AuthModel;
