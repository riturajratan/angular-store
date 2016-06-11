angular.module('bagApp.controllers', [])

.controller("plistCtrl",[ "$scope", "plist", "userFact", "$routeParams", "$location", function($scope, plist, userFact, $routeParams, $location){
	var onpageLoad = function() {
		$scope.productList = plist.product;	
	};
	$scope.productItem = {};
	$scope.go = function ( path ) {
	  $location.path( path );
	};
	$scope.updateCart = function(elm){
		if(userFact.isLoggedin() != null){
			plist.addToCart(elm.prod || elm.productItem || elm.data);
			$location.path("/checkout");
		} else {
			$location.path("/login");
		}
	};
	
	plist.product.forEach(function(record){
		if(record.id == $routeParams.id){
			$scope.productItem = record;
		}
	});

	$scope.cartProductList = plist.cart;
	$scope.total = 0;
	$scope.updateTotal = function(){
		$scope.total = 0;
		$scope.cartProductList.forEach(function(record){
			$scope.total +=  record.qty * record.price;
		});
	};

	$scope.removeItem = function(elm){
		plist.removeFromCart(elm.productItem);
	};

	$scope.cartProductList.forEach(function(record){
		$scope.total = $scope.total + record.price;
	});

	$scope.clearCart = function() {
		plist.cart = [];
		$scope.cartProductList = {};
	};

	onpageLoad();
	
}])
.controller("loginCtrl", ["$scope", "userFact", function($scope, userFact){
	$scope.checkLogin = function(){
		if($scope.loginid == "admin" && $scope.pwd == "123"){
			$scope.invalid = false;
			userFact.doLogin($scope.loginid);
			history.back();
		} else {
			$scope.invalid = true;
		}
	};

	if(userFact.isLoggedin()){
		history.back();
	}
}])

.controller("userbarCtrl", ["$rootScope","$scope", "userFact", "$location", function($rootScope, $scope, userFact, $location){
	$scope.$on('$routeChangeStart', function (event) {
		//event.preventDefault();
		if (!userFact.isLoggedin()) {
			$scope.userName = "Guest";
			$scope.loggedIn = false;
		}
		else {
			$scope.userName = userFact.isLoggedin();
			$scope.loggedIn = true;
		}
	});
	$scope.logout = function(){
		userFact.logOut();
		$scope.userName = "Guest";
		$location.path("/");
	};	
}]);