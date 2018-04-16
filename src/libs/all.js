'use strict';


angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ui.load',
    'ui.jq',
    'ui.validate',
    'oc.lazyLoad',
    'pascalprecht.translate',
    'toaster',
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.selection',
    'httpService'
]);

// config

var app =
  angular.module('app').config(
    ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
      function ($controllerProvider, $compileProvider, $filterProvider, $provide) {

        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
        app.value = $provide.value;
      }
    ]).config(['$translateProvider', function ($translateProvider) {
      $translateProvider.useStaticFilesLoader({
        prefix: 'l10n/',
        suffix: '.json'
      });
      $translateProvider.preferredLanguage('zh_cn');
      $translateProvider.useLocalStorage();
    }]);

// 翻译快捷方式
var T = {};
// 本地存储快捷方式
var S = {};
app.run(['$translate', '$localStorage',
        function ($translate, $localStorage) {
            // 定义翻译快捷方式
            T = function (key) {
                return $translate.instant(key);
            };

            S = $localStorage;
        }
    ]);
// lazyload config

angular.module('app')
  .constant('JQ_CONFIG', {
      filestyle:      ['vendor2/jquery/file/bootstrap-filestyle.min.js'],
      slider:         ['vendor2/jquery/slider/bootstrap-slider.js',
                          'vendor2/jquery/slider/slider.css'],
      wysiwyg:        ['vendor2/jquery/wysiwyg/bootstrap-wysiwyg.js',
                          'vendor2/jquery/wysiwyg/jquery.hotkeys.js'],
      chosen:         ['vendor2/jquery/chosen/chosen.jquery.min.js',
                          'vendor2/jquery/chosen/chosen.css'],
      TouchSpin:      ['vendor2/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                          'vendor2/jquery/spinner/jquery.bootstrap-touchspin.css'],
      }
  );
'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/app/home');
            
            $stateProvider
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: 'tpl/app.html'
                })
                .state('app.home', {
                    url: '/home',
                    templateUrl: 'tpl/home.html'
                })
                .state('app.buttons', {
                    url: '/buttons',
                    templateUrl: 'tpl/ui_buttons.html'
                })
                .state('app.bootstrap', {
                    url: '/bootstrap',
                    templateUrl: 'tpl/ui_bootstrap.html'
                })
                .state('app.icons', {
                    url: '/icons',
                    templateUrl: 'tpl/ui_icons.html'
                })
                .state('app.toaster', {
                    url: '/toaster',
                    templateUrl: 'tpl/ui_toaster.html'
                })
                .state('app.grid', {
                    url: '/grid',
                    templateUrl: 'tpl/bootstrap_grid.html'
                })
                .state('app.uigrid', {
                    url: '/uigrid',
                    templateUrl: 'tpl/ui_grid.html'
                })
                .state('app.pwd', {
                    url: '/pwd',
                    templateUrl: 'tpl/samples/edit_pwd.html'
                })
                .state('app.msg', {
                    url: '/msg',
                    templateUrl: 'tpl/ui_message.html'
                })
                .state('app.form', {
                    url: '/form',
                    templateUrl: 'tpl/samples/form.html'
                })
                .state('app.custom_form', {
                    url: '/customform',
                    templateUrl: 'tpl/samples/custom_form.html'
                })
            }
        ]
    );
'use strict';

/* Controllers */

angular.module('app')
  .controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window', 
    function(              $scope,   $translate,   $localStorage,   $window ) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');

      // config
      $scope.app = {
        settings: {
          themeID: 1,
          navbarHeaderColor: 'bg-black',
          navbarCollapseColor: 'head-lightblue',
          asideColor: 'aside-blue',
          headerFixed: true,
          asideFixed: true,
          asideFolded: false,
          asideDock: false,
          container: false
        }
      }

      // save settings to local storage
      // if ( angular.isDefined($localStorage.settings) ) {
      //   $scope.app.settings = $localStorage.settings;
      // } else {
      //   $localStorage.settings = $scope.app.settings;
      // }
      $scope.$watch('app.settings', function(){
        if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
          // aside dock and fixed must set the header fixed.
          $scope.app.settings.headerFixed = true;
        }
        // save to local storage
        $localStorage.settings = $scope.app.settings;
      }, true);

      function isSmartDevice( $window )
      {
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }

      $scope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){

      });
  }]);
'use strict';

/* Controllers */

  // bootstrap controller
  app.controller('AccordionDemoCtrl', ['$scope', function($scope) {
    $scope.oneAtATime = true;

    $scope.groups = [
      {
        title: 'Accordion group header - #1',
        content: 'Dynamic group body - #1'
      },
      {
        title: 'Accordion group header - #2',
        content: 'Dynamic group body - #2'
      }
    ];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function() {
      var newItemNo = $scope.items.length + 1;
      $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };
  }])
  ; 
  app.controller('AlertDemoCtrl', ['$scope', function($scope) {
    $scope.alerts = [
      { type: 'success', msg: 'Well done! You successfully read this important alert message.' },
      { type: 'info', msg: 'Heads up! This alert needs your attention, but it is not super important.' },
      { type: 'warning', msg: 'Warning! Best check yo self, you are not looking too good...' }
    ];

    $scope.addAlert = function() {
      $scope.alerts.push({type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.'});
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  }])
  ; 
  app.controller('ButtonsDemoCtrl', ['$scope', function($scope) {
    $scope.singleModel = 1;

    $scope.radioModel = 'Middle';

    $scope.checkModel = {
      left: false,
      middle: true,
      right: false
    };
  }])
  ; 
  app.controller('CarouselDemoCtrl', ['$scope', function($scope) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
      slides.push({
        image: 'img/c' + slides.length + '.jpg',
        text: ['Carousel text #0','Carousel text #1','Carousel text #2','Carousel text #3'][slides.length % 4]
      });
    };
    for (var i=0; i<4; i++) {
      $scope.addSlide();
    }
  }])
  ; 
  app.controller('DropdownDemoCtrl', ['$scope', function($scope) {
    $scope.items = [
      'The first choice!',
      'And another choice for you.',
      'but wait! A third!'
    ];

    $scope.status = {
      isopen: false
    };

    $scope.toggled = function(open) {
      //console.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
  }])
  ; 
  app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }])
  ; 
  app.controller('ModalDemoCtrl', ['$scope', '$modal', '$log', function($scope, $modal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.open = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }])
  ; 
  app.controller('PaginationDemoCtrl', ['$scope', '$log', function($scope, $log) {
    $scope.totalItems = 64;
    $scope.currentPage = 4;

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      $log.info('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
  }])
  ; 
  app.controller('PopoverDemoCtrl', ['$scope', function($scope) {
    $scope.dynamicPopover = 'Hello, World!';
    $scope.dynamicPopoverTitle = 'Title';
  }])
  ; 
  app.controller('ProgressDemoCtrl', ['$scope', function($scope) {
    $scope.max = 200;

    $scope.random = function() {
      var value = Math.floor((Math.random() * 100) + 1);
      var type;

      if (value < 25) {
        type = 'success';
      } else if (value < 50) {
        type = 'info';
      } else if (value < 75) {
        type = 'warning';
      } else {
        type = 'danger';
      }

      $scope.showWarning = (type === 'danger' || type === 'warning');

      $scope.dynamic = value;
      $scope.type = type;
    };
    $scope.random();

    $scope.randomStacked = function() {
      $scope.stacked = [];
      var types = ['success', 'info', 'warning', 'danger'];

      for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
          var index = Math.floor((Math.random() * 4));
          $scope.stacked.push({
            value: Math.floor((Math.random() * 30) + 1),
            type: types[index]
          });
      }
    };
    $scope.randomStacked();
  }])
  ; 
  app.controller('TabsDemoCtrl', ['$scope', function($scope) {
    $scope.tabs = [
      { title:'Dynamic Title 1', content:'Dynamic content 1' },
      { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
    ];
  }])
  ; 
  app.controller('RatingDemoCtrl', ['$scope', function($scope) {
    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };
  }])
  ; 
  app.controller('TooltipDemoCtrl', ['$scope', function($scope) {
    $scope.dynamicTooltip = 'Hello, World!';
    $scope.dynamicTooltipText = 'dynamic';
    $scope.htmlTooltip = 'I\'ve been made <b>bold</b>!';
  }])
  ; 
  app.controller('TypeaheadDemoCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.selected = undefined;
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    // Any function returning a promise object can be used to load values asynchronously
    $scope.getLocation = function(val) {
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false
        }
      }).then(function(res){
        var addresses = [];
        angular.forEach(res.data.results, function(item){
          addresses.push(item.formatted_address);
        });
        return addresses;
      });
    };
  }])
  ; 
  app.controller('DatepickerDemoCtrl', ['$scope', function($scope) {
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
  }])
  ; 
  app.controller('TimepickerDemoCtrl', ['$scope', function($scope) {
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
      var d = new Date();
      d.setHours( 14 );
      d.setMinutes( 0 );
      $scope.mytime = d;
    };

    $scope.changed = function () {
      //console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
      $scope.mytime = null;
    };
  }]);
'use strict';

/* Controllers */

  // Form controller
app.controller('FormDemoCtrl', ['$scope', function($scope) {
    $scope.notBlackListed = function(value) {
      var blacklist = ['bad@domain.com','verybad@domain.com'];
      return blacklist.indexOf(value) === -1;
    }

    $scope.val = 15;
    var updateModel = function(val){
      $scope.$apply(function(){
        $scope.val = val;
      });
    };
    angular.element("#slider").on('slideStop', function(data){
      updateModel(data.value);
    });

    $scope.select2Number = [
      {text:'First',  value:'One'},
      {text:'Second', value:'Two'},
      {text:'Third',  value:'Three'}
    ];

    $scope.list_of_string = ['tag1', 'tag2']
    $scope.select2Options = {
        'multiple': true,
        'simple_tags': true,
        'tags': ['tag1', 'tag2', 'tag3', 'tag4']  // Can be empty list.
    };

    angular.element("#LinkInput").bind('click', function (event) {
      event.stopPropagation();
    });

  }])
 ;
app.controller('GridCtrl', ['$scope', function ($scope) {
        $scope.gridOptions = {
            columnDefs: [
                {field: 'id', displayName: 'Id'},
                {field: 'name', displayName: 'Name'},
                {name: 'edit', displayName: 'Edit', cellTemplate: '<button id="editBtn" type="button" class="btn-small" ng-click="grid.appScope.edit(row.entity)" >Edit</button> '}
              ],
            data:[
                {
                    'id':1,
                    'name':'test001'
                },
                {
                    'id':2,
                    'name':'test002'
                },
                {
                    'id':3,
                    'name':'test003'
                },
                {
                    'id':4,
                    'name':'test004'
                }
            ]   
        };

    }]);
app.controller('MsgCtrl', ['$scope', function($scope) {
    $scope.alert=function(){
        view.alert(T("警告"));
    };
}]);
app.controller('ToasterDemoCtrl', ['$scope', 'toaster', function($scope, toaster) {
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };
    $scope.pop = function(){
        toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
    };
}]);
angular.module('app')
  .directive('setNgAnimate', ['$animate', function ($animate) {
    return {
        link: function ($scope, $element, $attrs) {
            $scope.$watch( function() {
                return $scope.$eval($attrs.setNgAnimate, $scope);
            }, function(valnew, valold){
                $animate.enabled(!!valnew, $element);
            });
        }
    };
  }]);
angular.module('app')
  .directive('uiButterbar', ['$rootScope', '$anchorScroll', function($rootScope, $anchorScroll) {
     return {
      restrict: 'AC',
      template:'<span class="bar"></span>',
      link: function(scope, el, attrs) {        
        el.addClass('butterbar hide');
        scope.$on('$stateChangeStart', function(event) {
          $anchorScroll();
          el.removeClass('hide').addClass('active');
        });
        scope.$on('$stateChangeSuccess', function( event, toState, toParams, fromState ) {
          event.targetScope.$watch('$viewContentLoaded', function(){
            el.addClass('hide').removeClass('active');
          })
        });
      }
     };
  }]);
angular.module('app')
  .directive('uiFocus', function($timeout, $parse) {
    return {
      link: function(scope, element, attr) {
        var model = $parse(attr.uiFocus);
        scope.$watch(model, function(value) {
          if(value === true) {
            $timeout(function() {
              element[0].focus();
            });
          }
        });
        element.bind('blur', function() {
           scope.$apply(model.assign(scope, false));
        });
      }
    };
  });
 angular.module('app')
  .directive('uiFullscreen', ['uiLoad', '$document', '$window', function(uiLoad, $document, $window) {
    return {
      restrict: 'AC',
      template:'<i class="fa fa-expand fa-fw text"></i><i class="fa fa-compress fa-fw text-active"></i>',
      link: function(scope, el, attr) {
        el.addClass('hide');
        uiLoad.load('vendor/libs/screenfull.min.js').then(function(){
          // disable on ie11
          if (screenfull.enabled && !navigator.userAgent.match(/Trident.*rv:11\./)) {
            el.removeClass('hide');
          }
          el.on('click', function(){
            var target;
            attr.target && ( target = $(attr.target)[0] );            
            screenfull.toggle(target);
          });
          $document.on(screenfull.raw.fullscreenchange, function () {
            if(screenfull.isFullscreen){
              el.addClass('active');
            }else{
              el.removeClass('active');
            }
          });
        });
      }
    };
  }]);
'use strict';

/**
 * 0.1.1
 * General-purpose jQuery wrapper. Simply pass the plugin name as the expression.
 *
 * It is possible to specify a default set of parameters for each jQuery plugin.
 * Under the jq key, namespace each plugin by that which will be passed to ui-jq.
 * Unfortunately, at this time you can only pre-define the first parameter.
 * @example { jq : { datepicker : { showOn:'click' } } }
 *
 * @param ui-jq {string} The $elm.[pluginName]() to call.
 * @param [ui-options] {mixed} Expression to be evaluated and passed as options to the function
 *     Multiple parameters can be separated by commas
 * @param [ui-refresh] {expression} Watch expression and refire plugin on changes
 *
 * @example <input ui-jq="datepicker" ui-options="{showOn:'click'},secondParameter,thirdParameter" ui-refresh="iChange">
 */
angular.module('ui.jq', ['ui.load']).
  value('uiJqConfig', {}).
  directive('uiJq', ['uiJqConfig', 'JQ_CONFIG', 'uiLoad', '$timeout', function uiJqInjectingFunction(uiJqConfig, JQ_CONFIG, uiLoad, $timeout) {

  return {
    restrict: 'A',
    compile: function uiJqCompilingFunction(tElm, tAttrs) {

      if (!angular.isFunction(tElm[tAttrs.uiJq]) && !JQ_CONFIG[tAttrs.uiJq]) {
        throw new Error('ui-jq: The "' + tAttrs.uiJq + '" function does not exist');
      }
      var options = uiJqConfig && uiJqConfig[tAttrs.uiJq];

      return function uiJqLinkingFunction(scope, elm, attrs) {

        function getOptions(){
          var linkOptions = [];

          // If ui-options are passed, merge (or override) them onto global defaults and pass to the jQuery method
          if (attrs.uiOptions) {
            linkOptions = scope.$eval('[' + attrs.uiOptions + ']');
            if (angular.isObject(options) && angular.isObject(linkOptions[0])) {
              linkOptions[0] = angular.extend({}, options, linkOptions[0]);
            }
          } else if (options) {
            linkOptions = [options];
          }
          return linkOptions;
        }

        // If change compatibility is enabled, the form input's "change" event will trigger an "input" event
        if (attrs.ngModel && elm.is('select,input,textarea')) {
          elm.bind('change', function() {
            elm.trigger('input');
          });
        }

        // Call jQuery method and pass relevant options
        function callPlugin() {
          $timeout(function() {
            elm[attrs.uiJq].apply(elm, getOptions());
          }, 0, false);
        }

        function refresh(){
          // If ui-refresh is used, re-fire the the method upon every change
          if (attrs.uiRefresh) {
            scope.$watch(attrs.uiRefresh, function() {
              callPlugin();
            });
          }
        }

        if ( JQ_CONFIG[attrs.uiJq] ) {
          uiLoad.load(JQ_CONFIG[attrs.uiJq]).then(function() {
            callPlugin();
            refresh();
          }).catch(function() {
            
          });
        } else {
          callPlugin();
          refresh();
        }
      };
    }
  };
}]);
angular.module('app')
  .directive('uiModule', ['MODULE_CONFIG','uiLoad', '$compile', function(MODULE_CONFIG, uiLoad, $compile) {
    return {
      restrict: 'A',
      compile: function (el, attrs) {
        var contents = el.contents().clone();
        return function(scope, el, attrs){
          el.contents().remove();
          uiLoad.load(MODULE_CONFIG[attrs.uiModule])
          .then(function(){
            $compile(contents)(scope, function(clonedElement, scope) {
              el.append(clonedElement);
            });
          });
        }
      }
    };
  }]);
