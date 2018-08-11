/*! Backstretch - v2.0.4 - 2013-06-19
* http://srobbin.com/jquery-plugins/backstretch/
* Copyright (c) 2013 Scott Robbin; Licensed MIT */
(function(a,d,p){a.fn.backstretch=function(c,b){(c===p||0===c.length)&&a.error("No images were supplied for Backstretch");0===a(d).scrollTop()&&d.scrollTo(0,0);return this.each(function(){var d=a(this),g=d.data("backstretch");if(g){if("string"==typeof c&&"function"==typeof g[c]){g[c](b);return}b=a.extend(g.options,b);g.destroy(!0)}g=new q(this,c,b);d.data("backstretch",g)})};a.backstretch=function(c,b){return a("body").backstretch(c,b).data("backstretch")};a.expr[":"].backstretch=function(c){return a(c).data("backstretch")!==p};a.fn.backstretch.defaults={centeredX:!0,centeredY:!0,duration:5E3,fade:0};var r={left:0,top:0,overflow:"hidden",margin:0,padding:0,height:"100%",width:"100%",zIndex:-999999},s={position:"absolute",display:"none",margin:0,padding:0,border:"none",width:"auto",height:"auto",maxHeight:"none",maxWidth:"none",zIndex:-999999},q=function(c,b,e){this.options=a.extend({},a.fn.backstretch.defaults,e||{});this.images=a.isArray(b)?b:[b];a.each(this.images,function(){a("<img />")[0].src=this});this.isBody=c===document.body;this.$container=a(c);this.$root=this.isBody?l?a(d):a(document):this.$container;c=this.$container.children(".backstretch").first();this.$wrap=c.length?c:a('<div class="backstretch"></div>').css(r).appendTo(this.$container);this.isBody||(c=this.$container.css("position"),b=this.$container.css("zIndex"),this.$container.css({position:"static"===c?"relative":c,zIndex:"auto"===b?0:b,background:"none"}),this.$wrap.css({zIndex:-999998}));this.$wrap.css({position:this.isBody&&l?"fixed":"absolute"});this.index=0;this.show(this.index);a(d).on("resize.backstretch",a.proxy(this.resize,this)).on("orientationchange.backstretch",a.proxy(function(){this.isBody&&0===d.pageYOffset&&(d.scrollTo(0,1),this.resize())},this))};q.prototype={resize:function(){try{var a={left:0,top:0},b=this.isBody?this.$root.width():this.$root.innerWidth(),e=b,g=this.isBody?d.innerHeight?d.innerHeight:this.$root.height():this.$root.innerHeight(),j=e/this.$img.data("ratio"),f;j>=g?(f=(j-g)/2,this.options.centeredY&&(a.top="-"+f+"px")):(j=g,e=j*this.$img.data("ratio"),f=(e-b)/2,this.options.centeredX&&(a.left="-"+f+"px"));this.$wrap.css({width:b,height:g}).find("img:not(.deleteable)").css({width:e,height:j}).css(a)}catch(h){}return this},show:function(c){if(!(Math.abs(c)>this.images.length-1)){var b=this,e=b.$wrap.find("img").addClass("deleteable"),d={relatedTarget:b.$container[0]};b.$container.trigger(a.Event("backstretch.before",d),[b,c]);this.index=c;clearInterval(b.interval);b.$img=a("<img />").css(s).bind("load",function(f){var h=this.width||a(f.target).width();f=this.height||a(f.target).height();a(this).data("ratio",h/f);a(this).fadeIn(b.options.speed||b.options.fade,function(){e.remove();b.paused||b.cycle();a(["after","show"]).each(function(){b.$container.trigger(a.Event("backstretch."+this,d),[b,c])})});b.resize()}).appendTo(b.$wrap);b.$img.attr("src",b.images[c]);return b}},next:function(){return this.show(this.index<this.images.length-1?this.index+1:0)},prev:function(){return this.show(0===this.index?this.images.length-1:this.index-1)},pause:function(){this.paused=!0;return this},resume:function(){this.paused=!1;this.next();return this},cycle:function(){1<this.images.length&&(clearInterval(this.interval),this.interval=setInterval(a.proxy(function(){this.paused||this.next()},this),this.options.duration));return this},destroy:function(c){a(d).off("resize.backstretch orientationchange.backstretch");clearInterval(this.interval);c||this.$wrap.remove();this.$container.removeData("backstretch")}};var l,f=navigator.userAgent,m=navigator.platform,e=f.match(/AppleWebKit\/([0-9]+)/),e=!!e&&e[1],h=f.match(/Fennec\/([0-9]+)/),h=!!h&&h[1],n=f.match(/Opera Mobi\/([0-9]+)/),t=!!n&&n[1],k=f.match(/MSIE ([0-9]+)/),k=!!k&&k[1];l=!((-1<m.indexOf("iPhone")||-1<m.indexOf("iPad")||-1<m.indexOf("iPod"))&&e&&534>e||d.operamini&&"[object OperaMini]"==={}.toString.call(d.operamini)||n&&7458>t||-1<f.indexOf("Android")&&e&&533>e||h&&6>h||"palmGetResource"in d&&e&&534>e||-1<f.indexOf("MeeGo")&&-1<f.indexOf("NokiaBrowser/8.5.0")||k&&6>=k)})(jQuery,window);
(function ($) {

    /*
    *  new_map
    *
    *  This function will render a Google Map onto the selected jQuery element
    *
    *  @type	function
    *  @date	8/11/2013
    *  @since	4.3.0
    *
    *  @param	$el (jQuery element)
    *  @return	n/a
    */

    function new_map($el) {

        // var
        var $markers = $el.find('.marker');


        // vars
        var args = {
            zoom: 16,
            center: new google.maps.LatLng(0, 0),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };


        // create map	        	
        var map = new google.maps.Map($el[0], args);


        // add a markers reference
        map.markers = [];


        // add markers
        $markers.each(function () {

            add_marker($(this), map);

        });


        // center map
        center_map(map);


        // return
        return map;

    }

    /*
    *  add_marker
    *
    *  This function will add a marker to the selected Google Map
    *
    *  @type	function
    *  @date	8/11/2013
    *  @since	4.3.0
    *
    *  @param	$marker (jQuery element)
    *  @param	map (Google Map object)
    *  @return	n/a
    */

    function add_marker($marker, map) {

        // var
        var latlng = new google.maps.LatLng($marker.attr('data-lat'), $marker.attr('data-lng'));

        // create marker
        var marker = new google.maps.Marker({
            position: latlng,
            map: map
        });

        // add to array
        map.markers.push(marker);

        // if marker contains HTML, add it to an infoWindow
        if ($marker.html()) {
            // create info window
            var infowindow = new google.maps.InfoWindow({
                content: $marker.html()
            });

            // show info window when marker is clicked
            google.maps.event.addListener(marker, 'click', function () {

                infowindow.open(map, marker);

            });
        }

    }

    /*
    *  center_map
    *
    *  This function will center the map, showing all markers attached to this map
    *
    *  @type	function
    *  @date	8/11/2013
    *  @since	4.3.0
    *
    *  @param	map (Google Map object)
    *  @return	n/a
    */

    function center_map(map) {

        // vars
        var bounds = new google.maps.LatLngBounds();

        // loop through all markers and create bounds
        $.each(map.markers, function (i, marker) {

            var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());

            bounds.extend(latlng);

        });

        // only 1 marker?
        if (map.markers.length == 1) {
            // set center of map
            map.setCenter(bounds.getCenter());
            map.setZoom(16);
        }
        else {
            // fit to bounds
            map.fitBounds(bounds);
        }

    }

    /*
    *  document ready
    *
    *  This function will render each map when the document is ready (page has loaded)
    *
    *  @type	function
    *  @date	8/11/2013
    *  @since	5.0.0
    *
    *  @param	n/a
    *  @return	n/a
    */
    // global var
    var map = null;

    $(document).ready(function () {

        $('.acf-map').each(function () {

            // create map
            map = new_map($(this));

        });

    });

})(jQuery);
/*!
 * Foldable v1.0.0
 * Foldable. The full stack CSS3 powered jQuery Accordion.
 * 
 * http://seresinertes.com
 * Copyright 2017 seresinertes
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define("Foldable", ["jquery"], factory);
	else if(typeof exports === 'object')
		exports["Foldable"] = factory(require("jquery"));
	else
		root["Foldable"] = factory(root["$"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Constant common vars used in plugin modules
 *
 * Except DEFAULTS constant, you must not update any of the remaining vars.
 * 
 */
var TRANSITION_END_EVENT = exports.TRANSITION_END_EVENT = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend';
var ANIMATION_END_EVENT = exports.ANIMATION_END_EVENT = 'animationend webkitAnimationEnd oAnimationEnd oanimationend';

var JQUERY_PLUGIN_NAME = exports.JQUERY_PLUGIN_NAME = 'foldable';
var JQUERY_DATA_NAME = exports.JQUERY_DATA_NAME = 'foldable-instance';

var DATA_GROUPS = exports.DATA_GROUPS = 'foldable-group-instance';;
var TRANSITION_MIN_TIME = exports.TRANSITION_MIN_TIME = 0.001;;

/**
 * Default plugin options
 * To know more about options, please check the documentation
 * @type {Object}
 */
