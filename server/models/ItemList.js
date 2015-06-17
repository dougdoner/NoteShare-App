//ItemList.js
var Backbone = require("backbone");
var ItemModel = require("./ItemModel");
var DbModel = require("./DbModel");

var db = require("../../Db");

var ItemList = Backbone.Collection.extend({
    model: ItemModel,
    loadList: function(id, callback) {
        callback = callback || function() {};
        var self = this;
        var statement = db.prepare("SELECT itemId AS id, name, contents, status, listId AS noteId FROM items WHERE listId = $id");
        statement.all({$id: id}, function(err, results) {
            if (err) return callback(err);
            if (!results) return callback("no results");
            self.add(results);
            callback(null);
        });
    }
});

module.exports = ItemList;
