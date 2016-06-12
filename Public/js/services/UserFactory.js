angular.module('MantisApp')
  .factory('UserFactory', ['UrlFactory', '$http', '$q', function(UrlFactory, $http, $q) {

    var userUrl = UrlFactory.get('user');

    return {

      login: function(user) {
        var url = UrlFactory.get('login');
        var deferred = $q.defer();

        var self = this;

        $http.post(url, user)
        .then(function(success) {
          self.user = success.data;
          deferred.resolve(success.data);
        }, function(failure) {
          deferred.reject(success.data.msg);
        });

        return deferred.promise;
      },

      get: function(user) {
        var url = this.userUrl;
        var deferred = $q.defer();

        if (typeof user !== 'undefined') {
          url += '/' + user._id;
        }

        url += '?apikey=' + this.user.apikey;
        $http.get(url)
        .then(function(success) {
          deferred.resolve(success.data);
        }, function(failure) {
          deferred.reject(failure.data.msg);
        });

        return deferred.promise;
      },

      create: function(user) {
        var url = this.userUrl;
        var deferred = $q.defer();

        $http.post(url, user)
        .then(function(success) {
          deferred.resolve(success.data.msg);
        }, function(failure) {
          deferred.reject(failure.data.msg);
        });

        return deferred.promise;
      },

      update: function(user) {
        var url = this.userUrl;
        var deferred = $q.defer();

        $http.put(url, user)
        .then(function(success) {
          deferred.resolve(success.data.msg);
        }, function(failure) {
          deferred.reject(failure.data.msg);
        });

        return deferred.promise;
      },

      delete: function(user) {
        var url = this.userUrl;
        var deferred = $q.defer();

        $http.delete(url, user)
        .then(function(success) {
          deferred.resolve(success.data.msg);
        }, function(failure) {
          deferred.reject(failure.data.msg);
        });

        return deferred.promise;
      }
    }

  }]);
