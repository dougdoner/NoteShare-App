var Backbone = require("backbone");
var sqlite = require("sqlite3");

var DbModel = Backbone.Model.extend({
    defaults: {
        db: "",
        createTables: {
            user: "CREATE TABLE IF NOT EXISTS users (userId INT PRIMARY KEY, firstName, lastName, hash, salt)",
            auth: "authId INT PRIMARY KEY, session, userId INT FOREIGN KEY"
        }
    },
    init: function(dbName, callback) {
        var self = this; //for binding model to self
        this.createDB(dbName, function(err) {
            if (err) return console.log(err);
            self.createTables(function(err) {
                if (err) return console.log(err);
                console.log("db initialized");
            });
        });
        callback();
    },
    createDB: function(dbName, callback) {
        this.set("db", new sqlite.Database(dbName, function(err) {
            if (err) return callback(err);
        }));
        callback(null);
    },
    createTables: function(callback) {
        var db = this.get("db");
        var tableQuery = this.get("createTables");
        db.run(tableQuery.user, function(err) {
            if (err) return callback(err);
        });

        if (callback) callback();
    },
    prepare: function(statement) {
        var db = this.get("db");
        return db.prepare(statement);
    },
    userSelectAll: function() {
        var db = this.get("db");
        db.run("SELECT * FROM users", function( result) {
            console.log(result);
        });
    }
});

module.exports = DbModel;
