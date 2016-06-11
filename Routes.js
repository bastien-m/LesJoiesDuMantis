module.exports = function(app) {
  //allow CORS
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });


  app.route('/article')
    .get(app.Controllers.ArticleController.get)
    .post(app.Controllers.ArticleController.create)
    .put(app.Controllers.ArticleController.update)
    .delete(app.Controllers.ArticleController.delete);


  app.route('/user')
    .get(app.Controllers.UserController.login)
    .post(app.Controllers.UserController.create)
    .put(app.Controllers.UserController.update)
    .delete(app.Controllers.UserController.delete);

};
