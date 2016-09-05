/**
 * Created by hxsd on 2016/8/3.
 */
var myapp = angular.module("myapp", ["ionic"]);
myapp.config(function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
    $ionicConfigProvider.backButton.text("");
    $ionicConfigProvider.backButton.previousTitleText("");

    $stateProvider.state("tabs",{
        url:"/tabs",
        abstract:true,
        templateUrl:"views/tabs/tabs.html"
    });
    $stateProvider.state("tabs.home",{
        url:"/home",
        views:{"tabs-home":{"templateUrl":"views/home/home.html"
        }}
    });

    $stateProvider.state("tabs.help",{
        url:"/help",
        views:{"tabs-help":{"templateUrl":"views/help/help.html"

        }}
    });
    $stateProvider.state("tabs.message",{
        url:"/message",
        views:{"tabs-message":{"templateUrl":"views/message/message.html",
            controller:"messageCtrl"

        }}
    });
    $stateProvider.state("tabs.message_details",{
        url:"/message_details",
        views:{"tabs-message":{"templateUrl":"views/message/message_details.html",
            controller:"messageCtrl"

        }}
    });
    $stateProvider.state("tabs.message_notice",{
        url:"/message_notice",
        views:{"tabs-message":{"templateUrl":"views/message/message_notice.html",
            controller:"messageCtrl"

        }}
    });
    $stateProvider.state("tabs.message_email",{
        url:"/message_email",
        views:{"tabs-message":{"templateUrl":"views/message/message_email.html",
            controller:"messageCtrl"

        }}
    });
    $stateProvider.state("tabs.message_video",{
        url:"/message_video",
        views:{"tabs-message":{"templateUrl":"views/message/message_video.html",
            controller:"messageCtrl"

        }}
    });
    $stateProvider.state("tabs.message_video_play",{
        url:"/message_video_play",
        views:{"tabs-message":{"templateUrl":"views/message/message_video_play.html",
            controller:"messageCtrl"

        }}
    });
    /*$stateProvider.state("tabs.about",{
        url:"/about",
        views:{"tabs-about":{"templateUrl":"views/about/about.html",
            controller:"aboutCtrl"
        }}
    });*/

    $urlRouterProvider.otherwise("/tabs/home");

});
angular.module("myapp").controller("myCtrl",function($scope,$http,$timeout){
    $scope.help = [];
    $scope.upNumber = function (num) {
        if(num<10){
            return "0"+num;
        }else{
            return ""+num;
        }
    };

    $scope.refresh_self = function(){
        // 向服务器端请求新的数据，替换掉现有的数据
        $http.get("json/person.json").success(function(data){
            $scope.products = data;
        }).finally(function(){
            // 通知框架，刷新结束，停止显示图标
            $scope.$broadcast("scroll.refreshComplete");
        });
    };
    $scope.refresh_self();
    $scope.refresh_fiveStar = function(){
        // 向服务器端请求新的数据，替换掉现有的数据
        $http.get("json/fiveStar.json").success(function(data){
            $scope.fiveStars = data;
        }).finally(function(){
            // 通知框架，刷新结束，停止显示图标
            $scope.$broadcast("scroll.refreshComplete");
        });
    };
    $scope.refresh_fiveStar();

    $scope.loadMore = function(){
        // 向服务器端请求一页新的数据，追加到现有数据之后
        $http.get("json/fiveStar.json").success(function(data){
            // 使用Array的原型方法push; 等价于  $scope.products.push(data)
            Array.prototype.push.apply($scope.fiveStars,data);
        }).finally(function(){
            // 通知框架，加载结束，停止显示图标
            $scope.$broadcast("scroll.infiniteScrollComplete");
        });
    };
    $scope.loadMore();


/*opera_details*/
    $scope.praiseSrc = "images/like_opera.png";
    $scope.praisenumber = 10;
    $scope.clickPraise = function(){
        $scope.praisenumber ++;
        $scope.praiseSrc = "images/link_opreaon.png";
        $timeout(function(){
            $scope.praiseSrc = "images/like_opera.png";
        },300);
    };
    var turn = true;
    $scope.mePraiseSrc = "images/link_null.png";
    $scope.shareTo = false;
    $scope.meClickPraise = function () {
        if(turn){
            $scope.mePraiseSrc = "images/like_light.png";
            $scope.shareTo = true;
        }else{
            $scope.mePraiseSrc = "images/link_null.png";
            $scope.shareTo = false;
        }
        console.log(turn);
        turn = !turn;
    };
    /*控制模态层*/
    $scope.moduleShow = false;
    $scope.clickModule = function () {
        $scope.moduleShow = true;
    };
    $scope.clickModuleNone = function () {
        $scope.moduleShow = false;
    };


    $scope.assessClass = [];
    $scope.clickToAssess = function (n) {
        $scope.lingtStar(0);
        $scope.result = "";
        $scope.abc = n;
        $scope.assessClass[n] = -1;
        $scope.moduleShow = true;
        $scope.help[n].state = "已处理";
        $scope.help[n].assess = "已评价";
    };

    //$scope.assess = "";
    $scope.clickAssess = function () {
        $scope.assess = "turnAssess";
        $scope.assessClass[$scope.abc] = $scope.abc;
    };
    /*四星评价*/
    $scope.results = ["不满意","一般","满意","很满意"];
    $scope.result = "";
    $scope.lingtStar = function(num){
        if(num!=0){
            $scope.result = $scope.results[num-1];
        }
        $scope.stars = [];
        for(var i=0;i<4;i++){
            if(i<num){
                $scope.stars.push({name:"star_active"});
            }else{
                $scope.stars.push({name:"star_box"});
            }
        }
    };
    $scope.lingtStar(0);
});

