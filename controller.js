var app = angular.module('userProfiles');

app.controller('MainController', function($scope, mainService) {
  $scope.show = false;
  var page = 1;
  $scope.getUsers = function() {
  	mainService.getUsers().then(function(response){
      console.log(1, response)
      page = parseInt(response.data.page);
      page++;
      $scope.users = response.data.data;
      $scope.show = true;
    }, function(error){
      console.log(2, error)
    })
  }

  $scope.getMore = function(){
    mainService.getMoreUsers(page).then(function(res){
      page++;
      if(!res.data.data[0]){
        $scope.show = false;
      }
      $scope.users = $scope.users.concat(res.data.data);
    }, function(err){
      console.log(err)
    })
  }
  $scope.getUsers();

  $scope.post = function(){
    mainService.postObject({text: 'message'})
  }



});
