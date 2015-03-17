'use strict';
angular.module('entity.directive', ['entity.service', 'entity.compileDirective', 'entity.injection.directive'])
  .directive('entity', ['EntityService', '$compile', '$http', '$templateCache', function(EntityService, $compile, $http, $templateCache) {
    var getTemplate = function(contentType) {
      return $http.get('entity/entity-' + contentType + '.html', { cache: $templateCache });
    };

    return {
      restrict: 'A',
      link: function($scope, $element) {
        EntityService.get($scope.entity).then(function(data) {
          $scope.data = data;

          getTemplate(data.type).success(function(html) {
            $element.html(html);
          }).then(function() {
            $element.replaceWith($compile($element.html())($scope));
          });
        });
      },
      scope: {
        entity: '='
      }
    };
  }]);
