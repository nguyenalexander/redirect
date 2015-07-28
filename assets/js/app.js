var app = angular.module('cs-redirect', ['ngAnimate', 'ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

  // $locationProvider.html5Mode(true);

  $routeProvider
  .when('/', {
    controller: 'MainCtrl',
    templateUrl: '../views/main.html'
  })
  .when('/redirect/:url*/:title/:id', {
    controller: 'InfoCtrl',
    templateUrl: '../views/form.html'
  })
}])

app.filter('escape', function() {
  return window.encodeURIComponent;
});

app.controller('MainCtrl', ['$scope', function($scope){

}]);

app.controller('InfoCtrl', ['$scope', '$routeParams', '$window', '$http', '$sce', '$interval', function($scope, $routeParams, $window, $http, $sce, $interval){

  console.log('infoCtrl loaded')

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

  $scope.url = $routeParams.url
  $scope.title = $routeParams.title

  console.log($scope.url, $scope.title, $routeParams.id)

  $scope.timeOut = 10;
  $scope.timerWatch = true;

  var setTimer = function() {
    if ($routeParams.id == 'a') {
      $scope.requiredFields = true;
      $scope.showTimer = false;
      $scope.timeOut = false;
    }else if ($routeParams.id == 'b') {
      $scope.requiredFields = false;
      $scope.showTimer = true;
      timer = $interval(function() {
        if ($scope.timeOut > 0){
          $scope.timeOut -= 1;
          return ($scope.timeOut)
        }else if ($scope.timeOut == 0){
          $scope.timerWatch = false
          console.log('cancel', $scope.timeOut, $scope.timerWatch)
          $interval.cancel(timer)
        }
      }, 1000)
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
      $scope.message = 'Submit!'
    }
    else if($scope.showTimer == false) {
      $scope.timerWatch == false;
      $scope.message = 'Submit!'
    }
  })




  $scope.submit = function(url) {
    $http.post('/user', {name: $scope.name, email: $scope.email, company: $scope.company, timer: $scope.showTimer}).success(function(user){
      console.log(user)
      if (($scope.url).indexOf('http://') == -1) {
        $window.location.href = 'http://' + url;
      }else{
        $window.location.href = url;
      }
    })
  }

}]);