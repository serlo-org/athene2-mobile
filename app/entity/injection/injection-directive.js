'use strict';
angular.module('entity.injection.directive', ['entity.service'])
  .directive('injection', ['EntityService', '$compile', '$http', '$templateCache', function(EntityService, $compile, $http, $templateCache) {
    var getTemplate = function(contentType) {
      return $http.get('entity/injection/injection-' + contentType + '.html', { cache: $templateCache });
    };

    return {
      restrict: 'C',
      link: function($scope, $element) {
        var id = $element.children()[0].pathname.slice(1);

        EntityService.get(id).then(function(data) {
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
