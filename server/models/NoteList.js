// NoteList.js
var Backbone = require("backbone");
var NoteModel = require("./NoteModel");

var db = require("../../Db");

var NoteList = Backbone.Collection.extend({
    model: NoteModel,
    loadList: function(username, callback) {
        callback = callback || function() {};
        var self = this;
        var user = db.prepare("SELECT * FROM users WHERE username = $username");
        user.get({$username: username}, function(err, result) {
            if (err) return callback(err);
            var statement = db.prepare("SELECT listId AS id, listName AS name FROM lists WHERE userId = $userId");
            statement.all({
                $userId: result.userId
            }, function(err, results) {
                statement.finalize();
                if (err) return callback(err);
                if (!results) return callback("no results");
                self.add(results);
                callback(null);
            });
        });
    }
});

module.exports = NoteList;
