var hapi = require("hapi");
var server = new hapi.Server();
var routes = require("./server/routes");
var Db = require("./Db");
server.connection({
    port: 8000
});

Db.init(function(err) {
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
