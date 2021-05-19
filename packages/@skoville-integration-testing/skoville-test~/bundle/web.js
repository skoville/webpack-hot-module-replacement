/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../../.yarn/$$virtual/debug-virtual-fe619ebf1d/0/cache/debug-npm-4.1.1-540248b3aa-3601a6ce96.zip/node_modules/debug/src/browser.js":
/*!*********************************************************************************************************************************************!*\
  !*** ../../../.yarn/$$virtual/debug-virtual-fe619ebf1d/0/cache/debug-npm-4.1.1-540248b3aa-3601a6ce96.zip/node_modules/debug/src/browser.js ***!
  \*********************************************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, module, __webpack_require__ */
/***/ ((module, exports, __webpack_require__) => {

eval("/* eslint-env browser */\n\n/**\n * This is the web browser implementation of `debug()`.\n */\n\nexports.log = log;\nexports.formatArgs = formatArgs;\nexports.save = save;\nexports.load = load;\nexports.useColors = useColors;\nexports.storage = localstorage();\n\n/**\n * Colors.\n */\n\nexports.colors = [\n\t'#0000CC',\n\t'#0000FF',\n\t'#0033CC',\n\t'#0033FF',\n\t'#0066CC',\n\t'#0066FF',\n\t'#0099CC',\n\t'#0099FF',\n\t'#00CC00',\n\t'#00CC33',\n\t'#00CC66',\n\t'#00CC99',\n\t'#00CCCC',\n\t'#00CCFF',\n\t'#3300CC',\n\t'#3300FF',\n\t'#3333CC',\n\t'#3333FF',\n\t'#3366CC',\n\t'#3366FF',\n\t'#3399CC',\n\t'#3399FF',\n\t'#33CC00',\n\t'#33CC33',\n\t'#33CC66',\n\t'#33CC99',\n\t'#33CCCC',\n\t'#33CCFF',\n\t'#6600CC',\n\t'#6600FF',\n\t'#6633CC',\n\t'#6633FF',\n\t'#66CC00',\n\t'#66CC33',\n\t'#9900CC',\n\t'#9900FF',\n\t'#9933CC',\n\t'#9933FF',\n\t'#99CC00',\n\t'#99CC33',\n\t'#CC0000',\n\t'#CC0033',\n\t'#CC0066',\n\t'#CC0099',\n\t'#CC00CC',\n\t'#CC00FF',\n\t'#CC3300',\n\t'#CC3333',\n\t'#CC3366',\n\t'#CC3399',\n\t'#CC33CC',\n\t'#CC33FF',\n\t'#CC6600',\n\t'#CC6633',\n\t'#CC9900',\n\t'#CC9933',\n\t'#CCCC00',\n\t'#CCCC33',\n\t'#FF0000',\n\t'#FF0033',\n\t'#FF0066',\n\t'#FF0099',\n\t'#FF00CC',\n\t'#FF00FF',\n\t'#FF3300',\n\t'#FF3333',\n\t'#FF3366',\n\t'#FF3399',\n\t'#FF33CC',\n\t'#FF33FF',\n\t'#FF6600',\n\t'#FF6633',\n\t'#FF9900',\n\t'#FF9933',\n\t'#FFCC00',\n\t'#FFCC33'\n];\n\n/**\n * Currently only WebKit-based Web Inspectors, Firefox >= v31,\n * and the Firebug extension (any Firefox version) are known\n * to support \"%c\" CSS customizations.\n *\n * TODO: add a `localStorage` variable to explicitly enable/disable colors\n */\n\n// eslint-disable-next-line complexity\nfunction useColors() {\n\t// NB: In an Electron preload script, document will be defined but not fully\n\t// initialized. Since we know we're in Chrome, we'll just detect this case\n\t// explicitly\n\tif (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {\n\t\treturn true;\n\t}\n\n\t// Internet Explorer and Edge do not support colors.\n\tif (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\\/(\\d+)/)) {\n\t\treturn false;\n\t}\n\n\t// Is webkit? http://stackoverflow.com/a/16459606/376773\n\t// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632\n\treturn (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||\n\t\t// Is firebug? http://stackoverflow.com/a/398120/376773\n\t\t(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||\n\t\t// Is firefox >= v31?\n\t\t// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages\n\t\t(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\\/(\\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||\n\t\t// Double check webkit in userAgent just in case we are in a worker\n\t\t(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\\/(\\d+)/));\n}\n\n/**\n * Colorize log arguments if enabled.\n *\n * @api public\n */\n\nfunction formatArgs(args) {\n\targs[0] = (this.useColors ? '%c' : '') +\n\t\tthis.namespace +\n\t\t(this.useColors ? ' %c' : ' ') +\n\t\targs[0] +\n\t\t(this.useColors ? '%c ' : ' ') +\n\t\t'+' + module.exports.humanize(this.diff);\n\n\tif (!this.useColors) {\n\t\treturn;\n\t}\n\n\tconst c = 'color: ' + this.color;\n\targs.splice(1, 0, c, 'color: inherit');\n\n\t// The final \"%c\" is somewhat tricky, because there could be other\n\t// arguments passed either before or after the %c, so we need to\n\t// figure out the correct index to insert the CSS into\n\tlet index = 0;\n\tlet lastC = 0;\n\targs[0].replace(/%[a-zA-Z%]/g, match => {\n\t\tif (match === '%%') {\n\t\t\treturn;\n\t\t}\n\t\tindex++;\n\t\tif (match === '%c') {\n\t\t\t// We only are interested in the *last* %c\n\t\t\t// (the user may have provided their own)\n\t\t\tlastC = index;\n\t\t}\n\t});\n\n\targs.splice(lastC, 0, c);\n}\n\n/**\n * Invokes `console.log()` when available.\n * No-op when `console.log` is not a \"function\".\n *\n * @api public\n */\nfunction log(...args) {\n\t// This hackery is required for IE8/9, where\n\t// the `console.log` function doesn't have 'apply'\n\treturn typeof console === 'object' &&\n\t\tconsole.log &&\n\t\tconsole.log(...args);\n}\n\n/**\n * Save `namespaces`.\n *\n * @param {String} namespaces\n * @api private\n */\nfunction save(namespaces) {\n\ttry {\n\t\tif (namespaces) {\n\t\t\texports.storage.setItem('debug', namespaces);\n\t\t} else {\n\t\t\texports.storage.removeItem('debug');\n\t\t}\n\t} catch (error) {\n\t\t// Swallow\n\t\t// XXX (@Qix-) should we be logging these?\n\t}\n}\n\n/**\n * Load `namespaces`.\n *\n * @return {String} returns the previously persisted debug modes\n * @api private\n */\nfunction load() {\n\tlet r;\n\ttry {\n\t\tr = exports.storage.getItem('debug');\n\t} catch (error) {\n\t\t// Swallow\n\t\t// XXX (@Qix-) should we be logging these?\n\t}\n\n\t// If debug isn't set in LS, and we're in Electron, try to load $DEBUG\n\tif (!r && typeof process !== 'undefined' && 'env' in process) {\n\t\tr = process.env.DEBUG;\n\t}\n\n\treturn r;\n}\n\n/**\n * Localstorage attempts to return the localstorage.\n *\n * This is necessary because safari throws\n * when a user disables cookies/localstorage\n * and you attempt to access it.\n *\n * @return {LocalStorage}\n * @api private\n */\n\nfunction localstorage() {\n\ttry {\n\t\t// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context\n\t\t// The Browser also has localStorage in the global context.\n\t\treturn localStorage;\n\t} catch (error) {\n\t\t// Swallow\n\t\t// XXX (@Qix-) should we be logging these?\n\t}\n}\n\nmodule.exports = __webpack_require__(/*! ./common */ \"../../../.yarn/$$virtual/debug-virtual-fe619ebf1d/0/cache/debug-npm-4.1.1-540248b3aa-3601a6ce96.zip/node_modules/debug/src/common.js\")(exports);\n\nconst {formatters} = module.exports;\n\n/**\n * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.\n */\n\nformatters.j = function (v) {\n\ttry {\n\t\treturn JSON.stringify(v);\n\t} catch (error) {\n\t\treturn '[UnexpectedJSONParseError]: ' + error.message;\n\t}\n};\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/$virtual/debug-virtual-fe619ebf1d/0/cache/debug-npm-4.1.1-540248b3aa-3601a6ce96.zip/node_modules/debug/src/browser.js?");

/***/ }),

/***/ "../../../.yarn/$$virtual/debug-virtual-fe619ebf1d/0/cache/debug-npm-4.1.1-540248b3aa-3601a6ce96.zip/node_modules/debug/src/common.js":
/*!********************************************************************************************************************************************!*\
  !*** ../../../.yarn/$$virtual/debug-virtual-fe619ebf1d/0/cache/debug-npm-4.1.1-540248b3aa-3601a6ce96.zip/node_modules/debug/src/common.js ***!
  \********************************************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n/**\n * This is the common logic for both the Node.js and web browser\n * implementations of `debug()`.\n */\n\nfunction setup(env) {\n\tcreateDebug.debug = createDebug;\n\tcreateDebug.default = createDebug;\n\tcreateDebug.coerce = coerce;\n\tcreateDebug.disable = disable;\n\tcreateDebug.enable = enable;\n\tcreateDebug.enabled = enabled;\n\tcreateDebug.humanize = __webpack_require__(/*! ms */ \"../../../.yarn/cache/ms-npm-2.1.2-ec0c1512ff-9b65fb709b.zip/node_modules/ms/index.js\");\n\n\tObject.keys(env).forEach(key => {\n\t\tcreateDebug[key] = env[key];\n\t});\n\n\t/**\n\t* Active `debug` instances.\n\t*/\n\tcreateDebug.instances = [];\n\n\t/**\n\t* The currently active debug mode names, and names to skip.\n\t*/\n\n\tcreateDebug.names = [];\n\tcreateDebug.skips = [];\n\n\t/**\n\t* Map of special \"%n\" handling functions, for the debug \"format\" argument.\n\t*\n\t* Valid key names are a single, lower or upper-case letter, i.e. \"n\" and \"N\".\n\t*/\n\tcreateDebug.formatters = {};\n\n\t/**\n\t* Selects a color for a debug namespace\n\t* @param {String} namespace The namespace string for the for the debug instance to be colored\n\t* @return {Number|String} An ANSI color code for the given namespace\n\t* @api private\n\t*/\n\tfunction selectColor(namespace) {\n\t\tlet hash = 0;\n\n\t\tfor (let i = 0; i < namespace.length; i++) {\n\t\t\thash = ((hash << 5) - hash) + namespace.charCodeAt(i);\n\t\t\thash |= 0; // Convert to 32bit integer\n\t\t}\n\n\t\treturn createDebug.colors[Math.abs(hash) % createDebug.colors.length];\n\t}\n\tcreateDebug.selectColor = selectColor;\n\n\t/**\n\t* Create a debugger with the given `namespace`.\n\t*\n\t* @param {String} namespace\n\t* @return {Function}\n\t* @api public\n\t*/\n\tfunction createDebug(namespace) {\n\t\tlet prevTime;\n\n\t\tfunction debug(...args) {\n\t\t\t// Disabled?\n\t\t\tif (!debug.enabled) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tconst self = debug;\n\n\t\t\t// Set `diff` timestamp\n\t\t\tconst curr = Number(new Date());\n\t\t\tconst ms = curr - (prevTime || curr);\n\t\t\tself.diff = ms;\n\t\t\tself.prev = prevTime;\n\t\t\tself.curr = curr;\n\t\t\tprevTime = curr;\n\n\t\t\targs[0] = createDebug.coerce(args[0]);\n\n\t\t\tif (typeof args[0] !== 'string') {\n\t\t\t\t// Anything else let's inspect with %O\n\t\t\t\targs.unshift('%O');\n\t\t\t}\n\n\t\t\t// Apply any `formatters` transformations\n\t\t\tlet index = 0;\n\t\t\targs[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {\n\t\t\t\t// If we encounter an escaped % then don't increase the array index\n\t\t\t\tif (match === '%%') {\n\t\t\t\t\treturn match;\n\t\t\t\t}\n\t\t\t\tindex++;\n\t\t\t\tconst formatter = createDebug.formatters[format];\n\t\t\t\tif (typeof formatter === 'function') {\n\t\t\t\t\tconst val = args[index];\n\t\t\t\t\tmatch = formatter.call(self, val);\n\n\t\t\t\t\t// Now we need to remove `args[index]` since it's inlined in the `format`\n\t\t\t\t\targs.splice(index, 1);\n\t\t\t\t\tindex--;\n\t\t\t\t}\n\t\t\t\treturn match;\n\t\t\t});\n\n\t\t\t// Apply env-specific formatting (colors, etc.)\n\t\t\tcreateDebug.formatArgs.call(self, args);\n\n\t\t\tconst logFn = self.log || createDebug.log;\n\t\t\tlogFn.apply(self, args);\n\t\t}\n\n\t\tdebug.namespace = namespace;\n\t\tdebug.enabled = createDebug.enabled(namespace);\n\t\tdebug.useColors = createDebug.useColors();\n\t\tdebug.color = selectColor(namespace);\n\t\tdebug.destroy = destroy;\n\t\tdebug.extend = extend;\n\t\t// Debug.formatArgs = formatArgs;\n\t\t// debug.rawLog = rawLog;\n\n\t\t// env-specific initialization logic for debug instances\n\t\tif (typeof createDebug.init === 'function') {\n\t\t\tcreateDebug.init(debug);\n\t\t}\n\n\t\tcreateDebug.instances.push(debug);\n\n\t\treturn debug;\n\t}\n\n\tfunction destroy() {\n\t\tconst index = createDebug.instances.indexOf(this);\n\t\tif (index !== -1) {\n\t\t\tcreateDebug.instances.splice(index, 1);\n\t\t\treturn true;\n\t\t}\n\t\treturn false;\n\t}\n\n\tfunction extend(namespace, delimiter) {\n\t\tconst newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);\n\t\tnewDebug.log = this.log;\n\t\treturn newDebug;\n\t}\n\n\t/**\n\t* Enables a debug mode by namespaces. This can include modes\n\t* separated by a colon and wildcards.\n\t*\n\t* @param {String} namespaces\n\t* @api public\n\t*/\n\tfunction enable(namespaces) {\n\t\tcreateDebug.save(namespaces);\n\n\t\tcreateDebug.names = [];\n\t\tcreateDebug.skips = [];\n\n\t\tlet i;\n\t\tconst split = (typeof namespaces === 'string' ? namespaces : '').split(/[\\s,]+/);\n\t\tconst len = split.length;\n\n\t\tfor (i = 0; i < len; i++) {\n\t\t\tif (!split[i]) {\n\t\t\t\t// ignore empty strings\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\tnamespaces = split[i].replace(/\\*/g, '.*?');\n\n\t\t\tif (namespaces[0] === '-') {\n\t\t\t\tcreateDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));\n\t\t\t} else {\n\t\t\t\tcreateDebug.names.push(new RegExp('^' + namespaces + '$'));\n\t\t\t}\n\t\t}\n\n\t\tfor (i = 0; i < createDebug.instances.length; i++) {\n\t\t\tconst instance = createDebug.instances[i];\n\t\t\tinstance.enabled = createDebug.enabled(instance.namespace);\n\t\t}\n\t}\n\n\t/**\n\t* Disable debug output.\n\t*\n\t* @return {String} namespaces\n\t* @api public\n\t*/\n\tfunction disable() {\n\t\tconst namespaces = [\n\t\t\t...createDebug.names.map(toNamespace),\n\t\t\t...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)\n\t\t].join(',');\n\t\tcreateDebug.enable('');\n\t\treturn namespaces;\n\t}\n\n\t/**\n\t* Returns true if the given mode name is enabled, false otherwise.\n\t*\n\t* @param {String} name\n\t* @return {Boolean}\n\t* @api public\n\t*/\n\tfunction enabled(name) {\n\t\tif (name[name.length - 1] === '*') {\n\t\t\treturn true;\n\t\t}\n\n\t\tlet i;\n\t\tlet len;\n\n\t\tfor (i = 0, len = createDebug.skips.length; i < len; i++) {\n\t\t\tif (createDebug.skips[i].test(name)) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t}\n\n\t\tfor (i = 0, len = createDebug.names.length; i < len; i++) {\n\t\t\tif (createDebug.names[i].test(name)) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t}\n\n\t\treturn false;\n\t}\n\n\t/**\n\t* Convert regexp to namespace\n\t*\n\t* @param {RegExp} regxep\n\t* @return {String} namespace\n\t* @api private\n\t*/\n\tfunction toNamespace(regexp) {\n\t\treturn regexp.toString()\n\t\t\t.substring(2, regexp.toString().length - 2)\n\t\t\t.replace(/\\.\\*\\?$/, '*');\n\t}\n\n\t/**\n\t* Coerce `val`.\n\t*\n\t* @param {Mixed} val\n\t* @return {Mixed}\n\t* @api private\n\t*/\n\tfunction coerce(val) {\n\t\tif (val instanceof Error) {\n\t\t\treturn val.stack || val.message;\n\t\t}\n\t\treturn val;\n\t}\n\n\tcreateDebug.enable(createDebug.load());\n\n\treturn createDebug;\n}\n\nmodule.exports = setup;\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/$virtual/debug-virtual-fe619ebf1d/0/cache/debug-npm-4.1.1-540248b3aa-3601a6ce96.zip/node_modules/debug/src/common.js?");

/***/ }),

/***/ "../../../.yarn/cache/backo2-npm-1.0.2-e933aab18a-72f19a0fd2.zip/node_modules/backo2/index.js":
/*!****************************************************************************************************!*\
  !*** ../../../.yarn/cache/backo2-npm-1.0.2-e933aab18a-72f19a0fd2.zip/node_modules/backo2/index.js ***!
  \****************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

eval("\n/**\n * Expose `Backoff`.\n */\n\nmodule.exports = Backoff;\n\n/**\n * Initialize backoff timer with `opts`.\n *\n * - `min` initial timeout in milliseconds [100]\n * - `max` max timeout [10000]\n * - `jitter` [0]\n * - `factor` [2]\n *\n * @param {Object} opts\n * @api public\n */\n\nfunction Backoff(opts) {\n  opts = opts || {};\n  this.ms = opts.min || 100;\n  this.max = opts.max || 10000;\n  this.factor = opts.factor || 2;\n  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;\n  this.attempts = 0;\n}\n\n/**\n * Return the backoff duration.\n *\n * @return {Number}\n * @api public\n */\n\nBackoff.prototype.duration = function(){\n  var ms = this.ms * Math.pow(this.factor, this.attempts++);\n  if (this.jitter) {\n    var rand =  Math.random();\n    var deviation = Math.floor(rand * this.jitter * ms);\n    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;\n  }\n  return Math.min(ms, this.max) | 0;\n};\n\n/**\n * Reset the number of attempts.\n *\n * @api public\n */\n\nBackoff.prototype.reset = function(){\n  this.attempts = 0;\n};\n\n/**\n * Set the minimum duration\n *\n * @api public\n */\n\nBackoff.prototype.setMin = function(min){\n  this.ms = min;\n};\n\n/**\n * Set the maximum duration\n *\n * @api public\n */\n\nBackoff.prototype.setMax = function(max){\n  this.max = max;\n};\n\n/**\n * Set the jitter\n *\n * @api public\n */\n\nBackoff.prototype.setJitter = function(jitter){\n  this.jitter = jitter;\n};\n\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/backo2-npm-1.0.2-e933aab18a-72f19a0fd2.zip/node_modules/backo2/index.js?");

/***/ }),

/***/ "../../../.yarn/cache/base64-arraybuffer-npm-0.1.5-64a2fbae81-9ae66a41b8.zip/node_modules/base64-arraybuffer/lib/base64-arraybuffer.js":
/*!*********************************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/base64-arraybuffer-npm-0.1.5-64a2fbae81-9ae66a41b8.zip/node_modules/base64-arraybuffer/lib/base64-arraybuffer.js ***!
  \*********************************************************************************************************************************************/
/*! default exports */
/*! export decode [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export encode [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

eval("/*\n * base64-arraybuffer\n * https://github.com/niklasvh/base64-arraybuffer\n *\n * Copyright (c) 2012 Niklas von Hertzen\n * Licensed under the MIT license.\n */\n(function(){\n  \"use strict\";\n\n  var chars = \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\";\n\n  // Use a lookup table to find the index.\n  var lookup = new Uint8Array(256);\n  for (var i = 0; i < chars.length; i++) {\n    lookup[chars.charCodeAt(i)] = i;\n  }\n\n  exports.encode = function(arraybuffer) {\n    var bytes = new Uint8Array(arraybuffer),\n    i, len = bytes.length, base64 = \"\";\n\n    for (i = 0; i < len; i+=3) {\n      base64 += chars[bytes[i] >> 2];\n      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];\n      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];\n      base64 += chars[bytes[i + 2] & 63];\n    }\n\n    if ((len % 3) === 2) {\n      base64 = base64.substring(0, base64.length - 1) + \"=\";\n    } else if (len % 3 === 1) {\n      base64 = base64.substring(0, base64.length - 2) + \"==\";\n    }\n\n    return base64;\n  };\n\n  exports.decode =  function(base64) {\n    var bufferLength = base64.length * 0.75,\n    len = base64.length, i, p = 0,\n    encoded1, encoded2, encoded3, encoded4;\n\n    if (base64[base64.length - 1] === \"=\") {\n      bufferLength--;\n      if (base64[base64.length - 2] === \"=\") {\n        bufferLength--;\n      }\n    }\n\n    var arraybuffer = new ArrayBuffer(bufferLength),\n    bytes = new Uint8Array(arraybuffer);\n\n    for (i = 0; i < len; i+=4) {\n      encoded1 = lookup[base64.charCodeAt(i)];\n      encoded2 = lookup[base64.charCodeAt(i+1)];\n      encoded3 = lookup[base64.charCodeAt(i+2)];\n      encoded4 = lookup[base64.charCodeAt(i+3)];\n\n      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);\n      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);\n      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);\n    }\n\n    return arraybuffer;\n  };\n})();\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/base64-arraybuffer-npm-0.1.5-64a2fbae81-9ae66a41b8.zip/node_modules/base64-arraybuffer/lib/base64-arraybuffer.js?");

/***/ }),

/***/ "../../../.yarn/cache/component-bind-npm-1.0.0-c4b6dae2b7-afbea09480.zip/node_modules/component-bind/index.js":
/*!********************************************************************************************************************!*\
  !*** ../../../.yarn/cache/component-bind-npm-1.0.0-c4b6dae2b7-afbea09480.zip/node_modules/component-bind/index.js ***!
  \********************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

eval("/**\n * Slice reference.\n */\n\nvar slice = [].slice;\n\n/**\n * Bind `obj` to `fn`.\n *\n * @param {Object} obj\n * @param {Function|String} fn or string\n * @return {Function}\n * @api public\n */\n\nmodule.exports = function(obj, fn){\n  if ('string' == typeof fn) fn = obj[fn];\n  if ('function' != typeof fn) throw new Error('bind() requires a function');\n  var args = slice.call(arguments, 2);\n  return function(){\n    return fn.apply(obj, args.concat(slice.call(arguments)));\n  }\n};\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/component-bind-npm-1.0.0-c4b6dae2b7-afbea09480.zip/node_modules/component-bind/index.js?");

/***/ }),

/***/ "../../../.yarn/cache/component-emitter-npm-1.3.0-4b848565b9-fc4edbf101.zip/node_modules/component-emitter/index.js":
/*!**************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/component-emitter-npm-1.3.0-4b848565b9-fc4edbf101.zip/node_modules/component-emitter/index.js ***!
  \**************************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

eval("\r\n/**\r\n * Expose `Emitter`.\r\n */\r\n\r\nif (true) {\r\n  module.exports = Emitter;\r\n}\r\n\r\n/**\r\n * Initialize a new `Emitter`.\r\n *\r\n * @api public\r\n */\r\n\r\nfunction Emitter(obj) {\r\n  if (obj) return mixin(obj);\r\n};\r\n\r\n/**\r\n * Mixin the emitter properties.\r\n *\r\n * @param {Object} obj\r\n * @return {Object}\r\n * @api private\r\n */\r\n\r\nfunction mixin(obj) {\r\n  for (var key in Emitter.prototype) {\r\n    obj[key] = Emitter.prototype[key];\r\n  }\r\n  return obj;\r\n}\r\n\r\n/**\r\n * Listen on the given `event` with `fn`.\r\n *\r\n * @param {String} event\r\n * @param {Function} fn\r\n * @return {Emitter}\r\n * @api public\r\n */\r\n\r\nEmitter.prototype.on =\r\nEmitter.prototype.addEventListener = function(event, fn){\r\n  this._callbacks = this._callbacks || {};\r\n  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])\r\n    .push(fn);\r\n  return this;\r\n};\r\n\r\n/**\r\n * Adds an `event` listener that will be invoked a single\r\n * time then automatically removed.\r\n *\r\n * @param {String} event\r\n * @param {Function} fn\r\n * @return {Emitter}\r\n * @api public\r\n */\r\n\r\nEmitter.prototype.once = function(event, fn){\r\n  function on() {\r\n    this.off(event, on);\r\n    fn.apply(this, arguments);\r\n  }\r\n\r\n  on.fn = fn;\r\n  this.on(event, on);\r\n  return this;\r\n};\r\n\r\n/**\r\n * Remove the given callback for `event` or all\r\n * registered callbacks.\r\n *\r\n * @param {String} event\r\n * @param {Function} fn\r\n * @return {Emitter}\r\n * @api public\r\n */\r\n\r\nEmitter.prototype.off =\r\nEmitter.prototype.removeListener =\r\nEmitter.prototype.removeAllListeners =\r\nEmitter.prototype.removeEventListener = function(event, fn){\r\n  this._callbacks = this._callbacks || {};\r\n\r\n  // all\r\n  if (0 == arguments.length) {\r\n    this._callbacks = {};\r\n    return this;\r\n  }\r\n\r\n  // specific event\r\n  var callbacks = this._callbacks['$' + event];\r\n  if (!callbacks) return this;\r\n\r\n  // remove all handlers\r\n  if (1 == arguments.length) {\r\n    delete this._callbacks['$' + event];\r\n    return this;\r\n  }\r\n\r\n  // remove specific handler\r\n  var cb;\r\n  for (var i = 0; i < callbacks.length; i++) {\r\n    cb = callbacks[i];\r\n    if (cb === fn || cb.fn === fn) {\r\n      callbacks.splice(i, 1);\r\n      break;\r\n    }\r\n  }\r\n\r\n  // Remove event specific arrays for event types that no\r\n  // one is subscribed for to avoid memory leak.\r\n  if (callbacks.length === 0) {\r\n    delete this._callbacks['$' + event];\r\n  }\r\n\r\n  return this;\r\n};\r\n\r\n/**\r\n * Emit `event` with the given args.\r\n *\r\n * @param {String} event\r\n * @param {Mixed} ...\r\n * @return {Emitter}\r\n */\r\n\r\nEmitter.prototype.emit = function(event){\r\n  this._callbacks = this._callbacks || {};\r\n\r\n  var args = new Array(arguments.length - 1)\r\n    , callbacks = this._callbacks['$' + event];\r\n\r\n  for (var i = 1; i < arguments.length; i++) {\r\n    args[i - 1] = arguments[i];\r\n  }\r\n\r\n  if (callbacks) {\r\n    callbacks = callbacks.slice(0);\r\n    for (var i = 0, len = callbacks.length; i < len; ++i) {\r\n      callbacks[i].apply(this, args);\r\n    }\r\n  }\r\n\r\n  return this;\r\n};\r\n\r\n/**\r\n * Return array of callbacks for `event`.\r\n *\r\n * @param {String} event\r\n * @return {Array}\r\n * @api public\r\n */\r\n\r\nEmitter.prototype.listeners = function(event){\r\n  this._callbacks = this._callbacks || {};\r\n  return this._callbacks['$' + event] || [];\r\n};\r\n\r\n/**\r\n * Check if this emitter has `event` handlers.\r\n *\r\n * @param {String} event\r\n * @return {Boolean}\r\n * @api public\r\n */\r\n\r\nEmitter.prototype.hasListeners = function(event){\r\n  return !! this.listeners(event).length;\r\n};\r\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/component-emitter-npm-1.3.0-4b848565b9-fc4edbf101.zip/node_modules/component-emitter/index.js?");

/***/ }),

/***/ "../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/globalThis.browser.js":
/*!*****************************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/globalThis.browser.js ***!
  \*****************************************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

eval("module.exports = (() => {\n  if (typeof self !== \"undefined\") {\n    return self;\n  } else if (typeof window !== \"undefined\") {\n    return window;\n  } else {\n    return Function(\"return this\")();\n  }\n})();\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/globalThis.browser.js?");

/***/ }),

/***/ "../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/index.js":
/*!****************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/index.js ***!
  \****************************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Socket = __webpack_require__(/*! ./socket */ \"../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/socket.js\");\n\nmodule.exports = (uri, opts) => new Socket(uri, opts);\n\n/**\n * Expose deps for legacy compatibility\n * and standalone browser access.\n */\n\nmodule.exports.Socket = Socket;\nmodule.exports.protocol = Socket.protocol; // this is an int\nmodule.exports.Transport = __webpack_require__(/*! ./transport */ \"../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transport.js\");\nmodule.exports.transports = __webpack_require__(/*! ./transports/index */ \"../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/index.js\");\nmodule.exports.parser = __webpack_require__(/*! engine.io-parser */ \"../../../.yarn/cache/engine.io-parser-npm-4.0.1-6bdb879e8a-3b71ef8b5a.zip/node_modules/engine.io-parser/lib/index.js\");\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/index.js?");

/***/ }),

