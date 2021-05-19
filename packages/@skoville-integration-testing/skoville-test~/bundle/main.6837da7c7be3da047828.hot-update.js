/******/ 		__webpack_require__.hotApplyWithOwnUpdateRetrievalStrategy = function(manifest, chunkIdToModuleIdToSourceMapping, newHash, applyHandlers) {
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdate = {};
/******/ 			currentUpdateRemovedChunks = manifest.r;
/******/ 			currentUpdateRuntime = [
/******/ 				function (webpackRequire) {
/******/ 					webpackRequire.h = newHash;
/******/ 				}
/******/ 			];
/******/ 			applyHandlers.push(applyHandler);
/******/ 			
/******/ 		
/******/ 			const removedModules = manifest.m;
/******/ 			removedModules.forEach(function (moduleId) {
/******/ 				currentUpdate[moduleId] = false;
/******/ 			});
/******/ 		
/******/ 			const chunkIds = manifest.c;
/******/ 			chunkIds
/******/ 				.filter(function (chunkId) {
/******/ 					// __webpack_require__.o is just an alias for installedChunks.hasOwnProperty(chunkId)
/******/ 					return __webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId] !== undefined;
/******/ 				})
/******/ 				.forEach(function (chunkId) {
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 					const moduleIdToSourceMapping = chunkIdToModuleIdToSourceMapping[chunkId];
/******/ 					Object.entries(moduleIdToSourceMapping).forEach(function (entry) {
/******/ 						var moduleId = entry[0];
/******/ 						var newModuleSourceFunction = entry[1];
/******/ 						currentUpdate[moduleId] = newModuleSourceFunction;
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 				applyWithOwnUpdateRetrievalStrategy: hotApplyWithOwnUpdateRetrievalStrategy,
/******/ 		function hotApplyWithOwnUpdateRetrievalStrategy(manifest, chunkIdToModuleIdToSourceMapping, newHash, applyOptions) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("applyWithOwnUpdateRetrievalStrategy() is only allowed in idle status");
/******/ 			}
/******/ 			setStatus("prepare");
/******/ 			currentUpdateApplyHandlers = [];
/******/ 			__webpack_require__.hotApplyWithOwnUpdateRetrievalStrategy(
/******/ 				manifest, chunkIdToModuleIdToSourceMapping, newHash, currentUpdateApplyHandlers
/******/ 			);
/******/ 			internalApply(applyOptions);
/******/ 		}
/******/ 		
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
window["webpackHotUpdate_skoville_integration_testing_skoville_test"]("main",{

/***/ "../web-sample~/build/hmr-test-style.js":
/*!**********************************************!*\
  !*** ../web-sample~/build/hmr-test-style.js ***!
  \**********************************************/
/*! flagged exports */
/*! export __esModule [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export style [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.style = void 0;\nconsole.log(\"hmr-test-style.ts is running\");\n//*\nconst color = \"grey\";\n/*/\nconst color = \"peachpuff\";\n//*/\nexports.style = `padding:50px;background-color:${color};color:black;font-size:40px;`;\n//# sourceMappingURL=hmr-test-style.js.map\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../web-sample~/build/hmr-test-style.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "c0be74aa7353fa6a43f6"
/******/ 	})();
/******/ 	
/******/ }
);