myapp.controller("helpCtrl", function ($scope){
    $scope.askForHelp = function () {
        if(!$scope.yourCont){
            return;
        }
        $scope.yourCont="";
        $scope.helpme="";
        var time = new Date();
        var year = time.getFullYear();
        var month = time.getMonth()+1;
        var day = time.getDate();
        var hour = $scope.upNumber(time.getHours());
        var minute = $scope.upNumber(time.getMinutes());
        var help1={
            "time":hour +"：" +minute,
            "date":year +"/" + month + "/" + day,
            "state":"处理中",
            "assess":"评价"
        };
        $scope.help.push(help1);
    };

    $scope.TextChage = function (con) {
        $scope.yourCont = con;
        if(con){
            $scope.helpme = "helpMe";
        }else{
            $scope.helpme="";
        }


    };
});

myapp.controller("loginCtrl", function ($scope) {
    $scope.htmlSrc = "register.html";
    $scope.password="";
    $scope.name="";
    $scope.login = function(){
        if($scope.password.length < 6 || $scope.name.length < 3){
            $scope.htmlSrc = "register.html";
        }else{
            $scope.htmlSrc = "index.html";
        }
    };
    $scope.con = "";
    $scope.htmlSrc2 = "register.html";
    $scope.long_in = function () {
        if($scope.password.length < 6 || $scope.name.length < 3){
            $scope.con = "用户名或密码错误";
            $scope.htmlSrc2 = "register.html";
        }else{
            $scope.con = "";
            $scope.htmlSrc2 = "index.html";
        }
    };
    /*setting*/
    $scope.youSure = false;
    $scope.clickOut = function () {
        $scope.youSure = true;
    };
    $scope.whileOut = function () {
        $scope.youSure = false;
    };
    $scope.openMessageName = "oppenMessage";
    $scope.openSend = function(){
        if($scope.openMessageName == "oppenMessage"){
            $scope.openMessageName = "closeMessage";
        }else{
            $scope.openMessageName = "oppenMessage";
        }

    }
});


