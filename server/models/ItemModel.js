//ItemModel.js
var DbModel = require("./DbModel");
var Backbone = require("backbone");

var db = new DbModel();

var ItemModel = Backbone.Model.extend({
    defaults: {
        id: null,
        name: "",
        contents: "",
        status: "",
        noteId: null
    },
    load: function(id, callback) {
        var self = this;
        callback = callback || function() {};
        var statement = db.prepare("SELECT itemId as id, name, contents, status FROM items WHERE itemId = $itemId");
        statement.get({
            $itemId: id
        }, function(err, result) {
            statement.finalize();
            if (err) return callback(err);
            if (!result) return callback("no result");
            self.set("id", result.id);
            self.set("name", result.name);
            self.set("contents", result.contents);
            selft.set("status", result.status);
            self.set("noteId", result.listId);
            callback(null);
        });
    },
    create: function(listId, callback) {
        var self = this;
        callback = callback || function() {};
        var data = this.toJSON();
        var statement = db.prepare("INSERT INTO items(name, contents, status, listId) VALUES($name, $contents, $status, $listId)");
        statement.run({
            $name: data.name,
            $contents: data.contents,
            $status: data.status,
            $listId: listId
        }, function(err) {
            statement.finalize();
            if (err) return callback(err);
            callback(null);
        });
    }
});

module.exports = ItemModel;
