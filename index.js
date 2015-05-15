var hapi = require("hapi");
var server = new hapi.Server();
var routes = require("./server/routes");
server.connection({
    port: 8080
});

server.start();

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
