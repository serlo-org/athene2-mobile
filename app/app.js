'use strict';
angular.module('athene2MobileApp', [
  'ngRoute',
  'entity.controller'
])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/:id', {
        templateUrl: 'entity/entity.html',
        controller: 'EntityController as entityController'
      });
  }]);