var DEFAULTS = exports.DEFAULTS = {
	/**
  * global id for the accordion
  * @type {String}
  */
	id: null, // string
	/**
  * a group to be opened on init
  * @type {Null || int || CSS selector || jQuery element}
  */
	initActive: null,
	/**
  * set a built-in or custom theme to the accordion
  * @type {String}
  */
	theme: 'default',
	/**
  * Sets the groups of the accordion
  * @type {CSS selector || jQuery element}
  */
	groups: '[data-foldable-role="group"]',
	/**
  * Sets the triggers of the accordion
  * @type {CSS selector || jQuery element}
  */
	triggers: '[data-foldable-role="trigger"]',
	/**
  * Sets the targets of the accordion
  * @type {CSS selector || jQuery element}
  */
	targets: '[data-foldable-role="target"]',
	/**
  * Action event which the groups will be toggled.
  * Could be 'click' or 'hover'
  * @type {String}
  */
	triggerEvent: 'click',
	/**
  * Sets the functionality to make that the groups open individually or one-by-one
  * @type {Boolean}
  */
	accordion: true,
	/**
  * Allow or prevent the use of URL hashes
  * @type {Boolean}
  */
	hash: false,
	/**
  * When closing a group, allow or prevent to auto-close its children groups
  * @type {Boolean}
  */
	autoCloseChildren: true,
	/**
  * By default use CSS3 transitions & animations. Set this to true to force to use jQuery animations
  * @type {Boolean}
  */
	forceJqueryAnimations: false,
	/**
  * Toggling groups transition options
  * @type {Object}
  */
	transition: {
		/**
   * Transition duration in milliseconds.
   * You can set null or 0 to disable the transition
   * @type {Number || Null}
   */
		duration: 300,
		/**
   * Transition easing.
   * When using CSS transitions could be 'ease', 'ease-in', 'ease-out' or 'cubic-bezier()'
   * When using jQuery animation you can use any of built-in easings or also use jQuery easing plugin
   * @type {String}
   */
		easing: 'ease'
	},
	/**
  * Toggling groups animation options
  * @type {Object}
  */
	animation: {
		/**
   * Opening animation class.
   * You can use any of built-in plugin animiations classes or use any animation library like animate.css :)
   * @type {String}
   */
		enter: null,
		/**
   * Closing animation class
   * @type {String}
   */
		leave: null,
		/**
   * Animation duration in milliseconds
   * You can set null or 0 to disable the transition
   * @type {Number || Null}
   */
		duration: 300
	},
	/**
  * Auto-toggling intervally groups' options
  * @type {Object}
  */
	autoplay: {
		/**
   * Interval duration in milliseconds
   * @type {Number}
   */
		interval: 0,
		/**
   * Stops the autoplay interval when an action happens (opening or closing a group manually)
   * @type {Boolean}
   */
		stopOnEvent: true,
		/**
   * Restarts the autoplay with the first group when the last is opened
   * @type {Boolean}
   */
		loop: true
	},
	/**
  * Set of callback methods used in conjunction with triggers methods
  */
	onBeforeOpen: function onBeforeOpen() {},
	onOpen: function onOpen() {},
	onBeforeClose: function onBeforeClose() {},
	onClose: function onClose() {},
	onBeforeAnimation: function onBeforeAnimation() {},
	onAnimation: function onAnimation() {},
	onRefresh: function onRefresh() {},
	onPlay: function onPlay() {},
	onPause: function onPause() {},
	onStop: function onStop() {},
	onEnable: function onEnable() {},
	onDisable: function onDisable() {},
	onDestroy: function onDestroy() {}
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.camelize = camelize;
exports.decamelize = decamelize;
exports.supportsTransitions = supportsTransitions;
exports.debounce = debounce;
exports.rAF = rAF;
exports.isJSON = isJSON;
exports.stripHash = stripHash;
exports.removeHash = removeHash;
exports.guid = guid;
exports.is = is;
exports.isString = isString;
exports.isObject = isObject;
exports.isArray = isArray;
exports.isUndefined = isUndefined;
exports.isEmpty = isEmpty;
exports.isNull = isNull;
exports.isMobile = isMobile;
exports.isNumeric = isNumeric;
/**
 * Internal util functions used in modules
 */

function camelize(str) {
	return (str + '').replace(/-\D/g, function (match) {
		return match.charAt(1).toUpperCase();
	});
};

function decamelize(str) {
	var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';

	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(/([a-z\d])([A-Z])/g, '$1' + sep + '$2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + sep + '$2').toLowerCase();
};

function supportsTransitions() {
	var b = document.body || document.documentElement,
	    s = b.style,
	    p = 'transition';

	if (typeof s[p] == 'string') {
		return true;
	}

	var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];

	p = 'Transition';

	for (var i = 0; i < v.length; i++) {
		if (typeof s[v[i] + p] == 'string') {
			return true;
		}
	}

	return false;
};

function debounce(func, threshold, execAsap) {
	var timeout;

	return function debounced() {
		var obj = this,
		    args = arguments;

		function delayed() {
			if (!execAsap) func.apply(obj, args);
			timeout = null;
		}

		if (timeout) clearTimeout(timeout);else if (execAsap) func.apply(obj, args);

		timeout = setTimeout(delayed, threshold || 100);
	};
};

function rAF(cb) {
	if (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame) {
		return requestAnimationFrame(cb) || webkitRequestAnimationFrame(cb) || mozRequestAnimationFrame(cb);
	} else {
		return setTimeout(cb, 1000 / 60);
	}
};

function isJSON(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}

	return true;
};

function stripHash(hash) {
	return !!hash && (hash.indexOf('#') !== -1 ? hash.substr(1, hash.length) : false);
};

function removeHash() {
	try {

		var scrollV = void 0,
		    scrollH = void 0,
		    loc = window.location;

		if ('pushState' in history) {
			history.pushState('', document.title, loc.pathname + loc.search);
		} else {
			scrollV = document.body.scrollTop;
			scrollH = document.body.scrollLeft;

			loc.hash = '';

			document.body.scrollTop = scrollV;
			document.body.scrollLeft = scrollH;
		}
	} catch (e) {
		throw new Error("There were an error removing a hash from location");
	}
};

function guid() {
	var s4 = function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	};
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

function is(type, obj) {

	if (type.toLowerCase() === 'string') {
		return !!obj && Object.prototype.toString.call(obj) === '[object String]';
	} else if (type.toLowerCase() === 'object') {
		return !!obj && Object.prototype.toString.call(obj) === '[object Object]';
	} else if (type.toLowerCase() === 'array') {
		return !!obj && Object.prototype.toString.call(obj) === '[object Array]';
	} else if (type.toLowerCase() === 'undefined') {
		return typeof obj === 'undefined';
	} else if (type.toLowerCase() === 'empty') {
		return size(obj) === 0;
	} else if (type.toLowerCase() === 'null') {
		return obj === null;
	} else if (type.toLowerCase() === 'mobile') {
		return typeof window.orientation !== "undefined" || navigator.userAgent.indexOf('IEMobile') !== -1;
	}
};

