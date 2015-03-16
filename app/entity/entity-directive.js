'use strict';
angular.module('entity.directive', ['entity.compileDirective', 'entity.injection.directive'])
  .directive('entity', [function() {
    return {
      restrict: 'A',
      templateUrl: 'entity/entity-article.html',
      scope: {
        entityData: '='
      }
    };
  }]);
