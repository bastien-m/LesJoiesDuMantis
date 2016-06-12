angular.module('MantisApp')
  .constant('url', {
    'mantis': 'article',
    'user': 'user',
    'login': 'login'
  })
  .constant('prefix', {
    'dev': 'http://localhost:3000/'
  })
  .constant('env', 'dev')
  .factory('UrlFactory', ['url', 'prefix', 'env', function(url, prefix, env) {
    return {
      get: function(method) {
        return prefix[env] + '/' + url[method];
      }
    }
  }])
