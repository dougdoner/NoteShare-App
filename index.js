var hapi = require("hapi");
var server = new hapi.Server();
var routes = require("./server/routes");
var DbModel = require("./server/models/DbModel");
var AuthModel = require("./server/models/AuthModel");

var auth = new AuthModel();

server.connection({
    port: 8080
});

//userId INTEGER PRIMARY KEY AUTOINCREMENT, username, firstName, lastName, dateCreated, dateUpdated, hash, salt, token

var db = new DbModel(function() {
    server.start();
});

// auth.genHash("password", function(err, salt, hash) {
//     var prepared = db.prepare("INSERT INTO users VALUES (NULL, 'admin', 'Jane', 'Doe', $dateCreated, $dateUpdated, $hash, $salt, 'token')");
//     prepared.run({
//         $dateCreated: Date.now(),
//         $dateUpdated: Date.now(),
//         $hash: hash,
//         $salt: salt
//     });
// });

auth.validate("admin", "password", function(err, result) {
    if (err) console.log(err);
    console.log("Is user valid?: " + result);
});

server.views({
    path: "views/templates",
    engines: {
        html: require("handlebars")
    },
    isCached: false,
    layoutPath: "views/",
    layout: "default",
    partialsPath: "views/partials"
});

server.route(routes);
