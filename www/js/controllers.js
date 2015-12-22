
angular.module('starter.controllers', ['ngCordova', 'pickadate'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $rootScope) {
$scope.httpUrl = '/app';
$scope.andUrl = 'http://erpia.net';
$rootScope.userId = 'erli';

//기본설정 저장배열
$rootScope.BasicConfiglist = {
  basic_Ch_Code : 0, // 창고코드
  basic_Place_Code : 0, // 매장코드
  basic_Dn_Meaip : 0 // 단가설정
};
 
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: '매입등록', id: 1 },
    { title: '매출등록', id: 2 },
  ]; 


})

.controller('ConfigCtrl', function($scope, $http, $rootScope, $ionicHistory,$ionicPopup) {
$scope.httpUrl = '/app';
$scope.andUrl = 'http://erpia.net';

    //환경설정 조회배열
    $scope.configlist={
      Admin_Code : 'onz',
      UserId : 'pikapika',
      Kind : 'ERPia_Meaip_Config',
      Mode : 'select'
    };

    //매장코드로 창고리스트조회 배열
    $scope.changolist={
      Admin_Code : 'onz',
      UserId : 'pikapika',
      Kind : 'ERPia_Meaip_Select_Place_CName',
      Mode : 'Select_CName',
      Sale_Place_Code : 0
    }
    //매장조회 배열
    $scope.storelist={
      Admin_Code : 'onz',
      UserId : 'pikapika',
      Kind : 'ERPia_Meaip_Select_Place_CName',
      Mode : 'Select_Place'
    };

    //환경설정 구분 1(insert) 2(update)
    $rootScope.confinum = 1;

    //단가지정배열 1. 매입가 2. 도매가 3. 인터넷가 4. 소매가 5. 권장소비자가
    $scope.MeaipDn = [
      { num: 1, id: '매입가' },
      { num: 2, id: '도매가' },
      { num: 3, id: '인터넷가' },
      { num: 4, id: '소매가' },
      { num: 5, id: '권장소비자가' }
    ];

    //환경설정 조회
    $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.configlist}).
      success(function(data, status, headers, config) {
        $scope.configlists = data.list;

        for (var i = 0; i < $scope.configlists.length; i++) {
          if($scope.configlists[i].UserId == $rootScope.userId){

            //조회된 값이있으면 환경설정 구분 변경 
            $scope.confinum = 2;

            //환경설정된 값을 다른 페이지에서 쓸수 있도록 전역변수에 옮겨 저장            
            $scope.BasicConfiglist.basic_Ch_Code = $scope.configlists[i].basic_Ch_Code;
            $scope.BasicConfiglist.basic_Place_Code = $scope.configlists[i].basic_Place_Code;
            $scope.BasicConfiglist.basic_Dn_Meaip = $scope.configlists[i].basic_Dn_Meaip;

                //기본매장 디폴트
              $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.storelist}).
                success(function(data, status, headers, config) {

                  $scope.storelists = data.list;
                }).
                error(function(data, status, headers, config) {

                  var alertPopup = $ionicPopup.alert({

                          title: '기본매장디폴트에러',

                          template: 'Please check your credentials!'
                });
                });

            $scope.changolist.Sale_Place_Code = $scope.configlists[i].basic_Place_Code;
                //기본창고 디폴트
                $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.changolist}).
                  success(function(data, status, headers, config) {
                    $scope.changolists = data.list;
                  }).
                  error(function(data, status, headers, config) {

                    var alertPopup = $ionicPopup.alert({

                            title: '기본창고디폴트',

                            template: 'Please check your credentials!'
                  });
                  });

            break;
          } else {
                    
          };

        };

        if ($scope.confinum == 1) {
            //기본매장 디폴트
              $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.storelist}).
                success(function(data, status, headers, config) {

                  $scope.storelists = data.list;
                }).
                error(function(data, status, headers, config) {

                  var alertPopup = $ionicPopup.alert({

                          title: '기본매장2',

                          template: 'Please check your credentials!'
                });
                });

        };
      }).
      error(function(data, status, headers, config) {

        var alertPopup = $ionicPopup.alert({

                title: 'failed!',

                template: '다시시도해 주세요!!'
      });
      });

      $scope.ChangoConfig=function(){
        $scope.changolist.Sale_Place_Code = $scope.BasicConfiglist.basic_Place_Code;
                //기본창고 디폴트
                $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.changolist}).
                  success(function(data, status, headers, config) {
                    $scope.changolists = data.list;
                  }).
                  error(function(data, status, headers, config) {

                    var alertPopup = $ionicPopup.alert({

                            title: '기본창고 2',

                            template: 'Please check your credentials!'
                  });
                  });

       }
    $scope.confisavelist = {
      Admin_Code : 'onz',
      UserId : $scope.userId,
      Kind : 'ERPia_Meaip_Config',
      Mode : '',
      basic_Ch_Code : 0,
      basic_Place_Code : 0,
      basic_Dn_Meaip : 0
    };

    //환경변수 설정
    $scope.configFun=function(){
      if ($scope.confinum == 2) {
        $scope.confisavelist.Mode = 'update';
        $scope.confisavelist.basic_Ch_Code = $scope.BasicConfiglist.basic_Ch_Code;
        $scope.confisavelist.basic_Place_Code = $scope.BasicConfiglist.basic_Place_Code;
        $scope.confisavelist.basic_Dn_Meaip =  $scope.BasicConfiglist.basic_Dn_Meaip;

        $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.confisavelist}).
                  success(function(data, status, headers, config) {
                    $scope.changolists = data.list;
                    alert("저장되셨습니다.");
                    $ionicHistory.goBack();
                  }).
                  error(function(data, status, headers, config) {

                    var alertPopup = $ionicPopup.alert({

                            title: 'Error!',

                            template: '저장되지않았습니다. 다시시도해주세요!'
                  });
                  });

      }else{
        $scope.confisavelist.Mode = 'insert';
        $scope.confisavelist.basic_Ch_Code = $scope.BasicConfiglist.basic_Ch_Code;
        $scope.confisavelist.basic_Place_Code = $scope.BasicConfiglist.basic_Place_Code;
        $scope.confisavelist.basic_Dn_Meaip =  $scope.BasicConfiglist.basic_Dn_Meaip;

        $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.confisavelist}).
                  success(function(data, status, headers, config) {
                    $scope.changolists = data.list;
                    alert("저장되셨습니다.");
                    $ionicHistory.goBack();
                  }).
                  error(function(data, status, headers, config) {

                    var alertPopup = $ionicPopup.alert({

                            title: 'Error!',

                            template: '저장되지않았습니다. 다시시도해주세요!'
                  });
                  })
      };

    }

       //뒤로 제어
     $scope.configback=function(){
      $ionicPopup.show({
         title: '경고',
         subTitle: '',
         content: '작성중인 내용이 저장되지않았습니다.<br> 계속진행하시겠습니까?',
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

/* 매입조회컨트롤러 */
.controller('MaipSearchCtrl', function($scope, $stateParams,$ionicPopup,$http,$ionicModal, $ionicHistory,$location,$rootScope) {

$scope.httpUrl = '/app';
$scope.andUrl = 'http://erpia.net';

$scope.listSearch = ''; //상품명 검색
$scope.listindex = 5; //더보기 5개씩

 //환경설정 조회배열
    $scope.configlist={
      Admin_Code : 'onz',
      UserId : 'pikapika',
      Kind : 'ERPia_Meaip_Config',
      Mode : 'select'
    };
    //매장코드로 창고리스트조회 배열
    $scope.changolist={
      Admin_Code : 'onz',
      UserId : 'pikapika',
      Kind : 'ERPia_Meaip_Select_Place_CName',
      Mode : 'Select_CName',
      Sale_Place_Code : 0
    }

//환경설정 조회
    $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.configlist}).
      success(function(data, status, headers, config) {
        $scope.configlists = data.list;

        for (var i = 0; i < $scope.configlists.length; i++) {
          if($scope.configlists[i].UserId == $rootScope.userId){

            //환경설정된 값을 다른 페이지에서 쓸수 있도록 전역변수에 옮겨 저장            
            $scope.BasicConfiglist.basic_Ch_Code = $scope.configlists[i].basic_Ch_Code;
            $scope.BasicConfiglist.basic_Place_Code = $scope.configlists[i].basic_Place_Code;
            $scope.BasicConfiglist.basic_Dn_Meaip = $scope.configlists[i].basic_Dn_Meaip;

             $scope.changolist.Sale_Place_Code = $scope.configlists[i].basic_Place_Code;
                //기본창고 디폴트
                $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.changolist}).
                  success(function(data, status, headers, config) {
                    $scope.changolists = data.list;
                  }).
                  error(function(data, status, headers, config) {

                    var alertPopup = $ionicPopup.alert({

                            title: '환경설정 기본창고',

                            template: 'Please check your credentials!'
                  });
                  });
            break;
          } else {
                    
          };

        };

      }).
      error(function(data, status, headers, config) {

        /*var alertPopup = $ionicPopup.alert({

                title: 'failed!',

                template: '다시시도해11 주세요!!'
      });*/
      });


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
  $scope.customer = function(num) {
    $rootScope.cusSearchnum = num;
    $scope.modalcustomer.show();
  };
$scope.cus = {
  GerName : ''
};
 /* 거래처 검색 */
  $scope.cusSearch = function(){
    var ger = $scope.cus.GerName;
    $scope.customerSearchlists.GerName = escape(ger);
    $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.customerSearchlists}).
      success(function(data, status, headers, config) {

        $scope.cuslists = data.list;
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

    var nday = new Date();  //오늘 날짜  
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
      Kind : 'ERPia_Meaip_Select_Master',
      Mode : 'Select_Date',
      sDate : $scope.todate,
      eDate : $scope.todate
    };
    //금일 데이터 기본값으로 얻어오기
    $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.reqparams}).
      success(function(data, status, headers, config) {
        $scope.lists = data.list;
      }).
      error(function(data, status, headers, config) {

        var alertPopup = $ionicPopup.alert({

                title: '금일',

                template: 'Please check your credentials!'
      });
      });