angular.module('app')
  .directive('uiNav', ['$timeout', function($timeout) {
    return {
      restrict: 'AC',
      link: function(scope, el, attr) {
        var _window = $(window), 
        _mb = 768, 
        wrap = $('.app-aside'), 
        next, 
        backdrop = '.dropdown-backdrop';
        // unfolded
        el.on('click', 'a', function(e) {
          next && next.trigger('mouseleave.nav');
          var _this = $(this);
          _this.parent().siblings( ".active" ).toggleClass('active');
          _this.next().is('ul') &&  _this.parent().toggleClass('active') &&  e.preventDefault();
          // mobile
          _this.next().is('ul') || ( ( _window.width() < _mb ) && $('.app-aside').removeClass('show off-screen') );
        });

        // folded & fixed
        el.on('mouseenter', 'a', function(e){
          next && next.trigger('mouseleave.nav');
          $('> .nav', wrap).remove();
          if ( !$('.app-aside-fixed.app-aside-folded').length || ( _window.width() < _mb ) || $('.app-aside-dock').length) return;
          var _this = $(e.target)
          , top
          , w_h = $(window).height()
          , offset = 50
          , min = 150;

          !_this.is('a') && (_this = _this.closest('a'));
          if( _this.next().is('ul') ){
             next = _this.next();
          }else{
            return;
          }
         
          _this.parent().addClass('active');
          top = _this.parent().position().top + offset;
          next.css('top', top);
          if( top + next.height() > w_h ){
            next.css('bottom', 0);
          }
          if(top + min > w_h){
            next.css('bottom', w_h - top - offset).css('top', 'auto');
          }
          next.appendTo(wrap);

          next.on('mouseleave.nav', function(e){
            $(backdrop).remove();
            next.appendTo(_this.parent());
            next.off('mouseleave.nav').css('top', 'auto').css('bottom', 'auto');
            _this.parent().removeClass('active');
          });

          $('.smart').length && $('<div class="dropdown-backdrop"/>').insertAfter('.app-aside').on('click', function(next){
            next && next.trigger('mouseleave.nav');
          });

        });

        wrap.on('mouseleave', function(e){
          next && next.trigger('mouseleave.nav');
          $('> .nav', wrap).remove();
        });
      }
    };
  }]);
angular.module('app')
  .directive('uiScroll', ['$location', '$anchorScroll', function($location, $anchorScroll) {
    return {
      restrict: 'AC',
      link: function(scope, el, attr) {
        el.on('click', function(e) {
          $location.hash(attr.uiScroll);
          $anchorScroll();
        });
      }
    };
  }]);
angular.module('app')
  .directive('uiShift', ['$timeout', function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, el, attr) {
        // get the $prev or $parent of this el
        var _el = $(el),
            _window = $(window),
            prev = _el.prev(),
            parent,
            width = _window.width()
            ;

        !prev.length && (parent = _el.parent());
        
        function sm(){
          $timeout(function () {
            var method = attr.uiShift;
            var target = attr.target;
            _el.hasClass('in') || _el[method](target).addClass('in');
          });
        }
        
        function md(){
          parent && parent['prepend'](el);
          !parent && _el['insertAfter'](prev);
          _el.removeClass('in');
        }

        (width < 768 && sm()) || md();

        _window.resize(function() {
          if(width !== _window.width()){
            $timeout(function(){
              (_window.width() < 768 && sm()) || md();
              width = _window.width();
            });
          }
        });
      }
    };
  }]);
angular.module('app')
  .directive('uiToggleClass', ['$timeout', '$document', function($timeout, $document) {
    return {
      restrict: 'AC',
      link: function(scope, el, attr) {
        el.on('click', function(e) {
          e.preventDefault();
          var classes = attr.uiToggleClass.split(','),
              targets = (attr.target && attr.target.split(',')) || Array(el),
              key = 0;
          angular.forEach(classes, function( _class ) {
            var target = targets[(targets.length && key)];            
            ( _class.indexOf( '*' ) !== -1 ) && magic(_class, target);
            $( target ).toggleClass(_class);
            key ++;
          });
          $(el).toggleClass('active');

          function magic(_class, target){
            var patt = new RegExp( '\\s' + 
                _class.
                  replace( /\*/g, '[A-Za-z0-9-_]+' ).
                  split( ' ' ).
                  join( '\\s|\\s' ) + 
                '\\s', 'g' );
            var cn = ' ' + $(target)[0].className + ' ';
            while ( patt.test( cn ) ) {
              cn = cn.replace( patt, ' ' );
            }
            $(target)[0].className = $.trim( cn );
          }
        });
      }
    };
  }]);
'use strict';

/**
 * General-purpose validator for ngModel.
 * angular.js comes with several built-in validation mechanism for input fields (ngRequired, ngPattern etc.) but using
 * an arbitrary validation function requires creation of a custom formatters and / or parsers.
 * The ui-validate directive makes it easy to use any function(s) defined in scope as a validator function(s).
 * A validator function will trigger validation on both model and input changes.
 *
 * @example <input ui-validate=" 'myValidatorFunction($value)' ">
 * @example <input ui-validate="{ foo : '$value > anotherModel', bar : 'validateFoo($value)' }">
 * @example <input ui-validate="{ foo : '$value > anotherModel' }" ui-validate-watch=" 'anotherModel' ">
 * @example <input ui-validate="{ foo : '$value > anotherModel', bar : 'validateFoo($value)' }" ui-validate-watch=" { foo : 'anotherModel' } ">
 *
 * @param ui-validate {string|object literal} If strings is passed it should be a scope's function to be used as a validator.
 * If an object literal is passed a key denotes a validation error key while a value should be a validator function.
 * In both cases validator function should take a value to validate as its argument and should return true/false indicating a validation result.
 */
angular.module('ui.validate',[]).directive('uiValidate', function () {

  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
      var validateFn, validators = {},
          validateExpr = scope.$eval(attrs.uiValidate);

      if (!validateExpr){ return;}

      if (angular.isString(validateExpr)) {
        validateExpr = { validator: validateExpr };
      }

      angular.forEach(validateExpr, function (exprssn, key) {
        validateFn = function (valueToValidate) {
          var expression = scope.$eval(exprssn, { '$value' : valueToValidate });
          if (angular.isObject(expression) && angular.isFunction(expression.then)) {
            // expression is a promise
            expression.then(function(){
              ctrl.$setValidity(key, true);
            }, function(){
              ctrl.$setValidity(key, false);
            });
            return valueToValidate;
          } else if (expression) {
            // expression is true
            ctrl.$setValidity(key, true);
            return valueToValidate;
          } else {
            // expression is false
            ctrl.$setValidity(key, false);
            return valueToValidate;
          }
        };
        validators[key] = validateFn;
        ctrl.$formatters.push(validateFn);
        ctrl.$parsers.push(validateFn);
      });

      function apply_watch(watch)
      {
          //string - update all validators on expression change
          if (angular.isString(watch))
          {
              scope.$watch(watch, function(){
                  angular.forEach(validators, function(validatorFn){
                      validatorFn(ctrl.$modelValue);
                  });
              });
              return;
          }

          //array - update all validators on change of any expression
          if (angular.isArray(watch))
          {
              angular.forEach(watch, function(expression){
                  scope.$watch(expression, function()
                  {
                      angular.forEach(validators, function(validatorFn){
                          validatorFn(ctrl.$modelValue);
                      });
                  });
              });
              return;
          }

          //object - update appropriate validator
          if (angular.isObject(watch))
          {
              angular.forEach(watch, function(expression, validatorKey)
              {
                  //value is string - look after one expression
                  if (angular.isString(expression))
                  {
                      scope.$watch(expression, function(){
                          validators[validatorKey](ctrl.$modelValue);
                      });
                  }

                  //value is array - look after all expressions in array
                  if (angular.isArray(expression))
                  {
                      angular.forEach(expression, function(intExpression)
                      {
                          scope.$watch(intExpression, function(){
                              validators[validatorKey](ctrl.$modelValue);
                          });
                      });
                  }
              });
          }
      }
      // Support for ui-validate-watch
      if (attrs.uiValidateWatch){
          apply_watch( scope.$eval(attrs.uiValidateWatch) );
      }
    }
  };
});

// 翻译快捷方式
var T = {};
// 本地存储快捷方式
var S = {};
app.run(['$translate', '$localStorage',
        function ($translate, $localStorage) {
            // 定义翻译快捷方式
            T = function (key) {
                return $translate.instant(key);
            };

            S = $localStorage;
        }
    ]);


var view = {
    loading_dialog: null,
    loading_num: 0
};

// dialog
view.dialog = function (opt) {
    var title = opt.title || T("dialog.DIALOG"),
        content = opt.content || "",
        ok_btn = opt.ok_btn,
        cancel_btn = opt.cancel_btn,
        close_btn = opt.close_btn,
        ok_fn = opt.ok_fn || null,
        cancel_fn = opt.cancel_fn || null,
        pre_fn = opt.pre_fn || null,
        dialog = null,
        dialog_html = '<div class="modal fade">\
            <div class="modal-dialog">\
            <div class="modal-content">\
            <div class="modal-header">\
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
        <h4 class="modal-title">' + title + '</h4>\
            </div>\
            <div class="modal-body">' + content + '</div>\
            <div class="modal-footer">';

    if (cancel_btn) {
        dialog_html += '<button type="button" class="btn btn-default dialog_btn cancel">' + T("button.CANCEL") + '</button>';
    }

    if (ok_btn) {
        dialog_html += '<button type="button" class="btn btn-primary dialog_btn ok">' + T("button.OK") + '</button>';
    }

    if (close_btn) {
        dialog_html += '<button type="button" class="btn btn-primary dialog_btn ok">' + T("button.CLOSE") + '</button>';
    }

    dialog_html += '</div></div></div></div>';

    dialog = $(dialog_html);

    dialog
        .on('show.bs.modal', function (e) {
            if (opt.width) {
                var css = {
                    'width': opt.width + 'px'
                };
                $(this).children(".modal-dialog").css(css);
            }
            pre_fn && pre_fn($(this));
        })
        .on("shown.bs.modal", function (e) {
        })
        .on("hide.bs.modal", function (e) {
        })
        .on("hidden.bs.modal", function (e) {
            dialog.remove();
        })
        .on("click", ".dialog_btn", function () {
            if ($(this).hasClass("ok")) {
                ok_fn && ok_fn();
            }

            if ($(this).hasClass("cancel")) {
                cancel_fn && cancel_fn();
                dialog.modal("hide");
            }

            if (!opt.prevent_auto_hide || opt.prevent_auto_hide == false) {
                dialog.modal("hide");
            }
        })
        .on('shown', function () {
            pre_fn && pre_fn($(this));
        })
        .modal('show');

    dialog.close = function () {
        $(this).modal('hide');
    };

    return dialog;
};

// loading
view.loading = function () {
    if (view.loading_dialog == null) {
        var opt = {
            title: T("dialog.ALERT"),
            content: "<img src='img/loading.gif'/> <span style='font-size: 18px;'>" + T("dialog.LOADING") + "</span>",
            ok_btn: false,
            cancel_btn: false
        };

        view.loading_dialog = view.dialog(opt);
    }

    view.loading_num++;
};

// 关闭loading
view.close_loading = function () {
    view.loading_num--;

    if (view.loading_dialog != null && view.loading_num == 0) {
        view.loading_dialog.close();
        view.loading_dialog = null;
    }
};

// alert
view.alert = function (msg, ok) {
    var opt = {
        title: T("dialog.ALERT"),
        content: "" + msg + "",
        close_btn: true,
        ok_fn: ok
    };

    return view.dialog(opt);
};

// show
view.show = function (msg, title, width, ok, cancel) {
    var opt = {
        title: T("dialog.ALERT"),
        content: "<p style='word-wrap:break-word'>" + msg + "</p>",
        close_btn: true,
        ok_fn: ok,
        cancel_fn: cancel
    };

    if (title != undefined) {
        opt.title = title;
    }

    if (width != undefined) {
        opt.width = width;
    }

    return view.dialog(opt);
};

// confirm
view.confirm = function (content, ok, cancel) {

    var opt = {
        title: T("dialog.ALERT"),
        content: '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"> ' + content + '</span>',
        ok_btn: true,
        cancel_btn: true,
        ok_fn: ok,
        cancel_fn: cancel
    };

    return view.dialog(opt);
};

// prompt
view.prompt = function (title, default_val, ok, cancel) {
    var ok_fn = function () {
        var value = $("#prompt_input").val();
        ok(value);
    };

    var content = '<input type="text" class="form-control" id="prompt_input">';
    if (default_val != null && default_val != undefined) {
        content = '<input type="text" class="form-control" id="prompt_input" value="' + default_val + '">';
    }

    var opt = {
        title: title,
        content: content,
        ok_btn: true,
        cancel_btn: true,
        ok_fn: ok_fn,
        cancel_fn: cancel
    };

    return view.dialog(opt);
};

// prompt_time
view.prompt_time = function (title, ok, cancel) {
    var ok_fn = function () {
        var value = $("#prompt_input").val();
        ok(value);
    };

    var opt = {
        title: title,
        content: '<input type="text" class="form-control" data-date-format="yyyy-mm-dd hh:ii:ss" id="prompt_input">',
        ok_btn: true,
        cancel_btn: true,
        ok_fn: ok_fn,
        cancel_fn: cancel
    };

    return view.dialog(opt);
};

// prompt_textarea
view.prompt_textarea = function (title, ok, cancel, value) {
    value = value || "";

    var ok_fn = function () {
        var value = $("#prompt_input").val();
        ok(value);
    };

    var opt = {
        title: title,
        content: '<textarea class="form-control" id="prompt_input">' + value + '</textarea>',
        ok_btn: true,
        cancel_btn: true,
        ok_fn: ok_fn,
        cancel_fn: cancel
    };

    return view.dialog(opt);
};

var utils = {};

utils.exportExcel = function (params, url, method) {
    if (params) {
        // params 是 string 或者 array/object
        if (typeof params == 'string') {
            params = {};
        }
        params['export'] = 1;
        // 把参数组装成 form的  input
        var inputs = [];
        $.each(params, function (k, v) {
            if (v == undefined) {
                return;
            }
            inputs.push('<input type="hidden" name="' + k + '" value="' + v + '" />');
        });
        $(document).off('submit');
        $('<form id="download" action="' + (url || 'index.php') + '" method="' + (method || "post") + '" target="_blank">' + inputs.join('') + '</form>')
            .appendTo('body').submit().remove();
        $(document).on('submit', false);
    }
};

utils.base64ToBlob = function(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0 ; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
};


angular.module('httpService', []).
    service('mockService', ['$document', '$q', '$timeout', '$http', '$state', function ($document, $q, $timeout, $http, $state) {
        this.post = function (url, params, opt) {
            var deferred = $q.defer();

            url = "/angularAdmin/data" + url + ".json";

            console.log(url);

            opt = opt || {};

            var loading = opt['loading'] == undefined ? true : opt['loading'];
            if (loading == true) {
                view.loading();
            }

            var alertError = opt['alertError'] == undefined ? true : opt['alertError'];

            $http.post(url, params).then(function (res) {
                if (loading == true) {
                    view.close_loading();
                }

                var result = res.data;

                if (result.status == 0) {
                    deferred.resolve(result);
                } else {
                    switch (result.status) {
                        case 1:
                            // 普通错误
                            if (alertError == true) {
                                view.alert(result.msg);
                            }
                            deferred.reject(result);
                            break;
                        case 2:
                            // 未登录
                            if (alertError == true) {
                                view.alert(result.msg);
                            }
                            session.init();
                            $state.go("login");
                            break;
                        case 4:
                            // 权限不足
                            if (alertError == true) {
                                view.alert(result.msg);
                            }
                            deferred.reject(result);
                            break;
                        default:
                            // 其他错误
                            if (alertError == true) {
                                view.alert(result.msg);
                            }
                            deferred.reject(result);
                    }
                }

            }, function (x) {
                if (loading == true) {
                    view.close_loading();
                }

                if (alertError == true) {
                    view.alert(T("tips.SYSTEM_ERROR"));
                }

                deferred.reject(T("tips.SYSTEM_ERROR"));
            });

            return deferred.promise;
        };
    }]);
'use strict';

/**
 * 0.1.1
 * Deferred load js/css file, used for ui-jq.js and Lazy Loading.
 * 
 * @ flatfull.com All Rights Reserved.
 * Author url: #user/flatfull
 */

