var hapi = require("hapi");
var server = new hapi.Server();
var routes = require("./server/routes");
var DbModel = require("./server/models/DbModel");
var AuthModel = require("./server/models/AuthModel");

var auth = new AuthModel();

server.connection({
    port: 8080
});


var db = new DbModel(function() {
    server.start();
    // var prepared = db.prepare("INSERT INTO users VALUES (NULL, 'Jane', 'Doe', $dateCreated, $dateUpdated, '4e3asalkjhasdfhj', 'hellobacon', 'token')");
    // prepared.run({
    //     $dateCreated: Date.now(),
    //     $dateUpdated: Date.now()
    // });
    auth.validate();
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
