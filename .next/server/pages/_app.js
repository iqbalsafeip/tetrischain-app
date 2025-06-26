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
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./components/hooks/useProgram.js":
/*!****************************************!*\
  !*** ./components/hooks/useProgram.js ***!
  \****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useProgram: () => (/* binding */ useProgram)\n/* harmony export */ });\n/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @solana/web3.js */ \"@solana/web3.js\");\n/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_solana_web3_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @solana/wallet-adapter-react */ \"@solana/wallet-adapter-react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_1__]);\n_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n/* __next_internal_client_entry_do_not_use__ useProgram auto */ \n\n\n/**\r\n * A hook that provides access to the Solana program, counter address,\r\n * connected wallet, and connection.\r\n * This hook handles the basic setup for the program.\r\n */ function useProgram() {\n    const { publicKey, connected } = (0,_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_1__.useWallet)();\n    const { connection } = (0,_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_1__.useConnection)();\n    const wallet = (0,_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_1__.useAnchorWallet)();\n    const [balance, setBalance] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);\n    const [account, setAccount] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);\n    // Program initialization - conditionally create with provider if wallet connected\n    // Get the counter account address\n    // Fund connected wallet with devnet SOL\n    return {\n        balance,\n        publicKey,\n        connected,\n        connection,\n        wallet,\n        account\n    };\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL2hvb2tzL3VzZVByb2dyYW0uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O2dFQUc4RDtBQUt4QjtBQUVNO0FBRzVDOzs7O0NBSUMsR0FDTSxTQUFTTztJQUNaLE1BQU0sRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQUUsR0FBR0wsdUVBQVNBO0lBQzFDLE1BQU0sRUFBRU0sVUFBVSxFQUFFLEdBQUdQLDJFQUFhQTtJQUNwQyxNQUFNUSxTQUFTVCw2RUFBZUE7SUFDOUIsTUFBTSxDQUFDVSxTQUFTQyxXQUFXLEdBQUdQLCtDQUFRQSxDQUFDO0lBQ3ZDLE1BQU0sQ0FBQ1EsU0FBU0MsV0FBVyxHQUFHVCwrQ0FBUUEsQ0FBQztJQUV2QyxrRkFBa0Y7SUFFbEYsa0NBQWtDO0lBR2xDLHdDQUF3QztJQUd4QyxPQUFPO1FBQ0hNO1FBQ0FKO1FBQ0FDO1FBQ0FDO1FBQ0FDO1FBQ0FHO0lBQ0o7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL2Z1dHVyaXN0aWMtdGV0cmlzLy4vY29tcG9uZW50cy9ob29rcy91c2VQcm9ncmFtLmpzP2Q0OTMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XHJcblxyXG5cclxuaW1wb3J0IHsgTEFNUE9SVFNfUEVSX1NPTCwgUHVibGljS2V5IH0gZnJvbSBcIkBzb2xhbmEvd2ViMy5qc1wiO1xyXG5pbXBvcnQge1xyXG4gICAgdXNlQW5jaG9yV2FsbGV0LFxyXG4gICAgdXNlQ29ubmVjdGlvbixcclxuICAgIHVzZVdhbGxldCxcclxufSBmcm9tIFwiQHNvbGFuYS93YWxsZXQtYWRhcHRlci1yZWFjdFwiO1xyXG5cclxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBBIGhvb2sgdGhhdCBwcm92aWRlcyBhY2Nlc3MgdG8gdGhlIFNvbGFuYSBwcm9ncmFtLCBjb3VudGVyIGFkZHJlc3MsXHJcbiAqIGNvbm5lY3RlZCB3YWxsZXQsIGFuZCBjb25uZWN0aW9uLlxyXG4gKiBUaGlzIGhvb2sgaGFuZGxlcyB0aGUgYmFzaWMgc2V0dXAgZm9yIHRoZSBwcm9ncmFtLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHVzZVByb2dyYW0oKSB7XHJcbiAgICBjb25zdCB7IHB1YmxpY0tleSwgY29ubmVjdGVkIH0gPSB1c2VXYWxsZXQoKTtcclxuICAgIGNvbnN0IHsgY29ubmVjdGlvbiB9ID0gdXNlQ29ubmVjdGlvbigpO1xyXG4gICAgY29uc3Qgd2FsbGV0ID0gdXNlQW5jaG9yV2FsbGV0KCk7XHJcbiAgICBjb25zdCBbYmFsYW5jZSwgc2V0QmFsYW5jZV0gPSB1c2VTdGF0ZShudWxsKTtcclxuICAgIGNvbnN0IFthY2NvdW50LCBzZXRBY2NvdW50XSA9IHVzZVN0YXRlKG51bGwpO1xyXG5cclxuICAgIC8vIFByb2dyYW0gaW5pdGlhbGl6YXRpb24gLSBjb25kaXRpb25hbGx5IGNyZWF0ZSB3aXRoIHByb3ZpZGVyIGlmIHdhbGxldCBjb25uZWN0ZWRcclxuXHJcbiAgICAvLyBHZXQgdGhlIGNvdW50ZXIgYWNjb3VudCBhZGRyZXNzXHJcblxyXG5cclxuICAgIC8vIEZ1bmQgY29ubmVjdGVkIHdhbGxldCB3aXRoIGRldm5ldCBTT0xcclxuICAgIFxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYmFsYW5jZSxcclxuICAgICAgICBwdWJsaWNLZXksXHJcbiAgICAgICAgY29ubmVjdGVkLFxyXG4gICAgICAgIGNvbm5lY3Rpb24sXHJcbiAgICAgICAgd2FsbGV0LFxyXG4gICAgICAgIGFjY291bnRcclxuICAgIH07XHJcbn1cclxuIl0sIm5hbWVzIjpbIkxBTVBPUlRTX1BFUl9TT0wiLCJQdWJsaWNLZXkiLCJ1c2VBbmNob3JXYWxsZXQiLCJ1c2VDb25uZWN0aW9uIiwidXNlV2FsbGV0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJ1c2VQcm9ncmFtIiwicHVibGljS2V5IiwiY29ubmVjdGVkIiwiY29ubmVjdGlvbiIsIndhbGxldCIsImJhbGFuY2UiLCJzZXRCYWxhbmNlIiwiYWNjb3VudCIsInNldEFjY291bnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/hooks/useProgram.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ main)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _public_App_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/public/App.css */ \"./public/App.css\");\n/* harmony import */ var _public_App_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_public_App_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @solana/wallet-adapter-react */ \"@solana/wallet-adapter-react\");\n/* harmony import */ var _solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @solana/wallet-adapter-base */ \"@solana/wallet-adapter-base\");\n/* harmony import */ var _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @solana/wallet-adapter-react-ui */ \"@solana/wallet-adapter-react-ui\");\n/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @solana/web3.js */ \"@solana/web3.js\");\n/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_solana_web3_js__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _components_hooks_useProgram__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/components/hooks/useProgram */ \"./components/hooks/useProgram.js\");\n/* harmony import */ var _solana_mobile_wallet_adapter_mobile__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @solana-mobile/wallet-adapter-mobile */ \"@solana-mobile/wallet-adapter-mobile\");\n/* harmony import */ var _solana_wallet_adapter_solflare__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @solana/wallet-adapter-solflare */ \"@solana/wallet-adapter-solflare\");\n/* harmony import */ var _solana_wallet_adapter_phantom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @solana/wallet-adapter-phantom */ \"@solana/wallet-adapter-phantom\");\n/* harmony import */ var _solana_wallet_adapter_trust__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @solana/wallet-adapter-trust */ \"@solana/wallet-adapter-trust\");\n/* harmony import */ var _solana_wallet_adapter_magiceden__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @solana/wallet-adapter-magiceden */ \"@solana/wallet-adapter-magiceden\");\n/* harmony import */ var _solana_wallet_adapter_torus__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @solana/wallet-adapter-torus */ \"@solana/wallet-adapter-torus\");\n/* harmony import */ var _solana_wallet_adapter_ledger__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @solana/wallet-adapter-ledger */ \"@solana/wallet-adapter-ledger\");\n/* harmony import */ var _solana_wallet_adapter_mathwallet__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @solana/wallet-adapter-mathwallet */ \"@solana/wallet-adapter-mathwallet\");\n/* harmony import */ var _solana_wallet_adapter_tokenpocket__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @solana/wallet-adapter-tokenpocket */ \"@solana/wallet-adapter-tokenpocket\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_4__, _solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_5__, _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_6__, _components_hooks_useProgram__WEBPACK_IMPORTED_MODULE_8__, _solana_mobile_wallet_adapter_mobile__WEBPACK_IMPORTED_MODULE_9__, _solana_wallet_adapter_solflare__WEBPACK_IMPORTED_MODULE_10__, _solana_wallet_adapter_phantom__WEBPACK_IMPORTED_MODULE_11__, _solana_wallet_adapter_trust__WEBPACK_IMPORTED_MODULE_12__, _solana_wallet_adapter_magiceden__WEBPACK_IMPORTED_MODULE_13__, _solana_wallet_adapter_torus__WEBPACK_IMPORTED_MODULE_14__, _solana_wallet_adapter_ledger__WEBPACK_IMPORTED_MODULE_15__, _solana_wallet_adapter_mathwallet__WEBPACK_IMPORTED_MODULE_16__, _solana_wallet_adapter_tokenpocket__WEBPACK_IMPORTED_MODULE_17__]);\n([_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_4__, _solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_5__, _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_6__, _components_hooks_useProgram__WEBPACK_IMPORTED_MODULE_8__, _solana_mobile_wallet_adapter_mobile__WEBPACK_IMPORTED_MODULE_9__, _solana_wallet_adapter_solflare__WEBPACK_IMPORTED_MODULE_10__, _solana_wallet_adapter_phantom__WEBPACK_IMPORTED_MODULE_11__, _solana_wallet_adapter_trust__WEBPACK_IMPORTED_MODULE_12__, _solana_wallet_adapter_magiceden__WEBPACK_IMPORTED_MODULE_13__, _solana_wallet_adapter_torus__WEBPACK_IMPORTED_MODULE_14__, _solana_wallet_adapter_ledger__WEBPACK_IMPORTED_MODULE_15__, _solana_wallet_adapter_mathwallet__WEBPACK_IMPORTED_MODULE_16__, _solana_wallet_adapter_tokenpocket__WEBPACK_IMPORTED_MODULE_17__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\n // Add necessary styles here\n// Client Components:\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n// import { UnsafeBurnerWalletAdapter } from \"@solana/wallet-adapter-wallets\";\n// Default styles that can be overridden by your app\n__webpack_require__(/*! @solana/wallet-adapter-react-ui/styles.css */ \"./node_modules/@solana/wallet-adapter-react-ui/styles.css\");\n__webpack_require__(/*! @headlessui/tailwindcss */ \"@headlessui/tailwindcss\");\n__webpack_require__(/*! ./loading.css */ \"./pages/loading.css\");\nfunction main({ Component, pageProps }) {\n    const endpoint = (0,react__WEBPACK_IMPORTED_MODULE_3__.useMemo)(()=>\"https://fluent-rough-resonance.solana-mainnet.quiknode.pro/e2254e5f4a4cf5b4b6d4c25763573fa58bc63782/\");\n    const wallets = (0,react__WEBPACK_IMPORTED_MODULE_3__.useMemo)(()=>[\n            new _solana_wallet_adapter_solflare__WEBPACK_IMPORTED_MODULE_10__.SolflareWalletAdapter(),\n            new _solana_wallet_adapter_phantom__WEBPACK_IMPORTED_MODULE_11__.PhantomWalletAdapter(),\n            new _solana_wallet_adapter_trust__WEBPACK_IMPORTED_MODULE_12__.TrustWalletAdapter(),\n            new _solana_wallet_adapter_magiceden__WEBPACK_IMPORTED_MODULE_13__.MagicEdenWalletAdapter(),\n            new _solana_wallet_adapter_torus__WEBPACK_IMPORTED_MODULE_14__.TorusWalletAdapter(),\n            new _solana_wallet_adapter_ledger__WEBPACK_IMPORTED_MODULE_15__.LedgerWalletAdapter(),\n            new _solana_wallet_adapter_mathwallet__WEBPACK_IMPORTED_MODULE_16__.MathWalletAdapter(),\n            new _solana_wallet_adapter_tokenpocket__WEBPACK_IMPORTED_MODULE_17__.TokenPocketWalletAdapter()\n        ], [\n        endpoint\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_4__.ConnectionProvider, {\n            endpoint: endpoint,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_4__.WalletProvider, {\n                wallets: wallets,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_6__.WalletModalProvider, {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                        ...pageProps\n                    }, void 0, false, {\n                        fileName: \"/Users/macbook/Desktop/nyoba/test/pages/_app.js\",\n                        lineNumber: 57,\n                        columnNumber: 13\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/macbook/Desktop/nyoba/test/pages/_app.js\",\n                    lineNumber: 56,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/macbook/Desktop/nyoba/test/pages/_app.js\",\n                lineNumber: 55,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/macbook/Desktop/nyoba/test/pages/_app.js\",\n            lineNumber: 54,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/macbook/Desktop/nyoba/test/pages/_app.js\",\n        lineNumber: 53,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFNkI7QUFDSCxDQUFDLDRCQUE0QjtBQUt2RCxxQkFBcUI7QUFFNkI7QUFLWjtBQUM2QjtBQUNHO0FBQ3RCO0FBQ1c7QUFDK0g7QUFDakg7QUFDSDtBQUNKO0FBQ1E7QUFDUjtBQUNFO0FBQ0U7QUFDUTtBQUM5RSw4RUFBOEU7QUFFOUUsb0RBQW9EO0FBQ3BEc0IsbUJBQU9BLENBQUMsNkdBQTRDO0FBQ3BEQSxtQkFBT0EsQ0FBQyx3REFBeUI7QUFDakNBLG1CQUFPQSxDQUFDLDBDQUFlO0FBRVIsU0FBU0MsS0FBSyxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBRTtJQUNuRCxNQUFNQyxXQUFXeEIsOENBQU9BLENBQUMsSUFBTTtJQUUvQixNQUFNeUIsVUFBVXpCLDhDQUFPQSxDQUFDLElBQU07WUFDNUIsSUFBSVksbUZBQXFCQTtZQUN6QixJQUFJQyxpRkFBb0JBO1lBQ3hCLElBQUlDLDZFQUFrQkE7WUFDdEIsSUFBSUMscUZBQXNCQTtZQUMxQixJQUFJQyw2RUFBa0JBO1lBQ3RCLElBQUlDLCtFQUFtQkE7WUFDdkIsSUFBSUMsaUZBQWlCQTtZQUNyQixJQUFJQyx5RkFBd0JBO1NBQzdCLEVBQUU7UUFBQ0s7S0FBUztJQUdiLHFCQUNFLDhEQUFDRTtrQkFDQyw0RUFBQ3pCLDRFQUFrQkE7WUFBRXVCLFVBQVVBO3NCQUM3Qiw0RUFBQ3JCLHdFQUFjQTtnQkFBQ3NCLFNBQVNBOzBCQUN2Qiw0RUFBQ3BCLGdGQUFtQkE7OEJBQ2xCLDRFQUFDaUI7d0JBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNcEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mdXR1cmlzdGljLXRldHJpcy8uL3BhZ2VzL19hcHAuanM/ZTBhZCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCdcblxuaW1wb3J0ICdAL3N0eWxlcy9nbG9iYWxzLmNzcydcbmltcG9ydCAnQC9wdWJsaWMvQXBwLmNzcyc7IC8vIEFkZCBuZWNlc3Nhcnkgc3R5bGVzIGhlcmVcblxuXG5cblxuLy8gQ2xpZW50IENvbXBvbmVudHM6XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIENvbm5lY3Rpb25Qcm92aWRlcixcbiAgdXNlV2FsbGV0LFxuICBXYWxsZXRQcm92aWRlcixcbn0gZnJvbSBcIkBzb2xhbmEvd2FsbGV0LWFkYXB0ZXItcmVhY3RcIjtcbmltcG9ydCB7IFdhbGxldEFkYXB0ZXJOZXR3b3JrIH0gZnJvbSBcIkBzb2xhbmEvd2FsbGV0LWFkYXB0ZXItYmFzZVwiO1xuaW1wb3J0IHsgV2FsbGV0TW9kYWxQcm92aWRlciB9IGZyb20gXCJAc29sYW5hL3dhbGxldC1hZGFwdGVyLXJlYWN0LXVpXCI7XG5pbXBvcnQgeyBjbHVzdGVyQXBpVXJsIH0gZnJvbSBcIkBzb2xhbmEvd2ViMy5qc1wiO1xuaW1wb3J0IHsgdXNlUHJvZ3JhbSB9IGZyb20gJ0AvY29tcG9uZW50cy9ob29rcy91c2VQcm9ncmFtJztcbmltcG9ydCB7IGNyZWF0ZURlZmF1bHRBZGRyZXNzU2VsZWN0b3IsIGNyZWF0ZURlZmF1bHRBdXRob3JpemF0aW9uUmVzdWx0Q2FjaGUsIGNyZWF0ZURlZmF1bHRXYWxsZXROb3RGb3VuZEhhbmRsZXIsIFNvbGFuYU1vYmlsZVdhbGxldEFkYXB0ZXIgfSBmcm9tICdAc29sYW5hLW1vYmlsZS93YWxsZXQtYWRhcHRlci1tb2JpbGUnO1xuaW1wb3J0IHsgU29sZmxhcmVXYWxsZXRBZGFwdGVyLCB9IGZyb20gJ0Bzb2xhbmEvd2FsbGV0LWFkYXB0ZXItc29sZmxhcmUnO1xuaW1wb3J0IHsgUGhhbnRvbVdhbGxldEFkYXB0ZXIgfSBmcm9tICdAc29sYW5hL3dhbGxldC1hZGFwdGVyLXBoYW50b20nO1xuaW1wb3J0IHsgVHJ1c3RXYWxsZXRBZGFwdGVyIH0gZnJvbSAnQHNvbGFuYS93YWxsZXQtYWRhcHRlci10cnVzdCc7XG5pbXBvcnQgeyBNYWdpY0VkZW5XYWxsZXRBZGFwdGVyIH0gZnJvbSAnQHNvbGFuYS93YWxsZXQtYWRhcHRlci1tYWdpY2VkZW4nO1xuaW1wb3J0IHsgVG9ydXNXYWxsZXRBZGFwdGVyIH0gZnJvbSAnQHNvbGFuYS93YWxsZXQtYWRhcHRlci10b3J1cyc7XG5pbXBvcnQgeyBMZWRnZXJXYWxsZXRBZGFwdGVyIH0gZnJvbSAnQHNvbGFuYS93YWxsZXQtYWRhcHRlci1sZWRnZXInO1xuaW1wb3J0IHsgTWF0aFdhbGxldEFkYXB0ZXIgfSBmcm9tICdAc29sYW5hL3dhbGxldC1hZGFwdGVyLW1hdGh3YWxsZXQnO1xuaW1wb3J0IHsgVG9rZW5Qb2NrZXRXYWxsZXRBZGFwdGVyIH0gZnJvbSAnQHNvbGFuYS93YWxsZXQtYWRhcHRlci10b2tlbnBvY2tldCc7XG4vLyBpbXBvcnQgeyBVbnNhZmVCdXJuZXJXYWxsZXRBZGFwdGVyIH0gZnJvbSBcIkBzb2xhbmEvd2FsbGV0LWFkYXB0ZXItd2FsbGV0c1wiO1xuXG4vLyBEZWZhdWx0IHN0eWxlcyB0aGF0IGNhbiBiZSBvdmVycmlkZGVuIGJ5IHlvdXIgYXBwXG5yZXF1aXJlKFwiQHNvbGFuYS93YWxsZXQtYWRhcHRlci1yZWFjdC11aS9zdHlsZXMuY3NzXCIpO1xucmVxdWlyZShcIkBoZWFkbGVzc3VpL3RhaWx3aW5kY3NzXCIpXG5yZXF1aXJlKFwiLi9sb2FkaW5nLmNzc1wiKVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWluKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xuICBjb25zdCBlbmRwb2ludCA9IHVzZU1lbW8oKCkgPT4gXCJodHRwczovL2ZsdWVudC1yb3VnaC1yZXNvbmFuY2Uuc29sYW5hLW1haW5uZXQucXVpa25vZGUucHJvL2UyMjU0ZTVmNGE0Y2Y1YjRiNmQ0YzI1NzYzNTczZmE1OGJjNjM3ODIvXCIpO1xuXG4gIGNvbnN0IHdhbGxldHMgPSB1c2VNZW1vKCgpID0+IFtcbiAgICBuZXcgU29sZmxhcmVXYWxsZXRBZGFwdGVyKCksXG4gICAgbmV3IFBoYW50b21XYWxsZXRBZGFwdGVyKCksXG4gICAgbmV3IFRydXN0V2FsbGV0QWRhcHRlcigpLFxuICAgIG5ldyBNYWdpY0VkZW5XYWxsZXRBZGFwdGVyKCksXG4gICAgbmV3IFRvcnVzV2FsbGV0QWRhcHRlcigpLFxuICAgIG5ldyBMZWRnZXJXYWxsZXRBZGFwdGVyKCksXG4gICAgbmV3IE1hdGhXYWxsZXRBZGFwdGVyKCksXG4gICAgbmV3IFRva2VuUG9ja2V0V2FsbGV0QWRhcHRlcigpXG4gIF0sIFtlbmRwb2ludF0pO1xuXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPENvbm5lY3Rpb25Qcm92aWRlciAgZW5kcG9pbnQ9e2VuZHBvaW50fT5cbiAgICAgICAgPFdhbGxldFByb3ZpZGVyIHdhbGxldHM9e3dhbGxldHN9PlxuICAgICAgICAgIDxXYWxsZXRNb2RhbFByb3ZpZGVyPlxuICAgICAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgICAgIDwvV2FsbGV0TW9kYWxQcm92aWRlcj5cbiAgICAgICAgPC9XYWxsZXRQcm92aWRlcj5cbiAgICAgIDwvQ29ubmVjdGlvblByb3ZpZGVyPlxuICAgIDwvZGl2PlxuICApXG59XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VNZW1vIiwiQ29ubmVjdGlvblByb3ZpZGVyIiwidXNlV2FsbGV0IiwiV2FsbGV0UHJvdmlkZXIiLCJXYWxsZXRBZGFwdGVyTmV0d29yayIsIldhbGxldE1vZGFsUHJvdmlkZXIiLCJjbHVzdGVyQXBpVXJsIiwidXNlUHJvZ3JhbSIsImNyZWF0ZURlZmF1bHRBZGRyZXNzU2VsZWN0b3IiLCJjcmVhdGVEZWZhdWx0QXV0aG9yaXphdGlvblJlc3VsdENhY2hlIiwiY3JlYXRlRGVmYXVsdFdhbGxldE5vdEZvdW5kSGFuZGxlciIsIlNvbGFuYU1vYmlsZVdhbGxldEFkYXB0ZXIiLCJTb2xmbGFyZVdhbGxldEFkYXB0ZXIiLCJQaGFudG9tV2FsbGV0QWRhcHRlciIsIlRydXN0V2FsbGV0QWRhcHRlciIsIk1hZ2ljRWRlbldhbGxldEFkYXB0ZXIiLCJUb3J1c1dhbGxldEFkYXB0ZXIiLCJMZWRnZXJXYWxsZXRBZGFwdGVyIiwiTWF0aFdhbGxldEFkYXB0ZXIiLCJUb2tlblBvY2tldFdhbGxldEFkYXB0ZXIiLCJyZXF1aXJlIiwibWFpbiIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsImVuZHBvaW50Iiwid2FsbGV0cyIsImRpdiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./pages/loading.css":
