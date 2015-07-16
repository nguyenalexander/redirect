var app = angular.module('cs-redirect', ['ngAnimate', 'ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

  // $locationProvider.html5Mode(true);

  $routeProvider
  .when('/', {
    controller: 'MainCtrl',
    templateUrl: '../views/main.html'
  })
  .when('/redirect/:url*/:title', {
    controller: 'InfoCtrl',
    templateUrl: '../views/form.html'
  })
}])

app.filter('escape', function() {
  return window.encodeURIComponent;
});

app.controller('MainCtrl', ['$scope', function($scope){

  // $scope.isValid = function() {
  //   return ($scope.name && $scope.email && $scope.company) !== undefined;
  // }

  // $scope.url = $routeParams.url

  // $scope.submit = function(url) {
  //   $window.location.href = 'http://' + url;
  // }

}]);

app.controller('InfoCtrl', ['$scope', '$routeParams', '$window', '$http', '$sce', function($scope, $routeParams, $window, $http, $sce){

  console.log('infoCtrl loaded')

  $scope.isValid = function() {
    return ($scope.name && $scope.email && $scope.company) !== undefined;
  }

  $scope.url = $routeParams.url
  $scope.title = $routeParams.title

  console.log($scope.url, $scope.title)

  $scope.submit = function(url) {
    $http.post('/user', {name: $scope.name, email: $scope.email, company: $scope.company}).success(function(user){
      console.log(user)
      if (($scope.url).indexOf('http://') == -1) {
        $window.location.href = 'http://' + url;
      }else{
        $window.location.href = url;
      }
    })
  }

}]);