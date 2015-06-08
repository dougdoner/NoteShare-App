//ListModel.js
var DbModel = require("./DbModel");
var Backbone = require("backbone");

var db = new DbModel();

var ListModel = Backbone.Model.extend({
    defaults: {
        id: null,
        name: "new list",
        contents: ""
    },
    load: function(listId, callback) {
        var self = this;
        callback = callback || function() {};
        var statement = db.prepare("SELECT * FROM lists WHERE listId = $id"); statement.get({
            $id: listId
        }, function(err, result) {
            if (err) return callback(err);
            if (!result) return callback("empty result");
            self.set("id", result.listId);
            self.set("name", result.listName);
            self.set("contents", result.contents);
            callback(null);
        });
    },
    create: function(callback) {
        var self = this;
        callback = callback || function() {};
        var data = self.toJSON();
        var insert = db.prepare("INSERT INTO lists (listName, contents, dateCreated, dateUpdated) VALUES($name, $contents, $created, $updated)");
        insert.run({
            $name: data.name,
            $contents: data.contents,
            $created: Date.now(),
            $updated: Date.now()
        }, function(err) {
            if (err) return callback(err);
        });
        callback(null);
    }
});

module.exports = ListModel;
