'use strict';
describe('Entity Injection Directive', function() {
  beforeEach(module('entity.injection.directive'));

  var compile, rootScope;

  beforeEach(inject(function($compile, $rootScope) {
    compile = $compile;
    rootScope = $rootScope;
  }));

  it('should be restricted to class', function() {
    var scope = rootScope.$new();

    var element = compile('<div class="injection"></div>')(scope);

    scope.$digest();

    expect(element.html()).toEqual('This is an injection!');
  });
});
