"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/getProduct";
exports.ids = ["pages/api/getProduct"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "(api)/./middlewear/mongoose.js":
/*!********************************!*\
  !*** ./middlewear/mongoose.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst connectDb = (handler)=>async (req, res)=>{\n        if ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().connections[0].readyState)) {\n            return handler(req, res);\n        }\n        await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(`${process.env.MONGO_URI}`);\n        return handler(req, res);\n    }\n;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connectDb);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9taWRkbGV3ZWFyL21vbmdvb3NlLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFnQztBQUNoQyxNQUFNQyxTQUFTLEdBQUcsQ0FBQ0MsT0FBTyxHQUFLLE9BQU9DLEdBQUcsRUFBRUMsR0FBRyxHQUFLO1FBQ2pELElBQUlKLDJFQUFrQyxFQUFFO1lBQ3RDLE9BQU9FLE9BQU8sQ0FBQ0MsR0FBRyxFQUFFQyxHQUFHLENBQUMsQ0FBQztTQUMxQjtRQUNELE1BQU1KLHVEQUFnQixDQUFDLENBQUMsRUFBRVEsT0FBTyxDQUFDQyxHQUFHLENBQUNDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRCxPQUFPUixPQUFPLENBQUNDLEdBQUcsRUFBRUMsR0FBRyxDQUFDLENBQUM7S0FDMUI7QUFBQztBQUVGLGlFQUFlSCxTQUFTLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1hcHAvLi9taWRkbGV3ZWFyL21vbmdvb3NlLmpzP2Y5YzIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xyXG5jb25zdCBjb25uZWN0RGIgPSAoaGFuZGxlcikgPT4gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgaWYgKG1vbmdvb3NlLmNvbm5lY3Rpb25zWzBdLnJlYWR5U3RhdGUpIHtcclxuICAgIHJldHVybiBoYW5kbGVyKHJlcSwgcmVzKTtcclxuICB9XHJcbiAgYXdhaXQgbW9uZ29vc2UuY29ubmVjdChgJHtwcm9jZXNzLmVudi5NT05HT19VUkl9YCk7XHJcbiAgcmV0dXJuIGhhbmRsZXIocmVxLCByZXMpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdERiO1xyXG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJjb25uZWN0RGIiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwiY29ubmVjdGlvbnMiLCJyZWFkeVN0YXRlIiwiY29ubmVjdCIsInByb2Nlc3MiLCJlbnYiLCJNT05HT19VUkkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./middlewear/mongoose.js\n");

/***/ }),

