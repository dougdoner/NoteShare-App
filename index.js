var hapi = require("hapi");
var server = new hapi.Server();
var routes = require("./server/routes");
var DbModel = require("./server/models/DbModel");

var db = new DbModel();

server.connection({
    port: 8080
});


db.init("test.db", function() {
    server.start();
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
