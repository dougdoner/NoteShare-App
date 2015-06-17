var Backbone = require("backbone");
var DbModel = require("./DbModel");
var AuthModel = require("./AuthModel");
var db = new DbModel();
var auth = new AuthModel();

var UserModel = Backbone.Model.extend({
    defaults: {
        username: "",
        firstName: "",
        lastName: "",
        password: ""
    },
    create: function(callback) {
        var self = this;
        var data = self.toJSON();
        callback = callback || function() {};
        auth.genHash( data.password, function(err, salt, hash) {
            if (err) return callback(err);
            var statement = db.prepare("INSERT INTO users (username, firstName, lastName, dateCreated, dateUpdated, hash) VALUES ($username, $firstName, $lastName, $dateCreated, $dateUpdated, $hash);");
            statement.run({
                $username: data.username,
                $firstName: data.firstName,
                $lastName: data.lastName,
                $dateCreated: Date.now(),
                $dateUpdated: Date.now(),
                $hash: hash
            }, function(err) {
                if (err) return callback(err);
                callback(null);
            });
        });
    }
});

module.exports = UserModel;
