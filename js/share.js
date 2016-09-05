/**
 * Created by hxsd on 2016/8/18.
 */
var shareapp = angular.module("shareapp",['chart.js']);
shareapp.controller("ForalinkCtr",function($scope,$timeout,$http){
    $http.get("json/person.json").success(function(data){
        $scope.products = data;

    }).finally(function(){
        // 通知框架，刷新结束，停止显示图标
        $scope.$broadcast("scroll.refreshComplete");
    });
    $scope.blck = "Foralink";
    $scope.applko = function(){
        $scope.blck = "ac";
        $timeout(function()
            {$scope.blck = "Foralink"}
        ,2000);
    };

    $scope.membrane = "taskperformance_membrane";
    $scope.ta_membrane = function(){
        $scope.membrane = "membrane_ac";
        /*$timeout(function()
            {$scope.membrane = "taskperformance_membrane"}
            ,10000);*/
    };

    $scope.share = "taskperformance_share";
    $scope.ta_share = function(){
        $scope.share = "taskperformance_share_ac";
        /*$timeout(function()
            {$scope.share = "taskperformance_share"}
            ,10000);*/
    };

    $scope.task_out = function(){
        $scope.membrane = "taskperformance_membrane";
        $scope.share = "taskperformance_share";
    };
});
shareapp.controller("DoughnutCtrl", function($scope,$timeout) {
    $timeout(function () {
        var p = $scope.products.quality * 10;
        var q = 1000 - p;
        $scope.labels = ["Download Sales", "In-Store Sales"/*, "Mail-Order Sales"*/];
        $scope.data = [q, p/*,200*/];
    },500);

});