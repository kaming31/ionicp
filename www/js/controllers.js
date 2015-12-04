angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http) {
$scope.httpUrl = '/app';


 
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: '매입등록', id: 1 },
    { title: '매출등록', id: 2 },
  ]; 

})

/* 매입조회컨트롤러 */
.controller('MaipSearchCtrl', function($scope, $stateParams,$ionicPopup,$http,$ionicModal, $ionicHistory) {

$scope.httpUrl = '/app';
$scope.andUrl = 'http://erpia.net';

$scope.listSearch = ''; //상품명 검색
$scope.listindex = 5; //더보기 5개씩


/* 거래처검색 */
  $scope.customerSearchlists ={
      Admin_Code : 'onz',
      UserId : 'pikapika',
      Kind : 'ERPia_Meaip_Select_GerName',
      Mode : '',
      GerName : ''
    };

/* 거래처검색 modal생성 */
$ionicModal.fromTemplateUrl('templates/customer.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalcustomer = modal;
  });

 /* 거래처 창 닫기 */
  $scope.closecustomer = function() {
    $scope.modalcustomer.hide();
  };

 /* 거래처검색창 보여주기 */
  $scope.customer = function() {
    $scope.modalcustomer.show();
  };

 /* 거래처 검색 */
  $scope.cusSearch = function(){
    $http.get($scope.httpUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.customerSearchlists}).
      success(function(data, status, headers, config) {

        $scope.lists = data.list;
      }).
      error(function(data, status, headers, config) {

        var alertPopup = $ionicPopup.alert({

                title: 'Search failed!',

                template: 'Please check your credentials!'

      });
      });
  };

/* 더보기 처리 */
 $scope.more=function(){
  $scope.listindex = $scope.listindex + 5;
 }

/* 날짜계산 */
$scope.dateMinus=function(days){

    var nday = new Date();  //오늘 날짜..  
    nday.setDate(nday.getDate() - days); //오늘 날짜에서 days만큼을 뒤로 이동 

    var yy = nday.getFullYear();
    var mm = nday.getMonth()+1;
    var dd = nday.getDate();

    if( mm<10 ) mm = "0" + mm;
    if( dd<10 ) dd = "0" + dd;

    return yy + "-" + mm + "-" + dd;

}

//오늘날짜
$scope.todate=$scope.dateMinus(0);

