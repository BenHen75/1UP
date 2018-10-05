const Tokens = require("../token");
const Config = require("../config.js");

module.exports = function(app,steem,Utils,config,messages){
  // Posts page community
    app.get("/tokens/history", function(req, res) {
        Utils.getSession(req).then(function(session) {
            res.end(JSON.stringify(Tokens.getUserData(session.name)));
        });
    });
  app.get("/wallet", function(req, res) {
        Utils.getSession(req).then(function(session) {
            res.render("wallet.ejs", {
                tokens: Tokens.getUserData(session.name),
                session: session,
                account: req.session.account,
                sToken: req.cookies.access_token
            });
        });
  });
  app.get("/topUsers", function(req, res) {
        Utils.getSession(req).then(function(session) {
            res.render("topUsers.ejs", {
                data: Tokens.allData(),
                session: session,
                account: req.session.account,
                sToken: req.cookies.access_token
            });
        });
  });
  app.get("/admin/pending", function(req, res) {
        Utils.getSession(req).then(function(session) {
            if (Config.admins.indexOf(session.name) > -1) {
                res.render("pendingPosts.ejs", {
                    posts: Tokens.pendingSends(),
                    session: session,
                    account: req.session.account,
                    sToken: req.cookies.access_token
                });
            } else {
                res.status(403);
                res.render("403.ejs", {
                    session: session,
                    account: req.session.account,
                    sToken: req.cookies.access_token
                });
            }
        });
  });
}
