var crypto = require('crypto');

module.exports = function(app) {
  return {

    login: function(req, res) {
      if (typeof req.body.user !== 'undefined') {
        app.Models.UserModel.findOne({login: req.body.user.login, password: req.body.user.password}, function(err, user) {
          if (err) {
            app.winston.error(err);
            res.status(500).json({'msg': 'Une erreur est survenue lors du traitement de la requête.'});
          }
          else {
            res.json(user);
          }
        });
      }
      else {
        res.status(400).json({'msg': 'Erreur lors de la tentative de connexion, identifiants incorrects.'});
      }
    },
    create: function(req, res) {
      if (req.user.isAdmin) {
        if (typeof req.body.user !== 'undefined') {
          if (req.body.user.password.length < 8) {
              return res.status(400).json({'msg': 'La longueur du mot de passe est inférieur à 8 caractères.'});
          }
          var newUser = new app.Models.UserModel(req.body.user);
          crypto.randomBytes(20, function(err, buffer) {
            newUser.apikey = buffer.toString('hex');
            newUser.save(function(err) {
              if (err) {
                app.winston.error(err);
                res.status(500).json({'msg': 'Une erreur est survenue lors du traitement de la requête.'});
              }
              else {
                res.json({'msg': 'Création de l\'utilisateur effectuée avec succès.'});
              }
            })
          });
        }
        else {
          res.status(400).json({'msg': 'Informations manquantes pour la création de l\'utilisateur.'});
        }
      }
      else {
        res.status(403).json({'msg': 'Vous n\'avez pas les droits pour effectuer cette opération.'});
      }

    },
    update: function(req, res) {
      if (req.user._id === req.params.user._id || req.user.isAdmin) {
        if  (req.params.user !== 'undefined') {
          app.Models.UserModel.findById(req.params.user._id, function(err, user) {
            if (err) {
              app.winston('Erreur lors de la récupération de l\'utilisateur %j', req.params.user);
              app.winston.error(err);
              res.status(500).json({'msg': 'Une erreur est survenue lors du traitement de la requête'});
            }
            else {
              if (req.params.password.length > 8) {
                  user.password = req.params.user.password;
                  user.isAdmin = req.params.user.isAdmin;

                  user.save(function(err) {
                    if (err) {
                      app.winston.error('Erreur lors de la sauvegarde des modifications de l\'utilisateur %j', user);
                      app.winston.error(err);
                      res.status(500).json({'msg': 'Une erreur est survenue lors du traitement de votre requête'});
                    }
                    else {
                      res.json({'msg': 'Modification de l\'utilisateur effectuée avec succès'});
                    }
                  });
              }
              else {
                res.status(400).json({'msg': 'La longueur du mot de passe est inférieur à 8 caractères.'});
              }
            }
          });
        }
        else {
          res.status(400).json({'msg': 'Informations manquantes pour la mise à jour de l\'utilisateur.'});
        }
      }
      else {
        res.status(403).json({'msg': 'Vous n\'avez pas les droits pour effectuer cette opération.'});
      }

    },
    delete: function(req, res) {
      if  (req.params.id !== 'undefined') {
        app.Models.UserModel.remove({_id: req.params.id}, function(err) {
          if (err) {
            app.winston.error(err);
            res.status(500).json({'msg': 'Une erreur est survenue lors de la suppression de l\'utilisateur.'});
          }
          else {
            res.json({'msg': 'Suppression de l\'utilisateur effectuée avec succès.'});
          }
        });
      }
      else {
        res.status(400).json({'msg': 'Informations manquantes pour la suppression de l\'utilisateur.'});
      }
    }

  }
}