/***/ "../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/socket.js":
/*!*****************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/socket.js ***!
  \*****************************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const transports = __webpack_require__(/*! ./transports/index */ \"../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/index.js\");\nconst Emitter = __webpack_require__(/*! component-emitter */ \"../../../.yarn/cache/component-emitter-npm-1.3.0-4b848565b9-fc4edbf101.zip/node_modules/component-emitter/index.js\");\nconst debug = __webpack_require__(/*! debug */ \"../../../.yarn/$$virtual/debug-virtual-fe619ebf1d/0/cache/debug-npm-4.1.1-540248b3aa-3601a6ce96.zip/node_modules/debug/src/browser.js\")(\"engine.io-client:socket\");\nconst parser = __webpack_require__(/*! engine.io-parser */ \"../../../.yarn/cache/engine.io-parser-npm-4.0.1-6bdb879e8a-3b71ef8b5a.zip/node_modules/engine.io-parser/lib/index.js\");\nconst parseuri = __webpack_require__(/*! parseuri */ \"../../../.yarn/cache/parseuri-npm-0.0.6-0c11d6eb7b-ff7ad178b0.zip/node_modules/parseuri/index.js\");\nconst parseqs = __webpack_require__(/*! parseqs */ \"../../../.yarn/cache/parseqs-npm-0.0.6-7d7191eb92-9e095b898b.zip/node_modules/parseqs/index.js\");\n\nclass Socket extends Emitter {\n  /**\n   * Socket constructor.\n   *\n   * @param {String|Object} uri or options\n   * @param {Object} options\n   * @api public\n   */\n  constructor(uri, opts = {}) {\n    super();\n\n    if (uri && \"object\" === typeof uri) {\n      opts = uri;\n      uri = null;\n    }\n\n    if (uri) {\n      uri = parseuri(uri);\n      opts.hostname = uri.host;\n      opts.secure = uri.protocol === \"https\" || uri.protocol === \"wss\";\n      opts.port = uri.port;\n      if (uri.query) opts.query = uri.query;\n    } else if (opts.host) {\n      opts.hostname = parseuri(opts.host).host;\n    }\n\n    this.secure =\n      null != opts.secure\n        ? opts.secure\n        : typeof location !== \"undefined\" && \"https:\" === location.protocol;\n\n    if (opts.hostname && !opts.port) {\n      // if no port is specified manually, use the protocol default\n      opts.port = this.secure ? \"443\" : \"80\";\n    }\n\n    this.hostname =\n      opts.hostname ||\n      (typeof location !== \"undefined\" ? location.hostname : \"localhost\");\n    this.port =\n      opts.port ||\n      (typeof location !== \"undefined\" && location.port\n        ? location.port\n        : this.secure\n        ? 443\n        : 80);\n\n    this.transports = opts.transports || [\"polling\", \"websocket\"];\n    this.readyState = \"\";\n    this.writeBuffer = [];\n    this.prevBufferLen = 0;\n\n    this.opts = Object.assign(\n      {\n        path: \"/engine.io\",\n        agent: false,\n        upgrade: true,\n        jsonp: true,\n        timestampParam: \"t\",\n        policyPort: 843,\n        rememberUpgrade: false,\n        rejectUnauthorized: true,\n        perMessageDeflate: {\n          threshold: 1024\n        },\n        transportOptions: {}\n      },\n      opts\n    );\n\n    this.opts.path = this.opts.path.replace(/\\/$/, \"\") + \"/\";\n\n    if (typeof this.opts.query === \"string\") {\n      this.opts.query = parseqs.decode(this.opts.query);\n    }\n\n    // set on handshake\n    this.id = null;\n    this.upgrades = null;\n    this.pingInterval = null;\n    this.pingTimeout = null;\n\n    // set on heartbeat\n    this.pingTimeoutTimer = null;\n\n    this.open();\n  }\n\n  /**\n   * Creates transport of the given type.\n   *\n   * @param {String} transport name\n   * @return {Transport}\n   * @api private\n   */\n  createTransport(name) {\n    debug('creating transport \"%s\"', name);\n    const query = clone(this.opts.query);\n\n    // append engine.io protocol identifier\n    query.EIO = parser.protocol;\n\n    // transport name\n    query.transport = name;\n\n    // session id if we already have one\n    if (this.id) query.sid = this.id;\n\n    const opts = Object.assign(\n      {},\n      this.opts.transportOptions[name],\n      this.opts,\n      {\n        query,\n        socket: this,\n        hostname: this.hostname,\n        secure: this.secure,\n        port: this.port\n      }\n    );\n\n    debug(\"options: %j\", opts);\n\n    return new transports[name](opts);\n  }\n\n  /**\n   * Initializes transport to use and starts probe.\n   *\n   * @api private\n   */\n  open() {\n    let transport;\n    if (\n      this.opts.rememberUpgrade &&\n      Socket.priorWebsocketSuccess &&\n      this.transports.indexOf(\"websocket\") !== -1\n    ) {\n      transport = \"websocket\";\n    } else if (0 === this.transports.length) {\n      // Emit error on next tick so it can be listened to\n      const self = this;\n      setTimeout(function() {\n        self.emit(\"error\", \"No transports available\");\n      }, 0);\n      return;\n    } else {\n      transport = this.transports[0];\n    }\n    this.readyState = \"opening\";\n\n    // Retry with the next transport if the transport is disabled (jsonp: false)\n    try {\n      transport = this.createTransport(transport);\n    } catch (e) {\n      debug(\"error while creating transport: %s\", e);\n      this.transports.shift();\n      this.open();\n      return;\n    }\n\n    transport.open();\n    this.setTransport(transport);\n  }\n\n  /**\n   * Sets the current transport. Disables the existing one (if any).\n   *\n   * @api private\n   */\n  setTransport(transport) {\n    debug(\"setting transport %s\", transport.name);\n    const self = this;\n\n    if (this.transport) {\n      debug(\"clearing existing transport %s\", this.transport.name);\n      this.transport.removeAllListeners();\n    }\n\n    // set up transport\n    this.transport = transport;\n\n    // set up transport listeners\n    transport\n      .on(\"drain\", function() {\n        self.onDrain();\n      })\n      .on(\"packet\", function(packet) {\n        self.onPacket(packet);\n      })\n      .on(\"error\", function(e) {\n        self.onError(e);\n      })\n      .on(\"close\", function() {\n        self.onClose(\"transport close\");\n      });\n  }\n\n  /**\n   * Probes a transport.\n   *\n   * @param {String} transport name\n   * @api private\n   */\n  probe(name) {\n    debug('probing transport \"%s\"', name);\n    let transport = this.createTransport(name, { probe: 1 });\n    let failed = false;\n    const self = this;\n\n    Socket.priorWebsocketSuccess = false;\n\n    function onTransportOpen() {\n      if (self.onlyBinaryUpgrades) {\n        const upgradeLosesBinary =\n          !this.supportsBinary && self.transport.supportsBinary;\n        failed = failed || upgradeLosesBinary;\n      }\n      if (failed) return;\n\n      debug('probe transport \"%s\" opened', name);\n      transport.send([{ type: \"ping\", data: \"probe\" }]);\n      transport.once(\"packet\", function(msg) {\n        if (failed) return;\n        if (\"pong\" === msg.type && \"probe\" === msg.data) {\n          debug('probe transport \"%s\" pong', name);\n          self.upgrading = true;\n          self.emit(\"upgrading\", transport);\n          if (!transport) return;\n          Socket.priorWebsocketSuccess = \"websocket\" === transport.name;\n\n          debug('pausing current transport \"%s\"', self.transport.name);\n          self.transport.pause(function() {\n            if (failed) return;\n            if (\"closed\" === self.readyState) return;\n            debug(\"changing transport and sending upgrade packet\");\n\n            cleanup();\n\n            self.setTransport(transport);\n            transport.send([{ type: \"upgrade\" }]);\n            self.emit(\"upgrade\", transport);\n            transport = null;\n            self.upgrading = false;\n            self.flush();\n          });\n        } else {\n          debug('probe transport \"%s\" failed', name);\n          const err = new Error(\"probe error\");\n          err.transport = transport.name;\n          self.emit(\"upgradeError\", err);\n        }\n      });\n    }\n\n    function freezeTransport() {\n      if (failed) return;\n\n      // Any callback called by transport should be ignored since now\n      failed = true;\n\n      cleanup();\n\n      transport.close();\n      transport = null;\n    }\n\n    // Handle any error that happens while probing\n    function onerror(err) {\n      const error = new Error(\"probe error: \" + err);\n      error.transport = transport.name;\n\n      freezeTransport();\n\n      debug('probe transport \"%s\" failed because of error: %s', name, err);\n\n      self.emit(\"upgradeError\", error);\n    }\n\n    function onTransportClose() {\n      onerror(\"transport closed\");\n    }\n\n    // When the socket is closed while we're probing\n    function onclose() {\n      onerror(\"socket closed\");\n    }\n\n    // When the socket is upgraded while we're probing\n    function onupgrade(to) {\n      if (transport && to.name !== transport.name) {\n        debug('\"%s\" works - aborting \"%s\"', to.name, transport.name);\n        freezeTransport();\n      }\n    }\n\n    // Remove all listeners on the transport and on self\n    function cleanup() {\n      transport.removeListener(\"open\", onTransportOpen);\n      transport.removeListener(\"error\", onerror);\n      transport.removeListener(\"close\", onTransportClose);\n      self.removeListener(\"close\", onclose);\n      self.removeListener(\"upgrading\", onupgrade);\n    }\n\n    transport.once(\"open\", onTransportOpen);\n    transport.once(\"error\", onerror);\n    transport.once(\"close\", onTransportClose);\n\n    this.once(\"close\", onclose);\n    this.once(\"upgrading\", onupgrade);\n\n    transport.open();\n  }\n\n  /**\n   * Called when connection is deemed open.\n   *\n   * @api public\n   */\n  onOpen() {\n    debug(\"socket open\");\n    this.readyState = \"open\";\n    Socket.priorWebsocketSuccess = \"websocket\" === this.transport.name;\n    this.emit(\"open\");\n    this.flush();\n\n    // we check for `readyState` in case an `open`\n    // listener already closed the socket\n    if (\n      \"open\" === this.readyState &&\n      this.opts.upgrade &&\n      this.transport.pause\n    ) {\n      debug(\"starting upgrade probes\");\n      let i = 0;\n      const l = this.upgrades.length;\n      for (; i < l; i++) {\n        this.probe(this.upgrades[i]);\n      }\n    }\n  }\n\n  /**\n   * Handles a packet.\n   *\n   * @api private\n   */\n  onPacket(packet) {\n    if (\n      \"opening\" === this.readyState ||\n      \"open\" === this.readyState ||\n      \"closing\" === this.readyState\n    ) {\n      debug('socket receive: type \"%s\", data \"%s\"', packet.type, packet.data);\n\n      this.emit(\"packet\", packet);\n\n      // Socket is live - any packet counts\n      this.emit(\"heartbeat\");\n\n      switch (packet.type) {\n        case \"open\":\n          this.onHandshake(JSON.parse(packet.data));\n          break;\n\n        case \"ping\":\n          this.resetPingTimeout();\n          this.sendPacket(\"pong\");\n          this.emit(\"pong\");\n          break;\n\n        case \"error\":\n          const err = new Error(\"server error\");\n          err.code = packet.data;\n          this.onError(err);\n          break;\n\n        case \"message\":\n          this.emit(\"data\", packet.data);\n          this.emit(\"message\", packet.data);\n          break;\n      }\n    } else {\n      debug('packet received with socket readyState \"%s\"', this.readyState);\n    }\n  }\n\n  /**\n   * Called upon handshake completion.\n   *\n   * @param {Object} handshake obj\n   * @api private\n   */\n  onHandshake(data) {\n    this.emit(\"handshake\", data);\n    this.id = data.sid;\n    this.transport.query.sid = data.sid;\n    this.upgrades = this.filterUpgrades(data.upgrades);\n    this.pingInterval = data.pingInterval;\n    this.pingTimeout = data.pingTimeout;\n    this.onOpen();\n    // In case open handler closes socket\n    if (\"closed\" === this.readyState) return;\n    this.resetPingTimeout();\n  }\n\n  /**\n   * Sets and resets ping timeout timer based on server pings.\n   *\n   * @api private\n   */\n  resetPingTimeout() {\n    clearTimeout(this.pingTimeoutTimer);\n    this.pingTimeoutTimer = setTimeout(() => {\n      this.onClose(\"ping timeout\");\n    }, this.pingInterval + this.pingTimeout);\n  }\n\n  /**\n   * Called on `drain` event\n   *\n   * @api private\n   */\n  onDrain() {\n    this.writeBuffer.splice(0, this.prevBufferLen);\n\n    // setting prevBufferLen = 0 is very important\n    // for example, when upgrading, upgrade packet is sent over,\n    // and a nonzero prevBufferLen could cause problems on `drain`\n    this.prevBufferLen = 0;\n\n    if (0 === this.writeBuffer.length) {\n      this.emit(\"drain\");\n    } else {\n      this.flush();\n    }\n  }\n\n  /**\n   * Flush write buffers.\n   *\n   * @api private\n   */\n  flush() {\n    if (\n      \"closed\" !== this.readyState &&\n      this.transport.writable &&\n      !this.upgrading &&\n      this.writeBuffer.length\n    ) {\n      debug(\"flushing %d packets in socket\", this.writeBuffer.length);\n      this.transport.send(this.writeBuffer);\n      // keep track of current length of writeBuffer\n      // splice writeBuffer and callbackBuffer on `drain`\n      this.prevBufferLen = this.writeBuffer.length;\n      this.emit(\"flush\");\n    }\n  }\n\n  /**\n   * Sends a message.\n   *\n   * @param {String} message.\n   * @param {Function} callback function.\n   * @param {Object} options.\n   * @return {Socket} for chaining.\n   * @api public\n   */\n  write(msg, options, fn) {\n    this.sendPacket(\"message\", msg, options, fn);\n    return this;\n  }\n\n  send(msg, options, fn) {\n    this.sendPacket(\"message\", msg, options, fn);\n    return this;\n  }\n\n  /**\n   * Sends a packet.\n   *\n   * @param {String} packet type.\n   * @param {String} data.\n   * @param {Object} options.\n   * @param {Function} callback function.\n   * @api private\n   */\n  sendPacket(type, data, options, fn) {\n    if (\"function\" === typeof data) {\n      fn = data;\n      data = undefined;\n    }\n\n    if (\"function\" === typeof options) {\n      fn = options;\n      options = null;\n    }\n\n    if (\"closing\" === this.readyState || \"closed\" === this.readyState) {\n      return;\n    }\n\n    options = options || {};\n    options.compress = false !== options.compress;\n\n    const packet = {\n      type: type,\n      data: data,\n      options: options\n    };\n    this.emit(\"packetCreate\", packet);\n    this.writeBuffer.push(packet);\n    if (fn) this.once(\"flush\", fn);\n    this.flush();\n  }\n\n  /**\n   * Closes the connection.\n   *\n   * @api private\n   */\n  close() {\n    const self = this;\n\n    if (\"opening\" === this.readyState || \"open\" === this.readyState) {\n      this.readyState = \"closing\";\n\n      if (this.writeBuffer.length) {\n        this.once(\"drain\", function() {\n          if (this.upgrading) {\n            waitForUpgrade();\n          } else {\n            close();\n          }\n        });\n      } else if (this.upgrading) {\n        waitForUpgrade();\n      } else {\n        close();\n      }\n    }\n\n    function close() {\n      self.onClose(\"forced close\");\n      debug(\"socket closing - telling transport to close\");\n      self.transport.close();\n    }\n\n    function cleanupAndClose() {\n      self.removeListener(\"upgrade\", cleanupAndClose);\n      self.removeListener(\"upgradeError\", cleanupAndClose);\n      close();\n    }\n\n    function waitForUpgrade() {\n      // wait for upgrade to finish since we can't send packets while pausing a transport\n      self.once(\"upgrade\", cleanupAndClose);\n      self.once(\"upgradeError\", cleanupAndClose);\n    }\n\n    return this;\n  }\n\n  /**\n   * Called upon transport error\n   *\n   * @api private\n   */\n  onError(err) {\n    debug(\"socket error %j\", err);\n    Socket.priorWebsocketSuccess = false;\n    this.emit(\"error\", err);\n    this.onClose(\"transport error\", err);\n  }\n\n  /**\n   * Called upon transport close.\n   *\n   * @api private\n   */\n  onClose(reason, desc) {\n    if (\n      \"opening\" === this.readyState ||\n      \"open\" === this.readyState ||\n      \"closing\" === this.readyState\n    ) {\n      debug('socket close with reason: \"%s\"', reason);\n      const self = this;\n\n      // clear timers\n      clearTimeout(this.pingIntervalTimer);\n      clearTimeout(this.pingTimeoutTimer);\n\n      // stop event from firing again for transport\n      this.transport.removeAllListeners(\"close\");\n\n      // ensure transport won't stay open\n      this.transport.close();\n\n      // ignore further transport communication\n      this.transport.removeAllListeners();\n\n      // set ready state\n      this.readyState = \"closed\";\n\n      // clear session id\n      this.id = null;\n\n      // emit close event\n      this.emit(\"close\", reason, desc);\n\n      // clean buffers after, so users can still\n      // grab the buffers on `close` event\n      self.writeBuffer = [];\n      self.prevBufferLen = 0;\n    }\n  }\n\n  /**\n   * Filters upgrades, returning only those matching client transports.\n   *\n   * @param {Array} server upgrades\n   * @api private\n   *\n   */\n  filterUpgrades(upgrades) {\n    const filteredUpgrades = [];\n    let i = 0;\n    const j = upgrades.length;\n    for (; i < j; i++) {\n      if (~this.transports.indexOf(upgrades[i]))\n        filteredUpgrades.push(upgrades[i]);\n    }\n    return filteredUpgrades;\n  }\n}\n\nSocket.priorWebsocketSuccess = false;\n\n/**\n * Protocol version.\n *\n * @api public\n */\n\nSocket.protocol = parser.protocol; // this is an int\n\nfunction clone(obj) {\n  const o = {};\n  for (let i in obj) {\n    if (obj.hasOwnProperty(i)) {\n      o[i] = obj[i];\n    }\n  }\n  return o;\n}\n\nmodule.exports = Socket;\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/socket.js?");

/***/ }),

/***/ "../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transport.js":
/*!********************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transport.js ***!
  \********************************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const parser = __webpack_require__(/*! engine.io-parser */ \"../../../.yarn/cache/engine.io-parser-npm-4.0.1-6bdb879e8a-3b71ef8b5a.zip/node_modules/engine.io-parser/lib/index.js\");\nconst Emitter = __webpack_require__(/*! component-emitter */ \"../../../.yarn/cache/component-emitter-npm-1.3.0-4b848565b9-fc4edbf101.zip/node_modules/component-emitter/index.js\");\n\nclass Transport extends Emitter {\n  /**\n   * Transport abstract constructor.\n   *\n   * @param {Object} options.\n   * @api private\n   */\n  constructor(opts) {\n    super();\n\n    this.opts = opts;\n    this.query = opts.query;\n    this.readyState = \"\";\n    this.socket = opts.socket;\n  }\n\n  /**\n   * Emits an error.\n   *\n   * @param {String} str\n   * @return {Transport} for chaining\n   * @api public\n   */\n  onError(msg, desc) {\n    const err = new Error(msg);\n    err.type = \"TransportError\";\n    err.description = desc;\n    this.emit(\"error\", err);\n    return this;\n  }\n\n  /**\n   * Opens the transport.\n   *\n   * @api public\n   */\n  open() {\n    if (\"closed\" === this.readyState || \"\" === this.readyState) {\n      this.readyState = \"opening\";\n      this.doOpen();\n    }\n\n    return this;\n  }\n\n  /**\n   * Closes the transport.\n   *\n   * @api private\n   */\n  close() {\n    if (\"opening\" === this.readyState || \"open\" === this.readyState) {\n      this.doClose();\n      this.onClose();\n    }\n\n    return this;\n  }\n\n  /**\n   * Sends multiple packets.\n   *\n   * @param {Array} packets\n   * @api private\n   */\n  send(packets) {\n    if (\"open\" === this.readyState) {\n      this.write(packets);\n    } else {\n      throw new Error(\"Transport not open\");\n    }\n  }\n\n  /**\n   * Called upon open\n   *\n   * @api private\n   */\n  onOpen() {\n    this.readyState = \"open\";\n    this.writable = true;\n    this.emit(\"open\");\n  }\n\n  /**\n   * Called with data.\n   *\n   * @param {String} data\n   * @api private\n   */\n  onData(data) {\n    const packet = parser.decodePacket(data, this.socket.binaryType);\n    this.onPacket(packet);\n  }\n\n  /**\n   * Called with a decoded packet.\n   */\n  onPacket(packet) {\n    this.emit(\"packet\", packet);\n  }\n\n  /**\n   * Called upon close.\n   *\n   * @api private\n   */\n  onClose() {\n    this.readyState = \"closed\";\n    this.emit(\"close\");\n  }\n}\n\nmodule.exports = Transport;\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transport.js?");

/***/ }),

/***/ "../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/index.js":
/*!***************************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/index.js ***!
  \***************************************************************************************************************************************/
/*! default exports */
/*! export polling [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export websocket [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const XMLHttpRequest = __webpack_require__(/*! xmlhttprequest-ssl */ \"../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/xmlhttprequest.js\");\nconst XHR = __webpack_require__(/*! ./polling-xhr */ \"../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/polling-xhr.js\");\nconst JSONP = __webpack_require__(/*! ./polling-jsonp */ \"../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/polling-jsonp.js\");\nconst websocket = __webpack_require__(/*! ./websocket */ \"../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/websocket.js\");\n\nexports.polling = polling;\nexports.websocket = websocket;\n\n/**\n * Polling transport polymorphic constructor.\n * Decides on xhr vs jsonp based on feature detection.\n *\n * @api private\n */\n\nfunction polling(opts) {\n  let xhr;\n  let xd = false;\n  let xs = false;\n  const jsonp = false !== opts.jsonp;\n\n  if (typeof location !== \"undefined\") {\n    const isSSL = \"https:\" === location.protocol;\n    let port = location.port;\n\n    // some user agents have empty `location.port`\n    if (!port) {\n      port = isSSL ? 443 : 80;\n    }\n\n    xd = opts.hostname !== location.hostname || port !== opts.port;\n    xs = opts.secure !== isSSL;\n  }\n\n  opts.xdomain = xd;\n  opts.xscheme = xs;\n  xhr = new XMLHttpRequest(opts);\n\n  if (\"open\" in xhr && !opts.forceJSONP) {\n    return new XHR(opts);\n  } else {\n    if (!jsonp) throw new Error(\"JSONP disabled\");\n    return new JSONP(opts);\n  }\n}\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/index.js?");

/***/ }),

/***/ "../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/polling-jsonp.js":
/*!***********************************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/polling-jsonp.js ***!
  \***********************************************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Polling = __webpack_require__(/*! ./polling */ \"../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/polling.js\");\nconst globalThis = __webpack_require__(/*! ../globalThis */ \"../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/globalThis.browser.js\");\n\nconst rNewline = /\\n/g;\nconst rEscapedNewline = /\\\\n/g;\n\n/**\n * Global JSONP callbacks.\n */\n\nlet callbacks;\n\n/**\n * Noop.\n */\n\nfunction empty() {}\n\nclass JSONPPolling extends Polling {\n  /**\n   * JSONP Polling constructor.\n   *\n   * @param {Object} opts.\n   * @api public\n   */\n  constructor(opts) {\n    super(opts);\n\n    this.query = this.query || {};\n\n    // define global callbacks array if not present\n    // we do this here (lazily) to avoid unneeded global pollution\n    if (!callbacks) {\n      // we need to consider multiple engines in the same page\n      callbacks = globalThis.___eio = globalThis.___eio || [];\n    }\n\n    // callback identifier\n    this.index = callbacks.length;\n\n    // add callback to jsonp global\n    const self = this;\n    callbacks.push(function(msg) {\n      self.onData(msg);\n    });\n\n    // append to query string\n    this.query.j = this.index;\n\n    // prevent spurious errors from being emitted when the window is unloaded\n    if (typeof addEventListener === \"function\") {\n      addEventListener(\n        \"beforeunload\",\n        function() {\n          if (self.script) self.script.onerror = empty;\n        },\n        false\n      );\n    }\n  }\n\n  /**\n   * JSONP only supports binary as base64 encoded strings\n   */\n  get supportsBinary() {\n    return false;\n  }\n\n  /**\n   * Closes the socket.\n   *\n   * @api private\n   */\n  doClose() {\n    if (this.script) {\n      this.script.parentNode.removeChild(this.script);\n      this.script = null;\n    }\n\n    if (this.form) {\n      this.form.parentNode.removeChild(this.form);\n      this.form = null;\n      this.iframe = null;\n    }\n\n    super.doClose();\n  }\n\n  /**\n   * Starts a poll cycle.\n   *\n   * @api private\n   */\n  doPoll() {\n    const self = this;\n    const script = document.createElement(\"script\");\n\n    if (this.script) {\n      this.script.parentNode.removeChild(this.script);\n      this.script = null;\n    }\n\n    script.async = true;\n    script.src = this.uri();\n    script.onerror = function(e) {\n      self.onError(\"jsonp poll error\", e);\n    };\n\n    const insertAt = document.getElementsByTagName(\"script\")[0];\n    if (insertAt) {\n      insertAt.parentNode.insertBefore(script, insertAt);\n    } else {\n      (document.head || document.body).appendChild(script);\n    }\n    this.script = script;\n\n    const isUAgecko =\n      \"undefined\" !== typeof navigator && /gecko/i.test(navigator.userAgent);\n\n    if (isUAgecko) {\n      setTimeout(function() {\n        const iframe = document.createElement(\"iframe\");\n        document.body.appendChild(iframe);\n        document.body.removeChild(iframe);\n      }, 100);\n    }\n  }\n\n  /**\n   * Writes with a hidden iframe.\n   *\n   * @param {String} data to send\n   * @param {Function} called upon flush.\n   * @api private\n   */\n  doWrite(data, fn) {\n    const self = this;\n    let iframe;\n\n    if (!this.form) {\n      const form = document.createElement(\"form\");\n      const area = document.createElement(\"textarea\");\n      const id = (this.iframeId = \"eio_iframe_\" + this.index);\n\n      form.className = \"socketio\";\n      form.style.position = \"absolute\";\n      form.style.top = \"-1000px\";\n      form.style.left = \"-1000px\";\n      form.target = id;\n      form.method = \"POST\";\n      form.setAttribute(\"accept-charset\", \"utf-8\");\n      area.name = \"d\";\n      form.appendChild(area);\n      document.body.appendChild(form);\n\n      this.form = form;\n      this.area = area;\n    }\n\n    this.form.action = this.uri();\n\n    function complete() {\n      initIframe();\n      fn();\n    }\n\n    function initIframe() {\n      if (self.iframe) {\n        try {\n          self.form.removeChild(self.iframe);\n        } catch (e) {\n          self.onError(\"jsonp polling iframe removal error\", e);\n        }\n      }\n\n      try {\n        // ie6 dynamic iframes with target=\"\" support (thanks Chris Lambacher)\n        const html = '<iframe src=\"javascript:0\" name=\"' + self.iframeId + '\">';\n        iframe = document.createElement(html);\n      } catch (e) {\n        iframe = document.createElement(\"iframe\");\n        iframe.name = self.iframeId;\n        iframe.src = \"javascript:0\";\n      }\n\n      iframe.id = self.iframeId;\n\n      self.form.appendChild(iframe);\n      self.iframe = iframe;\n    }\n\n    initIframe();\n\n    // escape \\n to prevent it from being converted into \\r\\n by some UAs\n    // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side\n    data = data.replace(rEscapedNewline, \"\\\\\\n\");\n    this.area.value = data.replace(rNewline, \"\\\\n\");\n\n    try {\n      this.form.submit();\n    } catch (e) {}\n\n    if (this.iframe.attachEvent) {\n      this.iframe.onreadystatechange = function() {\n        if (self.iframe.readyState === \"complete\") {\n          complete();\n        }\n      };\n    } else {\n      this.iframe.onload = complete;\n    }\n  }\n}\n\nmodule.exports = JSONPPolling;\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/polling-jsonp.js?");

/***/ }),

