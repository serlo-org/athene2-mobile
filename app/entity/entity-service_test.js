'use strict';
describe('Entity Service', function() {
  beforeEach(module('entity.service'));

  var service, $httpBackend, apiHost;

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    service = $injector.get('EntityService');
    apiHost = $injector.get('API_HOST');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('get(id)', function() {
    it('should load the entity with the corresponding id from server', function() {
      $httpBackend.expectGET(apiHost + 'entities/1').respond([{id: 1, version: 123}]);
      var resolvedData;
      var promise = service.get(1);
      promise.then(function(data) {
        resolvedData = data;
      });
      expect(resolvedData).toBeUndefined();
      $httpBackend.flush();
      expect(resolvedData).toEqual([{id: 1, version: 123}]);
    });
  });
});
