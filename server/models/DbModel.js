var Backbone = require("backbone");
var sqlite = require("sqlite3");

var DbModel = Backbone.Model.extend({
    defaults: {
        insert: "INSERT INTO $table VALUES ($values);",
        select: "SELECT $selector FROM $table;",
        selectWhere: "SELECT $selector FROM $table WHERE $conditions;",
        db: ""
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

        db.run("CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY, firstName, lastName, hash, salt)", function(err) {
            if (err) return callback(err);
        });

        if (callback) callback();
    },
    prepare: function(statement) {
        var db = this.get("db");
        return db.prepare(statement);
    }
});

module.exports = DbModel;
