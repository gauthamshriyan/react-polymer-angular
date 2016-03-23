'use strict';

describe('Directive: comment', function () {

  // load the directive's module
  beforeEach(module('commentList'));

  var element, scope, compile;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    compile = $compile;
  }));

  it('should render the comments', function (){
    var comments = [
      {'author': 'Santiago', 'msg': 'Now', timestamp: new Date().getTime(),id: 1},
      {'author': 'Pablo', 'msg': 'Minutes', timestamp: new Date().setTime(new Date().getTime() - 2*60000),id: 2},
      {'author': 'Superman', 'msg': 'Hours', timestamp: new Date().setTime(new Date().getTime() - 3*3600000),id: 3},
      {'author': 'Batman', 'msg': 'Days', timestamp: new Date().setDate(new Date().getDate() - 4),id: 4}
    ];
    scope.comments = comments;
    element = angular.element('<comment-list comments="comments"></comment-list>');
    element = compile(element)(scope);
    scope.$digest();
    expect(element.find('comment-model').length).toBe(4);
  });

  it('should render few seconds ago', function (){
    var comments = [
      {'author': 'Santiago', 'msg': 'Now', timestamp: new Date().getTime(),id: 1}
    ];
    scope.comments = comments;
    element = angular.element('<comment-list comments="comments"></comment-list>');
    element = compile(element)(scope);
    scope.$digest();
    expect(element.find('span').text()).toBe('Now - a few seconds ago');
  });

  it('should render 2 minutes ago', function (){
    var comments = [
      {'author': 'Pablo', 'msg': 'Minutes', timestamp: new Date().setTime(new Date().getTime() - 2*60000),id: 1}
    ];
    scope.comments = comments;
    element = angular.element('<comment-list comments="comments"></comment-list>');
    element = compile(element)(scope);
    scope.$digest();
    expect(element.find('span').text()).toBe('Minutes - 2 minutes ago');
  });

  it('should render 3 hours ago', function (){
    var comments = [
      {'author': 'Superman', 'msg': 'Hours', timestamp: new Date().setTime(new Date().getTime() - 3*3600000),id: 1}
    ];
    scope.comments = comments;
    element = angular.element('<comment-list comments="comments"></comment-list>');
    element = compile(element)(scope);
    scope.$digest();
    expect(element.find('span').text()).toBe('Hours - 3 hours ago');
  });

  it('should render 4 days ago', function (){
    var comments = [
      {'author': 'Batman', 'msg': 'Days', timestamp: new Date().setDate(new Date().getDate() - 4),id: 4}
    ];
    scope.comments = comments;
    element = angular.element('<comment-list comments="comments"></comment-list>');
    element = compile(element)(scope);
    scope.$digest();
    expect(element.find('span').text()).toBe('Days - 4 days ago');
  });

  it('should not render any comment if the data is empty', function (){
    var comments = [];
    scope.comments = comments;
    element = angular.element('<comment-list comments="comments"></comment-list>');
    element = compile(element)(scope);
    scope.$digest();
    expect(element.find('comment-model').length).toBe(0);
  });

  it('should render  - No Comments yet - msg if the data is empty', function (){
    var comments = [];
    scope.comments = comments;
    element = angular.element('<comment-list comments="comments"></comment-list>');
    element = compile(element)(scope);
    scope.$digest();
    expect(element.find('span').text()).toBe('No comments yet');
  });
});
