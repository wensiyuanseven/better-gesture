module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    const descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "b91a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BetterGesture; });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function getLen(v) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

function dot(v1, v2) {
  return v1.x * v2.x + v1.y * v2.y;
}

function getAngle(v1, v2) {
  var mr = getLen(v1) * getLen(v2);
  if (mr === 0) return 0;
  var r = dot(v1, v2) / mr;
  if (r > 1) r = 1;
  return Math.acos(r);
}

function cross(v1, v2) {
  return v1.x * v2.y - v2.x * v1.y;
}

function getRotateAngle(v1, v2) {
  var angle = getAngle(v1, v2);

  if (cross(v1, v2) > 0) {
    angle *= -1;
  }

  return angle * 180 / Math.PI;
}

function getUserAgent() {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return 'Mobile';
  } else {
    return 'PC';
  }
}

var Observer = /*#__PURE__*/function () {
  function Observer(el) {
    _classCallCheck(this, Observer);

    this._Observer = {};
    this.el = el;
  }

  _createClass(Observer, [{
    key: "register",
    value: function register(type, func) {
      if (typeof func === 'function') {
        if (typeof this._Observer[type] === 'undefined') {
          this._Observer[type] = [func];
        } else {
          this._Observer[type].push(func);
        }
      }
    }
  }, {
    key: "dispatch",
    value: function dispatch(type, args) {
      if (this._Observer[type]) {
        var that = this;
        args.gesture = {
          event: Object.keys(this._Observer),
          on: function on(type, func) {
            that.register(type, func);
          },
          off: function off(type) {
            that.remove(type);
          },
          destroy: function destroy() {
            that._Observer = {};
          }
        };

        for (var i = 0, len = this._Observer[type].length; i < len; i++) {
          var handler = this._Observer[type][i]; // 如果不用 apply修改，this指向_Observer

          typeof handler === 'function' && handler.call(this.el, args);
        }
      }
    }
  }, {
    key: "remove",
    value: function remove(type) {
      if (this._Observer[type] instanceof Array) {
        for (var i = this._Observer[type].length - 1; i >= 0; i--) {
          this._Observer[type].splice(i, 1);
        }
      }
    }
  }]);

  return Observer;
}();

