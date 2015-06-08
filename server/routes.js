module.exports = [
        {
            method: "GET",
            path: "/",
            handler: require("./handlers/indexHandler")
        },
        {
          method: ["GET", "POST"],
          path: "/login",
          handler: require("./handlers/loginHandler")
        },
        {
            method: "GET",
            path: "/assets/{param*}",
            handler: {
                directory: {
                    path: "./build"
                }
            }
        },
        {
            method: "GET",
            path: "/note/{id}",
            handler: require("./handlers/notesHandler")
        }
];
