angular
    .module('TaskOneApp')
    .config(function($routeProvider) {
    $routeProvider
        .when("/save-keyword", {
            templateUrl : "modules/save-keyword/save-keyword.html",
            controller : "SaveKeywordController"
        })
        .when("/", {
            templateUrl : "modules/get-keyword-list/get-keyword-list.html",
            controller : "GetKeywordListController"
        })
        .when("/get-keyword", {
            templateUrl : "modules/get-keyword/get-keyword.html",
            controller : "GetKeywordController"
        });
});
