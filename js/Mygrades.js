/**
 * Created by hxsd on 2016/8/19.
 */
var myapp = angular.module("myapp",['chart.js']);
myapp.controller("LineCtrl", function($scope,$http,$timeout) {
        // 向服务器端请求新的数据，替换掉现有的数据
        $http.get("json/person.json").success(function(data){
            $scope.products = data;

        }).finally(function(){
            // 通知框架，刷新结束，停止显示图标
            $scope.$broadcast("scroll.refreshComplete");
        });
    $timeout(function () {
        $scope.labels = ["第一周", "第二周", "第三周","第四周","第五周","第六周"];
        //$scope.score = $scope.products.professionScore;

        $scope.data = [$scope.products.professionScore,[0,0,0,0,0,0]];
        $scope.datasetOverride = [{yAxisID:'y-axis-1'},{yAxisID:'y-axis-2'}
        ];
        $scope.options = {
            scales:{
                yAxes:[
                    {
                        id:'y-axis-1',
                        type:'linear',
                        display:true,
                        position:'left'
                    },
                    {
                        id:'y-axis-2',
                        type:'linear',
                        display:true,
                        position:'right'
                    }
                ]
            }
        };
        console.log($scope.products.quality);
        $scope.width = "width:" + $scope.products.quality + "%";
    },1000);

});

myapp.controller("MixedChartCtrl", function($scope,$timeout) {
    $timeout(function () {
        $scope.colors = ['#45b7cd',"#a5cc89",'#ff8e72'];
        $scope.labels = [""];
        $scope.data = [
            [$scope.products.pass.slice(0,2)],
            [0]
        ];
        $scope.datasetOverride = [
            {
                label:"Bar chart",
                borderWidth:4,
                type:"bar"
            },
            {
                label:"Line chart",
                borderWidth:2,
                hoverBackgroundColor:"rgbe(255,99,132,0.4)",
                hoverBorderColor:"rgbe(255,99,132,1)",
                type:"line"
            }
        ];


    },500);


});
