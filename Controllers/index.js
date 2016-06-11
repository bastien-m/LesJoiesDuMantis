module.exports = function(app) {

  app.Controllers = {}
  app.Controllers.UserController = require('./UserController.js')(app);
  app.Controllers.ArticleController = require('./ArticleController.js')(app);

}