/***/ "../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/polling-xhr.js":
/*!*********************************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/polling-xhr.js ***!
  \*********************************************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* global attachEvent */\n\nconst XMLHttpRequest = __webpack_require__(/*! xmlhttprequest-ssl */ \"../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/xmlhttprequest.js\");\nconst Polling = __webpack_require__(/*! ./polling */ \"../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/polling.js\");\nconst Emitter = __webpack_require__(/*! component-emitter */ \"../../../.yarn/cache/component-emitter-npm-1.3.0-4b848565b9-fc4edbf101.zip/node_modules/component-emitter/index.js\");\nconst { pick } = __webpack_require__(/*! ../util */ \"../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/util.js\");\nconst globalThis = __webpack_require__(/*! ../globalThis */ \"../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/globalThis.browser.js\");\n\nconst debug = __webpack_require__(/*! debug */ \"../../../.yarn/$$virtual/debug-virtual-fe619ebf1d/0/cache/debug-npm-4.1.1-540248b3aa-3601a6ce96.zip/node_modules/debug/src/browser.js\")(\"engine.io-client:polling-xhr\");\n\n/**\n * Empty function\n */\n\nfunction empty() {}\n\nconst hasXHR2 = (function() {\n  const XMLHttpRequest = __webpack_require__(/*! xmlhttprequest-ssl */ \"../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/xmlhttprequest.js\");\n  const xhr = new XMLHttpRequest({ xdomain: false });\n  return null != xhr.responseType;\n})();\n\nclass XHR extends Polling {\n  /**\n   * XHR Polling constructor.\n   *\n   * @param {Object} opts\n   * @api public\n   */\n  constructor(opts) {\n    super(opts);\n\n    if (typeof location !== \"undefined\") {\n      const isSSL = \"https:\" === location.protocol;\n      let port = location.port;\n\n      // some user agents have empty `location.port`\n      if (!port) {\n        port = isSSL ? 443 : 80;\n      }\n\n      this.xd =\n        (typeof location !== \"undefined\" &&\n          opts.hostname !== location.hostname) ||\n        port !== opts.port;\n      this.xs = opts.secure !== isSSL;\n    }\n    /**\n     * XHR supports binary\n     */\n    const forceBase64 = opts && opts.forceBase64;\n    this.supportsBinary = hasXHR2 && !forceBase64;\n  }\n\n  /**\n   * Creates a request.\n   *\n   * @param {String} method\n   * @api private\n   */\n  request(opts = {}) {\n    Object.assign(\n      opts,\n      { supportsBinary: this.supportsBinary, xd: this.xd, xs: this.xs },\n      this.opts\n    );\n    return new Request(this.uri(), opts);\n  }\n\n  /**\n   * Sends data.\n   *\n   * @param {String} data to send.\n   * @param {Function} called upon flush.\n   * @api private\n   */\n  doWrite(data, fn) {\n    const isBinary = typeof data !== \"string\" && data !== undefined;\n    const req = this.request({\n      method: \"POST\",\n      data: data,\n      isBinary: isBinary\n    });\n    const self = this;\n    req.on(\"success\", fn);\n    req.on(\"error\", function(err) {\n      self.onError(\"xhr post error\", err);\n    });\n  }\n\n  /**\n   * Starts a poll cycle.\n   *\n   * @api private\n   */\n  doPoll() {\n    debug(\"xhr poll\");\n    const req = this.request();\n    const self = this;\n    req.on(\"data\", function(data) {\n      self.onData(data);\n    });\n    req.on(\"error\", function(err) {\n      self.onError(\"xhr poll error\", err);\n    });\n    this.pollXhr = req;\n  }\n}\n\nclass Request extends Emitter {\n  /**\n   * Request constructor\n   *\n   * @param {Object} options\n   * @api public\n   */\n  constructor(uri, opts) {\n    super();\n    this.opts = opts;\n\n    this.method = opts.method || \"GET\";\n    this.uri = uri;\n    this.async = false !== opts.async;\n    this.data = undefined !== opts.data ? opts.data : null;\n    this.isBinary = opts.isBinary;\n    this.supportsBinary = opts.supportsBinary;\n\n    this.create();\n  }\n\n  /**\n   * Creates the XHR object and sends the request.\n   *\n   * @api private\n   */\n  create() {\n    const opts = pick(\n      this.opts,\n      \"agent\",\n      \"enablesXDR\",\n      \"pfx\",\n      \"key\",\n      \"passphrase\",\n      \"cert\",\n      \"ca\",\n      \"ciphers\",\n      \"rejectUnauthorized\"\n    );\n    opts.xdomain = !!this.opts.xd;\n    opts.xscheme = !!this.opts.xs;\n\n    const xhr = (this.xhr = new XMLHttpRequest(opts));\n    const self = this;\n\n    try {\n      debug(\"xhr open %s: %s\", this.method, this.uri);\n      xhr.open(this.method, this.uri, this.async);\n      try {\n        if (this.opts.extraHeaders) {\n          xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);\n          for (let i in this.opts.extraHeaders) {\n            if (this.opts.extraHeaders.hasOwnProperty(i)) {\n              xhr.setRequestHeader(i, this.opts.extraHeaders[i]);\n            }\n          }\n        }\n      } catch (e) {\n        console.log(e);\n      }\n\n      if (\"POST\" === this.method) {\n        try {\n          if (this.isBinary) {\n            xhr.setRequestHeader(\"Content-type\", \"application/octet-stream\");\n          } else {\n            xhr.setRequestHeader(\"Content-type\", \"text/plain;charset=UTF-8\");\n          }\n        } catch (e) {}\n      }\n\n      try {\n        xhr.setRequestHeader(\"Accept\", \"*/*\");\n      } catch (e) {}\n\n      // ie6 check\n      if (\"withCredentials\" in xhr) {\n        xhr.withCredentials = this.opts.withCredentials;\n      }\n\n      if (this.opts.requestTimeout) {\n        xhr.timeout = this.opts.requestTimeout;\n      }\n\n      if (this.hasXDR()) {\n        xhr.onload = function() {\n          self.onLoad();\n        };\n        xhr.onerror = function() {\n          self.onError(xhr.responseText);\n        };\n      } else {\n        xhr.onreadystatechange = function() {\n          if (xhr.readyState === 2) {\n            try {\n              const contentType = xhr.getResponseHeader(\"Content-Type\");\n              if (\n                (self.supportsBinary &&\n                  contentType === \"application/octet-stream\") ||\n                contentType === \"application/octet-stream; charset=UTF-8\"\n              ) {\n                xhr.responseType = \"arraybuffer\";\n              }\n            } catch (e) {}\n          }\n          if (4 !== xhr.readyState) return;\n          if (200 === xhr.status || 1223 === xhr.status) {\n            self.onLoad();\n          } else {\n            // make sure the `error` event handler that's user-set\n            // does not throw in the same tick and gets caught here\n            setTimeout(function() {\n              self.onError(typeof xhr.status === \"number\" ? xhr.status : 0);\n            }, 0);\n          }\n        };\n      }\n\n      debug(\"xhr data %s\", this.data);\n      xhr.send(this.data);\n    } catch (e) {\n      // Need to defer since .create() is called directly from the constructor\n      // and thus the 'error' event can only be only bound *after* this exception\n      // occurs.  Therefore, also, we cannot throw here at all.\n      setTimeout(function() {\n        self.onError(e);\n      }, 0);\n      return;\n    }\n\n    if (typeof document !== \"undefined\") {\n      this.index = Request.requestsCount++;\n      Request.requests[this.index] = this;\n    }\n  }\n\n  /**\n   * Called upon successful response.\n   *\n   * @api private\n   */\n  onSuccess() {\n    this.emit(\"success\");\n    this.cleanup();\n  }\n\n  /**\n   * Called if we have data.\n   *\n   * @api private\n   */\n  onData(data) {\n    this.emit(\"data\", data);\n    this.onSuccess();\n  }\n\n  /**\n   * Called upon error.\n   *\n   * @api private\n   */\n  onError(err) {\n    this.emit(\"error\", err);\n    this.cleanup(true);\n  }\n\n  /**\n   * Cleans up house.\n   *\n   * @api private\n   */\n  cleanup(fromError) {\n    if (\"undefined\" === typeof this.xhr || null === this.xhr) {\n      return;\n    }\n    // xmlhttprequest\n    if (this.hasXDR()) {\n      this.xhr.onload = this.xhr.onerror = empty;\n    } else {\n      this.xhr.onreadystatechange = empty;\n    }\n\n    if (fromError) {\n      try {\n        this.xhr.abort();\n      } catch (e) {}\n    }\n\n    if (typeof document !== \"undefined\") {\n      delete Request.requests[this.index];\n    }\n\n    this.xhr = null;\n  }\n\n  /**\n   * Called upon load.\n   *\n   * @api private\n   */\n  onLoad() {\n    const data = this.xhr.responseText;\n    if (data !== null) {\n      this.onData(data);\n    }\n  }\n\n  /**\n   * Check if it has XDomainRequest.\n   *\n   * @api private\n   */\n  hasXDR() {\n    return typeof XDomainRequest !== \"undefined\" && !this.xs && this.enablesXDR;\n  }\n\n  /**\n   * Aborts the request.\n   *\n   * @api public\n   */\n  abort() {\n    this.cleanup();\n  }\n}\n\n/**\n * Aborts pending requests when unloading the window. This is needed to prevent\n * memory leaks (e.g. when using IE) and to ensure that no spurious error is\n * emitted.\n */\n\nRequest.requestsCount = 0;\nRequest.requests = {};\n\nif (typeof document !== \"undefined\") {\n  if (typeof attachEvent === \"function\") {\n    attachEvent(\"onunload\", unloadHandler);\n  } else if (typeof addEventListener === \"function\") {\n    const terminationEvent = \"onpagehide\" in globalThis ? \"pagehide\" : \"unload\";\n    addEventListener(terminationEvent, unloadHandler, false);\n  }\n}\n\nfunction unloadHandler() {\n  for (let i in Request.requests) {\n    if (Request.requests.hasOwnProperty(i)) {\n      Request.requests[i].abort();\n    }\n  }\n}\n\nmodule.exports = XHR;\nmodule.exports.Request = Request;\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/polling-xhr.js?");

/***/ }),

/***/ "../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/polling.js":
/*!*****************************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/polling.js ***!
  \*****************************************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Transport = __webpack_require__(/*! ../transport */ \"../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transport.js\");\nconst parseqs = __webpack_require__(/*! parseqs */ \"../../../.yarn/cache/parseqs-npm-0.0.6-7d7191eb92-9e095b898b.zip/node_modules/parseqs/index.js\");\nconst parser = __webpack_require__(/*! engine.io-parser */ \"../../../.yarn/cache/engine.io-parser-npm-4.0.1-6bdb879e8a-3b71ef8b5a.zip/node_modules/engine.io-parser/lib/index.js\");\nconst yeast = __webpack_require__(/*! yeast */ \"../../../.yarn/cache/yeast-npm-0.1.2-19a347595d-ce326a71c7.zip/node_modules/yeast/index.js\");\n\nconst debug = __webpack_require__(/*! debug */ \"../../../.yarn/$$virtual/debug-virtual-fe619ebf1d/0/cache/debug-npm-4.1.1-540248b3aa-3601a6ce96.zip/node_modules/debug/src/browser.js\")(\"engine.io-client:polling\");\n\nclass Polling extends Transport {\n  /**\n   * Transport name.\n   */\n  get name() {\n    return \"polling\";\n  }\n\n  /**\n   * Opens the socket (triggers polling). We write a PING message to determine\n   * when the transport is open.\n   *\n   * @api private\n   */\n  doOpen() {\n    this.poll();\n  }\n\n  /**\n   * Pauses polling.\n   *\n   * @param {Function} callback upon buffers are flushed and transport is paused\n   * @api private\n   */\n  pause(onPause) {\n    const self = this;\n\n    this.readyState = \"pausing\";\n\n    function pause() {\n      debug(\"paused\");\n      self.readyState = \"paused\";\n      onPause();\n    }\n\n    if (this.polling || !this.writable) {\n      let total = 0;\n\n      if (this.polling) {\n        debug(\"we are currently polling - waiting to pause\");\n        total++;\n        this.once(\"pollComplete\", function() {\n          debug(\"pre-pause polling complete\");\n          --total || pause();\n        });\n      }\n\n      if (!this.writable) {\n        debug(\"we are currently writing - waiting to pause\");\n        total++;\n        this.once(\"drain\", function() {\n          debug(\"pre-pause writing complete\");\n          --total || pause();\n        });\n      }\n    } else {\n      pause();\n    }\n  }\n\n  /**\n   * Starts polling cycle.\n   *\n   * @api public\n   */\n  poll() {\n    debug(\"polling\");\n    this.polling = true;\n    this.doPoll();\n    this.emit(\"poll\");\n  }\n\n  /**\n   * Overloads onData to detect payloads.\n   *\n   * @api private\n   */\n  onData(data) {\n    const self = this;\n    debug(\"polling got data %s\", data);\n    const callback = function(packet, index, total) {\n      // if its the first message we consider the transport open\n      if (\"opening\" === self.readyState) {\n        self.onOpen();\n      }\n\n      // if its a close packet, we close the ongoing requests\n      if (\"close\" === packet.type) {\n        self.onClose();\n        return false;\n      }\n\n      // otherwise bypass onData and handle the message\n      self.onPacket(packet);\n    };\n\n    // decode payload\n    parser.decodePayload(data, this.socket.binaryType).forEach(callback);\n\n    // if an event did not trigger closing\n    if (\"closed\" !== this.readyState) {\n      // if we got data we're not polling\n      this.polling = false;\n      this.emit(\"pollComplete\");\n\n      if (\"open\" === this.readyState) {\n        this.poll();\n      } else {\n        debug('ignoring poll - transport state \"%s\"', this.readyState);\n      }\n    }\n  }\n\n  /**\n   * For polling, send a close packet.\n   *\n   * @api private\n   */\n  doClose() {\n    const self = this;\n\n    function close() {\n      debug(\"writing close packet\");\n      self.write([{ type: \"close\" }]);\n    }\n\n    if (\"open\" === this.readyState) {\n      debug(\"transport open - closing\");\n      close();\n    } else {\n      // in case we're trying to close while\n      // handshaking is in progress (GH-164)\n      debug(\"transport not open - deferring close\");\n      this.once(\"open\", close);\n    }\n  }\n\n  /**\n   * Writes a packets payload.\n   *\n   * @param {Array} data packets\n   * @param {Function} drain callback\n   * @api private\n   */\n  write(packets) {\n    this.writable = false;\n\n    parser.encodePayload(packets, data => {\n      this.doWrite(data, () => {\n        this.writable = true;\n        this.emit(\"drain\");\n      });\n    });\n  }\n\n  /**\n   * Generates uri for connection.\n   *\n   * @api private\n   */\n  uri() {\n    let query = this.query || {};\n    const schema = this.opts.secure ? \"https\" : \"http\";\n    let port = \"\";\n\n    // cache busting is forced\n    if (false !== this.opts.timestampRequests) {\n      query[this.opts.timestampParam] = yeast();\n    }\n\n    if (!this.supportsBinary && !query.sid) {\n      query.b64 = 1;\n    }\n\n    query = parseqs.encode(query);\n\n    // avoid port if default for schema\n    if (\n      this.opts.port &&\n      ((\"https\" === schema && Number(this.opts.port) !== 443) ||\n        (\"http\" === schema && Number(this.opts.port) !== 80))\n    ) {\n      port = \":\" + this.opts.port;\n    }\n\n    // prepend ? to query\n    if (query.length) {\n      query = \"?\" + query;\n    }\n\n    const ipv6 = this.opts.hostname.indexOf(\":\") !== -1;\n    return (\n      schema +\n      \"://\" +\n      (ipv6 ? \"[\" + this.opts.hostname + \"]\" : this.opts.hostname) +\n      port +\n      this.opts.path +\n      query\n    );\n  }\n}\n\nmodule.exports = Polling;\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/polling.js?");

/***/ }),

/***/ "../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/websocket-constructor.browser.js":
/*!***************************************************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/websocket-constructor.browser.js ***!
  \***************************************************************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const globalThis = __webpack_require__(/*! ../globalThis */ \"../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/globalThis.browser.js\");\n\nmodule.exports = {\n  WebSocket: globalThis.WebSocket || globalThis.MozWebSocket,\n  usingBrowserWebSocket: true,\n  defaultBinaryType: \"arraybuffer\"\n};\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/websocket-constructor.browser.js?");

/***/ }),

/***/ "../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/websocket.js":
/*!*******************************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/websocket.js ***!
  \*******************************************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Transport = __webpack_require__(/*! ../transport */ \"../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transport.js\");\nconst parser = __webpack_require__(/*! engine.io-parser */ \"../../../.yarn/cache/engine.io-parser-npm-4.0.1-6bdb879e8a-3b71ef8b5a.zip/node_modules/engine.io-parser/lib/index.js\");\nconst parseqs = __webpack_require__(/*! parseqs */ \"../../../.yarn/cache/parseqs-npm-0.0.6-7d7191eb92-9e095b898b.zip/node_modules/parseqs/index.js\");\nconst yeast = __webpack_require__(/*! yeast */ \"../../../.yarn/cache/yeast-npm-0.1.2-19a347595d-ce326a71c7.zip/node_modules/yeast/index.js\");\nconst { pick } = __webpack_require__(/*! ../util */ \"../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/util.js\");\nconst {\n  WebSocket,\n  usingBrowserWebSocket,\n  defaultBinaryType\n} = __webpack_require__(/*! ./websocket-constructor */ \"../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/websocket-constructor.browser.js\");\n\nconst debug = __webpack_require__(/*! debug */ \"../../../.yarn/$$virtual/debug-virtual-fe619ebf1d/0/cache/debug-npm-4.1.1-540248b3aa-3601a6ce96.zip/node_modules/debug/src/browser.js\")(\"engine.io-client:websocket\");\n\n// detect ReactNative environment\nconst isReactNative =\n  typeof navigator !== \"undefined\" &&\n  typeof navigator.product === \"string\" &&\n  navigator.product.toLowerCase() === \"reactnative\";\n\nclass WS extends Transport {\n  /**\n   * WebSocket transport constructor.\n   *\n   * @api {Object} connection options\n   * @api public\n   */\n  constructor(opts) {\n    super(opts);\n\n    const forceBase64 = opts && opts.forceBase64;\n    if (forceBase64) {\n      this.supportsBinary = false;\n    }\n    // WebSockets support binary\n    this.supportsBinary = true;\n  }\n\n  /**\n   * Transport name.\n   *\n   * @api public\n   */\n  get name() {\n    return \"websocket\";\n  }\n\n  /**\n   * Opens socket.\n   *\n   * @api private\n   */\n  doOpen() {\n    if (!this.check()) {\n      // let probe timeout\n      return;\n    }\n\n    const uri = this.uri();\n    const protocols = this.opts.protocols;\n\n    let opts;\n    if (isReactNative) {\n      opts = pick(this.opts, \"localAddress\");\n    } else {\n      opts = pick(\n        this.opts,\n        \"agent\",\n        \"perMessageDeflate\",\n        \"pfx\",\n        \"key\",\n        \"passphrase\",\n        \"cert\",\n        \"ca\",\n        \"ciphers\",\n        \"rejectUnauthorized\",\n        \"localAddress\"\n      );\n    }\n\n    if (this.opts.extraHeaders) {\n      opts.headers = this.opts.extraHeaders;\n    }\n\n    try {\n      this.ws =\n        usingBrowserWebSocket && !isReactNative\n          ? protocols\n            ? new WebSocket(uri, protocols)\n            : new WebSocket(uri)\n          : new WebSocket(uri, protocols, opts);\n    } catch (err) {\n      return this.emit(\"error\", err);\n    }\n\n    this.ws.binaryType = this.socket.binaryType || defaultBinaryType;\n\n    this.addEventListeners();\n  }\n\n  /**\n   * Adds event listeners to the socket\n   *\n   * @api private\n   */\n  addEventListeners() {\n    const self = this;\n\n    this.ws.onopen = function() {\n      self.onOpen();\n    };\n    this.ws.onclose = function() {\n      self.onClose();\n    };\n    this.ws.onmessage = function(ev) {\n      self.onData(ev.data);\n    };\n    this.ws.onerror = function(e) {\n      self.onError(\"websocket error\", e);\n    };\n  }\n\n  /**\n   * Writes data to socket.\n   *\n   * @param {Array} array of packets.\n   * @api private\n   */\n  write(packets) {\n    const self = this;\n    this.writable = false;\n\n    // encodePacket efficient as it uses WS framing\n    // no need for encodePayload\n    let total = packets.length;\n    let i = 0;\n    const l = total;\n    for (; i < l; i++) {\n      (function(packet) {\n        parser.encodePacket(packet, self.supportsBinary, function(data) {\n          // always create a new object (GH-437)\n          const opts = {};\n          if (!usingBrowserWebSocket) {\n            if (packet.options) {\n              opts.compress = packet.options.compress;\n            }\n\n            if (self.opts.perMessageDeflate) {\n              const len =\n                \"string\" === typeof data\n                  ? Buffer.byteLength(data)\n                  : data.length;\n              if (len < self.opts.perMessageDeflate.threshold) {\n                opts.compress = false;\n              }\n            }\n          }\n\n          // Sometimes the websocket has already been closed but the browser didn't\n          // have a chance of informing us about it yet, in that case send will\n          // throw an error\n          try {\n            if (usingBrowserWebSocket) {\n              // TypeError is thrown when passing the second argument on Safari\n              self.ws.send(data);\n            } else {\n              self.ws.send(data, opts);\n            }\n          } catch (e) {\n            debug(\"websocket closed before onclose event\");\n          }\n\n          --total || done();\n        });\n      })(packets[i]);\n    }\n\n    function done() {\n      self.emit(\"flush\");\n\n      // fake drain\n      // defer to next tick to allow Socket to clear writeBuffer\n      setTimeout(function() {\n        self.writable = true;\n        self.emit(\"drain\");\n      }, 0);\n    }\n  }\n\n  /**\n   * Called upon close\n   *\n   * @api private\n   */\n  onClose() {\n    Transport.prototype.onClose.call(this);\n  }\n\n  /**\n   * Closes socket.\n   *\n   * @api private\n   */\n  doClose() {\n    if (typeof this.ws !== \"undefined\") {\n      this.ws.close();\n    }\n  }\n\n  /**\n   * Generates uri for connection.\n   *\n   * @api private\n   */\n  uri() {\n    let query = this.query || {};\n    const schema = this.opts.secure ? \"wss\" : \"ws\";\n    let port = \"\";\n\n    // avoid port if default for schema\n    if (\n      this.opts.port &&\n      ((\"wss\" === schema && Number(this.opts.port) !== 443) ||\n        (\"ws\" === schema && Number(this.opts.port) !== 80))\n    ) {\n      port = \":\" + this.opts.port;\n    }\n\n    // append timestamp to URI\n    if (this.opts.timestampRequests) {\n      query[this.opts.timestampParam] = yeast();\n    }\n\n    // communicate binary support capabilities\n    if (!this.supportsBinary) {\n      query.b64 = 1;\n    }\n\n    query = parseqs.encode(query);\n\n    // prepend ? to query\n    if (query.length) {\n      query = \"?\" + query;\n    }\n\n    const ipv6 = this.opts.hostname.indexOf(\":\") !== -1;\n    return (\n      schema +\n      \"://\" +\n      (ipv6 ? \"[\" + this.opts.hostname + \"]\" : this.opts.hostname) +\n      port +\n      this.opts.path +\n      query\n    );\n  }\n\n  /**\n   * Feature detection for WebSocket.\n   *\n   * @return {Boolean} whether this transport is available.\n   * @api public\n   */\n  check() {\n    return (\n      !!WebSocket &&\n      !(\"__initialize\" in WebSocket && this.name === WS.prototype.name)\n    );\n  }\n}\n\nmodule.exports = WS;\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/transports/websocket.js?");

/***/ }),

/***/ "../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/util.js":
/*!***************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/util.js ***!
  \***************************************************************************************************************************/
/*! default exports */
/*! export pick [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

eval("module.exports.pick = (obj, ...attr) => {\n  return attr.reduce((acc, k) => {\n    acc[k] = obj[k];\n    return acc;\n  }, {});\n};\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/util.js?");

/***/ }),

/***/ "../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/xmlhttprequest.js":
/*!*************************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/xmlhttprequest.js ***!
  \*************************************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// browser shim for xmlhttprequest module\n\nconst hasCORS = __webpack_require__(/*! has-cors */ \"../../../.yarn/cache/has-cors-npm-1.1.0-d60e35705d-c8257cbe3f.zip/node_modules/has-cors/index.js\");\nconst globalThis = __webpack_require__(/*! ./globalThis */ \"../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/globalThis.browser.js\");\n\nmodule.exports = function(opts) {\n  const xdomain = opts.xdomain;\n\n  // scheme must be same when usign XDomainRequest\n  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx\n  const xscheme = opts.xscheme;\n\n  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.\n  // https://github.com/Automattic/engine.io-client/pull/217\n  const enablesXDR = opts.enablesXDR;\n\n  // XMLHttpRequest can be disabled on IE\n  try {\n    if (\"undefined\" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {\n      return new XMLHttpRequest();\n    }\n  } catch (e) {}\n\n  // Use XDomainRequest for IE8 if enablesXDR is true\n  // because loading bar keeps flashing when using jsonp-polling\n  // https://github.com/yujiosaka/socke.io-ie8-loading-example\n  try {\n    if (\"undefined\" !== typeof XDomainRequest && !xscheme && enablesXDR) {\n      return new XDomainRequest();\n    }\n  } catch (e) {}\n\n  if (!xdomain) {\n    try {\n      return new globalThis[[\"Active\"].concat(\"Object\").join(\"X\")](\n        \"Microsoft.XMLHTTP\"\n      );\n    } catch (e) {}\n  }\n};\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/xmlhttprequest.js?");

/***/ }),

/***/ "../../../.yarn/cache/engine.io-parser-npm-4.0.1-6bdb879e8a-3b71ef8b5a.zip/node_modules/engine.io-parser/lib/commons.js":
/*!******************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/engine.io-parser-npm-4.0.1-6bdb879e8a-3b71ef8b5a.zip/node_modules/engine.io-parser/lib/commons.js ***!
  \******************************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

eval("const PACKET_TYPES = Object.create(null); // no Map = no polyfill\nPACKET_TYPES[\"open\"] = \"0\";\nPACKET_TYPES[\"close\"] = \"1\";\nPACKET_TYPES[\"ping\"] = \"2\";\nPACKET_TYPES[\"pong\"] = \"3\";\nPACKET_TYPES[\"message\"] = \"4\";\nPACKET_TYPES[\"upgrade\"] = \"5\";\nPACKET_TYPES[\"noop\"] = \"6\";\n\nconst PACKET_TYPES_REVERSE = Object.create(null);\nObject.keys(PACKET_TYPES).forEach(key => {\n  PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;\n});\n\nconst ERROR_PACKET = { type: \"error\", data: \"parser error\" };\n\nmodule.exports = {\n  PACKET_TYPES,\n  PACKET_TYPES_REVERSE,\n  ERROR_PACKET\n};\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/engine.io-parser-npm-4.0.1-6bdb879e8a-3b71ef8b5a.zip/node_modules/engine.io-parser/lib/commons.js?");

/***/ }),

/***/ "../../../.yarn/cache/engine.io-parser-npm-4.0.1-6bdb879e8a-3b71ef8b5a.zip/node_modules/engine.io-parser/lib/decodePacket.browser.js":
/*!*******************************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/engine.io-parser-npm-4.0.1-6bdb879e8a-3b71ef8b5a.zip/node_modules/engine.io-parser/lib/decodePacket.browser.js ***!
  \*******************************************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { PACKET_TYPES_REVERSE, ERROR_PACKET } = __webpack_require__(/*! ./commons */ \"../../../.yarn/cache/engine.io-parser-npm-4.0.1-6bdb879e8a-3b71ef8b5a.zip/node_modules/engine.io-parser/lib/commons.js\");\n\nconst withNativeArrayBuffer = typeof ArrayBuffer === \"function\";\n\nlet base64decoder;\nif (withNativeArrayBuffer) {\n  base64decoder = __webpack_require__(/*! base64-arraybuffer */ \"../../../.yarn/cache/base64-arraybuffer-npm-0.1.5-64a2fbae81-9ae66a41b8.zip/node_modules/base64-arraybuffer/lib/base64-arraybuffer.js\");\n}\n\nconst decodePacket = (encodedPacket, binaryType) => {\n  if (typeof encodedPacket !== \"string\") {\n    return {\n      type: \"message\",\n      data: mapBinary(encodedPacket, binaryType)\n    };\n  }\n  const type = encodedPacket.charAt(0);\n  if (type === \"b\") {\n    return {\n      type: \"message\",\n      data: decodeBase64Packet(encodedPacket.substring(1), binaryType)\n    };\n  }\n  const packetType = PACKET_TYPES_REVERSE[type];\n  if (!packetType) {\n    return ERROR_PACKET;\n  }\n  return encodedPacket.length > 1\n    ? {\n        type: PACKET_TYPES_REVERSE[type],\n        data: encodedPacket.substring(1)\n      }\n    : {\n        type: PACKET_TYPES_REVERSE[type]\n      };\n};\n\nconst decodeBase64Packet = (data, binaryType) => {\n  if (base64decoder) {\n    const decoded = base64decoder.decode(data);\n    return mapBinary(decoded, binaryType);\n  } else {\n    return { base64: true, data }; // fallback for old browsers\n  }\n};\n\nconst mapBinary = (data, binaryType) => {\n  switch (binaryType) {\n    case \"blob\":\n      return data instanceof ArrayBuffer ? new Blob([data]) : data;\n    case \"arraybuffer\":\n    default:\n      return data; // assuming the data is already an ArrayBuffer\n  }\n};\n\nmodule.exports = decodePacket;\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/engine.io-parser-npm-4.0.1-6bdb879e8a-3b71ef8b5a.zip/node_modules/engine.io-parser/lib/decodePacket.browser.js?");

/***/ }),

/***/ "../../../.yarn/cache/engine.io-parser-npm-4.0.1-6bdb879e8a-3b71ef8b5a.zip/node_modules/engine.io-parser/lib/encodePacket.browser.js":
/*!*******************************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/engine.io-parser-npm-4.0.1-6bdb879e8a-3b71ef8b5a.zip/node_modules/engine.io-parser/lib/encodePacket.browser.js ***!
  \*******************************************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { PACKET_TYPES } = __webpack_require__(/*! ./commons */ \"../../../.yarn/cache/engine.io-parser-npm-4.0.1-6bdb879e8a-3b71ef8b5a.zip/node_modules/engine.io-parser/lib/commons.js\");\n\nconst withNativeBlob =\n  typeof Blob === \"function\" ||\n  (typeof Blob !== \"undefined\" &&\n    Object.prototype.toString.call(Blob) === \"[object BlobConstructor]\");\nconst withNativeArrayBuffer = typeof ArrayBuffer === \"function\";\n\n// ArrayBuffer.isView method is not defined in IE10\nconst isView = obj => {\n  return typeof ArrayBuffer.isView === \"function\"\n    ? ArrayBuffer.isView(obj)\n    : obj && obj.buffer instanceof ArrayBuffer;\n};\n\nconst encodePacket = ({ type, data }, supportsBinary, callback) => {\n  if (withNativeBlob && data instanceof Blob) {\n    if (supportsBinary) {\n      return callback(data);\n    } else {\n      return encodeBlobAsBase64(data, callback);\n    }\n  } else if (\n    withNativeArrayBuffer &&\n    (data instanceof ArrayBuffer || isView(data))\n  ) {\n    if (supportsBinary) {\n      return callback(data instanceof ArrayBuffer ? data : data.buffer);\n    } else {\n      return encodeBlobAsBase64(new Blob([data]), callback);\n    }\n  }\n  // plain string\n  return callback(PACKET_TYPES[type] + (data || \"\"));\n};\n\nconst encodeBlobAsBase64 = (data, callback) => {\n  const fileReader = new FileReader();\n  fileReader.onload = function() {\n    const content = fileReader.result.split(\",\")[1];\n    callback(\"b\" + content);\n  };\n  return fileReader.readAsDataURL(data);\n};\n\nmodule.exports = encodePacket;\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/engine.io-parser-npm-4.0.1-6bdb879e8a-3b71ef8b5a.zip/node_modules/engine.io-parser/lib/encodePacket.browser.js?");

