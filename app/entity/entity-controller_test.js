'use strict';
describe('Entity Controller', function() {
  beforeEach(module('entity.controller'));

  var controller, service;

  beforeEach(inject(function($injector, $controller, $q) {
    service = $injector.get('EntityService');
    spyOn(service, 'get').and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve({id: 1, version: 123, type: 'article'});
      return deferred.promise;
    });
    controller = $controller('EntityController', {
      $routeParams: {id: 1}
    });
  }));

  it('should load the mocked out entity with the corresponding id', inject(function($rootScope) {
    expect(service.get).toHaveBeenCalledWith(1);
    $rootScope.$apply();
    expect(controller.data).toEqual({id: 1, version: 123, type: 'article'});
  }));

  it('should load the tempalte for the corresponding type', inject(function($rootScope) {
    expect(service.get).toHaveBeenCalledWith(1);
    $rootScope.$apply();
    expect(controller.template).toEqual('entity/entity-article.html');
  }));
});
