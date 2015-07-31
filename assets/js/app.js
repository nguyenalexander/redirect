var app = angular.module('cs-redirect', ['ngAnimate', 'ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  // var absoluteUrl = $location.absUrl();

  // console.log($route.path, $route.current)


  $routeProvider
  .when('/redirect/:url*\/:title/:id', {
    controller: 'InfoCtrl',
    templateUrl: '../views/form.html'
  })
  .when('/redirect', {
    controller: 'MainCtrl',
    templateUrl: '../views/home.html'
  })
  .otherwise({
    controller: 'MainCtrl',
    redirectTo: '/redirect'
  })
}])

app.filter('escape', function() {
  return window.encodeURIComponent;
});

app.controller('MainCtrl', ['$scope', '$window', '$location', function($scope, $window, $location){
  $window.location.href = "http://emc.com"
}]);

app.controller('InfoCtrl', ['$scope', '$routeParams', '$window', '$http', '$sce', '$interval', '$location', function($scope, $routeParams, $window, $http, $sce, $interval, $location){
  $scope.url = $routeParams.url
  $scope.title = $routeParams.title
  $scope.version = $routeParams.id
  $scope.timeOut = 10;
  $scope.timerWatch = true;

  console.log($routeParams.id, $routeParams.title, $routeParams.url)

  if($routeParams.id){
    switch($routeParams.id) {
      case 'a':
        console.log('valid route param a',$routeParams.id)
        break;
      case 'A':
        console.log('valid route param A',$routeParams.id)
        break;
      case 'B':
        console.log('valid route param B',$routeParams.id)
        break;
      case 'b':
        console.log('valid route param b',$routeParams.id)
        break;
      default:
        $location.url('/redirect/'+$routeParams.url+'/'+$routeParams.title+'/a')
        break;
    }
  }

  $scope.isValid = function() {
    return ($scope.name && $scope.email && $scope.company) !== undefined;
  }

  $scope.isValidTimer = function(){
    if ($scope.timeOut !== 0) {
      if($scope.name && $scope.email && $scope.company) {
        $scope.timeOut = 0;
        return ($scope.name && $scope.email && $scope.company) !== undefined;
      }
    }else if ($scope.timeOut == 0) {
      return true;
    }
  }

  var setTimer = function() {
    if ($scope.version == 'a' || $scope.version == 'A') {
      $scope.requiredFields = true;
      $scope.showTimer = false;
      $scope.timeOut = false;
    }
    // else if ($scope.version == 'b') {
    //   $scope.requiredFields = false;
    //   $scope.showTimer = true;
    //   timer = $interval(function() {
    //     if ($scope.timeOut > 0){
    //       $scope.timeOut -= 1;
    //       return ($scope.timeOut)
    //     }else if ($scope.timeOut == 0){
    //       $scope.timerWatch = false
    //       console.log('cancel', $scope.timeOut, $scope.timerWatch)
    //       $interval.cancel(timer)
    //     }
    //   }, 1000)
    // }
    else if ($scope.version == 'b' || $scope.version == 'B') {
      $scope.requiredFields = true;
      $scope.showTimer = false;
      $scope.timeOut = false;
      $scope.skipThis = true;
    }
  }

  setTimer();


  $scope.$watch('timeOut', function(){
    console.log('scope.timeOut has changed to', $scope.timeOut, $scope.timerWatch)
    if($scope.timeOut > 1) {
      $scope.message = 'Please wait '+$scope.timeOut+' more seconds to proceed.'
    }else if ($scope.timeOut == 1) {
      $scope.message = 'Please wait '+$scope.timeOut+' more second to proceed.'
    }else if ($scope.timeOut == 0) {
      $scope.timerWatch = false;
      $scope.message = 'Submit'
    }
    else if($scope.showTimer == false) {
      $scope.timerWatch == false;
      $scope.message = 'Submit'
    }
  })




  $scope.submit = function(url) {
    console.log($scope.name, $scope.email, $scope.company, $scope.showTimer, $scope.version)
    $http.post('/user', {name: $scope.name, email: $scope.email, company: $scope.company, timer: $scope.showTimer, version: $scope.version, url: $scope.url, urlTitle: $scope.title}).success(function(user){
      if (($scope.url).indexOf('http://') == -1) {
        $window.location.href = 'http://' + url;
      }else{
        $window.location.href = url;
      }
    })
  }

}]);