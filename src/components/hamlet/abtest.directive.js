'use strict';

angular.module('hamlet')

  .directive('abTest', ['HashService', function(HashService) {
  return {
    restrict: 'A',
    transclude: true,
    scope: {
    	abTestConfig: '@',
    	abTestQualifier: '@'
    },
    link: function(scope, element, attrs, abTestCtrl) {
      attrs.$observe('abTestQualifier', function (){
        var selectedBucket = HashService.calculateBucket(attrs.abTestQualifier, abTestCtrl.getRatios());
        abTestCtrl.selectBranch(selectedBucket);
      });
    },
    controller: function($scope) {
      var panes = $scope.panes = [];
      var ratios = $scope.ratios = [];

      this.getRatios = function() {
        return ratios;
      }

      this.selectBranch = function(branch) {
        angular.forEach(panes, function(pane) {
          pane.selected = false;
        });
        panes[branch].selected = true;
      };

      this.addPane = function(pane) {
        panes.push(pane);
        if (panes.length === 1) {
          this.selectBranch(0);
        }

      };

      this.readjustRatio = function(ratios) {
      	var sumOfRatios = 0;
      	for (var i = 0; i <= ratios.length; i++) {
          if (ratios[i] === 'others') {
      			ratios[i] = 10 - sumOfRatios;
            var selectedBucket = HashService.calculateBucket($scope.abTestQualifier, ratios);
        this.selectBranch(selectedBucket);
      		}
      		else {
      			sumOfRatios += ratios[i] * 1;

      		}
      	}
      }


      this.addRatio = function(ratio) {

        var ratioToBePushed;
        if (ratio === 'others') {
          ratios.push(ratio);
          this.readjustRatio(ratios);
        }
        else {
          console.log('ratio: ' + ratio);
          ratioToBePushed = parseFloat(ratio) * 10;
          console.log('ratioToBePushed: ' + ratioToBePushed);
          ratios.push(ratioToBePushed);
        }
      };
    },
    template: '<div ng-transclude></div>'
  };
}])
.directive('testBranch', function() {
  return {
    require: '^abTest',
    restrict: 'A',
    transclude: true,
    scope: {
      title: '@',
      ratio: '@'
    },
    link: function(scope, element, attrs, abTestCtrl) {
      abTestCtrl.addPane(scope);
      abTestCtrl.addRatio(scope.ratio);
    },
    template: '<div ng-show="selected" ng-transclude></div>'
  };
});
