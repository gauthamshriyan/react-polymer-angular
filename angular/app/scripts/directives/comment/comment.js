'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:comment
 * @description
 * # comment
 */
angular.module('comment', [])
  .directive('commentModel', function () {
    return {
      template: '<div class="comment">' +
                  '<h2 class="commentAuthor">' +
                      '{{author}}' +
                  '</h2>' +
                  '<ng-transclude></ng-transclude><span class="commentMoment"> - {{moment}}</span>' +
                '</div>',
      restrict: 'E',
      transclude: true,
      scope: {
        author: '@',
        timestamp:'@'
      },
      link: function postLink(scope, element, attrs) {
        scope.moment = moment(parseInt(scope.timestamp)).fromNow();
      }
    };
  });
