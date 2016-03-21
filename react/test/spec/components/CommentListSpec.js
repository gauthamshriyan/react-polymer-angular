'use strict';

describe('CommentList', function () {
  var React = require('react/addons');
  var TestUtils = require('react/lib/ReactTestUtils');
  var CommentList, CommentModel, component;

  beforeEach(function () {
    CommentList = require('components/CommentList/CommentList.js');
    CommentModel = require('components/Comment/Comment.js');
  });

  afterEach(function() {
    if (component && component.isMounted()) {
      React.unmountComponentAtNode(component.getDOMNode());
    }
  });

  it('should render all of the comments', function (){
   let comments = [
     {'author': 'Santiago', 'msg': 'Now', timestamp: new Date().getTime(),id: 1},
     {'author': 'Pablo', 'msg': 'Minutes', timestamp: new Date().setTime(new Date().getTime() - 2*60000),id: 2},
     {'author': 'Superman', 'msg': 'Hours', timestamp: new Date().setTime(new Date().getTime() - 3*3600000),id: 3},
     {'author': 'Batman', 'msg': 'Years', timestamp: new Date().setDate(new Date().getDate() - 4),id: 4}
   ];
   component = TestUtils.renderIntoDocument(<CommentList data={comments}/>);
   let result = TestUtils.scryRenderedComponentsWithType(component, CommentModel);
   expect(result.length).toBe(4);
 });


 it('should render a few seconds ago', function (){
   let comments = [
     {'author': 'Santiago', 'msg': 'Now', timestamp: new Date().getTime(),id: 1}
   ];
   component = TestUtils.renderIntoDocument(<CommentList data={comments}/>);
   var result = TestUtils.scryRenderedComponentsWithType(component, CommentModel);
   expect(result[0].refs.moment.getDOMNode().textContent).toBe('a few seconds ago');
 });


 it('should render 2 minutes ago', function (){
   let comments = [
     {'author': 'Pablo', 'msg': 'Minutes', timestamp: new Date().setTime(new Date().getTime() - 2*60000),id: 1}
   ];
   component = TestUtils.renderIntoDocument(<CommentList data={comments}/>);
   var result = TestUtils.scryRenderedComponentsWithType(component, CommentModel);
   expect(result[0].refs.moment.getDOMNode().textContent).toBe('2 minutes ago');
 });


 it('should render 3 hours ago', function (){
   let comments = [
     {'author': 'Superman', 'msg': 'Hours', timestamp: new Date().setTime(new Date().getTime() - 3*3600000),id: 1}
   ];
   component = TestUtils.renderIntoDocument(<CommentList data={comments}/>);
   var result = TestUtils.scryRenderedComponentsWithType(component, CommentModel);
   expect(result[0].refs.moment.getDOMNode().textContent).toBe('3 hours ago');
 });


 it('should render 4 days ago', function (){
   let comments = [
     {'author': 'Batman', 'msg': 'Years', timestamp: new Date().setDate(new Date().getDate() - 4), id: 1}
   ];
   component = TestUtils.renderIntoDocument(<CommentList data={comments}/>);
   var result = TestUtils.scryRenderedComponentsWithType(component, CommentModel);
   expect(result[0].refs.moment.getDOMNode().textContent).toBe('4 days ago');
 });

  it('should not render any comment if the data is empty', function (){
    var comments = [];
    component = TestUtils.renderIntoDocument(<CommentList data={comments}/>);
    var result = TestUtils.scryRenderedComponentsWithType(component, CommentModel);
    expect(result.length).toBe(0);
  });

  it('should render  - No Comments yet - msg if the data is empty', function (){
    var comments = [];
    component = TestUtils.renderIntoDocument(<CommentList data={comments}/>);
    var msg = TestUtils.findRenderedDOMComponentWithClass(component, 'commentList');
    expect(msg.getDOMNode().textContent).toBe('No comments yet');
  });

});