function isString(obj) {
	return is('string', obj);
};
function isObject(obj) {
	return is('object', obj);
};
function isArray(obj) {
	return is('array', obj);
};
function isUndefined(obj) {
	return is('undefined', obj);
};
function isEmpty(obj) {
	return is('empty', obj);
};
function isNull(obj) {
	return is('null', obj);
};
function isMobile(obj) {
	return is('mobile', obj);
};
function isNumeric(obj) {
	return !isArray(obj) && obj - parseFloat(obj) + 1 >= 0;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jquery = __webpack_require__(6);

var _jquery2 = _interopRequireDefault(_jquery);

var _foldable = __webpack_require__(5);

var _foldable2 = _interopRequireDefault(_foldable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Main file used in compilation builds to generate the production plugin
 */
exports.default = _foldable2.default;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Emitter class.
 *
 * A tiny implementation of the pub/sub functionality created for Foldable plugin.
 * 
 */
var Emitter = function () {

	/**
  * Set up the instance and creates initial vars
  * @param  {Object} args
  * @return {void}
  */
	function Emitter() {
		var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, Emitter);

		this._events = Object.create(null);
	}

	/**
  * Returns an array of names splitted by a space
  * @param  {String} name
  * @return {Array}
  */


	_createClass(Emitter, [{
		key: '_getNames',
		value: function _getNames(name) {
			return (/\s/g.test(name) ? name.split(' ') : [name]
			);
		}

		/**
   * Throws an error specifying the method an error ocurred
   * @param  {String} method
   * @param  {String} error
   * @return {void}
   */

	}, {
		key: 'throwError',
		value: function throwError(method, error) {
			throw new Error('[Emitter Error]: ' + method + '() >>> ' + error);
		}

		/**
   * Listen to a specific event based on a event name
   * 
   * If '*' is setted, it will listen to all handler
   * 
   * It's possible to pass multiple names at time separated with a space to listen to each event
   * Ex: on('foo bar hey ho') // will listen to this 4 events
   * 
   * @param  {String} name
   * @param  {Function} handler
   * @return {Emitter prototype}
   */

	}, {
		key: 'on',
		value: function on(name, handler) {
			var _this = this;

			if (!name) return this.throwError('on', 'At least one event name is obligatory');

			var names = this._getNames(name);

			if (names[0] === '*' && names.length > 1) return this.throwError('on', 'Wildcard listener only can be used alone');

			names.forEach(function (name) {
				_this._events[name] = _this._events[name] || [];
				handler && _this._events[name].push(handler);
			});

			return this;
		}

		/**
   * Listen to a specific event based on a event name only once at time
   *
   * If '*' is setted, it will listen to every handler once
   * 
   * @param  {String} name
   * @param  {Function} handler
   * @return {Emitter prototype}
   */

	}, {
		key: 'once',
		value: function once(name, handler) {
			handler._once = true;
			this.on(name, handler);
			return this;
		}

		/**
   * Removes a listener based on a event name
   *
   * If name param is not given, it will delete all handlers
   *
   * Pass multiple events names separated with a space to remove each one at time
   *
   * @param  {String} name
   * @param  {Function} handler
   * @return {Emitter prototype}
   */

	}, {
		key: 'off',
		value: function off(name) {
			var _this2 = this;

			var handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			if (name) {
				var names = this._getNames(name);
				names.forEach(function (name) {
					handler ? _this2._events[name].splice(_this2._events[name].indexOf(handler), 1) : delete _this2._events[name];
				});
			} else {
				this._events = Object.create(null);
			}

			return this;
		}

		/**
   * Run each handler based on each name.
   *
   * @param  {String}    name
   * @param  {arguments} args
   * @return {Emitter prototype}
   */

	}, {
		key: 'emit',
		value: function emit(name) {
			var _this3 = this;

			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			if (!name) name = '*';

			var names = this._getNames(name);
			var handlers = null;

			var emitHandler = function emitHandler(collection, key) {
				collection.forEach(function (handler) {
					handler._once && _this3.off(key, handler);
					handler.call.apply(handler, [_this3].concat(args));
				});
			};

			names.forEach(function (_name) {

				args.push(_name);

				_this3._events[_name] && emitHandler(_this3._events[_name].slice(), _name);
				_this3._events['*'] && emitHandler(_this3._events['*'].slice(), '*');
			});

			return this;
		}
	}]);

	return Emitter;
}();

exports.default = Emitter;
;
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import required constants and modules


var _utils = __webpack_require__(1);

var utils = _interopRequireWildcard(_utils);

var _constants = __webpack_require__(0);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class assigns the required functionality to each group inside of an accordion
 * Please, don't use it directly as an instance.
 * 
 */
var FoldableGroup = function () {

	/**
  * Setting up the class passing the args as options (stored in this.options)
  * @return {void}
  */
	function FoldableGroup() {
		var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, FoldableGroup);

		this.options = args;

		this.$el = this.options.el;
		this.$group = this.options.group;
		this.$trigger = this.options.trigger;
		this.$target = this.options.target;
		this.$animation = null;

		this.siblings = null;
		this.height = 0;
		this.hashFragment = this.$trigger.data('foldable-hash');
		this.root = this.options.root;
		this.index = this.options.index;
		this.level = this.options.level;
		this.hasTarget = this.options.hasTarget;
		this.parent = this.options.parent || null;

		this.isActive = false;

		if (this.options.hash && this.$trigger.attr('href') && /^\#(.+)/g.test(this.$trigger.attr('href'))) {
			this.hashFragment = this.$trigger.attr('href').replace(/^\#/g, '');
		}

		this._activate();
	}

	/**
  * Set up and build the accordion group structure. Also, it adds classes and sets important vars.
  * @return {void}
  */


	_createClass(FoldableGroup, [{
		key: '_activate',
		value: function _activate() {

			if (this.isLink()) return;

			this.$group.attr('data-foldable-role', 'group').addClass('foldable--level-' + this.level + ' ' + (this.isActive ? '' : 'foldable--is-closed') + ' ' + (this.hasTarget ? 'foldable--has-target' : '') + ' ' + (!this.options.isGrandChild ? 'foldable--has-children' : 'foldable--is-grandchild') + ' ' + (this.options.isFirst ? 'foldable--is-first' : '') + ' ' + (this.options.isLast ? 'foldable--is-last' : ''));
			this.$trigger.attr('data-foldable-role', 'trigger');
			this.$target.attr('data-foldable-role', 'target');
			var $targetChildren = this.$target.children();

			if (!this.$target.find('> [data-foldable-role="animation"]').length) {
				var $animation = $('<div data-foldable-role="animation" />');
				$animation.appendTo(this.$target.empty()).append($targetChildren);
			}

			this.$animation = this.$target.find('> [data-foldable-role="animation"]');

			if (utils.isMobile()) {
				this.$trigger.css({ transition: 'all 0s' });
			}

			this.bind();
		}

		/**
   * Triggers a passed event for the following type of listeners:
   * - jQuery event
   * - Built-in emitter
   * - Options callback
   * 
   * @param  {string} event
   * @param  {*} data [Passed data to the listener]
   * @return {void}      
   */

	}, {
		key: '_trigger',
		value: function _trigger(event) {
			this.$el.trigger(event + '.foldable', this);
			this.root.emit(event, this);

			//camelize event and look for the callback event
			var camelized = utils.camelize('on-' + event);

			if (!!camelized && camelized in this.options) {
				this.options[camelized].call(this, this);
			}
		}

		/**
   * Manage URL hash when opening this group
   * @return {void}
   */

	}, {
		key: '_updateHashOpening',
		value: function _updateHashOpening() {
			this.hashFragment ? this.root.updateHash(this.hashFragment) : this._updateHashClosing();
		}

		/**
   * Manage URL hash when closing this group
   * @return {void}
   */

	}, {
		key: '_updateHashClosing',
		value: function _updateHashClosing() {
			this.parent && this.parent.isActive ? this.parent.hashFragment && this.parent.root.updateHash(this.parent.hashFragment) : utils.removeHash();
		}

		/*_trigger(event) {
  	this.$el.trigger(`${event}.foldable`, this);
  	this.root.emit(event, this);
  		//camelize event and look for the callback event
  	const camelized = utils.camelize(`on-${event}`);
  		if (!!camelized && camelized in this.options) {
  		this.options[camelized].call(this, this);
  	}
  }*/

		/**
   * Rebuild the group. Used in conjunction with Foldable refresh method
   * @return {this}
   */

	}, {
		key: 'refresh',
		value: function refresh() {
			var _this = this;

			if (this.isLink()) return;

			this.unbind();
			this._activate();

			var t = setTimeout(function () {
				clearTimeout(t);

				if (_this.isActive) {
					_this.isActive = false;
					_this.toggle(false);
				}
			}, 10);

			return this;
		}

		/**
   * Manage the toggling animation of the group's target.
   * @param  {String} method
   * @return {void}
   */

	}, {
		key: 'toggleAnimation',
		value: function toggleAnimation() {
			var _this2 = this;

			var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'open';


			if (!this.$animation) return;

			var animation = method === 'open' ? this.options.animation.enter : this.options.animation.leave;
			var animationDuration = this.options.animation.duration;

			if (animation) {
				this._trigger('before-animation');

				if (!utils.isNull(animationDuration)) {

					var duration = Math.max(animationDuration, this.options.transition.duration);

					this.$animation.css({
						animationDuration: duration + 'ms'
					});
				} else {
					this.$animation.css({
						animationDuration: this.options.transition.duration + 'ms'
					});
				}

				this.$animation.removeClass(animation + ' foldable--is-animating').off(_constants.ANIMATION_END_EVENT).one(_constants.ANIMATION_END_EVENT, function (e) {
					_this2.$animation.off(_constants.ANIMATION_END_EVENT).css({ animationDuration: '' }).delay(10).removeClass(animation + ' foldable--is-animating');

					_this2._trigger('animation');
				}).removeClass(method === 'open' ? this.options.animation.leave : this.options.animation.enter).addClass(animation + ' foldable--is-animating');
			}
		}

		/**
   * Refresh the heights of this group.
   *
   * @return {void}
   */

	}, {
		key: 'updateHeights',
		value: function updateHeights() {
			var height = 0;

			this.$animation.children().each(function (i, child) {
				height += $(child).outerHeight(true);
			});

			this.height = Math.ceil(height);
		}

		/**
   * Manage the opening and closing group state
   * @param  {Boolean} animation [Open or close the group with transition or not]
   * @return {void}
   */

	}, {
		key: 'toggle',
		value: function toggle() {
			var animation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;


			if (this.isActive) {
				this.close(animation);

				if (this.options.hash) {
					this._updateHashClosing();
				}
			} else {
				this.open(animation);

				if (this.options.hash) {
					this._updateHashOpening();
				}
			}

			this._trigger('toggle');
		}

		/**
   * Bind the event listener to the trigger to handle the toggling actions
   * @return {void}
   */

	}, {
		key: 'bind',
		value: function bind() {
			var _this3 = this;

			this.$trigger.off('click.foldable mouseenter.foldable').on(this.options.triggerEvent + '.foldable', function (e) {

				if (_this3.hasTarget) {
					e.preventDefault();
				}

				_this3.toggle();

				_this3.$el.trigger('action', _this3);
			});
		}
	}, {
		key: 'isLink',
		value: function isLink() {
			return this.$trigger.filter('[data-foldable-link]').length || this.$trigger.hasClass('foldable--is-link');
		}

		/**
   * Returns prepared time and easing for transitions
   * @param  {Boolean} animation
   * @return {void}
   */

	}, {
		key: 'getTimeAndEasing',
		value: function getTimeAndEasing() {
			var animation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			var time = animation ? Math.max(this.options.animation.duration, this.options.transition.duration) : _constants.TRANSITION_MIN_TIME;
			var easing = animation ? this.options.transition.easing : 'ease';

			if (!parseInt(this.options.animation.duration, 10) || !parseInt(this.options.transition.duration, 10)) {
				time = _constants.TRANSITION_MIN_TIME;
			}

			return { time: time, easing: easing };
		}

		/**
   * Open this group and manage siblings and nested groups to be opened or closed
   * @param  {Boolean} animation
   * @return {void}
   */

	}, {
		key: 'open',
		value: function open() {
			var _this4 = this;

			var animation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;


			if (this.isActive) return;
			if (this.isLink()) return;

			this._trigger('before-open');

			this.isActive = true;

			this.$group.removeClass('foldable--is-closed foldable--is-closing foldable--is-opened foldable--is-opening');

			if (this.options.accordion) this.closeSiblings();

			if (this.options.accordion) this.root.$groups.not('foldable--is-active').removeClass('foldable--is-current');

			this.$group.add(this.$trigger).add(this.$target).addClass('foldable--is-active');

			this.$group.addClass('foldable--is-opening foldable--is-current');

			this.updateHeights();

			var _getTimeAndEasing = this.getTimeAndEasing(animation),
			    time = _getTimeAndEasing.time,
			    easing = _getTimeAndEasing.easing;

			var onSuccess = function onSuccess() {

				_this4.$group.addClass('foldable--is-opened').removeClass('foldable--is-opening');

				_this4._trigger('open');
			};

			if (!this.root.forceJqueryAnimations) {
				this.updateAncestorsHeights('+');

				this.$target.off(_constants.TRANSITION_END_EVENT).one(_constants.TRANSITION_END_EVENT, onSuccess).css({ transition: 'all ' + time + 'ms ' + easing });

				utils.rAF(function () {
					return _this4.$target.css({ maxHeight: _this4.height });
				});

				time > _constants.TRANSITION_MIN_TIME && !!animation && !utils.isMobile() && this.toggleAnimation('open');
			} else {
				if (animation === false || time === 0) {
					easing = '';
				} else {
					easing = !$.easing ? 'swing' : $.easing.hasOwnProperty(easing) ? easing : 'swing';
				}
				this.$target.slideDown(time, easing, onSuccess);
			}
		}

		/**
   * Close this group and manage siblings and nested groups to be opened or closed
   * @param  {Boolean} animation
   * @param  {Boolean} isFromClosingChildren [internal flag to know when the method is called from children groups]
   * @return {void}
   */

	}, {
		key: 'close',
		value: function close() {
			var _this5 = this;

			var animation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
			var isFromClosingChildren = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


			if (!this.isActive) return;
			if (this.isLink()) return;

			this._trigger('before-close');

			this.isActive = false;

			this.$group.removeClass('foldable--is-opened foldable--is-opening foldable--is-closed foldable--is-closing foldable--is-current').addClass('foldable--is-closing');

			this.$group.add(this.$trigger).add(this.$target).removeClass('foldable--is-active');

			var $parents = this.$group.parents(this.options.groups);
			var $children = this.$group.find(this.options.groups);

			if (!isFromClosingChildren && $parents && $parents.length) {
				var $parent = $parents.eq(0);

				if (!$parent.hasClass('foldable--is-current')) {
					$parent.addClass('foldable--is-current');
				}
			}

			if ($children && $children.length) {
				$children.removeClass('foldable--is-current');
			}

			this.updateHeights();

			if (!!this.options.autoCloseChildren) this.closeChildren();

			var _getTimeAndEasing2 = this.getTimeAndEasing(animation),
			    time = _getTimeAndEasing2.time,
			    easing = _getTimeAndEasing2.easing;

			var onSuccess = function onSuccess() {

				_this5.$group.addClass('foldable--is-closed').removeClass('foldable--is-closing');

				_this5._trigger('close');
			};

			if (!this.root.forceJqueryAnimations) {
				this.$target.off(_constants.TRANSITION_END_EVENT).one(_constants.TRANSITION_END_EVENT, onSuccess);

				utils.rAF(function () {
					return _this5.$target.css({
						transition: 'all ' + time + 'ms ' + easing,
						maxHeight: 0,
						overflow: 'hidden'
					});
				});

				this.updateAncestorsHeights('-');

				time > _constants.TRANSITION_MIN_TIME && !!animation && !isFromClosingChildren && !utils.isMobile() && this.toggleAnimation('close');
			} else {
				if (animation === false || time === 0) {
					easing = '';
				} else {
					easing = !$.easing ? 'swing' : $.easing.hasOwnProperty(easing) ? easing : 'swing';
				}
				this.$target.slideUp(time, easing, onSuccess);
			}
		}

		/**
   * Refresh ancestors groups' heights.
   *
   * Used when toggling a nested group
   * 
   * @param  {String} operation ['+' or '-']
   * @return {void}
   */

	}, {
		key: 'updateAncestorsHeights',
		value: function updateAncestorsHeights() {
			var _this6 = this;

			var operation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '+';


			var ancestors = this.getAncestors();

			if (ancestors && ancestors.length) {
				ancestors.forEach(function (ancestor) {
					if (operation === '+') {
						ancestor.height += _this6.height;
					} else if (operation === '-') {
						ancestor.height -= _this6.height;
					} else {
						throw new Error('To update ancestors is required an operation');
					}

					utils.rAF(function () {
						return ancestor.$target.css({ maxHeight: ancestor.height });
					});
				});
			}
		}

		/**
   * Close nested children groups
   * @param  {Boolean} animation
   * @return {void}
   */

	}, {
		key: 'closeChildren',
		value: function closeChildren() {
			var animation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			var $children = this.$group.find(this.options.groups);

			if ($children.length) {
				$children.each(function (i, el) {
					var item = $(el).data('foldable-group-instance');
					if (item && item.isActive) {
						item.close(animation, true);
					}
				});
			}
		}

		/**
   * Returns siblings groups of this instance group (excluding itself)
   * @return {Array}
   */

	}, {
		key: 'getSiblings',
		value: function getSiblings() {
			var _this7 = this;

			if (!this.siblings) return;
			return this.siblings.filter(function (sibling) {
				return sibling !== _this7;
			});
		}

		/**
   * Close siblings groups
   * @param  {Boolean} animation
   * @return {void}
   */

	}, {
		key: 'closeSiblings',
		value: function closeSiblings() {
			var animation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			if (!this.siblings) return;

			var siblings = this.getSiblings();

			if (siblings && siblings.length) {
				siblings.forEach(function (sibling) {
					return sibling.isActive && sibling.close(animation);
				});
			}
		}

		/**
   * Returns ancestors groups of this group
   * @return {Array}
   */

	}, {
		key: 'getAncestors',
		value: function getAncestors() {
			var _this8 = this;

			var ancestors = [];
			var $groups = this.$group.parents(this.options.groups);

			if ($groups && $groups.length) {
				$groups.each(function (i, el) {
					var $group = $(el);

					if ($group && $group.length) {
						var instance = $group.data('foldable-group-instance');
						instance !== _this8 && ancestors.unshift($group.data('foldable-group-instance'));
					}
				});
			}

			return ancestors;
		}

		/**
   * Unset listeners
   * @return {void}
   */

	}, {
		key: 'unbind',
		value: function unbind() {
			this.$trigger.off('click.foldable mouseenter.foldable');
			this.$group.off();
		}

		/**
   * Disable this group and close it
   * @return {void}
   */

	}, {
		key: 'disable',
		value: function disable() {
			this.close(false);
			this.unbind();
		}
	}]);

	return FoldableGroup;
}();

exports.default = FoldableGroup;
;
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

var _utils = __webpack_require__(1);

var utils = _interopRequireWildcard(_utils);

var _emitter = __webpack_require__(3);

var _emitter2 = _interopRequireDefault(_emitter);

var _foldableGroup = __webpack_require__(4);

var _foldableGroup2 = _interopRequireDefault(_foldableGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * IMPORTANT NOTE!!!
 * 
 * Every method prefixed with an underscore are private and you shouldn't use it directlly from an instance of the plugin
 * 
 */

// check if it's defined jQuery in window. It's a mandatory
if (typeof jQuery === 'undefined') throw new Error('[Foldable] Foldable requires jQuery');

// import required constants and modules

var Foldable = function (_Emitter) {
	_inherits(Foldable, _Emitter);

	/**
  * Setting up the class passing the args (see _parseArgs method)
  * @return {void}
  */
	function Foldable() {
		var _ref;

		_classCallCheck(this, Foldable);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = Foldable.__proto__ || Object.getPrototypeOf(Foldable)).call.apply(_ref, [this].concat(args)));

		_this.options = _constants.DEFAULTS;

		_this._parseArgs.apply(_this, args);
		_this.id = _this.guid = utils.guid();

		_this.$groups = utils.isString(_this.options.groups) ? _this.$el.find(_this.options.groups) : _this.options.groups;
		_this.$triggers = utils.isString(_this.options.triggers) ? _this.$el.find(_this.options.triggers) : _this.options.triggers;
		_this.$targets = utils.isString(_this.options.targets) ? _this.$el.find(_this.options.targets) : _this.options.targets;

		if (!_this.$groups.length) {
			throw new Error('[Foldable] Groups must exists in the DOM');
		}

		if (!_this.$triggers.length) {
			throw new Error('[Foldable] Triggers must exists in the DOM');
		}

		if (!_this.$targets.length) {
			throw new Error('[Foldable] Targets must exists in the DOM');
		}

		_this.parent = null;
		_this.autoplayInterval = null;
		_this.theme = _this.options.theme;
		_this.isInitialized = false;

		_this._activate();
		return _this;
	}

	/**
  * Parse and prepare constructor options to initialize the plugin
  * 
  * You can pass the options in 2 ways:
  * 1) (el, optionsObject)
  * 2) (optionsObject) where it has to include a param called "el" ==> { el:$(my-root-element) }
  *
  * After that, will be set the vars this.options and this.$el
  *
  * this.options = Object that contains all plugin options
  * this.$el = jQuery element renferencing the root element
  *
  * Also, it will check for a possible given options in the "data-foldable" attribute (setted in JSON format)
  *
  * @param  {...args}
  * @return {void}
  */


	_createClass(Foldable, [{
		key: '_parseArgs',
		value: function _parseArgs() {
			var $el = null;
			var options = {};

			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			if ($.isPlainObject(args[0])) {
				options = args[0];

				if ('el' in args[0]) {
					$el = $(args[0].el);
				}
			} else {
				if (args.length === 2) {
					options = args[1];
				}

				if (utils.isString(args[0])) {
					$el = $(args[0]);
				} else if (args[0] instanceof jQuery) {
					$el = $(args[0]);
				} else {
					throw new Error('[Foldable] Collapse selector not found');
				}
			}

			if (this._hasHTMLDataOptions($el)) {
				options = JSON.parse($el.attr('data-foldable'));
			}

			this.options = $.extend(true, {}, _constants.DEFAULTS, options || {});

			if (!!$el && $el.length > 0) {
				this.$el = $el;
			} else {
				throw new Error('[Foldable] Collapse element not found');
			}
		}

		/**
   * Check the root element for a data JSON options setted in "data-foldable" attribute
   * @param  {jQuery element}  $el
   * @return {Boolean}
   */

	}, {
		key: '_hasHTMLDataOptions',
		value: function _hasHTMLDataOptions($el) {
			var options = $el.attr('data-foldable');

			if (!!options) {
				if (utils.isJSON(options)) {
					return true;
				} else {
					throw new Error('[Foldable]Foldable HTML data option are not a valid JSON');
				}
			} else {
				return false;
			}
		}

		/**
   * Returns the found element given in param inside the scoop of this plugin instance
   * @param  {HTML element || jQuery element}
   * @return {jQuery element} Found jQuery wrapped element
   */

	}, {
		key: '_getElement',
		value: function _getElement(item) {

			var $item = null;

			if (utils.isNumeric(item)) {
				$item = this.$groups.eq(item);
			} else {
				$item = utils.isString(item) ? this.$el.find(item) : $(item);
			}

			if (!$item.length) throw new Error('[Foldable] Item(s) not found, [' + item + ']');

			return $item;
		}

		/**
   * Set up and build the accordion structure. Also, it adds classes to the root element and sets important vars.
   * @return {void}
   */

	}, {
		key: '_activate',
		value: function _activate() {

			this.all = [];
			this.grandchildren = [];
			this.forceJqueryAnimations = this.options.forceJqueryAnimations ? true : !utils.supportsTransitions();

			this.autoplayCurrentIndex = 0;

			this.$el.attr('data-foldable-id', this.options.id || this.guid).removeClass('foldable--theme-' + this.theme).addClass('foldable--theme-' + this.options.theme + ' ' + (!this.forceJqueryAnimations ? 'foldable--is-css-modern' : 'foldable--is-css-legacy'));

			this.theme = this.options.theme;
			this.triggerEvent = this.options.triggerEvent === 'hover' ? 'mouseenter' : 'click';

			this._build(this.$el);

			if (!this.isInitialized) {
				this._handleInitActive();

				if (this.options.hash) {
					if (utils.stripHash(window.location.hash)) {
						this._openByHash(utils.stripHash(window.location.hash));
					}
				}

				if (!!this.options.autoplay.interval) {
					this.play();
				}

				this.isInitialized = true;
			}

			this._bindings();

			this.$el.addClass('foldable--is-initialized');
		}

		/**
   * Try to open on init a group using "initActive" option or "data-foldable-active" attribute setted in a group
   * @return {void}
   */

	}, {
		key: '_handleInitActive',
		value: function _handleInitActive() {
			var _this2 = this;

			if (!utils.isNull(this.options.initActive) && !utils.isUndefined(this.options.initActive)) {
				var $actives = this._getElement(this.options.initActive);
				!!$actives && $actives.length && this.open($actives, false);
			} else {
				if (this.$el.find('[data-foldable-active]').length) {
					this.$el.find('[data-foldable-active]').each(function (i, el) {
						return _this2.open($(el), false);
					});
				}
			}
		}

		/**
   * Check the current URL hash to match with any hash setted in the triggers
   * @param  {String} hash
   * @return {void}
   */

	}, {
		key: '_openByHash',
		value: function _openByHash() {
			var hash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.hash;


			if (hash === '') return foldable;

			var $hashed = this.$el.find('[data-foldable-hash="' + hash + '"]');

			if (!$hashed.length) $hashed = this.$el.find('[href="#' + hash + '"]');

			if (!$hashed.length) $hashed = null;

			if (!$hashed) {
				return 'console' in window && console.warn('There weren\'t found any element with ' + hash + ' hash');
			}

			this.open($hashed.last(), false);
		}

		/**
   * Sets global listeners
   * @return {void}
   */

	}, {
		key: '_bindings',
		value: function _bindings() {
			var _this3 = this;

			if (!!this.options.autoplay.interval) {
				this.$el.on('action', function (e) {
					if (_this3.options.autoplay.stopOnEvent) {
						_this3.stop(false, true);
					}
				});
			}

			$(window).on('resize.foldable', utils.debounce(function () {
				return _this3.updateHeights();
			}, 150));
		}

		/**
   * Unsets global listeners
   * @return {void}
   */

	}, {
		key: '_unbindings',
		value: function _unbindings() {
			this.$el.off('action');
			$(window).off('resize.foldable');
		}

		/**
   * Function where it creates and instance of FoldableGroup by each group found recursively.
   *
   * @param  {jQuery element} $parent
   * @param  {Number} _level
   * @return {void}
   */

	}, {
		key: '_build',
		value: function _build() {
			var _this4 = this;

			var $parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$el;

			var _level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			var $groups = $parent.children(this.options.groups);

			if (!$groups.length) return;

			var siblings = [];

			$groups.each(function (i, el) {

				var level = _level;

				var $group = $(el);
				var $trigger = $group.children(_this4.options.triggers).eq(0);
				var $target = $group.children(_this4.options.targets).eq(0);

				var options = $.extend(true, {}, _this4.options, {
					root: _this4,
					el: _this4.$el,
					group: $group,
					trigger: $trigger,
					target: $target,
					index: i,
					level: level,
					isFirst: i === 0,
					isLast: i === $groups.length - 1,
					children: [],
					triggerEvent: _this4.triggerEvent,
					hasTarget: !!$target.length,
					isGrandChild: !$target.find(_this4.options.groups).length,
					autoplayInterval: _this4.autoplayInterval
				});

				if (_this4.parent && level > 0) {
					options.parent = _this4.parent;
				}

				if (_this4.parent && level === _this4.parent.level) {
					options.parent = !!_this4.parent.parent ? _this4.parent.parent : null;
				}

				if (level === 0) {
					options.parent = null;
				}

				var foldableGroupInstance = null;

				if ($group.data(_constants.DATA_GROUPS)) {
					foldableGroupInstance = $group.data(_constants.DATA_GROUPS);
					foldableGroupInstance.options = options;
					foldableGroupInstance.refresh();
				} else {
					foldableGroupInstance = new _foldableGroup2.default(options);
					$group.data(_constants.DATA_GROUPS, foldableGroupInstance);
					$trigger.data(_constants.DATA_GROUPS, foldableGroupInstance);
					$target.data(_constants.DATA_GROUPS, foldableGroupInstance);
				}

				siblings.push(foldableGroupInstance);
				_this4.all.push(foldableGroupInstance);

				if (options.isGrandChild) _this4.grandchildren.push(foldableGroupInstance);

				if ($target.children('[data-foldable-role="animation"]').children(_this4.options.groups).length) {
					_this4.parent = foldableGroupInstance;

					level++;

					_this4._build($target.children('[data-foldable-role="animation"]'), level);
				}

				foldableGroupInstance.siblings = siblings;
			});
		}

		/**
   * Triggers a passed event for the following type of listeners:
   * - jQuery event
   * - Built-in emitter
   * - Options callback
   * 
   * @param  {string} event
   * @param  {*} data [Passed data to the listener]
   * @return {void}      
   */

	}, {
		key: '_trigger',
		value: function _trigger(event) {
			var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

			this.$el.trigger(event + '.foldable', data);
			this.emit(event, this);

			//camelize event and look for te callback event
			var camelized = utils.camelize('on-' + event);

			if (!!camelized && camelized in this.options) {
				this.options[camelized].call(this, data);
			}
		}

		/**
   * Updates the this.options variable to modify the current set up
   * @param  {Object} options
   * @return {this} To chain the method
   */

	}, {
		key: 'updateOptions',
		value: function updateOptions() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


			if (!$.isPlainObject(options)) throw new Error('[Foldable] [updateOptions]: Passed options have to be an object');

			try {
				this._unbindings();
				this.options = $.extend(true, {}, this.options, options);
				this._activate();
			} catch (e) {
				throw new Error('[Foldable] There were a problem in updateOptions method');
			}

			return this;
		}

		/**
   * Rebuild the accordion with the new given options
   * @param  {Object} options
   * @return {this}
   */

	}, {
		key: 'refresh',
		value: function refresh() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


			if (!$.isPlainObject(options)) throw new Error('[Foldable] [refresh]: Passed options have to be an object');

			try {
				this.updateOptions(options);

				this.parent = null;
				this.all = [];
				this.$groups = this.$el.find(this.options.groups);
				this.$triggers = this.$groups.children(this.options.triggers);
				this.$targets = this.$groups.children(this.options.targets);

				this._trigger('refresh', this);
			} catch (e) {
				throw new Error('[Foldable] There were a problem in refresh method');
			}

			return this;
		}

		/**
   * Open an accordion group(s).
   *
   * You can pass the group to be opened in these ways:
   * - With the group index (when the accordion only has one level)
   * - By CSS selector
   * - jQuery element
   *
   * The second parameter sets the animation to be opened with or without transition. 
   * 
   * @param  {int || String || jQuery element}
   * @param  {Boolean} animation
   * @return {this}
   */

	}, {
		key: 'open',
		value: function open(item) {
			var animation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

			var $item = this._getElement(item);

			try {
				(function () {
					var ancestors = null;

					$item.each(function (i, el) {
						var instance = $(el).data(_constants.DATA_GROUPS);

						if (!instance) return;

						ancestors = instance.getAncestors();

						if (ancestors && ancestors.length) {
							ancestors.forEach(function (ancestor) {
								return ancestor.open(animation);
							});
						}

						instance.open(animation);
					});
				})();
			} catch (e) {
				throw new Error('[Foldable] Item(s) to open not found, [' + item + ']');
			}

			return this;
		}

		/**
   * Close an accordion group(s).
   *
   * You can pass the group to be closed in these ways:
   * - With the group index (when the accordion only has one level)
   * - By CSS selector
   * - jQuery element
   *
   * The second parameter sets the animation to be closed with or without transition. 
   * 
   * @param  {int || String || jQuery element}
   * @param  {Boolean} animation
   * @return {this}
   */

	}, {
		key: 'close',
		value: function close(item) {
			var animation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

			var $item = this._getElement(item);

			try {
				$item.each(function (i, el) {
					var instance = $(el).data(_constants.DATA_GROUPS);
					instance && instance.isActive && instance.close(animation);
				});
			} catch (e) {
				throw new Error('[Foldable] Item(s) to close not found, [' + item + ']');
			}

			return this;
		}

		/**
   * Toggle an accordion group(s).
   * It means that if the group passed is currently opened, it will close it and vice versa
   *
   * You can pass the group to be toggled in these ways:
   * - With the group index (when the accordion only has one level)
   * - By CSS selector
   * - jQuery element
   *
   * The second parameter sets the animation to be toggled with or without transition. 
   * 
   * @param  {int || String || jQuery element}
   * @param  {Boolean} animation
   * @return {this}
   */

	}, {
		key: 'toggle',
		value: function toggle(item) {
			var _this5 = this;

			var animation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

			var $item = this._getElement(item);

			try {
				$item.each(function (i, el) {
					var instance = $(el).data(_constants.DATA_GROUPS);
					instance && _this5[instance.isActive ? 'close' : 'open']($(el), animation);
				});
			} catch (e) {
				throw new Error('[Foldable] Item(s) to toggle not found, [' + item + ']');
			}

			return this;
		}

		/**
   * Open all groups at time
   * @param  {Boolean} animation
   * @return {this}
   */

	}, {
		key: 'expand',
		value: function expand() {
			var animation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			var children = [];

			this.grandchildren.length && this.grandchildren.map(function (grandchild) {
				return children.push(grandchild.$group[0]);
			});

			if (children.length) {

				var oldAccordionOption = this.options.accordion;

				this.updateOptions({ accordion: false });
				children.length && this.open($(children), animation);

				if (oldAccordionOption) this.updateOptions({ accordion: oldAccordionOption });

				this._trigger('expand');
			}

			return this;
		}

		/**
   * Close all groups at time
   * @param  {Boolean} animation
   * @return {this}
   */

	}, {
		key: 'collapse',
		value: function collapse() {
			var animation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;


			this.close(this.$el.children(this.options.groups), animation);

			this._trigger('collapse');

			return this;
		}

		/**
   * Open the groups intervally with the given time in milliseconds
   *
   * El segundo parametro hace que pare los intervalos
   *
   * The second parameter stops the played interval when you make an action in the accordion
   * 
   * @param  {int} options.interval [int in milliseconds]
   * @param  {Boolean} options.stopOnEvent
   * @return {this}
   */

	}, {
		key: 'play',
		value: function play() {
			var _this6 = this;

			var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
			    _ref2$interval = _ref2.interval,
			    interval = _ref2$interval === undefined ? this.options.autoplay.interval : _ref2$interval,
			    _ref2$stopOnEvent = _ref2.stopOnEvent,
			    stopOnEvent = _ref2$stopOnEvent === undefined ? this.options.autoplay.stopOnEvent : _ref2$stopOnEvent;

			var $groups = this.$groups;
			var length = $groups.length;
			var count = this.autoplayCurrentIndex;

			this.stop();

			this.updateOptions({ autoplay: { interval: interval, stopOnEvent: stopOnEvent } });

			var open = function open() {

				if (count >= length) {
					if (_this6.options.autoplay.loop) {
						count = 0;
					} else {
						_this6.stop();
						return _this6.collapse();
					}
				}

				_this6.autoplayCurrentIndex = count;

				_this6.open($groups.eq(count));

				count++;
			};

			this.autoplayInterval = setInterval(open, this.options.autoplay.interval);

			open();

			this._trigger('play', this);

			return this;
		}

		/**
   * Pause the accordion when it have been played by the "play" method
   *
   * When the accordion is played again, it will start with the currently opened group
   * 
   * @return {this}
   */

	}, {
		key: 'pause',
		value: function pause() {
			this.stop(true);
			return this;
		}

		/**
   * Stop the accordion when it have been played by the "play" method
   *
   * When the accordion is played again, it will start with the first group
   *
   * @param  {Boolean} isPaused     [param internally used. Don't use from an instance]
   * @param  {Boolean} isFromAction [param internally used. Don't use from an instance]
   * @return {this}
   */

	}, {
		key: 'stop',
		value: function stop() {
			var isPaused = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
			var isFromAction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			if (!!this.autoplayInterval) {
				clearInterval(this.autoplayInterval);

				if (!isPaused) {
					this.autoplayCurrentIndex = 0;
					!isFromAction && this.collapse();
				}

				this._trigger(isPaused ? 'pause' : 'stop', this);
			}
		}

		/**
   * Refresh the heights of each group.
   *
   * Internally used in resize events
   * 
   * @return {this}
   */

	}, {
		key: 'updateHeights',
		value: function updateHeights() {
			this.$groups.each(function (i, el) {
				var $group = $(el);
				var instance = $group.data(_constants.DATA_GROUPS);

				if (!instance) return;

				if (instance.options.isGrandChild && instance.isActive) {
					instance.updateHeights();
					instance.$target.css({
						maxHeight: instance.height
					});
					instance.updateAncestorsHeights();
				}
			});

			return this;
		}

		/**
   * Restarts the accordion when it has been disabled
   * @return {this}
   */

	}, {
		key: 'enable',
		value: function enable() {
			try {
				var $groups = this.$el.find(this.options.groups);
				$groups.each(function (i, el) {
					var itemData = $(el).data(_constants.DATA_GROUPS);
					itemData.bind();
				});
				this.$el.removeClass('foldable--is-disabled');

				this._trigger('enable', this);
			} catch (e) {
				throw new Error('[Foldable] There was an error enabling a group');
			}

			return this;
		}

		/**
   * Disables the accordion, preventing any event interaction with it
   * @return {this}
   */

	}, {
		key: 'disable',
		value: function disable() {
			try {
				var $groups = this.$el.find(this.options.groups);
				$groups.each(function (i, el) {
					var itemData = $(el).data(_constants.DATA_GROUPS);
					itemData.disable();
				});

				this.$el.addClass('foldable--is-disabled');

				this._trigger('disable', this);
			} catch (e) {
				throw new Error('[Foldable] There was an error disabling a group');
			}

			return this;
		}

		/**
   * Set a new hash in the URL when a group have been toggled
   * @param  {String}  hash
   * @param  {Boolean} trigger
   * @return {this}
   */

	}, {
		key: 'updateHash',
		value: function updateHash() {
			var hash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

			if (!this.options.hash) return;
			if (typeof hash === 'undefined') hash = '';

			window.location.hash = hash;

			return this;
		}

		/**
   * Completely removes all classes, datas and events setted by the plugin and restores the plugin as it was at the beginning
   * @return {this}
   */

	}, {
		key: 'destroy',
		value: function destroy() {
			try {
				this.collapse(false);

				this.$el.removeClass('foldable--is-initialized foldable--is-disabled foldable--theme-' + this.options.theme).removeAttr('data-foldable-id').removeData(_constants.JQUERY_DATA_NAME);

				this.all.forEach(function (itemData) {
					var $group = itemData.$group;
					var $trigger = itemData.$trigger;
					var $target = itemData.$target;

					itemData.unbind();

					$group.off().removeClass('foldable--has-target foldable--has-children foldable--is-current foldable--is-opened foldable--is-closed foldable--is-opening foldable--is-closing foldable--is-first foldable--is-last foldable--level-' + itemData.level + ' foldable--is-active').removeAttr('data-foldable-role').removeData(_constants.DATA_GROUPS);

					$trigger.off().removeClass('foldable--is-active').removeAttr('data-foldable-role').removeData(_constants.DATA_GROUPS);

					$target.off().css({ maxHeight: '', overflow: '' }).removeClass('foldable--is-active').removeAttr('data-foldable-role').removeData(_constants.DATA_GROUPS).css('display', '').unwrap('[data-foldable-role="animation"]');
				});

				this._trigger('destroy', this);
			} catch (e) {
				throw new Error('[Foldable] There were an error destroying the accordion');
			}

			return this;
		}
	}]);

	return Foldable;
}(_emitter2.default);

