'use strict';
angular.module('entity.compileDirective', [])
  .directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          return scope.$eval(attrs.compile);
        },
        function(value) {
          element.html(value);
          $compile(element.contents())(scope);
          MathJax.Hub.Queue(['Typeset', MathJax.Hub, element[0]]);
        }
      );
    };
  }]);
