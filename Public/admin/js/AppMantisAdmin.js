angular.module('AdminMantisApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: '/admin/views/home.html',
            controller: 'HomeController'
        })
        .otherwise({
            templateUrl: '/admin/views/home.html',
            controller: 'HomeController'
        });

    }]);
