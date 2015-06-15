//NoteModel.js
var DbModel = require("./DbModel");
var Backbone = require("backbone");
var ItemList = require("./ItemList");

var db = new DbModel();

var NoteModel = Backbone.Model.extend({
    defaults: {
        id: null,
        name: "new Note",
        items: null
    },
    load: function(listId, callback) {
        var self = this;
        callback = callback || function() {};
        var itemList = new ItemList();
        itemList.loadList(self.get("id"), function(err) {
            var statement = db.prepare("SELECT * FROM lists WHERE listId = $id"); statement.get({
                $id: listId
            }, function(err, result) {
                if (err) return callback(err);
                if (!result) return callback("empty result");
                self.set("id", result.listId);
                self.set("name", result.listName);
                self.set("items", itemList.toJSON());
                callback(null);
            });
        });
    },
    create: function(userid, callback) {
        var self = this;
        callback = callback || function() {};
        var data = self.toJSON();
        var insert = db.prepare("INSERT INTO lists (listName, dateCreated, dateUpdated, userId) VALUES($name, $created, $updated, $userId)");
        insert.run({
            $name: data.name,
            $created: Date.now(),
            $updated: Date.now(),
            $userId: userid
        }, function(err) {
            if (err) return callback(err);
        });
        callback(null);
    }
});

module.exports = NoteModel;