/*!***************************!*\
  !*** ./pages/loading.css ***!
  \***************************/
/***/ (() => {



/***/ }),

/***/ "./public/App.css":
/*!************************!*\
  !*** ./public/App.css ***!
  \************************/
/***/ (() => {



/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "@headlessui/tailwindcss":
/*!******************************************!*\
  !*** external "@headlessui/tailwindcss" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@headlessui/tailwindcss");

/***/ }),

/***/ "@solana/web3.js":
/*!**********************************!*\
  !*** external "@solana/web3.js" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@solana/web3.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "@solana-mobile/wallet-adapter-mobile":
/*!*******************************************************!*\
  !*** external "@solana-mobile/wallet-adapter-mobile" ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@solana-mobile/wallet-adapter-mobile");;

/***/ }),

/***/ "@solana/wallet-adapter-base":
/*!**********************************************!*\
  !*** external "@solana/wallet-adapter-base" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-base");;

/***/ }),

/***/ "@solana/wallet-adapter-ledger":
/*!************************************************!*\
  !*** external "@solana/wallet-adapter-ledger" ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-ledger");;

/***/ }),

/***/ "@solana/wallet-adapter-magiceden":
/*!***************************************************!*\
  !*** external "@solana/wallet-adapter-magiceden" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-magiceden");;

/***/ }),

