'use strict';
describe('Entity Directive', function() {
  beforeEach(module('entity.directive'));

  var compile, httpBackend, rootScope;

  beforeEach(inject(function($compile, $httpBackend, $rootScope) {
    compile = $compile;
    httpBackend = $httpBackend;
    rootScope = $rootScope;
  }));

  it('should render articles based on scope', function() {
    var scope = rootScope.$new();
    scope.data = {
      content: {
        title: 'Title'
      }
    };

    httpBackend.expectGET('entity/entity-article.html').respond(
      '<h1 ng-bind="entityData.content.title"></h1>'
    );

    var element = compile('<div entity entity-data="data"></div>')(scope);

    scope.$digest();
    httpBackend.flush();

    expect(element.html()).toEqual(
      '<h1 ng-bind="entityData.content.title" class="ng-binding">Title</h1>'
    );
  });
});
