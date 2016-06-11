module.exports = function(app) {

  app.Models = {};
  app.Models.UserModel = require('./UserModel.js')(app);
  app.Models.ArticleModel = require('./ArticleModel.js')(app);

}
