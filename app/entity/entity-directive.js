'use strict';
angular.module('entity.directive', ['entity.compileDirective', 'entity.injection.directive'])
  .directive('entity', ['$compile', '$http', '$templateCache', function($compile, $http, $templateCache) {

    var getTemplate = function(contentType) {
      var templateLoader;
      var baseUrl = 'entity/';
      var templateMap = {
        article: 'entity-article.html'
      };

      var templateUrl = baseUrl + templateMap[contentType];
      templateLoader = $http.get(templateUrl, { cache: $templateCache });

      return templateLoader;
    };

    return {
      restrict: 'A',
      link: function($scope, $element) {
        $scope.$watch('entityData', function(data) {
          console.log(data);
          if (data) {
            var loader = getTemplate(data.type);

            loader.success(function(html) {
              $element.html(html);
            }).then(function() {
              $element.replaceWith($compile($element.html())($scope));
            });
          }
        });
      },
      scope: {
        entityData: '='
      }
    };
  }]);
