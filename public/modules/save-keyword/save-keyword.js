angular
    .module('TaskOneApp')
    .controller('SaveKeywordController', function($scope, $http, $location) {

    $scope.keyword = "";
    $scope.submitButtonText = "Search Keyword";
    $scope.showSpinner = 0;

    $scope.saveKeyword = function(){
        $scope.showSpinner = 1;
        $scope.submitButtonText = "processing";

        let reqObj = {
            method: 'POST',
            url: 'http://52.66.6.157:3000/save',
            // url: 'http://localhost:3000/save',
            headers: {
                'Content-Type': 'application/json'
            },
            data: { "keyword": $scope.keyword }
        };

        $http(reqObj).then(successCallback, errorCallback);
    };

        function successCallback(res){
            $scope.keyword = "";
            $scope.submitButtonText = "Search Keyword";
            $scope.showSpinner = 0;

            if(res && res.data){
                if(res.data.code === 200) {
                    $location.path('');
                }else{
                    alert('Something went wrong');
                }
            }
        }

        function errorCallback(err){
            $scope.keyword = "";
            $scope.submitButtonText = "Search Keyword";
            $scope.showSpinner = 0;
            alert('Something went wrong');
        }
});
