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
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ main)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _public_App_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/public/App.css */ \"./public/App.css\");\n/* harmony import */ var _public_App_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_public_App_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @solana/wallet-adapter-react */ \"@solana/wallet-adapter-react\");\n/* harmony import */ var _solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @solana/wallet-adapter-base */ \"@solana/wallet-adapter-base\");\n/* harmony import */ var _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @solana/wallet-adapter-react-ui */ \"@solana/wallet-adapter-react-ui\");\n/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @solana/web3.js */ \"@solana/web3.js\");\n/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_solana_web3_js__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _components_hooks_useProgram__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/components/hooks/useProgram */ \"./components/hooks/useProgram.js\");\n/* harmony import */ var _solana_mobile_wallet_adapter_mobile__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @solana-mobile/wallet-adapter-mobile */ \"@solana-mobile/wallet-adapter-mobile\");\n/* harmony import */ var _solana_wallet_adapter_solflare__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @solana/wallet-adapter-solflare */ \"@solana/wallet-adapter-solflare\");\n/* harmony import */ var _solana_wallet_adapter_phantom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @solana/wallet-adapter-phantom */ \"@solana/wallet-adapter-phantom\");\n/* harmony import */ var _solana_wallet_adapter_trust__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @solana/wallet-adapter-trust */ \"@solana/wallet-adapter-trust\");\n/* harmony import */ var _solana_wallet_adapter_magiceden__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @solana/wallet-adapter-magiceden */ \"@solana/wallet-adapter-magiceden\");\n/* harmony import */ var _solana_wallet_adapter_torus__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @solana/wallet-adapter-torus */ \"@solana/wallet-adapter-torus\");\n/* harmony import */ var _solana_wallet_adapter_ledger__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @solana/wallet-adapter-ledger */ \"@solana/wallet-adapter-ledger\");\n/* harmony import */ var _solana_wallet_adapter_mathwallet__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @solana/wallet-adapter-mathwallet */ \"@solana/wallet-adapter-mathwallet\");\n/* harmony import */ var _solana_wallet_adapter_tokenpocket__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @solana/wallet-adapter-tokenpocket */ \"@solana/wallet-adapter-tokenpocket\");\n/* harmony import */ var _utils_supabase__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @/utils/supabase */ \"./utils/supabase.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! next/navigation */ \"./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_19__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_4__, _solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_5__, _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_6__, _components_hooks_useProgram__WEBPACK_IMPORTED_MODULE_8__, _solana_mobile_wallet_adapter_mobile__WEBPACK_IMPORTED_MODULE_9__, _solana_wallet_adapter_solflare__WEBPACK_IMPORTED_MODULE_10__, _solana_wallet_adapter_phantom__WEBPACK_IMPORTED_MODULE_11__, _solana_wallet_adapter_trust__WEBPACK_IMPORTED_MODULE_12__, _solana_wallet_adapter_magiceden__WEBPACK_IMPORTED_MODULE_13__, _solana_wallet_adapter_torus__WEBPACK_IMPORTED_MODULE_14__, _solana_wallet_adapter_ledger__WEBPACK_IMPORTED_MODULE_15__, _solana_wallet_adapter_mathwallet__WEBPACK_IMPORTED_MODULE_16__, _solana_wallet_adapter_tokenpocket__WEBPACK_IMPORTED_MODULE_17__]);\n([_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_4__, _solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_5__, _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_6__, _components_hooks_useProgram__WEBPACK_IMPORTED_MODULE_8__, _solana_mobile_wallet_adapter_mobile__WEBPACK_IMPORTED_MODULE_9__, _solana_wallet_adapter_solflare__WEBPACK_IMPORTED_MODULE_10__, _solana_wallet_adapter_phantom__WEBPACK_IMPORTED_MODULE_11__, _solana_wallet_adapter_trust__WEBPACK_IMPORTED_MODULE_12__, _solana_wallet_adapter_magiceden__WEBPACK_IMPORTED_MODULE_13__, _solana_wallet_adapter_torus__WEBPACK_IMPORTED_MODULE_14__, _solana_wallet_adapter_ledger__WEBPACK_IMPORTED_MODULE_15__, _solana_wallet_adapter_mathwallet__WEBPACK_IMPORTED_MODULE_16__, _solana_wallet_adapter_tokenpocket__WEBPACK_IMPORTED_MODULE_17__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\n // Add necessary styles here\n// Client Components:\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n// import { UnsafeBurnerWalletAdapter } from \"@solana/wallet-adapter-wallets\";\n// Default styles that can be overridden by your app\n__webpack_require__(/*! @solana/wallet-adapter-react-ui/styles.css */ \"./node_modules/@solana/wallet-adapter-react-ui/styles.css\");\n__webpack_require__(/*! @headlessui/tailwindcss */ \"@headlessui/tailwindcss\");\n__webpack_require__(/*! ./loading.css */ \"./pages/loading.css\");\nfunction main({ Component, pageProps }) {\n    const endpoint = (0,react__WEBPACK_IMPORTED_MODULE_3__.useMemo)(()=>\"https://fluent-rough-resonance.solana-mainnet.quiknode.pro/e2254e5f4a4cf5b4b6d4c25763573fa58bc63782/\");\n    const wallets = (0,react__WEBPACK_IMPORTED_MODULE_3__.useMemo)(()=>[\n            new _solana_wallet_adapter_solflare__WEBPACK_IMPORTED_MODULE_10__.SolflareWalletAdapter(),\n            new _solana_wallet_adapter_phantom__WEBPACK_IMPORTED_MODULE_11__.PhantomWalletAdapter(),\n            new _solana_wallet_adapter_trust__WEBPACK_IMPORTED_MODULE_12__.TrustWalletAdapter(),\n            new _solana_wallet_adapter_magiceden__WEBPACK_IMPORTED_MODULE_13__.MagicEdenWalletAdapter(),\n            new _solana_wallet_adapter_torus__WEBPACK_IMPORTED_MODULE_14__.TorusWalletAdapter(),\n            new _solana_wallet_adapter_ledger__WEBPACK_IMPORTED_MODULE_15__.LedgerWalletAdapter(),\n            new _solana_wallet_adapter_mathwallet__WEBPACK_IMPORTED_MODULE_16__.MathWalletAdapter(),\n            new _solana_wallet_adapter_tokenpocket__WEBPACK_IMPORTED_MODULE_17__.TokenPocketWalletAdapter()\n        ], [\n        endpoint\n    ]);\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({});\n    const route = (0,next_navigation__WEBPACK_IMPORTED_MODULE_19__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        _utils_supabase__WEBPACK_IMPORTED_MODULE_18__.supabase.auth.getUser().then((res)=>{\n            setUser((e)=>{\n                console.log(res);\n                if (res.data.user !== null) {\n                    return res.data.user.user_metadata;\n                } else {\n                    route.replace(\"/login\");\n                }\n            });\n        }).catch((err)=>{});\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_4__.ConnectionProvider, {\n            endpoint: endpoint,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_4__.WalletProvider, {\n                wallets: wallets,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_6__.WalletModalProvider, {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                        ...pageProps,\n                        user: user\n                    }, void 0, false, {\n                        fileName: \"D:\\\\projek anyar\\\\Project\\\\tetris-chain\\\\tetrischain-app\\\\pages\\\\_app.js\",\n                        lineNumber: 78,\n                        columnNumber: 13\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"D:\\\\projek anyar\\\\Project\\\\tetris-chain\\\\tetrischain-app\\\\pages\\\\_app.js\",\n                    lineNumber: 77,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"D:\\\\projek anyar\\\\Project\\\\tetris-chain\\\\tetrischain-app\\\\pages\\\\_app.js\",\n                lineNumber: 76,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"D:\\\\projek anyar\\\\Project\\\\tetris-chain\\\\tetrischain-app\\\\pages\\\\_app.js\",\n            lineNumber: 75,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"D:\\\\projek anyar\\\\Project\\\\tetris-chain\\\\tetrischain-app\\\\pages\\\\_app.js\",\n        lineNumber: 74,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFNkI7QUFDSCxDQUFDLDRCQUE0QjtBQUt2RCxxQkFBcUI7QUFFdUM7QUFLdEI7QUFDNkI7QUFDRztBQUN0QjtBQUNXO0FBQytIO0FBQ2pIO0FBQ0g7QUFDSjtBQUNRO0FBQ1I7QUFDRTtBQUNFO0FBQ1E7QUFDbEM7QUFDQTtBQUM1Qyw4RUFBOEU7QUFFOUUsb0RBQW9EO0FBQ3BEeUIsbUJBQU9BLENBQUMsNkdBQTRDO0FBQ3BEQSxtQkFBT0EsQ0FBQyx3REFBeUI7QUFDakNBLG1CQUFPQSxDQUFDLDBDQUFlO0FBRVIsU0FBU0MsS0FBSyxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBRTtJQUNuRCxNQUFNQyxXQUFXM0IsOENBQU9BLENBQUMsSUFBTTtJQUUvQixNQUFNNEIsVUFBVTVCLDhDQUFPQSxDQUFDLElBQU07WUFDNUIsSUFBSWEsbUZBQXFCQTtZQUN6QixJQUFJQyxpRkFBb0JBO1lBQ3hCLElBQUlDLDZFQUFrQkE7WUFDdEIsSUFBSUMscUZBQXNCQTtZQUMxQixJQUFJQyw2RUFBa0JBO1lBQ3RCLElBQUlDLCtFQUFtQkE7WUFDdkIsSUFBSUMsaUZBQWlCQTtZQUNyQixJQUFJQyx5RkFBd0JBO1NBQzdCLEVBQUU7UUFBQ087S0FBUztJQUViLE1BQU0sQ0FBQ0UsTUFBTUMsUUFBUSxHQUFHN0IsK0NBQVFBLENBQUMsQ0FBQztJQUNsQyxNQUFNOEIsUUFBUVQsMkRBQVNBO0lBQ3ZCdkIsZ0RBQVNBLENBQUM7UUFFUnNCLHNEQUFRQSxDQUFDVyxJQUFJLENBQUNDLE9BQU8sR0FBR0MsSUFBSSxDQUFDLENBQUNDO1lBQzVCTCxRQUFRTSxDQUFBQTtnQkFDTkMsUUFBUUMsR0FBRyxDQUFDSDtnQkFDWixJQUFHQSxJQUFJSSxJQUFJLENBQUNWLElBQUksS0FBSyxNQUFLO29CQUV4QixPQUFPTSxJQUFJSSxJQUFJLENBQUNWLElBQUksQ0FBQ1csYUFBYTtnQkFDcEMsT0FBTztvQkFDTFQsTUFBTVUsT0FBTyxDQUFDO2dCQUNoQjtZQUVGO1FBQ0YsR0FDQ0MsS0FBSyxDQUFFQyxDQUFBQSxPQUNSO0lBQ0YsR0FBRyxFQUFFO0lBRUwscUJBQ0UsOERBQUNDO2tCQUNDLDRFQUFDMUMsNEVBQWtCQTtZQUFDeUIsVUFBVUE7c0JBQzVCLDRFQUFDdkIsd0VBQWNBO2dCQUFDd0IsU0FBU0E7MEJBQ3ZCLDRFQUFDdEIsZ0ZBQW1CQTs4QkFDbEIsNEVBQUNtQjt3QkFBVyxHQUFHQyxTQUFTO3dCQUFFRyxNQUFNQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNNUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mdXR1cmlzdGljLXRldHJpcy8uL3BhZ2VzL19hcHAuanM/ZTBhZCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCdcclxuXHJcbmltcG9ydCAnQC9zdHlsZXMvZ2xvYmFscy5jc3MnXHJcbmltcG9ydCAnQC9wdWJsaWMvQXBwLmNzcyc7IC8vIEFkZCBuZWNlc3Nhcnkgc3R5bGVzIGhlcmVcclxuXHJcblxyXG5cclxuXHJcbi8vIENsaWVudCBDb21wb25lbnRzOlxyXG5cclxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHtcclxuICBDb25uZWN0aW9uUHJvdmlkZXIsXHJcbiAgdXNlV2FsbGV0LFxyXG4gIFdhbGxldFByb3ZpZGVyLFxyXG59IGZyb20gXCJAc29sYW5hL3dhbGxldC1hZGFwdGVyLXJlYWN0XCI7XHJcbmltcG9ydCB7IFdhbGxldEFkYXB0ZXJOZXR3b3JrIH0gZnJvbSBcIkBzb2xhbmEvd2FsbGV0LWFkYXB0ZXItYmFzZVwiO1xyXG5pbXBvcnQgeyBXYWxsZXRNb2RhbFByb3ZpZGVyIH0gZnJvbSBcIkBzb2xhbmEvd2FsbGV0LWFkYXB0ZXItcmVhY3QtdWlcIjtcclxuaW1wb3J0IHsgY2x1c3RlckFwaVVybCB9IGZyb20gXCJAc29sYW5hL3dlYjMuanNcIjtcclxuaW1wb3J0IHsgdXNlUHJvZ3JhbSB9IGZyb20gJ0AvY29tcG9uZW50cy9ob29rcy91c2VQcm9ncmFtJztcclxuaW1wb3J0IHsgY3JlYXRlRGVmYXVsdEFkZHJlc3NTZWxlY3RvciwgY3JlYXRlRGVmYXVsdEF1dGhvcml6YXRpb25SZXN1bHRDYWNoZSwgY3JlYXRlRGVmYXVsdFdhbGxldE5vdEZvdW5kSGFuZGxlciwgU29sYW5hTW9iaWxlV2FsbGV0QWRhcHRlciB9IGZyb20gJ0Bzb2xhbmEtbW9iaWxlL3dhbGxldC1hZGFwdGVyLW1vYmlsZSc7XHJcbmltcG9ydCB7IFNvbGZsYXJlV2FsbGV0QWRhcHRlciwgfSBmcm9tICdAc29sYW5hL3dhbGxldC1hZGFwdGVyLXNvbGZsYXJlJztcclxuaW1wb3J0IHsgUGhhbnRvbVdhbGxldEFkYXB0ZXIgfSBmcm9tICdAc29sYW5hL3dhbGxldC1hZGFwdGVyLXBoYW50b20nO1xyXG5pbXBvcnQgeyBUcnVzdFdhbGxldEFkYXB0ZXIgfSBmcm9tICdAc29sYW5hL3dhbGxldC1hZGFwdGVyLXRydXN0JztcclxuaW1wb3J0IHsgTWFnaWNFZGVuV2FsbGV0QWRhcHRlciB9IGZyb20gJ0Bzb2xhbmEvd2FsbGV0LWFkYXB0ZXItbWFnaWNlZGVuJztcclxuaW1wb3J0IHsgVG9ydXNXYWxsZXRBZGFwdGVyIH0gZnJvbSAnQHNvbGFuYS93YWxsZXQtYWRhcHRlci10b3J1cyc7XHJcbmltcG9ydCB7IExlZGdlcldhbGxldEFkYXB0ZXIgfSBmcm9tICdAc29sYW5hL3dhbGxldC1hZGFwdGVyLWxlZGdlcic7XHJcbmltcG9ydCB7IE1hdGhXYWxsZXRBZGFwdGVyIH0gZnJvbSAnQHNvbGFuYS93YWxsZXQtYWRhcHRlci1tYXRod2FsbGV0JztcclxuaW1wb3J0IHsgVG9rZW5Qb2NrZXRXYWxsZXRBZGFwdGVyIH0gZnJvbSAnQHNvbGFuYS93YWxsZXQtYWRhcHRlci10b2tlbnBvY2tldCc7XHJcbmltcG9ydCB7IHN1cGFiYXNlIH0gZnJvbSAnQC91dGlscy9zdXBhYmFzZSc7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvbmF2aWdhdGlvbic7XHJcbi8vIGltcG9ydCB7IFVuc2FmZUJ1cm5lcldhbGxldEFkYXB0ZXIgfSBmcm9tIFwiQHNvbGFuYS93YWxsZXQtYWRhcHRlci13YWxsZXRzXCI7XHJcblxyXG4vLyBEZWZhdWx0IHN0eWxlcyB0aGF0IGNhbiBiZSBvdmVycmlkZGVuIGJ5IHlvdXIgYXBwXHJcbnJlcXVpcmUoXCJAc29sYW5hL3dhbGxldC1hZGFwdGVyLXJlYWN0LXVpL3N0eWxlcy5jc3NcIik7XHJcbnJlcXVpcmUoXCJAaGVhZGxlc3N1aS90YWlsd2luZGNzc1wiKVxyXG5yZXF1aXJlKFwiLi9sb2FkaW5nLmNzc1wiKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFpbih7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcclxuICBjb25zdCBlbmRwb2ludCA9IHVzZU1lbW8oKCkgPT4gXCJodHRwczovL2ZsdWVudC1yb3VnaC1yZXNvbmFuY2Uuc29sYW5hLW1haW5uZXQucXVpa25vZGUucHJvL2UyMjU0ZTVmNGE0Y2Y1YjRiNmQ0YzI1NzYzNTczZmE1OGJjNjM3ODIvXCIpO1xyXG5cclxuICBjb25zdCB3YWxsZXRzID0gdXNlTWVtbygoKSA9PiBbXHJcbiAgICBuZXcgU29sZmxhcmVXYWxsZXRBZGFwdGVyKCksXHJcbiAgICBuZXcgUGhhbnRvbVdhbGxldEFkYXB0ZXIoKSxcclxuICAgIG5ldyBUcnVzdFdhbGxldEFkYXB0ZXIoKSxcclxuICAgIG5ldyBNYWdpY0VkZW5XYWxsZXRBZGFwdGVyKCksXHJcbiAgICBuZXcgVG9ydXNXYWxsZXRBZGFwdGVyKCksXHJcbiAgICBuZXcgTGVkZ2VyV2FsbGV0QWRhcHRlcigpLFxyXG4gICAgbmV3IE1hdGhXYWxsZXRBZGFwdGVyKCksXHJcbiAgICBuZXcgVG9rZW5Qb2NrZXRXYWxsZXRBZGFwdGVyKClcclxuICBdLCBbZW5kcG9pbnRdKTtcclxuXHJcbiAgY29uc3QgW3VzZXIsIHNldFVzZXJdID0gdXNlU3RhdGUoe30pO1xyXG4gIGNvbnN0IHJvdXRlID0gdXNlUm91dGVyKClcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG5cclxuICAgIHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICBzZXRVc2VyKGUgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgaWYocmVzLmRhdGEudXNlciAhPT0gbnVsbCl7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIHJldHVybiByZXMuZGF0YS51c2VyLnVzZXJfbWV0YWRhdGFcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcm91dGUucmVwbGFjZSgnL2xvZ2luJylcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKChlcnIgPT4ge1xyXG4gICAgfSkpXHJcbiAgfSwgW10pXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8Q29ubmVjdGlvblByb3ZpZGVyIGVuZHBvaW50PXtlbmRwb2ludH0+XHJcbiAgICAgICAgPFdhbGxldFByb3ZpZGVyIHdhbGxldHM9e3dhbGxldHN9PlxyXG4gICAgICAgICAgPFdhbGxldE1vZGFsUHJvdmlkZXI+XHJcbiAgICAgICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gdXNlcj17dXNlcn0gLz5cclxuICAgICAgICAgIDwvV2FsbGV0TW9kYWxQcm92aWRlcj5cclxuICAgICAgICA8L1dhbGxldFByb3ZpZGVyPlxyXG4gICAgICA8L0Nvbm5lY3Rpb25Qcm92aWRlcj5cclxuICAgIDwvZGl2PlxyXG4gIClcclxufVxyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VNZW1vIiwidXNlU3RhdGUiLCJDb25uZWN0aW9uUHJvdmlkZXIiLCJ1c2VXYWxsZXQiLCJXYWxsZXRQcm92aWRlciIsIldhbGxldEFkYXB0ZXJOZXR3b3JrIiwiV2FsbGV0TW9kYWxQcm92aWRlciIsImNsdXN0ZXJBcGlVcmwiLCJ1c2VQcm9ncmFtIiwiY3JlYXRlRGVmYXVsdEFkZHJlc3NTZWxlY3RvciIsImNyZWF0ZURlZmF1bHRBdXRob3JpemF0aW9uUmVzdWx0Q2FjaGUiLCJjcmVhdGVEZWZhdWx0V2FsbGV0Tm90Rm91bmRIYW5kbGVyIiwiU29sYW5hTW9iaWxlV2FsbGV0QWRhcHRlciIsIlNvbGZsYXJlV2FsbGV0QWRhcHRlciIsIlBoYW50b21XYWxsZXRBZGFwdGVyIiwiVHJ1c3RXYWxsZXRBZGFwdGVyIiwiTWFnaWNFZGVuV2FsbGV0QWRhcHRlciIsIlRvcnVzV2FsbGV0QWRhcHRlciIsIkxlZGdlcldhbGxldEFkYXB0ZXIiLCJNYXRoV2FsbGV0QWRhcHRlciIsIlRva2VuUG9ja2V0V2FsbGV0QWRhcHRlciIsInN1cGFiYXNlIiwidXNlUm91dGVyIiwicmVxdWlyZSIsIm1haW4iLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJlbmRwb2ludCIsIndhbGxldHMiLCJ1c2VyIiwic2V0VXNlciIsInJvdXRlIiwiYXV0aCIsImdldFVzZXIiLCJ0aGVuIiwicmVzIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJkYXRhIiwidXNlcl9tZXRhZGF0YSIsInJlcGxhY2UiLCJjYXRjaCIsImVyciIsImRpdiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./utils/supabase.js":
/*!***************************!*\
  !*** ./utils/supabase.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   supabase: () => (/* binding */ supabase)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"@supabase/supabase-js\");\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__);\n\nconst supabaseUrl = \"https://qoqfpqknnfriczvanaim.supabase.co\";\nconst supabaseKey = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvcWZwcWtubmZyaWN6dmFuYWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NjEwMDYsImV4cCI6MjA2NjUzNzAwNn0.qwdSJ-9c3lirFhSWIGNpolzrwvBHkb4FJ6UnxJvSrHM\";\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseKey);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlscy9zdXBhYmFzZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBcUQ7QUFFckQsTUFBTUMsY0FBY0MsMENBQW9DO0FBQ3hELE1BQU1HLGNBQWNILGtOQUF5QztBQUV0RCxNQUFNSyxXQUFXUCxtRUFBWUEsQ0FBQ0MsYUFBYUksYUFBYSIsInNvdXJjZXMiOlsid2VicGFjazovL2Z1dHVyaXN0aWMtdGV0cmlzLy4vdXRpbHMvc3VwYWJhc2UuanM/NDA2ZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tIFwiQHN1cGFiYXNlL3N1cGFiYXNlLWpzXCI7XHJcblxyXG5jb25zdCBzdXBhYmFzZVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTDtcclxuY29uc3Qgc3VwYWJhc2VLZXkgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWTtcclxuXHJcbmV4cG9ydCBjb25zdCBzdXBhYmFzZSA9IGNyZWF0ZUNsaWVudChzdXBhYmFzZVVybCwgc3VwYWJhc2VLZXkpOyJdLCJuYW1lcyI6WyJjcmVhdGVDbGllbnQiLCJzdXBhYmFzZVVybCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwiLCJzdXBhYmFzZUtleSIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZIiwic3VwYWJhc2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./utils/supabase.js\n");

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

/***/ "@supabase/supabase-js":
/*!****************************************!*\
  !*** external "@supabase/supabase-js" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@supabase/supabase-js");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "./request-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist\\client\\components\\request-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist\\client\\components\\request-async-storage.external.js");

/***/ }),

/***/ "./static-generation-async-storage.external":
/*!*********************************************************************************************!*\
  !*** external "next/dist\\client\\components\\static-generation-async-storage.external.js" ***!
  \*********************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist\\client\\components\\static-generation-async-storage.external.js");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@solana"], () => (__webpack_exec__("./pages/_app.js")));
module.exports = __webpack_exports__;

})();