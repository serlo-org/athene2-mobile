'use strict';
angular.module('entity.service', ['config'])
  .factory('EntityService', ['$http', '$q', 'API_HOST', function($http, $q, API_HOST) {
    return {
      get: function(id) {
        var deferred = $q.defer();
        $http.get(API_HOST + 'entities/' + id)
          .success(function(data, status, headers, config) {
            deferred.resolve(data);
          });
        return deferred.promise;
      }
    };
  }]);