/***/ }),

/***/ "../../../.yarn/cache/engine.io-parser-npm-4.0.1-6bdb879e8a-3b71ef8b5a.zip/node_modules/engine.io-parser/lib/index.js":
/*!****************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/engine.io-parser-npm-4.0.1-6bdb879e8a-3b71ef8b5a.zip/node_modules/engine.io-parser/lib/index.js ***!
  \****************************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const encodePacket = __webpack_require__(/*! ./encodePacket */ \"../../../.yarn/cache/engine.io-parser-npm-4.0.1-6bdb879e8a-3b71ef8b5a.zip/node_modules/engine.io-parser/lib/encodePacket.browser.js\");\nconst decodePacket = __webpack_require__(/*! ./decodePacket */ \"../../../.yarn/cache/engine.io-parser-npm-4.0.1-6bdb879e8a-3b71ef8b5a.zip/node_modules/engine.io-parser/lib/decodePacket.browser.js\");\n\nconst SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text\n\nconst encodePayload = (packets, callback) => {\n  // some packets may be added to the array while encoding, so the initial length must be saved\n  const length = packets.length;\n  const encodedPackets = new Array(length);\n  let count = 0;\n\n  packets.forEach((packet, i) => {\n    // force base64 encoding for binary packets\n    encodePacket(packet, false, encodedPacket => {\n      encodedPackets[i] = encodedPacket;\n      if (++count === length) {\n        callback(encodedPackets.join(SEPARATOR));\n      }\n    });\n  });\n};\n\nconst decodePayload = (encodedPayload, binaryType) => {\n  const encodedPackets = encodedPayload.split(SEPARATOR);\n  const packets = [];\n  for (let i = 0; i < encodedPackets.length; i++) {\n    const decodedPacket = decodePacket(encodedPackets[i], binaryType);\n    packets.push(decodedPacket);\n    if (decodedPacket.type === \"error\") {\n      break;\n    }\n  }\n  return packets;\n};\n\nmodule.exports = {\n  protocol: 4,\n  encodePacket,\n  encodePayload,\n  decodePacket,\n  decodePayload\n};\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/engine.io-parser-npm-4.0.1-6bdb879e8a-3b71ef8b5a.zip/node_modules/engine.io-parser/lib/index.js?");

/***/ }),

/***/ "../../../.yarn/cache/has-cors-npm-1.1.0-d60e35705d-c8257cbe3f.zip/node_modules/has-cors/index.js":
/*!********************************************************************************************************!*\
  !*** ../../../.yarn/cache/has-cors-npm-1.1.0-d60e35705d-c8257cbe3f.zip/node_modules/has-cors/index.js ***!
  \********************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

eval("\n/**\n * Module exports.\n *\n * Logic borrowed from Modernizr:\n *\n *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js\n */\n\ntry {\n  module.exports = typeof XMLHttpRequest !== 'undefined' &&\n    'withCredentials' in new XMLHttpRequest();\n} catch (err) {\n  // if XMLHttp support is disabled in IE then it will throw\n  // when trying to create\n  module.exports = false;\n}\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/has-cors-npm-1.1.0-d60e35705d-c8257cbe3f.zip/node_modules/has-cors/index.js?");

/***/ }),

/***/ "../../../.yarn/cache/ms-npm-2.1.2-ec0c1512ff-9b65fb709b.zip/node_modules/ms/index.js":
/*!********************************************************************************************!*\
  !*** ../../../.yarn/cache/ms-npm-2.1.2-ec0c1512ff-9b65fb709b.zip/node_modules/ms/index.js ***!
  \********************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

eval("/**\n * Helpers.\n */\n\nvar s = 1000;\nvar m = s * 60;\nvar h = m * 60;\nvar d = h * 24;\nvar w = d * 7;\nvar y = d * 365.25;\n\n/**\n * Parse or format the given `val`.\n *\n * Options:\n *\n *  - `long` verbose formatting [false]\n *\n * @param {String|Number} val\n * @param {Object} [options]\n * @throws {Error} throw an error if val is not a non-empty string or a number\n * @return {String|Number}\n * @api public\n */\n\nmodule.exports = function(val, options) {\n  options = options || {};\n  var type = typeof val;\n  if (type === 'string' && val.length > 0) {\n    return parse(val);\n  } else if (type === 'number' && isFinite(val)) {\n    return options.long ? fmtLong(val) : fmtShort(val);\n  }\n  throw new Error(\n    'val is not a non-empty string or a valid number. val=' +\n      JSON.stringify(val)\n  );\n};\n\n/**\n * Parse the given `str` and return milliseconds.\n *\n * @param {String} str\n * @return {Number}\n * @api private\n */\n\nfunction parse(str) {\n  str = String(str);\n  if (str.length > 100) {\n    return;\n  }\n  var match = /^(-?(?:\\d+)?\\.?\\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(\n    str\n  );\n  if (!match) {\n    return;\n  }\n  var n = parseFloat(match[1]);\n  var type = (match[2] || 'ms').toLowerCase();\n  switch (type) {\n    case 'years':\n    case 'year':\n    case 'yrs':\n    case 'yr':\n    case 'y':\n      return n * y;\n    case 'weeks':\n    case 'week':\n    case 'w':\n      return n * w;\n    case 'days':\n    case 'day':\n    case 'd':\n      return n * d;\n    case 'hours':\n    case 'hour':\n    case 'hrs':\n    case 'hr':\n    case 'h':\n      return n * h;\n    case 'minutes':\n    case 'minute':\n    case 'mins':\n    case 'min':\n    case 'm':\n      return n * m;\n    case 'seconds':\n    case 'second':\n    case 'secs':\n    case 'sec':\n    case 's':\n      return n * s;\n    case 'milliseconds':\n    case 'millisecond':\n    case 'msecs':\n    case 'msec':\n    case 'ms':\n      return n;\n    default:\n      return undefined;\n  }\n}\n\n/**\n * Short format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */\n\nfunction fmtShort(ms) {\n  var msAbs = Math.abs(ms);\n  if (msAbs >= d) {\n    return Math.round(ms / d) + 'd';\n  }\n  if (msAbs >= h) {\n    return Math.round(ms / h) + 'h';\n  }\n  if (msAbs >= m) {\n    return Math.round(ms / m) + 'm';\n  }\n  if (msAbs >= s) {\n    return Math.round(ms / s) + 's';\n  }\n  return ms + 'ms';\n}\n\n/**\n * Long format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */\n\nfunction fmtLong(ms) {\n  var msAbs = Math.abs(ms);\n  if (msAbs >= d) {\n    return plural(ms, msAbs, d, 'day');\n  }\n  if (msAbs >= h) {\n    return plural(ms, msAbs, h, 'hour');\n  }\n  if (msAbs >= m) {\n    return plural(ms, msAbs, m, 'minute');\n  }\n  if (msAbs >= s) {\n    return plural(ms, msAbs, s, 'second');\n  }\n  return ms + ' ms';\n}\n\n/**\n * Pluralization helper.\n */\n\nfunction plural(ms, msAbs, n, name) {\n  var isPlural = msAbs >= n * 1.5;\n  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');\n}\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/ms-npm-2.1.2-ec0c1512ff-9b65fb709b.zip/node_modules/ms/index.js?");

/***/ }),

/***/ "../../../.yarn/cache/parseqs-npm-0.0.6-7d7191eb92-9e095b898b.zip/node_modules/parseqs/index.js":
/*!******************************************************************************************************!*\
  !*** ../../../.yarn/cache/parseqs-npm-0.0.6-7d7191eb92-9e095b898b.zip/node_modules/parseqs/index.js ***!
  \******************************************************************************************************/
/*! default exports */
/*! export decode [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export encode [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

eval("/**\n * Compiles a querystring\n * Returns string representation of the object\n *\n * @param {Object}\n * @api private\n */\n\nexports.encode = function (obj) {\n  var str = '';\n\n  for (var i in obj) {\n    if (obj.hasOwnProperty(i)) {\n      if (str.length) str += '&';\n      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);\n    }\n  }\n\n  return str;\n};\n\n/**\n * Parses a simple querystring into an object\n *\n * @param {String} qs\n * @api private\n */\n\nexports.decode = function(qs){\n  var qry = {};\n  var pairs = qs.split('&');\n  for (var i = 0, l = pairs.length; i < l; i++) {\n    var pair = pairs[i].split('=');\n    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);\n  }\n  return qry;\n};\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/parseqs-npm-0.0.6-7d7191eb92-9e095b898b.zip/node_modules/parseqs/index.js?");

/***/ }),

/***/ "../../../.yarn/cache/parseuri-npm-0.0.6-0c11d6eb7b-ff7ad178b0.zip/node_modules/parseuri/index.js":
/*!********************************************************************************************************!*\
  !*** ../../../.yarn/cache/parseuri-npm-0.0.6-0c11d6eb7b-ff7ad178b0.zip/node_modules/parseuri/index.js ***!
  \********************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

eval("/**\n * Parses an URI\n *\n * @author Steven Levithan <stevenlevithan.com> (MIT license)\n * @api private\n */\n\nvar re = /^(?:(?![^:@]+:[^:@\\/]*@)(http|https|ws|wss):\\/\\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\\/?#]*)(?::(\\d*))?)(((\\/(?:[^?#](?![^?#\\/]*\\.[^?#\\/.]+(?:[?#]|$)))*\\/?)?([^?#\\/]*))(?:\\?([^#]*))?(?:#(.*))?)/;\n\nvar parts = [\n    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'\n];\n\nmodule.exports = function parseuri(str) {\n    var src = str,\n        b = str.indexOf('['),\n        e = str.indexOf(']');\n\n    if (b != -1 && e != -1) {\n        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);\n    }\n\n    var m = re.exec(str || ''),\n        uri = {},\n        i = 14;\n\n    while (i--) {\n        uri[parts[i]] = m[i] || '';\n    }\n\n    if (b != -1 && e != -1) {\n        uri.source = src;\n        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');\n        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');\n        uri.ipv6uri = true;\n    }\n\n    uri.pathNames = pathNames(uri, uri['path']);\n    uri.queryKey = queryKey(uri, uri['query']);\n\n    return uri;\n};\n\nfunction pathNames(obj, path) {\n    var regx = /\\/{2,9}/g,\n        names = path.replace(regx, \"/\").split(\"/\");\n\n    if (path.substr(0, 1) == '/' || path.length === 0) {\n        names.splice(0, 1);\n    }\n    if (path.substr(path.length - 1, 1) == '/') {\n        names.splice(names.length - 1, 1);\n    }\n\n    return names;\n}\n\nfunction queryKey(uri, query) {\n    var data = {};\n\n    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {\n        if ($1) {\n            data[$1] = $2;\n        }\n    });\n\n    return data;\n}\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/parseuri-npm-0.0.6-0c11d6eb7b-ff7ad178b0.zip/node_modules/parseuri/index.js?");

/***/ }),

/***/ "../../../.yarn/cache/socket.io-client-npm-3.0.4-d98ba3da09-73d21e1148.zip/node_modules/socket.io-client/build/index.js":
/*!******************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/socket.io-client-npm-3.0.4-d98ba3da09-73d21e1148.zip/node_modules/socket.io-client/build/index.js ***!
  \******************************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, module, __webpack_require__ */
/***/ ((module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Socket = exports.io = exports.Manager = exports.protocol = void 0;\nconst url_1 = __webpack_require__(/*! ./url */ \"../../../.yarn/cache/socket.io-client-npm-3.0.4-d98ba3da09-73d21e1148.zip/node_modules/socket.io-client/build/url.js\");\nconst manager_1 = __webpack_require__(/*! ./manager */ \"../../../.yarn/cache/socket.io-client-npm-3.0.4-d98ba3da09-73d21e1148.zip/node_modules/socket.io-client/build/manager.js\");\nconst socket_1 = __webpack_require__(/*! ./socket */ \"../../../.yarn/cache/socket.io-client-npm-3.0.4-d98ba3da09-73d21e1148.zip/node_modules/socket.io-client/build/socket.js\");\nObject.defineProperty(exports, \"Socket\", ({ enumerable: true, get: function () { return socket_1.Socket; } }));\nconst debug = __webpack_require__(/*! debug */ \"../../../.yarn/$$virtual/debug-virtual-fe619ebf1d/0/cache/debug-npm-4.1.1-540248b3aa-3601a6ce96.zip/node_modules/debug/src/browser.js\")(\"socket.io-client\");\n/**\n * Module exports.\n */\nmodule.exports = exports = lookup;\n/**\n * Managers cache.\n */\nconst cache = (exports.managers = {});\nfunction lookup(uri, opts) {\n    if (typeof uri === \"object\") {\n        opts = uri;\n        uri = undefined;\n    }\n    opts = opts || {};\n    const parsed = url_1.url(uri);\n    const source = parsed.source;\n    const id = parsed.id;\n    const path = parsed.path;\n    const sameNamespace = cache[id] && path in cache[id][\"nsps\"];\n    const newConnection = opts.forceNew ||\n        opts[\"force new connection\"] ||\n        false === opts.multiplex ||\n        sameNamespace;\n    let io;\n    if (newConnection) {\n        debug(\"ignoring socket cache for %s\", source);\n        io = new manager_1.Manager(source, opts);\n    }\n    else {\n        if (!cache[id]) {\n            debug(\"new io instance for %s\", source);\n            cache[id] = new manager_1.Manager(source, opts);\n        }\n        io = cache[id];\n    }\n    if (parsed.query && !opts.query) {\n        opts.query = parsed.query;\n    }\n    return io.socket(parsed.path, opts);\n}\nexports.io = lookup;\n/**\n * Protocol version.\n *\n * @public\n */\nvar socket_io_parser_1 = __webpack_require__(/*! socket.io-parser */ \"../../../.yarn/cache/socket.io-parser-npm-4.0.1-f4a754ed88-8110522c24.zip/node_modules/socket.io-parser/dist/index.js\");\nObject.defineProperty(exports, \"protocol\", ({ enumerable: true, get: function () { return socket_io_parser_1.protocol; } }));\n/**\n * `connect`.\n *\n * @param {String} uri\n * @public\n */\nexports.connect = lookup;\n/**\n * Expose constructors for standalone build.\n *\n * @public\n */\nvar manager_2 = __webpack_require__(/*! ./manager */ \"../../../.yarn/cache/socket.io-client-npm-3.0.4-d98ba3da09-73d21e1148.zip/node_modules/socket.io-client/build/manager.js\");\nObject.defineProperty(exports, \"Manager\", ({ enumerable: true, get: function () { return manager_2.Manager; } }));\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/socket.io-client-npm-3.0.4-d98ba3da09-73d21e1148.zip/node_modules/socket.io-client/build/index.js?");

/***/ }),

/***/ "../../../.yarn/cache/socket.io-client-npm-3.0.4-d98ba3da09-73d21e1148.zip/node_modules/socket.io-client/build/manager.js":
/*!********************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/socket.io-client-npm-3.0.4-d98ba3da09-73d21e1148.zip/node_modules/socket.io-client/build/manager.js ***!
  \********************************************************************************************************************************/
/*! flagged exports */
/*! export Manager [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export __esModule [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Manager = void 0;\nconst eio = __webpack_require__(/*! engine.io-client */ \"../../../.yarn/cache/engine.io-client-npm-4.0.2-9adb255344-af3880585b.zip/node_modules/engine.io-client/lib/index.js\");\nconst socket_1 = __webpack_require__(/*! ./socket */ \"../../../.yarn/cache/socket.io-client-npm-3.0.4-d98ba3da09-73d21e1148.zip/node_modules/socket.io-client/build/socket.js\");\nconst Emitter = __webpack_require__(/*! component-emitter */ \"../../../.yarn/cache/component-emitter-npm-1.3.0-4b848565b9-fc4edbf101.zip/node_modules/component-emitter/index.js\");\nconst parser = __webpack_require__(/*! socket.io-parser */ \"../../../.yarn/cache/socket.io-parser-npm-4.0.1-f4a754ed88-8110522c24.zip/node_modules/socket.io-parser/dist/index.js\");\nconst on_1 = __webpack_require__(/*! ./on */ \"../../../.yarn/cache/socket.io-client-npm-3.0.4-d98ba3da09-73d21e1148.zip/node_modules/socket.io-client/build/on.js\");\nconst bind = __webpack_require__(/*! component-bind */ \"../../../.yarn/cache/component-bind-npm-1.0.0-c4b6dae2b7-afbea09480.zip/node_modules/component-bind/index.js\");\nconst Backoff = __webpack_require__(/*! backo2 */ \"../../../.yarn/cache/backo2-npm-1.0.2-e933aab18a-72f19a0fd2.zip/node_modules/backo2/index.js\");\nconst debug = __webpack_require__(/*! debug */ \"../../../.yarn/$$virtual/debug-virtual-fe619ebf1d/0/cache/debug-npm-4.1.1-540248b3aa-3601a6ce96.zip/node_modules/debug/src/browser.js\")(\"socket.io-client:manager\");\nclass Manager extends Emitter {\n    constructor(uri, opts) {\n        super();\n        this.nsps = {};\n        this.subs = [];\n        if (uri && \"object\" === typeof uri) {\n            opts = uri;\n            uri = undefined;\n        }\n        opts = opts || {};\n        opts.path = opts.path || \"/socket.io\";\n        this.opts = opts;\n        this.reconnection(opts.reconnection !== false);\n        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);\n        this.reconnectionDelay(opts.reconnectionDelay || 1000);\n        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);\n        this.randomizationFactor(opts.randomizationFactor || 0.5);\n        this.backoff = new Backoff({\n            min: this.reconnectionDelay(),\n            max: this.reconnectionDelayMax(),\n            jitter: this.randomizationFactor(),\n        });\n        this.timeout(null == opts.timeout ? 20000 : opts.timeout);\n        this._readyState = \"closed\";\n        this.uri = uri;\n        const _parser = opts.parser || parser;\n        this.encoder = new _parser.Encoder();\n        this.decoder = new _parser.Decoder();\n        this._autoConnect = opts.autoConnect !== false;\n        if (this._autoConnect)\n            this.open();\n    }\n    reconnection(v) {\n        if (!arguments.length)\n            return this._reconnection;\n        this._reconnection = !!v;\n        return this;\n    }\n    reconnectionAttempts(v) {\n        if (v === undefined)\n            return this._reconnectionAttempts;\n        this._reconnectionAttempts = v;\n        return this;\n    }\n    reconnectionDelay(v) {\n        var _a;\n        if (v === undefined)\n            return this._reconnectionDelay;\n        this._reconnectionDelay = v;\n        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);\n        return this;\n    }\n    randomizationFactor(v) {\n        var _a;\n        if (v === undefined)\n            return this._randomizationFactor;\n        this._randomizationFactor = v;\n        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);\n        return this;\n    }\n    reconnectionDelayMax(v) {\n        var _a;\n        if (v === undefined)\n            return this._reconnectionDelayMax;\n        this._reconnectionDelayMax = v;\n        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);\n        return this;\n    }\n    timeout(v) {\n        if (!arguments.length)\n            return this._timeout;\n        this._timeout = v;\n        return this;\n    }\n    /**\n     * Starts trying to reconnect if reconnection is enabled and we have not\n     * started reconnecting yet\n     *\n     * @private\n     */\n    maybeReconnectOnOpen() {\n        // Only try to reconnect if it's the first time we're connecting\n        if (!this._reconnecting &&\n            this._reconnection &&\n            this.backoff.attempts === 0) {\n            // keeps reconnection from firing twice for the same reconnection loop\n            this.reconnect();\n        }\n    }\n    /**\n     * Sets the current transport `socket`.\n     *\n     * @param {Function} fn - optional, callback\n     * @return self\n     * @public\n     */\n    open(fn) {\n        debug(\"readyState %s\", this._readyState);\n        if (~this._readyState.indexOf(\"open\"))\n            return this;\n        debug(\"opening %s\", this.uri);\n        this.engine = eio(this.uri, this.opts);\n        const socket = this.engine;\n        const self = this;\n        this._readyState = \"opening\";\n        this.skipReconnect = false;\n        // emit `open`\n        const openSub = on_1.on(socket, \"open\", function () {\n            self.onopen();\n            fn && fn();\n        });\n        // emit `error`\n        const errorSub = on_1.on(socket, \"error\", (err) => {\n            debug(\"error\");\n            self.cleanup();\n            self._readyState = \"closed\";\n            super.emit(\"error\", err);\n            if (fn) {\n                fn(err);\n            }\n            else {\n                // Only do this if there is no fn to handle the error\n                self.maybeReconnectOnOpen();\n            }\n        });\n        if (false !== this._timeout) {\n            const timeout = this._timeout;\n            debug(\"connect attempt will timeout after %d\", timeout);\n            if (timeout === 0) {\n                openSub.destroy(); // prevents a race condition with the 'open' event\n            }\n            // set timer\n            const timer = setTimeout(() => {\n                debug(\"connect attempt timed out after %d\", timeout);\n                openSub.destroy();\n                socket.close();\n                socket.emit(\"error\", new Error(\"timeout\"));\n            }, timeout);\n            this.subs.push({\n                destroy: function () {\n                    clearTimeout(timer);\n                },\n            });\n        }\n        this.subs.push(openSub);\n        this.subs.push(errorSub);\n        return this;\n    }\n    /**\n     * Alias for open()\n     *\n     * @return {Manager} self\n     * @public\n     */\n    connect(fn) {\n        return this.open(fn);\n    }\n    /**\n     * Called upon transport open.\n     *\n     * @private\n     */\n    onopen() {\n        debug(\"open\");\n        // clear old subs\n        this.cleanup();\n        // mark as open\n        this._readyState = \"open\";\n        super.emit(\"open\");\n        // add new subs\n        const socket = this.engine;\n        this.subs.push(on_1.on(socket, \"data\", bind(this, \"ondata\")), on_1.on(socket, \"ping\", bind(this, \"onping\")), on_1.on(socket, \"error\", bind(this, \"onerror\")), on_1.on(socket, \"close\", bind(this, \"onclose\")), on_1.on(this.decoder, \"decoded\", bind(this, \"ondecoded\")));\n    }\n    /**\n     * Called upon a ping.\n     *\n     * @private\n     */\n    onping() {\n        super.emit(\"ping\");\n    }\n    /**\n     * Called with data.\n     *\n     * @private\n     */\n    ondata(data) {\n        this.decoder.add(data);\n    }\n    /**\n     * Called when parser fully decodes a packet.\n     *\n     * @private\n     */\n    ondecoded(packet) {\n        super.emit(\"packet\", packet);\n    }\n    /**\n     * Called upon socket error.\n     *\n     * @private\n     */\n    onerror(err) {\n        debug(\"error\", err);\n        super.emit(\"error\", err);\n    }\n    /**\n     * Creates a new socket for the given `nsp`.\n     *\n     * @return {Socket}\n     * @public\n     */\n    socket(nsp, opts) {\n        let socket = this.nsps[nsp];\n        if (!socket) {\n            socket = new socket_1.Socket(this, nsp, opts);\n            this.nsps[nsp] = socket;\n        }\n        return socket;\n    }\n    /**\n     * Called upon a socket close.\n     *\n     * @param socket\n     * @private\n     */\n    _destroy(socket) {\n        const nsps = Object.keys(this.nsps);\n        for (const nsp of nsps) {\n            const socket = this.nsps[nsp];\n            if (socket.active) {\n                debug(\"socket %s is still active, skipping close\", nsp);\n                return;\n            }\n        }\n        this._close();\n    }\n    /**\n     * Writes a packet.\n     *\n     * @param packet\n     * @private\n     */\n    _packet(packet) {\n        debug(\"writing packet %j\", packet);\n        if (packet.query && packet.type === 0)\n            packet.nsp += \"?\" + packet.query;\n        const encodedPackets = this.encoder.encode(packet);\n        for (let i = 0; i < encodedPackets.length; i++) {\n            this.engine.write(encodedPackets[i], packet.options);\n        }\n    }\n    /**\n     * Clean up transport subscriptions and packet buffer.\n     *\n     * @private\n     */\n    cleanup() {\n        debug(\"cleanup\");\n        const subsLength = this.subs.length;\n        for (let i = 0; i < subsLength; i++) {\n            const sub = this.subs.shift();\n            sub.destroy();\n        }\n        this.decoder.destroy();\n    }\n    /**\n     * Close the current socket.\n     *\n     * @private\n     */\n    _close() {\n        debug(\"disconnect\");\n        this.skipReconnect = true;\n        this._reconnecting = false;\n        if (\"opening\" === this._readyState) {\n            // `onclose` will not fire because\n            // an open event never happened\n            this.cleanup();\n        }\n        this.backoff.reset();\n        this._readyState = \"closed\";\n        if (this.engine)\n            this.engine.close();\n    }\n    /**\n     * Alias for close()\n     *\n     * @private\n     */\n    disconnect() {\n        return this._close();\n    }\n    /**\n     * Called upon engine close.\n     *\n     * @private\n     */\n    onclose(reason) {\n        debug(\"onclose\");\n        this.cleanup();\n        this.backoff.reset();\n        this._readyState = \"closed\";\n        super.emit(\"close\", reason);\n        if (this._reconnection && !this.skipReconnect) {\n            this.reconnect();\n        }\n    }\n    /**\n     * Attempt a reconnection.\n     *\n     * @private\n     */\n    reconnect() {\n        if (this._reconnecting || this.skipReconnect)\n            return this;\n        const self = this;\n        if (this.backoff.attempts >= this._reconnectionAttempts) {\n            debug(\"reconnect failed\");\n            this.backoff.reset();\n            super.emit(\"reconnect_failed\");\n            this._reconnecting = false;\n        }\n        else {\n            const delay = this.backoff.duration();\n            debug(\"will wait %dms before reconnect attempt\", delay);\n            this._reconnecting = true;\n            const timer = setTimeout(() => {\n                if (self.skipReconnect)\n                    return;\n                debug(\"attempting reconnect\");\n                super.emit(\"reconnect_attempt\", self.backoff.attempts);\n                // check again for the case socket closed in above events\n                if (self.skipReconnect)\n                    return;\n                self.open((err) => {\n                    if (err) {\n                        debug(\"reconnect attempt error\");\n                        self._reconnecting = false;\n                        self.reconnect();\n                        super.emit(\"reconnect_error\", err);\n                    }\n                    else {\n                        debug(\"reconnect success\");\n                        self.onreconnect();\n                    }\n                });\n            }, delay);\n            this.subs.push({\n                destroy: function () {\n                    clearTimeout(timer);\n                },\n            });\n        }\n    }\n    /**\n     * Called upon successful reconnect.\n     *\n     * @private\n     */\n    onreconnect() {\n        const attempt = this.backoff.attempts;\n        this._reconnecting = false;\n        this.backoff.reset();\n        super.emit(\"reconnect\", attempt);\n    }\n}\nexports.Manager = Manager;\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/socket.io-client-npm-3.0.4-d98ba3da09-73d21e1148.zip/node_modules/socket.io-client/build/manager.js?");

/***/ }),

/***/ "../../../.yarn/cache/socket.io-client-npm-3.0.4-d98ba3da09-73d21e1148.zip/node_modules/socket.io-client/build/on.js":
/*!***************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/socket.io-client-npm-3.0.4-d98ba3da09-73d21e1148.zip/node_modules/socket.io-client/build/on.js ***!
  \***************************************************************************************************************************/
/*! flagged exports */
/*! export __esModule [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export on [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.on = void 0;\nfunction on(obj, ev, fn) {\n    obj.on(ev, fn);\n    return {\n        destroy: function () {\n            obj.off(ev, fn);\n        },\n    };\n}\nexports.on = on;\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/socket.io-client-npm-3.0.4-d98ba3da09-73d21e1148.zip/node_modules/socket.io-client/build/on.js?");

/***/ }),

/***/ "../../../.yarn/cache/socket.io-client-npm-3.0.4-d98ba3da09-73d21e1148.zip/node_modules/socket.io-client/build/socket.js":
/*!*******************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/socket.io-client-npm-3.0.4-d98ba3da09-73d21e1148.zip/node_modules/socket.io-client/build/socket.js ***!
  \*******************************************************************************************************************************/