//날짜별 상품 검색
$scope.reqparams={
      Admin_Code : 'onz',
      UserId : 'pikapika',
      Kind : 'ERPia_Sale_Select_Master',
      Mode : 'Select_Date',
      Sl_No : '',
      sDate : $scope.todate,
      eDate : $scope.todate
    };
    //금일 데이터 기본값으로 얻어오기
    $http.get($scope.httpUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.reqparams}).
      success(function(data, status, headers, config) {

        $scope.lists = data.list;
      }).
      error(function(data, status, headers, config) {

        var alertPopup = $ionicPopup.alert({

                title: 'Login failed!',

                template: 'Please check your credentials!'
      });
      });


    $scope.searches=function(){
       // CORS 요청 데모
    $http.get($scope.httpUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.reqparams}).
      success(function(data, status, headers, config) {

        $scope.lists = data.list;
/*        $state.go('app.search');*/
      }).
      error(function(data, status, headers, config) {

        var alertPopup = $ionicPopup.alert({

                title: 'Login failed!',

                template: 'Please check your credentials!'

      });
      });
    }

    $scope.searchestoday=function(){
      $scope.reqparams.sDate=$scope.dateMinus(0);
     $scope.reqparams.eDate=$scope.dateMinus(0);
       // CORS 요청 데모
    $http.get($scope.httpUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.reqparams}).
      success(function(data, status, headers, config) {

        $scope.lists = data.list;
/*        $state.go('app.search');*/
      }).
      error(function(data, status, headers, config) {

        var alertPopup = $ionicPopup.alert({

                title: 'Login failed!',

                template: 'Please check your credentials!'

      });
      });
    }

    $scope.searches7day=function(){
     $scope.reqparams.sDate=$scope.dateMinus(7);
     $scope.reqparams.eDate=$scope.dateMinus(0);
       // CORS 요청 데모
    $http.get($scope.httpUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.reqparams}).
      success(function(data, status, headers, config) {

        $scope.lists = data.list;
/*        $state.go('app.search');*/
      }).
      error(function(data, status, headers, config) {

        var alertPopup = $ionicPopup.alert({

                title: 'failed!',

                template: 'Please check your credentials!'

      });
      });
    }


    $scope.searches30day=function(){
      $scope.numberOfItemsToDisplay = 10;
     $scope.reqparams.sDate=$scope.dateMinus(30);
     $scope.reqparams.eDate=$scope.dateMinus(0);
       // CORS 요청 데모
    $http.get($scope.httpUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.reqparams}).
      success(function(data, status, headers, config) {

        $scope.lists = data.list;
        $scope.loadMore = function(done) {
    console.log('Loading more', $scope.limit);
    if ($scope.lists.length > $scope.numberOfItemsToDisplay)
    $scope.numberOfItemsToDisplay += 10; // load 20 more items
    done(); // need to call this when finish loading more data
  }

  $scope.loadMore;
/*        $state.go('app.search');*/
      }).
      error(function(data, status, headers, config) {
        var alertPopup = $ionicPopup.alert({

                title: 'failed!',

                template: 'Please check your credentials!'

      });
      });
    }

    /*매입 등록 기본사항-----------------------------*/
    $scope.maipbasiclist={
          maip_date : $scope.todate, //매입날짜
          divide : '', //
          Admin_Code : 'onz',
          Comp_no : '',
          subul_kind : 0, //수불구분
          ChangGo_Code : 0, //창고코드
          Mejang_Code : 0 //매장코드
    };

    $scope.G_Name='';
    $scope.G_Name2='';
    //매장조회 배열
    $scope.storelist={
      Admin_Code : 'onz',
      UserId : 'pikapika',
      Kind : 'ERPia_Sale_Select_Place_CName',
      Mode : 'Select_Place'
    };
    //매장코드로 창고리스트조회 배열
     $scope.changolist={
       Admin_Code : 'onz',
       UserId : 'pikapika',
       Kind : 'ERPia_Sale_Select_Place_CName',
       Mode : 'Select_CName',
       Sale_Place_Code : 0
   }


    //기본매장 디폴트
    $http.get($scope.httpUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.storelist}).
      success(function(data, status, headers, config) {

        $scope.storelists = data.list;
      }).
      error(function(data, status, headers, config) {

        var alertPopup = $ionicPopup.alert({

                title: 'Login failed!',

                template: 'Please check your credentials!'
      });
      });

//거래처창고 조회후 값저장
    $scope.customerFunc=function(gname,gcode){
      $scope.G_Name=gname;
      $scope.maipbasiclist.Comp_no=gcode;
      $scope.modalcustomer.hide();
    }
//수불구분
    $scope.kindF=function(kindcode){

      $scope.maipbasiclist.subul_kind = kindcode;
    }
//창고매장조회
    $scope.Chango=function(){

      $scope.changolist.Sale_Place_Code = $scope.maipbasiclist.Mejang_Code;
      $http.get($scope.httpUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.changolist}).
      success(function(data, status, headers, config) {

        $scope.changolists = data.list;
      }).
      error(function(data, status, headers, config) {

        var alertPopup = $ionicPopup.alert({

                title: 'Login failed!',

                template: 'Please check your credentials!'
      });
      });

    }

    //뒤로 제어
     $scope.backtest=function(){
      $ionicPopup.show({
         title: '경고',
         subTitle: '',
         content: '작성중인 내용이 지워집니다.<br> 계속진행하시겠습니까?',
         buttons: [
           { text: 'No',
            onTap: function(e){
              
            }
           },
           {
             text: 'Yes',
             type: 'button-positive',
             onTap: function(e) {
                  $ionicHistory.goBack();
             }
           },
         ]
        })
     }

})


