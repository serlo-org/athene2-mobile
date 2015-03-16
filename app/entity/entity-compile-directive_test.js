'use strict';
describe('Entity Compile Directive', function() {
  beforeEach(module('entity.compileDirective'));

  var compile, rootScope;

  beforeEach(inject(function($compile, $rootScope) {
    compile = $compile;
    rootScope = $rootScope;
  }));

  it('should render HTML based on scope', function() {
    var scope = rootScope.$new();
    scope.data = '<h1>Test</h1>';

    var element = compile('<div compile="data"></div>')(scope);

    scope.$digest();

    expect(element.html()).toEqual('<h1 class="ng-scope">Test</h1>');
  });

  it('should render directives in HTML', function() {
    var scope = rootScope.$new();
    scope.data = '<h1 ng-bind="title"></h1>';
    scope.title = 'Test';

    var element = compile('<div compile="data"></div>')(scope);

    scope.$digest();

    expect(element.html()).toEqual('<h1 ng-bind="title" class="ng-binding ng-scope">Test</h1>');
  });
});