exports.default = Foldable;
;

/**
 * jQuery plugin definition
 *
 * Add to the $.fn methods object a new property called Foldable to use it like a jQuery plugin
 * 
 */
(function (jQuery, exports) {
	$ = jQuery;
	function jQueryPlugin() {
		for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
			args[_key3] = arguments[_key3];
		}

		return this.each(function () {
			var $this = $(this),
			    data = $this.data(_constants.JQUERY_DATA_NAME);

			// create a new Foldable instance
			if (!data) {
				var options = $this.data('foldable-config');
				options = !!options ? options : args[0];

				$this.data(_constants.JQUERY_DATA_NAME, data = new Foldable($this, options));
			}

			// if a string is passed to the param, try to call it as a plugin method
			if (typeof args[0] === 'string') {
				var _data$method;

				var method = args[0];
				args.shift();
				(_data$method = data[method]).call.apply(_data$method, [data].concat(args));
			}
		});
	}

	var old = $.fn[_constants.JQUERY_PLUGIN_NAME];

	$.fn[_constants.JQUERY_PLUGIN_NAME] = jQueryPlugin;
	$.fn[_constants.JQUERY_PLUGIN_NAME].Constructor = Foldable;

	$.fn[_constants.JQUERY_PLUGIN_NAME].noConflict = function () {
		$.fn[_constants.JQUERY_PLUGIN_NAME] = old;
		return this;
	};

	// when de DOM is ready, try to auto create plugin instances of each element with [data-foldable]
	$(function () {
		var $foldables = $('[data-foldable]');

		if ($foldables.length) {
			$foldables.each(function (i, el) {
				var $foldable = $(el);

				if (!$foldable.data(_constants.JQUERY_DATA_NAME) && !$foldable.parents('code').length) {
					$foldable[_constants.JQUERY_PLUGIN_NAME]();
				}
			});
		}
	});
})(window.jQuery, window);
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ })
/******/ ]);
});
//# sourceMappingURL=foldable.js.map

