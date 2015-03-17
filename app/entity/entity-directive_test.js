'use strict';
describe('Entity Directive', function() {
  beforeEach(module('entity.directive'));

  var service, compile, httpBackend, rootScope;

  beforeEach(inject(function($injector, $compile, $httpBackend, $rootScope) {
    compile = $compile;
    httpBackend = $httpBackend;
    rootScope = $rootScope;

    service = $injector.get('EntityService');
  }));

  it('should render articles based on given id', inject(function($q) {
    spyOn(service, 'get').and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve({id: 1, type: 'article', content: {title: 'Title'}});
      return deferred.promise;
    });

    var scope = rootScope.$new();
    scope.id = 1;

    httpBackend.expectGET('entity/entity-article.html').respond('<h1 ng-bind="data.content.title"></h1>');

    compile('<div entity="id"></div>')(scope);
    expect(service.get).toHaveBeenCalledWith(1);

    scope.$digest();
    httpBackend.flush();
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
});
