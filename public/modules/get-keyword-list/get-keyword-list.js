angular
    .module('TaskOneApp')
    .controller('GetKeywordListController', function($rootScope, $scope, $http) {

        $scope.keywordList = [];
        $rootScope.selectedKeywordObj = {};

        $scope.selectedKeyword = function(keywordObj){
            $rootScope.selectedKeywordObj = keywordObj;
        };

        $scope.keywordList = function(){
            let reqObj = {
                method: 'GET',
                url: 'http://localhost:3000/get-keyword-list'
            };

            $http(reqObj).then(successCallback, errorCallback);
        };

        function successCallback(res){
            if(res && res.data){
                if(res.data.code === 200) {
                    $scope.keywordList = res.data.responseData;
                }else{
                    alert('Something went wrong');
                }
            }
        }

        function errorCallback(err){
            alert('Something went wrong');
        }

        $scope.keywordList();
    });
