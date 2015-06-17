module.exports = function(req, reply) {
    reply.view("index", {title: "Home", loggedIn: req.state.loggedIn});
};
