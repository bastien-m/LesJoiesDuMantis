var passport = require('passport')
,LocalAPIKeyStrategy = require('passport-localapikey').Strategy;

module.exports = function(app) {


  passport.use(new LocalAPIKeyStrategy(
    function(apikey, done) {
      app.Models.AdminModel.findOne({ apikey: apikey }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

  //bind passport to express
  app.use(passport.initialize());

  app.authenticate = passport.authenticate('localapikey', {session: false});
}
