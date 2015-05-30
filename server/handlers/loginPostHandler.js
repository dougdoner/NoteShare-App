var AuthModel = require("../models/AuthModel");

var auth = new AuthModel();

var authHandle = function(req, reply) {
        console.log(req.auth.credentials);
};

module.exports = authHandle;
