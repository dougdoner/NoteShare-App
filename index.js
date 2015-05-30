var hapi = require("hapi");
var server = new hapi.Server();
var routes = require("./server/routes");
var DbModel = require("./server/models/DbModel");
var AuthModel = require("./server/models/AuthModel");
var Basic = require("hapi-auth-basic");
var auth = new AuthModel();
var Bcrypt = require("bcrypt");

server.connection({
    port: 8000
});

var db = new DbModel(function() {

    server.start();
});

server.register(Basic, function(err) {
    server.auth.strategy("simple", "basic", {validateFunc: auth.validate});
    server.route(routes);
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
