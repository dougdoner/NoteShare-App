var hapi = require("hapi");
var server = new hapi.Server();
var routes = require("./server/routes");
var DbModel = require("./server/models/DbModel");
var AuthModel = require("./server/models/AuthModel");
var Bcrypt = require("bcrypt");
var ListModel = require("./server/models/listModel");

server.connection({
    port: 8000
});

var db = new DbModel(function(err) {
    if (err) console.log(err);
    server.start();
});

server.route(routes);

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