.controller('MaippartsCtrl', function($scope, $ionicModal, $timeout, $stateParams, $http, $cordovaBarcodeScanner) {

//상품명 조회시
     $scope.GoodsNamelist={
       Admin_Code : 'onz',
       UserId : 'pikapika',
       Kind : 'ERPia_Sale_Select_Goods',
       Mode : 'Select_GoodsName',
       GoodsName : ''
   };
   //상품코드 조회시
     $scope.goodscodelist={
       Admin_Code : 'onz',
       UserId : 'pikapika',
       Kind : 'ERPia_Sale_Select_Goods',
       Mode : 'Select_G_Code',
       GoodsCode : ''
   };
   //자체코드 조회시
     $scope.G_OnCodelist={
       Admin_Code : 'onz',
       UserId : 'pikapika',
       Kind : 'ERPia_Sale_Select_Goods',
       Mode : 'Select_G_OnCode',
       G_OnCode : ''
   };

   $scope.modedivition = {
      mode : '',
      seaname : ''
    };

    $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            alert(imageData.text);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("다시시도해주세요 ->" + error);
        });
    }

    //검색 Modal
    $ionicModal.fromTemplateUrl('templates/modesearch.html', {
    scope: $scope
    }).then(function(modal) {
    $scope.modalmodesear = modal;
    });

    // 검색창 닫기
    $scope.closemodesear = function() {
    $scope.modalmodesear.hide();
    };

    // 검색창 보여주기
    $scope.modesear = function(divimode) {
      $scope.modedivition.seaname='';
      $scope.goodslists='';
      if (divimode == "Select_GoodsName") {
        $scope.checkval = "상품명조회";
        $scope.ex = "상품명을 입력해주세요";
        $scope.exs = 1;
      }else{
        if ($scope.modedivition.mode == "Select_G_Code") {
            $scope.checkval = "상품코드조회";
            $scope.ex = "상품코드를 입력해주세요";
            $scope.exs = 2;
            }else{
                   $scope.checkval = "자체코드조회";
                   $scope.ex = "자체코드를 입력해주세요";
                   $scope.exs = 3;
                 };
      };
    $scope.modalmodesear.show();
   
  };


   //검색구분
    $scope.divisionSearch=function(){
      $scope.checkd = $scope.modedivition.mode;
      alert("확인좀=>" + $scope.modedivition.seaname);

      if ($scope.checkval == "상품명조회") {
        alert("상품명조회");
        $scope.GoodsNamelist.GoodsName = $scope.modedivition.seaname;
        $http.get($scope.httpUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.GoodsNamelist}).
      success(function(data, status, headers, config) {

        $scope.goodslists = data.list;
      }).
      error(function(data, status, headers, config) {

        var alertPopup = $ionicPopup.alert({

                title: 'Login failed!',

                template: 'Please check your credentials!'
      });
      });

      }else if ($scope.checkval == "상품코드조회") { 
        alert("상품코드조회");
        $scope.goodscodelist.GoodsCode = $scope.modedivition.seaname;
        $http.get($scope.httpUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.goodscodelist}).
      success(function(data, status, headers, config) {

        $scope.goodslists = data.list;
      }).
      error(function(data, status, headers, config) {

        var alertPopup = $ionicPopup.alert({

                title: 'Login failed!',

                template: 'Please check your credentials!'
      });
      });

      }else{
        alert("자체코드조회");
        $scope.G_OnCodelist.G_OnCode = $scope.modedivition.seaname
        $http.get($scope.httpUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.G_OnCodelist}).
      success(function(data, status, headers, config) {

        $scope.goodslists = data.list;
      }).
      error(function(data, status, headers, config) {

        var alertPopup = $ionicPopup.alert({

                title: 'Login failed!',

                template: 'Please check your credentials!'
      });
      });

      };


    }
    /* 배열생성해서 ADD */
    $scope.addlists = [];

     $scope.listadd=function(listval){
      $scope.addlists.push({
            namegoods: listval
        });
      $scope.modalmodesear.hide();
     }
     /* 해당 리스트항목 삭제 */
     $scope.goodsDelete=function(){

     }

     /* 매입등록 */
     $scope.goodsinsertF=function(){
      alert("등록시킬꺼야");

     }
     $scope.ss=function(){
      alert("안녕");
     }

});



