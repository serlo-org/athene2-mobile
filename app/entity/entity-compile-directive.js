'use strict';
angular.module('entity.compileDirective', ['config'])
  .directive('compile', ['$compile', 'API_HOST', function ($compile, API_HOST) {
    var replaceBaseUriInImages = function(element) {
      if (element[0].tagName === 'IMG') {
        element[0].src = element[0].src.replace(element[0].baseURI, API_HOST);
      }

      angular.forEach(element.children(), function(child) {
        var element = angular.element(child);
        replaceBaseUriInImages(element);
      });
    };

    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          return scope.$eval(attrs.compile);
        },
        function(value) {
          element.html(value);
          $compile(element.contents())(scope);

          replaceBaseUriInImages(element);

          MathJax.Hub.Queue(['Typeset', MathJax.Hub, element[0]]);
        }
      );
    };
  }]);
