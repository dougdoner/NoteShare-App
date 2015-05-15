module.exports = function(req, reply) {
    reply.view("index", {title: "Hello world"});
}