/*! flagged exports */
/*! export Socket [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export __esModule [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Socket = void 0;\nconst socket_io_parser_1 = __webpack_require__(/*! socket.io-parser */ \"../../../.yarn/cache/socket.io-parser-npm-4.0.1-f4a754ed88-8110522c24.zip/node_modules/socket.io-parser/dist/index.js\");\nconst Emitter = __webpack_require__(/*! component-emitter */ \"../../../.yarn/cache/component-emitter-npm-1.3.0-4b848565b9-fc4edbf101.zip/node_modules/component-emitter/index.js\");\nconst on_1 = __webpack_require__(/*! ./on */ \"../../../.yarn/cache/socket.io-client-npm-3.0.4-d98ba3da09-73d21e1148.zip/node_modules/socket.io-client/build/on.js\");\nconst bind = __webpack_require__(/*! component-bind */ \"../../../.yarn/cache/component-bind-npm-1.0.0-c4b6dae2b7-afbea09480.zip/node_modules/component-bind/index.js\");\nconst debug = __webpack_require__(/*! debug */ \"../../../.yarn/$$virtual/debug-virtual-fe619ebf1d/0/cache/debug-npm-4.1.1-540248b3aa-3601a6ce96.zip/node_modules/debug/src/browser.js\")(\"socket.io-client:socket\");\n/**\n * Internal events.\n * These events can't be emitted by the user.\n */\nconst RESERVED_EVENTS = Object.freeze({\n    connect: 1,\n    connect_error: 1,\n    disconnect: 1,\n    disconnecting: 1,\n    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener\n    newListener: 1,\n    removeListener: 1,\n});\nclass Socket extends Emitter {\n    /**\n     * `Socket` constructor.\n     *\n     * @public\n     */\n    constructor(io, nsp, opts) {\n        super();\n        this.ids = 0;\n        this.acks = {};\n        this.receiveBuffer = [];\n        this.sendBuffer = [];\n        this.flags = {};\n        this.io = io;\n        this.nsp = nsp;\n        this.ids = 0;\n        this.acks = {};\n        this.receiveBuffer = [];\n        this.sendBuffer = [];\n        this.connected = false;\n        this.disconnected = true;\n        this.flags = {};\n        if (opts && opts.auth) {\n            this.auth = opts.auth;\n        }\n        if (this.io._autoConnect)\n            this.open();\n    }\n    /**\n     * Subscribe to open, close and packet events\n     *\n     * @private\n     */\n    subEvents() {\n        if (this.subs)\n            return;\n        const io = this.io;\n        this.subs = [\n            on_1.on(io, \"open\", bind(this, \"onopen\")),\n            on_1.on(io, \"packet\", bind(this, \"onpacket\")),\n            on_1.on(io, \"close\", bind(this, \"onclose\")),\n        ];\n    }\n    /**\n     * Whether the Socket will try to reconnect when its Manager connects or reconnects\n     */\n    get active() {\n        return !!this.subs;\n    }\n    /**\n     * \"Opens\" the socket.\n     *\n     * @public\n     */\n    connect() {\n        if (this.connected)\n            return this;\n        this.subEvents();\n        if (!this.io[\"_reconnecting\"])\n            this.io.open(); // ensure open\n        if (\"open\" === this.io._readyState)\n            this.onopen();\n        return this;\n    }\n    /**\n     * Alias for connect()\n     */\n    open() {\n        return this.connect();\n    }\n    /**\n     * Sends a `message` event.\n     *\n     * @return self\n     * @public\n     */\n    send(...args) {\n        args.unshift(\"message\");\n        this.emit.apply(this, args);\n        return this;\n    }\n    /**\n     * Override `emit`.\n     * If the event is in `events`, it's emitted normally.\n     *\n     * @param ev - event name\n     * @return self\n     * @public\n     */\n    emit(ev, ...args) {\n        if (RESERVED_EVENTS.hasOwnProperty(ev)) {\n            throw new Error('\"' + ev + '\" is a reserved event name');\n        }\n        args.unshift(ev);\n        const packet = {\n            type: socket_io_parser_1.PacketType.EVENT,\n            data: args,\n        };\n        packet.options = {};\n        packet.options.compress = this.flags.compress !== false;\n        // event ack callback\n        if (\"function\" === typeof args[args.length - 1]) {\n            debug(\"emitting packet with ack id %d\", this.ids);\n            this.acks[this.ids] = args.pop();\n            packet.id = this.ids++;\n        }\n        const isTransportWritable = this.io.engine &&\n            this.io.engine.transport &&\n            this.io.engine.transport.writable;\n        const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);\n        if (discardPacket) {\n            debug(\"discard packet as the transport is not currently writable\");\n        }\n        else if (this.connected) {\n            this.packet(packet);\n        }\n        else {\n            this.sendBuffer.push(packet);\n        }\n        this.flags = {};\n        return this;\n    }\n    /**\n     * Sends a packet.\n     *\n     * @param packet\n     * @private\n     */\n    packet(packet) {\n        packet.nsp = this.nsp;\n        this.io._packet(packet);\n    }\n    /**\n     * Called upon engine `open`.\n     *\n     * @private\n     */\n    onopen() {\n        debug(\"transport is open - connecting\");\n        if (typeof this.auth == \"function\") {\n            this.auth((data) => {\n                this.packet({ type: socket_io_parser_1.PacketType.CONNECT, data });\n            });\n        }\n        else {\n            this.packet({ type: socket_io_parser_1.PacketType.CONNECT, data: this.auth });\n        }\n    }\n    /**\n     * Called upon engine `close`.\n     *\n     * @param reason\n     * @private\n     */\n    onclose(reason) {\n        debug(\"close (%s)\", reason);\n        this.connected = false;\n        this.disconnected = true;\n        delete this.id;\n        super.emit(\"disconnect\", reason);\n    }\n    /**\n     * Called with socket packet.\n     *\n     * @param packet\n     * @private\n     */\n    onpacket(packet) {\n        const sameNamespace = packet.nsp === this.nsp;\n        if (!sameNamespace)\n            return;\n        switch (packet.type) {\n            case socket_io_parser_1.PacketType.CONNECT:\n                if (packet.data && packet.data.sid) {\n                    const id = packet.data.sid;\n                    this.onconnect(id);\n                }\n                else {\n                    super.emit(\"connect_error\", new Error(\"It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)\"));\n                }\n                break;\n            case socket_io_parser_1.PacketType.EVENT:\n                this.onevent(packet);\n                break;\n            case socket_io_parser_1.PacketType.BINARY_EVENT:\n                this.onevent(packet);\n                break;\n            case socket_io_parser_1.PacketType.ACK:\n                this.onack(packet);\n                break;\n            case socket_io_parser_1.PacketType.BINARY_ACK:\n                this.onack(packet);\n                break;\n            case socket_io_parser_1.PacketType.DISCONNECT:\n                this.ondisconnect();\n                break;\n            case socket_io_parser_1.PacketType.CONNECT_ERROR:\n                const err = new Error(packet.data.message);\n                // @ts-ignore\n                err.data = packet.data.data;\n                super.emit(\"connect_error\", err);\n                break;\n        }\n    }\n    /**\n     * Called upon a server event.\n     *\n     * @param packet\n     * @private\n     */\n    onevent(packet) {\n        const args = packet.data || [];\n        debug(\"emitting event %j\", args);\n        if (null != packet.id) {\n            debug(\"attaching ack callback to event\");\n            args.push(this.ack(packet.id));\n        }\n        if (this.connected) {\n            this.emitEvent(args);\n        }\n        else {\n            this.receiveBuffer.push(Object.freeze(args));\n        }\n    }\n    emitEvent(args) {\n        if (this._anyListeners && this._anyListeners.length) {\n            const listeners = this._anyListeners.slice();\n            for (const listener of listeners) {\n                listener.apply(this, args);\n            }\n        }\n        super.emit.apply(this, args);\n    }\n    /**\n     * Produces an ack callback to emit with an event.\n     *\n     * @private\n     */\n    ack(id) {\n        const self = this;\n        let sent = false;\n        return function (...args) {\n            // prevent double callbacks\n            if (sent)\n                return;\n            sent = true;\n            debug(\"sending ack %j\", args);\n            self.packet({\n                type: socket_io_parser_1.PacketType.ACK,\n                id: id,\n                data: args,\n            });\n        };\n    }\n    /**\n     * Called upon a server acknowlegement.\n     *\n     * @param packet\n     * @private\n     */\n    onack(packet) {\n        const ack = this.acks[packet.id];\n        if (\"function\" === typeof ack) {\n            debug(\"calling ack %s with %j\", packet.id, packet.data);\n            ack.apply(this, packet.data);\n            delete this.acks[packet.id];\n        }\n        else {\n            debug(\"bad ack %s\", packet.id);\n        }\n    }\n    /**\n     * Called upon server connect.\n     *\n     * @private\n     */\n    onconnect(id) {\n        debug(\"socket connected with id %s\", id);\n        this.id = id;\n        this.connected = true;\n        this.disconnected = false;\n        super.emit(\"connect\");\n        this.emitBuffered();\n    }\n    /**\n     * Emit buffered events (received and emitted).\n     *\n     * @private\n     */\n    emitBuffered() {\n        this.receiveBuffer.forEach((args) => this.emitEvent(args));\n        this.receiveBuffer = [];\n        this.sendBuffer.forEach((packet) => this.packet(packet));\n        this.sendBuffer = [];\n    }\n    /**\n     * Called upon server disconnect.\n     *\n     * @private\n     */\n    ondisconnect() {\n        debug(\"server disconnect (%s)\", this.nsp);\n        this.destroy();\n        this.onclose(\"io server disconnect\");\n    }\n    /**\n     * Called upon forced client/server side disconnections,\n     * this method ensures the manager stops tracking us and\n     * that reconnections don't get triggered for this.\n     *\n     * @private\n     */\n    destroy() {\n        if (this.subs) {\n            // clean subscriptions to avoid reconnections\n            for (let i = 0; i < this.subs.length; i++) {\n                this.subs[i].destroy();\n            }\n            this.subs = null;\n        }\n        this.io[\"_destroy\"](this);\n    }\n    /**\n     * Disconnects the socket manually.\n     *\n     * @return self\n     * @public\n     */\n    disconnect() {\n        if (this.connected) {\n            debug(\"performing disconnect (%s)\", this.nsp);\n            this.packet({ type: socket_io_parser_1.PacketType.DISCONNECT });\n        }\n        // remove socket from pool\n        this.destroy();\n        if (this.connected) {\n            // fire events\n            this.onclose(\"io client disconnect\");\n        }\n        return this;\n    }\n    /**\n     * Alias for disconnect()\n     *\n     * @return self\n     * @public\n     */\n    close() {\n        return this.disconnect();\n    }\n    /**\n     * Sets the compress flag.\n     *\n     * @param compress - if `true`, compresses the sending data\n     * @return self\n     * @public\n     */\n    compress(compress) {\n        this.flags.compress = compress;\n        return this;\n    }\n    /**\n     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not\n     * ready to send messages.\n     *\n     * @returns self\n     * @public\n     */\n    get volatile() {\n        this.flags.volatile = true;\n        return this;\n    }\n    /**\n     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the\n     * callback.\n     *\n     * @param listener\n     * @public\n     */\n    onAny(listener) {\n        this._anyListeners = this._anyListeners || [];\n        this._anyListeners.push(listener);\n        return this;\n    }\n    /**\n     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the\n     * callback. The listener is added to the beginning of the listeners array.\n     *\n     * @param listener\n     * @public\n     */\n    prependAny(listener) {\n        this._anyListeners = this._anyListeners || [];\n        this._anyListeners.unshift(listener);\n        return this;\n    }\n    /**\n     * Removes the listener that will be fired when any event is emitted.\n     *\n     * @param listener\n     * @public\n     */\n    offAny(listener) {\n        if (!this._anyListeners) {\n            return this;\n        }\n        if (listener) {\n            const listeners = this._anyListeners;\n            for (let i = 0; i < listeners.length; i++) {\n                if (listener === listeners[i]) {\n                    listeners.splice(i, 1);\n                    return this;\n                }\n            }\n        }\n        else {\n            this._anyListeners = [];\n        }\n        return this;\n    }\n    /**\n     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,\n     * e.g. to remove listeners.\n     *\n     * @public\n     */\n    listenersAny() {\n        return this._anyListeners || [];\n    }\n}\nexports.Socket = Socket;\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/socket.io-client-npm-3.0.4-d98ba3da09-73d21e1148.zip/node_modules/socket.io-client/build/socket.js?");

/***/ }),

/***/ "../../../.yarn/cache/socket.io-client-npm-3.0.4-d98ba3da09-73d21e1148.zip/node_modules/socket.io-client/build/url.js":
/*!****************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/socket.io-client-npm-3.0.4-d98ba3da09-73d21e1148.zip/node_modules/socket.io-client/build/url.js ***!
  \****************************************************************************************************************************/
/*! flagged exports */
/*! export __esModule [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export url [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.url = void 0;\nconst parseuri = __webpack_require__(/*! parseuri */ \"../../../.yarn/cache/parseuri-npm-0.0.6-0c11d6eb7b-ff7ad178b0.zip/node_modules/parseuri/index.js\");\nconst debug = __webpack_require__(/*! debug */ \"../../../.yarn/$$virtual/debug-virtual-fe619ebf1d/0/cache/debug-npm-4.1.1-540248b3aa-3601a6ce96.zip/node_modules/debug/src/browser.js\")(\"socket.io-client:url\");\n/**\n * URL parser.\n *\n * @param uri - url\n * @param loc - An object meant to mimic window.location.\n *        Defaults to window.location.\n * @public\n */\nfunction url(uri, loc) {\n    let obj = uri;\n    // default to window.location\n    loc = loc || (typeof location !== \"undefined\" && location);\n    if (null == uri)\n        uri = loc.protocol + \"//\" + loc.host;\n    // relative path support\n    if (typeof uri === \"string\") {\n        if (\"/\" === uri.charAt(0)) {\n            if (\"/\" === uri.charAt(1)) {\n                uri = loc.protocol + uri;\n            }\n            else {\n                uri = loc.host + uri;\n            }\n        }\n        if (!/^(https?|wss?):\\/\\//.test(uri)) {\n            debug(\"protocol-less url %s\", uri);\n            if (\"undefined\" !== typeof loc) {\n                uri = loc.protocol + \"//\" + uri;\n            }\n            else {\n                uri = \"https://\" + uri;\n            }\n        }\n        // parse\n        debug(\"parse %s\", uri);\n        obj = parseuri(uri);\n    }\n    // make sure we treat `localhost:80` and `localhost` equally\n    if (!obj.port) {\n        if (/^(http|ws)$/.test(obj.protocol)) {\n            obj.port = \"80\";\n        }\n        else if (/^(http|ws)s$/.test(obj.protocol)) {\n            obj.port = \"443\";\n        }\n    }\n    obj.path = obj.path || \"/\";\n    const ipv6 = obj.host.indexOf(\":\") !== -1;\n    const host = ipv6 ? \"[\" + obj.host + \"]\" : obj.host;\n    // define unique id\n    obj.id = obj.protocol + \"://\" + host + \":\" + obj.port;\n    // define href\n    obj.href =\n        obj.protocol +\n            \"://\" +\n            host +\n            (loc && loc.port === obj.port ? \"\" : \":\" + obj.port);\n    return obj;\n}\nexports.url = url;\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/socket.io-client-npm-3.0.4-d98ba3da09-73d21e1148.zip/node_modules/socket.io-client/build/url.js?");

/***/ }),

/***/ "../../../.yarn/cache/socket.io-parser-npm-4.0.1-f4a754ed88-8110522c24.zip/node_modules/socket.io-parser/dist/binary.js":
/*!******************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/socket.io-parser-npm-4.0.1-f4a754ed88-8110522c24.zip/node_modules/socket.io-parser/dist/binary.js ***!
  \******************************************************************************************************************************/
/*! flagged exports */
/*! export __esModule [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export deconstructPacket [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export reconstructPacket [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.reconstructPacket = exports.deconstructPacket = void 0;\nconst is_binary_1 = __webpack_require__(/*! ./is-binary */ \"../../../.yarn/cache/socket.io-parser-npm-4.0.1-f4a754ed88-8110522c24.zip/node_modules/socket.io-parser/dist/is-binary.js\");\n/**\n * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.\n *\n * @param {Object} packet - socket.io event packet\n * @return {Object} with deconstructed packet and list of buffers\n * @public\n */\nfunction deconstructPacket(packet) {\n    const buffers = [];\n    const packetData = packet.data;\n    const pack = packet;\n    pack.data = _deconstructPacket(packetData, buffers);\n    pack.attachments = buffers.length; // number of binary 'attachments'\n    return { packet: pack, buffers: buffers };\n}\nexports.deconstructPacket = deconstructPacket;\nfunction _deconstructPacket(data, buffers) {\n    if (!data)\n        return data;\n    if (is_binary_1.isBinary(data)) {\n        const placeholder = { _placeholder: true, num: buffers.length };\n        buffers.push(data);\n        return placeholder;\n    }\n    else if (Array.isArray(data)) {\n        const newData = new Array(data.length);\n        for (let i = 0; i < data.length; i++) {\n            newData[i] = _deconstructPacket(data[i], buffers);\n        }\n        return newData;\n    }\n    else if (typeof data === \"object\" && !(data instanceof Date)) {\n        const newData = {};\n        for (const key in data) {\n            if (data.hasOwnProperty(key)) {\n                newData[key] = _deconstructPacket(data[key], buffers);\n            }\n        }\n        return newData;\n    }\n    return data;\n}\n/**\n * Reconstructs a binary packet from its placeholder packet and buffers\n *\n * @param {Object} packet - event packet with placeholders\n * @param {Array} buffers - binary buffers to put in placeholder positions\n * @return {Object} reconstructed packet\n * @public\n */\nfunction reconstructPacket(packet, buffers) {\n    packet.data = _reconstructPacket(packet.data, buffers);\n    packet.attachments = undefined; // no longer useful\n    return packet;\n}\nexports.reconstructPacket = reconstructPacket;\nfunction _reconstructPacket(data, buffers) {\n    if (!data)\n        return data;\n    if (data && data._placeholder) {\n        return buffers[data.num]; // appropriate buffer (should be natural order anyway)\n    }\n    else if (Array.isArray(data)) {\n        for (let i = 0; i < data.length; i++) {\n            data[i] = _reconstructPacket(data[i], buffers);\n        }\n    }\n    else if (typeof data === \"object\") {\n        for (const key in data) {\n            if (data.hasOwnProperty(key)) {\n                data[key] = _reconstructPacket(data[key], buffers);\n            }\n        }\n    }\n    return data;\n}\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/socket.io-parser-npm-4.0.1-f4a754ed88-8110522c24.zip/node_modules/socket.io-parser/dist/binary.js?");

/***/ }),

/***/ "../../../.yarn/cache/socket.io-parser-npm-4.0.1-f4a754ed88-8110522c24.zip/node_modules/socket.io-parser/dist/index.js":
/*!*****************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/socket.io-parser-npm-4.0.1-f4a754ed88-8110522c24.zip/node_modules/socket.io-parser/dist/index.js ***!
  \*****************************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Decoder = exports.Encoder = exports.PacketType = exports.protocol = void 0;\nconst Emitter = __webpack_require__(/*! component-emitter */ \"../../../.yarn/cache/component-emitter-npm-1.3.0-4b848565b9-fc4edbf101.zip/node_modules/component-emitter/index.js\");\nconst binary_1 = __webpack_require__(/*! ./binary */ \"../../../.yarn/cache/socket.io-parser-npm-4.0.1-f4a754ed88-8110522c24.zip/node_modules/socket.io-parser/dist/binary.js\");\nconst is_binary_1 = __webpack_require__(/*! ./is-binary */ \"../../../.yarn/cache/socket.io-parser-npm-4.0.1-f4a754ed88-8110522c24.zip/node_modules/socket.io-parser/dist/is-binary.js\");\nconst debug = __webpack_require__(/*! debug */ \"../../../.yarn/$$virtual/debug-virtual-fe619ebf1d/0/cache/debug-npm-4.1.1-540248b3aa-3601a6ce96.zip/node_modules/debug/src/browser.js\")(\"socket.io-parser\");\n/**\n * Protocol version.\n *\n * @public\n */\nexports.protocol = 5;\nvar PacketType;\n(function (PacketType) {\n    PacketType[PacketType[\"CONNECT\"] = 0] = \"CONNECT\";\n    PacketType[PacketType[\"DISCONNECT\"] = 1] = \"DISCONNECT\";\n    PacketType[PacketType[\"EVENT\"] = 2] = \"EVENT\";\n    PacketType[PacketType[\"ACK\"] = 3] = \"ACK\";\n    PacketType[PacketType[\"CONNECT_ERROR\"] = 4] = \"CONNECT_ERROR\";\n    PacketType[PacketType[\"BINARY_EVENT\"] = 5] = \"BINARY_EVENT\";\n    PacketType[PacketType[\"BINARY_ACK\"] = 6] = \"BINARY_ACK\";\n})(PacketType = exports.PacketType || (exports.PacketType = {}));\n/**\n * A socket.io Encoder instance\n */\nclass Encoder {\n    /**\n     * Encode a packet as a single string if non-binary, or as a\n     * buffer sequence, depending on packet type.\n     *\n     * @param {Object} obj - packet object\n     */\n    encode(obj) {\n        debug(\"encoding packet %j\", obj);\n        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {\n            if (is_binary_1.hasBinary(obj)) {\n                obj.type =\n                    obj.type === PacketType.EVENT\n                        ? PacketType.BINARY_EVENT\n                        : PacketType.BINARY_ACK;\n                return this.encodeAsBinary(obj);\n            }\n        }\n        return [this.encodeAsString(obj)];\n    }\n    /**\n     * Encode packet as string.\n     */\n    encodeAsString(obj) {\n        // first is type\n        let str = \"\" + obj.type;\n        // attachments if we have them\n        if (obj.type === PacketType.BINARY_EVENT ||\n            obj.type === PacketType.BINARY_ACK) {\n            str += obj.attachments + \"-\";\n        }\n        // if we have a namespace other than `/`\n        // we append it followed by a comma `,`\n        if (obj.nsp && \"/\" !== obj.nsp) {\n            str += obj.nsp + \",\";\n        }\n        // immediately followed by the id\n        if (null != obj.id) {\n            str += obj.id;\n        }\n        // json data\n        if (null != obj.data) {\n            str += JSON.stringify(obj.data);\n        }\n        debug(\"encoded %j as %s\", obj, str);\n        return str;\n    }\n    /**\n     * Encode packet as 'buffer sequence' by removing blobs, and\n     * deconstructing packet into object with placeholders and\n     * a list of buffers.\n     */\n    encodeAsBinary(obj) {\n        const deconstruction = binary_1.deconstructPacket(obj);\n        const pack = this.encodeAsString(deconstruction.packet);\n        const buffers = deconstruction.buffers;\n        buffers.unshift(pack); // add packet info to beginning of data list\n        return buffers; // write all the buffers\n    }\n}\nexports.Encoder = Encoder;\n/**\n * A socket.io Decoder instance\n *\n * @return {Object} decoder\n */\nclass Decoder extends Emitter {\n    constructor() {\n        super();\n    }\n    /**\n     * Decodes an encoded packet string into packet JSON.\n     *\n     * @param {String} obj - encoded packet\n     */\n    add(obj) {\n        let packet;\n        if (typeof obj === \"string\") {\n            packet = this.decodeString(obj);\n            if (packet.type === PacketType.BINARY_EVENT ||\n                packet.type === PacketType.BINARY_ACK) {\n                // binary packet's json\n                this.reconstructor = new BinaryReconstructor(packet);\n                // no attachments, labeled binary but no binary data to follow\n                if (packet.attachments === 0) {\n                    super.emit(\"decoded\", packet);\n                }\n            }\n            else {\n                // non-binary full packet\n                super.emit(\"decoded\", packet);\n            }\n        }\n        else if (is_binary_1.isBinary(obj) || obj.base64) {\n            // raw binary data\n            if (!this.reconstructor) {\n                throw new Error(\"got binary data when not reconstructing a packet\");\n            }\n            else {\n                packet = this.reconstructor.takeBinaryData(obj);\n                if (packet) {\n                    // received final buffer\n                    this.reconstructor = null;\n                    super.emit(\"decoded\", packet);\n                }\n            }\n        }\n        else {\n            throw new Error(\"Unknown type: \" + obj);\n        }\n    }\n    /**\n     * Decode a packet String (JSON data)\n     *\n     * @param {String} str\n     * @return {Object} packet\n     */\n    decodeString(str) {\n        let i = 0;\n        // look up type\n        const p = {\n            type: Number(str.charAt(0)),\n        };\n        if (PacketType[p.type] === undefined) {\n            throw new Error(\"unknown packet type \" + p.type);\n        }\n        // look up attachments if type binary\n        if (p.type === PacketType.BINARY_EVENT ||\n            p.type === PacketType.BINARY_ACK) {\n            const start = i + 1;\n            while (str.charAt(++i) !== \"-\" && i != str.length) { }\n            const buf = str.substring(start, i);\n            if (buf != Number(buf) || str.charAt(i) !== \"-\") {\n                throw new Error(\"Illegal attachments\");\n            }\n            p.attachments = Number(buf);\n        }\n        // look up namespace (if any)\n        if (\"/\" === str.charAt(i + 1)) {\n            const start = i + 1;\n            while (++i) {\n                const c = str.charAt(i);\n                if (\",\" === c)\n                    break;\n                if (i === str.length)\n                    break;\n            }\n            p.nsp = str.substring(start, i);\n        }\n        else {\n            p.nsp = \"/\";\n        }\n        // look up id\n        const next = str.charAt(i + 1);\n        if (\"\" !== next && Number(next) == next) {\n            const start = i + 1;\n            while (++i) {\n                const c = str.charAt(i);\n                if (null == c || Number(c) != c) {\n                    --i;\n                    break;\n                }\n                if (i === str.length)\n                    break;\n            }\n            p.id = Number(str.substring(start, i + 1));\n        }\n        // look up json data\n        if (str.charAt(++i)) {\n            const payload = tryParse(str.substr(i));\n            if (Decoder.isPayloadValid(p.type, payload)) {\n                p.data = payload;\n            }\n            else {\n                throw new Error(\"invalid payload\");\n            }\n        }\n        debug(\"decoded %s as %j\", str, p);\n        return p;\n    }\n    static isPayloadValid(type, payload) {\n        switch (type) {\n            case PacketType.CONNECT:\n                return typeof payload === \"object\";\n            case PacketType.DISCONNECT:\n                return payload === undefined;\n            case PacketType.CONNECT_ERROR:\n                return typeof payload === \"string\" || typeof payload === \"object\";\n            case PacketType.EVENT:\n            case PacketType.BINARY_EVENT:\n                return Array.isArray(payload) && typeof payload[0] === \"string\";\n            case PacketType.ACK:\n            case PacketType.BINARY_ACK:\n                return Array.isArray(payload);\n        }\n    }\n    /**\n     * Deallocates a parser's resources\n     */\n    destroy() {\n        if (this.reconstructor) {\n            this.reconstructor.finishedReconstruction();\n        }\n    }\n}\nexports.Decoder = Decoder;\nfunction tryParse(str) {\n    try {\n        return JSON.parse(str);\n    }\n    catch (e) {\n        return false;\n    }\n}\n/**\n * A manager of a binary event's 'buffer sequence'. Should\n * be constructed whenever a packet of type BINARY_EVENT is\n * decoded.\n *\n * @param {Object} packet\n * @return {BinaryReconstructor} initialized reconstructor\n */\nclass BinaryReconstructor {\n    constructor(packet) {\n        this.packet = packet;\n        this.buffers = [];\n        this.reconPack = packet;\n    }\n    /**\n     * Method to be called when binary data received from connection\n     * after a BINARY_EVENT packet.\n     *\n     * @param {Buffer | ArrayBuffer} binData - the raw binary data received\n     * @return {null | Object} returns null if more binary data is expected or\n     *   a reconstructed packet object if all buffers have been received.\n     */\n    takeBinaryData(binData) {\n        this.buffers.push(binData);\n        if (this.buffers.length === this.reconPack.attachments) {\n            // done with buffer list\n            const packet = binary_1.reconstructPacket(this.reconPack, this.buffers);\n            this.finishedReconstruction();\n            return packet;\n        }\n        return null;\n    }\n    /**\n     * Cleans up binary packet reconstruction variables.\n     */\n    finishedReconstruction() {\n        this.reconPack = null;\n        this.buffers = [];\n    }\n}\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/socket.io-parser-npm-4.0.1-f4a754ed88-8110522c24.zip/node_modules/socket.io-parser/dist/index.js?");

/***/ }),

/***/ "../../../.yarn/cache/socket.io-parser-npm-4.0.1-f4a754ed88-8110522c24.zip/node_modules/socket.io-parser/dist/is-binary.js":
/*!*********************************************************************************************************************************!*\
  !*** ../../../.yarn/cache/socket.io-parser-npm-4.0.1-f4a754ed88-8110522c24.zip/node_modules/socket.io-parser/dist/is-binary.js ***!
  \*********************************************************************************************************************************/
/*! flagged exports */
/*! export __esModule [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export hasBinary [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export isBinary [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.hasBinary = exports.isBinary = void 0;\nconst withNativeArrayBuffer = typeof ArrayBuffer === \"function\";\nconst isView = (obj) => {\n    return typeof ArrayBuffer.isView === \"function\"\n        ? ArrayBuffer.isView(obj)\n        : obj.buffer instanceof ArrayBuffer;\n};\nconst toString = Object.prototype.toString;\nconst withNativeBlob = typeof Blob === \"function\" ||\n    (typeof Blob !== \"undefined\" &&\n        toString.call(Blob) === \"[object BlobConstructor]\");\nconst withNativeFile = typeof File === \"function\" ||\n    (typeof File !== \"undefined\" &&\n        toString.call(File) === \"[object FileConstructor]\");\n/**\n * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.\n *\n * @private\n */\nfunction isBinary(obj) {\n    return ((withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj))) ||\n        (withNativeBlob && obj instanceof Blob) ||\n        (withNativeFile && obj instanceof File));\n}\nexports.isBinary = isBinary;\nfunction hasBinary(obj, toJSON) {\n    if (!obj || typeof obj !== \"object\") {\n        return false;\n    }\n    if (Array.isArray(obj)) {\n        for (let i = 0, l = obj.length; i < l; i++) {\n            if (hasBinary(obj[i])) {\n                return true;\n            }\n        }\n        return false;\n    }\n    if (isBinary(obj)) {\n        return true;\n    }\n    if (obj.toJSON &&\n        typeof obj.toJSON === \"function\" &&\n        arguments.length === 1) {\n        return hasBinary(obj.toJSON(), true);\n    }\n    for (const key in obj) {\n        if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {\n            return true;\n        }\n    }\n    return false;\n}\nexports.hasBinary = hasBinary;\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/socket.io-parser-npm-4.0.1-f4a754ed88-8110522c24.zip/node_modules/socket.io-parser/dist/is-binary.js?");

/***/ }),

