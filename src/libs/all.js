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
    'ui.grid.selection'
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
angular.module('app')
    .controller('GridCtrl', ['$scope', function ($scope) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbmZpZy5qcyIsImNvbmZpZy5yb3V0ZXIuanMiLCJtYWluLmpzIiwiY29udHJvbGxlcnMvYm9vdHN0cmFwLmpzIiwiY29udHJvbGxlcnMvZ3JpZEN0cmwuanMiLCJjb250cm9sbGVycy90b2FzdGVyLmpzIiwiZGlyZWN0aXZlcy9zZXRuZ2FuaW1hdGUuanMiLCJkaXJlY3RpdmVzL3VpLWJ1dHRlcmJhci5qcyIsImRpcmVjdGl2ZXMvdWktZm9jdXMuanMiLCJkaXJlY3RpdmVzL3VpLWZ1bGxzY3JlZW4uanMiLCJkaXJlY3RpdmVzL3VpLWpxLmpzIiwiZGlyZWN0aXZlcy91aS1tb2R1bGUuanMiLCJkaXJlY3RpdmVzL3VpLW5hdi5qcyIsImRpcmVjdGl2ZXMvdWktc2Nyb2xsLmpzIiwiZGlyZWN0aXZlcy91aS1zaGlmdC5qcyIsImRpcmVjdGl2ZXMvdWktdG9nZ2xlY2xhc3MuanMiLCJkaXJlY3RpdmVzL3VpLXZhbGlkYXRlLmpzIiwic2VydmljZXMvdWktbG9hZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbFRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXHJcbiAgICAnbmdBbmltYXRlJyxcclxuICAgICduZ0Nvb2tpZXMnLFxyXG4gICAgJ25nUmVzb3VyY2UnLFxyXG4gICAgJ25nU2FuaXRpemUnLFxyXG4gICAgJ25nVG91Y2gnLFxyXG4gICAgJ25nU3RvcmFnZScsXHJcbiAgICAndWkucm91dGVyJyxcclxuICAgICd1aS5ib290c3RyYXAnLFxyXG4gICAgJ3VpLmxvYWQnLFxyXG4gICAgJ3VpLmpxJyxcclxuICAgICd1aS52YWxpZGF0ZScsXHJcbiAgICAnb2MubGF6eUxvYWQnLFxyXG4gICAgJ3Bhc2NhbHByZWNodC50cmFuc2xhdGUnLFxyXG4gICAgJ3RvYXN0ZXInLFxyXG4gICAgJ3VpLmdyaWQnLFxyXG4gICAgJ3VpLmdyaWQuZWRpdCcsXHJcbiAgICAndWkuZ3JpZC5zZWxlY3Rpb24nXHJcbl0pO1xyXG4iLCIvLyBjb25maWdcblxudmFyIGFwcCA9XG4gIGFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb25maWcoXG4gICAgWyckY29udHJvbGxlclByb3ZpZGVyJywgJyRjb21waWxlUHJvdmlkZXInLCAnJGZpbHRlclByb3ZpZGVyJywgJyRwcm92aWRlJyxcbiAgICAgIGZ1bmN0aW9uICgkY29udHJvbGxlclByb3ZpZGVyLCAkY29tcGlsZVByb3ZpZGVyLCAkZmlsdGVyUHJvdmlkZXIsICRwcm92aWRlKSB7XG5cbiAgICAgICAgLy8gbGF6eSBjb250cm9sbGVyLCBkaXJlY3RpdmUgYW5kIHNlcnZpY2VcbiAgICAgICAgYXBwLmNvbnRyb2xsZXIgPSAkY29udHJvbGxlclByb3ZpZGVyLnJlZ2lzdGVyO1xuICAgICAgICBhcHAuZGlyZWN0aXZlID0gJGNvbXBpbGVQcm92aWRlci5kaXJlY3RpdmU7XG4gICAgICAgIGFwcC5maWx0ZXIgPSAkZmlsdGVyUHJvdmlkZXIucmVnaXN0ZXI7XG4gICAgICAgIGFwcC5mYWN0b3J5ID0gJHByb3ZpZGUuZmFjdG9yeTtcbiAgICAgICAgYXBwLnNlcnZpY2UgPSAkcHJvdmlkZS5zZXJ2aWNlO1xuICAgICAgICBhcHAuY29uc3RhbnQgPSAkcHJvdmlkZS5jb25zdGFudDtcbiAgICAgICAgYXBwLnZhbHVlID0gJHByb3ZpZGUudmFsdWU7XG4gICAgICB9XG4gICAgXSkuY29uZmlnKFsnJHRyYW5zbGF0ZVByb3ZpZGVyJywgZnVuY3Rpb24gKCR0cmFuc2xhdGVQcm92aWRlcikge1xuICAgICAgJHRyYW5zbGF0ZVByb3ZpZGVyLnVzZVN0YXRpY0ZpbGVzTG9hZGVyKHtcbiAgICAgICAgcHJlZml4OiAnbDEwbi8nLFxuICAgICAgICBzdWZmaXg6ICcuanNvbidcbiAgICAgIH0pO1xuICAgICAgJHRyYW5zbGF0ZVByb3ZpZGVyLnByZWZlcnJlZExhbmd1YWdlKCd6aF9jbicpO1xuICAgICAgJHRyYW5zbGF0ZVByb3ZpZGVyLnVzZUxvY2FsU3RvcmFnZSgpO1xuICAgIH1dKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogQ29uZmlnIGZvciB0aGUgcm91dGVyXHJcbiAqL1xyXG5hbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuICAgIC5ydW4oXHJcbiAgICAgICAgWyckcm9vdFNjb3BlJywgJyRzdGF0ZScsICckc3RhdGVQYXJhbXMnLFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJHN0YXRlID0gJHN0YXRlO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kc3RhdGVQYXJhbXMgPSAkc3RhdGVQYXJhbXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICApXHJcbiAgICAuY29uZmlnKFxyXG4gICAgICAgIFsnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJyxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcclxuXHJcbiAgICAgICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9hcHAvaG9tZScpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgICAgIC5zdGF0ZSgnYXBwJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9hcHAnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndHBsL2FwcC5odG1sJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmhvbWUnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2hvbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndHBsL2hvbWUuaHRtbCdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhdGUoJ2FwcC5idXR0b25zJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9idXR0b25zJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RwbC91aV9idXR0b25zLmh0bWwnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXRlKCdhcHAuYm9vdHN0cmFwJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9ib290c3RyYXAnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndHBsL3VpX2Jvb3RzdHJhcC5odG1sJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmljb25zJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9pY29ucycsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0cGwvdWlfaWNvbnMuaHRtbCdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhdGUoJ2FwcC50b2FzdGVyJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy90b2FzdGVyJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RwbC91aV90b2FzdGVyLmh0bWwnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXRlKCdhcHAuZ3JpZCcsIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvZ3JpZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0cGwvYm9vdHN0cmFwX2dyaWQuaHRtbCdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhdGUoJ2FwcC51aWdyaWQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3VpZ3JpZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0cGwvdWlfZ3JpZC5odG1sJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyogQ29udHJvbGxlcnMgKi9cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gIC5jb250cm9sbGVyKCdBcHBDdHJsJywgWyckc2NvcGUnLCAnJHRyYW5zbGF0ZScsICckbG9jYWxTdG9yYWdlJywgJyR3aW5kb3cnLCBcclxuICAgIGZ1bmN0aW9uKCAgICAgICAgICAgICAgJHNjb3BlLCAgICR0cmFuc2xhdGUsICAgJGxvY2FsU3RvcmFnZSwgICAkd2luZG93ICkge1xyXG4gICAgICAvLyBhZGQgJ2llJyBjbGFzc2VzIHRvIGh0bWxcclxuICAgICAgdmFyIGlzSUUgPSAhIW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL01TSUUvaSk7XHJcbiAgICAgIGlzSUUgJiYgYW5ndWxhci5lbGVtZW50KCR3aW5kb3cuZG9jdW1lbnQuYm9keSkuYWRkQ2xhc3MoJ2llJyk7XHJcbiAgICAgIGlzU21hcnREZXZpY2UoICR3aW5kb3cgKSAmJiBhbmd1bGFyLmVsZW1lbnQoJHdpbmRvdy5kb2N1bWVudC5ib2R5KS5hZGRDbGFzcygnc21hcnQnKTtcclxuXHJcbiAgICAgIC8vIGNvbmZpZ1xyXG4gICAgICAkc2NvcGUuYXBwID0ge1xyXG4gICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICB0aGVtZUlEOiAxLFxyXG4gICAgICAgICAgbmF2YmFySGVhZGVyQ29sb3I6ICdiZy1ibGFjaycsXHJcbiAgICAgICAgICBuYXZiYXJDb2xsYXBzZUNvbG9yOiAnaGVhZC1saWdodGJsdWUnLFxyXG4gICAgICAgICAgYXNpZGVDb2xvcjogJ2FzaWRlLWJsdWUnLFxyXG4gICAgICAgICAgaGVhZGVyRml4ZWQ6IHRydWUsXHJcbiAgICAgICAgICBhc2lkZUZpeGVkOiB0cnVlLFxyXG4gICAgICAgICAgYXNpZGVGb2xkZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgYXNpZGVEb2NrOiBmYWxzZSxcclxuICAgICAgICAgIGNvbnRhaW5lcjogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHNhdmUgc2V0dGluZ3MgdG8gbG9jYWwgc3RvcmFnZVxyXG4gICAgICAvLyBpZiAoIGFuZ3VsYXIuaXNEZWZpbmVkKCRsb2NhbFN0b3JhZ2Uuc2V0dGluZ3MpICkge1xyXG4gICAgICAvLyAgICRzY29wZS5hcHAuc2V0dGluZ3MgPSAkbG9jYWxTdG9yYWdlLnNldHRpbmdzO1xyXG4gICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAvLyAgICRsb2NhbFN0b3JhZ2Uuc2V0dGluZ3MgPSAkc2NvcGUuYXBwLnNldHRpbmdzO1xyXG4gICAgICAvLyB9XHJcbiAgICAgICRzY29wZS4kd2F0Y2goJ2FwcC5zZXR0aW5ncycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoICRzY29wZS5hcHAuc2V0dGluZ3MuYXNpZGVEb2NrICAmJiAgJHNjb3BlLmFwcC5zZXR0aW5ncy5hc2lkZUZpeGVkICl7XHJcbiAgICAgICAgICAvLyBhc2lkZSBkb2NrIGFuZCBmaXhlZCBtdXN0IHNldCB0aGUgaGVhZGVyIGZpeGVkLlxyXG4gICAgICAgICAgJHNjb3BlLmFwcC5zZXR0aW5ncy5oZWFkZXJGaXhlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNhdmUgdG8gbG9jYWwgc3RvcmFnZVxyXG4gICAgICAgICRsb2NhbFN0b3JhZ2Uuc2V0dGluZ3MgPSAkc2NvcGUuYXBwLnNldHRpbmdzO1xyXG4gICAgICB9LCB0cnVlKTtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIGlzU21hcnREZXZpY2UoICR3aW5kb3cgKVxyXG4gICAgICB7XHJcbiAgICAgICAgICAvLyBBZGFwdGVkIGZyb20gaHR0cDovL3d3dy5kZXRlY3Rtb2JpbGVicm93c2Vycy5jb21cclxuICAgICAgICAgIHZhciB1YSA9ICR3aW5kb3dbJ25hdmlnYXRvciddWyd1c2VyQWdlbnQnXSB8fCAkd2luZG93WyduYXZpZ2F0b3InXVsndmVuZG9yJ10gfHwgJHdpbmRvd1snb3BlcmEnXTtcclxuICAgICAgICAgIC8vIENoZWNrcyBmb3IgaU9zLCBBbmRyb2lkLCBCbGFja2JlcnJ5LCBPcGVyYSBNaW5pLCBhbmQgV2luZG93cyBtb2JpbGUgZGV2aWNlc1xyXG4gICAgICAgICAgcmV0dXJuICgvaVBob25lfGlQb2R8aVBhZHxTaWxrfEFuZHJvaWR8QmxhY2tCZXJyeXxPcGVyYSBNaW5pfElFTW9iaWxlLykudGVzdCh1YSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICRzY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN0YXJ0JyxmdW5jdGlvbihldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcyl7XHJcblxyXG4gICAgICB9KTtcclxuICB9XSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyogQ29udHJvbGxlcnMgKi9cclxuXHJcbiAgLy8gYm9vdHN0cmFwIGNvbnRyb2xsZXJcclxuICBhcHAuY29udHJvbGxlcignQWNjb3JkaW9uRGVtb0N0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG4gICAgJHNjb3BlLm9uZUF0QVRpbWUgPSB0cnVlO1xyXG5cclxuICAgICRzY29wZS5ncm91cHMgPSBbXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ0FjY29yZGlvbiBncm91cCBoZWFkZXIgLSAjMScsXHJcbiAgICAgICAgY29udGVudDogJ0R5bmFtaWMgZ3JvdXAgYm9keSAtICMxJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICdBY2NvcmRpb24gZ3JvdXAgaGVhZGVyIC0gIzInLFxyXG4gICAgICAgIGNvbnRlbnQ6ICdEeW5hbWljIGdyb3VwIGJvZHkgLSAjMidcclxuICAgICAgfVxyXG4gICAgXTtcclxuXHJcbiAgICAkc2NvcGUuaXRlbXMgPSBbJ0l0ZW0gMScsICdJdGVtIDInLCAnSXRlbSAzJ107XHJcblxyXG4gICAgJHNjb3BlLmFkZEl0ZW0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIG5ld0l0ZW1ObyA9ICRzY29wZS5pdGVtcy5sZW5ndGggKyAxO1xyXG4gICAgICAkc2NvcGUuaXRlbXMucHVzaCgnSXRlbSAnICsgbmV3SXRlbU5vKTtcclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLnN0YXR1cyA9IHtcclxuICAgICAgaXNGaXJzdE9wZW46IHRydWUsXHJcbiAgICAgIGlzRmlyc3REaXNhYmxlZDogZmFsc2VcclxuICAgIH07XHJcbiAgfV0pXHJcbiAgOyBcclxuICBhcHAuY29udHJvbGxlcignQWxlcnREZW1vQ3RybCcsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbiAgICAkc2NvcGUuYWxlcnRzID0gW1xyXG4gICAgICB7IHR5cGU6ICdzdWNjZXNzJywgbXNnOiAnV2VsbCBkb25lISBZb3Ugc3VjY2Vzc2Z1bGx5IHJlYWQgdGhpcyBpbXBvcnRhbnQgYWxlcnQgbWVzc2FnZS4nIH0sXHJcbiAgICAgIHsgdHlwZTogJ2luZm8nLCBtc2c6ICdIZWFkcyB1cCEgVGhpcyBhbGVydCBuZWVkcyB5b3VyIGF0dGVudGlvbiwgYnV0IGl0IGlzIG5vdCBzdXBlciBpbXBvcnRhbnQuJyB9LFxyXG4gICAgICB7IHR5cGU6ICd3YXJuaW5nJywgbXNnOiAnV2FybmluZyEgQmVzdCBjaGVjayB5byBzZWxmLCB5b3UgYXJlIG5vdCBsb29raW5nIHRvbyBnb29kLi4uJyB9XHJcbiAgICBdO1xyXG5cclxuICAgICRzY29wZS5hZGRBbGVydCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAkc2NvcGUuYWxlcnRzLnB1c2goe3R5cGU6ICdkYW5nZXInLCBtc2c6ICdPaCBzbmFwISBDaGFuZ2UgYSBmZXcgdGhpbmdzIHVwIGFuZCB0cnkgc3VibWl0dGluZyBhZ2Fpbi4nfSk7XHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS5jbG9zZUFsZXJ0ID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgJHNjb3BlLmFsZXJ0cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfTtcclxuICB9XSlcclxuICA7IFxyXG4gIGFwcC5jb250cm9sbGVyKCdCdXR0b25zRGVtb0N0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG4gICAgJHNjb3BlLnNpbmdsZU1vZGVsID0gMTtcclxuXHJcbiAgICAkc2NvcGUucmFkaW9Nb2RlbCA9ICdNaWRkbGUnO1xyXG5cclxuICAgICRzY29wZS5jaGVja01vZGVsID0ge1xyXG4gICAgICBsZWZ0OiBmYWxzZSxcclxuICAgICAgbWlkZGxlOiB0cnVlLFxyXG4gICAgICByaWdodDogZmFsc2VcclxuICAgIH07XHJcbiAgfV0pXHJcbiAgOyBcclxuICBhcHAuY29udHJvbGxlcignQ2Fyb3VzZWxEZW1vQ3RybCcsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbiAgICAkc2NvcGUubXlJbnRlcnZhbCA9IDUwMDA7XHJcbiAgICB2YXIgc2xpZGVzID0gJHNjb3BlLnNsaWRlcyA9IFtdO1xyXG4gICAgJHNjb3BlLmFkZFNsaWRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHNsaWRlcy5wdXNoKHtcclxuICAgICAgICBpbWFnZTogJ2ltZy9jJyArIHNsaWRlcy5sZW5ndGggKyAnLmpwZycsXHJcbiAgICAgICAgdGV4dDogWydDYXJvdXNlbCB0ZXh0ICMwJywnQ2Fyb3VzZWwgdGV4dCAjMScsJ0Nhcm91c2VsIHRleHQgIzInLCdDYXJvdXNlbCB0ZXh0ICMzJ11bc2xpZGVzLmxlbmd0aCAlIDRdXHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGZvciAodmFyIGk9MDsgaTw0OyBpKyspIHtcclxuICAgICAgJHNjb3BlLmFkZFNsaWRlKCk7XHJcbiAgICB9XHJcbiAgfV0pXHJcbiAgOyBcclxuICBhcHAuY29udHJvbGxlcignRHJvcGRvd25EZW1vQ3RybCcsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbiAgICAkc2NvcGUuaXRlbXMgPSBbXHJcbiAgICAgICdUaGUgZmlyc3QgY2hvaWNlIScsXHJcbiAgICAgICdBbmQgYW5vdGhlciBjaG9pY2UgZm9yIHlvdS4nLFxyXG4gICAgICAnYnV0IHdhaXQhIEEgdGhpcmQhJ1xyXG4gICAgXTtcclxuXHJcbiAgICAkc2NvcGUuc3RhdHVzID0ge1xyXG4gICAgICBpc29wZW46IGZhbHNlXHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS50b2dnbGVkID0gZnVuY3Rpb24ob3Blbikge1xyXG4gICAgICAvL2NvbnNvbGUubG9nKCdEcm9wZG93biBpcyBub3c6ICcsIG9wZW4pO1xyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUudG9nZ2xlRHJvcGRvd24gPSBmdW5jdGlvbigkZXZlbnQpIHtcclxuICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgJHNjb3BlLnN0YXR1cy5pc29wZW4gPSAhJHNjb3BlLnN0YXR1cy5pc29wZW47XHJcbiAgICB9O1xyXG4gIH1dKVxyXG4gIDsgXHJcbiAgYXBwLmNvbnRyb2xsZXIoJ01vZGFsSW5zdGFuY2VDdHJsJywgWyckc2NvcGUnLCAnJG1vZGFsSW5zdGFuY2UnLCAnaXRlbXMnLCBmdW5jdGlvbigkc2NvcGUsICRtb2RhbEluc3RhbmNlLCBpdGVtcykge1xyXG4gICAgJHNjb3BlLml0ZW1zID0gaXRlbXM7XHJcbiAgICAkc2NvcGUuc2VsZWN0ZWQgPSB7XHJcbiAgICAgIGl0ZW06ICRzY29wZS5pdGVtc1swXVxyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICRtb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5zZWxlY3RlZC5pdGVtKTtcclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgJG1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICB9O1xyXG4gIH1dKVxyXG4gIDsgXHJcbiAgYXBwLmNvbnRyb2xsZXIoJ01vZGFsRGVtb0N0cmwnLCBbJyRzY29wZScsICckbW9kYWwnLCAnJGxvZycsIGZ1bmN0aW9uKCRzY29wZSwgJG1vZGFsLCAkbG9nKSB7XHJcbiAgICAkc2NvcGUuaXRlbXMgPSBbJ2l0ZW0xJywgJ2l0ZW0yJywgJ2l0ZW0zJ107XHJcbiAgICAkc2NvcGUub3BlbiA9IGZ1bmN0aW9uIChzaXplKSB7XHJcbiAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJG1vZGFsLm9wZW4oe1xyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnbXlNb2RhbENvbnRlbnQuaHRtbCcsXHJcbiAgICAgICAgY29udHJvbGxlcjogJ01vZGFsSW5zdGFuY2VDdHJsJyxcclxuICAgICAgICBzaXplOiBzaXplLFxyXG4gICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgIGl0ZW1zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuaXRlbXM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHNlbGVjdGVkSXRlbSkge1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZCA9IHNlbGVjdGVkSXRlbTtcclxuICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICRsb2cuaW5mbygnTW9kYWwgZGlzbWlzc2VkIGF0OiAnICsgbmV3IERhdGUoKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICB9XSlcclxuICA7IFxyXG4gIGFwcC5jb250cm9sbGVyKCdQYWdpbmF0aW9uRGVtb0N0cmwnLCBbJyRzY29wZScsICckbG9nJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9nKSB7XHJcbiAgICAkc2NvcGUudG90YWxJdGVtcyA9IDY0O1xyXG4gICAgJHNjb3BlLmN1cnJlbnRQYWdlID0gNDtcclxuXHJcbiAgICAkc2NvcGUuc2V0UGFnZSA9IGZ1bmN0aW9uIChwYWdlTm8pIHtcclxuICAgICAgJHNjb3BlLmN1cnJlbnRQYWdlID0gcGFnZU5vO1xyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUucGFnZUNoYW5nZWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgJGxvZy5pbmZvKCdQYWdlIGNoYW5nZWQgdG86ICcgKyAkc2NvcGUuY3VycmVudFBhZ2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUubWF4U2l6ZSA9IDU7XHJcbiAgICAkc2NvcGUuYmlnVG90YWxJdGVtcyA9IDE3NTtcclxuICAgICRzY29wZS5iaWdDdXJyZW50UGFnZSA9IDE7XHJcbiAgfV0pXHJcbiAgOyBcclxuICBhcHAuY29udHJvbGxlcignUG9wb3ZlckRlbW9DdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxuICAgICRzY29wZS5keW5hbWljUG9wb3ZlciA9ICdIZWxsbywgV29ybGQhJztcclxuICAgICRzY29wZS5keW5hbWljUG9wb3ZlclRpdGxlID0gJ1RpdGxlJztcclxuICB9XSlcclxuICA7IFxyXG4gIGFwcC5jb250cm9sbGVyKCdQcm9ncmVzc0RlbW9DdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxuICAgICRzY29wZS5tYXggPSAyMDA7XHJcblxyXG4gICAgJHNjb3BlLnJhbmRvbSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgdmFsdWUgPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTAwKSArIDEpO1xyXG4gICAgICB2YXIgdHlwZTtcclxuXHJcbiAgICAgIGlmICh2YWx1ZSA8IDI1KSB7XHJcbiAgICAgICAgdHlwZSA9ICdzdWNjZXNzJztcclxuICAgICAgfSBlbHNlIGlmICh2YWx1ZSA8IDUwKSB7XHJcbiAgICAgICAgdHlwZSA9ICdpbmZvJztcclxuICAgICAgfSBlbHNlIGlmICh2YWx1ZSA8IDc1KSB7XHJcbiAgICAgICAgdHlwZSA9ICd3YXJuaW5nJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0eXBlID0gJ2Rhbmdlcic7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICRzY29wZS5zaG93V2FybmluZyA9ICh0eXBlID09PSAnZGFuZ2VyJyB8fCB0eXBlID09PSAnd2FybmluZycpO1xyXG5cclxuICAgICAgJHNjb3BlLmR5bmFtaWMgPSB2YWx1ZTtcclxuICAgICAgJHNjb3BlLnR5cGUgPSB0eXBlO1xyXG4gICAgfTtcclxuICAgICRzY29wZS5yYW5kb20oKTtcclxuXHJcbiAgICAkc2NvcGUucmFuZG9tU3RhY2tlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAkc2NvcGUuc3RhY2tlZCA9IFtdO1xyXG4gICAgICB2YXIgdHlwZXMgPSBbJ3N1Y2Nlc3MnLCAnaW5mbycsICd3YXJuaW5nJywgJ2RhbmdlciddO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogNCkgKyAxKTsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgdmFyIGluZGV4ID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDQpKTtcclxuICAgICAgICAgICRzY29wZS5zdGFja2VkLnB1c2goe1xyXG4gICAgICAgICAgICB2YWx1ZTogTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDMwKSArIDEpLFxyXG4gICAgICAgICAgICB0eXBlOiB0eXBlc1tpbmRleF1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLnJhbmRvbVN0YWNrZWQoKTtcclxuICB9XSlcclxuICA7IFxyXG4gIGFwcC5jb250cm9sbGVyKCdUYWJzRGVtb0N0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG4gICAgJHNjb3BlLnRhYnMgPSBbXHJcbiAgICAgIHsgdGl0bGU6J0R5bmFtaWMgVGl0bGUgMScsIGNvbnRlbnQ6J0R5bmFtaWMgY29udGVudCAxJyB9LFxyXG4gICAgICB7IHRpdGxlOidEeW5hbWljIFRpdGxlIDInLCBjb250ZW50OidEeW5hbWljIGNvbnRlbnQgMicsIGRpc2FibGVkOiB0cnVlIH1cclxuICAgIF07XHJcbiAgfV0pXHJcbiAgOyBcclxuICBhcHAuY29udHJvbGxlcignUmF0aW5nRGVtb0N0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG4gICAgJHNjb3BlLnJhdGUgPSA3O1xyXG4gICAgJHNjb3BlLm1heCA9IDEwO1xyXG4gICAgJHNjb3BlLmlzUmVhZG9ubHkgPSBmYWxzZTtcclxuXHJcbiAgICAkc2NvcGUuaG92ZXJpbmdPdmVyID0gZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgJHNjb3BlLm92ZXJTdGFyID0gdmFsdWU7XHJcbiAgICAgICRzY29wZS5wZXJjZW50ID0gMTAwICogKHZhbHVlIC8gJHNjb3BlLm1heCk7XHJcbiAgICB9O1xyXG4gIH1dKVxyXG4gIDsgXHJcbiAgYXBwLmNvbnRyb2xsZXIoJ1Rvb2x0aXBEZW1vQ3RybCcsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbiAgICAkc2NvcGUuZHluYW1pY1Rvb2x0aXAgPSAnSGVsbG8sIFdvcmxkISc7XHJcbiAgICAkc2NvcGUuZHluYW1pY1Rvb2x0aXBUZXh0ID0gJ2R5bmFtaWMnO1xyXG4gICAgJHNjb3BlLmh0bWxUb29sdGlwID0gJ0lcXCd2ZSBiZWVuIG1hZGUgPGI+Ym9sZDwvYj4hJztcclxuICB9XSlcclxuICA7IFxyXG4gIGFwcC5jb250cm9sbGVyKCdUeXBlYWhlYWREZW1vQ3RybCcsIFsnJHNjb3BlJywgJyRodHRwJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCkge1xyXG4gICAgJHNjb3BlLnNlbGVjdGVkID0gdW5kZWZpbmVkO1xyXG4gICAgJHNjb3BlLnN0YXRlcyA9IFsnQWxhYmFtYScsICdBbGFza2EnLCAnQXJpem9uYScsICdBcmthbnNhcycsICdDYWxpZm9ybmlhJywgJ0NvbG9yYWRvJywgJ0Nvbm5lY3RpY3V0JywgJ0RlbGF3YXJlJywgJ0Zsb3JpZGEnLCAnR2VvcmdpYScsICdIYXdhaWknLCAnSWRhaG8nLCAnSWxsaW5vaXMnLCAnSW5kaWFuYScsICdJb3dhJywgJ0thbnNhcycsICdLZW50dWNreScsICdMb3Vpc2lhbmEnLCAnTWFpbmUnLCAnTWFyeWxhbmQnLCAnTWFzc2FjaHVzZXR0cycsICdNaWNoaWdhbicsICdNaW5uZXNvdGEnLCAnTWlzc2lzc2lwcGknLCAnTWlzc291cmknLCAnTW9udGFuYScsICdOZWJyYXNrYScsICdOZXZhZGEnLCAnTmV3IEhhbXBzaGlyZScsICdOZXcgSmVyc2V5JywgJ05ldyBNZXhpY28nLCAnTmV3IFlvcmsnLCAnTm9ydGggRGFrb3RhJywgJ05vcnRoIENhcm9saW5hJywgJ09oaW8nLCAnT2tsYWhvbWEnLCAnT3JlZ29uJywgJ1Blbm5zeWx2YW5pYScsICdSaG9kZSBJc2xhbmQnLCAnU291dGggQ2Fyb2xpbmEnLCAnU291dGggRGFrb3RhJywgJ1Rlbm5lc3NlZScsICdUZXhhcycsICdVdGFoJywgJ1Zlcm1vbnQnLCAnVmlyZ2luaWEnLCAnV2FzaGluZ3RvbicsICdXZXN0IFZpcmdpbmlhJywgJ1dpc2NvbnNpbicsICdXeW9taW5nJ107XHJcbiAgICAvLyBBbnkgZnVuY3Rpb24gcmV0dXJuaW5nIGEgcHJvbWlzZSBvYmplY3QgY2FuIGJlIHVzZWQgdG8gbG9hZCB2YWx1ZXMgYXN5bmNocm9ub3VzbHlcclxuICAgICRzY29wZS5nZXRMb2NhdGlvbiA9IGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICByZXR1cm4gJGh0dHAuZ2V0KCdodHRwOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9nZW9jb2RlL2pzb24nLCB7XHJcbiAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICBhZGRyZXNzOiB2YWwsXHJcbiAgICAgICAgICBzZW5zb3I6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgdmFyIGFkZHJlc3NlcyA9IFtdO1xyXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChyZXMuZGF0YS5yZXN1bHRzLCBmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgIGFkZHJlc3Nlcy5wdXNoKGl0ZW0uZm9ybWF0dGVkX2FkZHJlc3MpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhZGRyZXNzZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICB9XSlcclxuICA7IFxyXG4gIGFwcC5jb250cm9sbGVyKCdEYXRlcGlja2VyRGVtb0N0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG4gICAgJHNjb3BlLnRvZGF5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICRzY29wZS5kdCA9IG5ldyBEYXRlKCk7XHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLnRvZGF5KCk7XHJcblxyXG4gICAgJHNjb3BlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAkc2NvcGUuZHQgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEaXNhYmxlIHdlZWtlbmQgc2VsZWN0aW9uXHJcbiAgICAkc2NvcGUuZGlzYWJsZWQgPSBmdW5jdGlvbihkYXRlLCBtb2RlKSB7XHJcbiAgICAgIHJldHVybiAoIG1vZGUgPT09ICdkYXknICYmICggZGF0ZS5nZXREYXkoKSA9PT0gMCB8fCBkYXRlLmdldERheSgpID09PSA2ICkgKTtcclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLnRvZ2dsZU1pbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAkc2NvcGUubWluRGF0ZSA9ICRzY29wZS5taW5EYXRlID8gbnVsbCA6IG5ldyBEYXRlKCk7XHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLnRvZ2dsZU1pbigpO1xyXG5cclxuICAgICRzY29wZS5vcGVuID0gZnVuY3Rpb24oJGV2ZW50KSB7XHJcbiAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAkc2NvcGUub3BlbmVkID0gdHJ1ZTtcclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLmRhdGVPcHRpb25zID0ge1xyXG4gICAgICBmb3JtYXRZZWFyOiAneXknLFxyXG4gICAgICBzdGFydGluZ0RheTogMSxcclxuICAgICAgY2xhc3M6ICdkYXRlcGlja2VyJ1xyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUuaW5pdERhdGUgPSBuZXcgRGF0ZSgnMjAxNi0xNS0yMCcpO1xyXG4gICAgJHNjb3BlLmZvcm1hdHMgPSBbJ2RkLU1NTU0teXl5eScsICd5eXl5L01NL2RkJywgJ2RkLk1NLnl5eXknLCAnc2hvcnREYXRlJ107XHJcbiAgICAkc2NvcGUuZm9ybWF0ID0gJHNjb3BlLmZvcm1hdHNbMF07XHJcbiAgfV0pXHJcbiAgOyBcclxuICBhcHAuY29udHJvbGxlcignVGltZXBpY2tlckRlbW9DdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxuICAgICRzY29wZS5teXRpbWUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICRzY29wZS5oc3RlcCA9IDE7XHJcbiAgICAkc2NvcGUubXN0ZXAgPSAxNTtcclxuXHJcbiAgICAkc2NvcGUub3B0aW9ucyA9IHtcclxuICAgICAgaHN0ZXA6IFsxLCAyLCAzXSxcclxuICAgICAgbXN0ZXA6IFsxLCA1LCAxMCwgMTUsIDI1LCAzMF1cclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLmlzbWVyaWRpYW4gPSB0cnVlO1xyXG4gICAgJHNjb3BlLnRvZ2dsZU1vZGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgJHNjb3BlLmlzbWVyaWRpYW4gPSAhICRzY29wZS5pc21lcmlkaWFuO1xyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBkID0gbmV3IERhdGUoKTtcclxuICAgICAgZC5zZXRIb3VycyggMTQgKTtcclxuICAgICAgZC5zZXRNaW51dGVzKCAwICk7XHJcbiAgICAgICRzY29wZS5teXRpbWUgPSBkO1xyXG4gICAgfTtcclxuXHJcbiAgICAkc2NvcGUuY2hhbmdlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgLy9jb25zb2xlLmxvZygnVGltZSBjaGFuZ2VkIHRvOiAnICsgJHNjb3BlLm15dGltZSk7XHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS5jbGVhciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAkc2NvcGUubXl0aW1lID0gbnVsbDtcclxuICAgIH07XHJcbiAgfV0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ0dyaWRDdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbiAoJHNjb3BlKSB7XHJcbiAgICAgICAgJHNjb3BlLmdyaWRPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBjb2x1bW5EZWZzOiBbXHJcbiAgICAgICAgICAgICAgICB7ZmllbGQ6ICdpZCcsIGRpc3BsYXlOYW1lOiAnSWQnfSxcclxuICAgICAgICAgICAgICAgIHtmaWVsZDogJ25hbWUnLCBkaXNwbGF5TmFtZTogJ05hbWUnfSxcclxuICAgICAgICAgICAgICAgIHtuYW1lOiAnZWRpdCcsIGRpc3BsYXlOYW1lOiAnRWRpdCcsIGNlbGxUZW1wbGF0ZTogJzxidXR0b24gaWQ9XCJlZGl0QnRuXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuLXNtYWxsXCIgbmctY2xpY2s9XCJncmlkLmFwcFNjb3BlLmVkaXQocm93LmVudGl0eSlcIiA+RWRpdDwvYnV0dG9uPiAnfVxyXG4gICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGRhdGE6W1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICdpZCc6MSxcclxuICAgICAgICAgICAgICAgICAgICAnbmFtZSc6J3Rlc3QwMDEnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICdpZCc6MixcclxuICAgICAgICAgICAgICAgICAgICAnbmFtZSc6J3Rlc3QwMDInXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICdpZCc6MyxcclxuICAgICAgICAgICAgICAgICAgICAnbmFtZSc6J3Rlc3QwMDMnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICdpZCc6NCxcclxuICAgICAgICAgICAgICAgICAgICAnbmFtZSc6J3Rlc3QwMDQnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0gICBcclxuICAgICAgICB9O1xyXG5cclxuICAgIH1dKTsiLCJhcHAuY29udHJvbGxlcignVG9hc3RlckRlbW9DdHJsJywgWyckc2NvcGUnLCAndG9hc3RlcicsIGZ1bmN0aW9uKCRzY29wZSwgdG9hc3Rlcikge1xyXG4gICAgJHNjb3BlLnRvYXN0ZXIgPSB7XHJcbiAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgIHRpdGxlOiAnVGl0bGUnLFxyXG4gICAgICAgIHRleHQ6ICdNZXNzYWdlJ1xyXG4gICAgfTtcclxuICAgICRzY29wZS5wb3AgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRvYXN0ZXIucG9wKCRzY29wZS50b2FzdGVyLnR5cGUsICRzY29wZS50b2FzdGVyLnRpdGxlLCAkc2NvcGUudG9hc3Rlci50ZXh0KTtcclxuICAgIH07XHJcbn1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuICAuZGlyZWN0aXZlKCdzZXROZ0FuaW1hdGUnLCBbJyRhbmltYXRlJywgZnVuY3Rpb24gKCRhbmltYXRlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcclxuICAgICAgICAgICAgJHNjb3BlLiR3YXRjaCggZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLiRldmFsKCRhdHRycy5zZXROZ0FuaW1hdGUsICRzY29wZSk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHZhbG5ldywgdmFsb2xkKXtcclxuICAgICAgICAgICAgICAgICRhbmltYXRlLmVuYWJsZWQoISF2YWxuZXcsICRlbGVtZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICB9XSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXHJcbiAgLmRpcmVjdGl2ZSgndWlCdXR0ZXJiYXInLCBbJyRyb290U2NvcGUnLCAnJGFuY2hvclNjcm9sbCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRhbmNob3JTY3JvbGwpIHtcclxuICAgICByZXR1cm4ge1xyXG4gICAgICByZXN0cmljdDogJ0FDJyxcclxuICAgICAgdGVtcGxhdGU6JzxzcGFuIGNsYXNzPVwiYmFyXCI+PC9zcGFuPicsXHJcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbCwgYXR0cnMpIHsgICAgICAgIFxyXG4gICAgICAgIGVsLmFkZENsYXNzKCdidXR0ZXJiYXIgaGlkZScpO1xyXG4gICAgICAgIHNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgJGFuY2hvclNjcm9sbCgpO1xyXG4gICAgICAgICAgZWwucmVtb3ZlQ2xhc3MoJ2hpZGUnKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oIGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlICkge1xyXG4gICAgICAgICAgZXZlbnQudGFyZ2V0U2NvcGUuJHdhdGNoKCckdmlld0NvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBlbC5hZGRDbGFzcygnaGlkZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICB9O1xyXG4gIH1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuICAuZGlyZWN0aXZlKCd1aUZvY3VzJywgZnVuY3Rpb24oJHRpbWVvdXQsICRwYXJzZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHIpIHtcclxuICAgICAgICB2YXIgbW9kZWwgPSAkcGFyc2UoYXR0ci51aUZvY3VzKTtcclxuICAgICAgICBzY29wZS4kd2F0Y2gobW9kZWwsIGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICBpZih2YWx1ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICBlbGVtZW50WzBdLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGVsZW1lbnQuYmluZCgnYmx1cicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgIHNjb3BlLiRhcHBseShtb2RlbC5hc3NpZ24oc2NvcGUsIGZhbHNlKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSk7IiwiIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gIC5kaXJlY3RpdmUoJ3VpRnVsbHNjcmVlbicsIFsndWlMb2FkJywgJyRkb2N1bWVudCcsICckd2luZG93JywgZnVuY3Rpb24odWlMb2FkLCAkZG9jdW1lbnQsICR3aW5kb3cpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHJlc3RyaWN0OiAnQUMnLFxyXG4gICAgICB0ZW1wbGF0ZTonPGkgY2xhc3M9XCJmYSBmYS1leHBhbmQgZmEtZncgdGV4dFwiPjwvaT48aSBjbGFzcz1cImZhIGZhLWNvbXByZXNzIGZhLWZ3IHRleHQtYWN0aXZlXCI+PC9pPicsXHJcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbCwgYXR0cikge1xyXG4gICAgICAgIGVsLmFkZENsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgdWlMb2FkLmxvYWQoJ3ZlbmRvci9saWJzL3NjcmVlbmZ1bGwubWluLmpzJykudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgLy8gZGlzYWJsZSBvbiBpZTExXHJcbiAgICAgICAgICBpZiAoc2NyZWVuZnVsbC5lbmFibGVkICYmICFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9UcmlkZW50LipydjoxMVxcLi8pKSB7XHJcbiAgICAgICAgICAgIGVsLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbC5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0O1xyXG4gICAgICAgICAgICBhdHRyLnRhcmdldCAmJiAoIHRhcmdldCA9ICQoYXR0ci50YXJnZXQpWzBdICk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNjcmVlbmZ1bGwudG9nZ2xlKHRhcmdldCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgICRkb2N1bWVudC5vbihzY3JlZW5mdWxsLnJhdy5mdWxsc2NyZWVuY2hhbmdlLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmKHNjcmVlbmZ1bGwuaXNGdWxsc2NyZWVuKXtcclxuICAgICAgICAgICAgICBlbC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIGVsLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfV0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiAwLjEuMVxyXG4gKiBHZW5lcmFsLXB1cnBvc2UgalF1ZXJ5IHdyYXBwZXIuIFNpbXBseSBwYXNzIHRoZSBwbHVnaW4gbmFtZSBhcyB0aGUgZXhwcmVzc2lvbi5cclxuICpcclxuICogSXQgaXMgcG9zc2libGUgdG8gc3BlY2lmeSBhIGRlZmF1bHQgc2V0IG9mIHBhcmFtZXRlcnMgZm9yIGVhY2ggalF1ZXJ5IHBsdWdpbi5cclxuICogVW5kZXIgdGhlIGpxIGtleSwgbmFtZXNwYWNlIGVhY2ggcGx1Z2luIGJ5IHRoYXQgd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8gdWktanEuXHJcbiAqIFVuZm9ydHVuYXRlbHksIGF0IHRoaXMgdGltZSB5b3UgY2FuIG9ubHkgcHJlLWRlZmluZSB0aGUgZmlyc3QgcGFyYW1ldGVyLlxyXG4gKiBAZXhhbXBsZSB7IGpxIDogeyBkYXRlcGlja2VyIDogeyBzaG93T246J2NsaWNrJyB9IH0gfVxyXG4gKlxyXG4gKiBAcGFyYW0gdWktanEge3N0cmluZ30gVGhlICRlbG0uW3BsdWdpbk5hbWVdKCkgdG8gY2FsbC5cclxuICogQHBhcmFtIFt1aS1vcHRpb25zXSB7bWl4ZWR9IEV4cHJlc3Npb24gdG8gYmUgZXZhbHVhdGVkIGFuZCBwYXNzZWQgYXMgb3B0aW9ucyB0byB0aGUgZnVuY3Rpb25cclxuICogICAgIE11bHRpcGxlIHBhcmFtZXRlcnMgY2FuIGJlIHNlcGFyYXRlZCBieSBjb21tYXNcclxuICogQHBhcmFtIFt1aS1yZWZyZXNoXSB7ZXhwcmVzc2lvbn0gV2F0Y2ggZXhwcmVzc2lvbiBhbmQgcmVmaXJlIHBsdWdpbiBvbiBjaGFuZ2VzXHJcbiAqXHJcbiAqIEBleGFtcGxlIDxpbnB1dCB1aS1qcT1cImRhdGVwaWNrZXJcIiB1aS1vcHRpb25zPVwie3Nob3dPbjonY2xpY2snfSxzZWNvbmRQYXJhbWV0ZXIsdGhpcmRQYXJhbWV0ZXJcIiB1aS1yZWZyZXNoPVwiaUNoYW5nZVwiPlxyXG4gKi9cclxuYW5ndWxhci5tb2R1bGUoJ3VpLmpxJywgWyd1aS5sb2FkJ10pLlxyXG4gIHZhbHVlKCd1aUpxQ29uZmlnJywge30pLlxyXG4gIGRpcmVjdGl2ZSgndWlKcScsIFsndWlKcUNvbmZpZycsICdKUV9DT05GSUcnLCAndWlMb2FkJywgJyR0aW1lb3V0JywgZnVuY3Rpb24gdWlKcUluamVjdGluZ0Z1bmN0aW9uKHVpSnFDb25maWcsIEpRX0NPTkZJRywgdWlMb2FkLCAkdGltZW91dCkge1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgIGNvbXBpbGU6IGZ1bmN0aW9uIHVpSnFDb21waWxpbmdGdW5jdGlvbih0RWxtLCB0QXR0cnMpIHtcclxuXHJcbiAgICAgIGlmICghYW5ndWxhci5pc0Z1bmN0aW9uKHRFbG1bdEF0dHJzLnVpSnFdKSAmJiAhSlFfQ09ORklHW3RBdHRycy51aUpxXSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndWktanE6IFRoZSBcIicgKyB0QXR0cnMudWlKcSArICdcIiBmdW5jdGlvbiBkb2VzIG5vdCBleGlzdCcpO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBvcHRpb25zID0gdWlKcUNvbmZpZyAmJiB1aUpxQ29uZmlnW3RBdHRycy51aUpxXTtcclxuXHJcbiAgICAgIHJldHVybiBmdW5jdGlvbiB1aUpxTGlua2luZ0Z1bmN0aW9uKHNjb3BlLCBlbG0sIGF0dHJzKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldE9wdGlvbnMoKXtcclxuICAgICAgICAgIHZhciBsaW5rT3B0aW9ucyA9IFtdO1xyXG5cclxuICAgICAgICAgIC8vIElmIHVpLW9wdGlvbnMgYXJlIHBhc3NlZCwgbWVyZ2UgKG9yIG92ZXJyaWRlKSB0aGVtIG9udG8gZ2xvYmFsIGRlZmF1bHRzIGFuZCBwYXNzIHRvIHRoZSBqUXVlcnkgbWV0aG9kXHJcbiAgICAgICAgICBpZiAoYXR0cnMudWlPcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGxpbmtPcHRpb25zID0gc2NvcGUuJGV2YWwoJ1snICsgYXR0cnMudWlPcHRpb25zICsgJ10nKTtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNPYmplY3Qob3B0aW9ucykgJiYgYW5ndWxhci5pc09iamVjdChsaW5rT3B0aW9uc1swXSkpIHtcclxuICAgICAgICAgICAgICBsaW5rT3B0aW9uc1swXSA9IGFuZ3VsYXIuZXh0ZW5kKHt9LCBvcHRpb25zLCBsaW5rT3B0aW9uc1swXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICBsaW5rT3B0aW9ucyA9IFtvcHRpb25zXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBsaW5rT3B0aW9ucztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIGNoYW5nZSBjb21wYXRpYmlsaXR5IGlzIGVuYWJsZWQsIHRoZSBmb3JtIGlucHV0J3MgXCJjaGFuZ2VcIiBldmVudCB3aWxsIHRyaWdnZXIgYW4gXCJpbnB1dFwiIGV2ZW50XHJcbiAgICAgICAgaWYgKGF0dHJzLm5nTW9kZWwgJiYgZWxtLmlzKCdzZWxlY3QsaW5wdXQsdGV4dGFyZWEnKSkge1xyXG4gICAgICAgICAgZWxtLmJpbmQoJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBlbG0udHJpZ2dlcignaW5wdXQnKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2FsbCBqUXVlcnkgbWV0aG9kIGFuZCBwYXNzIHJlbGV2YW50IG9wdGlvbnNcclxuICAgICAgICBmdW5jdGlvbiBjYWxsUGx1Z2luKCkge1xyXG4gICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGVsbVthdHRycy51aUpxXS5hcHBseShlbG0sIGdldE9wdGlvbnMoKSk7XHJcbiAgICAgICAgICB9LCAwLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWZyZXNoKCl7XHJcbiAgICAgICAgICAvLyBJZiB1aS1yZWZyZXNoIGlzIHVzZWQsIHJlLWZpcmUgdGhlIHRoZSBtZXRob2QgdXBvbiBldmVyeSBjaGFuZ2VcclxuICAgICAgICAgIGlmIChhdHRycy51aVJlZnJlc2gpIHtcclxuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLnVpUmVmcmVzaCwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgY2FsbFBsdWdpbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggSlFfQ09ORklHW2F0dHJzLnVpSnFdICkge1xyXG4gICAgICAgICAgdWlMb2FkLmxvYWQoSlFfQ09ORklHW2F0dHJzLnVpSnFdKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjYWxsUGx1Z2luKCk7XHJcbiAgICAgICAgICAgIHJlZnJlc2goKTtcclxuICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjYWxsUGx1Z2luKCk7XHJcbiAgICAgICAgICByZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH07XHJcbn1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuICAuZGlyZWN0aXZlKCd1aU1vZHVsZScsIFsnTU9EVUxFX0NPTkZJRycsJ3VpTG9hZCcsICckY29tcGlsZScsIGZ1bmN0aW9uKE1PRFVMRV9DT05GSUcsIHVpTG9hZCwgJGNvbXBpbGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uIChlbCwgYXR0cnMpIHtcclxuICAgICAgICB2YXIgY29udGVudHMgPSBlbC5jb250ZW50cygpLmNsb25lKCk7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbCwgYXR0cnMpe1xyXG4gICAgICAgICAgZWwuY29udGVudHMoKS5yZW1vdmUoKTtcclxuICAgICAgICAgIHVpTG9hZC5sb2FkKE1PRFVMRV9DT05GSUdbYXR0cnMudWlNb2R1bGVdKVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJGNvbXBpbGUoY29udGVudHMpKHNjb3BlLCBmdW5jdGlvbihjbG9uZWRFbGVtZW50LCBzY29wZSkge1xyXG4gICAgICAgICAgICAgIGVsLmFwcGVuZChjbG9uZWRFbGVtZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfV0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gIC5kaXJlY3RpdmUoJ3VpTmF2JywgWyckdGltZW91dCcsIGZ1bmN0aW9uKCR0aW1lb3V0KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByZXN0cmljdDogJ0FDJyxcclxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsLCBhdHRyKSB7XHJcbiAgICAgICAgdmFyIF93aW5kb3cgPSAkKHdpbmRvdyksIFxyXG4gICAgICAgIF9tYiA9IDc2OCwgXHJcbiAgICAgICAgd3JhcCA9ICQoJy5hcHAtYXNpZGUnKSwgXHJcbiAgICAgICAgbmV4dCwgXHJcbiAgICAgICAgYmFja2Ryb3AgPSAnLmRyb3Bkb3duLWJhY2tkcm9wJztcclxuICAgICAgICAvLyB1bmZvbGRlZFxyXG4gICAgICAgIGVsLm9uKCdjbGljaycsICdhJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgbmV4dCAmJiBuZXh0LnRyaWdnZXIoJ21vdXNlbGVhdmUubmF2Jyk7XHJcbiAgICAgICAgICB2YXIgX3RoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgX3RoaXMucGFyZW50KCkuc2libGluZ3MoIFwiLmFjdGl2ZVwiICkudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgX3RoaXMubmV4dCgpLmlzKCd1bCcpICYmICBfdGhpcy5wYXJlbnQoKS50b2dnbGVDbGFzcygnYWN0aXZlJykgJiYgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIC8vIG1vYmlsZVxyXG4gICAgICAgICAgX3RoaXMubmV4dCgpLmlzKCd1bCcpIHx8ICggKCBfd2luZG93LndpZHRoKCkgPCBfbWIgKSAmJiAkKCcuYXBwLWFzaWRlJykucmVtb3ZlQ2xhc3MoJ3Nob3cgb2ZmLXNjcmVlbicpICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGZvbGRlZCAmIGZpeGVkXHJcbiAgICAgICAgZWwub24oJ21vdXNlZW50ZXInLCAnYScsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgbmV4dCAmJiBuZXh0LnRyaWdnZXIoJ21vdXNlbGVhdmUubmF2Jyk7XHJcbiAgICAgICAgICAkKCc+IC5uYXYnLCB3cmFwKS5yZW1vdmUoKTtcclxuICAgICAgICAgIGlmICggISQoJy5hcHAtYXNpZGUtZml4ZWQuYXBwLWFzaWRlLWZvbGRlZCcpLmxlbmd0aCB8fCAoIF93aW5kb3cud2lkdGgoKSA8IF9tYiApIHx8ICQoJy5hcHAtYXNpZGUtZG9jaycpLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICAgdmFyIF90aGlzID0gJChlLnRhcmdldClcclxuICAgICAgICAgICwgdG9wXHJcbiAgICAgICAgICAsIHdfaCA9ICQod2luZG93KS5oZWlnaHQoKVxyXG4gICAgICAgICAgLCBvZmZzZXQgPSA1MFxyXG4gICAgICAgICAgLCBtaW4gPSAxNTA7XHJcblxyXG4gICAgICAgICAgIV90aGlzLmlzKCdhJykgJiYgKF90aGlzID0gX3RoaXMuY2xvc2VzdCgnYScpKTtcclxuICAgICAgICAgIGlmKCBfdGhpcy5uZXh0KCkuaXMoJ3VsJykgKXtcclxuICAgICAgICAgICAgIG5leHQgPSBfdGhpcy5uZXh0KCk7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICBcclxuICAgICAgICAgIF90aGlzLnBhcmVudCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgIHRvcCA9IF90aGlzLnBhcmVudCgpLnBvc2l0aW9uKCkudG9wICsgb2Zmc2V0O1xyXG4gICAgICAgICAgbmV4dC5jc3MoJ3RvcCcsIHRvcCk7XHJcbiAgICAgICAgICBpZiggdG9wICsgbmV4dC5oZWlnaHQoKSA+IHdfaCApe1xyXG4gICAgICAgICAgICBuZXh0LmNzcygnYm90dG9tJywgMCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZih0b3AgKyBtaW4gPiB3X2gpe1xyXG4gICAgICAgICAgICBuZXh0LmNzcygnYm90dG9tJywgd19oIC0gdG9wIC0gb2Zmc2V0KS5jc3MoJ3RvcCcsICdhdXRvJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBuZXh0LmFwcGVuZFRvKHdyYXApO1xyXG5cclxuICAgICAgICAgIG5leHQub24oJ21vdXNlbGVhdmUubmF2JywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICQoYmFja2Ryb3ApLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBuZXh0LmFwcGVuZFRvKF90aGlzLnBhcmVudCgpKTtcclxuICAgICAgICAgICAgbmV4dC5vZmYoJ21vdXNlbGVhdmUubmF2JykuY3NzKCd0b3AnLCAnYXV0bycpLmNzcygnYm90dG9tJywgJ2F1dG8nKTtcclxuICAgICAgICAgICAgX3RoaXMucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgJCgnLnNtYXJ0JykubGVuZ3RoICYmICQoJzxkaXYgY2xhc3M9XCJkcm9wZG93bi1iYWNrZHJvcFwiLz4nKS5pbnNlcnRBZnRlcignLmFwcC1hc2lkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKG5leHQpe1xyXG4gICAgICAgICAgICBuZXh0ICYmIG5leHQudHJpZ2dlcignbW91c2VsZWF2ZS5uYXYnKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgd3JhcC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgbmV4dCAmJiBuZXh0LnRyaWdnZXIoJ21vdXNlbGVhdmUubmF2Jyk7XHJcbiAgICAgICAgICAkKCc+IC5uYXYnLCB3cmFwKS5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXHJcbiAgLmRpcmVjdGl2ZSgndWlTY3JvbGwnLCBbJyRsb2NhdGlvbicsICckYW5jaG9yU2Nyb2xsJywgZnVuY3Rpb24oJGxvY2F0aW9uLCAkYW5jaG9yU2Nyb2xsKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByZXN0cmljdDogJ0FDJyxcclxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsLCBhdHRyKSB7XHJcbiAgICAgICAgZWwub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgJGxvY2F0aW9uLmhhc2goYXR0ci51aVNjcm9sbCk7XHJcbiAgICAgICAgICAkYW5jaG9yU2Nyb2xsKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfV0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4gIC5kaXJlY3RpdmUoJ3VpU2hpZnQnLCBbJyR0aW1lb3V0JywgZnVuY3Rpb24oJHRpbWVvdXQpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbCwgYXR0cikge1xyXG4gICAgICAgIC8vIGdldCB0aGUgJHByZXYgb3IgJHBhcmVudCBvZiB0aGlzIGVsXHJcbiAgICAgICAgdmFyIF9lbCA9ICQoZWwpLFxyXG4gICAgICAgICAgICBfd2luZG93ID0gJCh3aW5kb3cpLFxyXG4gICAgICAgICAgICBwcmV2ID0gX2VsLnByZXYoKSxcclxuICAgICAgICAgICAgcGFyZW50LFxyXG4gICAgICAgICAgICB3aWR0aCA9IF93aW5kb3cud2lkdGgoKVxyXG4gICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICFwcmV2Lmxlbmd0aCAmJiAocGFyZW50ID0gX2VsLnBhcmVudCgpKTtcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBzbSgpe1xyXG4gICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbWV0aG9kID0gYXR0ci51aVNoaWZ0O1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gYXR0ci50YXJnZXQ7XHJcbiAgICAgICAgICAgIF9lbC5oYXNDbGFzcygnaW4nKSB8fCBfZWxbbWV0aG9kXSh0YXJnZXQpLmFkZENsYXNzKCdpbicpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIG1kKCl7XHJcbiAgICAgICAgICBwYXJlbnQgJiYgcGFyZW50WydwcmVwZW5kJ10oZWwpO1xyXG4gICAgICAgICAgIXBhcmVudCAmJiBfZWxbJ2luc2VydEFmdGVyJ10ocHJldik7XHJcbiAgICAgICAgICBfZWwucmVtb3ZlQ2xhc3MoJ2luJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAod2lkdGggPCA3NjggJiYgc20oKSkgfHwgbWQoKTtcclxuXHJcbiAgICAgICAgX3dpbmRvdy5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBpZih3aWR0aCAhPT0gX3dpbmRvdy53aWR0aCgpKXtcclxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAoX3dpbmRvdy53aWR0aCgpIDwgNzY4ICYmIHNtKCkpIHx8IG1kKCk7XHJcbiAgICAgICAgICAgICAgd2lkdGggPSBfd2luZG93LndpZHRoKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuICAuZGlyZWN0aXZlKCd1aVRvZ2dsZUNsYXNzJywgWyckdGltZW91dCcsICckZG9jdW1lbnQnLCBmdW5jdGlvbigkdGltZW91dCwgJGRvY3VtZW50KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByZXN0cmljdDogJ0FDJyxcclxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsLCBhdHRyKSB7XHJcbiAgICAgICAgZWwub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgdmFyIGNsYXNzZXMgPSBhdHRyLnVpVG9nZ2xlQ2xhc3Muc3BsaXQoJywnKSxcclxuICAgICAgICAgICAgICB0YXJnZXRzID0gKGF0dHIudGFyZ2V0ICYmIGF0dHIudGFyZ2V0LnNwbGl0KCcsJykpIHx8IEFycmF5KGVsKSxcclxuICAgICAgICAgICAgICBrZXkgPSAwO1xyXG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGNsYXNzZXMsIGZ1bmN0aW9uKCBfY2xhc3MgKSB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSB0YXJnZXRzWyh0YXJnZXRzLmxlbmd0aCAmJiBrZXkpXTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgKCBfY2xhc3MuaW5kZXhPZiggJyonICkgIT09IC0xICkgJiYgbWFnaWMoX2NsYXNzLCB0YXJnZXQpO1xyXG4gICAgICAgICAgICAkKCB0YXJnZXQgKS50b2dnbGVDbGFzcyhfY2xhc3MpO1xyXG4gICAgICAgICAgICBrZXkgKys7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgICQoZWwpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICBmdW5jdGlvbiBtYWdpYyhfY2xhc3MsIHRhcmdldCl7XHJcbiAgICAgICAgICAgIHZhciBwYXR0ID0gbmV3IFJlZ0V4cCggJ1xcXFxzJyArIFxyXG4gICAgICAgICAgICAgICAgX2NsYXNzLlxyXG4gICAgICAgICAgICAgICAgICByZXBsYWNlKCAvXFwqL2csICdbQS1aYS16MC05LV9dKycgKS5cclxuICAgICAgICAgICAgICAgICAgc3BsaXQoICcgJyApLlxyXG4gICAgICAgICAgICAgICAgICBqb2luKCAnXFxcXHN8XFxcXHMnICkgKyBcclxuICAgICAgICAgICAgICAgICdcXFxccycsICdnJyApO1xyXG4gICAgICAgICAgICB2YXIgY24gPSAnICcgKyAkKHRhcmdldClbMF0uY2xhc3NOYW1lICsgJyAnO1xyXG4gICAgICAgICAgICB3aGlsZSAoIHBhdHQudGVzdCggY24gKSApIHtcclxuICAgICAgICAgICAgICBjbiA9IGNuLnJlcGxhY2UoIHBhdHQsICcgJyApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQodGFyZ2V0KVswXS5jbGFzc05hbWUgPSAkLnRyaW0oIGNuICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfV0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmFsLXB1cnBvc2UgdmFsaWRhdG9yIGZvciBuZ01vZGVsLlxyXG4gKiBhbmd1bGFyLmpzIGNvbWVzIHdpdGggc2V2ZXJhbCBidWlsdC1pbiB2YWxpZGF0aW9uIG1lY2hhbmlzbSBmb3IgaW5wdXQgZmllbGRzIChuZ1JlcXVpcmVkLCBuZ1BhdHRlcm4gZXRjLikgYnV0IHVzaW5nXHJcbiAqIGFuIGFyYml0cmFyeSB2YWxpZGF0aW9uIGZ1bmN0aW9uIHJlcXVpcmVzIGNyZWF0aW9uIG9mIGEgY3VzdG9tIGZvcm1hdHRlcnMgYW5kIC8gb3IgcGFyc2Vycy5cclxuICogVGhlIHVpLXZhbGlkYXRlIGRpcmVjdGl2ZSBtYWtlcyBpdCBlYXN5IHRvIHVzZSBhbnkgZnVuY3Rpb24ocykgZGVmaW5lZCBpbiBzY29wZSBhcyBhIHZhbGlkYXRvciBmdW5jdGlvbihzKS5cclxuICogQSB2YWxpZGF0b3IgZnVuY3Rpb24gd2lsbCB0cmlnZ2VyIHZhbGlkYXRpb24gb24gYm90aCBtb2RlbCBhbmQgaW5wdXQgY2hhbmdlcy5cclxuICpcclxuICogQGV4YW1wbGUgPGlucHV0IHVpLXZhbGlkYXRlPVwiICdteVZhbGlkYXRvckZ1bmN0aW9uKCR2YWx1ZSknIFwiPlxyXG4gKiBAZXhhbXBsZSA8aW5wdXQgdWktdmFsaWRhdGU9XCJ7IGZvbyA6ICckdmFsdWUgPiBhbm90aGVyTW9kZWwnLCBiYXIgOiAndmFsaWRhdGVGb28oJHZhbHVlKScgfVwiPlxyXG4gKiBAZXhhbXBsZSA8aW5wdXQgdWktdmFsaWRhdGU9XCJ7IGZvbyA6ICckdmFsdWUgPiBhbm90aGVyTW9kZWwnIH1cIiB1aS12YWxpZGF0ZS13YXRjaD1cIiAnYW5vdGhlck1vZGVsJyBcIj5cclxuICogQGV4YW1wbGUgPGlucHV0IHVpLXZhbGlkYXRlPVwieyBmb28gOiAnJHZhbHVlID4gYW5vdGhlck1vZGVsJywgYmFyIDogJ3ZhbGlkYXRlRm9vKCR2YWx1ZSknIH1cIiB1aS12YWxpZGF0ZS13YXRjaD1cIiB7IGZvbyA6ICdhbm90aGVyTW9kZWwnIH0gXCI+XHJcbiAqXHJcbiAqIEBwYXJhbSB1aS12YWxpZGF0ZSB7c3RyaW5nfG9iamVjdCBsaXRlcmFsfSBJZiBzdHJpbmdzIGlzIHBhc3NlZCBpdCBzaG91bGQgYmUgYSBzY29wZSdzIGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgYSB2YWxpZGF0b3IuXHJcbiAqIElmIGFuIG9iamVjdCBsaXRlcmFsIGlzIHBhc3NlZCBhIGtleSBkZW5vdGVzIGEgdmFsaWRhdGlvbiBlcnJvciBrZXkgd2hpbGUgYSB2YWx1ZSBzaG91bGQgYmUgYSB2YWxpZGF0b3IgZnVuY3Rpb24uXHJcbiAqIEluIGJvdGggY2FzZXMgdmFsaWRhdG9yIGZ1bmN0aW9uIHNob3VsZCB0YWtlIGEgdmFsdWUgdG8gdmFsaWRhdGUgYXMgaXRzIGFyZ3VtZW50IGFuZCBzaG91bGQgcmV0dXJuIHRydWUvZmFsc2UgaW5kaWNhdGluZyBhIHZhbGlkYXRpb24gcmVzdWx0LlxyXG4gKi9cclxuYW5ndWxhci5tb2R1bGUoJ3VpLnZhbGlkYXRlJyxbXSkuZGlyZWN0aXZlKCd1aVZhbGlkYXRlJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgIHJlcXVpcmU6ICduZ01vZGVsJyxcclxuICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxtLCBhdHRycywgY3RybCkge1xyXG4gICAgICB2YXIgdmFsaWRhdGVGbiwgdmFsaWRhdG9ycyA9IHt9LFxyXG4gICAgICAgICAgdmFsaWRhdGVFeHByID0gc2NvcGUuJGV2YWwoYXR0cnMudWlWYWxpZGF0ZSk7XHJcblxyXG4gICAgICBpZiAoIXZhbGlkYXRlRXhwcil7IHJldHVybjt9XHJcblxyXG4gICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyh2YWxpZGF0ZUV4cHIpKSB7XHJcbiAgICAgICAgdmFsaWRhdGVFeHByID0geyB2YWxpZGF0b3I6IHZhbGlkYXRlRXhwciB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBhbmd1bGFyLmZvckVhY2godmFsaWRhdGVFeHByLCBmdW5jdGlvbiAoZXhwcnNzbiwga2V5KSB7XHJcbiAgICAgICAgdmFsaWRhdGVGbiA9IGZ1bmN0aW9uICh2YWx1ZVRvVmFsaWRhdGUpIHtcclxuICAgICAgICAgIHZhciBleHByZXNzaW9uID0gc2NvcGUuJGV2YWwoZXhwcnNzbiwgeyAnJHZhbHVlJyA6IHZhbHVlVG9WYWxpZGF0ZSB9KTtcclxuICAgICAgICAgIGlmIChhbmd1bGFyLmlzT2JqZWN0KGV4cHJlc3Npb24pICYmIGFuZ3VsYXIuaXNGdW5jdGlvbihleHByZXNzaW9uLnRoZW4pKSB7XHJcbiAgICAgICAgICAgIC8vIGV4cHJlc3Npb24gaXMgYSBwcm9taXNlXHJcbiAgICAgICAgICAgIGV4cHJlc3Npb24udGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgIGN0cmwuJHNldFZhbGlkaXR5KGtleSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgY3RybC4kc2V0VmFsaWRpdHkoa2V5LCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVUb1ZhbGlkYXRlO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChleHByZXNzaW9uKSB7XHJcbiAgICAgICAgICAgIC8vIGV4cHJlc3Npb24gaXMgdHJ1ZVxyXG4gICAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eShrZXksIHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVUb1ZhbGlkYXRlO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gZXhwcmVzc2lvbiBpcyBmYWxzZVxyXG4gICAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eShrZXksIGZhbHNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlVG9WYWxpZGF0ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhbGlkYXRvcnNba2V5XSA9IHZhbGlkYXRlRm47XHJcbiAgICAgICAgY3RybC4kZm9ybWF0dGVycy5wdXNoKHZhbGlkYXRlRm4pO1xyXG4gICAgICAgIGN0cmwuJHBhcnNlcnMucHVzaCh2YWxpZGF0ZUZuKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBmdW5jdGlvbiBhcHBseV93YXRjaCh3YXRjaClcclxuICAgICAge1xyXG4gICAgICAgICAgLy9zdHJpbmcgLSB1cGRhdGUgYWxsIHZhbGlkYXRvcnMgb24gZXhwcmVzc2lvbiBjaGFuZ2VcclxuICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHdhdGNoKSlcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBzY29wZS4kd2F0Y2god2F0Y2gsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh2YWxpZGF0b3JzLCBmdW5jdGlvbih2YWxpZGF0b3JGbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JGbihjdHJsLiRtb2RlbFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vYXJyYXkgLSB1cGRhdGUgYWxsIHZhbGlkYXRvcnMgb24gY2hhbmdlIG9mIGFueSBleHByZXNzaW9uXHJcbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KHdhdGNoKSlcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2god2F0Y2gsIGZ1bmN0aW9uKGV4cHJlc3Npb24pe1xyXG4gICAgICAgICAgICAgICAgICBzY29wZS4kd2F0Y2goZXhwcmVzc2lvbiwgZnVuY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2godmFsaWRhdG9ycywgZnVuY3Rpb24odmFsaWRhdG9yRm4pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvckZuKGN0cmwuJG1vZGVsVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvL29iamVjdCAtIHVwZGF0ZSBhcHByb3ByaWF0ZSB2YWxpZGF0b3JcclxuICAgICAgICAgIGlmIChhbmd1bGFyLmlzT2JqZWN0KHdhdGNoKSlcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2god2F0Y2gsIGZ1bmN0aW9uKGV4cHJlc3Npb24sIHZhbGlkYXRvcktleSlcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIC8vdmFsdWUgaXMgc3RyaW5nIC0gbG9vayBhZnRlciBvbmUgZXhwcmVzc2lvblxyXG4gICAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhleHByZXNzaW9uKSlcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgc2NvcGUuJHdhdGNoKGV4cHJlc3Npb24sIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yc1t2YWxpZGF0b3JLZXldKGN0cmwuJG1vZGVsVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgIC8vdmFsdWUgaXMgYXJyYXkgLSBsb29rIGFmdGVyIGFsbCBleHByZXNzaW9ucyBpbiBhcnJheVxyXG4gICAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KGV4cHJlc3Npb24pKVxyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goZXhwcmVzc2lvbiwgZnVuY3Rpb24oaW50RXhwcmVzc2lvbilcclxuICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS4kd2F0Y2goaW50RXhwcmVzc2lvbiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yc1t2YWxpZGF0b3JLZXldKGN0cmwuJG1vZGVsVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAvLyBTdXBwb3J0IGZvciB1aS12YWxpZGF0ZS13YXRjaFxyXG4gICAgICBpZiAoYXR0cnMudWlWYWxpZGF0ZVdhdGNoKXtcclxuICAgICAgICAgIGFwcGx5X3dhdGNoKCBzY29wZS4kZXZhbChhdHRycy51aVZhbGlkYXRlV2F0Y2gpICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG59KTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIDAuMS4xXHJcbiAqIERlZmVycmVkIGxvYWQganMvY3NzIGZpbGUsIHVzZWQgZm9yIHVpLWpxLmpzIGFuZCBMYXp5IExvYWRpbmcuXHJcbiAqIFxyXG4gKiBAIGZsYXRmdWxsLmNvbSBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKiBBdXRob3IgdXJsOiAjdXNlci9mbGF0ZnVsbFxyXG4gKi9cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCd1aS5sb2FkJywgW10pXHJcblx0LnNlcnZpY2UoJ3VpTG9hZCcsIFsnJGRvY3VtZW50JywgJyRxJywgJyR0aW1lb3V0JywgZnVuY3Rpb24gKCRkb2N1bWVudCwgJHEsICR0aW1lb3V0KSB7XHJcblxyXG5cdFx0dmFyIGxvYWRlZCA9IFtdO1xyXG5cdFx0dmFyIHByb21pc2UgPSBmYWxzZTtcclxuXHRcdHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDaGFpbiBsb2FkcyB0aGUgZ2l2ZW4gc291cmNlc1xyXG5cdFx0ICogQHBhcmFtIHNyY3MgYXJyYXksIHNjcmlwdCBvciBjc3NcclxuXHRcdCAqIEByZXR1cm5zIHsqfSBQcm9taXNlIHRoYXQgd2lsbCBiZSByZXNvbHZlZCBvbmNlIHRoZSBzb3VyY2VzIGhhcyBiZWVuIGxvYWRlZC5cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5sb2FkID0gZnVuY3Rpb24gKHNyY3MpIHtcclxuXHRcdFx0c3JjcyA9IGFuZ3VsYXIuaXNBcnJheShzcmNzKSA/IHNyY3MgOiBzcmNzLnNwbGl0KC9cXHMrLyk7XHJcblx0XHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdFx0aWYoIXByb21pc2Upe1xyXG5cdFx0XHRcdHByb21pc2UgPSBkZWZlcnJlZC5wcm9taXNlO1xyXG5cdFx0XHR9XHJcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChzcmNzLCBmdW5jdGlvbihzcmMpIHtcclxuICAgICAgXHRwcm9taXNlID0gcHJvbWlzZS50aGVuKCBmdW5jdGlvbigpe1xyXG4gICAgICBcdFx0cmV0dXJuIHNyYy5pbmRleE9mKCcuY3NzJykgPj0wID8gc2VsZi5sb2FkQ1NTKHNyYykgOiBzZWxmLmxvYWRTY3JpcHQoc3JjKTtcclxuICAgICAgXHR9ICk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XHJcbiAgICAgIHJldHVybiBwcm9taXNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRHluYW1pY2FsbHkgbG9hZHMgdGhlIGdpdmVuIHNjcmlwdFxyXG5cdFx0ICogQHBhcmFtIHNyYyBUaGUgdXJsIG9mIHRoZSBzY3JpcHQgdG8gbG9hZCBkeW5hbWljYWxseVxyXG5cdFx0ICogQHJldHVybnMgeyp9IFByb21pc2UgdGhhdCB3aWxsIGJlIHJlc29sdmVkIG9uY2UgdGhlIHNjcmlwdCBoYXMgYmVlbiBsb2FkZWQuXHJcblx0XHQgKi9cclxuXHRcdHRoaXMubG9hZFNjcmlwdCA9IGZ1bmN0aW9uIChzcmMpIHtcclxuXHRcdFx0aWYobG9hZGVkW3NyY10pIHJldHVybiBsb2FkZWRbc3JjXS5wcm9taXNlO1xyXG5cclxuXHRcdFx0dmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuXHRcdFx0dmFyIHNjcmlwdCA9ICRkb2N1bWVudFswXS5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuXHRcdFx0c2NyaXB0LnNyYyA9IHNyYztcclxuXHRcdFx0c2NyaXB0Lm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShlKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHRcdFx0JGRvY3VtZW50WzBdLmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuXHRcdFx0bG9hZGVkW3NyY10gPSBkZWZlcnJlZDtcclxuXHJcblx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIER5bmFtaWNhbGx5IGxvYWRzIHRoZSBnaXZlbiBDU1MgZmlsZVxyXG5cdFx0ICogQHBhcmFtIGhyZWYgVGhlIHVybCBvZiB0aGUgQ1NTIHRvIGxvYWQgZHluYW1pY2FsbHlcclxuXHRcdCAqIEByZXR1cm5zIHsqfSBQcm9taXNlIHRoYXQgd2lsbCBiZSByZXNvbHZlZCBvbmNlIHRoZSBDU1MgZmlsZSBoYXMgYmVlbiBsb2FkZWQuXHJcblx0XHQgKi9cclxuXHRcdHRoaXMubG9hZENTUyA9IGZ1bmN0aW9uIChocmVmKSB7XHJcblx0XHRcdGlmKGxvYWRlZFtocmVmXSkgcmV0dXJuIGxvYWRlZFtocmVmXS5wcm9taXNlO1xyXG5cclxuXHRcdFx0dmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuXHRcdFx0dmFyIHN0eWxlID0gJGRvY3VtZW50WzBdLmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcclxuXHRcdFx0c3R5bGUucmVsID0gJ3N0eWxlc2hlZXQnO1xyXG5cdFx0XHRzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcclxuXHRcdFx0c3R5bGUuaHJlZiA9IGhyZWY7XHJcblx0XHRcdHN0eWxlLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShlKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHRcdFx0c3R5bGUub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGUpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9O1xyXG5cdFx0XHQkZG9jdW1lbnRbMF0uaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XHJcblx0XHRcdGxvYWRlZFtocmVmXSA9IGRlZmVycmVkO1xyXG5cclxuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcblx0XHR9O1xyXG59XSk7Il19
