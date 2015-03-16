'use strict';
angular.module('entity.controller', ['ngSanitize', 'entity.service', 'entity.directive'])
  .controller('EntityController', ['$routeParams', 'EntityService', function($routeParams, EntityService) {
    var self = this;
    var id = $routeParams.id;

    EntityService.get(id).then(function(data) {
      self.data = data;
      self.template = 'entity/entity-' + data.type + '.html';
    });
  }]);
