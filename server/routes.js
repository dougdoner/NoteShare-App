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
        },
        {
            method: "GET",
            path: "/notes",
            handler: require("./handlers/listHandler")
        },
        {
          method: ["GET", "POST"],
          path: "/note/create",
          handler: require("./handlers/noteAdd")
      },
      {
        method: "POST",
        path: "/note/{id}/create",
        handler: require("./handlers/itemAdd")
      }
];
