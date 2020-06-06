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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/script/gallery.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/script/gallery.js":
/*!*******************************!*\
  !*** ./src/script/gallery.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Potrzebne handlerki do działania skryptu.
 */
const lightboxElement = document.body.querySelector("#lightbox");
const galleryElement = document.body.querySelector("#gallery");
const leftArrow = document.body.querySelector("#left-arrow");
const rightArrow = document.body.querySelector("#right-arrow");
const lightboxShowcaseImgElement = document.body.querySelector("#lightbox-showcase");

/**
 * To nasz stan skryptu przechowujący informację o aktualnie wyświetlonym obrazie w lightboxie.
 */
let lightboxState = 0;

/**
 * Pobieramy wszystkie obrazy które znajdują się w galerii
 */
const avalibleImages = Array.from(galleryElement.children).filter((el) => el.nodeName === "IMG");

/**
 * Tworzymy listę dostępnych dla lightboxa linków do obrazków wg konwencji
 * (miniatury mają słowo mini w nazwie pełne obrazy taką samą nazwę tylko bez 'mini')
 */
const avalibleImagesSrc = avalibleImages.map((image) =>
  image.currentSrc.replace("mini", "")
);

/**
 * Funkcja która startuje plugina (odpalam ją na końcu skryptu)
 */
function startLightboxPlugin() {
  avalibleImages
    .forEach((element, index) =>
      element.addEventListener("click", () => showImage(index))
    );
  leftArrow.addEventListener("click", showPreviousImage);
  rightArrow.addEventListener("click", showNextImage);
  lightboxElement.addEventListener("click", hideLightbox);
}

/**
 * Pokazuje konkretny obrazek o kolejności x. (Pierwszy w galeri ma index 0!)
 */
function showImage(index) {
  showLightbox();
  lightboxState = index;
  lightboxShowcaseImgElement.src = avalibleImagesSrc[index];
}

/**
 * Pokazuje następny obraz (pamiętając o maksmalnej ilości obrazów)
 */
function showNextImage() {
  const nextImageNumber = (lightboxState + 1) % avalibleImagesSrc.length;
  showImage(nextImageNumber);
}

/**
 * Pokazujemy poprzeni obraz jeżeli jesteśmy na pierwszym obrazie to pokazujemy ostatni
 */
function showPreviousImage() {
  const previousImageNumber = (lightboxState - 1) % avalibleImagesSrc.length;
  showImage(previousImageNumber < 0 ? avalibleImagesSrc.length - 1 : previousImageNumber);
}

/**
 * Funkcja ukrywająca lightboxa (wszystko prócz strzałek zamyka lightbox)
 */
function hideLightbox(element) {
  if (
    !element.target.isSameNode(rightArrow) &&
    !element.target.isSameNode(leftArrow)
  ) {
    lightboxShowcaseImgElement.src = '';
    document.body.style.overflow = "auto";
    lightboxElement.classList.remove("visible");
  }
}

/**
 * Pokazujemy lightbox i ukrywamy scrollbar w wersji 2 tego pluginu można było by pomyśleć o usunięciu skoku który to powoduje.
 */
function showLightbox() {
  document.body.style.overflow = "hidden";
  lightboxElement.classList.add("visible");
}

/**
 * Startujemy plugin.
 */