$ionicModal.fromTemplateUrl('templates/datemodal.html', 
        function(modal) {
            $scope.datemodal = modal;
        },
        {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope, 
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
        }
    );
    $scope.opendateModal = function(num) {
      $scope.senum = num;
      $scope.datemodal.show();
    };
    $scope.closedateModal = function(modal) {
      if ($scope.senum == 1) {
        $scope.reqparams.sDate = modal;
      }else{
        $scope.reqparams.eDate = modal;
      };
      $scope.datemodal.hide();
    };

    $scope.searches=function(){

       // CORS 요청 데모
    $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.reqparams}).
      success(function(data, status, headers, config) {

        $scope.lists = data.list;
/*        $state.go('app.search');*/
      }).
      error(function(data, status, headers, config) {

        var alertPopup = $ionicPopup.alert({

                title: '날짜',

                template: 'Please check your credentials!'

      });
      });
    }

    $scope.searchestoday=function(){
      $scope.reqparams.sDate=$scope.dateMinus(0);
     $scope.reqparams.eDate=$scope.dateMinus(0);
       // CORS 요청 데모
    $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.reqparams}).
      success(function(data, status, headers, config) {

        $scope.lists = data.list;
/*        $state.go('app.search');*/
      }).
      error(function(data, status, headers, config) {

        var alertPopup = $ionicPopup.alert({

                title: '금일',

                template: 'Please check your credentials!'

      });
      });
    }

    $scope.searches7day=function(){
     $scope.reqparams.sDate=$scope.dateMinus(7);
     $scope.reqparams.eDate=$scope.dateMinus(0);
       // CORS 요청 데모
    $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.reqparams}).
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
    $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.reqparams}).
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
      //매출전표조회 배열
      $scope.meaipChitList={
        Admin_Code : 'onz',
        UserId : 'pikapika',
        Kind : 'ERPia_Meaip_Select_Detail',
        Mode : '',
        IL_No : ''
      };

      //매입전표조회 function
     $scope.meaipChitF=function(ilno){
      $scope.deleicon = true;
      $scope.meaipChitList.IL_No = ilno;
      $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.meaipChitList}).
        success(function(data, status, headers, config) {

        $rootScope.meaipchitlists = data.list;
        $rootScope.qtysum = 0;//총 수량
        $rootScope.pricesum = 0;//총 가격
        for (var i = 0; i < $rootScope.meaipchitlists.length; i++) {
          $rootScope.qtysum = parseInt($rootScope.qtysum) + parseInt($rootScope.meaipchitlists[i].G_Qty);
          $rootScope.gop = parseInt($rootScope.meaipchitlists[i].G_Qty)*parseInt($rootScope.meaipchitlists[i].G_Price);
          $rootScope.pricesum = parseInt($rootScope.pricesum) + parseInt($rootScope.gop);
      }
        location.href="#/app/meaipChit";
      }).
        error(function(data, status, headers, config) {

        var alertPopup = $ionicPopup.alert({

                title: '매입전표조회',

                template: 'Please check your credentials!'
      });
      });
     }
    }
    //매입삭제배열
    $scope.chitdeletelist={
        Admin_Code : 'onz',
        UserId : 'pikapika',
        Kind : 'ERPia_Meaip_Delete_Goods',
        Mode : 'Delete_Meaip',
        IL_No : ''
      };

    $scope.chitDeleteF=function(ilno){
      $scope.chitdeletelist.IL_No = ilno;

      $ionicPopup.show({
         title: '경고',
         subTitle: '',
         content: '매입전표를 삭제합니다.<br> 진행하시겠습니까?',
         buttons: [
           { text: 'No',
            onTap: function(e){
              
            }
           },
           {
             text: 'Yes',
             type: 'button-positive',
             onTap: function(e) {

                  $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.chitdeletelist}).
                      success(function(data, status, headers, config) {

                        $scope.chitdelists = data.list;
                        if ($scope.chitdelists[0].rslt == "Y") {
                          alert("매입전표가 삭제되었습니다.");
                          $ionicHistory.goBack();
                          /*$scope.lists.refreshItems();*/
                        }else{
                          alert("삭제되지못했습니다.다시시도해주세요.");
                        };
                /*        $state.go('app.search');*/
                      }).
                      error(function(data, status, headers, config) {

                        var alertPopup = $ionicPopup.alert({

                                title: 'failed!',

                                template: 'Please check your credentials!'

                      });
                      });
             }
           },
         ]
        })
     }

    /*매입 등록 기본사항-----------------------------*/
    $rootScope.maipbasiclist={
          maip_date : $scope.todate, //매입날짜
          divide : '', //
          Admin_Code : 'onz',
          Comp_no : '',
          subul_kind : 0, //수불구분
          ChangGo_Code : 0, //창고코드
          Mejang_Code : 0, //매장코드
          remk : ''
    };

    $rootScope.meaipKorea={
      G_Name : '',  //거래처 한글
      subulkorea : '',
      changoKorea : '',
      MejangKorea : ''
    };

    $scope.G_Name2='';

    //매장조회 배열
    $scope.storelist={
      Admin_Code : 'onz',
      UserId : 'pikapika',
      Kind : 'ERPia_Meaip_Select_Place_CName',
      Mode : 'Select_Place'
    };
    //매장코드로 창고리스트조회 배열
     $scope.changolist={
       Admin_Code : 'onz',
       UserId : 'pikapika',
       Kind : 'ERPia_Meaip_Select_Place_CName',
       Mode : 'Select_CName',
       Sale_Place_Code : 0
   }

    //기본매장 디폴트
    $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.storelist}).
      success(function(data, status, headers, config) {
        $scope.storelists = data.list;
        for (var i = 0; i < $scope.storelists.length; i++) {
          if ($scope.storelists[i].Sale_Place_Code == $scope.BasicConfiglist.basic_Place_Code) {
            $scope.maipbasiclist.Mejang_Code = $scope.storelists[i].Sale_Place_Code + ',' + $scope.storelists[i].Sale_Place_Name;
            $scope.changolist.Sale_Place_Code = $scope.storelists[i].Sale_Place_Code;
                    $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.changolist}).
                    success(function(data, status, headers, config) {

                      $scope.changolists = data.list;
                      for (var i = 0; i < $scope.changolists.length; i++) {
                        if ($scope.changolists[i].Code == $scope.BasicConfiglist.basic_Ch_Code) {
                          $scope.maipbasiclist.ChangGo_Code = $scope.changolists[i].Code + ',' + $scope.changolists[i].Name;
                        };
                      };
                    }).
                    error(function(data, status, headers, config) {

                      var alertPopup = $ionicPopup.alert({

                              title: '기본매장디폴트 매입',

                              template: 'Please check your credentials!'
                    });
                    });
                    break;
          };
        };
      }).
      error(function(data, status, headers, config) {

        var alertPopup = $ionicPopup.alert({

                title: 'Login failed!',

                template: 'Please check your credentials!'
      });
      });

