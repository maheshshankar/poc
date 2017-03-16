
var app = angular.module("myApp",['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/index',{templateUrl:'templates/userList.html',controller:'listCtrl'})
	.when('/addUser',{templateUrl:'templates/addUser.html',controller:'addCtrl'})
	.when('/edit/:id',{templateUrl:'templates/editUser.html',controller:'editCtrl'})

	.otherwise({redirectTo:'/index'})
})

app.controller("myCtrl",function(){
	console.log("I m In Controller");
})

app.controller("addCtrl",function($scope, $http, $location){
	console.log("I m In add Controller");
	$scope.registerUser = function(){
		console.log($scope.register);
		$http.post("http://localhost:3390/app/", $scope.register)
			.success(function(data){
				if(data.msg === 'User Saved..!'){
					$location.path('/index');
				}
			})
			.error(function(){
				console.log("not found");
			})
	}

})

app.controller("listCtrl",function($scope, $http, $location){
	console.log("I m In list Controller");
	$scope.getUserData = function(){
		$http.get("http://localhost:3390/app/all")
				.success(function(data){
					console.log(data);
					$scope.userData = data;
				})
				.error(function(){
					console.log("not found");
				})
	}
	$scope.getUserData();

	$scope.editUser = function(id){
		$location.path('/edit/'+id);
	}

	$scope.removeUser = function(id){
		console.log(id);
		$http.delete("http://localhost:3390/app/remove/" + id)
				.success(function(data){
					console.log(data);
					$scope.getUserData();
				})
				.error(function(){
					console.log("not found");
				})
	}

})

app.controller("editCtrl", function($scope, $http, $routeParams){
	console.log("in edit Ctrl");
	console.log($routeParams);
	var id = $routeParams.id;
	$scope.register = {};
	$scope.getUser = function(){
		$http.get("http://localhost:3390/app/getRecord/" + id)
				.success(function(data){
					console.log('nameeme',data.name);
					//$scope.userData = data;
					$scope.register.name = data.name;
					$scope.register.username = data.username;
					$scope.register.email = data.email;
				})
				.error(function(){
					console.log("not found");
				})	
	}
	$scope.getUser();

	$scope.updateUser = function(){
		console.log('updtetet',$scope.register)
		$http.put("http://localhost:3390/app/edit/" + id, $scope.register)
			.success(function(data){
				if(data.msg === 'User Updated..!'){
					$location.path('/index');
				}
			})
			.error(function(){
				console.log("not found");
			})
	}

})