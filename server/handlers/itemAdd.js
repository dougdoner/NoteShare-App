//itemAdd.js

var ItemModel = require("../models/ItemModel");

module.exports = function(req, reply) {
    console.log("Item name: " + req.payload.itemName);
    console.log("list id: " + req.payload.id);
    var item = new ItemModel({name: req.payload.itemName});
    item.create(req.payload.id, function(err) {
        if (err) return reply(err);
        reply({message: "Item created"});
    });
};