//거래처창고 조회후 값저장
    $scope.customerFunc=function(gname,gcode){
      if ($scope.cusSearchnum == 1) {
        $scope.meaipchitlists[0].GerName=gname;
        $scope.maipbasiclist.Comp_no=gcode;
      }else{
        $scope.meaipKorea.G_Name=gname;
        $scope.maipbasiclist.Comp_no=gcode;
      };
      $scope.modalcustomer.hide();
    }
//수불구분
    $scope.kindF=function(kindcode){

      $scope.maipbasiclist.subul_kind = kindcode;
      if (kindcode == 122) {
        $scope.meaipKorea.subulkorea = "반품";
      }else{
        $scope.meaipKorea.subulkorea = "입고";
      };
    }

//창고매장조회
    $scope.Chango=function(){
      $scope.changolist.Sale_Place_Code = $scope.maipbasiclist.Mejang_Code;
      $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.changolist}).
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

     //매입전표 수정 Modal
    $ionicModal.fromTemplateUrl('templates/meaipChitUpdate.html', {
    scope: $scope
    }).then(function(modal) {
    $scope.mupdatemodal = modal;
    });

    // 수정창 닫기
    $scope.closemupdate = function() {
    $scope.mupdatemodal.hide();
    };

    // 수정창 보여주기
    $scope.chitUpdateF = function(Meaipinfo) {

    $scope.ge = Meaipinfo[0].GerName.split('(');

    if ($scope.ge.length == 3) {
      $scope.ge2 = $scope.ge[2].split(')');
      $scope.maipbasiclist.Comp_no = $scope.ge2[0];
    }else{
      $scope.ge2 = $scope.ge[1].split(')');
      $scope.maipbasiclist.Comp_no = $scope.ge2[0];
    };

    if (Meaipinfo[0].Subul_kind == '매입입고') {
      $scope.subul = 111;
    }else{
      $scope.subul = 122;
    };
    //매장코드값얻기
      $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.storelist}).
        success(function(data, status, headers, config) {

          $scope.storelists = data.list;
          for (var i = 0; i < $scope.storelists.length; i++) {
            if($scope.storelists[i].Sale_Place_Name == Meaipinfo[0].Sale_Place_Name){
                $scope.listpp.mejangcodenum = $scope.storelists[i].Sale_Place_Code;

                     $scope.changolist.Sale_Place_Code = $scope.listpp.mejangcodenum;
                      //기본창고 디폴트
                      $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.changolist}).
                        success(function(data, status, headers, config) {
                          $scope.changolists = data.list;
                          for (var i = 0; i < $scope.changolists.length; i++) {
                            if ($scope.changolists[i].Name == Meaipinfo[0].CName) {
                              $scope.listpp.changocodenum = $scope.changolists[i].Code;

                            };
                          }
                        }).
                        error(function(data, status, headers, config) {

                          var alertPopup = $ionicPopup.alert({

                                  title: '기본창고디폴트',

                                  template: 'Please check your credentials!'
                        });
                        });

                break;
            };


          };
        }).
        error(function(data, status, headers, config) {

          var alertPopup = $ionicPopup.alert({

                  title: '기본매장디폴트에러',

                  template: 'Please check your credentials!'
        });
      });

    $scope.mupdatemodal.show();
   
  };

  $scope.kindup=[
  {Subul_kindnum : 111, Subul_kind : '매입입고'},
  {Subul_kindnum : 122, Subul_kind : '매입반품'},
  ];

  /* 등록 배열 */
  $scope.meaipupdatetlists={
       Admin_Code : 'onz',
       UserId : 'pikapika',
       Kind : 'ERPia_Meaip_Update_Goods',
       Mode : 'Update_Meaip',
       RequestXml : '',
       Il_No : ''
   };
  $scope.ss=function(ss) {
    $scope.meaipm = '<root><MeaipM><Admin_Code>onz</Admin_Code><Meaip_Date>'+ss[0].Meaip_Date+'</Meaip_Date><GuMeaCom_Code>'+$scope.maipbasiclist.Comp_no+'</GuMeaCom_Code><Meaip_Amt>'+$scope.pricesum+'</Meaip_Amt><Sale_Place>'+$scope.listpp.mejangcodenum+'</Sale_Place><Remk><![CDATA['+$scope.meaipchitlists[0].Remk+']]></Remk></MeaipM><MeaipT>'
    $scope.meaipt = '';
    $scope.meaipend = '</MeaipT></root>';
    for (var i = 0; i < ss.length; i++) {
      var j = i+1; // seq
      if (ss[i].Subul_kind == '매입입고') {
        ss[i].Subul_kind = 111;
      }else if(ss[i].Subul_kind == '매입반폼'){
        ss[i].Subul_kind = 122;
      };
      $scope.meaipt = $scope.meaipt+'<item><seq>'+j+'</seq><ChangGo_Code>'+$scope.listpp.changocodenum+'</ChangGo_Code><subul_kind>'+ss[i].Subul_kind+'</subul_kind><G_Code>'+ss[i].G_Code+'</G_Code><G_name><![CDATA['+ss[i].G_Name+']]></G_name><G_stand><![CDATA['+ss[i].G_stand+']]></G_stand><G_Price>'+ss[i].G_Price+'</G_Price><G_Qty>'+ss[i].G_Qty+'</G_Qty><G_vat>'+1800+'</G_vat></item>';
    };
   /* $scope.meaipupdatetlists.RequestXml = $scope.meaipm+$scope.meaipt+$scope.meaipend;*/
    var updateXml = escape($scope.meaipm+$scope.meaipt+$scope.meaipend);
    $scope.meaipupdatetlists.Il_No = ss[0].iL_No;
    console.log($scope.meaipupdatetlists.RequestXml);

      $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp?Admin_Code=onz&User_id=pikapika&Kind=ERPia_Meaip_Update_Goods&Mode=Update_Meaip&RequestXml='+updateXml+'&Il_No='+$scope.meaipupdatetlists.Il_No).
        success(function(data, status, headers, config) {
          $ionicPopup.alert({

                  title: '수정',

                  template: '수정이 완료되었습니다.'
        });
        $scope.mupdatemodal.hide();
        }).
        error(function(data, status, headers, config) {

          var alertPopup = $ionicPopup.alert({

                  title: 'Error!',

                  template: '수정이완료되지않았습니다.<br>다시시도해주세요.!'
        });
        });
  }
  //매장&창고 코드
  $scope.listpp = {
    mejangcodenum : 0,
    changocodenum : 0
  };

     /* 해당 리스트항목 삭제 */
   $scope.goodsDe=function(index){

    if ($scope.meaipchitlists.length == 1) {
      $ionicPopup.show({
         title: '경고',
         subTitle: '',
         content: '매입전표가 완전삭제됩니다.<br> 진행하시겠습니까?',
         buttons: [
           { text: 'No',
            onTap: function(e){
              
            }
           },
           {
             text: 'Yes',
             type: 'button-positive',
             onTap: function(e) {

              $scope.chitdeletelist.IL_No = $scope.meaipchitlists[0].iL_No;
                  $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.chitdeletelist}).
                      success(function(data, status, headers, config) {

                        $scope.chitdelists = data.list;
                        if ($scope.chitdelists[0].rslt == "Y") {
                          alert("매입전표가 삭제되었습니다.");
                          $ionicHistory.goBack();
                        }else{
                          alert("삭제되지못했습니다.다시시도해주세요.");
                        };
                /*        $state.go('app.search');*/
                      }).
                      error(function(data, status, headers, config) {

                        var alertPopup = $ionicPopup.alert({

                                title: 'failed!',

                                template: 'Please check your credentials!'

                      });
                      });
              $scope.mupdatemodal.hide();
/*                  location.href="#/app/inbrowse";*/
             }
           },
         ]
        })

    }else{
      $scope.meaipchitlists.splice(index,1);
    };
   }

     $scope.listadd2=function(name,gdn,code,stand){
      $ionicPopup.show({
         title: '상품이 추가되셨습니다.',
         subTitle: '',
         content: name,
         buttons: [
           { text: '확인',
            onTap: function(e){
              
            }
           }
         ]
        })
     $scope.meaipchitlists.push({
         G_Name : name, //상품명
         G_Price : gdn, // 단가
         G_Qty : 1, // 수량
         G_Code : code, // 상품코드
         G_stand : stand, // 규격
         Meaip_Date : $scope.meaipchitlists[0].Meaip_Date,
         Subul_kind : $scope.meaipchitlists[0].Subul_kind,
         GerName : $scope.meaipchitlists[0].GerName,
         iL_No : $scope.meaipchitlists[0].iL_No,
         Remk : $scope.meaipchitlists[0].Remk
     });
     }


})