/***/ "@solana/wallet-adapter-mathwallet":
/*!****************************************************!*\
  !*** external "@solana/wallet-adapter-mathwallet" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-mathwallet");;

/***/ }),

/***/ "@solana/wallet-adapter-phantom":
/*!*************************************************!*\
  !*** external "@solana/wallet-adapter-phantom" ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-phantom");;

/***/ }),

/***/ "@solana/wallet-adapter-react":
/*!***********************************************!*\
  !*** external "@solana/wallet-adapter-react" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-react");;

/***/ }),

/***/ "@solana/wallet-adapter-react-ui":
/*!**************************************************!*\
  !*** external "@solana/wallet-adapter-react-ui" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-react-ui");;

/***/ }),

/***/ "@solana/wallet-adapter-solflare":
/*!**************************************************!*\
  !*** external "@solana/wallet-adapter-solflare" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-solflare");;

/***/ }),

/***/ "@solana/wallet-adapter-tokenpocket":
/*!*****************************************************!*\
  !*** external "@solana/wallet-adapter-tokenpocket" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-tokenpocket");;

/***/ }),

/***/ "@solana/wallet-adapter-torus":
/*!***********************************************!*\
  !*** external "@solana/wallet-adapter-torus" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-torus");;

/***/ }),

/***/ "@solana/wallet-adapter-trust":
/*!***********************************************!*\
  !*** external "@solana/wallet-adapter-trust" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-trust");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/@solana"], () => (__webpack_exec__("./pages/_app.js")));
module.exports = __webpack_exports__;

})();