angular.module('MantisApp')
  .factory('MantisFactory', ['UrlFactory', 'UserFactory', '$http', '$q', function(UrlFactory, UserFactory, $http, $q) {

    var url = UrlFactory.get('mantis');

    return {
      get: function(id) {
        var deferred = $q.defer();

        if (typeof id !== 'undefined') {
          url += '/id';
        }
        url += '?apikey=' + UserFactory.user.apikey;

        $http.get(url)
        .then(function(success) {
          deferred.resolve(sucess.data);
        }, function(failure) {
          deferred.reject(failure.data.msg);
        });

        return deferred.promise;
      },
      create: function(mantis) {
        var deferred = $q.defer();

        $http.post(this.url, mantis)
        .then(function(success) {
          deferred.resolve(success.data.msg);
        }, function(failure) {
          deferred.reject(failure.data.msg);
        });

        return deferred.promise;
      },
      update: function(mantis) {
        var deferred = $q.defer();

        $http.put(this.url, mantis)
        .then(function(success) {
          deferred.resolve(success.data.msg);
        }, function(failure) {
          deferred.reject(failure.data.msg);
        });

        return deferred.promise;
      },
      delete: function(mantis) {
        var deferred = $q.defer();

        $http.delete(this.url, mantis)
        .then(function(success) {
          deferred.resolve(success.data.msg);
        }, function(failure) {
          deferred.reject(failure.data.msg);
        });

        return deferred.promise;
      }
    }

  }]);
