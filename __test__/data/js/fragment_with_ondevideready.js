
/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
    /******/ 		// Check if module is in cache
    /******/ 		var cachedModule = __webpack_module_cache__[moduleId];
    /******/ 		if (cachedModule !== undefined) {
        /******/ 			return cachedModule.exports;
        /******/ 		}
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = __webpack_module_cache__[moduleId] = {
        /******/ 			id: moduleId,
        /******/ 			loaded: false,
        /******/ 			exports: {}
        /******/ 		};
    /******/
    /******/ 		// Execute the module function
    /******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/
    /******/ 		// Flag the module as loaded
    /******/ 		module.loaded = true;
    /******/
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports;
    /******/ 	}
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
    /******/ 		// getDefaultExport function for compatibility with non-harmony modules
    /******/ 		__webpack_require__.n = function(module) {
        /******/ 			var getter = module && module.__esModule ?
            /******/ 				function() { return module['default']; } :
            /******/ 				function() { return module; };
        /******/ 			__webpack_require__.d(getter, { a: getter });
        /******/ 			return getter;
        /******/ 		};
    /******/ 	}();
/******/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
    /******/ 		// define getter functions for harmony exports
    /******/ 		__webpack_require__.d = function(exports, definition) {
        /******/ 			for(var key in definition) {
            /******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                /******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                /******/ 				}
            /******/ 			}
        /******/ 		};
    /******/ 	}();
/******/
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
    /******/ 		__webpack_require__.g = (function() {
        /******/ 			if (typeof globalThis === 'object') return globalThis;
        /******/ 			try {
            /******/ 				return this || new Function('return this')();
            /******/ 			} catch (e) {
            /******/ 				if (typeof window === 'object') return window;
            /******/ 			}
        /******/ 		})();
    /******/ 	}();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
    /******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
    /******/ 	}();
/******/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
    /******/ 		// define __esModule on exports
    /******/ 		__webpack_require__.r = function(exports) {
        /******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            /******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            /******/ 			}
        /******/ 			Object.defineProperty(exports, '__esModule', { value: true });
        /******/ 		};
    /******/ 	}();
/******/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
    /******/ 		__webpack_require__.nmd = function(module) {
        /******/ 			module.paths = [];
        /******/ 			if (!module.children) module.children = [];
        /******/ 			return module;
        /******/ 		};
    /******/ 	}();
/******/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
    /******/ 		var scriptUrl;
    /******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
    /******/ 		var document = __webpack_require__.g.document;
    /******/ 		if (!scriptUrl && document) {
        /******/ 			if (document.currentScript)
            /******/ 				scriptUrl = document.currentScript.src
        /******/ 			if (!scriptUrl) {
            /******/ 				var scripts = document.getElementsByTagName("script");
            /******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
            /******/ 			}
        /******/ 		}
    /******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
    /******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
    /******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
    /******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
    /******/ 		__webpack_require__.p = scriptUrl;
    /******/ 	}();
/******/
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
    /*!***********************!*\
      !*** ./src/index.jsx ***!
      \***********************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");
    /* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
    /* harmony import */ var _components_App_App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/App/App */ "./src/components/App/App.tsx");




    function startApp() {
        var root = react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot(document.getElementById('app-container'));
        root.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().StrictMode), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_components_App_App__WEBPACK_IMPORTED_MODULE_3__["default"], null)));
    }
    document.addEventListener('deviceready', startApp, false);
}();
/******/ })()
;