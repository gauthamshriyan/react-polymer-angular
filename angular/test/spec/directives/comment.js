'use strict';

describe('Directive: comment', function () {

  // load the directive's module
  beforeEach(module('comment'));

  var element, scope;
  var timestamp = new Date().getTime();
  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    element = angular.element('<comment-model timestamp="'+timestamp+'" author="Santiago">hola</comment-model>');
    element = $compile(element)(scope);
    scope.$digest();
  }));

  it('should render the author', function (){
    expect(element.find('h2').html()).toBe('Santiago');
  });

  it('should render the msg', function (){
    expect(element.find('span').text()).toBe('hola - a few seconds ago');
  });
});
