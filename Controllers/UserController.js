module.exports = function(app) {
  return {

    login: function(req, res) {
      if (typeof req.params.user !== 'undefined') {
        app.Models.UserModel.findOne({login: req.params.user.login, password: req.params.user.password}, function(err, user) {
          if (err) {
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
      if (typeof req.params.user !== 'undefined') {
        var newUser = new app.Models.UserModel(req.params.user);
        newUser.save(function(err) {
          if (err) {
            res.status(500).json({'msg': 'Une erreur est survenue lors du traitement de la requête.'});
          }
          else {
            res.json({'msg': 'Création de l\'utilisateur effectuée avec succès.'});
          }
        })
      }
      else {
        res.status(400).json({'msg': 'Informations manquantes pour la création de l\'utilisateur.'});
      }
    },
    update: function(req, res) {
      if  (req.params.user !== 'undefined') {

      }
      else {
        res.status(400).json({'msg': 'Informations manquantes pour la mise à jour de l\'utilisateur.'});
      }
    },
    delete: function(req, res) {
      if  (req.params.id !== 'undefined') {
        app.Models.UserModel.remove({_id: req.params.id}, function(err) {
          if (err) {
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