// Generated by CoffeeScript 1.9.2

/**
@license Sticky-kit v1.1.2 | WTFPL | Leaf Corcoran 2015 | http://leafo.net
 */

(function() {
  var $, win;

  $ = this.jQuery || window.jQuery;

  win = $(window);

  $.fn.stick_in_parent = function (opts) {
    var doc, elm, enable_bottoming, fn, i, inner_scrolling, len, manual_spacer, offset_top, parent_selector, recalc_every, sticky_class;
    if (opts == null) {
      opts = {};
    }
    sticky_class = opts.sticky_class, inner_scrolling = opts.inner_scrolling, recalc_every = opts.recalc_every, parent_selector = opts.parent, offset_top = opts.offset_top, manual_spacer = opts.spacer, enable_bottoming = opts.bottoming;
    if (offset_top == null) {
      offset_top = 0;
    }
    if (parent_selector == null) {
      parent_selector = void 0;
    }
    if (inner_scrolling == null) {
      inner_scrolling = true;
    }
    if (sticky_class == null) {
      sticky_class = "is_stuck";
    }
    doc = $(document);
    if (enable_bottoming == null) {
      enable_bottoming = true;
    }
    fn = function(elm, padding_bottom, parent_top, parent_height, top, height, el_float, detached) {
      var bottomed, detach, fixed, last_pos, last_scroll_height, offset, parent, recalc, recalc_and_tick, recalc_counter, spacer, tick;
      if (elm.data("sticky_kit")) {
        return;
      }
      elm.data("sticky_kit", true);
      last_scroll_height = doc.height();
      parent = elm.parent();
      if (parent_selector != null) {
        parent = parent.closest(parent_selector);
      }
      if (!parent.length) {
        throw "failed to find stick parent";
      }
      fixed = false;
      bottomed = false;
      spacer = manual_spacer != null ? manual_spacer && elm.closest(manual_spacer) : $("<div />");
      if (spacer) {
        spacer.css('position', elm.css('position'));
      }
      recalc = function() {
        var border_top, padding_top, restore;
        if (detached) {
          return;
        }
        last_scroll_height = doc.height();
        border_top = parseInt(parent.css("border-top-width"), 10);
        padding_top = parseInt(parent.css("padding-top"), 10);
        padding_bottom = parseInt(parent.css("padding-bottom"), 10);
        parent_top = parent.offset().top + border_top + padding_top;
        parent_height = parent.height();
        if (fixed) {
          fixed = false;
          bottomed = false;
          if (manual_spacer == null) {
            elm.insertAfter(spacer);
            spacer.detach();
          }
          elm.css({
            position: "",
            top: "",
            width: "",
            bottom: ""
          }).removeClass(sticky_class);
          restore = true;
        }
        top = elm.offset().top - (parseInt(elm.css("margin-top"), 10) || 0) - offset_top;
        height = elm.outerHeight(true);
        el_float = elm.css("float");
        if (spacer) {
          spacer.css({
            width: elm.outerWidth(true),
            height: height,
            display: elm.css("display"),
            "vertical-align": elm.css("vertical-align"),
            "float": el_float
          });
        }
        if (restore) {
          return tick();
        }
      };
      recalc();
      if (height === parent_height) {
        return;
      }
      last_pos = void 0;
      offset = offset_top;
      recalc_counter = recalc_every;
      tick = function() {
        var css, delta, recalced, scroll, will_bottom, win_height;
        if (detached) {
          return;
        }
        recalced = false;
        if (recalc_counter != null) {
          recalc_counter -= 1;
          if (recalc_counter <= 0) {
            recalc_counter = recalc_every;
            recalc();
            recalced = true;
          }
        }
        if (!recalced && doc.height() !== last_scroll_height) {
          recalc();
          recalced = true;
        }
        scroll = win.scrollTop();
        if (last_pos != null) {
          delta = scroll - last_pos;
        }
        last_pos = scroll;
        if (fixed) {
          if (enable_bottoming) {
            will_bottom = scroll + height + offset > parent_height + parent_top;
            if (bottomed && !will_bottom) {
              bottomed = false;
              elm.css({
                position: "fixed",
                bottom: "",
                top: offset
              }).trigger("sticky_kit:unbottom");
            }
          }
          if (scroll < top) {
            fixed = false;
            offset = offset_top;
            if (manual_spacer == null) {
              if (el_float === "left" || el_float === "right") {
                elm.insertAfter(spacer);
              }
              spacer.detach();
            }
            css = {
              position: "",
              width: "",
              top: ""
            };
            elm.css(css).removeClass(sticky_class).trigger("sticky_kit:unstick");
          }
          if (inner_scrolling) {
            win_height = win.height();
            if (height + offset_top > win_height) {
              if (!bottomed) {
                offset -= delta;
                offset = Math.max(win_height - height, offset);
                offset = Math.min(offset_top, offset);
                if (fixed) {
                  elm.css({
                    top: offset + "px"
                  });
                }
              }
            }
          }
        } else {
          if (scroll > top) {
            fixed = true;
            css = {
              position: "fixed",
              top: offset
            };
            css.width = elm.css("box-sizing") === "border-box" ? elm.outerWidth() + "px" : elm.width() + "px";
            elm.css(css).addClass(sticky_class);
            if (manual_spacer == null) {
              elm.after(spacer);
              if (el_float === "left" || el_float === "right") {
                spacer.append(elm);
              }
            }
            elm.trigger("sticky_kit:stick");
          }
        }
        if (fixed && enable_bottoming) {
          if (will_bottom == null) {
            will_bottom = scroll + height + offset > parent_height + parent_top;
          }
          if (!bottomed && will_bottom) {
            bottomed = true;
            if (parent.css("position") === "static") {
              parent.css({
                position: "relative"
              });
            }
            return elm.css({
              position: "absolute",
              bottom: padding_bottom,
              top: "auto"
            }).trigger("sticky_kit:bottom");
          }
        }
      };
      recalc_and_tick = function() {
        recalc();
        return tick();
      };
      detach = function() {
        detached = true;
        win.off("touchmove", tick);
        win.off("scroll", tick);
        win.off("resize", recalc_and_tick);
        $(document.body).off("sticky_kit:recalc", recalc_and_tick);
        elm.off("sticky_kit:detach", detach);
        elm.removeData("sticky_kit");
        elm.css({
          position: "",
          bottom: "",
          top: "",
          width: ""
        });
        parent.position("position", "");
        if (fixed) {
          if (manual_spacer == null) {
            if (el_float === "left" || el_float === "right") {
              elm.insertAfter(spacer);
            }
            spacer.remove();
          }
          return elm.removeClass(sticky_class);
        }
      };
      win.on("touchmove", tick);
      win.on("scroll", tick);
      win.on("resize", recalc_and_tick);
      $(document.body).on("sticky_kit:recalc", recalc_and_tick);
      elm.on("sticky_kit:detach", detach);
      return setTimeout(tick, 0);
    };
    for (i = 0, len = this.length; i < len; i++) {
      elm = this[i];
      fn($(elm));
    }
    return this;
  };

}).call(this);