/***/ "../../../.yarn/cache/yeast-npm-0.1.2-19a347595d-ce326a71c7.zip/node_modules/yeast/index.js":
/*!**************************************************************************************************!*\
  !*** ../../../.yarn/cache/yeast-npm-0.1.2-19a347595d-ce326a71c7.zip/node_modules/yeast/index.js ***!
  \**************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("\n\nvar alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')\n  , length = 64\n  , map = {}\n  , seed = 0\n  , i = 0\n  , prev;\n\n/**\n * Return a string representing the specified number.\n *\n * @param {Number} num The number to convert.\n * @returns {String} The string representation of the number.\n * @api public\n */\nfunction encode(num) {\n  var encoded = '';\n\n  do {\n    encoded = alphabet[num % length] + encoded;\n    num = Math.floor(num / length);\n  } while (num > 0);\n\n  return encoded;\n}\n\n/**\n * Return the integer value specified by the given string.\n *\n * @param {String} str The string to convert.\n * @returns {Number} The integer value represented by the string.\n * @api public\n */\nfunction decode(str) {\n  var decoded = 0;\n\n  for (i = 0; i < str.length; i++) {\n    decoded = decoded * length + map[str.charAt(i)];\n  }\n\n  return decoded;\n}\n\n/**\n * Yeast: A tiny growing id generator.\n *\n * @returns {String} A unique id.\n * @api public\n */\nfunction yeast() {\n  var now = encode(+new Date());\n\n  if (now !== prev) return seed = 0, prev = now;\n  return now +'.'+ encode(seed++);\n}\n\n//\n// Map each character to its index.\n//\nfor (; i < length; i++) map[alphabet[i]] = i;\n\n//\n// Expose the `yeast`, `encode` and `decode` functions.\n//\nyeast.encode = encode;\nyeast.decode = decode;\nmodule.exports = yeast;\n\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/cache/yeast-npm-0.1.2-19a347595d-ce326a71c7.zip/node_modules/yeast/index.js?");

/***/ }),

/***/ "../../../.yarn/unplugged/ansicolor-npm-1.1.93-df37dda1e2/node_modules/ansicolor/build/ansicolor.js":
/*!**********************************************************************************************************!*\
  !*** ../../../.yarn/unplugged/ansicolor-npm-1.1.93-df37dda1e2/node_modules/ansicolor/build/ansicolor.js ***!
  \**********************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("\n\n/*  ------------------------------------------------------------------------ */\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar O = Object;\n\n/*  See https://misc.flogisoft.com/bash/tip_colors_and_formatting\n    ------------------------------------------------------------------------ */\n\nvar colorCodes = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'lightGray', '', 'default'],\n    colorCodesLight = ['darkGray', 'lightRed', 'lightGreen', 'lightYellow', 'lightBlue', 'lightMagenta', 'lightCyan', 'white', ''],\n    styleCodes = ['', 'bright', 'dim', 'italic', 'underline', '', '', 'inverse'],\n    asBright = { 'red': 'lightRed',\n    'green': 'lightGreen',\n    'yellow': 'lightYellow',\n    'blue': 'lightBlue',\n    'magenta': 'lightMagenta',\n    'cyan': 'lightCyan',\n    'black': 'darkGray',\n    'lightGray': 'white' },\n    types = { 0: 'style',\n    2: 'unstyle',\n    3: 'color',\n    9: 'colorLight',\n    4: 'bgColor',\n    10: 'bgColorLight' },\n    subtypes = { color: colorCodes,\n    colorLight: colorCodesLight,\n    bgColor: colorCodes,\n    bgColorLight: colorCodesLight,\n    style: styleCodes,\n    unstyle: styleCodes\n\n    /*  ------------------------------------------------------------------------ */\n\n};var clean = function clean(obj) {\n    for (var k in obj) {\n        if (!obj[k]) {\n            delete obj[k];\n        }\n    }\n    return O.keys(obj).length === 0 ? undefined : obj;\n};\n\n/*  ------------------------------------------------------------------------ */\n\nvar Color = function () {\n    function Color(background, name, brightness) {\n        _classCallCheck(this, Color);\n\n        this.background = background;\n        this.name = name;\n        this.brightness = brightness;\n    }\n\n    _createClass(Color, [{\n        key: 'defaultBrightness',\n        value: function defaultBrightness(value) {\n\n            return new Color(this.background, this.name, this.brightness || value);\n        }\n    }, {\n        key: 'css',\n        value: function css(inverted) {\n\n            var color = inverted ? this.inverse : this;\n\n            var rgbName = color.brightness === Code.bright && asBright[color.name] || color.name;\n\n            var prop = color.background ? 'background:' : 'color:',\n                rgb = Colors.rgb[rgbName],\n                alpha = this.brightness === Code.dim ? 0.5 : 1;\n\n            return rgb ? prop + 'rgba(' + [].concat(_toConsumableArray(rgb), [alpha]).join(',') + ');' : !color.background && alpha < 1 ? 'color:rgba(0,0,0,0.5);' : ''; // Chrome does not support 'opacity' property...\n        }\n    }, {\n        key: 'inverse',\n        get: function get() {\n            return new Color(!this.background, this.name || (this.background ? 'black' : 'white'), this.brightness);\n        }\n    }, {\n        key: 'clean',\n        get: function get() {\n            return clean({ name: this.name === 'default' ? '' : this.name,\n                bright: this.brightness === Code.bright,\n                dim: this.brightness === Code.dim });\n        }\n    }]);\n\n    return Color;\n}();\n\n/*  ------------------------------------------------------------------------ */\n\nvar Code = function () {\n    function Code(n) {\n        _classCallCheck(this, Code);\n\n        if (n !== undefined) {\n            this.value = Number(n);\n        }\n    }\n\n    _createClass(Code, [{\n        key: 'type',\n        get: function get() {\n            return types[Math.floor(this.value / 10)];\n        }\n    }, {\n        key: 'subtype',\n        get: function get() {\n            return subtypes[this.type][this.value % 10];\n        }\n    }, {\n        key: 'str',\n        get: function get() {\n            return this.value ? '\\x1B[' + this.value + 'm' : '';\n        }\n    }, {\n        key: 'isBrightness',\n        get: function get() {\n            return this.value === Code.noBrightness || this.value === Code.bright || this.value === Code.dim;\n        }\n    }], [{\n        key: 'str',\n        value: function str(x) {\n            return new Code(x).str;\n        }\n    }]);\n\n    return Code;\n}();\n\n/*  ------------------------------------------------------------------------ */\n\nO.assign(Code, {\n\n    reset: 0,\n    bright: 1,\n    dim: 2,\n    inverse: 7,\n    noBrightness: 22,\n    noItalic: 23,\n    noUnderline: 24,\n    noInverse: 27,\n    noColor: 39,\n    noBgColor: 49\n});\n\n/*  ------------------------------------------------------------------------ */\n\nvar replaceAll = function replaceAll(str, a, b) {\n    return str.split(a).join(b);\n};\n\n/*  ANSI brightness codes do not overlap, e.g. \"{bright}{dim}foo\" will be rendered bright (not dim).\n    So we fix it by adding brightness canceling before each brightness code, so the former example gets\n    converted to \"{noBrightness}{bright}{noBrightness}{dim}foo\" – this way it gets rendered as expected.\n */\n\nvar denormalizeBrightness = function denormalizeBrightness(s) {\n    return s.replace(/(\\u001b\\[(1|2)m)/g, '\\x1B[22m$1');\n};\nvar normalizeBrightness = function normalizeBrightness(s) {\n    return s.replace(/\\u001b\\[22m(\\u001b\\[(1|2)m)/g, '$1');\n};\n\nvar wrap = function wrap(x, openCode, closeCode) {\n\n    var open = Code.str(openCode),\n        close = Code.str(closeCode);\n\n    return String(x).split('\\n').map(function (line) {\n        return denormalizeBrightness(open + replaceAll(normalizeBrightness(line), close, open) + close);\n    }).join('\\n');\n};\n\n/*  ------------------------------------------------------------------------ */\n\nvar camel = function camel(a, b) {\n    return a + b.charAt(0).toUpperCase() + b.slice(1);\n};\n\nvar stringWrappingMethods = function () {\n    return [].concat(_toConsumableArray(colorCodes.map(function (k, i) {\n        return !k ? [] : [// color methods\n\n        [k, 30 + i, Code.noColor], [camel('bg', k), 40 + i, Code.noBgColor]];\n    })), _toConsumableArray(colorCodesLight.map(function (k, i) {\n        return !k ? [] : [// light color methods\n\n        [k, 90 + i, Code.noColor], [camel('bg', k), 100 + i, Code.noBgColor]];\n    })), _toConsumableArray(['', 'BrightRed', 'BrightGreen', 'BrightYellow', 'BrightBlue', 'BrightMagenta', 'BrightCyan'].map(function (k, i) {\n        return !k ? [] : [['bg' + k, 100 + i, Code.noBgColor]];\n    })), _toConsumableArray(styleCodes.map(function (k, i) {\n        return !k ? [] : [// style methods\n\n        [k, i, k === 'bright' || k === 'dim' ? Code.noBrightness : 20 + i]];\n    }))).reduce(function (a, b) {\n        return a.concat(b);\n    });\n}();\n\n/*  ------------------------------------------------------------------------ */\n\nvar assignStringWrappingAPI = function assignStringWrappingAPI(target) {\n    var wrapBefore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : target;\n    return stringWrappingMethods.reduce(function (memo, _ref) {\n        var _ref2 = _slicedToArray(_ref, 3),\n            k = _ref2[0],\n            open = _ref2[1],\n            close = _ref2[2];\n\n        return O.defineProperty(memo, k, {\n            get: function get() {\n                return assignStringWrappingAPI(function (str) {\n                    return wrapBefore(wrap(str, open, close));\n                });\n            }\n        });\n    }, target);\n};\n\n/*  ------------------------------------------------------------------------ */\n\nvar TEXT = 0,\n    BRACKET = 1,\n    CODE = 2;\n\nfunction rawParse(s) {\n\n    var state = TEXT,\n        buffer = '',\n        text = '',\n        code = '',\n        codes = [];\n    var spans = [];\n\n    for (var i = 0, n = s.length; i < n; i++) {\n\n        var c = s[i];\n\n        buffer += c;\n\n        switch (state) {\n\n            case TEXT:\n                if (c === '\\x1B') {\n                    state = BRACKET;buffer = c;\n                } else {\n                    text += c;\n                }\n                break;\n\n            case BRACKET:\n                if (c === '[') {\n                    state = CODE;code = '';codes = [];\n                } else {\n                    state = TEXT;text += buffer;\n                }\n                break;\n\n            case CODE:\n\n                if (c >= '0' && c <= '9') {\n                    code += c;\n                } else if (c === ';') {\n                    codes.push(new Code(code));code = '';\n                } else if (c === 'm' && code.length) {\n                    codes.push(new Code(code));\n                    var _iteratorNormalCompletion = true;\n                    var _didIteratorError = false;\n                    var _iteratorError = undefined;\n\n                    try {\n                        for (var _iterator = codes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n                            var _code = _step.value;\n                            spans.push({ text: text, code: _code });text = '';\n                        }\n                    } catch (err) {\n                        _didIteratorError = true;\n                        _iteratorError = err;\n                    } finally {\n                        try {\n                            if (!_iteratorNormalCompletion && _iterator.return) {\n                                _iterator.return();\n                            }\n                        } finally {\n                            if (_didIteratorError) {\n                                throw _iteratorError;\n                            }\n                        }\n                    }\n\n                    state = TEXT;\n                } else {\n                    state = TEXT;text += buffer;\n                }\n        }\n    }\n\n    if (state !== TEXT) text += buffer;\n\n    if (text) spans.push({ text: text, code: new Code() });\n\n    return spans;\n}\n\n/*  ------------------------------------------------------------------------ */\n\n/**\n * Represents an ANSI-escaped string.\n */\n\nvar Colors = function () {\n\n    /**\n     * @param {string} s a string containing ANSI escape codes.\n     */\n    function Colors(s) {\n        _classCallCheck(this, Colors);\n\n        this.spans = s ? rawParse(s) : [];\n    }\n\n    _createClass(Colors, [{\n        key: Symbol.iterator,\n\n\n        /**\n         * @example\n         * const spans = [...ansi.parse ('\\u001b[7m\\u001b[7mfoo\\u001b[7mbar\\u001b[27m')]\n         */\n        value: function value() {\n            return this.spans[Symbol.iterator]();\n        }\n\n        /**\n         * @desc This allows an alternative import style, see https://github.com/xpl/ansicolor/issues/7#issuecomment-578923578\n         * @example\n         * import { ansicolor, ParsedSpan } from 'ansicolor'\n         */\n\n    }, {\n        key: 'str',\n        get: function get() {\n            return this.spans.reduce(function (str, p) {\n                return str + p.text + p.code.str;\n            }, '');\n        }\n    }, {\n        key: 'parsed',\n        get: function get() {\n\n            var color = void 0,\n                bgColor = void 0,\n                brightness = void 0,\n                styles = void 0;\n\n            function reset() {\n\n                color = new Color(), bgColor = new Color(true /* background */), brightness = undefined, styles = new Set();\n            }\n\n            reset();\n\n            return O.assign(new Colors(), {\n\n                spans: this.spans.map(function (span) {\n\n                    var c = span.code;\n\n                    var inverted = styles.has('inverse'),\n                        underline = styles.has('underline') ? 'text-decoration: underline;' : '',\n                        italic = styles.has('italic') ? 'font-style: italic;' : '',\n                        bold = brightness === Code.bright ? 'font-weight: bold;' : '';\n\n                    var foreColor = color.defaultBrightness(brightness);\n\n                    var styledSpan = O.assign({ css: bold + italic + underline + foreColor.css(inverted) + bgColor.css(inverted) }, clean({ bold: !!bold, color: foreColor.clean, bgColor: bgColor.clean }), span);\n\n                    var _iteratorNormalCompletion2 = true;\n                    var _didIteratorError2 = false;\n                    var _iteratorError2 = undefined;\n\n                    try {\n                        for (var _iterator2 = styles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n                            var k = _step2.value;\n                            styledSpan[k] = true;\n                        }\n                    } catch (err) {\n                        _didIteratorError2 = true;\n                        _iteratorError2 = err;\n                    } finally {\n                        try {\n                            if (!_iteratorNormalCompletion2 && _iterator2.return) {\n                                _iterator2.return();\n                            }\n                        } finally {\n                            if (_didIteratorError2) {\n                                throw _iteratorError2;\n                            }\n                        }\n                    }\n\n                    if (c.isBrightness) {\n\n                        brightness = c.value;\n                    } else if (span.code.value !== undefined) {\n\n                        if (span.code.value === Code.reset) {\n                            reset();\n                        } else {\n\n                            switch (span.code.type) {\n\n                                case 'color':\n                                case 'colorLight':\n                                    color = new Color(false, c.subtype);break;\n\n                                case 'bgColor':\n                                case 'bgColorLight':\n                                    bgColor = new Color(true, c.subtype);break;\n\n                                case 'style':\n                                    styles.add(c.subtype);break;\n                                case 'unstyle':\n                                    styles.delete(c.subtype);break;\n                            }\n                        }\n                    }\n\n                    return styledSpan;\n                }).filter(function (s) {\n                    return s.text.length > 0;\n                })\n            });\n        }\n\n        /*  Outputs with Chrome DevTools-compatible format     */\n\n    }, {\n        key: 'asChromeConsoleLogArguments',\n        get: function get() {\n\n            var spans = this.parsed.spans;\n\n            return [spans.map(function (s) {\n                return '%c' + s.text;\n            }).join('')].concat(_toConsumableArray(spans.map(function (s) {\n                return s.css;\n            })));\n        }\n    }, {\n        key: 'browserConsoleArguments',\n        get: function get() /* LEGACY, DEPRECATED */{\n            return this.asChromeConsoleLogArguments;\n        }\n\n        /**\n         * @desc installs String prototype extensions\n         * @example\n         * require ('ansicolor').nice\n         * console.log ('foo'.bright.red)\n         */\n\n    }], [{\n        key: 'parse',\n\n\n        /**\n         * @desc parses a string containing ANSI escape codes\n         * @return {Colors} parsed representation.\n         */\n        value: function parse(s) {\n            return new Colors(s).parsed;\n        }\n\n        /**\n         * @desc strips ANSI codes from a string\n         * @param {string} s a string containing ANSI escape codes.\n         * @return {string} clean string.\n         */\n\n    }, {\n        key: 'strip',\n        value: function strip(s) {\n            return s.replace(/[\\u001b\\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g, ''); // hope V8 caches the regexp\n        }\n    }, {\n        key: 'nice',\n        get: function get() {\n\n            Colors.names.forEach(function (k) {\n                if (!(k in String.prototype)) {\n                    O.defineProperty(String.prototype, k, { get: function get() {\n                            return Colors[k](this);\n                        } });\n                }\n            });\n\n            return Colors;\n        }\n    }, {\n        key: 'ansicolor',\n        get: function get() {\n            return Colors;\n        }\n    }]);\n\n    return Colors;\n}();\n\n/*  ------------------------------------------------------------------------ */\n\nassignStringWrappingAPI(Colors, function (str) {\n    return str;\n});\n\n/*  ------------------------------------------------------------------------ */\n\nColors.names = stringWrappingMethods.map(function (_ref3) {\n    var _ref4 = _slicedToArray(_ref3, 1),\n        k = _ref4[0];\n\n    return k;\n});\n\n/*  ------------------------------------------------------------------------ */\n\nColors.rgb = {\n\n    black: [0, 0, 0],\n    darkGray: [100, 100, 100],\n    lightGray: [200, 200, 200],\n    white: [255, 255, 255],\n\n    red: [204, 0, 0],\n    lightRed: [255, 51, 0],\n\n    green: [0, 204, 0],\n    lightGreen: [51, 204, 51],\n\n    yellow: [204, 102, 0],\n    lightYellow: [255, 153, 51],\n\n    blue: [0, 0, 255],\n    lightBlue: [26, 140, 255],\n\n    magenta: [204, 0, 204],\n    lightMagenta: [255, 0, 255],\n\n    cyan: [0, 153, 255],\n    lightCyan: [0, 204, 255]\n\n    /*  ------------------------------------------------------------------------ */\n\n};module.exports = Colors;\n\n/*  ------------------------------------------------------------------------ */\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBZ0JULFVBQWMsQ0FBQyxDQUFELEVBQVEsQ0FBUixFQUFXLEdBQVgsQ0FoQkw7QUFpQlQsZUFBYyxDQUFDLEVBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxDQWpCTDs7QUFtQlQsYUFBYyxDQUFDLEdBQUQsRUFBUSxDQUFSLEVBQVcsR0FBWCxDQW5CTDtBQW9CVCxrQkFBYyxDQUFDLEdBQUQsRUFBUSxDQUFSLEVBQVcsR0FBWCxDQXBCTDs7QUFzQlQsVUFBYyxDQUFDLENBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxDQXRCTDtBQXVCVCxlQUFjLENBQUMsQ0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYOztBQUdsQjs7QUExQmEsQ0FBYixDQTRCQSxPQUFPLE9BQVAsR0FBaUIsTUFBakI7O0FBRUEiLCJmaWxlIjoiYW5zaWNvbG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgTyA9IE9iamVjdFxuXG4vKiAgU2VlIGh0dHBzOi8vbWlzYy5mbG9naXNvZnQuY29tL2Jhc2gvdGlwX2NvbG9yc19hbmRfZm9ybWF0dGluZ1xuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5jb25zdCBjb2xvckNvZGVzICAgICAgPSBbICAgJ2JsYWNrJywgICAgICAncmVkJywgICAgICAnZ3JlZW4nLCAgICAgICd5ZWxsb3cnLCAgICAgICdibHVlJywgICAgICAnbWFnZW50YScsICAgICAgJ2N5YW4nLCAnbGlnaHRHcmF5JywgJycsICdkZWZhdWx0J11cbiAgICAsIGNvbG9yQ29kZXNMaWdodCA9IFsnZGFya0dyYXknLCAnbGlnaHRSZWQnLCAnbGlnaHRHcmVlbicsICdsaWdodFllbGxvdycsICdsaWdodEJsdWUnLCAnbGlnaHRNYWdlbnRhJywgJ2xpZ2h0Q3lhbicsICd3aGl0ZScsICcnXVxuICAgIFxuICAgICwgc3R5bGVDb2RlcyA9IFsnJywgJ2JyaWdodCcsICdkaW0nLCAnaXRhbGljJywgJ3VuZGVybGluZScsICcnLCAnJywgJ2ludmVyc2UnXVxuXG4gICAgLCBhc0JyaWdodCA9IHsgJ3JlZCc6ICAgICAgICdsaWdodFJlZCcsXG4gICAgICAgICAgICAgICAgICAgJ2dyZWVuJzogICAgICdsaWdodEdyZWVuJyxcbiAgICAgICAgICAgICAgICAgICAneWVsbG93JzogICAgJ2xpZ2h0WWVsbG93JyxcbiAgICAgICAgICAgICAgICAgICAnYmx1ZSc6ICAgICAgJ2xpZ2h0Qmx1ZScsXG4gICAgICAgICAgICAgICAgICAgJ21hZ2VudGEnOiAgICdsaWdodE1hZ2VudGEnLFxuICAgICAgICAgICAgICAgICAgICdjeWFuJzogICAgICAnbGlnaHRDeWFuJyxcbiAgICAgICAgICAgICAgICAgICAnYmxhY2snOiAgICAgJ2RhcmtHcmF5JyxcbiAgICAgICAgICAgICAgICAgICAnbGlnaHRHcmF5JzogJ3doaXRlJyB9XG4gICAgXG4gICAgLCB0eXBlcyA9IHsgMDogICdzdHlsZScsXG4gICAgICAgICAgICAgICAgMjogICd1bnN0eWxlJyxcbiAgICAgICAgICAgICAgICAzOiAgJ2NvbG9yJyxcbiAgICAgICAgICAgICAgICA5OiAgJ2NvbG9yTGlnaHQnLFxuICAgICAgICAgICAgICAgIDQ6ICAnYmdDb2xvcicsXG4gICAgICAgICAgICAgICAgMTA6ICdiZ0NvbG9yTGlnaHQnIH1cblxuICAgICwgc3VidHlwZXMgPSB7ICBjb2xvcjogICAgICAgICBjb2xvckNvZGVzLFxuICAgICAgICAgICAgICAgICAgICBjb2xvckxpZ2h0OiAgICBjb2xvckNvZGVzTGlnaHQsXG4gICAgICAgICAgICAgICAgICAgIGJnQ29sb3I6ICAgICAgIGNvbG9yQ29kZXMsXG4gICAgICAgICAgICAgICAgICAgIGJnQ29sb3JMaWdodDogIGNvbG9yQ29kZXNMaWdodCxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICAgICAgICAgc3R5bGVDb2RlcyxcbiAgICAgICAgICAgICAgICAgICAgdW5zdHlsZTogICAgICAgc3R5bGVDb2RlcyAgICB9XG5cbi8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgY2xlYW4gPSBvYmogPT4ge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgayBpbiBvYmopIHsgaWYgKCFvYmpba10pIHsgZGVsZXRlIG9ialtrXSB9IH1cbiAgICAgICAgICAgICAgICByZXR1cm4gKE8ua2V5cyAob2JqKS5sZW5ndGggPT09IDApID8gdW5kZWZpbmVkIDogb2JqXG4gICAgICAgICAgICB9XG5cbi8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY2xhc3MgQ29sb3Ige1xuXG4gICAgY29uc3RydWN0b3IgKGJhY2tncm91bmQsIG5hbWUsIGJyaWdodG5lc3MpIHtcblxuICAgICAgICB0aGlzLmJhY2tncm91bmQgPSBiYWNrZ3JvdW5kXG4gICAgICAgIHRoaXMubmFtZSAgICAgICA9IG5hbWVcbiAgICAgICAgdGhpcy5icmlnaHRuZXNzID0gYnJpZ2h0bmVzc1xuICAgIH1cblxuICAgIGdldCBpbnZlcnNlICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb2xvciAoIXRoaXMuYmFja2dyb3VuZCwgdGhpcy5uYW1lIHx8ICh0aGlzLmJhY2tncm91bmQgPyAnYmxhY2snIDogJ3doaXRlJyksIHRoaXMuYnJpZ2h0bmVzcylcbiAgICB9XG5cbiAgICBnZXQgY2xlYW4gKCkge1xuICAgICAgICByZXR1cm4gY2xlYW4gKHsgbmFtZTogICB0aGlzLm5hbWUgPT09ICdkZWZhdWx0JyA/ICcnIDogdGhpcy5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgYnJpZ2h0OiB0aGlzLmJyaWdodG5lc3MgPT09IENvZGUuYnJpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGltOiAgICB0aGlzLmJyaWdodG5lc3MgPT09IENvZGUuZGltIH0pXG4gICAgfVxuXG4gICAgZGVmYXVsdEJyaWdodG5lc3MgKHZhbHVlKSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBDb2xvciAodGhpcy5iYWNrZ3JvdW5kLCB0aGlzLm5hbWUsIHRoaXMuYnJpZ2h0bmVzcyB8fCB2YWx1ZSlcbiAgICB9XG5cbiAgICBjc3MgKGludmVydGVkKSB7XG5cbiAgICAgICAgY29uc3QgY29sb3IgPSBpbnZlcnRlZCA/IHRoaXMuaW52ZXJzZSA6IHRoaXNcblxuICAgICAgICBjb25zdCByZ2JOYW1lID0gKChjb2xvci5icmlnaHRuZXNzID09PSBDb2RlLmJyaWdodCkgJiYgYXNCcmlnaHRbY29sb3IubmFtZV0pIHx8IGNvbG9yLm5hbWVcblxuICAgICAgICBjb25zdCBwcm9wID0gKGNvbG9yLmJhY2tncm91bmQgPyAnYmFja2dyb3VuZDonIDogJ2NvbG9yOicpXG4gICAgICAgICAgICAsIHJnYiAgPSBDb2xvcnMucmdiW3JnYk5hbWVdXG4gICAgICAgICAgICAsIGFscGhhID0gKHRoaXMuYnJpZ2h0bmVzcyA9PT0gQ29kZS5kaW0pID8gMC41IDogMVxuXG4gICAgICAgIHJldHVybiByZ2JcbiAgICAgICAgICAgICAgICA/IChwcm9wICsgJ3JnYmEoJyArIFsuLi5yZ2IsIGFscGhhXS5qb2luICgnLCcpICsgJyk7JylcbiAgICAgICAgICAgICAgICA6ICgoIWNvbG9yLmJhY2tncm91bmQgJiYgKGFscGhhIDwgMSkpID8gJ2NvbG9yOnJnYmEoMCwwLDAsMC41KTsnIDogJycpIC8vIENocm9tZSBkb2VzIG5vdCBzdXBwb3J0ICdvcGFjaXR5JyBwcm9wZXJ0eS4uLlxuICAgIH1cbn1cblxuLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5jbGFzcyBDb2RlIHtcblxuICAgIGNvbnN0cnVjdG9yIChuKSB7XG4gICAgICAgIGlmIChuICE9PSB1bmRlZmluZWQpIHsgdGhpcy52YWx1ZSA9IE51bWJlciAobikgfSB9XG5cbiAgICBnZXQgdHlwZSAoKSB7XG4gICAgICAgcmV0dXJuIHR5cGVzW01hdGguZmxvb3IgKHRoaXMudmFsdWUgLyAxMCldIH1cblxuICAgIGdldCBzdWJ0eXBlICgpIHtcbiAgICAgICAgcmV0dXJuIHN1YnR5cGVzW3RoaXMudHlwZV1bdGhpcy52YWx1ZSAlIDEwXSB9XG5cbiAgICBnZXQgc3RyICgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnZhbHVlID8gKCdcXHUwMDFiXFxbJyArIHRoaXMudmFsdWUgKyAnbScpIDogJycpIH1cblxuICAgIHN0YXRpYyBzdHIgKHgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb2RlICh4KS5zdHIgfVxuXG4gICAgZ2V0IGlzQnJpZ2h0bmVzcyAoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy52YWx1ZSA9PT0gQ29kZS5ub0JyaWdodG5lc3MpIHx8ICh0aGlzLnZhbHVlID09PSBDb2RlLmJyaWdodCkgfHwgKHRoaXMudmFsdWUgPT09IENvZGUuZGltKSB9XG59XG5cbi8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuTy5hc3NpZ24gKENvZGUsIHtcblxuICAgIHJlc2V0OiAgICAgICAgMCxcbiAgICBicmlnaHQ6ICAgICAgIDEsXG4gICAgZGltOiAgICAgICAgICAyLFxuICAgIGludmVyc2U6ICAgICAgNyxcbiAgICBub0JyaWdodG5lc3M6IDIyLFxuICAgIG5vSXRhbGljOiAgICAgMjMsXG4gICAgbm9VbmRlcmxpbmU6ICAyNCxcbiAgICBub0ludmVyc2U6ICAgIDI3LFxuICAgIG5vQ29sb3I6ICAgICAgMzksXG4gICAgbm9CZ0NvbG9yOiAgICA0OVxufSlcblxuLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5jb25zdCByZXBsYWNlQWxsID0gKHN0ciwgYSwgYikgPT4gc3RyLnNwbGl0IChhKS5qb2luIChiKVxuXG4vKiAgQU5TSSBicmlnaHRuZXNzIGNvZGVzIGRvIG5vdCBvdmVybGFwLCBlLmcuIFwie2JyaWdodH17ZGltfWZvb1wiIHdpbGwgYmUgcmVuZGVyZWQgYnJpZ2h0IChub3QgZGltKS5cbiAgICBTbyB3ZSBmaXggaXQgYnkgYWRkaW5nIGJyaWdodG5lc3MgY2FuY2VsaW5nIGJlZm9yZSBlYWNoIGJyaWdodG5lc3MgY29kZSwgc28gdGhlIGZvcm1lciBleGFtcGxlIGdldHNcbiAgICBjb252ZXJ0ZWQgdG8gXCJ7bm9CcmlnaHRuZXNzfXticmlnaHR9e25vQnJpZ2h0bmVzc317ZGltfWZvb1wiIOKAkyB0aGlzIHdheSBpdCBnZXRzIHJlbmRlcmVkIGFzIGV4cGVjdGVkLlxuICovXG5cbmNvbnN0IGRlbm9ybWFsaXplQnJpZ2h0bmVzcyA9IHMgPT4gcy5yZXBsYWNlICgvKFxcdTAwMWJcXFsoMXwyKW0pL2csICdcXHUwMDFiWzIybSQxJylcbmNvbnN0IG5vcm1hbGl6ZUJyaWdodG5lc3MgPSBzID0+IHMucmVwbGFjZSAoL1xcdTAwMWJcXFsyMm0oXFx1MDAxYlxcWygxfDIpbSkvZywgJyQxJylcblxuY29uc3Qgd3JhcCA9ICh4LCBvcGVuQ29kZSwgY2xvc2VDb2RlKSA9PiB7XG5cbiAgICBjb25zdCBvcGVuICA9IENvZGUuc3RyIChvcGVuQ29kZSksXG4gICAgICAgICAgY2xvc2UgPSBDb2RlLnN0ciAoY2xvc2VDb2RlKVxuXG4gICAgcmV0dXJuIFN0cmluZyAoeClcbiAgICAgICAgICAgICAgICAuc3BsaXQgKCdcXG4nKVxuICAgICAgICAgICAgICAgIC5tYXAgKGxpbmUgPT4gZGVub3JtYWxpemVCcmlnaHRuZXNzIChvcGVuICsgcmVwbGFjZUFsbCAobm9ybWFsaXplQnJpZ2h0bmVzcyAobGluZSksIGNsb3NlLCBvcGVuKSArIGNsb3NlKSlcbiAgICAgICAgICAgICAgICAuam9pbiAoJ1xcbicpXG59XG5cbi8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgY2FtZWwgPSAoYSwgYikgPT4gYSArIGIuY2hhckF0ICgwKS50b1VwcGVyQ2FzZSAoKSArIGIuc2xpY2UgKDEpXG5cblxuY29uc3Qgc3RyaW5nV3JhcHBpbmdNZXRob2RzID0gKCgpID0+IFtcblxuICAgICAgICAuLi5jb2xvckNvZGVzLm1hcCAoKGssIGkpID0+ICFrID8gW10gOiBbIC8vIGNvbG9yIG1ldGhvZHNcblxuICAgICAgICAgICAgW2ssICAgICAgICAgICAgICAgMzAgKyBpLCBDb2RlLm5vQ29sb3JdLFxuICAgICAgICAgICAgW2NhbWVsICgnYmcnLCBrKSwgNDAgKyBpLCBDb2RlLm5vQmdDb2xvcl0sXG4gICAgICAgIF0pLFxuXG4gICAgICAgIC4uLmNvbG9yQ29kZXNMaWdodC5tYXAgKChrLCBpKSA9PiAhayA/IFtdIDogWyAvLyBsaWdodCBjb2xvciBtZXRob2RzXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFtrLCAgICAgICAgICAgICAgICA5MCArIGksIENvZGUubm9Db2xvcl0sXG4gICAgICAgICAgICBbY2FtZWwgKCdiZycsIGspLCAxMDAgKyBpLCBDb2RlLm5vQmdDb2xvcl0sXG4gICAgICAgIF0pLFxuXG4gICAgICAgIC8qIFRISVMgT05FIElTIEZPUiBCQUNLV0FSRFMgQ09NUEFUSUJJTElUWSBXSVRIIFBSRVZJT1VTIFZFUlNJT05TIChoYWQgJ2JyaWdodCcgaW5zdGVhZCBvZiAnbGlnaHQnIGZvciBiYWNrZ3JvdW5kcylcbiAgICAgICAgICovXG4gICAgICAgIC4uLlsnJywgJ0JyaWdodFJlZCcsICdCcmlnaHRHcmVlbicsICdCcmlnaHRZZWxsb3cnLCAnQnJpZ2h0Qmx1ZScsICdCcmlnaHRNYWdlbnRhJywgJ0JyaWdodEN5YW4nXS5tYXAgKChrLCBpKSA9PiAhayA/IFtdIDogW1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBbJ2JnJyArIGssIDEwMCArIGksIENvZGUubm9CZ0NvbG9yXSxcbiAgICAgICAgXSksXG4gICAgICAgIFxuICAgICAgICAuLi5zdHlsZUNvZGVzLm1hcCAoKGssIGkpID0+ICFrID8gW10gOiBbIC8vIHN0eWxlIG1ldGhvZHNcblxuICAgICAgICAgICAgW2ssIGksICgoayA9PT0gJ2JyaWdodCcpIHx8IChrID09PSAnZGltJykpID8gQ29kZS5ub0JyaWdodG5lc3MgOiAoMjAgKyBpKV1cbiAgICAgICAgXSlcbiAgICBdXG4gICAgLnJlZHVjZSAoKGEsIGIpID0+IGEuY29uY2F0IChiKSlcbiAgICBcbikgKCk7XG5cbi8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgYXNzaWduU3RyaW5nV3JhcHBpbmdBUEkgPSAodGFyZ2V0LCB3cmFwQmVmb3JlID0gdGFyZ2V0KSA9PlxuXG4gICAgc3RyaW5nV3JhcHBpbmdNZXRob2RzLnJlZHVjZSAoKG1lbW8sIFtrLCBvcGVuLCBjbG9zZV0pID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTy5kZWZpbmVQcm9wZXJ0eSAobWVtbywgaywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQ6ICgpID0+IGFzc2lnblN0cmluZ1dyYXBwaW5nQVBJIChzdHIgPT4gd3JhcEJlZm9yZSAod3JhcCAoc3RyLCBvcGVuLCBjbG9zZSkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0KVxuXG4vKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IFRFWFQgICAgPSAwLFxuICAgICAgQlJBQ0tFVCA9IDEsXG4gICAgICBDT0RFICAgID0gMlxuXG5mdW5jdGlvbiByYXdQYXJzZSAocykge1xuICAgIFxuICAgIGxldCBzdGF0ZSA9IFRFWFQsIGJ1ZmZlciA9ICcnLCB0ZXh0ID0gJycsIGNvZGUgPSAnJywgY29kZXMgPSBbXVxuICAgIGxldCBzcGFucyA9IFtdXG5cbiAgICBmb3IgKGxldCBpID0gMCwgbiA9IHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG5cbiAgICAgICAgY29uc3QgYyA9IHNbaV1cblxuICAgICAgICBidWZmZXIgKz0gY1xuXG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcblxuICAgICAgICAgICAgY2FzZSBURVhUOlxuICAgICAgICAgICAgICAgIGlmIChjID09PSAnXFx1MDAxYicpIHsgc3RhdGUgPSBCUkFDS0VUOyBidWZmZXIgPSBjOyB9XG4gICAgICAgICAgICAgICAgZWxzZSAgICAgICAgICAgICAgICB7IHRleHQgKz0gYyB9XG4gICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgY2FzZSBCUkFDS0VUOlxuICAgICAgICAgICAgICAgIGlmIChjID09PSAnWycpIHsgc3RhdGUgPSBDT0RFOyBjb2RlID0gJyc7IGNvZGVzID0gW10gfVxuICAgICAgICAgICAgICAgIGVsc2UgICAgICAgICAgIHsgc3RhdGUgPSBURVhUOyB0ZXh0ICs9IGJ1ZmZlciB9XG4gICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgY2FzZSBDT0RFOlxuXG4gICAgICAgICAgICAgICAgaWYgKChjID49ICcwJykgJiYgKGMgPD0gJzknKSkgICAgICAgIHsgY29kZSArPSBjIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjID09PSAnOycpICAgICAgICAgICAgICAgICAgeyBjb2Rlcy5wdXNoIChuZXcgQ29kZSAoY29kZSkpOyBjb2RlID0gJycgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKChjID09PSAnbScpICYmIGNvZGUubGVuZ3RoKSB7IGNvZGVzLnB1c2ggKG5ldyBDb2RlIChjb2RlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNvZGUgb2YgY29kZXMpIHsgc3BhbnMucHVzaCAoeyB0ZXh0LCBjb2RlIH0pOyB0ZXh0ID0gJycgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gVEVYVFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGUgPSBURVhUOyB0ZXh0ICs9IGJ1ZmZlciB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3RhdGUgIT09IFRFWFQpIHRleHQgKz0gYnVmZmVyXG5cbiAgICBpZiAodGV4dCkgc3BhbnMucHVzaCAoeyB0ZXh0LCBjb2RlOiBuZXcgQ29kZSAoKSB9KVxuXG4gICAgcmV0dXJuIHNwYW5zXG59XG5cbi8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIEFOU0ktZXNjYXBlZCBzdHJpbmcuXG4gKi9cbmNsYXNzIENvbG9ycyB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcyBhIHN0cmluZyBjb250YWluaW5nIEFOU0kgZXNjYXBlIGNvZGVzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yIChzKSB7XG5cbiAgICAgICAgdGhpcy5zcGFucyA9IHMgPyByYXdQYXJzZSAocykgOiBbXVxuICAgIH1cblxuICAgIGdldCBzdHIgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGFucy5yZWR1Y2UgKChzdHIsIHApID0+IHN0ciArIHAudGV4dCArIHAuY29kZS5zdHIsICcnKVxuICAgIH1cblxuICAgIGdldCBwYXJzZWQgKCkge1xuXG4gICAgICAgIGxldCBjb2xvciwgYmdDb2xvciwgYnJpZ2h0bmVzcywgc3R5bGVzXG5cbiAgICAgICAgZnVuY3Rpb24gcmVzZXQgKCkge1xuXG4gICAgICAgICAgICBjb2xvciAgICAgID0gbmV3IENvbG9yICgpLFxuICAgICAgICAgICAgYmdDb2xvciAgICA9IG5ldyBDb2xvciAodHJ1ZSAvKiBiYWNrZ3JvdW5kICovKSxcbiAgICAgICAgICAgIGJyaWdodG5lc3MgPSB1bmRlZmluZWQsXG4gICAgICAgICAgICBzdHlsZXMgICAgID0gbmV3IFNldCAoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmVzZXQgKClcblxuICAgICAgICByZXR1cm4gTy5hc3NpZ24gKG5ldyBDb2xvcnMgKCksIHtcblxuICAgICAgICAgICAgc3BhbnM6IHRoaXMuc3BhbnMubWFwIChzcGFuID0+IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGMgPSBzcGFuLmNvZGVcblxuICAgICAgICAgICAgICAgIGNvbnN0IGludmVydGVkICA9IHN0eWxlcy5oYXMgKCdpbnZlcnNlJyksXG4gICAgICAgICAgICAgICAgICAgICAgdW5kZXJsaW5lID0gc3R5bGVzLmhhcyAoJ3VuZGVybGluZScpICAgPyAndGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7JyA6ICcnLCAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICBpdGFsaWMgICAgPSBzdHlsZXMuaGFzICgnaXRhbGljJykgICAgICA/ICdmb250LXN0eWxlOiBpdGFsaWM7JyA6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgIGJvbGQgICAgICA9IGJyaWdodG5lc3MgPT09IENvZGUuYnJpZ2h0ID8gJ2ZvbnQtd2VpZ2h0OiBib2xkOycgOiAnJ1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZm9yZUNvbG9yID0gY29sb3IuZGVmYXVsdEJyaWdodG5lc3MgKGJyaWdodG5lc3MpXG5cbiAgICAgICAgICAgICAgICBjb25zdCBzdHlsZWRTcGFuID0gTy5hc3NpZ24gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgY3NzOiBib2xkICsgaXRhbGljICsgdW5kZXJsaW5lICsgZm9yZUNvbG9yLmNzcyAoaW52ZXJ0ZWQpICsgYmdDb2xvci5jc3MgKGludmVydGVkKSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFuICh7IGJvbGQ6ICEhYm9sZCwgY29sb3I6IGZvcmVDb2xvci5jbGVhbiwgYmdDb2xvcjogYmdDb2xvci5jbGVhbiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGFuKVxuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrIG9mIHN0eWxlcykgeyBzdHlsZWRTcGFuW2tdID0gdHJ1ZSB9XG5cbiAgICAgICAgICAgICAgICBpZiAoYy5pc0JyaWdodG5lc3MpIHtcblxuICAgICAgICAgICAgICAgICAgICBicmlnaHRuZXNzID0gYy52YWx1ZVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3Bhbi5jb2RlLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc3Bhbi5jb2RlLnZhbHVlID09PSBDb2RlLnJlc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNldCAoKVxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc3Bhbi5jb2RlLnR5cGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NvbG9yJyAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NvbG9yTGlnaHQnICAgOiBjb2xvciAgID0gbmV3IENvbG9yIChmYWxzZSwgYy5zdWJ0eXBlKTsgYnJlYWtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2JnQ29sb3InICAgICAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2JnQ29sb3JMaWdodCcgOiBiZ0NvbG9yID0gbmV3IENvbG9yICh0cnVlLCAgYy5zdWJ0eXBlKTsgYnJlYWtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0eWxlJyAgOiBzdHlsZXMuYWRkICAgIChjLnN1YnR5cGUpOyBicmVha1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Vuc3R5bGUnOiBzdHlsZXMuZGVsZXRlIChjLnN1YnR5cGUpOyBicmVha1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0eWxlZFNwYW5cblxuICAgICAgICAgICAgfSkuZmlsdGVyIChzID0+IHMudGV4dC5sZW5ndGggPiAwKVxuICAgICAgICB9KVxuICAgIH1cblxuLyogIE91dHB1dHMgd2l0aCBDaHJvbWUgRGV2VG9vbHMtY29tcGF0aWJsZSBmb3JtYXQgICAgICovXG5cbiAgICBnZXQgYXNDaHJvbWVDb25zb2xlTG9nQXJndW1lbnRzICgpIHtcblxuICAgICAgICBjb25zdCBzcGFucyA9IHRoaXMucGFyc2VkLnNwYW5zXG5cbiAgICAgICAgcmV0dXJuIFtzcGFucy5tYXAgKHMgPT4gKCclYycgKyBzLnRleHQpKS5qb2luICgnJyksXG4gICAgICAgICAgICAgLi4uc3BhbnMubWFwIChzID0+IHMuY3NzKV1cbiAgICB9XG5cbiAgICBnZXQgYnJvd3NlckNvbnNvbGVBcmd1bWVudHMgKCkgLyogTEVHQUNZLCBERVBSRUNBVEVEICovIHsgcmV0dXJuIHRoaXMuYXNDaHJvbWVDb25zb2xlTG9nQXJndW1lbnRzIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjIGluc3RhbGxzIFN0cmluZyBwcm90b3R5cGUgZXh0ZW5zaW9uc1xuICAgICAqIEBleGFtcGxlXG4gICAgICogcmVxdWlyZSAoJ2Fuc2ljb2xvcicpLm5pY2VcbiAgICAgKiBjb25zb2xlLmxvZyAoJ2ZvbycuYnJpZ2h0LnJlZClcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0IG5pY2UgKCkge1xuXG4gICAgICAgIENvbG9ycy5uYW1lcy5mb3JFYWNoIChrID0+IHtcbiAgICAgICAgICAgIGlmICghKGsgaW4gU3RyaW5nLnByb3RvdHlwZSkpIHtcbiAgICAgICAgICAgICAgICBPLmRlZmluZVByb3BlcnR5IChTdHJpbmcucHJvdG90eXBlLCBrLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gQ29sb3JzW2tdICh0aGlzKSB9IH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIENvbG9yc1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjIHBhcnNlcyBhIHN0cmluZyBjb250YWluaW5nIEFOU0kgZXNjYXBlIGNvZGVzXG4gICAgICogQHJldHVybiB7Q29sb3JzfSBwYXJzZWQgcmVwcmVzZW50YXRpb24uXG4gICAgICovXG4gICAgc3RhdGljIHBhcnNlIChzKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ29sb3JzIChzKS5wYXJzZWRcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBzdHJpcHMgQU5TSSBjb2RlcyBmcm9tIGEgc3RyaW5nXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHMgYSBzdHJpbmcgY29udGFpbmluZyBBTlNJIGVzY2FwZSBjb2Rlcy5cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IGNsZWFuIHN0cmluZy5cbiAgICAgKi9cbiAgICBzdGF0aWMgc3RyaXAgKHMpIHtcbiAgICAgICAgcmV0dXJuIHMucmVwbGFjZSAoL1tcXHUwMDFiXFx1MDA5Yl1bWygpIzs/XSooPzpbMC05XXsxLDR9KD86O1swLTldezAsNH0pKik/WzAtOUEtUFJaY2YtbnFyeT0+PF0vZywgJycpIC8vIGhvcGUgVjggY2FjaGVzIHRoZSByZWdleHBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IHNwYW5zID0gWy4uLmFuc2kucGFyc2UgKCdcXHUwMDFiWzdtXFx1MDAxYls3bWZvb1xcdTAwMWJbN21iYXJcXHUwMDFiWzI3bScpXVxuICAgICAqL1xuICAgIFtTeW1ib2wuaXRlcmF0b3JdICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BhbnNbU3ltYm9sLml0ZXJhdG9yXSAoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFRoaXMgYWxsb3dzIGFuIGFsdGVybmF0aXZlIGltcG9ydCBzdHlsZSwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS94cGwvYW5zaWNvbG9yL2lzc3Vlcy83I2lzc3VlY29tbWVudC01Nzg5MjM1NzhcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGltcG9ydCB7IGFuc2ljb2xvciwgUGFyc2VkU3BhbiB9IGZyb20gJ2Fuc2ljb2xvcidcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0IGFuc2ljb2xvciAoKSB7XG4gICAgICAgIHJldHVybiBDb2xvcnNcbiAgICB9XG59XG5cbi8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuYXNzaWduU3RyaW5nV3JhcHBpbmdBUEkgKENvbG9ycywgc3RyID0+IHN0cilcblxuLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5Db2xvcnMubmFtZXMgPSBzdHJpbmdXcmFwcGluZ01ldGhvZHMubWFwICgoW2tdKSA9PiBrKVxuXG4vKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbkNvbG9ycy5yZ2IgPSB7XG5cbiAgICBibGFjazogICAgICAgIFswLCAgICAgMCwgICAwXSwgICAgXG4gICAgZGFya0dyYXk6ICAgICBbMTAwLCAxMDAsIDEwMF0sXG4gICAgbGlnaHRHcmF5OiAgICBbMjAwLCAyMDAsIDIwMF0sXG4gICAgd2hpdGU6ICAgICAgICBbMjU1LCAyNTUsIDI1NV0sXG5cbiAgICByZWQ6ICAgICAgICAgIFsyMDQsICAgMCwgICAwXSxcbiAgICBsaWdodFJlZDogICAgIFsyNTUsICA1MSwgICAwXSxcbiAgICBcbiAgICBncmVlbjogICAgICAgIFswLCAgIDIwNCwgICAwXSxcbiAgICBsaWdodEdyZWVuOiAgIFs1MSwgIDIwNCwgIDUxXSxcbiAgICBcbiAgICB5ZWxsb3c6ICAgICAgIFsyMDQsIDEwMiwgICAwXSxcbiAgICBsaWdodFllbGxvdzogIFsyNTUsIDE1MywgIDUxXSxcbiAgICBcbiAgICBibHVlOiAgICAgICAgIFswLCAgICAgMCwgMjU1XSxcbiAgICBsaWdodEJsdWU6ICAgIFsyNiwgIDE0MCwgMjU1XSxcbiAgICBcbiAgICBtYWdlbnRhOiAgICAgIFsyMDQsICAgMCwgMjA0XSxcbiAgICBsaWdodE1hZ2VudGE6IFsyNTUsICAgMCwgMjU1XSxcbiAgICBcbiAgICBjeWFuOiAgICAgICAgIFswLCAgIDE1MywgMjU1XSxcbiAgICBsaWdodEN5YW46ICAgIFswLCAgIDIwNCwgMjU1XSxcbn1cblxuLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbG9yc1xuXG4vKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiJdfQ==\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../../.yarn/unplugged/ansicolor-npm-1.1.93-df37dda1e2/node_modules/ansicolor/build/ansicolor.js?");

/***/ }),

/***/ "../web-sample~/build/hmr-test-state.js":
/*!**********************************************!*\
  !*** ../web-sample~/build/hmr-test-state.js ***!
  \**********************************************/
/*! flagged exports */
/*! export __esModule [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export appState [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.appState = void 0;\nconsole.log(\"hmr-test-state.ts is running\");\nclass AppState {\n    constructor() {\n        this.curNumber = 0;\n        console.log(\"AppState constructor running\");\n    }\n    setNumber(newNumber) {\n        this.curNumber = newNumber;\n    }\n    getCurNumber() {\n        return this.curNumber;\n    }\n}\nexports.appState = new AppState();\n//# sourceMappingURL=hmr-test-state.js.map\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../web-sample~/build/hmr-test-state.js?");

/***/ }),

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

/***/ }),

