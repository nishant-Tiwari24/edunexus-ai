"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./components/ui/FloatingNavbar.tsx":
/*!******************************************!*\
  !*** ./components/ui/FloatingNavbar.tsx ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FloatingNav: function() { return /* binding */ FloatingNav; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! framer-motion */ \"(app-pages-browser)/./node_modules/framer-motion/dist/es/value/use-scroll.mjs\");\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! framer-motion */ \"(app-pages-browser)/./node_modules/framer-motion/dist/es/utils/use-motion-value-event.mjs\");\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! framer-motion */ \"(app-pages-browser)/./node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs\");\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! framer-motion */ \"(app-pages-browser)/./node_modules/framer-motion/dist/es/render/dom/motion.mjs\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/utils */ \"(app-pages-browser)/./lib/utils.ts\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next-auth/react */ \"(app-pages-browser)/./node_modules/next-auth/react/index.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_4__);\n/* __next_internal_client_entry_do_not_use__ FloatingNav auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nconst FloatingNav = (param)=>{\n    let { navItems, className } = param;\n    _s();\n    const { scrollYProgress } = (0,framer_motion__WEBPACK_IMPORTED_MODULE_5__.useScroll)();\n    const [visible, setVisible] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const { data: session, status } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_4__.useSession)();\n    (0,framer_motion__WEBPACK_IMPORTED_MODULE_6__.useMotionValueEvent)(scrollYProgress, \"change\", (current)=>{\n        if (typeof current === \"number\") {\n            let direction = current - scrollYProgress.getPrevious();\n            if (scrollYProgress.get() < 0.05) {\n                setVisible(true);\n            } else {\n                if (direction < 0) {\n                    setVisible(true);\n                } else {\n                    setVisible(false);\n                }\n            }\n        }\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_7__.AnimatePresence, {\n        mode: \"wait\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_8__.motion.div, {\n            initial: {\n                opacity: 1,\n                y: -100\n            },\n            animate: {\n                y: visible ? 0 : -100,\n                opacity: visible ? 1 : 0\n            },\n            transition: {\n                duration: 0.2\n            },\n            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)(\"flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-5 rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-4\", className),\n            style: {\n                backdropFilter: \"blur(16px) saturate(180%)\",\n                backgroundColor: \"rgba(17, 25, 40, 0.75)\",\n                borderRadius: \"12px\",\n                border: \"1px solid rgba(255, 255, 255, 0.125)\"\n            },\n            children: [\n                navItems.map((navItem, idx)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        href: navItem.link,\n                        passHref: true,\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                className: \"text-sm cursor-pointer\",\n                                children: navItem.name\n                            }, void 0, false, {\n                                fileName: \"/Users/nishanttiwari/projects/edunexusai/components/ui/FloatingNavbar.tsx\",\n                                lineNumber: 73,\n                                columnNumber: 15\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"/Users/nishanttiwari/projects/edunexusai/components/ui/FloatingNavbar.tsx\",\n                            lineNumber: 72,\n                            columnNumber: 13\n                        }, undefined)\n                    }, navItem.link, false, {\n                        fileName: \"/Users/nishanttiwari/projects/edunexusai/components/ui/FloatingNavbar.tsx\",\n                        lineNumber: 71,\n                        columnNumber: 11\n                    }, undefined)),\n                session ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex gap-2\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            onClick: ()=>(0,next_auth_react__WEBPACK_IMPORTED_MODULE_4__.signOut)(),\n                            className: \"border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                    children: \"Profile\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/nishanttiwari/projects/edunexusai/components/ui/FloatingNavbar.tsx\",\n                                    lineNumber: 83,\n                                    columnNumber: 13\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                    className: \"absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/nishanttiwari/projects/edunexusai/components/ui/FloatingNavbar.tsx\",\n                                    lineNumber: 84,\n                                    columnNumber: 13\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/nishanttiwari/projects/edunexusai/components/ui/FloatingNavbar.tsx\",\n                            lineNumber: 79,\n                            columnNumber: 13\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            onClick: ()=>(0,next_auth_react__WEBPACK_IMPORTED_MODULE_4__.signOut)(),\n                            className: \"border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                    children: \"Logout\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/nishanttiwari/projects/edunexusai/components/ui/FloatingNavbar.tsx\",\n                                    lineNumber: 91,\n                                    columnNumber: 13\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                    className: \"absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/nishanttiwari/projects/edunexusai/components/ui/FloatingNavbar.tsx\",\n                                    lineNumber: 92,\n                                    columnNumber: 13\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/nishanttiwari/projects/edunexusai/components/ui/FloatingNavbar.tsx\",\n                            lineNumber: 87,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/nishanttiwari/projects/edunexusai/components/ui/FloatingNavbar.tsx\",\n                    lineNumber: 78,\n                    columnNumber: 11\n                }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: ()=>(0,next_auth_react__WEBPACK_IMPORTED_MODULE_4__.signIn)(),\n                        className: \"border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                children: \"Login\"\n                            }, void 0, false, {\n                                fileName: \"/Users/nishanttiwari/projects/edunexusai/components/ui/FloatingNavbar.tsx\",\n                                lineNumber: 101,\n                                columnNumber: 13\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                className: \"absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px\"\n                            }, void 0, false, {\n                                fileName: \"/Users/nishanttiwari/projects/edunexusai/components/ui/FloatingNavbar.tsx\",\n                                lineNumber: 102,\n                                columnNumber: 13\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/nishanttiwari/projects/edunexusai/components/ui/FloatingNavbar.tsx\",\n                        lineNumber: 97,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"/Users/nishanttiwari/projects/edunexusai/components/ui/FloatingNavbar.tsx\",\n                    lineNumber: 96,\n                    columnNumber: 11\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/nishanttiwari/projects/edunexusai/components/ui/FloatingNavbar.tsx\",\n            lineNumber: 47,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/nishanttiwari/projects/edunexusai/components/ui/FloatingNavbar.tsx\",\n        lineNumber: 46,\n        columnNumber: 5\n    }, undefined);\n};\n_s(FloatingNav, \"Rv+l7p93w/bF/H5VpTNfFomcQlM=\", false, function() {\n    return [\n        framer_motion__WEBPACK_IMPORTED_MODULE_5__.useScroll,\n        next_auth_react__WEBPACK_IMPORTED_MODULE_4__.useSession,\n        framer_motion__WEBPACK_IMPORTED_MODULE_6__.useMotionValueEvent\n    ];\n});\n_c = FloatingNav;\nvar _c;\n$RefreshReg$(_c, \"FloatingNav\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvdWkvRmxvYXRpbmdOYXZiYXIudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ3dDO0FBTWpCO0FBQ007QUFDSTtBQUM0QjtBQUV0RCxNQUFNVyxjQUFjO1FBQUMsRUFDMUJDLFFBQVEsRUFDUkMsU0FBUyxFQVFWOztJQUNDLE1BQU0sRUFBRUMsZUFBZSxFQUFFLEdBQUdWLHdEQUFTQTtJQUVyQyxNQUFNLENBQUNXLFNBQVNDLFdBQVcsR0FBR2YsK0NBQVFBLENBQUM7SUFDdkMsTUFBTSxFQUFFZ0IsTUFBTUMsT0FBTyxFQUFFQyxNQUFNLEVBQUUsR0FBR1YsMkRBQVVBO0lBRTVDSixrRUFBbUJBLENBQUNTLGlCQUFpQixVQUFVLENBQUNNO1FBQzlDLElBQUksT0FBT0EsWUFBWSxVQUFVO1lBQy9CLElBQUlDLFlBQVlELFVBQVdOLGdCQUFnQlEsV0FBVztZQUV0RCxJQUFJUixnQkFBZ0JTLEdBQUcsS0FBSyxNQUFNO2dCQUNoQ1AsV0FBVztZQUNiLE9BQU87Z0JBQ0wsSUFBSUssWUFBWSxHQUFHO29CQUNqQkwsV0FBVztnQkFDYixPQUFPO29CQUNMQSxXQUFXO2dCQUNiO1lBQ0Y7UUFDRjtJQUNGO0lBRUEscUJBQ0UsOERBQUNiLDBEQUFlQTtRQUFDcUIsTUFBSztrQkFDcEIsNEVBQUN0QixpREFBTUEsQ0FBQ3VCLEdBQUc7WUFDVEMsU0FBUztnQkFDUEMsU0FBUztnQkFDVEMsR0FBRyxDQUFDO1lBQ047WUFDQUMsU0FBUztnQkFDUEQsR0FBR2IsVUFBVSxJQUFJLENBQUM7Z0JBQ2xCWSxTQUFTWixVQUFVLElBQUk7WUFDekI7WUFDQWUsWUFBWTtnQkFDVkMsVUFBVTtZQUNaO1lBQ0FsQixXQUFXTiw4Q0FBRUEsQ0FDWCw0UkFDQU07WUFFRm1CLE9BQU87Z0JBQ0xDLGdCQUFnQjtnQkFDaEJDLGlCQUFpQjtnQkFDakJDLGNBQWM7Z0JBQ2RDLFFBQVE7WUFDVjs7Z0JBRUN4QixTQUFTeUIsR0FBRyxDQUFDLENBQUNDLFNBQVNDLG9CQUN0Qiw4REFBQ2pDLGlEQUFJQTt3QkFBb0JrQyxNQUFNRixRQUFRRyxJQUFJO3dCQUFFQyxRQUFRO2tDQUNuRCw0RUFBQ0M7NEJBQUU5QixXQUFVO3NDQUNYLDRFQUFDK0I7Z0NBQUsvQixXQUFVOzBDQUEwQnlCLFFBQVFPLElBQUk7Ozs7Ozs7Ozs7O3VCQUYvQ1AsUUFBUUcsSUFBSTs7Ozs7Z0JBTXhCdkIsd0JBQ0MsOERBQUNPO29CQUFJWixXQUFVOztzQ0FDYiw4REFBQ2lDOzRCQUNEQyxTQUFTLElBQU1yQyx3REFBT0E7NEJBQ3RCRyxXQUFVOzs4Q0FFViw4REFBQytCOzhDQUFLOzs7Ozs7OENBQ04sOERBQUNBO29DQUFLL0IsV0FBVTs7Ozs7Ozs7Ozs7O3NDQUdsQiw4REFBQ2lDOzRCQUNDQyxTQUFTLElBQU1yQyx3REFBT0E7NEJBQ3RCRyxXQUFVOzs4Q0FFViw4REFBQytCOzhDQUFLOzs7Ozs7OENBQ04sOERBQUNBO29DQUFLL0IsV0FBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7OENBSWxCLDhEQUFDWTs4QkFDRCw0RUFBQ3FCO3dCQUNDQyxTQUFTLElBQU12Qyx1REFBTUE7d0JBQ3JCSyxXQUFVOzswQ0FFViw4REFBQytCOzBDQUFLOzs7Ozs7MENBQ04sOERBQUNBO2dDQUFLL0IsV0FBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU81QixFQUFFO0dBaEdXRjs7UUFXaUJQLG9EQUFTQTtRQUdISyx1REFBVUE7UUFFNUNKLDhEQUFtQkE7OztLQWhCUk0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy91aS9GbG9hdGluZ05hdmJhci50c3g/MGY2YiJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgbW90aW9uLFxuICBBbmltYXRlUHJlc2VuY2UsXG4gIHVzZVNjcm9sbCxcbiAgdXNlTW90aW9uVmFsdWVFdmVudCxcbn0gZnJvbSBcImZyYW1lci1tb3Rpb25cIjtcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcbmltcG9ydCB7IGNuIH0gZnJvbSBcIkAvbGliL3V0aWxzXCI7XG5pbXBvcnQgeyBzaWduSW4sIHVzZVNlc3Npb24sIHNpZ25PdXQgfSBmcm9tICduZXh0LWF1dGgvcmVhY3QnXG5cbmV4cG9ydCBjb25zdCBGbG9hdGluZ05hdiA9ICh7XG4gIG5hdkl0ZW1zLFxuICBjbGFzc05hbWUsXG59OiB7XG4gIG5hdkl0ZW1zOiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGxpbms6IHN0cmluZztcbiAgICBpY29uPzogSlNYLkVsZW1lbnQ7XG4gIH1bXTtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xufSkgPT4ge1xuICBjb25zdCB7IHNjcm9sbFlQcm9ncmVzcyB9ID0gdXNlU2Nyb2xsKCk7XG5cbiAgY29uc3QgW3Zpc2libGUsIHNldFZpc2libGVdID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IHsgZGF0YTogc2Vzc2lvbiwgc3RhdHVzIH0gPSB1c2VTZXNzaW9uKCk7XG5cbiAgdXNlTW90aW9uVmFsdWVFdmVudChzY3JvbGxZUHJvZ3Jlc3MsIFwiY2hhbmdlXCIsIChjdXJyZW50KSA9PiB7XG4gICAgaWYgKHR5cGVvZiBjdXJyZW50ID09PSBcIm51bWJlclwiKSB7XG4gICAgICBsZXQgZGlyZWN0aW9uID0gY3VycmVudCEgLSBzY3JvbGxZUHJvZ3Jlc3MuZ2V0UHJldmlvdXMoKSE7XG5cbiAgICAgIGlmIChzY3JvbGxZUHJvZ3Jlc3MuZ2V0KCkgPCAwLjA1KSB7XG4gICAgICAgIHNldFZpc2libGUodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZGlyZWN0aW9uIDwgMCkge1xuICAgICAgICAgIHNldFZpc2libGUodHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiAoXG4gICAgPEFuaW1hdGVQcmVzZW5jZSBtb2RlPVwid2FpdFwiPlxuICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgaW5pdGlhbD17e1xuICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgeTogLTEwMCxcbiAgICAgICAgfX1cbiAgICAgICAgYW5pbWF0ZT17e1xuICAgICAgICAgIHk6IHZpc2libGUgPyAwIDogLTEwMCxcbiAgICAgICAgICBvcGFjaXR5OiB2aXNpYmxlID8gMSA6IDAsXG4gICAgICAgIH19XG4gICAgICAgIHRyYW5zaXRpb249e3tcbiAgICAgICAgICBkdXJhdGlvbjogMC4yLFxuICAgICAgICB9fVxuICAgICAgICBjbGFzc05hbWU9e2NuKFxuICAgICAgICAgIFwiZmxleCBtYXgtdy1maXQgbWQ6bWluLXctWzcwdnddIGxnOm1pbi13LWZpdCBmaXhlZCB6LVs1MDAwXSB0b3AtMTAgaW5zZXQteC0wIG14LWF1dG8gcHgtMTAgcHktNSByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItYmxhY2svLjEgc2hhZG93LVswcHhfMnB4XzNweF8tMXB4X3JnYmEoMCwwLDAsMC4xKSwwcHhfMXB4XzBweF8wcHhfcmdiYSgyNSwyOCwzMywwLjAyKSwwcHhfMHB4XzBweF8xcHhfcmdiYSgyNSwyOCwzMywwLjA4KV0gaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNwYWNlLXgtNFwiLFxuICAgICAgICAgIGNsYXNzTmFtZVxuICAgICAgICApfVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGJhY2tkcm9wRmlsdGVyOiBcImJsdXIoMTZweCkgc2F0dXJhdGUoMTgwJSlcIixcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgxNywgMjUsIDQwLCAwLjc1KVwiLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogXCIxMnB4XCIsXG4gICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTI1KVwiLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7bmF2SXRlbXMubWFwKChuYXZJdGVtLCBpZHgpID0+IChcbiAgICAgICAgICA8TGluayBrZXk9e25hdkl0ZW0ubGlua30gaHJlZj17bmF2SXRlbS5saW5rfSBwYXNzSHJlZj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInJlbGF0aXZlIGRhcms6dGV4dC1uZXV0cmFsLTUwIGl0ZW1zLWNlbnRlciBmbGV4IHNwYWNlLXgtMSB0ZXh0LW5ldXRyYWwtNjAwIGRhcms6aG92ZXI6dGV4dC1uZXV0cmFsLTMwMCBob3Zlcjp0ZXh0LW5ldXRyYWwtNTAwXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gY3Vyc29yLXBvaW50ZXJcIj57bmF2SXRlbS5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgICkpfVxuICAgICAgICB7c2Vzc2lvbiA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZ2FwLTJcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNpZ25PdXQoKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImJvcmRlciB0ZXh0LXNtIGZvbnQtbWVkaXVtIHJlbGF0aXZlIGJvcmRlci1uZXV0cmFsLTIwMCBkYXJrOmJvcmRlci13aGl0ZS9bMC4yXSB0ZXh0LWJsYWNrIGRhcms6dGV4dC13aGl0ZSBweC00IHB5LTIgcm91bmRlZC1mdWxsXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3Bhbj5Qcm9maWxlPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQteC0wIHctMS8yIG14LWF1dG8gLWJvdHRvbS1weCBiZy1ncmFkaWVudC10by1yIGZyb20tdHJhbnNwYXJlbnQgdmlhLWJsdWUtNTAwIHRvLXRyYW5zcGFyZW50IGgtcHhcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2lnbk91dCgpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYm9yZGVyIHRleHQtc20gZm9udC1tZWRpdW0gcmVsYXRpdmUgYm9yZGVyLW5ldXRyYWwtMjAwIGRhcms6Ym9yZGVyLXdoaXRlL1swLjJdIHRleHQtYmxhY2sgZGFyazp0ZXh0LXdoaXRlIHB4LTQgcHktMiByb3VuZGVkLWZ1bGxcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuPkxvZ291dDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXgtMCB3LTEvMiBteC1hdXRvIC1ib3R0b20tcHggYmctZ3JhZGllbnQtdG8tciBmcm9tLXRyYW5zcGFyZW50IHZpYS1ibHVlLTUwMCB0by10cmFuc3BhcmVudCBoLXB4XCIgLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNpZ25JbigpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYm9yZGVyIHRleHQtc20gZm9udC1tZWRpdW0gcmVsYXRpdmUgYm9yZGVyLW5ldXRyYWwtMjAwIGRhcms6Ym9yZGVyLXdoaXRlL1swLjJdIHRleHQtYmxhY2sgZGFyazp0ZXh0LXdoaXRlIHB4LTQgcHktMiByb3VuZGVkLWZ1bGxcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuPkxvZ2luPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQteC0wIHctMS8yIG14LWF1dG8gLWJvdHRvbS1weCBiZy1ncmFkaWVudC10by1yIGZyb20tdHJhbnNwYXJlbnQgdmlhLWJsdWUtNTAwIHRvLXRyYW5zcGFyZW50IGgtcHhcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9tb3Rpb24uZGl2PlxuICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxuICApO1xufTtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwibW90aW9uIiwiQW5pbWF0ZVByZXNlbmNlIiwidXNlU2Nyb2xsIiwidXNlTW90aW9uVmFsdWVFdmVudCIsIkxpbmsiLCJjbiIsInNpZ25JbiIsInVzZVNlc3Npb24iLCJzaWduT3V0IiwiRmxvYXRpbmdOYXYiLCJuYXZJdGVtcyIsImNsYXNzTmFtZSIsInNjcm9sbFlQcm9ncmVzcyIsInZpc2libGUiLCJzZXRWaXNpYmxlIiwiZGF0YSIsInNlc3Npb24iLCJzdGF0dXMiLCJjdXJyZW50IiwiZGlyZWN0aW9uIiwiZ2V0UHJldmlvdXMiLCJnZXQiLCJtb2RlIiwiZGl2IiwiaW5pdGlhbCIsIm9wYWNpdHkiLCJ5IiwiYW5pbWF0ZSIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsInN0eWxlIiwiYmFja2Ryb3BGaWx0ZXIiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJSYWRpdXMiLCJib3JkZXIiLCJtYXAiLCJuYXZJdGVtIiwiaWR4IiwiaHJlZiIsImxpbmsiLCJwYXNzSHJlZiIsInAiLCJzcGFuIiwibmFtZSIsImJ1dHRvbiIsIm9uQ2xpY2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/ui/FloatingNavbar.tsx\n"));

/***/ })

});