/***/ "(api)/./models/Product.js":
/*!***************************!*\
  !*** ./models/Product.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst ProductSchema = new mongoose.Schema({\n    title: {\n        type: String,\n        required: true\n    },\n    price: {\n        type: Number,\n        required: true\n    },\n    availableQty: {\n        type: Number,\n        required: true\n    },\n    slug: {\n        type: String,\n        required: true,\n        unique: true\n    },\n    desc: {\n        type: String\n    },\n    category: {\n        type: String,\n        required: true\n    },\n    img: {\n        type: String,\n        required: true\n    },\n    size: {\n        type: Array\n    },\n    _sizeQty: {\n        type: Object\n    },\n    _color: {\n        type: Object\n    },\n    rating: {\n        type: Object\n    },\n    var_img: {\n        type: Object\n    }\n}, {\n    timestamps: true\n});\nmongoose.models = {};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose.model(\"Product\", ProductSchema));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9tb2RlbHMvUHJvZHVjdC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsUUFBUSxHQUFHQyxtQkFBTyxDQUFDLDBCQUFVLENBQUM7QUFFcEMsTUFBTUMsYUFBYSxHQUFHLElBQUlGLFFBQVEsQ0FBQ0csTUFBTSxDQUN2QztJQUNFQyxLQUFLLEVBQUU7UUFBRUMsSUFBSSxFQUFFQyxNQUFNO1FBQUVDLFFBQVEsRUFBRSxJQUFJO0tBQUU7SUFDdkNDLEtBQUssRUFBRTtRQUFFSCxJQUFJLEVBQUVJLE1BQU07UUFBRUYsUUFBUSxFQUFFLElBQUk7S0FBRTtJQUN2Q0csWUFBWSxFQUFFO1FBQUVMLElBQUksRUFBRUksTUFBTTtRQUFFRixRQUFRLEVBQUUsSUFBSTtLQUFFO0lBQzlDSSxJQUFJLEVBQUU7UUFBRU4sSUFBSSxFQUFFQyxNQUFNO1FBQUVDLFFBQVEsRUFBRSxJQUFJO1FBQUVLLE1BQU0sRUFBRSxJQUFJO0tBQUU7SUFDcERDLElBQUksRUFBRTtRQUFFUixJQUFJLEVBQUVDLE1BQU07S0FBRTtJQUN0QlEsUUFBUSxFQUFFO1FBQUVULElBQUksRUFBRUMsTUFBTTtRQUFFQyxRQUFRLEVBQUUsSUFBSTtLQUFFO0lBQzFDUSxHQUFHLEVBQUU7UUFBRVYsSUFBSSxFQUFFQyxNQUFNO1FBQUVDLFFBQVEsRUFBRSxJQUFJO0tBQUU7SUFDckNTLElBQUksRUFBRTtRQUFFWCxJQUFJLEVBQUVZLEtBQUs7S0FBRTtJQUNyQkMsUUFBUSxFQUFFO1FBQUViLElBQUksRUFBRWMsTUFBTTtLQUFFO0lBQzFCQyxNQUFNLEVBQUU7UUFBRWYsSUFBSSxFQUFFYyxNQUFNO0tBQUU7SUFDeEJFLE1BQU0sRUFBRTtRQUFFaEIsSUFBSSxFQUFFYyxNQUFNO0tBQUU7SUFDeEJHLE9BQU8sRUFBRTtRQUFFakIsSUFBSSxFQUFFYyxNQUFNO0tBQUU7Q0FDMUIsRUFDRDtJQUFFSSxVQUFVLEVBQUUsSUFBSTtDQUFFLENBQ3JCO0FBQ0R2QixRQUFRLENBQUN3QixNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLGlFQUFleEIsUUFBUSxDQUFDeUIsS0FBSyxDQUFDLFNBQVMsRUFBRXZCLGFBQWEsQ0FBQyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktYXBwLy4vbW9kZWxzL1Byb2R1Y3QuanM/MDljNiJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtb25nb29zZSA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTtcclxuXHJcbmNvbnN0IFByb2R1Y3RTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKFxyXG4gIHtcclxuICAgIHRpdGxlOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcclxuICAgIHByaWNlOiB7IHR5cGU6IE51bWJlciwgcmVxdWlyZWQ6IHRydWUgfSxcclxuICAgIGF2YWlsYWJsZVF0eTogeyB0eXBlOiBOdW1iZXIsIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgICBzbHVnOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIHVuaXF1ZTogdHJ1ZSB9LFxyXG4gICAgZGVzYzogeyB0eXBlOiBTdHJpbmcgfSxcclxuICAgIGNhdGVnb3J5OiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcclxuICAgIGltZzogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgICBzaXplOiB7IHR5cGU6IEFycmF5IH0sXHJcbiAgICBfc2l6ZVF0eTogeyB0eXBlOiBPYmplY3QgfSxcclxuICAgIF9jb2xvcjogeyB0eXBlOiBPYmplY3QgfSxcclxuICAgIHJhdGluZzogeyB0eXBlOiBPYmplY3QgfSxcclxuICAgIHZhcl9pbWc6IHsgdHlwZTogT2JqZWN0IH0sXHJcbiAgfSxcclxuICB7IHRpbWVzdGFtcHM6IHRydWUgfVxyXG4pO1xyXG5tb25nb29zZS5tb2RlbHMgPSB7fTtcclxuZXhwb3J0IGRlZmF1bHQgbW9uZ29vc2UubW9kZWwoXCJQcm9kdWN0XCIsIFByb2R1Y3RTY2hlbWEpO1xyXG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJyZXF1aXJlIiwiUHJvZHVjdFNjaGVtYSIsIlNjaGVtYSIsInRpdGxlIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwicHJpY2UiLCJOdW1iZXIiLCJhdmFpbGFibGVRdHkiLCJzbHVnIiwidW5pcXVlIiwiZGVzYyIsImNhdGVnb3J5IiwiaW1nIiwic2l6ZSIsIkFycmF5IiwiX3NpemVRdHkiLCJPYmplY3QiLCJfY29sb3IiLCJyYXRpbmciLCJ2YXJfaW1nIiwidGltZXN0YW1wcyIsIm1vZGVscyIsIm1vZGVsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./models/Product.js\n");

/***/ }),

/***/ "(api)/./pages/api/getProduct.js":
/*!*********************************!*\
  !*** ./pages/api/getProduct.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_Product__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/Product */ \"(api)/./models/Product.js\");\n/* harmony import */ var _middlewear_mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../middlewear/mongoose */ \"(api)/./middlewear/mongoose.js\");\n\n\nconst handler = async (req, res)=>{\n    let products = await _models_Product__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find();\n    res.status(200).send(products);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_middlewear_mongoose__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(handler));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvZ2V0UHJvZHVjdC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBMkM7QUFDTztBQUVsRCxNQUFNRSxPQUFPLEdBQUcsT0FBT0MsR0FBRyxFQUFFQyxHQUFHLEdBQUs7SUFDbEMsSUFBSUMsUUFBUSxHQUFHLE1BQU1MLDREQUFZLEVBQUU7SUFDbkNJLEdBQUcsQ0FBQ0csTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUNILFFBQVEsQ0FBQyxDQUFDO0NBQ2hDO0FBRUQsaUVBQWVKLGdFQUFTLENBQUNDLE9BQU8sQ0FBQyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktYXBwLy4vcGFnZXMvYXBpL2dldFByb2R1Y3QuanM/Y2E2YyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvZHVjdCBmcm9tIFwiLi4vLi4vbW9kZWxzL1Byb2R1Y3RcIjtcclxuaW1wb3J0IGNvbm5lY3REYiBmcm9tIFwiLi4vLi4vbWlkZGxld2Vhci9tb25nb29zZVwiO1xyXG5cclxuY29uc3QgaGFuZGxlciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gIGxldCBwcm9kdWN0cyA9IGF3YWl0IFByb2R1Y3QuZmluZCgpO1xyXG4gIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHByb2R1Y3RzKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3REYihoYW5kbGVyKTtcclxuIl0sIm5hbWVzIjpbIlByb2R1Y3QiLCJjb25uZWN0RGIiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwicHJvZHVjdHMiLCJmaW5kIiwic3RhdHVzIiwic2VuZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/getProduct.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/getProduct.js"));
module.exports = __webpack_exports__;

})();