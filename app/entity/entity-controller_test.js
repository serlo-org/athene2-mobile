'use strict';
describe('Entity Controller', function() {
  beforeEach(module('entity.controller'));

  var controller;

  beforeEach(inject(function($controller) {
    controller = $controller('EntityController', {
      $routeParams: {id: 1}
    });
  }));

  it('should add the id to the scope', function() {
    expect(controller.id).toEqual(1);
  });
});
