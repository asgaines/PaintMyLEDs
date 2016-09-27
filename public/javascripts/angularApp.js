var app = angular.module('paintMyLEDs', []);

app.controller('MainCtrl', [
  '$scope',
  '$http',
  function($scope, $http) {
    $scope.message = 'Click Publish when complete';
    $scope.publishGrid = function() {
      $http.post('/', {data: Grid.getGridData()}).success(function(data) {
        $scope.message = 'Your drawing has been successfully submitted';
      })
    }
  }
]);