/***/ "../web-sample~/build/hmr-test.js":
/*!****************************************!*\
  !*** ../web-sample~/build/hmr-test.js ***!
  \****************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, module, __webpack_require__ */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.containerElement = void 0;\nconsole.log(\"hmr-test.ts is running\");\nconst hmr_test_state_1 = __webpack_require__(/*! ./hmr-test-state */ \"../web-sample~/build/hmr-test-state.js\");\nconst hmr_test_style_1 = __webpack_require__(/*! ./hmr-test-style */ \"../web-sample~/build/hmr-test-style.js\");\nexports.containerElement = document.createElement(\"div\");\nexports.containerElement.setAttribute(\"id\", \"container-el\");\nexports.containerElement.style.cssText = hmr_test_style_1.style;\nconst numberElement = document.createElement(\"div\");\nnumberElement.setAttribute(\"id\", \"number-el\");\nexports.containerElement.append(numberElement);\nfunction updateNumber() {\n    numberElement.innerHTML = \"\" + hmr_test_state_1.appState.getCurNumber();\n    hmr_test_state_1.appState.setNumber(hmr_test_state_1.appState.getCurNumber() + 1);\n}\nupdateNumber();\nconst buttonElement = document.createElement(\"input\");\nbuttonElement.setAttribute(\"type\", \"button\");\nbuttonElement.setAttribute(\"id\", \"button-el\");\nbuttonElement.setAttribute(\"value\", \"Increment\");\nbuttonElement.onclick = updateNumber;\nexports.containerElement.append(buttonElement);\nif (true) {\n    module.hot.accept(/*! ./hmr-test-style */ \"../web-sample~/build/hmr-test-style.js\", function () {\n        return __awaiter(this, void 0, void 0, function* () {\n            console.log(\"accepting ./hmr-test-style\");\n            const { style } = yield Promise.resolve().then(() => __webpack_require__(/*! ./hmr-test-style */ \"../web-sample~/build/hmr-test-style.js\"));\n            exports.containerElement.style.cssText = style;\n        });\n    });\n}\n//# sourceMappingURL=hmr-test.js.map\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../web-sample~/build/hmr-test.js?");

/***/ }),

/***/ "../web-sample~/build/web.js":
/*!***********************************!*\
  !*** ../web-sample~/build/web.js ***!
  \***********************************/
/*! flagged exports */
/*! export __esModule [provided] [unused] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("var __webpack_unused_export__;\n\n__webpack_unused_export__ = ({ value: true });\nconsole.log(\"index.ts is running\");\nconst hmr_test_1 = __webpack_require__(/*! ./hmr-test */ \"../web-sample~/build/hmr-test.js\");\ndocument.body.append(hmr_test_1.containerElement);\nif (true) {\n    console.log(\"module is hot\");\n}\n//# sourceMappingURL=web.js.map\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../web-sample~/build/web.js?");

/***/ }),

/***/ "../../@skoville/webpack-hmr/client/universal/default-socket-io-accessor~/build/package.js":
/*!*************************************************************************************************!*\
  !*** ../../@skoville/webpack-hmr/client/universal/default-socket-io-accessor~/build/package.js ***!
  \*************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__exportStar(__webpack_require__(/*! ./socket-io-accessor */ \"../../@skoville/webpack-hmr/client/universal/default-socket-io-accessor~/build/socket-io-accessor.js\"), exports);\n//# sourceMappingURL=package.js.map\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../@skoville/webpack-hmr/client/universal/default-socket-io-accessor~/build/package.js?");

/***/ }),

/***/ "../../@skoville/webpack-hmr/client/universal/default-socket-io-accessor~/build/socket-io-accessor.js":
/*!************************************************************************************************************!*\
  !*** ../../@skoville/webpack-hmr/client/universal/default-socket-io-accessor~/build/socket-io-accessor.js ***!
  \************************************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SocketIOSkovilleServerAccessor = void 0;\nconst socket_io_client_1 = __webpack_require__(/*! socket.io-client */ \"../../../.yarn/cache/socket.io-client-npm-3.0.4-d98ba3da09-73d21e1148.zip/node_modules/socket.io-client/build/index.js\");\nclass SocketIOSkovilleServerAccessor {\n    constructor(socketIOServerURL, onUpdateNotification, log) {\n        this.socket = socket_io_client_1.io(socketIOServerURL, { reconnection: true });\n        this.log = log.clone(`[${\"SocketIOSkovilleServerAccessor\"}] `);\n        // Handling native socket io events\n        this.socket.on(\"connect\", () => {\n            this.log.info(`Connected to ${socketIOServerURL}`);\n            onUpdateNotification();\n        });\n        this.socket.on(\"connecting\", () => { this.log.info(`Connecting to ${socketIOServerURL}`); });\n        this.socket.on(\"reconnecting\", () => { this.log.info(`Reconnecting to ${socketIOServerURL}`); });\n        this.socket.on(\"connect failed\", () => { this.log.error(`Failed to connect to ${socketIOServerURL}`); });\n        this.socket.on(\"reconnect failed\", () => { this.log.error(`Failed to reconnect to ${socketIOServerURL}`); });\n        this.socket.on(\"close\", () => { this.log.warn(`Connection to ${socketIOServerURL} has been closed`); });\n        this.socket.on(\"disconnect\", () => { this.log.warn(`Disconnected from ${socketIOServerURL}`); });\n        // Specific to Skoville\n        this.socket.on(\"update\", () => onUpdateNotification());\n    }\n    submitUpdateRequest(updateRequest) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return new Promise(resolve => {\n                this.socket.send(updateRequest, resolve);\n            });\n        });\n    }\n}\nexports.SocketIOSkovilleServerAccessor = SocketIOSkovilleServerAccessor;\n//# sourceMappingURL=socket-io-accessor.js.map\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../@skoville/webpack-hmr/client/universal/default-socket-io-accessor~/build/socket-io-accessor.js?");

/***/ }),

