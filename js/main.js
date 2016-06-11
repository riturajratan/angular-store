var bagApp = angular.module("bagApp", [
	"bagApp.controllers",
	"ngRoute"
])

.factory("plist", ["$http", function($http){
	var product = [];

	return {
		cart : [],
		featured : [],
		getprod : function(callback){
			$http
				.get('data/product.json')
				.success(callback);
		},
		addToCart : function(item){
			var isExist = false;
			
			this.cart.forEach(function(prod){
				if(prod.id == item.id) isExist = true;
			});

			if(!isExist)  this.cart.push(item);
		},
		removeFromCart : function(item){
			var pos;
			this.cart.forEach(function(prod, index){
				if(prod.id == item.id) pos = index;
			});

			this.cart.splice(pos, 1);
		}
	};
}])

.factory("userFact", function(){
	var user;
	return {
		isLoggedin : function(){
			return sessionStorage.getItem("user");
		},
		doLogin : function(user){
			sessionStorage.setItem("user", user);
		},
		logOut : function(){
			sessionStorage.removeItem("user");
		}
	}
})

.config(["$routeProvider", function($routeProvider){
	$routeProvider
		.when("/product/:id", {templateUrl : "./views/templates/details.html", controller : "plistCtrl"})
		.when("/checkout", {templateUrl : "./views/templates/checkout.html", controller : "plistCtrl"})
		.when("/login", {templateUrl : "./views/templates/login.html", controller : "loginCtrl"})
		.when("/home", {templateUrl : "./views/templates/product-list.html", controller : "plistCtrl"})
		.otherwise({redirectTo:"/home"});
}])
.run(["plist", function(plist){
	plist.getprod(function(data){
		plist.product = data;
	});
}]);
