'use strict';
angular.module('entity.compileDirective', ['config'])
  .directive('compile', ['$compile', '$location', 'API_HOST', function ($compile, $location, API_HOST) {
    var replaceBaseUriInImages = function(element) {
      if (element[0].tagName === 'IMG') {
        var hostRegExp= /[^\/]*\/\/[^\/]*\//;
        var host = hostRegExp.exec($location.absUrl())[0];

        element[0].src = element[0].src.replace(host, API_HOST);
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