/***/ "../../@skoville/webpack-hmr/client/universal/hot-runtime~/build/hot-runtime.js":
/*!**************************************************************************************!*\
  !*** ../../@skoville/webpack-hmr/client/universal/hot-runtime~/build/hot-runtime.js ***!
  \**************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, module, __webpack_require__, __webpack_require__.h, __webpack_require__.* */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SkovilleHotClientRuntime = void 0;\nconst webpack_hmr_shared_universal_utilities_1 = __webpack_require__(/*! @skoville/webpack-hmr-shared-universal-utilities */ \"../../@skoville/webpack-hmr/shared/universal/utilities~/build/package.js\");\nconst values_1 = __webpack_require__(/*! @skoville/webpack-hmr-shared-universal-utilities/build/injected-client-constants/values */ \"../../@skoville/webpack-hmr/shared/universal/utilities~/build/injected-client-constants/values.js\");\nconst ansicolor_1 = __webpack_require__(/*! ansicolor */ \"../../../.yarn/unplugged/ansicolor-npm-1.1.93-df37dda1e2/node_modules/ansicolor/build/ansicolor.js\");\nclass SkovilleHotClientRuntime {\n    constructor(log, requestUpdatesFromServer, restartClient) {\n        this.requestUpdatesFromServer = requestUpdatesFromServer;\n        this.restartClient = restartClient;\n        this.cliendId = undefined;\n        this.hashHistory = [__webpack_require__.h()];\n        this.currentHashHistoryIndex = 0;\n        this.hashToCompilerUpdateMap = new Map();\n        this.runningHotSwaps = 0;\n        this.log = log.clone(`[${\"SkovilleHotClientRuntime\"}] `);\n        const { enableHotModuleReloading, enableApplicationRestarting } = values_1.clientOptions;\n        this.hotEnabled = enableHotModuleReloading;\n        this.restartingEnabled = enableApplicationRestarting;\n        const moduleHotIsDefined = module.hot !== undefined;\n        if (this.hotEnabled !== moduleHotIsDefined) { // module.hot being defined should also mean that this.hotEnabled is true. Otherwise there was a logical error.\n            throw new Error(`hot swapping is ${this.hotEnabled ? 'enabled' : 'disabled'}, but webpack's ${\"module.hot\"} is ${moduleHotIsDefined ? '' : 'un'}defined.`);\n        }\n    }\n    getClientId() {\n        return this.cliendId;\n    }\n    startOrPromptAppRestart() {\n        return __awaiter(this, void 0, void 0, function* () {\n            if (this.restartingEnabled) {\n                this.log.info(\"Restarting...\");\n                yield this.restartClient();\n            }\n            else {\n                this.log.error(\"Manual Restart required.\");\n            }\n        });\n    }\n    triggerUpdateRequest() {\n        return __awaiter(this, void 0, void 0, function* () {\n            const updateResponse = yield this.requestUpdatesFromServer({\n                webpackConfigurationName: values_1.webpackConfigurationName,\n                currentHash: __webpack_require__.h(),\n                clientId: this.cliendId\n            });\n            yield this.handleUpdateResponseFromServer(updateResponse);\n        });\n    }\n    handleUpdateResponseFromServer(updateResponse) {\n        return __awaiter(this, void 0, void 0, function* () {\n            this.log.info(\"update response is \\n\" + JSON.stringify(Object.assign({}, updateResponse, (updateResponse.webpackConfigurationNameRegistered &&\n                updateResponse.compatible) ?\n                {\n                    [\"updatesToApply\"]: updateResponse.updatesToApply.map(update => Object.assign({}, update, { [\"updatedModuleSources\"]: Object.keys(update.updatedModuleSources) }))\n                }\n                :\n                    {})));\n            if (updateResponse.webpackConfigurationNameRegistered) {\n                this.cliendId = updateResponse.clientId;\n                if (updateResponse.compatible) {\n                    // Check length of updates. Find acutal diff between current and lastest server, then begin applying.\n                    const newlyQueuedUpdates = this.mergeUpdates(updateResponse.updatesToApply);\n                    if (newlyQueuedUpdates === null) {\n                        this.log.error(`Failed to ${\"handleUpdateResponseFromServer\"}`);\n                        return;\n                    }\n                    const actualUpdateOcurred = newlyQueuedUpdates.length > 0;\n                    if (actualUpdateOcurred) {\n                        this.log.info(`${newlyQueuedUpdates.length} newly queued updates from server.`);\n                        if (this.hotEnabled) {\n                            if (this.runningHotSwaps === 0) {\n                                this.hotSwap();\n                            }\n                            else if (this.runningHotSwaps > 1) {\n                                throw Error(`Fatal error detected. ${\"this.runningHotSwaps\"} > 1`);\n                            }\n                        }\n                        else {\n                            this.log.info(`Restarting since hot swapping is disabled`);\n                            this.startOrPromptAppRestart();\n                        }\n                    }\n                }\n                else {\n                    this.log.error(`Current ${\"__webpack_hash__\"} is ${__webpack_require__.h()}, which is incompatible with hash history stored on server. Likely the server restarted, resulting in a new hash history.`);\n                    this.startOrPromptAppRestart();\n                }\n            }\n            else {\n                this.log.error(`The ${\"webpackConfigurationName\"} '${values_1.webpackConfigurationName}' is not registered in server running at ${values_1.clientOptions.url}`);\n            }\n        });\n    }\n    /**\n     * merges updates sent from the server into the queue of updates which need to be applied.\n     * @param compilerUpdates the updates received from the server.\n     * @returns the compiler updates which were not registered in the update queue before this run.\n     */\n    mergeUpdates(compilerUpdates) {\n        this.log.info(\"webpack hash is = \" + ansicolor_1.ansicolor.green(__webpack_require__.h()));\n        var indexOfHashHistoryWhichMatchesIndexOfFirstUpdate = -1;\n        for (var hashHistoryIndex = 0; hashHistoryIndex < this.hashHistory.length; ++hashHistoryIndex) {\n            const currentHashFromHistory = this.hashHistory[hashHistoryIndex];\n            if (compilerUpdates[0].hash === currentHashFromHistory) {\n                indexOfHashHistoryWhichMatchesIndexOfFirstUpdate = hashHistoryIndex;\n                break;\n            }\n        }\n        if (indexOfHashHistoryWhichMatchesIndexOfFirstUpdate === -1) {\n            this.log.error(`Recieved ${\"compilerUpdates\"} which are not in sync with the hash here. This should have been caught by the server, and resulted in an a response with incompatible set to true. This means there is a bug present.`);\n            this.log.error(`${\"compilerUpdates\"} = ${ansicolor_1.ansicolor.default(JSON.stringify(compilerUpdates))}. Own ${\"hashHistory\"} is ${ansicolor_1.ansicolor.default(JSON.stringify(this.hashHistory))}`);\n            return null;\n        }\n        else {\n            if (this.hashHistory.length === 1) {\n                // In this case, it means the hot client has only just started, meaning\n                // It has the initial hash in the history but is not yet aware of the update\n                // which corresponds to that original hash yet. So we can set it explicitly.\n                this.hashToCompilerUpdateMap.set(this.hashHistory[0], compilerUpdates[0]);\n            }\n            const newlyQueuedUpdates = [];\n            for (var indexOfUpdates = 0; indexOfUpdates < compilerUpdates.length; ++indexOfUpdates) {\n                const currentUpdate = compilerUpdates[indexOfUpdates];\n                const currentHashHistoryIndex = indexOfHashHistoryWhichMatchesIndexOfFirstUpdate + indexOfUpdates;\n                const currentHash = this.hashHistory[currentHashHistoryIndex];\n                if (currentHash === undefined) {\n                    this.hashHistory[currentHashHistoryIndex] = currentUpdate.hash;\n                    this.hashToCompilerUpdateMap.set(currentUpdate.hash, currentUpdate);\n                    newlyQueuedUpdates.push(currentUpdate);\n                }\n                else {\n                    if (newlyQueuedUpdates.length > 0) {\n                        this.log.error(`Detected error where there is a hash which exists within the ${\"this.hashHistory\"} when the ${\"newlyQueuedUpdates\"} has been added to already. ${\"this.hashHistory\"} = ${ansicolor_1.ansicolor.default(JSON.stringify(this.hashHistory))}`);\n                        return null;\n                    }\n                    const previouslySavedUpdate = this.hashToCompilerUpdateMap.get(currentHash);\n                    if (previouslySavedUpdate === undefined) {\n                        this.log.error(`The ${\"currentHash\"} is defined as '${currentHash}', however a mapping does not appear to exist in ${\"this.hashToCompilerUpdateMap\"} which is currently equal to the entry set ${ansicolor_1.ansicolor.default(JSON.stringify(Array.from(this.hashToCompilerUpdateMap.entries())))}.`);\n                        return null;\n                    }\n                    else {\n                        const previouslySavedUpdateJSON = JSON.stringify(previouslySavedUpdate);\n                        const receivedUpdateJSON = JSON.stringify(currentUpdate);\n                        if (previouslySavedUpdateJSON !== receivedUpdateJSON) {\n                            this.log.error(`Detected error where the ${\"receivedUpdateJSON\"} of '${ansicolor_1.ansicolor.default(receivedUpdateJSON)}' is not equal to the ${\"previouslySavedUpdateJSON\"} of '${previouslySavedUpdateJSON}'.`);\n                            return null;\n                        }\n                    }\n                }\n            }\n            return newlyQueuedUpdates;\n        }\n    }\n    hotSwap() {\n        return __awaiter(this, void 0, void 0, function* () {\n            this.runningHotSwaps++;\n            if (this.runningHotSwaps !== 1) {\n                this.log.error(`Detected unexpected number of running ${\"this.hotSwap\"}s. Current count is ${this.runningHotSwaps}`);\n                return;\n            }\n            if (this.currentHashHistoryIndex >= this.hashHistory.length - 1) {\n                this.log.error(`Hot swapping should not be occuring right now since ${\"this.currentHashHistoryIndex\"} is ${this.currentHashHistoryIndex} while ${\"this.hashHistory.length\"} is ${this.hashHistory.length}`);\n                return;\n            }\n            const currentHash = this.hashHistory[this.currentHashHistoryIndex];\n            if (__webpack_require__.h() !== currentHash) {\n                this.log.error(`When trying to run ${\"hotSwap\"}, the value of ${\"__webpack_hash__\"} is ${__webpack_require__.h()} whereas the value at ${\"this.currentHashHistoryIndex\"} is ${currentHash}, likely indicating a prior hotswap failed.`);\n                return;\n            }\n            const nextHashFromUpdateQueue = this.hashHistory[this.currentHashHistoryIndex + 1];\n            const updateToApply = this.hashToCompilerUpdateMap.get(nextHashFromUpdateQueue);\n            if (updateToApply === undefined) {\n                this.log.error(`There was an invalid attempt to run ${\"hotSwap\"}, because the ${\"updateToApply\"} is undefined in ${\"this.hashToCompilerUpdateMap\"} at hash ${nextHashFromUpdateQueue}`);\n                return;\n            }\n            if (updateToApply.hash !== nextHashFromUpdateQueue) {\n                this.log.error(`Detected error where the hash ${nextHashFromUpdateQueue} when used as an index into ${\"this.hashToCompilerUpdateMap\"} returns an update which has a non-matching hash ${updateToApply.hash}`);\n                return;\n            }\n            if (false) {}\n            const currentHMRStatus = module.hot.status();\n            if (currentHMRStatus !== \"idle\") {\n                this.log.error(`There was an invalid attempt to run ${\"hotSwap\"} when the ${\"module.hot.status\"} is currently '${ansicolor_1.ansicolor.default(currentHMRStatus)}'`);\n                return;\n            }\n            try {\n                const updatedModuleSources = updateToApply.updatedModuleSources;\n                const updatedModules = {};\n                for (const moduleId in updatedModuleSources) {\n                    updatedModules[moduleId] = eval(`(\\n${updatedModuleSources[moduleId]}\\n)`);\n                }\n                this.log.info(`The following will be hotswapped: ['${Object.keys(updatedModules).map(updatedModule => ansicolor_1.ansicolor.magenta(updatedModule)).join(\"', '\")}']`);\n                // TODO: PR to hmr @types repo to include new method added to module.hot\n                const updatedModulesConfirmed = yield module.hot[webpack_hmr_shared_universal_utilities_1.webpackFunctionToInjectName](updateToApply.hash, updatedModules);\n                this.logHMRApplyResult(updatedModulesConfirmed);\n                this.currentHashHistoryIndex++;\n                const currentHash = this.hashHistory[this.currentHashHistoryIndex];\n                if (currentHash !== __webpack_require__.h()) {\n                    this.log.error(`After hot swap occured, we now have a current ${\"__webpack_hash__\"} of ${__webpack_require__.h()}, however the value at ${\"this.currentHashHistoryIndex\"} is ${currentHash}`);\n                    return;\n                }\n                this.runningHotSwaps--;\n                if (this.currentHashHistoryIndex === this.hashHistory.length - 1) {\n                    this.log.info(`Client is up to date. ${\"this.hotSwap\"} finished.`);\n                }\n                else {\n                    this.hotSwap();\n                }\n            }\n            catch (err) {\n                this.log.error(`${\"module.hot.apply\"} has failed. The current ${\"module.hot.status\"} is ${module.hot.status()}`);\n                this.log.error(\"message below\");\n                this.log.error(err.message);\n                this.log.error(\"stack below\");\n                this.log.error(err.stack);\n                if (module.hot.status() === 'abort') {\n                    this.startOrPromptAppRestart();\n                }\n            }\n        });\n    }\n    logHMRApplyResult(updatedModules) {\n        if (updatedModules.length === 0) {\n            this.log.info(\"Nothing hot updated.\");\n        }\n        else {\n            this.log.info(\"Updated modules:\");\n            updatedModules.forEach(moduleId => {\n                if (typeof moduleId === \"string\" && moduleId.indexOf(\"!\") !== -1) {\n                    const parts = moduleId.split(\"!\");\n                    this.log.info(\" - \" + ansicolor_1.ansicolor.magenta(\"\" + parts.pop()));\n                }\n                this.log.info(\" - \" + ansicolor_1.ansicolor.magenta(\"\" + moduleId));\n            });\n            if (updatedModules.every(moduleId => typeof moduleId === \"number\")) {\n                this.log.info(\"Consider using the NamedModulesPlugin for module names.\");\n            }\n        }\n    }\n}\nexports.SkovilleHotClientRuntime = SkovilleHotClientRuntime;\n//# sourceMappingURL=hot-runtime.js.map\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../@skoville/webpack-hmr/client/universal/hot-runtime~/build/hot-runtime.js?");

/***/ }),

/***/ "../../@skoville/webpack-hmr/client/universal/hot-runtime~/build/package.js":
/*!**********************************************************************************!*\
  !*** ../../@skoville/webpack-hmr/client/universal/hot-runtime~/build/package.js ***!
  \**********************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__exportStar(__webpack_require__(/*! ./hot-runtime */ \"../../@skoville/webpack-hmr/client/universal/hot-runtime~/build/hot-runtime.js\"), exports);\n//# sourceMappingURL=package.js.map\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../@skoville/webpack-hmr/client/universal/hot-runtime~/build/package.js?");

/***/ }),

/***/ "../../@skoville/webpack-hmr/client/web/customizable~/build/customizable-web-client.js":
/*!*********************************************************************************************!*\
  !*** ../../@skoville/webpack-hmr/client/web/customizable~/build/customizable-web-client.js ***!
  \*********************************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.CustomizableWebClient = void 0;\nconst webpack_hmr_client_universal_hot_runtime_1 = __webpack_require__(/*! @skoville/webpack-hmr-client-universal-hot-runtime */ \"../../@skoville/webpack-hmr/client/universal/hot-runtime~/build/package.js\");\nconst webpack_hmr_shared_universal_utilities_1 = __webpack_require__(/*! @skoville/webpack-hmr-shared-universal-utilities */ \"../../@skoville/webpack-hmr/shared/universal/utilities~/build/package.js\");\nconst values_1 = __webpack_require__(/*! @skoville/webpack-hmr-shared-universal-utilities/build/injected-client-constants/values */ \"../../@skoville/webpack-hmr/shared/universal/utilities~/build/injected-client-constants/values.js\");\nconst ansicolor = __webpack_require__(/*! ansicolor */ \"../../../.yarn/unplugged/ansicolor-npm-1.1.93-df37dda1e2/node_modules/ansicolor/build/ansicolor.js\");\nclass CustomizableWebClient {\n    constructor(loggingHandler, sendRequestToServer) {\n        this.log = new webpack_hmr_shared_universal_utilities_1.Log.Logger((logRequest) => __awaiter(this, void 0, void 0, function* () {\n            const logResult = yield loggingHandler(logRequest.contents, logRequest.level);\n            if (logResult) {\n                console.log(...ansicolor.parse(logRequest.contents).asChromeConsoleLogArguments);\n            }\n        }), `Skoville${\"CustomizableWebClient\"}`);\n        this.hotClientRuntime = new webpack_hmr_client_universal_hot_runtime_1.SkovilleHotClientRuntime(this.log, sendRequestToServer, () => __awaiter(this, void 0, void 0, function* () { return window.location.reload(); }));\n    }\n    triggerClientUpdateRequest() {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.log.info(\"about to trigger update request from customizable to hot runtime\");\n            yield this.hotClientRuntime.triggerUpdateRequest();\n        });\n    }\n    getLogger() {\n        return this.log;\n    }\n    static getWebpackConfigurationName() {\n        return values_1.webpackConfigurationName;\n    }\n    static getServerURL() {\n        return values_1.clientOptions.url;\n    }\n}\nexports.CustomizableWebClient = CustomizableWebClient;\n//# sourceMappingURL=customizable-web-client.js.map\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../@skoville/webpack-hmr/client/web/customizable~/build/customizable-web-client.js?");

/***/ }),

/***/ "../../@skoville/webpack-hmr/client/web/customizable~/build/package.js":
/*!*****************************************************************************!*\
  !*** ../../@skoville/webpack-hmr/client/web/customizable~/build/package.js ***!
  \*****************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Log = void 0;\n__exportStar(__webpack_require__(/*! ./customizable-web-client */ \"../../@skoville/webpack-hmr/client/web/customizable~/build/customizable-web-client.js\"), exports);\nvar webpack_hmr_shared_universal_utilities_1 = __webpack_require__(/*! @skoville/webpack-hmr-shared-universal-utilities */ \"../../@skoville/webpack-hmr/shared/universal/utilities~/build/package.js\");\nObject.defineProperty(exports, \"Log\", ({ enumerable: true, get: function () { return webpack_hmr_shared_universal_utilities_1.Log; } }));\n//# sourceMappingURL=package.js.map\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../@skoville/webpack-hmr/client/web/customizable~/build/package.js?");

/***/ }),

/***/ "../../@skoville/webpack-hmr/client/web/default~/build/entry.js":
/*!**********************************************************************!*\
  !*** ../../@skoville/webpack-hmr/client/web/default~/build/entry.js ***!
  \**********************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst webpack_hmr_client_web_customizable_1 = __webpack_require__(/*! @skoville/webpack-hmr-client-web-customizable */ \"../../@skoville/webpack-hmr/client/web/customizable~/build/package.js\");\nconst webpack_hmr_client_universal_default_socket_io_accessor_1 = __webpack_require__(/*! @skoville/webpack-hmr-client-universal-default-socket-io-accessor */ \"../../@skoville/webpack-hmr/client/universal/default-socket-io-accessor~/build/package.js\");\nclass DefaultWebClient {\n    constructor() {\n        this.customizableWebClient = new webpack_hmr_client_web_customizable_1.CustomizableWebClient(() => __awaiter(this, void 0, void 0, function* () { return true; }), updateRequest => this.skovilleServerAccessor.submitUpdateRequest(updateRequest));\n        this.skovilleServerAccessor = new webpack_hmr_client_universal_default_socket_io_accessor_1.SocketIOSkovilleServerAccessor(webpack_hmr_client_web_customizable_1.CustomizableWebClient.getServerURL(), () => this.customizableWebClient.triggerClientUpdateRequest(), this.customizableWebClient.getLogger());\n    }\n}\nnew DefaultWebClient();\n//# sourceMappingURL=entry.js.map\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../@skoville/webpack-hmr/client/web/default~/build/entry.js?");

/***/ }),

/***/ "../../@skoville/webpack-hmr/shared/universal/utilities~/build/injected-client-constants/values.js":
/*!*********************************************************************************************************!*\
  !*** ../../@skoville/webpack-hmr/shared/universal/utilities~/build/injected-client-constants/values.js ***!
  \*********************************************************************************************************/
/*! flagged exports */
/*! export __esModule [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export clientOptions [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export webpackConfigurationName [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.clientOptions = exports.webpackConfigurationName = void 0;\nexports.webpackConfigurationName = 'WEB-CONFIG';\nexports.clientOptions = {\"url\":\"http://localhost:8080\",\"enableApplicationRestarting\":true,\"enableHotModuleReloading\":true};\n//# sourceMappingURL=values.js.map\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../@skoville/webpack-hmr/shared/universal/utilities~/build/injected-client-constants/values.js?");

/***/ }),

/***/ "../../@skoville/webpack-hmr/shared/universal/utilities~/build/log.js":
/*!****************************************************************************!*\
  !*** ../../@skoville/webpack-hmr/shared/universal/utilities~/build/log.js ***!
  \****************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Log = void 0;\nconst ansicolor = __webpack_require__(/*! ansicolor */ \"../../../.yarn/unplugged/ansicolor-npm-1.1.93-df37dda1e2/node_modules/ansicolor/build/ansicolor.js\");\nvar Log;\n(function (Log) {\n    // levels and their ranks are based off of Log4j\n    let Level;\n    (function (Level) {\n        Level[Level[\"ALL\"] = 0] = \"ALL\";\n        Level[Level[\"TRACE\"] = 1] = \"TRACE\";\n        Level[Level[\"DEBUG\"] = 2] = \"DEBUG\";\n        Level[Level[\"INFO\"] = 3] = \"INFO\";\n        Level[Level[\"WARN\"] = 4] = \"WARN\";\n        Level[Level[\"ERROR\"] = 5] = \"ERROR\";\n        Level[Level[\"FATAL\"] = 6] = \"FATAL\";\n        Level[Level[\"OFF\"] = 7] = \"OFF\";\n    })(Level = Log.Level || (Log.Level = {}));\n    class Logger {\n        constructor(requestHandler, instancePrefix = \"\", permanentPrefix = \"\", level = Level.ALL) {\n            this.requestHandler = requestHandler;\n            this.permanentPrefix = permanentPrefix;\n            this.permanentPlusInstancePrefix = permanentPrefix + instancePrefix;\n            this.level = level;\n        }\n        handle(level, message) {\n            if (level >= this.level) {\n                const contents = this.permanentPlusInstancePrefix + this.prefixLinesOfMultilineMessage(message);\n                this.requestHandler({ level, contents });\n            }\n        }\n        prefixLinesOfMultilineMessage(message) {\n            const barePrefix = ansicolor.strip(this.permanentPlusInstancePrefix);\n            if (barePrefix.length > 0) {\n                const messageLines = message.split(\"\\n\");\n                if (messageLines.length > 1) {\n                    const newLinePrefix = [];\n                    for (var i = 0; i < barePrefix.length; ++i) {\n                        newLinePrefix.push(i === barePrefix.length / 2 ? \".\" : \" \");\n                    }\n                    return message.split(\"\\n\").join(\"\\n\" + ansicolor.white(newLinePrefix.join(\"\")));\n                }\n            }\n            // In this case either the prefix is 0 length or there is only one message line, so just return the message.\n            return message;\n        }\n        clone(newInstancePrefix, level) {\n            return new Logger(this.requestHandler, newInstancePrefix, this.permanentPrefix, level);\n        }\n        // The logging methods.\n        trace(message) {\n            this.handle(Level.TRACE, ansicolor.cyan(message));\n        }\n        debug(message) {\n            this.handle(Level.DEBUG, ansicolor.magenta(message));\n        }\n        info(message) {\n            this.handle(Level.INFO, message);\n        }\n        warn(message) {\n            this.handle(Level.WARN, ansicolor.yellow(message));\n        }\n        error(message) {\n            this.handle(Level.ERROR, ansicolor.red(message));\n        }\n        fatal(message) {\n            this.handle(Level.FATAL, ansicolor.bright.red(message));\n        }\n    }\n    Log.Logger = Logger;\n})(Log = exports.Log || (exports.Log = {}));\n//# sourceMappingURL=log.js.map\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../@skoville/webpack-hmr/shared/universal/utilities~/build/log.js?");

/***/ }),

/***/ "../../@skoville/webpack-hmr/shared/universal/utilities~/build/message-definitions.js":
/*!********************************************************************************************!*\
  !*** ../../@skoville/webpack-hmr/shared/universal/utilities~/build/message-definitions.js ***!
  \********************************************************************************************/
/*! flagged exports */
/*! export __esModule [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\n/**\n * This file is meant to define all message structure standards shared accross the Skoville project.\n * The messages define a protocol used to communicate with any Skoville server implementation.\n */\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n//# sourceMappingURL=message-definitions.js.map\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../@skoville/webpack-hmr/shared/universal/utilities~/build/message-definitions.js?");

/***/ }),

/***/ "../../@skoville/webpack-hmr/shared/universal/utilities~/build/package.js":
/*!********************************************************************************!*\
  !*** ../../@skoville/webpack-hmr/shared/universal/utilities~/build/package.js ***!
  \********************************************************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__exportStar(__webpack_require__(/*! ./log */ \"../../@skoville/webpack-hmr/shared/universal/utilities~/build/log.js\"), exports);\n__exportStar(__webpack_require__(/*! ./message-definitions */ \"../../@skoville/webpack-hmr/shared/universal/utilities~/build/message-definitions.js\"), exports);\n__exportStar(__webpack_require__(/*! ./plugin-options */ \"../../@skoville/webpack-hmr/shared/universal/utilities~/build/plugin-options.js\"), exports);\n__exportStar(__webpack_require__(/*! ./webpack-hot-extension */ \"../../@skoville/webpack-hmr/shared/universal/utilities~/build/webpack-hot-extension.js\"), exports);\n//# sourceMappingURL=package.js.map\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../@skoville/webpack-hmr/shared/universal/utilities~/build/package.js?");

/***/ }),

/***/ "../../@skoville/webpack-hmr/shared/universal/utilities~/build/plugin-options.js":
/*!***************************************************************************************!*\
  !*** ../../@skoville/webpack-hmr/shared/universal/utilities~/build/plugin-options.js ***!
  \***************************************************************************************/
/*! flagged exports */
/*! export __esModule [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n//# sourceMappingURL=plugin-options.js.map\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../@skoville/webpack-hmr/shared/universal/utilities~/build/plugin-options.js?");

/***/ }),

/***/ "../../@skoville/webpack-hmr/shared/universal/utilities~/build/webpack-hot-extension.js":
/*!**********************************************************************************************!*\
  !*** ../../@skoville/webpack-hmr/shared/universal/utilities~/build/webpack-hot-extension.js ***!
  \**********************************************************************************************/
/*! flagged exports */
/*! export __esModule [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export webpackFunctionToInjectName [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.webpackFunctionToInjectName = void 0;\nexports.webpackFunctionToInjectName = \"applyWithOwnUpdateRetrievalStrategy\";\n//# sourceMappingURL=webpack-hot-extension.js.map\n\n//# sourceURL=webpack://@skoville-integration-testing/skoville-test/../../@skoville/webpack-hmr/shared/universal/utilities~/build/webpack-hot-extension.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 		__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 		module = execOptions.module;
/******/ 		execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => "" + __webpack_require__.h() + ".hot-update.json";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "c0be74aa7353fa6a43f6"
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (event) => {
/******/ 				onScriptComplete = () => {
/******/ 		
/******/ 				}
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => fn(event));
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(() => {
/******/ 				onScriptComplete({ type: 'timeout', target: script })
/******/ 			}, 120000);
/******/ 			script.onerror = script.onload = onScriptComplete;
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/WEB-CONFIG/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises;
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.trace(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: currentChildModule !== moduleId,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 					else hot._acceptedDependencies[dep] = callback || function () {};
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				applyWithOwnUpdateRetrievalStrategy: hotApplyWithOwnUpdateRetrievalStrategy,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				registeredStatusHandlers[i].call(null, newStatus);
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 					blockingPromises.push(promise);
/******/ 					waitForBlockingPromises(function () {
/******/ 						setStatus("ready");
/******/ 					});
/******/ 					return promise;
/******/ 				case "prepare":
/******/ 					blockingPromises.push(promise);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises.length === 0) return fn();
/******/ 			var blocker = blockingPromises;
/******/ 			blockingPromises = [];
/******/ 			return Promise.all(blocker).then(function () {
/******/ 				return waitForBlockingPromises(fn);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			setStatus("check");
/******/ 			return __webpack_require__.hmrM().then(function (update) {
/******/ 				if (!update) {
/******/ 					setStatus(applyInvalidatedModules() ? "ready" : "idle");
/******/ 					return null;
/******/ 				}
/******/ 		
/******/ 				setStatus("prepare");
/******/ 		
/******/ 				var updatedModules = [];
/******/ 				blockingPromises = [];
/******/ 				currentUpdateApplyHandlers = [];
/******/ 		
/******/ 				return Promise.all(
/******/ 					Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 						promises,
/******/ 						key
/******/ 					) {
/******/ 						__webpack_require__.hmrC[key](
/******/ 							update.c,
/******/ 							update.r,
/******/ 							update.m,
/******/ 							promises,
/******/ 							currentUpdateApplyHandlers,
/******/ 							updatedModules
/******/ 						);
/******/ 						return promises;
/******/ 					},
/******/ 					[])
/******/ 				).then(function () {
/******/ 					return waitForBlockingPromises(function () {
/******/ 						if (applyOnUpdate) {
/******/ 							return internalApply(applyOnUpdate);
/******/ 						} else {
/******/ 							setStatus("ready");
/******/ 		
/******/ 							return updatedModules;
/******/ 						}
/******/ 					});
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error("apply() is only allowed in ready status");
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				setStatus("abort");
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			// handle errors in accept handlers and self accepted module load
/******/ 			if (error) {
/******/ 				setStatus("fail");
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw error;
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			if (queuedInvalidatedModules) {
/******/ 				return internalApply(options).then(function (list) {
/******/ 					outdatedModules.forEach(function (moduleId) {
/******/ 						if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 					});
/******/ 					return list;
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			setStatus("idle");
/******/ 			return Promise.resolve(outdatedModules);
/******/ 		}
/******/ 		
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
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId) {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		window["webpackHotUpdate_skoville_integration_testing_skoville_test"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				if (
/******/ 					__webpack_require__.c[outdatedModuleId] &&
/******/ 					__webpack_require__.c[outdatedModuleId].hot._selfAccepted &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!__webpack_require__.c[outdatedModuleId].hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: __webpack_require__.c[outdatedModuleId].hot._requireSelf,
/******/ 						errorHandler: __webpack_require__.c[outdatedModuleId].hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					var error = null;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (options.onErrored) {
/******/ 											options.onErrored({
/******/ 												type: "accept-errored",
/******/ 												moduleId: outdatedModuleId,
/******/ 												dependencyId: dependenciesForCallbacks[k],
/******/ 												error: err
/******/ 											});
/******/ 										}
/******/ 										if (!options.ignoreErrored) {
/******/ 											if (!error) error = err;
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err);
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 									}
/******/ 									reportError(err);
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						!__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						__webpack_require__.o(installedChunks, chunkId) &&
/******/ 						installedChunks[chunkId] !== undefined
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
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
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no deferred startup
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("../web-sample~/build/web.js");
/******/ 	__webpack_require__("../../@skoville/webpack-hmr/client/web/default~/build/entry.js");
/******/ })()
;