//logout.js

module.exports = function(req, reply) {
    reply.view("logout").state("loggedIn", "false").state("user", "blank").state("token", "blank");
};
