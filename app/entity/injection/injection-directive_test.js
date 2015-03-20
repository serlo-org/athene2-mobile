'use strict';
describe('Entity Injection Directive', function() {
  beforeEach(module('entity.injection.directive'));

  var service, compile, httpBackend, rootScope;

  beforeEach(inject(function($injector, $compile, $rootScope, $httpBackend) {
    compile = $compile;
    httpBackend = $httpBackend;
    rootScope = $rootScope;

    service = $injector.get('EntityService');
  }));

  it('should render text-exercises', inject(function($q) {
    spyOn(service, 'get').and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve({id: 1, type: 'text-exercise', content: {title: 'Title'}});
      return deferred.promise;
    });

    var scope = rootScope.$new();

    httpBackend.expectGET('entity/injection/injection-text-exercise.html').respond('<h1 ng-bind="data.content.title"></h1>');

    compile('<div class="injection"><a href="/1"></a></div>')(scope);
    expect(service.get).toHaveBeenCalledWith('1');

    scope.$digest();
    httpBackend.flush();
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
});
