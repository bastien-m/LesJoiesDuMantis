module.exports = function(app) {
  //allow CORS
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });


  app.route('/article(/:id?)')
    .get(app.Controllers.ArticleController.get)
    .post(app.authenticate, app.Controllers.ArticleController.create)
    .put(app.authenticate, app.Controllers.ArticleController.update)
    .delete(app.authenticate, app.Controllers.ArticleController.delete);


  app.route('/user')
    .post(app.authenticate, app.Controllers.UserController.create)
    .put(app.authenticate, app.Controllers.UserController.update)
    .delete(app.authenticate, app.Controllers.UserController.delete);

  app.route('/login')
    .post(app.Controllers.UserController.login);

};