angular.module('ui.load', [])
	.service('uiLoad', ['$document', '$q', '$timeout', function ($document, $q, $timeout) {

		var loaded = [];
		var promise = false;
		var deferred = $q.defer();

		/**
		 * Chain loads the given sources
		 * @param srcs array, script or css
		 * @returns {*} Promise that will be resolved once the sources has been loaded.
		 */
		this.load = function (srcs) {
			srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
			var self = this;
			if(!promise){
				promise = deferred.promise;
			}
      angular.forEach(srcs, function(src) {
      	promise = promise.then( function(){
      		return src.indexOf('.css') >=0 ? self.loadCSS(src) : self.loadScript(src);
      	} );
      });
      deferred.resolve();
      return promise;
		}

		/**
		 * Dynamically loads the given script
		 * @param src The url of the script to load dynamically
		 * @returns {*} Promise that will be resolved once the script has been loaded.
		 */
		this.loadScript = function (src) {
			if(loaded[src]) return loaded[src].promise;

			var deferred = $q.defer();
			var script = $document[0].createElement('script');
			script.src = src;
			script.onload = function (e) {
				$timeout(function () {
					deferred.resolve(e);
				});
			};
			script.onerror = function (e) {
				$timeout(function () {
					deferred.reject(e);
				});
			};
			$document[0].body.appendChild(script);
			loaded[src] = deferred;

			return deferred.promise;
		};

		/**
		 * Dynamically loads the given CSS file
		 * @param href The url of the CSS to load dynamically
		 * @returns {*} Promise that will be resolved once the CSS file has been loaded.
		 */
		this.loadCSS = function (href) {
			if(loaded[href]) return loaded[href].promise;

			var deferred = $q.defer();
			var style = $document[0].createElement('link');
			style.rel = 'stylesheet';
			style.type = 'text/css';
			style.href = href;
			style.onload = function (e) {
				$timeout(function () {
					deferred.resolve(e);
				});
			};
			style.onerror = function (e) {
				$timeout(function () {
					deferred.reject(e);
				});
			};
			$document[0].head.appendChild(style);
			loaded[href] = deferred;

			return deferred.promise;
		};
}]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbmZpZy5qcyIsImNvbmZpZy5sYXp5bG9hZC5qcyIsImNvbmZpZy5yb3V0ZXIuanMiLCJtYWluLmpzIiwiY29udHJvbGxlcnMvYm9vdHN0cmFwLmpzIiwiY29udHJvbGxlcnMvZm9ybS5qcyIsImNvbnRyb2xsZXJzL2dyaWRDdHJsLmpzIiwiY29udHJvbGxlcnMvbXNnQ3RybC5qcyIsImNvbnRyb2xsZXJzL3RvYXN0ZXIuanMiLCJkaXJlY3RpdmVzL3NldG5nYW5pbWF0ZS5qcyIsImRpcmVjdGl2ZXMvdWktYnV0dGVyYmFyLmpzIiwiZGlyZWN0aXZlcy91aS1mb2N1cy5qcyIsImRpcmVjdGl2ZXMvdWktZnVsbHNjcmVlbi5qcyIsImRpcmVjdGl2ZXMvdWktanEuanMiLCJkaXJlY3RpdmVzL3VpLW1vZHVsZS5qcyIsImRpcmVjdGl2ZXMvdWktbmF2LmpzIiwiZGlyZWN0aXZlcy91aS1zY3JvbGwuanMiLCJkaXJlY3RpdmVzL3VpLXNoaWZ0LmpzIiwiZGlyZWN0aXZlcy91aS10b2dnbGVjbGFzcy5qcyIsImRpcmVjdGl2ZXMvdWktdmFsaWRhdGUuanMiLCJzZXJ2aWNlcy9nbG9iYWwuanMiLCJzZXJ2aWNlcy9odHRwU2VydmljZS5qcyIsInNlcnZpY2VzL3VpLWxvYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNVJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXHJcbiAgICAnbmdBbmltYXRlJyxcclxuICAgICduZ0Nvb2tpZXMnLFxyXG4gICAgJ25nUmVzb3VyY2UnLFxyXG4gICAgJ25nU2FuaXRpemUnLFxyXG4gICAgJ25nVG91Y2gnLFxyXG4gICAgJ25nU3RvcmFnZScsXHJcbiAgICAndWkucm91dGVyJyxcclxuICAgICd1aS5ib290c3RyYXAnLFxyXG4gICAgJ3VpLmxvYWQnLFxyXG4gICAgJ3VpLmpxJyxcclxuICAgICd1aS52YWxpZGF0ZScsXHJcbiAgICAnb2MubGF6eUxvYWQnLFxyXG4gICAgJ3Bhc2NhbHByZWNodC50cmFuc2xhdGUnLFxyXG4gICAgJ3RvYXN0ZXInLFxyXG4gICAgJ3VpLmdyaWQnLFxyXG4gICAgJ3VpLmdyaWQuZWRpdCcsXHJcbiAgICAndWkuZ3JpZC5zZWxlY3Rpb24nLFxyXG4gICAgJ2h0dHBTZXJ2aWNlJ1xyXG5dKTtcclxuIiwiLy8gY29uZmlnXG5cbnZhciBhcHAgPVxuICBhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29uZmlnKFxuICAgIFsnJGNvbnRyb2xsZXJQcm92aWRlcicsICckY29tcGlsZVByb3ZpZGVyJywgJyRmaWx0ZXJQcm92aWRlcicsICckcHJvdmlkZScsXG4gICAgICBmdW5jdGlvbiAoJGNvbnRyb2xsZXJQcm92aWRlciwgJGNvbXBpbGVQcm92aWRlciwgJGZpbHRlclByb3ZpZGVyLCAkcHJvdmlkZSkge1xuXG4gICAgICAgIC8vIGxhenkgY29udHJvbGxlciwgZGlyZWN0aXZlIGFuZCBzZXJ2aWNlXG4gICAgICAgIGFwcC5jb250cm9sbGVyID0gJGNvbnRyb2xsZXJQcm92aWRlci5yZWdpc3RlcjtcbiAgICAgICAgYXBwLmRpcmVjdGl2ZSA9ICRjb21waWxlUHJvdmlkZXIuZGlyZWN0aXZlO1xuICAgICAgICBhcHAuZmlsdGVyID0gJGZpbHRlclByb3ZpZGVyLnJlZ2lzdGVyO1xuICAgICAgICBhcHAuZmFjdG9yeSA9ICRwcm92aWRlLmZhY3Rvcnk7XG4gICAgICAgIGFwcC5zZXJ2aWNlID0gJHByb3ZpZGUuc2VydmljZTtcbiAgICAgICAgYXBwLmNvbnN0YW50ID0gJHByb3ZpZGUuY29uc3RhbnQ7XG4gICAgICAgIGFwcC52YWx1ZSA9ICRwcm92aWRlLnZhbHVlO1xuICAgICAgfVxuICAgIF0pLmNvbmZpZyhbJyR0cmFuc2xhdGVQcm92aWRlcicsIGZ1bmN0aW9uICgkdHJhbnNsYXRlUHJvdmlkZXIpIHtcbiAgICAgICR0cmFuc2xhdGVQcm92aWRlci51c2VTdGF0aWNGaWxlc0xvYWRlcih7XG4gICAgICAgIHByZWZpeDogJ2wxMG4vJyxcbiAgICAgICAgc3VmZml4OiAnLmpzb24nXG4gICAgICB9KTtcbiAgICAgICR0cmFuc2xhdGVQcm92aWRlci5wcmVmZXJyZWRMYW5ndWFnZSgnemhfY24nKTtcbiAgICAgICR0cmFuc2xhdGVQcm92aWRlci51c2VMb2NhbFN0b3JhZ2UoKTtcbiAgICB9XSk7XG5cbi8vIOe/u+ivkeW/q+aNt+aWueW8j1xudmFyIFQgPSB7fTtcbi8vIOacrOWcsOWtmOWCqOW/q+aNt+aWueW8j1xudmFyIFMgPSB7fTtcbmFwcC5ydW4oWyckdHJhbnNsYXRlJywgJyRsb2NhbFN0b3JhZ2UnLFxuICAgICAgICBmdW5jdGlvbiAoJHRyYW5zbGF0ZSwgJGxvY2FsU3RvcmFnZSkge1xuICAgICAgICAgICAgLy8g5a6a5LmJ57+76K+R5b+r5o235pa55byPXG4gICAgICAgICAgICBUID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkdHJhbnNsYXRlLmluc3RhbnQoa2V5KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIFMgPSAkbG9jYWxTdG9yYWdlO1xuICAgICAgICB9XG4gICAgXSk7IiwiLy8gbGF6eWxvYWQgY29uZmlnXG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAuY29uc3RhbnQoJ0pRX0NPTkZJRycsIHtcbiAgICAgIGZpbGVzdHlsZTogICAgICBbJ3ZlbmRvcjIvanF1ZXJ5L2ZpbGUvYm9vdHN0cmFwLWZpbGVzdHlsZS5taW4uanMnXSxcbiAgICAgIHNsaWRlcjogICAgICAgICBbJ3ZlbmRvcjIvanF1ZXJ5L3NsaWRlci9ib290c3RyYXAtc2xpZGVyLmpzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZlbmRvcjIvanF1ZXJ5L3NsaWRlci9zbGlkZXIuY3NzJ10sXG4gICAgICB3eXNpd3lnOiAgICAgICAgWyd2ZW5kb3IyL2pxdWVyeS93eXNpd3lnL2Jvb3RzdHJhcC13eXNpd3lnLmpzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZlbmRvcjIvanF1ZXJ5L3d5c2l3eWcvanF1ZXJ5LmhvdGtleXMuanMnXSxcbiAgICAgIGNob3NlbjogICAgICAgICBbJ3ZlbmRvcjIvanF1ZXJ5L2Nob3Nlbi9jaG9zZW4uanF1ZXJ5Lm1pbi5qcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICd2ZW5kb3IyL2pxdWVyeS9jaG9zZW4vY2hvc2VuLmNzcyddLFxuICAgICAgVG91Y2hTcGluOiAgICAgIFsndmVuZG9yMi9qcXVlcnkvc3Bpbm5lci9qcXVlcnkuYm9vdHN0cmFwLXRvdWNoc3Bpbi5taW4uanMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAndmVuZG9yMi9qcXVlcnkvc3Bpbm5lci9qcXVlcnkuYm9vdHN0cmFwLXRvdWNoc3Bpbi5jc3MnXSxcbiAgICAgIH1cbiAgKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogQ29uZmlnIGZvciB0aGUgcm91dGVyXHJcbiAqL1xyXG5hbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuICAgIC5ydW4oXHJcbiAgICAgICAgWyckcm9vdFNjb3BlJywgJyRzdGF0ZScsICckc3RhdGVQYXJhbXMnLFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJHN0YXRlID0gJHN0YXRlO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kc3RhdGVQYXJhbXMgPSAkc3RhdGVQYXJhbXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICApXHJcbiAgICAuY29uZmlnKFxyXG4gICAgICAgIFsnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJyxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcclxuXHJcbiAgICAgICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9hcHAvaG9tZScpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgICAgIC5zdGF0ZSgnYXBwJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9hcHAnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndHBsL2FwcC5odG1sJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmhvbWUnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2hvbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndHBsL2hvbWUuaHRtbCdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhdGUoJ2FwcC5idXR0b25zJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9idXR0b25zJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RwbC91aV9idXR0b25zLmh0bWwnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXRlKCdhcHAuYm9vdHN0cmFwJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9ib290c3RyYXAnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndHBsL3VpX2Jvb3RzdHJhcC5odG1sJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmljb25zJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9pY29ucycsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0cGwvdWlfaWNvbnMuaHRtbCdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhdGUoJ2FwcC50b2FzdGVyJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy90b2FzdGVyJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RwbC91aV90b2FzdGVyLmh0bWwnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXRlKCdhcHAuZ3JpZCcsIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvZ3JpZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0cGwvYm9vdHN0cmFwX2dyaWQuaHRtbCdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhdGUoJ2FwcC51aWdyaWQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3VpZ3JpZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0cGwvdWlfZ3JpZC5odG1sJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGF0ZSgnYXBwLnB3ZCcsIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcHdkJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RwbC9zYW1wbGVzL2VkaXRfcHdkLmh0bWwnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXRlKCdhcHAubXNnJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9tc2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndHBsL3VpX21lc3NhZ2UuaHRtbCdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhdGUoJ2FwcC5mb3JtJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9mb3JtJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RwbC9zYW1wbGVzL2Zvcm0uaHRtbCdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhdGUoJ2FwcC5jdXN0b21fZm9ybScsIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvY3VzdG9tZm9ybScsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0cGwvc2FtcGxlcy9jdXN0b21fZm9ybS5odG1sJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyogQ29udHJvbGxlcnMgKi9cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gIC5jb250cm9sbGVyKCdBcHBDdHJsJywgWyckc2NvcGUnLCAnJHRyYW5zbGF0ZScsICckbG9jYWxTdG9yYWdlJywgJyR3aW5kb3cnLCBcclxuICAgIGZ1bmN0aW9uKCAgICAgICAgICAgICAgJHNjb3BlLCAgICR0cmFuc2xhdGUsICAgJGxvY2FsU3RvcmFnZSwgICAkd2luZG93ICkge1xyXG4gICAgICAvLyBhZGQgJ2llJyBjbGFzc2VzIHRvIGh0bWxcclxuICAgICAgdmFyIGlzSUUgPSAhIW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL01TSUUvaSk7XHJcbiAgICAgIGlzSUUgJiYgYW5ndWxhci5lbGVtZW50KCR3aW5kb3cuZG9jdW1lbnQuYm9keSkuYWRkQ2xhc3MoJ2llJyk7XHJcbiAgICAgIGlzU21hcnREZXZpY2UoICR3aW5kb3cgKSAmJiBhbmd1bGFyLmVsZW1lbnQoJHdpbmRvdy5kb2N1bWVudC5ib2R5KS5hZGRDbGFzcygnc21hcnQnKTtcclxuXHJcbiAgICAgIC8vIGNvbmZpZ1xyXG4gICAgICAkc2NvcGUuYXBwID0ge1xyXG4gICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICB0aGVtZUlEOiAxLFxyXG4gICAgICAgICAgbmF2YmFySGVhZGVyQ29sb3I6ICdiZy1ibGFjaycsXHJcbiAgICAgICAgICBuYXZiYXJDb2xsYXBzZUNvbG9yOiAnaGVhZC1saWdodGJsdWUnLFxyXG4gICAgICAgICAgYXNpZGVDb2xvcjogJ2FzaWRlLWJsdWUnLFxyXG4gICAgICAgICAgaGVhZGVyRml4ZWQ6IHRydWUsXHJcbiAgICAgICAgICBhc2lkZUZpeGVkOiB0cnVlLFxyXG4gICAgICAgICAgYXNpZGVGb2xkZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgYXNpZGVEb2NrOiBmYWxzZSxcclxuICAgICAgICAgIGNvbnRhaW5lcjogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHNhdmUgc2V0dGluZ3MgdG8gbG9jYWwgc3RvcmFnZVxyXG4gICAgICAvLyBpZiAoIGFuZ3VsYXIuaXNEZWZpbmVkKCRsb2NhbFN0b3JhZ2Uuc2V0dGluZ3MpICkge1xyXG4gICAgICAvLyAgICRzY29wZS5hcHAuc2V0dGluZ3MgPSAkbG9jYWxTdG9yYWdlLnNldHRpbmdzO1xyXG4gICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAvLyAgICRsb2NhbFN0b3JhZ2Uuc2V0dGluZ3MgPSAkc2NvcGUuYXBwLnNldHRpbmdzO1xyXG4gICAgICAvLyB9XHJcbiAgICAgICRzY29wZS4kd2F0Y2goJ2FwcC5zZXR0aW5ncycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoICRzY29wZS5hcHAuc2V0dGluZ3MuYXNpZGVEb2NrICAmJiAgJHNjb3BlLmFwcC5zZXR0aW5ncy5hc2lkZUZpeGVkICl7XHJcbiAgICAgICAgICAvLyBhc2lkZSBkb2NrIGFuZCBmaXhlZCBtdXN0IHNldCB0aGUgaGVhZGVyIGZpeGVkLlxyXG4gICAgICAgICAgJHNjb3BlLmFwcC5zZXR0aW5ncy5oZWFkZXJGaXhlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNhdmUgdG8gbG9jYWwgc3RvcmFnZVxyXG4gICAgICAgICRsb2NhbFN0b3JhZ2Uuc2V0dGluZ3MgPSAkc2NvcGUuYXBwLnNldHRpbmdzO1xyXG4gICAgICB9LCB0cnVlKTtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIGlzU21hcnREZXZpY2UoICR3aW5kb3cgKVxyXG4gICAgICB7XHJcbiAgICAgICAgICAvLyBBZGFwdGVkIGZyb20gaHR0cDovL3d3dy5kZXRlY3Rtb2JpbGVicm93c2Vycy5jb21cclxuICAgICAgICAgIHZhciB1YSA9ICR3aW5kb3dbJ25hdmlnYXRvciddWyd1c2VyQWdlbnQnXSB8fCAkd2luZG93WyduYXZpZ2F0b3InXVsndmVuZG9yJ10gfHwgJHdpbmRvd1snb3BlcmEnXTtcclxuICAgICAgICAgIC8vIENoZWNrcyBmb3IgaU9zLCBBbmRyb2lkLCBCbGFja2JlcnJ5LCBPcGVyYSBNaW5pLCBhbmQgV2luZG93cyBtb2JpbGUgZGV2aWNlc1xyXG4gICAgICAgICAgcmV0dXJuICgvaVBob25lfGlQb2R8aVBhZHxTaWxrfEFuZHJvaWR8QmxhY2tCZXJyeXxPcGVyYSBNaW5pfElFTW9iaWxlLykudGVzdCh1YSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICRzY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN0YXJ0JyxmdW5jdGlvbihldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcyl7XHJcblxyXG4gICAgICB9KTtcclxuICB9XSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyogQ29udHJvbGxlcnMgKi9cclxuXHJcbiAgLy8gYm9vdHN0cmFwIGNvbnRyb2xsZXJcclxuICBhcHAuY29udHJvbGxlcignQWNjb3JkaW9uRGVtb0N0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG4gICAgJHNjb3BlLm9uZUF0QVRpbWUgPSB0cnVlO1xyXG5cclxuICAgICRzY29wZS5ncm91cHMgPSBbXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ0FjY29yZGlvbiBncm91cCBoZWFkZXIgLSAjMScsXHJcbiAgICAgICAgY29udGVudDogJ0R5bmFtaWMgZ3JvdXAgYm9keSAtICMxJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICdBY2NvcmRpb24gZ3JvdXAgaGVhZGVyIC0gIzInLFxyXG4gICAgICAgIGNvbnRlbnQ6ICdEeW5hbWljIGdyb3VwIGJvZHkgLSAjMidcclxuICAgICAgfVxyXG4gICAgXTtcclxuXHJcbiAgICAkc2NvcGUuaXRlbXMgPSBbJ0l0ZW0gMScsICdJdGVtIDInLCAnSXRlbSAzJ107XHJcblxyXG4gICAgJHNjb3BlLmFkZEl0ZW0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIG5ld0l0ZW1ObyA9ICRzY29wZS5pdGVtcy5sZW5ndGggKyAxO1xyXG4gICAgICAkc2NvcGUuaXRlbXMucHVzaCgnSXRlbSAnICsgbmV3SXRlbU5vKTtcclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLnN0YXR1cyA9IHtcclxuICAgICAgaXNGaXJzdE9wZW46IHRydWUsXHJcbiAgICAgIGlzRmlyc3REaXNhYmxlZDogZmFsc2VcclxuICAgIH07XHJcbiAgfV0pXHJcbiAgOyBcclxuICBhcHAuY29udHJvbGxlcignQWxlcnREZW1vQ3RybCcsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbiAgICAkc2NvcGUuYWxlcnRzID0gW1xyXG4gICAgICB7IHR5cGU6ICdzdWNjZXNzJywgbXNnOiAnV2VsbCBkb25lISBZb3Ugc3VjY2Vzc2Z1bGx5IHJlYWQgdGhpcyBpbXBvcnRhbnQgYWxlcnQgbWVzc2FnZS4nIH0sXHJcbiAgICAgIHsgdHlwZTogJ2luZm8nLCBtc2c6ICdIZWFkcyB1cCEgVGhpcyBhbGVydCBuZWVkcyB5b3VyIGF0dGVudGlvbiwgYnV0IGl0IGlzIG5vdCBzdXBlciBpbXBvcnRhbnQuJyB9LFxyXG4gICAgICB7IHR5cGU6ICd3YXJuaW5nJywgbXNnOiAnV2FybmluZyEgQmVzdCBjaGVjayB5byBzZWxmLCB5b3UgYXJlIG5vdCBsb29raW5nIHRvbyBnb29kLi4uJyB9XHJcbiAgICBdO1xyXG5cclxuICAgICRzY29wZS5hZGRBbGVydCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAkc2NvcGUuYWxlcnRzLnB1c2goe3R5cGU6ICdkYW5nZXInLCBtc2c6ICdPaCBzbmFwISBDaGFuZ2UgYSBmZXcgdGhpbmdzIHVwIGFuZCB0cnkgc3VibWl0dGluZyBhZ2Fpbi4nfSk7XHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS5jbG9zZUFsZXJ0ID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgJHNjb3BlLmFsZXJ0cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfTtcclxuICB9XSlcclxuICA7IFxyXG4gIGFwcC5jb250cm9sbGVyKCdCdXR0b25zRGVtb0N0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG4gICAgJHNjb3BlLnNpbmdsZU1vZGVsID0gMTtcclxuXHJcbiAgICAkc2NvcGUucmFkaW9Nb2RlbCA9ICdNaWRkbGUnO1xyXG5cclxuICAgICRzY29wZS5jaGVja01vZGVsID0ge1xyXG4gICAgICBsZWZ0OiBmYWxzZSxcclxuICAgICAgbWlkZGxlOiB0cnVlLFxyXG4gICAgICByaWdodDogZmFsc2VcclxuICAgIH07XHJcbiAgfV0pXHJcbiAgOyBcclxuICBhcHAuY29udHJvbGxlcignQ2Fyb3VzZWxEZW1vQ3RybCcsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbiAgICAkc2NvcGUubXlJbnRlcnZhbCA9IDUwMDA7XHJcbiAgICB2YXIgc2xpZGVzID0gJHNjb3BlLnNsaWRlcyA9IFtdO1xyXG4gICAgJHNjb3BlLmFkZFNsaWRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHNsaWRlcy5wdXNoKHtcclxuICAgICAgICBpbWFnZTogJ2ltZy9jJyArIHNsaWRlcy5sZW5ndGggKyAnLmpwZycsXHJcbiAgICAgICAgdGV4dDogWydDYXJvdXNlbCB0ZXh0ICMwJywnQ2Fyb3VzZWwgdGV4dCAjMScsJ0Nhcm91c2VsIHRleHQgIzInLCdDYXJvdXNlbCB0ZXh0ICMzJ11bc2xpZGVzLmxlbmd0aCAlIDRdXHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGZvciAodmFyIGk9MDsgaTw0OyBpKyspIHtcclxuICAgICAgJHNjb3BlLmFkZFNsaWRlKCk7XHJcbiAgICB9XHJcbiAgfV0pXHJcbiAgOyBcclxuICBhcHAuY29udHJvbGxlcignRHJvcGRvd25EZW1vQ3RybCcsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbiAgICAkc2NvcGUuaXRlbXMgPSBbXHJcbiAgICAgICdUaGUgZmlyc3QgY2hvaWNlIScsXHJcbiAgICAgICdBbmQgYW5vdGhlciBjaG9pY2UgZm9yIHlvdS4nLFxyXG4gICAgICAnYnV0IHdhaXQhIEEgdGhpcmQhJ1xyXG4gICAgXTtcclxuXHJcbiAgICAkc2NvcGUuc3RhdHVzID0ge1xyXG4gICAgICBpc29wZW46IGZhbHNlXHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS50b2dnbGVkID0gZnVuY3Rpb24ob3Blbikge1xyXG4gICAgICAvL2NvbnNvbGUubG9nKCdEcm9wZG93biBpcyBub3c6ICcsIG9wZW4pO1xyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUudG9nZ2xlRHJvcGRvd24gPSBmdW5jdGlvbigkZXZlbnQpIHtcclxuICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgJHNjb3BlLnN0YXR1cy5pc29wZW4gPSAhJHNjb3BlLnN0YXR1cy5pc29wZW47XHJcbiAgICB9O1xyXG4gIH1dKVxyXG4gIDsgXHJcbiAgYXBwLmNvbnRyb2xsZXIoJ01vZGFsSW5zdGFuY2VDdHJsJywgWyckc2NvcGUnLCAnJG1vZGFsSW5zdGFuY2UnLCAnaXRlbXMnLCBmdW5jdGlvbigkc2NvcGUsICRtb2RhbEluc3RhbmNlLCBpdGVtcykge1xyXG4gICAgJHNjb3BlLml0ZW1zID0gaXRlbXM7XHJcbiAgICAkc2NvcGUuc2VsZWN0ZWQgPSB7XHJcbiAgICAgIGl0ZW06ICRzY29wZS5pdGVtc1swXVxyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICRtb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5zZWxlY3RlZC5pdGVtKTtcclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgJG1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICB9O1xyXG4gIH1dKVxyXG4gIDsgXHJcbiAgYXBwLmNvbnRyb2xsZXIoJ01vZGFsRGVtb0N0cmwnLCBbJyRzY29wZScsICckbW9kYWwnLCAnJGxvZycsIGZ1bmN0aW9uKCRzY29wZSwgJG1vZGFsLCAkbG9nKSB7XHJcbiAgICAkc2NvcGUuaXRlbXMgPSBbJ2l0ZW0xJywgJ2l0ZW0yJywgJ2l0ZW0zJ107XHJcbiAgICAkc2NvcGUub3BlbiA9IGZ1bmN0aW9uIChzaXplKSB7XHJcbiAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJG1vZGFsLm9wZW4oe1xyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnbXlNb2RhbENvbnRlbnQuaHRtbCcsXHJcbiAgICAgICAgY29udHJvbGxlcjogJ01vZGFsSW5zdGFuY2VDdHJsJyxcclxuICAgICAgICBzaXplOiBzaXplLFxyXG4gICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgIGl0ZW1zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuaXRlbXM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHNlbGVjdGVkSXRlbSkge1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZCA9IHNlbGVjdGVkSXRlbTtcclxuICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICRsb2cuaW5mbygnTW9kYWwgZGlzbWlzc2VkIGF0OiAnICsgbmV3IERhdGUoKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICB9XSlcclxuICA7IFxyXG4gIGFwcC5jb250cm9sbGVyKCdQYWdpbmF0aW9uRGVtb0N0cmwnLCBbJyRzY29wZScsICckbG9nJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9nKSB7XHJcbiAgICAkc2NvcGUudG90YWxJdGVtcyA9IDY0O1xyXG4gICAgJHNjb3BlLmN1cnJlbnRQYWdlID0gNDtcclxuXHJcbiAgICAkc2NvcGUuc2V0UGFnZSA9IGZ1bmN0aW9uIChwYWdlTm8pIHtcclxuICAgICAgJHNjb3BlLmN1cnJlbnRQYWdlID0gcGFnZU5vO1xyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUucGFnZUNoYW5nZWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgJGxvZy5pbmZvKCdQYWdlIGNoYW5nZWQgdG86ICcgKyAkc2NvcGUuY3VycmVudFBhZ2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUubWF4U2l6ZSA9IDU7XHJcbiAgICAkc2NvcGUuYmlnVG90YWxJdGVtcyA9IDE3NTtcclxuICAgICRzY29wZS5iaWdDdXJyZW50UGFnZSA9IDE7XHJcbiAgfV0pXHJcbiAgOyBcclxuICBhcHAuY29udHJvbGxlcignUG9wb3ZlckRlbW9DdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxuICAgICRzY29wZS5keW5hbWljUG9wb3ZlciA9ICdIZWxsbywgV29ybGQhJztcclxuICAgICRzY29wZS5keW5hbWljUG9wb3ZlclRpdGxlID0gJ1RpdGxlJztcclxuICB9XSlcclxuICA7IFxyXG4gIGFwcC5jb250cm9sbGVyKCdQcm9ncmVzc0RlbW9DdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxuICAgICRzY29wZS5tYXggPSAyMDA7XHJcblxyXG4gICAgJHNjb3BlLnJhbmRvbSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgdmFsdWUgPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTAwKSArIDEpO1xyXG4gICAgICB2YXIgdHlwZTtcclxuXHJcbiAgICAgIGlmICh2YWx1ZSA8IDI1KSB7XHJcbiAgICAgICAgdHlwZSA9ICdzdWNjZXNzJztcclxuICAgICAgfSBlbHNlIGlmICh2YWx1ZSA8IDUwKSB7XHJcbiAgICAgICAgdHlwZSA9ICdpbmZvJztcclxuICAgICAgfSBlbHNlIGlmICh2YWx1ZSA8IDc1KSB7XHJcbiAgICAgICAgdHlwZSA9ICd3YXJuaW5nJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0eXBlID0gJ2Rhbmdlcic7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICRzY29wZS5zaG93V2FybmluZyA9ICh0eXBlID09PSAnZGFuZ2VyJyB8fCB0eXBlID09PSAnd2FybmluZycpO1xyXG5cclxuICAgICAgJHNjb3BlLmR5bmFtaWMgPSB2YWx1ZTtcclxuICAgICAgJHNjb3BlLnR5cGUgPSB0eXBlO1xyXG4gICAgfTtcclxuICAgICRzY29wZS5yYW5kb20oKTtcclxuXHJcbiAgICAkc2NvcGUucmFuZG9tU3RhY2tlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAkc2NvcGUuc3RhY2tlZCA9IFtdO1xyXG4gICAgICB2YXIgdHlwZXMgPSBbJ3N1Y2Nlc3MnLCAnaW5mbycsICd3YXJuaW5nJywgJ2RhbmdlciddO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogNCkgKyAxKTsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgdmFyIGluZGV4ID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDQpKTtcclxuICAgICAgICAgICRzY29wZS5zdGFja2VkLnB1c2goe1xyXG4gICAgICAgICAgICB2YWx1ZTogTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDMwKSArIDEpLFxyXG4gICAgICAgICAgICB0eXBlOiB0eXBlc1tpbmRleF1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLnJhbmRvbVN0YWNrZWQoKTtcclxuICB9XSlcclxuICA7IFxyXG4gIGFwcC5jb250cm9sbGVyKCdUYWJzRGVtb0N0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG4gICAgJHNjb3BlLnRhYnMgPSBbXHJcbiAgICAgIHsgdGl0bGU6J0R5bmFtaWMgVGl0bGUgMScsIGNvbnRlbnQ6J0R5bmFtaWMgY29udGVudCAxJyB9LFxyXG4gICAgICB7IHRpdGxlOidEeW5hbWljIFRpdGxlIDInLCBjb250ZW50OidEeW5hbWljIGNvbnRlbnQgMicsIGRpc2FibGVkOiB0cnVlIH1cclxuICAgIF07XHJcbiAgfV0pXHJcbiAgOyBcclxuICBhcHAuY29udHJvbGxlcignUmF0aW5nRGVtb0N0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG4gICAgJHNjb3BlLnJhdGUgPSA3O1xyXG4gICAgJHNjb3BlLm1heCA9IDEwO1xyXG4gICAgJHNjb3BlLmlzUmVhZG9ubHkgPSBmYWxzZTtcclxuXHJcbiAgICAkc2NvcGUuaG92ZXJpbmdPdmVyID0gZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgJHNjb3BlLm92ZXJTdGFyID0gdmFsdWU7XHJcbiAgICAgICRzY29wZS5wZXJjZW50ID0gMTAwICogKHZhbHVlIC8gJHNjb3BlLm1heCk7XHJcbiAgICB9O1xyXG4gIH1dKVxyXG4gIDsgXHJcbiAgYXBwLmNvbnRyb2xsZXIoJ1Rvb2x0aXBEZW1vQ3RybCcsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbiAgICAkc2NvcGUuZHluYW1pY1Rvb2x0aXAgPSAnSGVsbG8sIFdvcmxkISc7XHJcbiAgICAkc2NvcGUuZHluYW1pY1Rvb2x0aXBUZXh0ID0gJ2R5bmFtaWMnO1xyXG4gICAgJHNjb3BlLmh0bWxUb29sdGlwID0gJ0lcXCd2ZSBiZWVuIG1hZGUgPGI+Ym9sZDwvYj4hJztcclxuICB9XSlcclxuICA7IFxyXG4gIGFwcC5jb250cm9sbGVyKCdUeXBlYWhlYWREZW1vQ3RybCcsIFsnJHNjb3BlJywgJyRodHRwJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCkge1xyXG4gICAgJHNjb3BlLnNlbGVjdGVkID0gdW5kZWZpbmVkO1xyXG4gICAgJHNjb3BlLnN0YXRlcyA9IFsnQWxhYmFtYScsICdBbGFza2EnLCAnQXJpem9uYScsICdBcmthbnNhcycsICdDYWxpZm9ybmlhJywgJ0NvbG9yYWRvJywgJ0Nvbm5lY3RpY3V0JywgJ0RlbGF3YXJlJywgJ0Zsb3JpZGEnLCAnR2VvcmdpYScsICdIYXdhaWknLCAnSWRhaG8nLCAnSWxsaW5vaXMnLCAnSW5kaWFuYScsICdJb3dhJywgJ0thbnNhcycsICdLZW50dWNreScsICdMb3Vpc2lhbmEnLCAnTWFpbmUnLCAnTWFyeWxhbmQnLCAnTWFzc2FjaHVzZXR0cycsICdNaWNoaWdhbicsICdNaW5uZXNvdGEnLCAnTWlzc2lzc2lwcGknLCAnTWlzc291cmknLCAnTW9udGFuYScsICdOZWJyYXNrYScsICdOZXZhZGEnLCAnTmV3IEhhbXBzaGlyZScsICdOZXcgSmVyc2V5JywgJ05ldyBNZXhpY28nLCAnTmV3IFlvcmsnLCAnTm9ydGggRGFrb3RhJywgJ05vcnRoIENhcm9saW5hJywgJ09oaW8nLCAnT2tsYWhvbWEnLCAnT3JlZ29uJywgJ1Blbm5zeWx2YW5pYScsICdSaG9kZSBJc2xhbmQnLCAnU291dGggQ2Fyb2xpbmEnLCAnU291dGggRGFrb3RhJywgJ1Rlbm5lc3NlZScsICdUZXhhcycsICdVdGFoJywgJ1Zlcm1vbnQnLCAnVmlyZ2luaWEnLCAnV2FzaGluZ3RvbicsICdXZXN0IFZpcmdpbmlhJywgJ1dpc2NvbnNpbicsICdXeW9taW5nJ107XHJcbiAgICAvLyBBbnkgZnVuY3Rpb24gcmV0dXJuaW5nIGEgcHJvbWlzZSBvYmplY3QgY2FuIGJlIHVzZWQgdG8gbG9hZCB2YWx1ZXMgYXN5bmNocm9ub3VzbHlcclxuICAgICRzY29wZS5nZXRMb2NhdGlvbiA9IGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICByZXR1cm4gJGh0dHAuZ2V0KCdodHRwOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9nZW9jb2RlL2pzb24nLCB7XHJcbiAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICBhZGRyZXNzOiB2YWwsXHJcbiAgICAgICAgICBzZW5zb3I6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgdmFyIGFkZHJlc3NlcyA9IFtdO1xyXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChyZXMuZGF0YS5yZXN1bHRzLCBmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgIGFkZHJlc3Nlcy5wdXNoKGl0ZW0uZm9ybWF0dGVkX2FkZHJlc3MpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhZGRyZXNzZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICB9XSlcclxuICA7IFxyXG4gIGFwcC5jb250cm9sbGVyKCdEYXRlcGlja2VyRGVtb0N0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG4gICAgJHNjb3BlLnRvZGF5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICRzY29wZS5kdCA9IG5ldyBEYXRlKCk7XHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLnRvZGF5KCk7XHJcblxyXG4gICAgJHNjb3BlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAkc2NvcGUuZHQgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEaXNhYmxlIHdlZWtlbmQgc2VsZWN0aW9uXHJcbiAgICAkc2NvcGUuZGlzYWJsZWQgPSBmdW5jdGlvbihkYXRlLCBtb2RlKSB7XHJcbiAgICAgIHJldHVybiAoIG1vZGUgPT09ICdkYXknICYmICggZGF0ZS5nZXREYXkoKSA9PT0gMCB8fCBkYXRlLmdldERheSgpID09PSA2ICkgKTtcclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLnRvZ2dsZU1pbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAkc2NvcGUubWluRGF0ZSA9ICRzY29wZS5taW5EYXRlID8gbnVsbCA6IG5ldyBEYXRlKCk7XHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLnRvZ2dsZU1pbigpO1xyXG5cclxuICAgICRzY29wZS5vcGVuID0gZnVuY3Rpb24oJGV2ZW50KSB7XHJcbiAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAkc2NvcGUub3BlbmVkID0gdHJ1ZTtcclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLmRhdGVPcHRpb25zID0ge1xyXG4gICAgICBmb3JtYXRZZWFyOiAneXknLFxyXG4gICAgICBzdGFydGluZ0RheTogMSxcclxuICAgICAgY2xhc3M6ICdkYXRlcGlja2VyJ1xyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUuaW5pdERhdGUgPSBuZXcgRGF0ZSgnMjAxNi0xNS0yMCcpO1xyXG4gICAgJHNjb3BlLmZvcm1hdHMgPSBbJ2RkLU1NTU0teXl5eScsICd5eXl5L01NL2RkJywgJ2RkLk1NLnl5eXknLCAnc2hvcnREYXRlJ107XHJcbiAgICAkc2NvcGUuZm9ybWF0ID0gJHNjb3BlLmZvcm1hdHNbMF07XHJcbiAgfV0pXHJcbiAgOyBcclxuICBhcHAuY29udHJvbGxlcignVGltZXBpY2tlckRlbW9DdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxuICAgICRzY29wZS5teXRpbWUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICRzY29wZS5oc3RlcCA9IDE7XHJcbiAgICAkc2NvcGUubXN0ZXAgPSAxNTtcclxuXHJcbiAgICAkc2NvcGUub3B0aW9ucyA9IHtcclxuICAgICAgaHN0ZXA6IFsxLCAyLCAzXSxcclxuICAgICAgbXN0ZXA6IFsxLCA1LCAxMCwgMTUsIDI1LCAzMF1cclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLmlzbWVyaWRpYW4gPSB0cnVlO1xyXG4gICAgJHNjb3BlLnRvZ2dsZU1vZGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgJHNjb3BlLmlzbWVyaWRpYW4gPSAhICRzY29wZS5pc21lcmlkaWFuO1xyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBkID0gbmV3IERhdGUoKTtcclxuICAgICAgZC5zZXRIb3VycyggMTQgKTtcclxuICAgICAgZC5zZXRNaW51dGVzKCAwICk7XHJcbiAgICAgICRzY29wZS5teXRpbWUgPSBkO1xyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUuY2hhbmdlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgLy9jb25zb2xlLmxvZygnVGltZSBjaGFuZ2VkIHRvOiAnICsgJHNjb3BlLm15dGltZSk7XHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS5jbGVhciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAkc2NvcGUubXl0aW1lID0gbnVsbDtcclxuICAgIH07XHJcbiAgfV0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qIENvbnRyb2xsZXJzICovXHJcblxyXG4gIC8vIEZvcm0gY29udHJvbGxlclxyXG5hcHAuY29udHJvbGxlcignRm9ybURlbW9DdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxuICAgICRzY29wZS5ub3RCbGFja0xpc3RlZCA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgIHZhciBibGFja2xpc3QgPSBbJ2JhZEBkb21haW4uY29tJywndmVyeWJhZEBkb21haW4uY29tJ107XHJcbiAgICAgIHJldHVybiBibGFja2xpc3QuaW5kZXhPZih2YWx1ZSkgPT09IC0xO1xyXG4gICAgfVxyXG5cclxuICAgICRzY29wZS52YWwgPSAxNTtcclxuICAgIHZhciB1cGRhdGVNb2RlbCA9IGZ1bmN0aW9uKHZhbCl7XHJcbiAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKXtcclxuICAgICAgICAkc2NvcGUudmFsID0gdmFsO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcbiAgICBhbmd1bGFyLmVsZW1lbnQoXCIjc2xpZGVyXCIpLm9uKCdzbGlkZVN0b3AnLCBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgdXBkYXRlTW9kZWwoZGF0YS52YWx1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkc2NvcGUuc2VsZWN0Mk51bWJlciA9IFtcclxuICAgICAge3RleHQ6J0ZpcnN0JywgIHZhbHVlOidPbmUnfSxcclxuICAgICAge3RleHQ6J1NlY29uZCcsIHZhbHVlOidUd28nfSxcclxuICAgICAge3RleHQ6J1RoaXJkJywgIHZhbHVlOidUaHJlZSd9XHJcbiAgICBdO1xyXG5cclxuICAgICRzY29wZS5saXN0X29mX3N0cmluZyA9IFsndGFnMScsICd0YWcyJ11cclxuICAgICRzY29wZS5zZWxlY3QyT3B0aW9ucyA9IHtcclxuICAgICAgICAnbXVsdGlwbGUnOiB0cnVlLFxyXG4gICAgICAgICdzaW1wbGVfdGFncyc6IHRydWUsXHJcbiAgICAgICAgJ3RhZ3MnOiBbJ3RhZzEnLCAndGFnMicsICd0YWczJywgJ3RhZzQnXSAgLy8gQ2FuIGJlIGVtcHR5IGxpc3QuXHJcbiAgICB9O1xyXG5cclxuICAgIGFuZ3VsYXIuZWxlbWVudChcIiNMaW5rSW5wdXRcIikuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgfV0pXHJcbiA7IiwiYXBwLmNvbnRyb2xsZXIoJ0dyaWRDdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbiAoJHNjb3BlKSB7XHJcbiAgICAgICAgJHNjb3BlLmdyaWRPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBjb2x1bW5EZWZzOiBbXHJcbiAgICAgICAgICAgICAgICB7ZmllbGQ6ICdpZCcsIGRpc3BsYXlOYW1lOiAnSWQnfSxcclxuICAgICAgICAgICAgICAgIHtmaWVsZDogJ25hbWUnLCBkaXNwbGF5TmFtZTogJ05hbWUnfSxcclxuICAgICAgICAgICAgICAgIHtuYW1lOiAnZWRpdCcsIGRpc3BsYXlOYW1lOiAnRWRpdCcsIGNlbGxUZW1wbGF0ZTogJzxidXR0b24gaWQ9XCJlZGl0QnRuXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuLXNtYWxsXCIgbmctY2xpY2s9XCJncmlkLmFwcFNjb3BlLmVkaXQocm93LmVudGl0eSlcIiA+RWRpdDwvYnV0dG9uPiAnfVxyXG4gICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGRhdGE6W1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICdpZCc6MSxcclxuICAgICAgICAgICAgICAgICAgICAnbmFtZSc6J3Rlc3QwMDEnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICdpZCc6MixcclxuICAgICAgICAgICAgICAgICAgICAnbmFtZSc6J3Rlc3QwMDInXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICdpZCc6MyxcclxuICAgICAgICAgICAgICAgICAgICAnbmFtZSc6J3Rlc3QwMDMnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICdpZCc6NCxcclxuICAgICAgICAgICAgICAgICAgICAnbmFtZSc6J3Rlc3QwMDQnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0gICBcclxuICAgICAgICB9O1xyXG5cclxuICAgIH1dKTsiLCJhcHAuY29udHJvbGxlcignTXNnQ3RybCcsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbiAgICAkc2NvcGUuYWxlcnQ9ZnVuY3Rpb24oKXtcclxuICAgICAgICB2aWV3LmFsZXJ0KFQoXCLorablkYpcIikpO1xyXG4gICAgfTtcclxufV0pOyIsImFwcC5jb250cm9sbGVyKCdUb2FzdGVyRGVtb0N0cmwnLCBbJyRzY29wZScsICd0b2FzdGVyJywgZnVuY3Rpb24oJHNjb3BlLCB0b2FzdGVyKSB7XHJcbiAgICAkc2NvcGUudG9hc3RlciA9IHtcclxuICAgICAgICB0eXBlOiAnc3VjY2VzcycsXHJcbiAgICAgICAgdGl0bGU6ICdUaXRsZScsXHJcbiAgICAgICAgdGV4dDogJ01lc3NhZ2UnXHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLnBvcCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdG9hc3Rlci5wb3AoJHNjb3BlLnRvYXN0ZXIudHlwZSwgJHNjb3BlLnRvYXN0ZXIudGl0bGUsICRzY29wZS50b2FzdGVyLnRleHQpO1xyXG4gICAgfTtcclxufV0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gIC5kaXJlY3RpdmUoJ3NldE5nQW5pbWF0ZScsIFsnJGFuaW1hdGUnLCBmdW5jdGlvbiAoJGFuaW1hdGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbGluazogZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xyXG4gICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuJGV2YWwoJGF0dHJzLnNldE5nQW5pbWF0ZSwgJHNjb3BlKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24odmFsbmV3LCB2YWxvbGQpe1xyXG4gICAgICAgICAgICAgICAgJGFuaW1hdGUuZW5hYmxlZCghIXZhbG5ldywgJGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gIH1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuICAuZGlyZWN0aXZlKCd1aUJ1dHRlcmJhcicsIFsnJHJvb3RTY29wZScsICckYW5jaG9yU2Nyb2xsJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJGFuY2hvclNjcm9sbCkge1xyXG4gICAgIHJldHVybiB7XHJcbiAgICAgIHJlc3RyaWN0OiAnQUMnLFxyXG4gICAgICB0ZW1wbGF0ZTonPHNwYW4gY2xhc3M9XCJiYXJcIj48L3NwYW4+JyxcclxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsLCBhdHRycykgeyAgICAgICAgXHJcbiAgICAgICAgZWwuYWRkQ2xhc3MoJ2J1dHRlcmJhciBoaWRlJyk7XHJcbiAgICAgICAgc2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAkYW5jaG9yU2Nyb2xsKCk7XHJcbiAgICAgICAgICBlbC5yZW1vdmVDbGFzcygnaGlkZScpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbiggZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUgKSB7XHJcbiAgICAgICAgICBldmVudC50YXJnZXRTY29wZS4kd2F0Y2goJyR2aWV3Q29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGVsLmFkZENsYXNzKCdoaWRlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgIH07XHJcbiAgfV0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gIC5kaXJlY3RpdmUoJ3VpRm9jdXMnLCBmdW5jdGlvbigkdGltZW91dCwgJHBhcnNlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cikge1xyXG4gICAgICAgIHZhciBtb2RlbCA9ICRwYXJzZShhdHRyLnVpRm9jdXMpO1xyXG4gICAgICAgIHNjb3BlLiR3YXRjaChtb2RlbCwgZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgIGlmKHZhbHVlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIGVsZW1lbnRbMF0uZm9jdXMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZWxlbWVudC5iaW5kKCdibHVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgc2NvcGUuJGFwcGx5KG1vZGVsLmFzc2lnbihzY29wZSwgZmFsc2UpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9KTsiLCIgYW5ndWxhci5tb2R1bGUoJ2FwcCcpXHJcbiAgLmRpcmVjdGl2ZSgndWlGdWxsc2NyZWVuJywgWyd1aUxvYWQnLCAnJGRvY3VtZW50JywgJyR3aW5kb3cnLCBmdW5jdGlvbih1aUxvYWQsICRkb2N1bWVudCwgJHdpbmRvdykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcmVzdHJpY3Q6ICdBQycsXHJcbiAgICAgIHRlbXBsYXRlOic8aSBjbGFzcz1cImZhIGZhLWV4cGFuZCBmYS1mdyB0ZXh0XCI+PC9pPjxpIGNsYXNzPVwiZmEgZmEtY29tcHJlc3MgZmEtZncgdGV4dC1hY3RpdmVcIj48L2k+JyxcclxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsLCBhdHRyKSB7XHJcbiAgICAgICAgZWwuYWRkQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgICB1aUxvYWQubG9hZCgndmVuZG9yL2xpYnMvc2NyZWVuZnVsbC5taW4uanMnKS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAvLyBkaXNhYmxlIG9uIGllMTFcclxuICAgICAgICAgIGlmIChzY3JlZW5mdWxsLmVuYWJsZWQgJiYgIW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1RyaWRlbnQuKnJ2OjExXFwuLykpIHtcclxuICAgICAgICAgICAgZWwucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQ7XHJcbiAgICAgICAgICAgIGF0dHIudGFyZ2V0ICYmICggdGFyZ2V0ID0gJChhdHRyLnRhcmdldClbMF0gKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgc2NyZWVuZnVsbC50b2dnbGUodGFyZ2V0KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgJGRvY3VtZW50Lm9uKHNjcmVlbmZ1bGwucmF3LmZ1bGxzY3JlZW5jaGFuZ2UsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYoc2NyZWVuZnVsbC5pc0Z1bGxzY3JlZW4pe1xyXG4gICAgICAgICAgICAgIGVsLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgZWwucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIDAuMS4xXHJcbiAqIEdlbmVyYWwtcHVycG9zZSBqUXVlcnkgd3JhcHBlci4gU2ltcGx5IHBhc3MgdGhlIHBsdWdpbiBuYW1lIGFzIHRoZSBleHByZXNzaW9uLlxyXG4gKlxyXG4gKiBJdCBpcyBwb3NzaWJsZSB0byBzcGVjaWZ5IGEgZGVmYXVsdCBzZXQgb2YgcGFyYW1ldGVycyBmb3IgZWFjaCBqUXVlcnkgcGx1Z2luLlxyXG4gKiBVbmRlciB0aGUganEga2V5LCBuYW1lc3BhY2UgZWFjaCBwbHVnaW4gYnkgdGhhdCB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byB1aS1qcS5cclxuICogVW5mb3J0dW5hdGVseSwgYXQgdGhpcyB0aW1lIHlvdSBjYW4gb25seSBwcmUtZGVmaW5lIHRoZSBmaXJzdCBwYXJhbWV0ZXIuXHJcbiAqIEBleGFtcGxlIHsganEgOiB7IGRhdGVwaWNrZXIgOiB7IHNob3dPbjonY2xpY2snIH0gfSB9XHJcbiAqXHJcbiAqIEBwYXJhbSB1aS1qcSB7c3RyaW5nfSBUaGUgJGVsbS5bcGx1Z2luTmFtZV0oKSB0byBjYWxsLlxyXG4gKiBAcGFyYW0gW3VpLW9wdGlvbnNdIHttaXhlZH0gRXhwcmVzc2lvbiB0byBiZSBldmFsdWF0ZWQgYW5kIHBhc3NlZCBhcyBvcHRpb25zIHRvIHRoZSBmdW5jdGlvblxyXG4gKiAgICAgTXVsdGlwbGUgcGFyYW1ldGVycyBjYW4gYmUgc2VwYXJhdGVkIGJ5IGNvbW1hc1xyXG4gKiBAcGFyYW0gW3VpLXJlZnJlc2hdIHtleHByZXNzaW9ufSBXYXRjaCBleHByZXNzaW9uIGFuZCByZWZpcmUgcGx1Z2luIG9uIGNoYW5nZXNcclxuICpcclxuICogQGV4YW1wbGUgPGlucHV0IHVpLWpxPVwiZGF0ZXBpY2tlclwiIHVpLW9wdGlvbnM9XCJ7c2hvd09uOidjbGljayd9LHNlY29uZFBhcmFtZXRlcix0aGlyZFBhcmFtZXRlclwiIHVpLXJlZnJlc2g9XCJpQ2hhbmdlXCI+XHJcbiAqL1xyXG5hbmd1bGFyLm1vZHVsZSgndWkuanEnLCBbJ3VpLmxvYWQnXSkuXHJcbiAgdmFsdWUoJ3VpSnFDb25maWcnLCB7fSkuXHJcbiAgZGlyZWN0aXZlKCd1aUpxJywgWyd1aUpxQ29uZmlnJywgJ0pRX0NPTkZJRycsICd1aUxvYWQnLCAnJHRpbWVvdXQnLCBmdW5jdGlvbiB1aUpxSW5qZWN0aW5nRnVuY3Rpb24odWlKcUNvbmZpZywgSlFfQ09ORklHLCB1aUxvYWQsICR0aW1lb3V0KSB7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgY29tcGlsZTogZnVuY3Rpb24gdWlKcUNvbXBpbGluZ0Z1bmN0aW9uKHRFbG0sIHRBdHRycykge1xyXG5cclxuICAgICAgaWYgKCFhbmd1bGFyLmlzRnVuY3Rpb24odEVsbVt0QXR0cnMudWlKcV0pICYmICFKUV9DT05GSUdbdEF0dHJzLnVpSnFdKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1aS1qcTogVGhlIFwiJyArIHRBdHRycy51aUpxICsgJ1wiIGZ1bmN0aW9uIGRvZXMgbm90IGV4aXN0Jyk7XHJcbiAgICAgIH1cclxuICAgICAgdmFyIG9wdGlvbnMgPSB1aUpxQ29uZmlnICYmIHVpSnFDb25maWdbdEF0dHJzLnVpSnFdO1xyXG5cclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHVpSnFMaW5raW5nRnVuY3Rpb24oc2NvcGUsIGVsbSwgYXR0cnMpIHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0T3B0aW9ucygpe1xyXG4gICAgICAgICAgdmFyIGxpbmtPcHRpb25zID0gW107XHJcblxyXG4gICAgICAgICAgLy8gSWYgdWktb3B0aW9ucyBhcmUgcGFzc2VkLCBtZXJnZSAob3Igb3ZlcnJpZGUpIHRoZW0gb250byBnbG9iYWwgZGVmYXVsdHMgYW5kIHBhc3MgdG8gdGhlIGpRdWVyeSBtZXRob2RcclxuICAgICAgICAgIGlmIChhdHRycy51aU9wdGlvbnMpIHtcclxuICAgICAgICAgICAgbGlua09wdGlvbnMgPSBzY29wZS4kZXZhbCgnWycgKyBhdHRycy51aU9wdGlvbnMgKyAnXScpO1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc09iamVjdChvcHRpb25zKSAmJiBhbmd1bGFyLmlzT2JqZWN0KGxpbmtPcHRpb25zWzBdKSkge1xyXG4gICAgICAgICAgICAgIGxpbmtPcHRpb25zWzBdID0gYW5ndWxhci5leHRlbmQoe30sIG9wdGlvbnMsIGxpbmtPcHRpb25zWzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGxpbmtPcHRpb25zID0gW29wdGlvbnNdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGxpbmtPcHRpb25zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgY2hhbmdlIGNvbXBhdGliaWxpdHkgaXMgZW5hYmxlZCwgdGhlIGZvcm0gaW5wdXQncyBcImNoYW5nZVwiIGV2ZW50IHdpbGwgdHJpZ2dlciBhbiBcImlucHV0XCIgZXZlbnRcclxuICAgICAgICBpZiAoYXR0cnMubmdNb2RlbCAmJiBlbG0uaXMoJ3NlbGVjdCxpbnB1dCx0ZXh0YXJlYScpKSB7XHJcbiAgICAgICAgICBlbG0uYmluZCgnY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGVsbS50cmlnZ2VyKCdpbnB1dCcpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDYWxsIGpRdWVyeSBtZXRob2QgYW5kIHBhc3MgcmVsZXZhbnQgb3B0aW9uc1xyXG4gICAgICAgIGZ1bmN0aW9uIGNhbGxQbHVnaW4oKSB7XHJcbiAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZWxtW2F0dHJzLnVpSnFdLmFwcGx5KGVsbSwgZ2V0T3B0aW9ucygpKTtcclxuICAgICAgICAgIH0sIDAsIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlZnJlc2goKXtcclxuICAgICAgICAgIC8vIElmIHVpLXJlZnJlc2ggaXMgdXNlZCwgcmUtZmlyZSB0aGUgdGhlIG1ldGhvZCB1cG9uIGV2ZXJ5IGNoYW5nZVxyXG4gICAgICAgICAgaWYgKGF0dHJzLnVpUmVmcmVzaCkge1xyXG4gICAgICAgICAgICBzY29wZS4kd2F0Y2goYXR0cnMudWlSZWZyZXNoLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICBjYWxsUGx1Z2luKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCBKUV9DT05GSUdbYXR0cnMudWlKcV0gKSB7XHJcbiAgICAgICAgICB1aUxvYWQubG9hZChKUV9DT05GSUdbYXR0cnMudWlKcV0pLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNhbGxQbHVnaW4oKTtcclxuICAgICAgICAgICAgcmVmcmVzaCgpO1xyXG4gICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNhbGxQbHVnaW4oKTtcclxuICAgICAgICAgIHJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfTtcclxufV0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gIC5kaXJlY3RpdmUoJ3VpTW9kdWxlJywgWydNT0RVTEVfQ09ORklHJywndWlMb2FkJywgJyRjb21waWxlJywgZnVuY3Rpb24oTU9EVUxFX0NPTkZJRywgdWlMb2FkLCAkY29tcGlsZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgY29tcGlsZTogZnVuY3Rpb24gKGVsLCBhdHRycykge1xyXG4gICAgICAgIHZhciBjb250ZW50cyA9IGVsLmNvbnRlbnRzKCkuY2xvbmUoKTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsLCBhdHRycyl7XHJcbiAgICAgICAgICBlbC5jb250ZW50cygpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgdWlMb2FkLmxvYWQoTU9EVUxFX0NPTkZJR1thdHRycy51aU1vZHVsZV0pXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkY29tcGlsZShjb250ZW50cykoc2NvcGUsIGZ1bmN0aW9uKGNsb25lZEVsZW1lbnQsIHNjb3BlKSB7XHJcbiAgICAgICAgICAgICAgZWwuYXBwZW5kKGNsb25lZEVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXHJcbiAgLmRpcmVjdGl2ZSgndWlOYXYnLCBbJyR0aW1lb3V0JywgZnVuY3Rpb24oJHRpbWVvdXQpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHJlc3RyaWN0OiAnQUMnLFxyXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWwsIGF0dHIpIHtcclxuICAgICAgICB2YXIgX3dpbmRvdyA9ICQod2luZG93KSwgXHJcbiAgICAgICAgX21iID0gNzY4LCBcclxuICAgICAgICB3cmFwID0gJCgnLmFwcC1hc2lkZScpLCBcclxuICAgICAgICBuZXh0LCBcclxuICAgICAgICBiYWNrZHJvcCA9ICcuZHJvcGRvd24tYmFja2Ryb3AnO1xyXG4gICAgICAgIC8vIHVuZm9sZGVkXHJcbiAgICAgICAgZWwub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICBuZXh0ICYmIG5leHQudHJpZ2dlcignbW91c2VsZWF2ZS5uYXYnKTtcclxuICAgICAgICAgIHZhciBfdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICBfdGhpcy5wYXJlbnQoKS5zaWJsaW5ncyggXCIuYWN0aXZlXCIgKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICBfdGhpcy5uZXh0KCkuaXMoJ3VsJykgJiYgIF90aGlzLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKSAmJiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgLy8gbW9iaWxlXHJcbiAgICAgICAgICBfdGhpcy5uZXh0KCkuaXMoJ3VsJykgfHwgKCAoIF93aW5kb3cud2lkdGgoKSA8IF9tYiApICYmICQoJy5hcHAtYXNpZGUnKS5yZW1vdmVDbGFzcygnc2hvdyBvZmYtc2NyZWVuJykgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gZm9sZGVkICYgZml4ZWRcclxuICAgICAgICBlbC5vbignbW91c2VlbnRlcicsICdhJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICBuZXh0ICYmIG5leHQudHJpZ2dlcignbW91c2VsZWF2ZS5uYXYnKTtcclxuICAgICAgICAgICQoJz4gLm5hdicsIHdyYXApLnJlbW92ZSgpO1xyXG4gICAgICAgICAgaWYgKCAhJCgnLmFwcC1hc2lkZS1maXhlZC5hcHAtYXNpZGUtZm9sZGVkJykubGVuZ3RoIHx8ICggX3dpbmRvdy53aWR0aCgpIDwgX21iICkgfHwgJCgnLmFwcC1hc2lkZS1kb2NrJykubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgICB2YXIgX3RoaXMgPSAkKGUudGFyZ2V0KVxyXG4gICAgICAgICAgLCB0b3BcclxuICAgICAgICAgICwgd19oID0gJCh3aW5kb3cpLmhlaWdodCgpXHJcbiAgICAgICAgICAsIG9mZnNldCA9IDUwXHJcbiAgICAgICAgICAsIG1pbiA9IDE1MDtcclxuXHJcbiAgICAgICAgICAhX3RoaXMuaXMoJ2EnKSAmJiAoX3RoaXMgPSBfdGhpcy5jbG9zZXN0KCdhJykpO1xyXG4gICAgICAgICAgaWYoIF90aGlzLm5leHQoKS5pcygndWwnKSApe1xyXG4gICAgICAgICAgICAgbmV4dCA9IF90aGlzLm5leHQoKTtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgX3RoaXMucGFyZW50KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgdG9wID0gX3RoaXMucGFyZW50KCkucG9zaXRpb24oKS50b3AgKyBvZmZzZXQ7XHJcbiAgICAgICAgICBuZXh0LmNzcygndG9wJywgdG9wKTtcclxuICAgICAgICAgIGlmKCB0b3AgKyBuZXh0LmhlaWdodCgpID4gd19oICl7XHJcbiAgICAgICAgICAgIG5leHQuY3NzKCdib3R0b20nLCAwKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKHRvcCArIG1pbiA+IHdfaCl7XHJcbiAgICAgICAgICAgIG5leHQuY3NzKCdib3R0b20nLCB3X2ggLSB0b3AgLSBvZmZzZXQpLmNzcygndG9wJywgJ2F1dG8nKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIG5leHQuYXBwZW5kVG8od3JhcCk7XHJcblxyXG4gICAgICAgICAgbmV4dC5vbignbW91c2VsZWF2ZS5uYXYnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgJChiYWNrZHJvcCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIG5leHQuYXBwZW5kVG8oX3RoaXMucGFyZW50KCkpO1xyXG4gICAgICAgICAgICBuZXh0Lm9mZignbW91c2VsZWF2ZS5uYXYnKS5jc3MoJ3RvcCcsICdhdXRvJykuY3NzKCdib3R0b20nLCAnYXV0bycpO1xyXG4gICAgICAgICAgICBfdGhpcy5wYXJlbnQoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAkKCcuc21hcnQnKS5sZW5ndGggJiYgJCgnPGRpdiBjbGFzcz1cImRyb3Bkb3duLWJhY2tkcm9wXCIvPicpLmluc2VydEFmdGVyKCcuYXBwLWFzaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24obmV4dCl7XHJcbiAgICAgICAgICAgIG5leHQgJiYgbmV4dC50cmlnZ2VyKCdtb3VzZWxlYXZlLm5hdicpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB3cmFwLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICBuZXh0ICYmIG5leHQudHJpZ2dlcignbW91c2VsZWF2ZS5uYXYnKTtcclxuICAgICAgICAgICQoJz4gLm5hdicsIHdyYXApLnJlbW92ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuICAuZGlyZWN0aXZlKCd1aVNjcm9sbCcsIFsnJGxvY2F0aW9uJywgJyRhbmNob3JTY3JvbGwnLCBmdW5jdGlvbigkbG9jYXRpb24sICRhbmNob3JTY3JvbGwpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHJlc3RyaWN0OiAnQUMnLFxyXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWwsIGF0dHIpIHtcclxuICAgICAgICBlbC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAkbG9jYXRpb24uaGFzaChhdHRyLnVpU2Nyb2xsKTtcclxuICAgICAgICAgICRhbmNob3JTY3JvbGwoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXHJcbiAgLmRpcmVjdGl2ZSgndWlTaGlmdCcsIFsnJHRpbWVvdXQnLCBmdW5jdGlvbigkdGltZW91dCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsLCBhdHRyKSB7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSAkcHJldiBvciAkcGFyZW50IG9mIHRoaXMgZWxcclxuICAgICAgICB2YXIgX2VsID0gJChlbCksXHJcbiAgICAgICAgICAgIF93aW5kb3cgPSAkKHdpbmRvdyksXHJcbiAgICAgICAgICAgIHByZXYgPSBfZWwucHJldigpLFxyXG4gICAgICAgICAgICBwYXJlbnQsXHJcbiAgICAgICAgICAgIHdpZHRoID0gX3dpbmRvdy53aWR0aCgpXHJcbiAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgIXByZXYubGVuZ3RoICYmIChwYXJlbnQgPSBfZWwucGFyZW50KCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIHNtKCl7XHJcbiAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBtZXRob2QgPSBhdHRyLnVpU2hpZnQ7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBhdHRyLnRhcmdldDtcclxuICAgICAgICAgICAgX2VsLmhhc0NsYXNzKCdpbicpIHx8IF9lbFttZXRob2RdKHRhcmdldCkuYWRkQ2xhc3MoJ2luJyk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gbWQoKXtcclxuICAgICAgICAgIHBhcmVudCAmJiBwYXJlbnRbJ3ByZXBlbmQnXShlbCk7XHJcbiAgICAgICAgICAhcGFyZW50ICYmIF9lbFsnaW5zZXJ0QWZ0ZXInXShwcmV2KTtcclxuICAgICAgICAgIF9lbC5yZW1vdmVDbGFzcygnaW4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICh3aWR0aCA8IDc2OCAmJiBzbSgpKSB8fCBtZCgpO1xyXG5cclxuICAgICAgICBfd2luZG93LnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmKHdpZHRoICE9PSBfd2luZG93LndpZHRoKCkpe1xyXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgIChfd2luZG93LndpZHRoKCkgPCA3NjggJiYgc20oKSkgfHwgbWQoKTtcclxuICAgICAgICAgICAgICB3aWR0aCA9IF93aW5kb3cud2lkdGgoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfV0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gIC5kaXJlY3RpdmUoJ3VpVG9nZ2xlQ2xhc3MnLCBbJyR0aW1lb3V0JywgJyRkb2N1bWVudCcsIGZ1bmN0aW9uKCR0aW1lb3V0LCAkZG9jdW1lbnQpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHJlc3RyaWN0OiAnQUMnLFxyXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWwsIGF0dHIpIHtcclxuICAgICAgICBlbC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICB2YXIgY2xhc3NlcyA9IGF0dHIudWlUb2dnbGVDbGFzcy5zcGxpdCgnLCcpLFxyXG4gICAgICAgICAgICAgIHRhcmdldHMgPSAoYXR0ci50YXJnZXQgJiYgYXR0ci50YXJnZXQuc3BsaXQoJywnKSkgfHwgQXJyYXkoZWwpLFxyXG4gICAgICAgICAgICAgIGtleSA9IDA7XHJcbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2goY2xhc3NlcywgZnVuY3Rpb24oIF9jbGFzcyApIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHRhcmdldHNbKHRhcmdldHMubGVuZ3RoICYmIGtleSldOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAoIF9jbGFzcy5pbmRleE9mKCAnKicgKSAhPT0gLTEgKSAmJiBtYWdpYyhfY2xhc3MsIHRhcmdldCk7XHJcbiAgICAgICAgICAgICQoIHRhcmdldCApLnRvZ2dsZUNsYXNzKF9jbGFzcyk7XHJcbiAgICAgICAgICAgIGtleSArKztcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgJChlbCkudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgIGZ1bmN0aW9uIG1hZ2ljKF9jbGFzcywgdGFyZ2V0KXtcclxuICAgICAgICAgICAgdmFyIHBhdHQgPSBuZXcgUmVnRXhwKCAnXFxcXHMnICsgXHJcbiAgICAgICAgICAgICAgICBfY2xhc3MuXHJcbiAgICAgICAgICAgICAgICAgIHJlcGxhY2UoIC9cXCovZywgJ1tBLVphLXowLTktX10rJyApLlxyXG4gICAgICAgICAgICAgICAgICBzcGxpdCggJyAnICkuXHJcbiAgICAgICAgICAgICAgICAgIGpvaW4oICdcXFxcc3xcXFxccycgKSArIFxyXG4gICAgICAgICAgICAgICAgJ1xcXFxzJywgJ2cnICk7XHJcbiAgICAgICAgICAgIHZhciBjbiA9ICcgJyArICQodGFyZ2V0KVswXS5jbGFzc05hbWUgKyAnICc7XHJcbiAgICAgICAgICAgIHdoaWxlICggcGF0dC50ZXN0KCBjbiApICkge1xyXG4gICAgICAgICAgICAgIGNuID0gY24ucmVwbGFjZSggcGF0dCwgJyAnICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCh0YXJnZXQpWzBdLmNsYXNzTmFtZSA9ICQudHJpbSggY24gKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIEdlbmVyYWwtcHVycG9zZSB2YWxpZGF0b3IgZm9yIG5nTW9kZWwuXHJcbiAqIGFuZ3VsYXIuanMgY29tZXMgd2l0aCBzZXZlcmFsIGJ1aWx0LWluIHZhbGlkYXRpb24gbWVjaGFuaXNtIGZvciBpbnB1dCBmaWVsZHMgKG5nUmVxdWlyZWQsIG5nUGF0dGVybiBldGMuKSBidXQgdXNpbmdcclxuICogYW4gYXJiaXRyYXJ5IHZhbGlkYXRpb24gZnVuY3Rpb24gcmVxdWlyZXMgY3JlYXRpb24gb2YgYSBjdXN0b20gZm9ybWF0dGVycyBhbmQgLyBvciBwYXJzZXJzLlxyXG4gKiBUaGUgdWktdmFsaWRhdGUgZGlyZWN0aXZlIG1ha2VzIGl0IGVhc3kgdG8gdXNlIGFueSBmdW5jdGlvbihzKSBkZWZpbmVkIGluIHNjb3BlIGFzIGEgdmFsaWRhdG9yIGZ1bmN0aW9uKHMpLlxyXG4gKiBBIHZhbGlkYXRvciBmdW5jdGlvbiB3aWxsIHRyaWdnZXIgdmFsaWRhdGlvbiBvbiBib3RoIG1vZGVsIGFuZCBpbnB1dCBjaGFuZ2VzLlxyXG4gKlxyXG4gKiBAZXhhbXBsZSA8aW5wdXQgdWktdmFsaWRhdGU9XCIgJ215VmFsaWRhdG9yRnVuY3Rpb24oJHZhbHVlKScgXCI+XHJcbiAqIEBleGFtcGxlIDxpbnB1dCB1aS12YWxpZGF0ZT1cInsgZm9vIDogJyR2YWx1ZSA+IGFub3RoZXJNb2RlbCcsIGJhciA6ICd2YWxpZGF0ZUZvbygkdmFsdWUpJyB9XCI+XHJcbiAqIEBleGFtcGxlIDxpbnB1dCB1aS12YWxpZGF0ZT1cInsgZm9vIDogJyR2YWx1ZSA+IGFub3RoZXJNb2RlbCcgfVwiIHVpLXZhbGlkYXRlLXdhdGNoPVwiICdhbm90aGVyTW9kZWwnIFwiPlxyXG4gKiBAZXhhbXBsZSA8aW5wdXQgdWktdmFsaWRhdGU9XCJ7IGZvbyA6ICckdmFsdWUgPiBhbm90aGVyTW9kZWwnLCBiYXIgOiAndmFsaWRhdGVGb28oJHZhbHVlKScgfVwiIHVpLXZhbGlkYXRlLXdhdGNoPVwiIHsgZm9vIDogJ2Fub3RoZXJNb2RlbCcgfSBcIj5cclxuICpcclxuICogQHBhcmFtIHVpLXZhbGlkYXRlIHtzdHJpbmd8b2JqZWN0IGxpdGVyYWx9IElmIHN0cmluZ3MgaXMgcGFzc2VkIGl0IHNob3VsZCBiZSBhIHNjb3BlJ3MgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBhIHZhbGlkYXRvci5cclxuICogSWYgYW4gb2JqZWN0IGxpdGVyYWwgaXMgcGFzc2VkIGEga2V5IGRlbm90ZXMgYSB2YWxpZGF0aW9uIGVycm9yIGtleSB3aGlsZSBhIHZhbHVlIHNob3VsZCBiZSBhIHZhbGlkYXRvciBmdW5jdGlvbi5cclxuICogSW4gYm90aCBjYXNlcyB2YWxpZGF0b3IgZnVuY3Rpb24gc2hvdWxkIHRha2UgYSB2YWx1ZSB0byB2YWxpZGF0ZSBhcyBpdHMgYXJndW1lbnQgYW5kIHNob3VsZCByZXR1cm4gdHJ1ZS9mYWxzZSBpbmRpY2F0aW5nIGEgdmFsaWRhdGlvbiByZXN1bHQuXHJcbiAqL1xyXG5hbmd1bGFyLm1vZHVsZSgndWkudmFsaWRhdGUnLFtdKS5kaXJlY3RpdmUoJ3VpVmFsaWRhdGUnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgcmVxdWlyZTogJ25nTW9kZWwnLFxyXG4gICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbG0sIGF0dHJzLCBjdHJsKSB7XHJcbiAgICAgIHZhciB2YWxpZGF0ZUZuLCB2YWxpZGF0b3JzID0ge30sXHJcbiAgICAgICAgICB2YWxpZGF0ZUV4cHIgPSBzY29wZS4kZXZhbChhdHRycy51aVZhbGlkYXRlKTtcclxuXHJcbiAgICAgIGlmICghdmFsaWRhdGVFeHByKXsgcmV0dXJuO31cclxuXHJcbiAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHZhbGlkYXRlRXhwcikpIHtcclxuICAgICAgICB2YWxpZGF0ZUV4cHIgPSB7IHZhbGlkYXRvcjogdmFsaWRhdGVFeHByIH07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaCh2YWxpZGF0ZUV4cHIsIGZ1bmN0aW9uIChleHByc3NuLCBrZXkpIHtcclxuICAgICAgICB2YWxpZGF0ZUZuID0gZnVuY3Rpb24gKHZhbHVlVG9WYWxpZGF0ZSkge1xyXG4gICAgICAgICAgdmFyIGV4cHJlc3Npb24gPSBzY29wZS4kZXZhbChleHByc3NuLCB7ICckdmFsdWUnIDogdmFsdWVUb1ZhbGlkYXRlIH0pO1xyXG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNPYmplY3QoZXhwcmVzc2lvbikgJiYgYW5ndWxhci5pc0Z1bmN0aW9uKGV4cHJlc3Npb24udGhlbikpIHtcclxuICAgICAgICAgICAgLy8gZXhwcmVzc2lvbiBpcyBhIHByb21pc2VcclxuICAgICAgICAgICAgZXhwcmVzc2lvbi50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgY3RybC4kc2V0VmFsaWRpdHkoa2V5LCB0cnVlKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eShrZXksIGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVRvVmFsaWRhdGU7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGV4cHJlc3Npb24pIHtcclxuICAgICAgICAgICAgLy8gZXhwcmVzc2lvbiBpcyB0cnVlXHJcbiAgICAgICAgICAgIGN0cmwuJHNldFZhbGlkaXR5KGtleSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVRvVmFsaWRhdGU7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBleHByZXNzaW9uIGlzIGZhbHNlXHJcbiAgICAgICAgICAgIGN0cmwuJHNldFZhbGlkaXR5KGtleSwgZmFsc2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVUb1ZhbGlkYXRlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFsaWRhdG9yc1trZXldID0gdmFsaWRhdGVGbjtcclxuICAgICAgICBjdHJsLiRmb3JtYXR0ZXJzLnB1c2godmFsaWRhdGVGbik7XHJcbiAgICAgICAgY3RybC4kcGFyc2Vycy5wdXNoKHZhbGlkYXRlRm4pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIGFwcGx5X3dhdGNoKHdhdGNoKVxyXG4gICAgICB7XHJcbiAgICAgICAgICAvL3N0cmluZyAtIHVwZGF0ZSBhbGwgdmFsaWRhdG9ycyBvbiBleHByZXNzaW9uIGNoYW5nZVxyXG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcod2F0Y2gpKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHNjb3BlLiR3YXRjaCh3YXRjaCwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHZhbGlkYXRvcnMsIGZ1bmN0aW9uKHZhbGlkYXRvckZuKXtcclxuICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvckZuKGN0cmwuJG1vZGVsVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy9hcnJheSAtIHVwZGF0ZSBhbGwgdmFsaWRhdG9ycyBvbiBjaGFuZ2Ugb2YgYW55IGV4cHJlc3Npb25cclxuICAgICAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkod2F0Y2gpKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh3YXRjaCwgZnVuY3Rpb24oZXhwcmVzc2lvbil7XHJcbiAgICAgICAgICAgICAgICAgIHNjb3BlLiR3YXRjaChleHByZXNzaW9uLCBmdW5jdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh2YWxpZGF0b3JzLCBmdW5jdGlvbih2YWxpZGF0b3JGbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yRm4oY3RybC4kbW9kZWxWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vb2JqZWN0IC0gdXBkYXRlIGFwcHJvcHJpYXRlIHZhbGlkYXRvclxyXG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNPYmplY3Qod2F0Y2gpKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh3YXRjaCwgZnVuY3Rpb24oZXhwcmVzc2lvbiwgdmFsaWRhdG9yS2V5KVxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgLy92YWx1ZSBpcyBzdHJpbmcgLSBsb29rIGFmdGVyIG9uZSBleHByZXNzaW9uXHJcbiAgICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKGV4cHJlc3Npb24pKVxyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBzY29wZS4kd2F0Y2goZXhwcmVzc2lvbiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzW3ZhbGlkYXRvcktleV0oY3RybC4kbW9kZWxWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgLy92YWx1ZSBpcyBhcnJheSAtIGxvb2sgYWZ0ZXIgYWxsIGV4cHJlc3Npb25zIGluIGFycmF5XHJcbiAgICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkoZXhwcmVzc2lvbikpXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChleHByZXNzaW9uLCBmdW5jdGlvbihpbnRFeHByZXNzaW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLiR3YXRjaChpbnRFeHByZXNzaW9uLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzW3ZhbGlkYXRvcktleV0oY3RybC4kbW9kZWxWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFN1cHBvcnQgZm9yIHVpLXZhbGlkYXRlLXdhdGNoXHJcbiAgICAgIGlmIChhdHRycy51aVZhbGlkYXRlV2F0Y2gpe1xyXG4gICAgICAgICAgYXBwbHlfd2F0Y2goIHNjb3BlLiRldmFsKGF0dHJzLnVpVmFsaWRhdGVXYXRjaCkgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbn0pO1xyXG4iLCIvLyDnv7vor5Hlv6vmjbfmlrnlvI9cclxudmFyIFQgPSB7fTtcclxuLy8g5pys5Zyw5a2Y5YKo5b+r5o235pa55byPXHJcbnZhciBTID0ge307XHJcbmFwcC5ydW4oWyckdHJhbnNsYXRlJywgJyRsb2NhbFN0b3JhZ2UnLFxyXG4gICAgICAgIGZ1bmN0aW9uICgkdHJhbnNsYXRlLCAkbG9jYWxTdG9yYWdlKSB7XHJcbiAgICAgICAgICAgIC8vIOWumuS5iee/u+ivkeW/q+aNt+aWueW8j1xyXG4gICAgICAgICAgICBUID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICR0cmFuc2xhdGUuaW5zdGFudChrZXkpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgUyA9ICRsb2NhbFN0b3JhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgXSk7XHJcblxyXG5cclxudmFyIHZpZXcgPSB7XHJcbiAgICBsb2FkaW5nX2RpYWxvZzogbnVsbCxcclxuICAgIGxvYWRpbmdfbnVtOiAwXHJcbn07XHJcblxyXG4vLyBkaWFsb2dcclxudmlldy5kaWFsb2cgPSBmdW5jdGlvbiAob3B0KSB7XHJcbiAgICB2YXIgdGl0bGUgPSBvcHQudGl0bGUgfHwgVChcImRpYWxvZy5ESUFMT0dcIiksXHJcbiAgICAgICAgY29udGVudCA9IG9wdC5jb250ZW50IHx8IFwiXCIsXHJcbiAgICAgICAgb2tfYnRuID0gb3B0Lm9rX2J0bixcclxuICAgICAgICBjYW5jZWxfYnRuID0gb3B0LmNhbmNlbF9idG4sXHJcbiAgICAgICAgY2xvc2VfYnRuID0gb3B0LmNsb3NlX2J0bixcclxuICAgICAgICBva19mbiA9IG9wdC5va19mbiB8fCBudWxsLFxyXG4gICAgICAgIGNhbmNlbF9mbiA9IG9wdC5jYW5jZWxfZm4gfHwgbnVsbCxcclxuICAgICAgICBwcmVfZm4gPSBvcHQucHJlX2ZuIHx8IG51bGwsXHJcbiAgICAgICAgZGlhbG9nID0gbnVsbCxcclxuICAgICAgICBkaWFsb2dfaHRtbCA9ICc8ZGl2IGNsYXNzPVwibW9kYWwgZmFkZVwiPlxcXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1kaWFsb2dcIj5cXFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxcXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cXFxyXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPjwvYnV0dG9uPlxcXHJcbiAgICAgICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIj4nICsgdGl0bGUgKyAnPC9oND5cXFxyXG4gICAgICAgICAgICA8L2Rpdj5cXFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPicgKyBjb250ZW50ICsgJzwvZGl2PlxcXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj4nO1xyXG5cclxuICAgIGlmIChjYW5jZWxfYnRuKSB7XHJcbiAgICAgICAgZGlhbG9nX2h0bWwgKz0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGRpYWxvZ19idG4gY2FuY2VsXCI+JyArIFQoXCJidXR0b24uQ0FOQ0VMXCIpICsgJzwvYnV0dG9uPic7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9rX2J0bikge1xyXG4gICAgICAgIGRpYWxvZ19odG1sICs9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBkaWFsb2dfYnRuIG9rXCI+JyArIFQoXCJidXR0b24uT0tcIikgKyAnPC9idXR0b24+JztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2xvc2VfYnRuKSB7XHJcbiAgICAgICAgZGlhbG9nX2h0bWwgKz0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGRpYWxvZ19idG4gb2tcIj4nICsgVChcImJ1dHRvbi5DTE9TRVwiKSArICc8L2J1dHRvbj4nO1xyXG4gICAgfVxyXG5cclxuICAgIGRpYWxvZ19odG1sICs9ICc8L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj4nO1xyXG5cclxuICAgIGRpYWxvZyA9ICQoZGlhbG9nX2h0bWwpO1xyXG5cclxuICAgIGRpYWxvZ1xyXG4gICAgICAgIC5vbignc2hvdy5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChvcHQud2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjc3MgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzogb3B0LndpZHRoICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oXCIubW9kYWwtZGlhbG9nXCIpLmNzcyhjc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByZV9mbiAmJiBwcmVfZm4oJCh0aGlzKSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oXCJzaG93bi5icy5tb2RhbFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKFwiaGlkZS5icy5tb2RhbFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKFwiaGlkZGVuLmJzLm1vZGFsXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGRpYWxvZy5yZW1vdmUoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbihcImNsaWNrXCIsIFwiLmRpYWxvZ19idG5cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcIm9rXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBva19mbiAmJiBva19mbigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImNhbmNlbFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY2FuY2VsX2ZuICYmIGNhbmNlbF9mbigpO1xyXG4gICAgICAgICAgICAgICAgZGlhbG9nLm1vZGFsKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFvcHQucHJldmVudF9hdXRvX2hpZGUgfHwgb3B0LnByZXZlbnRfYXV0b19oaWRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBkaWFsb2cubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oJ3Nob3duJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBwcmVfZm4gJiYgcHJlX2ZuKCQodGhpcykpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm1vZGFsKCdzaG93Jyk7XHJcblxyXG4gICAgZGlhbG9nLmNsb3NlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykubW9kYWwoJ2hpZGUnKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGRpYWxvZztcclxufTtcclxuXHJcbi8vIGxvYWRpbmdcclxudmlldy5sb2FkaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHZpZXcubG9hZGluZ19kaWFsb2cgPT0gbnVsbCkge1xyXG4gICAgICAgIHZhciBvcHQgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBUKFwiZGlhbG9nLkFMRVJUXCIpLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcIjxpbWcgc3JjPSdpbWcvbG9hZGluZy5naWYnLz4gPHNwYW4gc3R5bGU9J2ZvbnQtc2l6ZTogMThweDsnPlwiICsgVChcImRpYWxvZy5MT0FESU5HXCIpICsgXCI8L3NwYW4+XCIsXHJcbiAgICAgICAgICAgIG9rX2J0bjogZmFsc2UsXHJcbiAgICAgICAgICAgIGNhbmNlbF9idG46IGZhbHNlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmlldy5sb2FkaW5nX2RpYWxvZyA9IHZpZXcuZGlhbG9nKG9wdCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmlldy5sb2FkaW5nX251bSsrO1xyXG59O1xyXG5cclxuLy8g5YWz6ZetbG9hZGluZ1xyXG52aWV3LmNsb3NlX2xvYWRpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2aWV3LmxvYWRpbmdfbnVtLS07XHJcblxyXG4gICAgaWYgKHZpZXcubG9hZGluZ19kaWFsb2cgIT0gbnVsbCAmJiB2aWV3LmxvYWRpbmdfbnVtID09IDApIHtcclxuICAgICAgICB2aWV3LmxvYWRpbmdfZGlhbG9nLmNsb3NlKCk7XHJcbiAgICAgICAgdmlldy5sb2FkaW5nX2RpYWxvZyA9IG51bGw7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyBhbGVydFxyXG52aWV3LmFsZXJ0ID0gZnVuY3Rpb24gKG1zZywgb2spIHtcclxuICAgIHZhciBvcHQgPSB7XHJcbiAgICAgICAgdGl0bGU6IFQoXCJkaWFsb2cuQUxFUlRcIiksXHJcbiAgICAgICAgY29udGVudDogXCJcIiArIG1zZyArIFwiXCIsXHJcbiAgICAgICAgY2xvc2VfYnRuOiB0cnVlLFxyXG4gICAgICAgIG9rX2ZuOiBva1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdmlldy5kaWFsb2cob3B0KTtcclxufTtcclxuXHJcbi8vIHNob3dcclxudmlldy5zaG93ID0gZnVuY3Rpb24gKG1zZywgdGl0bGUsIHdpZHRoLCBvaywgY2FuY2VsKSB7XHJcbiAgICB2YXIgb3B0ID0ge1xyXG4gICAgICAgIHRpdGxlOiBUKFwiZGlhbG9nLkFMRVJUXCIpLFxyXG4gICAgICAgIGNvbnRlbnQ6IFwiPHAgc3R5bGU9J3dvcmQtd3JhcDpicmVhay13b3JkJz5cIiArIG1zZyArIFwiPC9wPlwiLFxyXG4gICAgICAgIGNsb3NlX2J0bjogdHJ1ZSxcclxuICAgICAgICBva19mbjogb2ssXHJcbiAgICAgICAgY2FuY2VsX2ZuOiBjYW5jZWxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKHRpdGxlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG9wdC50aXRsZSA9IHRpdGxlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh3aWR0aCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICBvcHQud2lkdGggPSB3aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdmlldy5kaWFsb2cob3B0KTtcclxufTtcclxuXHJcbi8vIGNvbmZpcm1cclxudmlldy5jb25maXJtID0gZnVuY3Rpb24gKGNvbnRlbnQsIG9rLCBjYW5jZWwpIHtcclxuXHJcbiAgICB2YXIgb3B0ID0ge1xyXG4gICAgICAgIHRpdGxlOiBUKFwiZGlhbG9nLkFMRVJUXCIpLFxyXG4gICAgICAgIGNvbnRlbnQ6ICc8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tZXhjbGFtYXRpb24tc2lnblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiAnICsgY29udGVudCArICc8L3NwYW4+JyxcclxuICAgICAgICBva19idG46IHRydWUsXHJcbiAgICAgICAgY2FuY2VsX2J0bjogdHJ1ZSxcclxuICAgICAgICBva19mbjogb2ssXHJcbiAgICAgICAgY2FuY2VsX2ZuOiBjYW5jZWxcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHZpZXcuZGlhbG9nKG9wdCk7XHJcbn07XHJcblxyXG4vLyBwcm9tcHRcclxudmlldy5wcm9tcHQgPSBmdW5jdGlvbiAodGl0bGUsIGRlZmF1bHRfdmFsLCBvaywgY2FuY2VsKSB7XHJcbiAgICB2YXIgb2tfZm4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gJChcIiNwcm9tcHRfaW5wdXRcIikudmFsKCk7XHJcbiAgICAgICAgb2sodmFsdWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgY29udGVudCA9ICc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwicHJvbXB0X2lucHV0XCI+JztcclxuICAgIGlmIChkZWZhdWx0X3ZhbCAhPSBudWxsICYmIGRlZmF1bHRfdmFsICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNvbnRlbnQgPSAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cInByb21wdF9pbnB1dFwiIHZhbHVlPVwiJyArIGRlZmF1bHRfdmFsICsgJ1wiPic7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG9wdCA9IHtcclxuICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgY29udGVudDogY29udGVudCxcclxuICAgICAgICBva19idG46IHRydWUsXHJcbiAgICAgICAgY2FuY2VsX2J0bjogdHJ1ZSxcclxuICAgICAgICBva19mbjogb2tfZm4sXHJcbiAgICAgICAgY2FuY2VsX2ZuOiBjYW5jZWxcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHZpZXcuZGlhbG9nKG9wdCk7XHJcbn07XHJcblxyXG4vLyBwcm9tcHRfdGltZVxyXG52aWV3LnByb21wdF90aW1lID0gZnVuY3Rpb24gKHRpdGxlLCBvaywgY2FuY2VsKSB7XHJcbiAgICB2YXIgb2tfZm4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gJChcIiNwcm9tcHRfaW5wdXRcIikudmFsKCk7XHJcbiAgICAgICAgb2sodmFsdWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgb3B0ID0ge1xyXG4gICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICBjb250ZW50OiAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBkYXRhLWRhdGUtZm9ybWF0PVwieXl5eS1tbS1kZCBoaDppaTpzc1wiIGlkPVwicHJvbXB0X2lucHV0XCI+JyxcclxuICAgICAgICBva19idG46IHRydWUsXHJcbiAgICAgICAgY2FuY2VsX2J0bjogdHJ1ZSxcclxuICAgICAgICBva19mbjogb2tfZm4sXHJcbiAgICAgICAgY2FuY2VsX2ZuOiBjYW5jZWxcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHZpZXcuZGlhbG9nKG9wdCk7XHJcbn07XHJcblxyXG4vLyBwcm9tcHRfdGV4dGFyZWFcclxudmlldy5wcm9tcHRfdGV4dGFyZWEgPSBmdW5jdGlvbiAodGl0bGUsIG9rLCBjYW5jZWwsIHZhbHVlKSB7XHJcbiAgICB2YWx1ZSA9IHZhbHVlIHx8IFwiXCI7XHJcblxyXG4gICAgdmFyIG9rX2ZuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9ICQoXCIjcHJvbXB0X2lucHV0XCIpLnZhbCgpO1xyXG4gICAgICAgIG9rKHZhbHVlKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG9wdCA9IHtcclxuICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgY29udGVudDogJzx0ZXh0YXJlYSBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwicHJvbXB0X2lucHV0XCI+JyArIHZhbHVlICsgJzwvdGV4dGFyZWE+JyxcclxuICAgICAgICBva19idG46IHRydWUsXHJcbiAgICAgICAgY2FuY2VsX2J0bjogdHJ1ZSxcclxuICAgICAgICBva19mbjogb2tfZm4sXHJcbiAgICAgICAgY2FuY2VsX2ZuOiBjYW5jZWxcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHZpZXcuZGlhbG9nKG9wdCk7XHJcbn07XHJcblxyXG52YXIgdXRpbHMgPSB7fTtcclxuXHJcbnV0aWxzLmV4cG9ydEV4Y2VsID0gZnVuY3Rpb24gKHBhcmFtcywgdXJsLCBtZXRob2QpIHtcclxuICAgIGlmIChwYXJhbXMpIHtcclxuICAgICAgICAvLyBwYXJhbXMg5pivIHN0cmluZyDmiJbogIUgYXJyYXkvb2JqZWN0XHJcbiAgICAgICAgaWYgKHR5cGVvZiBwYXJhbXMgPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgcGFyYW1zID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhcmFtc1snZXhwb3J0J10gPSAxO1xyXG4gICAgICAgIC8vIOaKiuWPguaVsOe7hOijheaIkCBmb3Jt55qEICBpbnB1dFxyXG4gICAgICAgIHZhciBpbnB1dHMgPSBbXTtcclxuICAgICAgICAkLmVhY2gocGFyYW1zLCBmdW5jdGlvbiAoaywgdikge1xyXG4gICAgICAgICAgICBpZiAodiA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbnB1dHMucHVzaCgnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiJyArIGsgKyAnXCIgdmFsdWU9XCInICsgdiArICdcIiAvPicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9mZignc3VibWl0Jyk7XHJcbiAgICAgICAgJCgnPGZvcm0gaWQ9XCJkb3dubG9hZFwiIGFjdGlvbj1cIicgKyAodXJsIHx8ICdpbmRleC5waHAnKSArICdcIiBtZXRob2Q9XCInICsgKG1ldGhvZCB8fCBcInBvc3RcIikgKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JyArIGlucHV0cy5qb2luKCcnKSArICc8L2Zvcm0+JylcclxuICAgICAgICAgICAgLmFwcGVuZFRvKCdib2R5Jykuc3VibWl0KCkucmVtb3ZlKCk7XHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ3N1Ym1pdCcsIGZhbHNlKTtcclxuICAgIH1cclxufTtcclxuXHJcbnV0aWxzLmJhc2U2NFRvQmxvYiA9IGZ1bmN0aW9uKGJhc2U2NERhdGEsIGNvbnRlbnRUeXBlKSB7XHJcbiAgICBjb250ZW50VHlwZSA9IGNvbnRlbnRUeXBlIHx8ICcnO1xyXG4gICAgdmFyIHNsaWNlU2l6ZSA9IDEwMjQ7XHJcbiAgICB2YXIgYnl0ZUNoYXJhY3RlcnMgPSBhdG9iKGJhc2U2NERhdGEpO1xyXG4gICAgdmFyIGJ5dGVzTGVuZ3RoID0gYnl0ZUNoYXJhY3RlcnMubGVuZ3RoO1xyXG4gICAgdmFyIHNsaWNlc0NvdW50ID0gTWF0aC5jZWlsKGJ5dGVzTGVuZ3RoIC8gc2xpY2VTaXplKTtcclxuICAgIHZhciBieXRlQXJyYXlzID0gbmV3IEFycmF5KHNsaWNlc0NvdW50KTtcclxuXHJcbiAgICBmb3IgKHZhciBzbGljZUluZGV4ID0gMDsgc2xpY2VJbmRleCA8IHNsaWNlc0NvdW50OyArK3NsaWNlSW5kZXgpIHtcclxuICAgICAgICB2YXIgYmVnaW4gPSBzbGljZUluZGV4ICogc2xpY2VTaXplO1xyXG4gICAgICAgIHZhciBlbmQgPSBNYXRoLm1pbihiZWdpbiArIHNsaWNlU2l6ZSwgYnl0ZXNMZW5ndGgpO1xyXG5cclxuICAgICAgICB2YXIgYnl0ZXMgPSBuZXcgQXJyYXkoZW5kIC0gYmVnaW4pO1xyXG4gICAgICAgIGZvciAodmFyIG9mZnNldCA9IGJlZ2luLCBpID0gMCA7IG9mZnNldCA8IGVuZDsgKytpLCArK29mZnNldCkge1xyXG4gICAgICAgICAgICBieXRlc1tpXSA9IGJ5dGVDaGFyYWN0ZXJzW29mZnNldF0uY2hhckNvZGVBdCgwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnl0ZUFycmF5c1tzbGljZUluZGV4XSA9IG5ldyBVaW50OEFycmF5KGJ5dGVzKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgQmxvYihieXRlQXJyYXlzLCB7IHR5cGU6IGNvbnRlbnRUeXBlIH0pO1xyXG59O1xyXG5cclxuIiwiYW5ndWxhci5tb2R1bGUoJ2h0dHBTZXJ2aWNlJywgW10pLlxyXG4gICAgc2VydmljZSgnbW9ja1NlcnZpY2UnLCBbJyRkb2N1bWVudCcsICckcScsICckdGltZW91dCcsICckaHR0cCcsICckc3RhdGUnLCBmdW5jdGlvbiAoJGRvY3VtZW50LCAkcSwgJHRpbWVvdXQsICRodHRwLCAkc3RhdGUpIHtcclxuICAgICAgICB0aGlzLnBvc3QgPSBmdW5jdGlvbiAodXJsLCBwYXJhbXMsIG9wdCkge1xyXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG5cclxuICAgICAgICAgICAgdXJsID0gXCIvYW5ndWxhckFkbWluL2RhdGFcIiArIHVybCArIFwiLmpzb25cIjtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHVybCk7XHJcblxyXG4gICAgICAgICAgICBvcHQgPSBvcHQgfHwge307XHJcblxyXG4gICAgICAgICAgICB2YXIgbG9hZGluZyA9IG9wdFsnbG9hZGluZyddID09IHVuZGVmaW5lZCA/IHRydWUgOiBvcHRbJ2xvYWRpbmcnXTtcclxuICAgICAgICAgICAgaWYgKGxvYWRpbmcgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmlldy5sb2FkaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBhbGVydEVycm9yID0gb3B0WydhbGVydEVycm9yJ10gPT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG9wdFsnYWxlcnRFcnJvciddO1xyXG5cclxuICAgICAgICAgICAgJGh0dHAucG9zdCh1cmwsIHBhcmFtcykudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9hZGluZyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlldy5jbG9zZV9sb2FkaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHJlcy5kYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocmVzdWx0LnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDmma7pgJrplJnor69cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbGVydEVycm9yID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmFsZXJ0KHJlc3VsdC5tc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5pyq55m75b2VXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWxlcnRFcnJvciA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5hbGVydChyZXN1bHQubXNnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb24uaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKFwibG9naW5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5p2D6ZmQ5LiN6LazXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWxlcnRFcnJvciA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5hbGVydChyZXN1bHQubXNnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlhbbku5bplJnor69cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbGVydEVycm9yID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmFsZXJ0KHJlc3VsdC5tc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsb2FkaW5nID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3LmNsb3NlX2xvYWRpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYWxlcnRFcnJvciA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlldy5hbGVydChUKFwidGlwcy5TWVNURU1fRVJST1JcIikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChUKFwidGlwcy5TWVNURU1fRVJST1JcIikpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgIH07XHJcbiAgICB9XSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIDAuMS4xXHJcbiAqIERlZmVycmVkIGxvYWQganMvY3NzIGZpbGUsIHVzZWQgZm9yIHVpLWpxLmpzIGFuZCBMYXp5IExvYWRpbmcuXHJcbiAqIFxyXG4gKiBAIGZsYXRmdWxsLmNvbSBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKiBBdXRob3IgdXJsOiAjdXNlci9mbGF0ZnVsbFxyXG4gKi9cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCd1aS5sb2FkJywgW10pXHJcblx0LnNlcnZpY2UoJ3VpTG9hZCcsIFsnJGRvY3VtZW50JywgJyRxJywgJyR0aW1lb3V0JywgZnVuY3Rpb24gKCRkb2N1bWVudCwgJHEsICR0aW1lb3V0KSB7XHJcblxyXG5cdFx0dmFyIGxvYWRlZCA9IFtdO1xyXG5cdFx0dmFyIHByb21pc2UgPSBmYWxzZTtcclxuXHRcdHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDaGFpbiBsb2FkcyB0aGUgZ2l2ZW4gc291cmNlc1xyXG5cdFx0ICogQHBhcmFtIHNyY3MgYXJyYXksIHNjcmlwdCBvciBjc3NcclxuXHRcdCAqIEByZXR1cm5zIHsqfSBQcm9taXNlIHRoYXQgd2lsbCBiZSByZXNvbHZlZCBvbmNlIHRoZSBzb3VyY2VzIGhhcyBiZWVuIGxvYWRlZC5cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5sb2FkID0gZnVuY3Rpb24gKHNyY3MpIHtcclxuXHRcdFx0c3JjcyA9IGFuZ3VsYXIuaXNBcnJheShzcmNzKSA/IHNyY3MgOiBzcmNzLnNwbGl0KC9cXHMrLyk7XHJcblx0XHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdFx0aWYoIXByb21pc2Upe1xyXG5cdFx0XHRcdHByb21pc2UgPSBkZWZlcnJlZC5wcm9taXNlO1xyXG5cdFx0XHR9XHJcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChzcmNzLCBmdW5jdGlvbihzcmMpIHtcclxuICAgICAgXHRwcm9taXNlID0gcHJvbWlzZS50aGVuKCBmdW5jdGlvbigpe1xyXG4gICAgICBcdFx0cmV0dXJuIHNyYy5pbmRleE9mKCcuY3NzJykgPj0wID8gc2VsZi5sb2FkQ1NTKHNyYykgOiBzZWxmLmxvYWRTY3JpcHQoc3JjKTtcclxuICAgICAgXHR9ICk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XHJcbiAgICAgIHJldHVybiBwcm9taXNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRHluYW1pY2FsbHkgbG9hZHMgdGhlIGdpdmVuIHNjcmlwdFxyXG5cdFx0ICogQHBhcmFtIHNyYyBUaGUgdXJsIG9mIHRoZSBzY3JpcHQgdG8gbG9hZCBkeW5hbWljYWxseVxyXG5cdFx0ICogQHJldHVybnMgeyp9IFByb21pc2UgdGhhdCB3aWxsIGJlIHJlc29sdmVkIG9uY2UgdGhlIHNjcmlwdCBoYXMgYmVlbiBsb2FkZWQuXHJcblx0XHQgKi9cclxuXHRcdHRoaXMubG9hZFNjcmlwdCA9IGZ1bmN0aW9uIChzcmMpIHtcclxuXHRcdFx0aWYobG9hZGVkW3NyY10pIHJldHVybiBsb2FkZWRbc3JjXS5wcm9taXNlO1xyXG5cclxuXHRcdFx0dmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuXHRcdFx0dmFyIHNjcmlwdCA9ICRkb2N1bWVudFswXS5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuXHRcdFx0c2NyaXB0LnNyYyA9IHNyYztcclxuXHRcdFx0c2NyaXB0Lm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShlKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHRcdFx0JGRvY3VtZW50WzBdLmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuXHRcdFx0bG9hZGVkW3NyY10gPSBkZWZlcnJlZDtcclxuXHJcblx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIER5bmFtaWNhbGx5IGxvYWRzIHRoZSBnaXZlbiBDU1MgZmlsZVxyXG5cdFx0ICogQHBhcmFtIGhyZWYgVGhlIHVybCBvZiB0aGUgQ1NTIHRvIGxvYWQgZHluYW1pY2FsbHlcclxuXHRcdCAqIEByZXR1cm5zIHsqfSBQcm9taXNlIHRoYXQgd2lsbCBiZSByZXNvbHZlZCBvbmNlIHRoZSBDU1MgZmlsZSBoYXMgYmVlbiBsb2FkZWQuXHJcblx0XHQgKi9cclxuXHRcdHRoaXMubG9hZENTUyA9IGZ1bmN0aW9uIChocmVmKSB7XHJcblx0XHRcdGlmKGxvYWRlZFtocmVmXSkgcmV0dXJuIGxvYWRlZFtocmVmXS5wcm9taXNlO1xyXG5cclxuXHRcdFx0dmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuXHRcdFx0dmFyIHN0eWxlID0gJGRvY3VtZW50WzBdLmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcclxuXHRcdFx0c3R5bGUucmVsID0gJ3N0eWxlc2hlZXQnO1xyXG5cdFx0XHRzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcclxuXHRcdFx0c3R5bGUuaHJlZiA9IGhyZWY7XHJcblx0XHRcdHN0eWxlLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShlKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHRcdFx0c3R5bGUub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGUpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9O1xyXG5cdFx0XHQkZG9jdW1lbnRbMF0uaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XHJcblx0XHRcdGxvYWRlZFtocmVmXSA9IGRlZmVycmVkO1xyXG5cclxuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcblx0XHR9O1xyXG59XSk7Il19