var BetterGesture = /*#__PURE__*/function () {
  function BetterGesture(el) {
    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, BetterGesture);

    this.element = typeof el == 'string' ? document.querySelector(el) : el;
    this.userAgent = getUserAgent();
    this.start = this.start.bind(this);
    this.move = this.move.bind(this);
    this.end = this.end.bind(this);
    this.cancel = this.cancel.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
    this.Observer = new Observer(this.element);

    if (this.userAgent === 'Mobile') {
      this.element.addEventListener("touchstart", this.start, false);
      this.element.addEventListener("touchmove", this.move, false);
      this.element.addEventListener("touchend", this.end, false);
      this.element.addEventListener("touchcancel", this.cancel, false);
      this.Observer.register('touchStart', option.touchStart);
      this.Observer.register('touchMove', option.touchMove);
      this.Observer.register('touchEnd', option.touchEnd);
      this.Observer.register('touchCancel', option.touchCancel);
      this.Observer.register('multipointStart', option.multipointStart);
      this.Observer.register('multipointEnd', option.multipointEnd);
      this.Observer.register('pinch', option.pinch);
      this.Observer.register('twoFingerPressMove', option.twoFingerPressMove);
      this.Observer.register('rotate', option.rotate);
    } else {
      this.element.addEventListener("mousedown", this.start, false);
      this.element.addEventListener("mousemove", this.move, false);
      this.element.addEventListener("mouseup", this.end, false);
      this.element.addEventListener("mouseover", this.mouseOver, false);
      this.element.addEventListener("mouseout", this.mouseOut, false);
      this.Observer.register("mouseDown", option.mouseDown);
      this.Observer.register("mouseMove", option.mouseMove);
      this.Observer.register("mouseUp", option.mouseUp);
      this.Observer.register('mouseOver', option.mouseOver);
      this.Observer.register('mouseOut', option.mouseOut);
    }

    this.Observer.register('swipe', option.swipe);
    this.Observer.register('tap', option.tap);
    this.Observer.register('doubleTap', option.doubleTap);
    this.Observer.register('longTap', option.longTap);
    this.Observer.register('singleTap', option.singleTap);
    this.Observer.register('pressMove', option.pressMove);
    this._cancelAllHandler = this.cancelAll.bind(this);
    window.addEventListener('scroll', this._cancelAllHandler);
    this.preV = {
      x: null,
      y: null
    };
    this.pinchStartLen = null;
    this.zoom = 1;
    this.isDoubleTap = false;
    this.delta = null;
    this.last = null;
    this.now = null;
    this.tapTimeout = null;
    this.singleTapTimeout = null;
    this.longTapTimeout = null;
    this.swipeTimeout = null;
    this.x1 = this.x2 = this.y1 = this.y2 = null;
    this.preTapPosition = {
      x: null,
      y: null
    };
    this.isPress = false;
  }

  _createClass(BetterGesture, [{
    key: "start",
    value: function start(evt) {
      this.now = Date.now();
      this.isPress = true;

      if (this.userAgent === 'Mobile') {
        this.x1 = evt.touches[0].pageX;
        this.y1 = evt.touches[0].pageY;
      } else {
        this.x1 = evt.pageX;
        this.y1 = evt.pageY;
      }

      this.delta = this.now - (this.last || this.now);
      this.Observer.dispatch(this.userAgent === 'Mobile' ? 'touchStart' : 'mouseDown', evt);

      if (this.preTapPosition.x !== null) {
        this.isDoubleTap = this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30;
        if (this.isDoubleTap) clearTimeout(this.singleTapTimeout);
      }

      this.preTapPosition.x = this.x1;
      this.preTapPosition.y = this.y1;
      this.last = this.now;
      var preV = this.preV;

      if (evt.touches && evt.touches.length > 1) {
        this._cancelLongTap();

        this._cancelSingleTap();

        var v = {
          x: evt.touches[1].pageX - this.x1,
          y: evt.touches[1].pageY - this.y1
        };
        preV.x = v.x;
        preV.y = v.y;
        this.pinchStartLen = getLen(preV);
        this.Observer.dispatch('multipointStart', evt);
      }

      this._preventTap = false;
      this.longTapTimeout = setTimeout(function () {
        this.Observer.dispatch('longTap', evt);
        this._preventTap = true;
      }.bind(this), 750);
    }
  }, {
    key: "move",
    value: function move(evt) {
      var preV = this.preV,
          currentX = 0,
          currentY = evt.pageY || evt.touches[0].pageY;

      if (this.userAgent === 'Mobile') {
        currentX = evt.touches[0].pageX;
        currentY = evt.touches[0].pageY;
      } else {
        currentX = evt.pageX;
        currentY = evt.pageY;
      }

      this.isDoubleTap = false;

      if (evt.touches && evt.touches.length > 1) {
        var sCurrentX = evt.touches[1].pageX,
            sCurrentY = evt.touches[1].pageY;
        var v = {
          x: evt.touches[1].pageX - currentX,
          y: evt.touches[1].pageY - currentY
        };

        if (preV.x !== null) {
          if (this.pinchStartLen > 0) {
            evt.zoom = getLen(v) / this.pinchStartLen;
            this.Observer.dispatch('pinch', evt);
          }

          evt.angle = getRotateAngle(v, preV);
          this.Observer.dispatch('rotate', evt);
        }

        preV.x = v.x;
        preV.y = v.y;

        if (this.x2 !== null && this.sx2 !== null) {
          evt.deltaX = (currentX - this.x2 + sCurrentX - this.sx2) / 2;
          evt.deltaY = (currentY - this.y2 + sCurrentY - this.sy2) / 2;
        } else {
          evt.deltaX = 0;
          evt.deltaY = 0;
        }

        this.Observer.dispatch('twoFingerPressMove', evt);
        this.sx2 = sCurrentX;
        this.sy2 = sCurrentY;
      } else {
        if (this.x2 !== null) {
          evt.deltaX = currentX - this.x2;
          evt.deltaY = currentY - this.y2; //move事件中添加对当前触摸点到初始触摸点的判断，
          //如果曾经大于过某个距离(比如10),就认为是移动到某个地方又移回来，应该不再触发tap事件才对。

          var movedX = Math.abs(this.x1 - this.x2),
              movedY = Math.abs(this.y1 - this.y2);

          if (movedX > 10 || movedY > 10) {
            this._preventTap = true;
          }
        } else {
          evt.deltaX = 0;
          evt.deltaY = 0;
        }

        if (this.isPress) {
          this.Observer.dispatch('pressMove', evt);
        }
      }

      this.Observer.dispatch(this.userAgent === 'Mobile' ? 'touchMove' : 'mouseMove', evt);

      this._cancelLongTap();

      this.x2 = currentX;
      this.y2 = currentY;

      if (evt.touches && evt.touches.length > 1) {
        evt.preventDefault();
      }
    }
  }, {
    key: "end",
    value: function end(evt) {
      this._cancelLongTap();

      this.isPress = false;
      var self = this;

      if (evt.touches && evt.touches.length < 2) {
        this.Observer.dispatch('multipointEnd', evt);
        this.sx2 = this.sy2 = null;
      }

      if (this.x2 && Math.abs(this.x1 - this.x2) > 30 || this.y2 && Math.abs(this.y1 - this.y2) > 30) {
        evt.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2);
        this.swipeTimeout = setTimeout(function () {
          self.Observer.dispatch('swipe', evt);
        }, 0);
      } else {
        this.tapTimeout = setTimeout(function () {
          if (!self._preventTap) {
            self.Observer.dispatch('tap', evt);
          } // trigger double tap immediately


          if (self.isDoubleTap) {
            self.Observer.dispatch('doubleTap', evt);
            self.isDoubleTap = false;
          }
        }, 0);

        if (!self.isDoubleTap) {
          self.singleTapTimeout = setTimeout(function () {
            self.Observer.dispatch('singleTap', evt);
          }, 250);
        }
      }

      this.Observer.dispatch(this.userAgent === 'Mobile' ? 'touchEnd' : 'mouseUp', evt);
      this.preV.x = 0;
      this.preV.y = 0;
      this.zoom = 1;
      this.pinchStartLen = null;
      this.x1 = this.x2 = this.y1 = this.y2 = null;
    }
  }, {
    key: "mouseOver",
    value: function mouseOver(evt) {
      this.Observer.dispatch('mouseOver', evt);
    }
  }, {
    key: "mouseOut",
    value: function mouseOut(evt) {
      this.Observer.dispatch('mouseOut', evt);
    }
  }, {
    key: "cancel",
    value: function cancel(evt) {
      this.cancelAll();
      this.Observer.dispatch('touchCancel', evt);
    }
  }, {
    key: "cancelAll",
    value: function cancelAll() {
      this._preventTap = true;
      clearTimeout(this.singleTapTimeout);
      clearTimeout(this.tapTimeout);
      clearTimeout(this.longTapTimeout);
      clearTimeout(this.swipeTimeout);
    }
  }, {
    key: "_cancelLongTap",
    value: function _cancelLongTap() {
      clearTimeout(this.longTapTimeout);
    }
  }, {
    key: "_cancelSingleTap",
    value: function _cancelSingleTap() {
      clearTimeout(this.singleTapTimeout);
    }
  }, {
    key: "_swipeDirection",
    value: function _swipeDirection(x1, x2, y1, y2) {
      return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? 'Left' : 'Right' : y1 - y2 > 0 ? 'Up' : 'Down';
    } //注册

  }, {
    key: "on",
    value: function on(type, func) {
      this.Observer.register(type, func);
    } // 移除

  }, {
    key: "off",
    value: function off(type, func) {
      this.Observer.remove(type, func);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      // 清除定时器
      if (this.singleTapTimeout) clearTimeout(this.singleTapTimeout);
      if (this.tapTimeout) clearTimeout(this.tapTimeout);
      if (this.longTapTimeout) clearTimeout(this.longTapTimeout);
      if (this.swipeTimeout) clearTimeout(this.swipeTimeout);

      if (this.userAgent === 'Mobile') {
        this.element.removeEventListener("touchstart", this.start);
        this.element.removeEventListener("touchmove", this.move);
        this.element.removeEventListener("touchend", this.end);
        this.element.removeEventListener("touchcancel", this.cancel);
      } else {
        this.element.removeEventListener("mousedown", this.start);
        this.element.removeEventListener("mousemove", this.move);
        this.element.removeEventListener("mouseup", this.end);
        this.element.removeEventListener("mouseup", this.end);
        this.element.removeEventListener("mouseover", this.mouseOver);
      }

      this.Observer._Observer = {}; // 状态滞空

      this.preV = this.pinchStartLen = this.zoom = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = null;
      window.removeEventListener('scroll', this._cancelAllHandler);
      return null;
    }
  }]);

  return BetterGesture;
}();



