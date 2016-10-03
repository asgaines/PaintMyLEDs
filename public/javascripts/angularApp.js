var app = angular.module('paintMyLEDs', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('paint', {
        url: '/paint',
        templateUrl: '/paint.html',
        controller: 'MainCtrl'
      })
      .state('paintings', {
        url: '/paintings',
        templateUrl: '/paintings.html',
        controller: 'PaintingsCtrl',
        resolve: {
          postPromise: ['paintings', function(paintings) {
            return paintings.getAll();
          }]
        }
      });
    $urlRouterProvider.otherwise('paint');
  }
]);

app.factory('paintings', ['$http', function($http) {
  var o = {
    paintings: []
  };

  o.getAll = function() {
    return $http.get('/paintings')
      .success(function(data) {
        angular.copy(data, o.paintings);
      });
  }
  return o;
}]);

app.directive('drawCanvas', function() {
  return function(scope, element, attrs) {
    element.ready(function() {
      element.append('<canvas id="' + scope.painting._id + '" width="800" height="400"></canvas>');
      var canvas = document.getElementById(scope.painting._id);
      var g = new Grid(canvas, 8, 16, false, scope.painting.data);
    });
  }
});

app.controller('MainCtrl', [
  '$scope',
  '$http',
  function($scope, $http) {
    $scope.message = 'Click Publish when complete';
    $scope.canvas = document.getElementById('ledGrid');
    $scope.grid = new Grid($scope.canvas, 8, 16, true);

    $scope.publishGrid = function() {
      $scope.loading = true;
      $http.post('/', {
        data: $scope.grid.getData(),
        artist: $scope.artist
      }).success(function(data) {
        $scope.message = 'Your drawing has been successfully submitted';
        $scope.grid = new Grid($scope.canvas, 8, 16);
      });
    }
  }
]);

app.controller('PaintingsCtrl', [
  '$scope',
  'paintings',
  function($scope, paintings) {
    $scope.paintings = paintings.paintings;
  }
]);
