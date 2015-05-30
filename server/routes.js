var AuthModel = require("./models/AuthModel");

module.exports = [
        {
            method: "GET",
            path: "/",
            handler: require("./handlers/indexHandler")
        },
        {
          method: "GET",
          path: "/login",
          handler: require("./handlers/loginHandler")
        },
        {
            method: "GET",
            path: "/assets/{param*}",
            handler: {
                directory: {
                    path: "build/"
                }
            }
        },
        {
            method: "POST",
            path: "/login",
            config: {
                auth: "simple"
            },
            handler: require("./handlers/loginPostHandler")
        }
];