/**
 * This script adds the accessibility-ready responsive menus Genesis Framework child themes.
 *
 * @author StudioPress
 * @link https://github.com/copyblogger/responsive-menus
 * @version 1.1.3
 * @license GPL-2.0+
 */

( function ( document, $, undefined ) {

	'use strict';

	var genesisMenuParams      = typeof genesis_responsive_menu === 'undefined' ? '' : genesis_responsive_menu,
		genesisMenusUnchecked  = genesisMenuParams.menuClasses,
		genesisMenus           = {},
		menusToCombine         = [];

	/**
	 * Validate the menus passed by the theme with what's being loaded on the page,
	 * and pass the new and accurate information to our new data.
	 * @param {genesisMenusUnchecked} Raw data from the localized script in the theme.
	 * @return {array} genesisMenus array gets populated with updated data.
	 * @return {array} menusToCombine array gets populated with relevant data.
	 */
	$.each( genesisMenusUnchecked, function( group ) {

		// Mirror our group object to populate.
		genesisMenus[group] = [];

		// Loop through each instance of the specified menu on the page.
		$.each( this, function( key, value ) {

			var menuString = value,
				$menu      = $(value);

			// If there is more than one instance, append the index and update array.
			if ( $menu.length > 1 ) {

				$.each( $menu, function( key, value ) {

					var newString = menuString + '-' + key;

					$(this).addClass( newString.replace( '.','' ) );

					genesisMenus[group].push( newString );

					if ( 'combine' === group ) {
						menusToCombine.push( newString );
					}

				});

			} else if ( $menu.length == 1 ) {

				genesisMenus[group].push( menuString );

				if ( 'combine' === group ) {
					menusToCombine.push( menuString );
				}

			}

		});

	});

	// Make sure there is something to use for the 'others' array.
	if ( typeof genesisMenus.others == 'undefined' ) {
		genesisMenus.others = [];
	}

	// If there's only one menu on the page for combining, push it to the 'others' array and nullify our 'combine' variable.
	if (menusToCombine.length == 1) {
		genesisMenus.others.push( menusToCombine[0] );
		genesisMenus.combine = null;
		menusToCombine = null;
	}

	var genesisMenu         = {},
		mainMenuButtonClass = 'menu-toggle',
		subMenuButtonClass  = 'sub-menu-toggle',
		responsiveMenuClass = 'genesis-responsive-menu';

	// Initialize.
	genesisMenu.init = function() {

		// Exit early if there are no menus to do anything.
		if ( $( _getAllMenusArray() ).length == 0 ) {
			return;
		}

		var menuIconClass     = typeof genesisMenuParams.menuIconClass !== 'undefined' ? genesisMenuParams.menuIconClass : 'dashicons-before dashicons-menu',
			subMenuIconClass  = typeof genesisMenuParams.subMenuIconClass !== 'undefined' ? genesisMenuParams.subMenuIconClass : 'dashicons-before dashicons-arrow-down-alt2',
			toggleButtons     = {
				menu : $( '<button />', {
					'class' : mainMenuButtonClass,
					'aria-expanded' : false,
					'aria-pressed' : false
					} )
					.append( genesisMenuParams.mainMenu )
					.append( $( '<span />' ) ),
				submenu : $( '<button />', {
					'class' : subMenuButtonClass,
					'aria-expanded' : false,
					'aria-pressed' : false
					} )
					.append( $( '<span />', {
						'class' : 'screen-reader-text',
						'text' : genesisMenuParams.subMenu
					} ) )
			};

		// Add the responsive menu class to the active menus.
		_addResponsiveMenuClass();

		// Add the main nav button to the primary menu, or exit the plugin.
		_addMenuButtons( toggleButtons );

		// Setup additional classes.
		$( '.' + mainMenuButtonClass ).addClass( menuIconClass );
		$( '.' + subMenuButtonClass ).addClass( subMenuIconClass );
		$( '.' + mainMenuButtonClass ).on( 'click.genesisMenu-mainbutton', _mainmenuToggle ).each( _addClassID );
		$( '.' + subMenuButtonClass ).on( 'click.genesisMenu-subbutton', _submenuToggle );
		$( window ).on( 'resize.genesisMenu', _doResize ).triggerHandler( 'resize.genesisMenu' );
	};

	/**
	 * Add menu toggle button to appropriate menus.
	 * @param {toggleButtons} Object of menu buttons to use for toggles.
	 */
	function _addMenuButtons( toggleButtons ) {

		// Apply sub menu toggle to each sub-menu found in the menuList.
		$( _getMenuSelectorString( genesisMenus ) ).find( '.sub-menu' ).before( toggleButtons.submenu );

		if ( menusToCombine !== null ) {

			var menusToToggle = genesisMenus.others.concat( menusToCombine[0] );

		 	// Only add menu button the primary menu and navs NOT in the combine variable.
		 	$( _getMenuSelectorString( menusToToggle ) ).before( toggleButtons.menu );

		} else {

			// Apply the main menu toggle to all menus in the list.
			$( _getMenuSelectorString( genesisMenus.others ) ).before( toggleButtons.menu );

		}

	}

	/**
	 * Add the responsive menu class.
	 */
	function _addResponsiveMenuClass() {
		$( _getMenuSelectorString( genesisMenus ) ).addClass( responsiveMenuClass );
	}

	/**
	 * Execute our responsive menu functions on window resizing.
	 */
	function _doResize() {
		var buttons   = $( 'button[id^="genesis-mobile-"]' ).attr( 'id' );
		if ( typeof buttons === 'undefined' ) {
			return;
		}
		_maybeClose( buttons );
		_superfishToggle( buttons );
		_changeSkipLink( buttons );
		_combineMenus( buttons );
	}

	/**
	 * Add the nav- class of the related navigation menu as
	 * an ID to associated button (helps target specific buttons outside of context).
	 */
	function _addClassID() {
		var $this = $( this ),
			nav   = $this.next( 'nav' ),
			id    = 'class';

		$this.attr( 'id', 'genesis-mobile-' + $( nav ).attr( id ).match( /nav-\w*\b/ ) );
	}

	/**
	 * Combine our menus if the mobile menu is visible.
	 * @params buttons
	 */
	function _combineMenus( buttons ){

		// Exit early if there are no menus to combine.
		if ( menusToCombine == null ) {
			return;
		}

		// Split up the menus to combine based on order of appearance in the array.
		var primaryMenu   = menusToCombine[0],
			combinedMenus = $( menusToCombine ).filter( function(index) { if ( index > 0 ) { return index; } });

		// If the responsive menu is active, append items in 'combinedMenus' object to the 'primaryMenu' object.
		if ( 'none' !== _getDisplayValue( buttons ) ) {

			$.each( combinedMenus, function( key, value ) {
				$(value).find( '.menu > li' ).addClass( 'moved-item-' + value.replace( '.','' ) ).appendTo( primaryMenu + ' ul.genesis-nav-menu' );
			});
			$( _getMenuSelectorString( combinedMenus ) ).hide();

		} else {

			$( _getMenuSelectorString( combinedMenus ) ).show();
			$.each( combinedMenus, function( key, value ) {
				$( '.moved-item-' + value.replace( '.','' ) ).appendTo( value + ' ul.genesis-nav-menu' ).removeClass( 'moved-item-' + value.replace( '.','' ) );
			});

		}

	}


	/**
	 * Action for submenu toggles.
	 */
	function _submenuToggle() { 
		var $this = $(this),
			others = $this.closest( '.menu-item' ).siblings();
		_toggleAria( $this, 'aria-pressed' );
		_toggleAria( $this, 'aria-expanded' );
		$this.toggleClass( 'activated' );
		$this.next( '.sub-menu' ).slideToggle( 'fast' );
		others.find( '.' + subMenuButtonClass ).removeClass( 'activated' ).attr( 'aria-pressed', 'false' );
		others.find('.sub-menu').slideUp('fast');
		$this.trigger("sub_menu.custom_click");
	}

	/**
	 * Action to happen when the main menu button is clicked.
	 */
	function _mainmenuToggle() {
		var $this = $(this);
		_toggleAria($this, 'aria-pressed');
		_toggleAria($this, 'aria-expanded');
		$this.toggleClass('activated');
		$this.next('nav').slideToggle('fast');
		$this.trigger("main_menu.custom_click");
	}

	/**
	 * Activate/deactivate superfish.
	 * @params buttons
	 */
	function _superfishToggle( buttons ) {
		var _superfish = $( '.' + responsiveMenuClass + ' .js-superfish' ),
			$args      = 'destroy';
		if ( typeof _superfish.superfish !== 'function' ) {
			return;
		}
		if ( 'none' === _getDisplayValue( buttons ) ) {
			$args = {
				'delay': 100,
				'animation': {'opacity': 'show', 'height': 'show'},
				'dropShadows': false,
				'speed': 'fast'
			};
		}
		_superfish.superfish( $args );
	}

	/**
	 * Modify skip link to match mobile buttons.
	 * @param buttons
	 */
	function _changeSkipLink( buttons ) {

		// Start with an empty array.
		var menuToggleList = _getAllMenusArray();

		// Exit out if there are no menu items to update.
		if ( ! $( menuToggleList ).length > 0 ) {
			return;
		}

		$.each( menuToggleList, function ( key, value ) {

			var newValue  = value.replace( '.', '' ),
				startLink = 'genesis-' + newValue,
				endLink   = 'genesis-mobile-' + newValue;

			if ( 'none' == _getDisplayValue( buttons ) ) {
				startLink = 'genesis-mobile-' + newValue;
				endLink   = 'genesis-' + newValue;
			}

			var $item = $( '.genesis-skip-link a[href="#' + startLink + '"]' );

			if ( menusToCombine !== null && value !== menusToCombine[0] ) {
				$item.toggleClass( 'skip-link-hidden' );
			}

			if ( $item.length > 0 ) {
				var link  = $item.attr( 'href' );
					link  = link.replace( startLink, endLink );

				$item.attr( 'href', link );
			} else {
				return;
			}

		});

	}

	/**
	 * Close all the menu toggles if buttons are hidden.
	 * @param buttons
	 */
	function _maybeClose( buttons ) {
		if ( 'none' !== _getDisplayValue( buttons ) ) {
			return true;
		}

		$( '.' + mainMenuButtonClass + ', .' + responsiveMenuClass + ' .sub-menu-toggle' )
			.removeClass( 'activated' )
			.attr( 'aria-expanded', false )
			.attr( 'aria-pressed', false );

		$( '.' + responsiveMenuClass + ', .' + responsiveMenuClass + ' .sub-menu' )
			.attr( 'style', '' );
	}

	/**
	 * Generic function to get the display value of an element.
	 * @param  {id} $id ID to check
	 * @return {string}     CSS value of display property
	 */
	function _getDisplayValue( $id ) {
		var element = document.getElementById( $id ),
			style   = window.getComputedStyle( element );
		return style.getPropertyValue( 'display' );
	}

	/**
	 * Toggle aria attributes.
	 * @param  {button} $this     passed through
	 * @param  {aria-xx} attribute aria attribute to toggle
	 * @return {bool}           from _ariaReturn
	 */
	function _toggleAria( $this, attribute ) {
		$this.attr( attribute, function( index, value ) {
			return 'false' === value;
		});
	}

	/**
	 * Helper function to return a comma separated string of menu selectors.
	 * @param {itemArray} Array of menu items to loop through.
	 * @param {ignoreSecondary} boolean of whether to ignore the 'secondary' menu item.
	 * @return {string} Comma-separated string.
	 */
	function _getMenuSelectorString( itemArray ) {

		var itemString = $.map( itemArray, function( value, key ) {
			return value;
		});

		return itemString.join( ',' );

	}

	/**
	 * Helper function to return a group array of all the menus in
	 * both the 'others' and 'combine' arrays.
	 * @return {array} Array of all menu items as class selectors.
	 */
	function _getAllMenusArray() {

		// Start with an empty array.
		var menuList = [];

		// If there are menus in the 'menusToCombine' array, add them to 'menuList'.
		if ( menusToCombine !== null ) {

			$.each( menusToCombine, function( key, value ) {
				menuList.push( value.valueOf() );
			});

		}

		// Add menus in the 'others' array to 'menuList'.
		$.each( genesisMenus.others, function( key, value ) {
			menuList.push( value.valueOf() );
		});

		if ( menuList.length > 0 ) {
			return menuList;
		} else {
			return null;
		}

	}

	$(document).ready(function () {

		if ( _getAllMenusArray() !== null ) {

			genesisMenu.init();

		}

	});

})( document, jQuery );


