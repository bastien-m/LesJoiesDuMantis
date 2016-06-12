module.exports = function(app) {

  return {
    create: function(req, res) {
      if (typeof req.body.article !== 'undefined') {
        var articleToCreate = new app.Models.ArticleModel(req.body.article);
        articleToCreate.publisher = req.user;
        articleToCreate.save(function(err) {
          if (err) {
            app.winston.error(err);
            res.status(500).json({'msg': 'Une erreur est survenue lors de la sauvegarde de l\'article, veuillez ressayer.'});
          }
          else {
            res.json({'msg': 'Création de l\'article effectué avec succès.'});
          }
        });
      }
      else {
        res.status(400).json({'msg': 'Données manquantes, nous ne pouvons traiter votre requête.'});
      }
    },
    get: function(req, res) {
      if (typeof req.params.id !== 'undefined') {
        app.Models.ArticleModel.findById(req.params.id, function(err, article) {
          if (err) {
            app.winston.error(err);
            res.status(500).json({'msg': 'Une erreur est survenue lors de la récupération des données.'});
          }
          else {
            res.json(article);
          }
        });
      }
      else {
        app.Models.ArticleModel.find(function(err, articles) {
          if (err) {
            app.winston.error(err);
            res.status(500).json({'msg': 'Une erreur est survenue lors de la récupération des données.'});
          }
          else {
            res.json(articles);
          }
        });
      }
    },
    update: function(req, res) {
      if (typeof req.body.article !== 'undefined') {
        app.Models.ArticleModel.findByIdAndUpdate(req.body.article._id, req.body.article, function(err, article) {
          if (err) {
            res.status(500).json({'msg': 'Une erreur est survenue lors de la mise à jour des données.'});
          }
          else {
            res.json({'msg': 'Mise à jour effectuée avec succès.'});
          }
        });
      }
      else {
        res.status(400).json({'msg': 'Données manquantes, nous ne pouvons traiter votre requête.'});
      }
    },
    delete: function(req, res) {
      if (typeof req.params.id !== 'undefined') {
        app.Models.ArticleModel.remove({_id: req.params.id}, function(err) {
          if (err) {
            app.winston.error(err);
            res.status(500).json({'msg': 'Une erreur est survenue lors de la suppression de l\'article.'});
          }
          else {
            res.json({'msg': 'Suppression de l\'article effectuée avec succès'});
          }
        });
      }
      else {
        res.status(400).json({'msg': 'Données manquantes, nous ne pouvons traiter votre requête.'});
      }
    }
  }

}
