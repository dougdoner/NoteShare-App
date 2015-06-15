var hapi = require("hapi");
var server = new hapi.Server();
var routes = require("./server/routes");
var DbModel = require("./server/models/DbModel");
server.connection({
    port: 8000
});

var db = new DbModel(function(err) {
    if (err) console.log(err);
    server.start();

    // var itemList = new ItemList();
    // itemList.loadList(1, function(err) {
    //     if (err) return console.log(err);
    //     console.log(itemList.toJSON());
    // });
    // var item = new ItemModel({name: "an item", contents: "item contents", status: "incomplete", noteId: 1});
    // item.create(function(err) {
    //     if (err) return console.log(err);
    //     console.log("item created");
    // });

    // var note = new NoteModel({name: "Example note"});
    // note.create(function(err) {
    //     if (err) return console.log(err);
    //     console.log("note created");
    // });
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
