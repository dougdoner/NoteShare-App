var sqlite = require("sqlite3");

var Db = {
    values: {
        db: "",
        createTables: {
            user: "CREATE TABLE IF NOT EXISTS users (userId INTEGER PRIMARY KEY AUTOINCREMENT, username, firstName, lastName, dateCreated, dateUpdated, hash, salt, token);",
            noteLists: "CREATE TABLE IF NOT EXISTS lists (listId INTEGER PRIMARY KEY AUTOINCREMENT, listName, contents, dateCreated, dateUpdated, userId INTEGER, FOREIGN KEY(userId) REFERENCES users(userId));",
            noteItems: "CREATE TABLE IF NOT EXISTS items (itemId INTEGER PRIMARY KEY AUTOINCREMENT, name, contents, status, dateCreated, dateUpdated, listId INTEGER, FOREIGN KEY(listId) REFERENCES lists(listId));"
        }
    },
    init: function(callback) {
        var self = this; //for binding model to self
        callback = callback || function() {};
        this.createDB("app.db", function(err) {
            if (err) return callback(err);
            self.createTables(function(err) {
                if (err) return callback(err);
                console.log("db initialized");
                callback(null);
            });
        });
    },
    createDB: function(dbName, callback) {
        this.values.db = new sqlite.Database(dbName, function(err) {
            if (err) return callback(err);
            callback(null);
        });
    },
    createTables: function(callback) {
        var db = this.values.db;
        callback = callback || function() {};
        var tableQuery = this.values.createTables;
        db.run(tableQuery.user, function(err) {
            if (err) return callback(err);
            db.run(tableQuery.noteLists, function(err) {
                if (err) return callback(err);
                db.run(tableQuery.noteItems, function(err) {
                    if (err) return callback(err);
                    callback(null);
                });
            });
        });

    },
    prepare: function(statement) {
        var db = this.values.db;
        return db.prepare(statement);
    },
    userSelectAll: function(callback) {
        var db = this.values.db;
        db.all("SELECT * FROM users", function(err, result) {
            if (err) return callback(err);
            callback(null, result);
        });
    }
};

module.exports = Db;