(function () {
  if ( true && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    module.exports = BetterGesture;
  } else {
    window.BetterGesture = BetterGesture;
  }
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("dd40")(module)))

/***/ }),

/***/ "dd40":
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./src/lib/better-gesture.js
var better_gesture = __webpack_require__("b91a");

// CONCATENATED MODULE: ./src/lib/index.js

var CACHE = [];

var getElemCacheIndex = function getElemCacheIndex(elem) {
  for (var i = 0, len = CACHE.length; i < len; i++) {
    if (CACHE[i].elem === elem) {
      return i;
    }
  }

  return null;
};

var lib_doOnOrOff = function doOnOrOff(cacheObj, options) {
  var eventName = options.eventName;
  var elem = options.elem;
  var func = options.func;
  var oldFunc = options.oldFunc;

  if (cacheObj && cacheObj.gesture) {
    if (cacheObj.gesture.off && oldFunc) {
      cacheObj.gesture.off(eventName, oldFunc);
    }

    if (cacheObj.gesture.on && func) {
      cacheObj.gesture.on(eventName, func);
    }
  } else {
    options = {};
    options[eventName] = func;
    CACHE.push({
      elem: elem,
      gesture: new better_gesture["a" /* default */](elem, options)
    });
  }
};

var getEventName = function getEventName(name) {
  return name.replace(/-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
};

/* harmony default export */ var lib = ({
  install: function install(Vue) {
    Vue.directive('gesture', {
      bind: function bind(elem, binding) {
        var func = binding.value;
        var oldFunc = binding.oldValue;
        var cacheObj = CACHE[getElemCacheIndex(elem)];
        lib_doOnOrOff(cacheObj, {
          elem: elem,
          func: func,
          oldFunc: oldFunc,
          eventName: getEventName(binding.arg)
        });
      },
      unbind: function unbind(elem) {
        var index = getElemCacheIndex(elem);

        if (!isNaN(index)) {
          var delArr = CACHE.splice(index, 1);

          if (delArr.length && delArr[0] && delArr[0].gesture.destroy) {
            delArr[0].gesture.destroy();
          }
        }
      }
    });
  }
});
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (lib);



/***/ })

/******/ });
//# sourceMappingURL=better-gesture.common.js.map