.controller('MaippartsCtrl', function($scope, $ionicModal, $timeout, $stateParams,$rootScope, $http, $cordovaBarcodeScanner, $ionicPopup) {
$scope.httpUrl = '/app';
$scope.andUrl = 'http://erpia.net';
//상품명 조회시
     $scope.GoodsNamelist={
       Admin_Code : 'onz',
       UserId : 'pikapika',
       Kind : 'ERPia_Meaip_Select_Goods',
       Mode : 'Select_GoodsName',
       GoodsName : ''
   };
   //상품코드 조회시
     $scope.goodscodelist={
       Admin_Code : 'onz',
       UserId : 'pikapika',
       Kind : 'ERPia_Meaip_Select_Goods',
       Mode : 'Select_G_Code',
       GoodsCode : ''
   };
   //자체코드 조회시
     $scope.G_OnCodelist={
       Admin_Code : 'onz',
       UserId : 'pikapika',
       Kind : 'ERPia_Meaip_Select_Goods',
       Mode : 'Select_G_OnCode',
       G_OnCode : ''
   };
    //공인바코드 조회시
     $scope.Barcodelist={
       Admin_Code : 'onz',
       UserId : 'pikapika',
       Kind : 'ERPia_Meaip_Select_Goods',
       Mode : 'Select_GI_Code',
       GI_Code : 0
   };

   $scope.modedivition = {
      mode : '',
      seaname : ''
    };

    $scope.scanBarcode = function(num) {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
           /* alert(imageData.text);*/
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
            $scope.Barcodelist.GI_Code = imageData.text;
        /* 공인 바코드 조회 */
        $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.Barcodelist}).
            success(function(data, status, headers, config) {
              $scope.Barlists = data.list;
              if ($scope.Barlists != null) {
                      //공인바코드 검색결과 팝업
                      $ionicPopup.show({
                           title: '등록하시겠습니까?',
                           subTitle: '',
                           content: '코드번호 : ' + $scope.Barlists[0].G_Code + '<br> 상품명 : ' + $scope.Barlists[0].G_Name,
                           buttons: [
                             { text: 'No',
                              onTap: function(e){
                              }},
                             {
                               text: 'Yes',
                               type: 'button-positive',
                               onTap: function(e) {
                                  if (num == 1) {
                                    $scope.listadd($scope.Barlists[0].G_Name,$scope.Barlists[0].G_Dn5);
                                  }else{
                                    $scope.listadd2($scope.Barlists[0].G_Name,$scope.Barlists[0].G_Dn5);
                                  };
                                    
                               }
                             },
                           ]
                          })
              }else {
                  /* 자체코드 바코드 조회 */
                  $scope.G_OnCodelist.G_OnCode = imageData.text;

                  $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.G_OnCodelist}).
                      success(function(data, status, headers, config) {
                        $scope.Barlists = data.list;
                        if ($scope.Barlists != null) {
                                //바코드 검색결과 팝업
                                $ionicPopup.show({
                                     title: '등록하시겠습니까?',
                                     subTitle: '',
                                     content: '코드번호 : ' + $scope.Barlists[0].G_OnCode + '<br> 상품명 : ' + $scope.Barlists[0].G_Name,
                                     buttons: [
                                       { text: 'No',
                                        onTap: function(e){
                                        }},
                                       {
                                         text: 'Yes',
                                         type: 'button-positive',
                                         onTap: function(e) {
                                              if (num == 1) {
                                                $scope.listadd($scope.Barlists[0].G_Name,$scope.Barlists[0].G_Dn5);
                                              }else{
                                                $scope.listadd2($scope.Barlists[0].G_Name,$scope.Barlists[0].G_Dn5);
                                              };
                                         }
                                       },
                                     ]
                                    })
                        }else {
                          /* 상품코드 바코드 조회 */
                            $scope.goodscodelist.GoodsCode = imageData.text;
                            $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.goodscodelist}).
                                success(function(data, status, headers, config) {
                                  $scope.Barlists = data.list;
                                  if ($scope.Barlists != null) {
                                      //바코드 검색결과 팝업
                                      $ionicPopup.show({
                                           title: '등록하시겠습니까?',
                                           subTitle: '',
                                           content: '코드번호 : ' + $scope.Barlists[0].G_Code + '<br> 상품명 : ' + $scope.Barlists[0].G_Name,
                                           buttons: [
                                             { text: 'No',
                                              onTap: function(e){
                                              }},
                                             {
                                               text: 'Yes',
                                               type: 'button-positive',
                                               onTap: function(e) {
                                                    if (num == 1) {
                                                      $scope.listadd($scope.Barlists[0].G_Name,$scope.Barlists[0].G_Dn5);
                                                    }else{
                                                      $scope.listadd2($scope.Barlists[0].G_Name,$scope.Barlists[0].G_Dn5);
                                                    };
                                               }
                                             },
                                           ]
                                          })
                              }else {

                                alert("해당 바코드와 일치하는 상품이 없습니다.");
                              };
                            }).
                            error(function(data, status, headers, config) {
                              var alertPopup = $ionicPopup.alert({
                                      title: 'Error',
                                      template: '값을 성공적으로 받아오지 못했습니다!'
                            });
                            });
                        };
                      }).
                      error(function(data, status, headers, config) {
                        var alertPopup = $ionicPopup.alert({
                                title: 'Error',
                                template: '값을 성공적으로 받아오지 못했습니다!'
                      });
                      });
              };
            }).
            error(function(data, status, headers, config) {
              var alertPopup = $ionicPopup.alert({
                      title: 'Error',
                      template: '값을 성공적으로 받아오지 못했습니다!'
            });
            });
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
 
    $scope.mm = {
      ser : ''
    };
    // 검색창 보여주기
    $scope.modesear = function(divimode,divinum) {
      $scope.modedivition.seaname='';
      $scope.goodslists='';
      if (divimode == "Select_GoodsName") {http://localhost:8100/ionic-lab
        $scope.checkval = "상품명조회";
        $scope.ex = $scope.mm.ser;
        $scope.exs = 1;
        if ($scope.ex.length > 0) {
            var exex = escape($scope.ex);
            $scope.GoodsNamelist.GoodsName = exex;
            $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.GoodsNamelist}).
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
    //수정과 등록 구분
    if (divinum == 1) {
      $scope.isVisible = true;   
      $scope.isVisible2 = false;   
    }else{
      $scope.isVisible = false;   
      $scope.isVisible2 = true;
    };

    $scope.modalmodesear.show();
   
  };


   //검색구분
    $scope.divisionSearch=function(){
      $scope.checkd = $scope.modedivition.mode;

      if ($scope.checkval == "상품명조회") {
        $scope.GoodsNamelist.GoodsName = escape($scope.modedivition.seaname);
        $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.GoodsNamelist}).
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
        $scope.goodscodelist.GoodsCode = $scope.modedivition.seaname;
        $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.goodscodelist}).
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
        $scope.G_OnCodelist.G_OnCode = $scope.modedivition.seaname;
        $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp',{params: $scope.G_OnCodelist}).
      success(function(data, status, headers, config) {

        $scope.goodslists = data.list;
        if ($scope.goodslists.length == 0) {
          alert("해당결과가 없습니다.");
        };
       
      }).
      error(function(data, status, headers, config) {

        var alertPopup = $ionicPopup.alert({

                title: '자체코드!',

                template: 'Please check your credentials!'
      });
      });

      };


    }
    /* 배열생성해서 ADD */
    $scope.addlists = [];

     $scope.listadd=function(name,gdn,code,stand){
     $scope.addlists.push({
         namegoods : name, //상품명
         gdngoods : gdn, // 단가
         numgoods : 1, // 수량
         codegoods : code, // 상품코드
         standgoods : stand // 규격
     });
      $scope.modalmodesear.hide();
     }

     /* 해당 리스트항목 삭제 */
     $scope.goodsDelete=function(index){
        $scope.addlists.splice(index,1);
     }

      //등록확인 Modal
    $ionicModal.fromTemplateUrl('templates/goodsinsertM.html', {
    scope: $scope
    }).then(function(modal) {
    $scope.modeInsert = modal;

    });

    // 등록 Modal Close
    $scope.closemodeInsert = function() {
    $scope.modeInsert.hide();
    };

    // 등록 Modal show
    $scope.goodsinsertF = function(addlistVal) {
      /* 한글이름과 코드 분리 */
      $scope.array = $scope.maipbasiclist.Mejang_Code + "," + $scope.maipbasiclist.ChangGo_Code;
      $scope.se = $scope.array.split(',');
      $scope.maipbasiclist.Mejang_Code = $scope.se[0];
      $scope.meaipKorea.MejangKorea = $scope.se[1];
      $scope.maipbasiclist.ChangGo_Code = $scope.se[2];
      $scope.meaipKorea.changoKorea = $scope.se[3];

      $scope.sumqty = 0;//총 수량
        $scope.pricesumGoods = 0;//총 가격
          for (var i = 0; i < $scope.addlists.length; i++) {
            $scope.sumqty = parseInt($scope.sumqty) + parseInt($scope.addlists[i].numgoods);
            $scope.gop = parseInt($scope.addlists[i].numgoods)*parseInt($scope.addlists[i].gdngoods);
            $scope.pricesumGoods= parseInt($scope.pricesumGoods) + parseInt($scope.gop);
          }


      $scope.maipbasiclist.ChangGo_Code
    $scope.modeInsert.show();
   
  };

  /* 등록 배열 */
  $scope.meaipinsertlists={
       Admin_Code : 'onz',
       UserId : 'pikapika',
       Kind : 'ERPia_Meaip_Insert_Goods',
       Mode : '',
       RequestXml : ''
   };

  /* 매입 등록! */
  $scope.insertGoodsF = function() {

    $scope.meaipm = '<root><MeaipM><Admin_Code>onz</Admin_Code><Meaip_Date>'+$scope.maipbasiclist.maip_date+'</Meaip_Date><GuMeaCom_Code>'+$scope.maipbasiclist.Comp_no+'</GuMeaCom_Code><Meaip_Amt>'+$scope.pricesumGoods+'</Meaip_Amt><Sale_Place>'+$scope.maipbasiclist.Mejang_Code+'</Sale_Place><Remk><![CDATA['+$scope.maipbasiclist.remk+']]></Remk></MeaipM><MeaipT>'
    $scope.meaipt = '';
    $scope.meaipend = '</MeaipT></root>';

    for (var i = 0; i < $scope.addlists.length; i++) {
      var j = i+1; // seq
      $scope.meaipt = $scope.meaipt+'<item><seq>'+j+'</seq><ChangGo_Code>'+$scope.maipbasiclist.ChangGo_Code+'</ChangGo_Code><subul_kind>'+$scope.maipbasiclist.subul_kind+'</subul_kind><G_Code>'+$scope.addlists[i].codegoods+'</G_Code><G_name><![CDATA['+$scope.addlists[i].namegoods+']]></G_name><G_stand><![CDATA['+$scope.addlists[i].standgoods+']]></G_stand><G_Price>'+$scope.addlists[i].gdngoods+'</G_Price><G_Qty>'+$scope.addlists[i].numgoods+'</G_Qty><G_vat>'+1800+'</G_vat></item>';
    };
    var test3 = escape($scope.meaipm+$scope.meaipt+$scope.meaipend);
     /*$scope.meaipinsertlists.RequestXml = test3;*/
    console.log($scope.meaipinsertlists.RequestXml);
      $http.get($scope.andUrl+'/include/ERPiaApi_TestProject.asp?Admin_Code=onz&User_id=pikapika&Kind=ERPia_Meaip_Insert_Goods&Mode=&RequestXml='+test3).
        success(function(data, status, headers, config) {
          $ionicPopup.alert({

                  title: '등록완료!',

                  template: '매입이 완료되었습니다.!'

        });
          $scope.modeInsert.hide();
        location.href="#/app/inbrowse";
        }).
        error(function(data, status, headers, config) {

          var alertPopup = $ionicPopup.alert({

                  title: '등록실패!',

                  template: '등록이 샐패되었습니다.'

        });
        });


  }



});