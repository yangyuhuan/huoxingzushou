/**
 * Created by hxsd on 2016/8/18.
 */
angular.module("myapp").controller("messageCtrl",function($scope,$http){
    $scope.message = "来自home";

    $scope.posts = [
        {
            images:"images/activity_notice_t_02.jpg",
            title: '海报创意设计',
            content:"海子团队讲解想法，带你卡开拓思维和想法",
            bTimages:"images/location_07.jpg",
            location:"火星",
            bBimages:"images/clock_10.jpg",
            date:"16-5-15"
        },
        {
            images:"images/activity_notice_b_14.jpg",
            title: '海报创意设计',
            content:"海子团队讲解想法，带你卡开拓思维和想法",
            bTimages:"images/location_07.jpg",
            location:"北京",
            bBimages:"images/clock_10.jpg",
            date:"16-5-15"
        },


    ];
    $scope.informs=[
        {
            title:"2016春季招聘会",
            classify:"新闻",
            content:"2016年春季招聘会将于2016年4月12日在火星时....",
            date:"16-2-13"
        },
        {
            title:"火星时代",
            classify:"校园",
            content:"开学典礼火星时代，我们将为你提供优质的....",
            date:"16-2-13"
        },
        {
            title:"获奖信息",
            classify:"新闻",
            content:"火星时代的1601期UI设计专业3班，李雷同学.....",
            date:"16-2-13"
        },
        {
            title:"2016春季招聘会",
            classify:"新闻",
            content:"2016年春季招聘会将于2016年4月12日在火星时....",
            date:"16-2-13"
        }
    ];

    // 下拉刷新
    $scope.refresh = function(){
        // 向服务器端请求新的数据，替换掉现有的数据
        $http.get("json/post.json").success(function(data){
            $scope.posts = data;
        }).finally(function(){
            // 通知框架，刷新结束，停止显示图标
            $scope.$broadcast("scroll.refreshComplete");
        });
    };

    // 无限滚动
    $scope.loadMore = function(){
        // 向服务器端请求一页新的数据，追加到现有数据之后
        $http.get("json/post.json").success(function(data){
            // 使用Array的原型方法push; 等价于  $scope.products.push(data)
            Array.prototype.push.apply($scope.posts,data);
        }).finally(function(){
            // 通知框架，加载结束，停止显示图标
            $scope.$broadcast("scroll.infiniteScrollComplete");
        });
    };

   // 下拉刷新
    $scope.notice_refresh= function(){
        // 向服务器端请求新的数据，替换掉现有的数据
        $http.get("json/inform.json").success(function(data){
            $scope.informs = data;
        }).finally(function(){
            // 通知框架，刷新结束，停止显示图标
            $scope.$broadcast("scroll.refreshComplete");
        });
    };

    // 无限滚动
    $scope.notice_loadMore = function(){
        // 向服务器端请求一页新的数据，追加到现有数据之后
        $http.get("json/inform.json").success(function(data){
            // 使用Array的原型方法push; 等价于  $scope.products.push(data)
            Array.prototype.push.apply($scope.informs,data);
        }).finally(function(){
            // 通知框架，加载结束，停止显示图标
            $scope.$broadcast("scroll.infiniteScrollComplete");
        });
    };

/*模态层*/
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

    $scope.model_show=false;
    $scope.cancle=function(){
        $scope.model_show=true
    };
    $scope.affirm=function(){
        $scope.model_show=false;
    }


});