startLightboxPlugin();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdC9nYWxsZXJ5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdhbGxlcnlKUy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9zY3JpcHQvZ2FsbGVyeS5qc1wiKTtcbiIsIi8qKlxuICogUG90cnplYm5lIGhhbmRsZXJraSBkbyBkemlhxYJhbmlhIHNrcnlwdHUuXG4gKi9cbmNvbnN0IGxpZ2h0Ym94RWxlbWVudCA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcihcIiNsaWdodGJveFwiKTtcbmNvbnN0IGdhbGxlcnlFbGVtZW50ID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKFwiI2dhbGxlcnlcIik7XG5jb25zdCBsZWZ0QXJyb3cgPSBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoXCIjbGVmdC1hcnJvd1wiKTtcbmNvbnN0IHJpZ2h0QXJyb3cgPSBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoXCIjcmlnaHQtYXJyb3dcIik7XG5jb25zdCBsaWdodGJveFNob3djYXNlSW1nRWxlbWVudCA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcihcIiNsaWdodGJveC1zaG93Y2FzZVwiKTtcblxuLyoqXG4gKiBUbyBuYXN6IHN0YW4gc2tyeXB0dSBwcnplY2hvd3VqxIVjeSBpbmZvcm1hY2rEmSBvIGFrdHVhbG5pZSB3ecWbd2lldGxvbnltIG9icmF6aWUgdyBsaWdodGJveGllLlxuICovXG5sZXQgbGlnaHRib3hTdGF0ZSA9IDA7XG5cbi8qKlxuICogUG9iaWVyYW15IHdzenlzdGtpZSBvYnJhenkga3TDs3JlIHpuYWpkdWrEhSBzacSZIHcgZ2FsZXJpaVxuICovXG5jb25zdCBhdmFsaWJsZUltYWdlcyA9IEFycmF5LmZyb20oZ2FsbGVyeUVsZW1lbnQuY2hpbGRyZW4pLmZpbHRlcigoZWwpID0+IGVsLm5vZGVOYW1lID09PSBcIklNR1wiKTtcblxuLyoqXG4gKiBUd29yenlteSBsaXN0xJkgZG9zdMSZcG55Y2ggZGxhIGxpZ2h0Ym94YSBsaW5rw7N3IGRvIG9icmF6a8OzdyB3ZyBrb253ZW5jamlcbiAqIChtaW5pYXR1cnkgbWFqxIUgc8WCb3dvIG1pbmkgdyBuYXp3aWUgcGXFgm5lIG9icmF6eSB0YWvEhSBzYW3EhSBuYXp3xJkgdHlsa28gYmV6ICdtaW5pJylcbiAqL1xuY29uc3QgYXZhbGlibGVJbWFnZXNTcmMgPSBhdmFsaWJsZUltYWdlcy5tYXAoKGltYWdlKSA9PlxuICBpbWFnZS5jdXJyZW50U3JjLnJlcGxhY2UoXCJtaW5pXCIsIFwiXCIpXG4pO1xuXG4vKipcbiAqIEZ1bmtjamEga3TDs3JhIHN0YXJ0dWplIHBsdWdpbmEgKG9kcGFsYW0gasSFIG5hIGtvxYRjdSBza3J5cHR1KVxuICovXG5mdW5jdGlvbiBzdGFydExpZ2h0Ym94UGx1Z2luKCkge1xuICBhdmFsaWJsZUltYWdlc1xuICAgIC5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT5cbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHNob3dJbWFnZShpbmRleCkpXG4gICAgKTtcbiAgbGVmdEFycm93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzaG93UHJldmlvdXNJbWFnZSk7XG4gIHJpZ2h0QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNob3dOZXh0SW1hZ2UpO1xuICBsaWdodGJveEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhpZGVMaWdodGJveCk7XG59XG5cbi8qKlxuICogUG9rYXp1amUga29ua3JldG55IG9icmF6ZWsgbyBrb2xlam5vxZtjaSB4LiAoUGllcndzenkgdyBnYWxlcmkgbWEgaW5kZXggMCEpXG4gKi9cbmZ1bmN0aW9uIHNob3dJbWFnZShpbmRleCkge1xuICBzaG93TGlnaHRib3goKTtcbiAgbGlnaHRib3hTdGF0ZSA9IGluZGV4O1xuICBsaWdodGJveFNob3djYXNlSW1nRWxlbWVudC5zcmMgPSBhdmFsaWJsZUltYWdlc1NyY1tpbmRleF07XG59XG5cbi8qKlxuICogUG9rYXp1amUgbmFzdMSZcG55IG9icmF6IChwYW1pxJl0YWrEhWMgbyBtYWtzbWFsbmVqIGlsb8WbY2kgb2JyYXrDs3cpXG4gKi9cbmZ1bmN0aW9uIHNob3dOZXh0SW1hZ2UoKSB7XG4gIGNvbnN0IG5leHRJbWFnZU51bWJlciA9IChsaWdodGJveFN0YXRlICsgMSkgJSBhdmFsaWJsZUltYWdlc1NyYy5sZW5ndGg7XG4gIHNob3dJbWFnZShuZXh0SW1hZ2VOdW1iZXIpO1xufVxuXG4vKipcbiAqIFBva2F6dWplbXkgcG9wcnplbmkgb2JyYXogamXFvGVsaSBqZXN0ZcWbbXkgbmEgcGllcndzenltIG9icmF6aWUgdG8gcG9rYXp1amVteSBvc3RhdG5pXG4gKi9cbmZ1bmN0aW9uIHNob3dQcmV2aW91c0ltYWdlKCkge1xuICBjb25zdCBwcmV2aW91c0ltYWdlTnVtYmVyID0gKGxpZ2h0Ym94U3RhdGUgLSAxKSAlIGF2YWxpYmxlSW1hZ2VzU3JjLmxlbmd0aDtcbiAgc2hvd0ltYWdlKHByZXZpb3VzSW1hZ2VOdW1iZXIgPCAwID8gYXZhbGlibGVJbWFnZXNTcmMubGVuZ3RoIC0gMSA6IHByZXZpb3VzSW1hZ2VOdW1iZXIpO1xufVxuXG4vKipcbiAqIEZ1bmtjamEgdWtyeXdhasSFY2EgbGlnaHRib3hhICh3c3p5c3RrbyBwcsOzY3ogc3RyemHFgmVrIHphbXlrYSBsaWdodGJveClcbiAqL1xuZnVuY3Rpb24gaGlkZUxpZ2h0Ym94KGVsZW1lbnQpIHtcbiAgaWYgKFxuICAgICFlbGVtZW50LnRhcmdldC5pc1NhbWVOb2RlKHJpZ2h0QXJyb3cpICYmXG4gICAgIWVsZW1lbnQudGFyZ2V0LmlzU2FtZU5vZGUobGVmdEFycm93KVxuICApIHtcbiAgICBsaWdodGJveFNob3djYXNlSW1nRWxlbWVudC5zcmMgPSAnJztcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJhdXRvXCI7XG4gICAgbGlnaHRib3hFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpO1xuICB9XG59XG5cbi8qKlxuICogUG9rYXp1amVteSBsaWdodGJveCBpIHVrcnl3YW15IHNjcm9sbGJhciB3IHdlcnNqaSAyIHRlZ28gcGx1Z2ludSBtb8W8bmEgYnnFgm8gYnkgcG9tecWbbGXEhyBvIHVzdW5pxJljaXUgc2tva3Uga3TDs3J5IHRvIHBvd29kdWplLlxuICovXG5mdW5jdGlvbiBzaG93TGlnaHRib3goKSB7XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuICBsaWdodGJveEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInZpc2libGVcIik7XG59XG5cbi8qKlxuICogU3RhcnR1amVteSBwbHVnaW4uXG4gKi9cbnN0YXJ0TGlnaHRib3hQbHVnaW4oKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=