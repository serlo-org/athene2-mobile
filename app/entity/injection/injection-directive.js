'use strict';
angular.module('entity.injection.directive', [])
  .directive('injection', [function() {
    return {
      restrict: 'C',
      template: 'This is an injection!',
    };
  }]);
