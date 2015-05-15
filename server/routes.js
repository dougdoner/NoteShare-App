module.exports = [
        {
            method: "GET",
            path: "/",
            handler: require("./handlers/indexHandler")
        },
        {
            method: "GET",
            path: "/assets/{param*}",
            handler: {
                directory: {
                    path: "build/"
                }
            }
        }
];