/**
 * Add any custom theme JavaScript to this file.
 */

function adjustTopImage($) {

	var topBar = $('.site-header');
	var media = $('.top-home .widget_media_image');
	var bottomOfTopBar = topBar.outerHeight() + $(window).scrollTop();
	var bottomOfMediaImage = media.outerHeight() + media.offset().top;
	var topSecondaryNav = $('.nav-secondary').offset().top;

	var secondNavDirectlyInBody = $('.nav-secondary').parent().is('body');
	if (bottomOfTopBar >= topSecondaryNav && secondNavDirectlyInBody) {
		$('.nav-secondary').detach().appendTo(".site-header");
		var contentPlacement = $('header.site-header').position().top + $('header.site-header  ').height();
		$('header.site-header').next().css('margin-top', contentPlacement);
	}

	if (bottomOfMediaImage >= bottomOfTopBar && !secondNavDirectlyInBody) {
		$('.nav-secondary').detach().insertBefore(".site-inner");
		var contentPlacement = $('header.site-header').position().top + $('header.site-header  ').height();
		$('header.site-header').next().css('margin-top', contentPlacement);
	}
}

(function (document, $) {

	'use strict';

	if (window.matchMedia("(min-width: 896px)").matches) {

		var contentPlacement = $('header.site-header').position().top + $('header.site-header').height();
		$('header.site-header').next().css('margin-top', contentPlacement);
		if ($(".top-home img").length > 0) {
			$(".top-home img").load(
				function () {
					$('.nav-secondary').detach().insertBefore(".site-inner");
					var contentPlacement = $('header.site-header').position().top + $('header.site-header  ').height();
					$('header.site-header').next().css('margin-top', contentPlacement);
					$('top-home').css('margin-top', 0);

					$(window).scroll(function () { adjustTopImage($) });
					$(window).resize(function () { adjustTopImage($) });

				}
			);
		}
		else {
			var contentPlacement = $('.site-container header').position().top + $('.site-container header').height();
			$('.site-inner').css('margin-top', contentPlacement);
			$('top-home').css('margin-top', 0);
		}
	}
	
	var mainMenuButtonClass = 'menu-toggle';
	var subMenuButtonClass = 'sub-menu-toggle';

	$(".top-header").on("main_menu.custom_click", "." + mainMenuButtonClass,
		function (evt) {
			$(".menu-toggle").toggle();
			$(".quadmenu-navbar-toggle").trigger("click", true);
			$(".quadmenu-navbar-header").css("margin-top", "-76px");
		});

	$(".top-header").on("click", ".quadmenu-navbar-toggle",
		function (evt, isTriggered) {
			if (!(isTriggered))
			{
				$(".menu-toggle").click();
			}
		});


	//$('.' + mainMenuButtonClass).on("main_menu.custom_click", function () {
	//	alert("this");
	//	$('.' + subMenuButtonClass).click('click.genesisMenu-subbutton');
	//});
} )( document, jQuery );
