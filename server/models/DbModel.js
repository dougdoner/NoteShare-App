var Backbone = require("backbone");
var sqlite = require("sqlite3");

var DbModel = Backbone.Model.extend({
    defaults: {
        db: "",
        createTables: {
            user: "CREATE TABLE IF NOT EXISTS users (userId INTEGER PRIMARY KEY AUTOINCREMENT, username, firstName, lastName, dateCreated, dateUpdated, hash, salt, token);",
            noteLists: "CREATE TABLE IF NOT EXISTS lists (listId INTEGER PRIMARY KEY AUTOINCREMENT, listName, contents, dateCreated, dateUpdated);",

        }
    },
    initialize: function(callback) {
        var self = this; //for binding model to self
        callback = callback || function() {};
        this.createDB("app.db", function(err) {
            if (err) return callback(err);
            self.createTables(function(err) {
                if (err) return callback(err);
                console.log("db initialized");
            });
        });
        callback(null);
    },
    createDB: function(dbName, callback) {
        this.set("db", new sqlite.Database(dbName, function(err) {
            if (err) return callback(err);
        }));
        callback(null);
    },
    createTables: function(callback) {
        var db = this.get("db");
        callback = callback || function() {};
        var tableQuery = this.get("createTables");
        db.run(tableQuery.user, function(err) {
            if (err) return callback(err);
        });
        db.run(tableQuery.noteLists, function(err) {
            if (err) return callback(err);
        });

        if (callback) callback();
    },
    prepare: function(statement) {
        var db = this.get("db");
        return db.prepare(statement);
    },
    userSelectAll: function(callback) {
        var db = this.get("db");
        db.all("SELECT * FROM users", function(err, result) {
            callback(null, result);
        });
    }
});

module.exports = DbModel;
