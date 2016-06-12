angular.module('MantisApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {

        $routeProvider
        .when('/user/:id?', {
          templateUrl: function(attr) {
            if (typeof attr.id === 'undefined') {
              return '/views/user/index.html';
            }
            return '/views/user/details.html';
          },
          controller: 'UserController'
        })
        .when('/user/create', {
          templateUrl: '/views/user/create.html',
          controller: 'CreateUserController'
        })
        .when('/user/update/:id', {
          templateUrl: '/views/user/update.html',
          controller: 'UpdateUserController'
        })
        .when('/mantis/:id?', {
          templateUrl: function(attr) {
            if (typeof attr.id === 'undefined') {
              return '/views/mantis/index.html';
            }
            else {
              return '/views/mantis/details.html'
            }
          },
          controller: 'MantisController'
        })
        .otherwise({
            templateUrl: '/views/mantis/index.html',
            controller: 'MantisController'
        });

    }])
    .run(['UserFactory', '$rootScope', '$location', function(UserFactory, $rootScope, $location) {
      $rootScope.utils = {
        isAuthenticate : typeof UserFactory.user !== 'undefined',
        isAdmin : $rootScope.isAuthenticate && UserFactory.user.isAdmin
      };

      if (/^(\/user).*$/.test($location.path()) && !$rootScope.utils.isAdmin) {
        $location.path('/login');
      }

    }]);
