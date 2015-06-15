// NoteList.js
var Backbone = require("backbone");
var NoteModel = require("./NoteModel");
var DbModel = require("./DbModel");

var db = new DbModel();

var NoteList = Backbone.Collection.extend({
    model: NoteModel,
    loadList: function(userid, callback) {
        callback = callback || function() {};
        var self = this;
        var statement = db.prepare("SELECT listId AS id, listName AS name FROM lists WHERE userId = $userId");
        statement.all({$userId: userid}, function(err, results) {
            if (err) return callback(err);
            if (!results) return callback("no results");
            self.add(results);
            callback(null);
        });
    }
});

module.exports = NoteList;
