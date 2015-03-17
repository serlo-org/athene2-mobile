'use strict';
angular.module('entity.controller', ['entity.directive'])
  .controller('EntityController', ['$routeParams', function($routeParams) {
    this.id = $routeParams.id;
  }]);
