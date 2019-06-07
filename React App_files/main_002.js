(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./src/App.css":
/*!************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-oneOf-3-1!./node_modules/postcss-loader/src??postcss!./src/App.css ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".App {\r\n    text-align: center;\r\n}\r\n\r\n.App-logo {\r\n    -webkit-animation: App-logo-spin infinite 20s linear;\r\n            animation: App-logo-spin infinite 20s linear;\r\n    height: 40vmin;\r\n    pointer-events: none;\r\n}\r\n\r\n.App-link {\r\n    color: #61dafb;\r\n}\r\n\r\n@-webkit-keyframes App-logo-spin {\r\n    from {\r\n        -webkit-transform: rotate(0deg);\r\n                transform: rotate(0deg);\r\n    }\r\n    to {\r\n        -webkit-transform: rotate(360deg);\r\n                transform: rotate(360deg);\r\n    }\r\n}\r\n\r\n@keyframes App-logo-spin {\r\n    from {\r\n        -webkit-transform: rotate(0deg);\r\n                transform: rotate(0deg);\r\n    }\r\n    to {\r\n        -webkit-transform: rotate(360deg);\r\n                transform: rotate(360deg);\r\n    }\r\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./src/MainPageTB.css":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-oneOf-3-1!./node_modules/postcss-loader/src??postcss!./src/MainPageTB.css ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n.MainPage-format {\r\n    display: block;\r\n    /*font-size: calc(15px + 2vmin);*/\r\n    /*padding: 3vw;*/\r\n   /* min-width: 50vw;\r\n    max-width: 50vw;\r\n    width: 50vw;\r\n    margin-left: 25vw;*/\r\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./src/index.css":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-oneOf-3-1!./node_modules/postcss-loader/src??postcss!./src/index.css ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "body {\r\n    margin: 0;\r\n    padding: 0;\r\n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\",\r\n    \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\",\r\n    sans-serif;\r\n    -webkit-font-smoothing: antialiased;\r\n    -moz-osx-font-smoothing: grayscale;\r\n}\r\n\r\ncode {\r\n    font-family: source-code-pro, Menlo, Monaco, Consolas, \"Courier New\",\r\n    monospace;\r\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./src/AdminPage.js":
/*!**************************!*\
  !*** ./src/AdminPage.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread */ "./node_modules/@babel/runtime/helpers/esm/objectSpread.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/styles/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/Button/index.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/FormControl */ "./node_modules/@material-ui/core/FormControl/index.js");
/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Paper */ "./node_modules/@material-ui/core/Paper/index.js");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var typeface_roboto__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! typeface-roboto */ "./node_modules/typeface-roboto/index.css");
/* harmony import */ var typeface_roboto__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(typeface_roboto__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/Avatar */ "./node_modules/@material-ui/core/Avatar/index.js");
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/Grid/index.js");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/InputLabel */ "./node_modules/@material-ui/core/InputLabel/index.js");
/* harmony import */ var _material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _material_ui_core_Select__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/core/Select */ "./node_modules/@material-ui/core/Select/index.js");
/* harmony import */ var _material_ui_core_Select__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/core/MenuItem */ "./node_modules/@material-ui/core/MenuItem/index.js");
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _material_ui_core_FormHelperText__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/core/FormHelperText */ "./node_modules/@material-ui/core/FormHelperText/index.js");
/* harmony import */ var _material_ui_core_FormHelperText__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_FormHelperText__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _material_ui_core_Input__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/core/Input */ "./node_modules/@material-ui/core/Input/index.js");
/* harmony import */ var _material_ui_core_Input__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Input__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./firebase */ "./src/firebase.js");






var _jsxFileName = "d:\\Documents\\GitHub\\jhdb-cms\\src\\AdminPage.js";














var theme = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__["createMuiTheme"])({
  palette: {
    primary: {
      main: '#c51162'
    }
  }
});

var styles = function styles(theme) {
  return {
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    paper: Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_5__["default"])({}, theme.mixins.gutters(), {
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      width: '70%',
      marginLeft: 'auto',
      marginRight: 'auto'
    }),
    cardColor: {
      backgroundColor: '#fce4ec'
    },
    avatar: {
      margin: 10
    },
    bigAvatar: {
      margin: 10,
      width: 60,
      height: 60
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120
    }
  };
};

var AdminPage =
/*#__PURE__*/
function (_Component) {
  Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(AdminPage, _Component);

  Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(AdminPage, [{
    key: "handleBeforeButtonClick",
    value: function handleBeforeButtonClick() {
      this.props.adminSwap();
    }
  }]);

  function AdminPage(props) {
    var _this;

    Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, AdminPage);

    _this = Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__["default"])(AdminPage).call(this, props));
    _this.state = {
      users: [],
      admin: {},
      authorized: {}
    };
    return _this;
  }

  Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(AdminPage, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      _firebase__WEBPACK_IMPORTED_MODULE_19__["default"].base.syncDoc(_firebase__WEBPACK_IMPORTED_MODULE_19__["default"].db.collection("Users").doc("admin"), {
        context: this,
        state: 'admin',
        withRefs: true
      });
      _firebase__WEBPACK_IMPORTED_MODULE_19__["default"].base.syncDoc(_firebase__WEBPACK_IMPORTED_MODULE_19__["default"].db.collection("Users").doc("authorized"), {
        context: this,
        state: 'authorized',
        withRefs: true
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(evt, user) {
      var admin = this.state.admin;
      var authorized = this.state.authorized;

      switch (evt.target.value) {
        case 1:
          delete admin[user.uid];
          delete authorized[user.uid];
          this.setState({
            admin: admin,
            authorized: authorized
          });
          break;

        case 2:
          delete admin[user.uid];
          authorized[user.uid] = true;
          this.setState({
            admin: admin,
            authorized: authorized
          });
          break;

        case 3:
          admin[user.uid] = true;
          authorized[user.uid] = true;
          this.setState({
            admin: admin,
            authorized: authorized
          });
          break;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var classes = this.props.classes;

      if (Object.keys(this.state.admin) < 1 || Object.keys(this.state.authorized) < 1) {
        return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 126
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h5", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 126
          },
          __self: this
        }, "Loading user data..."));
      }

      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__["MuiThemeProvider"], {
        theme: theme,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 130
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 131
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h1", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 133
        },
        __self: this
      }, " Admin Settings "), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8___default.a, {
        onClick: this.handleBeforeButtonClick.bind(this),
        variant: "outlined",
        color: "primary",
        className: classes.button,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 134
        },
        __self: this
      }, " Back "), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 136
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 137
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_10___default.a, {
        className: classes.paper,
        elevation: 3,
        square: false,
        classes: {
          root: classes.cardColor
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 138
        },
        __self: this
      }, this.props.users.map(function (user) {
        if (!user.uid || user.uid == _firebase__WEBPACK_IMPORTED_MODULE_19__["default"].auth.currentUser.uid) {
          return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 141
            },
            __self: this
          });
        }

        ;
        console.log("elem for user " + user.name);
        return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
          key: user.uid,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 145
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_13___default.a, {
          container: true,
          justify: "center",
          alignItems: "center",
          row: true,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 146
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_12___default.a, {
          alt: user.name,
          src: user.displayPhoto || "http://chittagongit.com/images/generic-user-icon/generic-user-icon-8.jpg",
          className: classes.bigAvatar,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 147
          },
          __self: this
        }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h5", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 149
          },
          __self: this
        }, " ", user.email, " "), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_9___default.a, {
          className: classes.formControl,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 150
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_14___default.a, {
          htmlFor: "role-helper",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 151
          },
          __self: this
        }, "User Role"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_15___default.a, {
          value: _this2.state.admin[user.uid] ? 3 : _this2.state.authorized[user.uid] ? 2 : 1,
          onChange: function onChange(evt) {
            _this2.handleChange(evt, user);
          },
          input: react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Input__WEBPACK_IMPORTED_MODULE_18___default.a, {
            name: "role",
            id: "role-helper",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 155
            },
            __self: this
          }),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 152
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16___default.a, {
          value: "",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 157
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("em", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 158
          },
          __self: this
        }, "User Role")), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16___default.a, {
          value: 1,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 160
          },
          __self: this
        }, "Unauthorized"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16___default.a, {
          value: 2,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 161
          },
          __self: this
        }, "Contributor"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16___default.a, {
          value: 3,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 162
          },
          __self: this
        }, "Admin")), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_FormHelperText__WEBPACK_IMPORTED_MODULE_17___default.a, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 165
          },
          __self: this
        }, "User role"))));
      }))));
    }
  }]);

  return AdminPage;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__["withStyles"])(styles)(AdminPage));

/***/ }),

/***/ "./src/App.css":
/*!*********************!*\
  !*** ./src/App.css ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./App.css */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./src/App.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../node_modules/css-loader??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./App.css */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./src/App.css", function() {
		var newContent = __webpack_require__(/*! !../node_modules/css-loader??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./App.css */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./src/App.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./App.css */ "./src/App.css");
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_App_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ButtonAppBar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ButtonAppBar */ "./src/ButtonAppBar.js");
/* harmony import */ var _MainPageTB__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./MainPageTB */ "./src/MainPageTB.js");
/* harmony import */ var _EditContributionView__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./EditContributionView */ "./src/EditContributionView.js");
/* harmony import */ var _firebase_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./firebase.js */ "./src/firebase.js");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Paper */ "./node_modules/@material-ui/core/Paper/index.js");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _dropbox_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./dropbox.js */ "./src/dropbox.js");
/* harmony import */ var _AdminPage__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./AdminPage */ "./src/AdminPage.js");





var _jsxFileName = "d:\\Documents\\GitHub\\jhdb-cms\\src\\App.js";










var App =
/*#__PURE__*/
function (_Component) {
  Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(App, _Component);

  function App(props) {
    var _this;

    Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, App);

    _this = Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(App).call(this, props));
    _this.state = {
      user: null,
      contributions: [],
      users: [],
      showEditWindow: false,
      showAdminWindow: false,
      //showWindow: false,
      selectedContribution: undefined,
      adminPanel: undefined
    };
    return _this;
  }

  Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(App, [{
    key: "handleUserAuth",
    value: function handleUserAuth(user) {
      this.setState({
        user: user
      });

      if (user) {
        _firebase_js__WEBPACK_IMPORTED_MODULE_10__["default"].base.bindCollection("Contributions", {
          context: this,
          state: 'contributions',
          withRefs: true
        });
        _firebase_js__WEBPACK_IMPORTED_MODULE_10__["default"].base.bindCollection("Users", {
          context: this,
          state: 'users',
          withRefs: true
        });

        if (!_dropbox_js__WEBPACK_IMPORTED_MODULE_12__["default"].app) {
          _dropbox_js__WEBPACK_IMPORTED_MODULE_12__["default"].initialize();
        }
      }
    }
  }, {
    key: "handleUserSignOut",
    value: function handleUserSignOut() {
      if (!window.confirm("Sign out of " + this.state.user.displayName + "?")) {
        return;
      }

      this.setState({
        user: null
      });
      _firebase_js__WEBPACK_IMPORTED_MODULE_10__["default"].auth.signOut();
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      if (!_firebase_js__WEBPACK_IMPORTED_MODULE_10__["default"].app) {
        _firebase_js__WEBPACK_IMPORTED_MODULE_10__["default"].initialize(this.handleUserAuth.bind(this));
      }
    }
  }, {
    key: "windowSwap",
    value: function windowSwap(selectedContribution) {
      this.setState({
        selectedContribution: selectedContribution,
        showEditWindow: !this.state.showEditWindow //showWindow: !this.state.showWindow

      });
    }
  }, {
    key: "adminSwap",
    value: function adminSwap() {
      this.setState({
        //adminPanel: adminPanel,
        showAdminWindow: !this.state.showAdminWindow //showWindow: !this.state.showWindow

      });
    }
  }, {
    key: "render",
    value: function render() {
      var currentWindow = this.state.showAdminWindow ? 2 : this.state.showEditWindow ? 1 : 0;
      var x;
      console.log("Trying to update user");

      if (this.state.user && this.state.user.uid) {
        var user = {
          uid: this.state.user.uid,
          name: this.state.user.displayName,
          email: this.state.user.email,
          displayPhoto: this.state.user.photoURL
        };
        _firebase_js__WEBPACK_IMPORTED_MODULE_10__["default"].base.addToCollection('Users', user, this.state.user.uid);
      }

      switch (currentWindow) {
        case 1:
          x = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_EditContributionView__WEBPACK_IMPORTED_MODULE_9__["default"], {
            selectedContribution: this.state.selectedContribution,
            windowSwap: this.windowSwap.bind(this),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 99
            },
            __self: this
          });
          break;

        case 2:
          x = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_AdminPage__WEBPACK_IMPORTED_MODULE_13__["default"], {
            adminPanel: this.state.adminPanel,
            users: this.state.users,
            adminSwap: this.adminSwap.bind(this),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 103
            },
            __self: this
          });
          break;

        default:
          x = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_MainPageTB__WEBPACK_IMPORTED_MODULE_8__["default"], {
            contributions: this.state.contributions,
            windowSwap: this.windowSwap.bind(this),
            adminSwap: this.adminSwap.bind(this),
            adminButton: this.state.users.length > 2,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 108
            },
            __self: this
          });
      }

      var appContent = this.state.user ? this.state.contributions.length > 0 ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 117
        },
        __self: this
      }, x) : react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 121
        },
        __self: this
      }, "No contributions found - contact administrator to enable your account then refresh") : react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 123
        },
        __self: this
      }, "Sign in to continue");
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "App",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_ButtonAppBar__WEBPACK_IMPORTED_MODULE_7__["default"], {
        user: this.state.user,
        handleSignOut: this.handleUserSignOut.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        },
        __self: this
      }), appContent);
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/ButtonAppBar.js":
/*!*****************************!*\
  !*** ./src/ButtonAppBar.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/AppBar */ "./node_modules/@material-ui/core/AppBar/index.js");
/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/Button/index.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Toolbar */ "./node_modules/@material-ui/core/Toolbar/index.js");
/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/Typography/index.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/styles/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./App.css */ "./src/App.css");
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_App_css__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var typeface_roboto__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! typeface-roboto */ "./node_modules/typeface-roboto/index.css");
/* harmony import */ var typeface_roboto__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(typeface_roboto__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./firebase */ "./src/firebase.js");





var _jsxFileName = "d:\\Documents\\GitHub\\jhdb-cms\\src\\ButtonAppBar.js";










var theme = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10__["createMuiTheme"])({
  palette: {
    primary: {
      main: '#c51162'
    }
  }
});
var styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  accountButton: {
    backgroundColor: "#A10C32"
  }
};
var defaultUserImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEWgw/9DdOCixf+kx/8/cd9Id+FdiOeStvmlyP8+cN87bt5EdeA4bN1fiuiewf1UguVNfONul+2ZvfyCqPSPtPh7ovFKeuJnkeuHrfZxmu53nvCIrvU0adxkjulTgORYheZ2SQuUAAAF+0lEQVR4nO2d6XKjvBJAoSUWsSMhs9nw/m/5ifhm7CR2YoMwjW+fqvkRT1XKp1q0FlodxyEIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiCIm8AnW3+RFThrZZ98fvAuAAMZVKor07woDociT8tOVVKaz7f+ajaY9PruVPAkigQ/I6Io4cWp699AEsKsKcc4Edz9DhdJPJZNFu7ZEUKp/cMNu4vlwddyv44MdOHe1/ufpFtoYFt/1VlA2BS/hO86kEWzwzACSD95xO/DMfHl3iYPyLQbPeg3IVyd7UqRyTp5wm8iqeWOnkZWjc8KGsWx2o0iU4V4WtCM1ELtQxFAeY+mmK9wT+0i34D6cw68q+iqHRhC89AkeEdRNOgVWcXnC05RxJ5umIyXCBrFGPuk4T8zz98i8rdW+BXWLhU0ii3iILLGWyzoul6DVhHkuOwhPMNHiTWhsnbOUuYnAus4ZVVhI4QmiAXOKQOccnmaOROVDsZxCsHM5ehPuBdgNHTa53dM90jarWVuAEtXM9eYlQ2+IDJtL4QmiBpfrmGDvRCaIA7oDEEeLQq67hFdrgkt5pmJpA23VvpGaHWQTrM+MkOQdgWNIrJsyhrrhsh2GGFp3bDENUxDK/uma8SIyhCcwbKg6xaoXmSAPFg3PKBKNayycXzxFQ/VJhGsHNB8M0R1OMxUbN0wRvWe5v/AUFsXdF1UGyimV4ghLsP3H6XNCoaoFqasX2G26DEZQrCCIapd/jqrtq2tvsDsr7yRnUWFqfX9YYpq9+SEnZ3XThdEh8uQVbbeyvwzRLW1mMqELAu6LrbiodC3O0yFj2uQTus2yyfCqNZsE5BZNkR1SvNBmNocpvgGqQlib/XtWo8uhGaY5hbfkOb4BulUdWlvSoxwVmFKa6+f+IBr1f0JaFu5RmiUIZyKvizVRKEt+2LKiiCyE5prAGorlXs1tiXpBRZYSDZ8CLCG0BAqC4YK33LmiuUlGfiKML4CkC5TTFK8D+EZkPmSpU2UY50oLkAw69LTGVGgOiS9g0mocxUF6jR6gQUzCzP4uA/BSXHWbpinexGc0k0ZPRtGHpX4k8wFcLT3XBiFp1FWr98FoPKfmRgTv8I+D/4AMs0fdYz4zm5ynwEm6wc7DtRypw1AIAzS+I8Ll5zHabDDjgqfQFiVuXs3r/LIzctqx34TjElVj97P9i1cJN5YK8l2MwfeBUInaLpT7ompB0/08S8RXn7qmsDZefz+AQwyWTWqK8u6rsuyU00VvEF/oS/AVS+sfz+9Je9rRhAEQRAEsXemRSgDxsIrmPngDRanRszIgCODqm+U1rrr2rbtuk5rpZq+khmAkd2n6EfIHNnrtvbzYWo968Uf9fznnXAce4dDMQxjWre6l84U1T1pGjmodD148cdJzMTtM5rP//GGU9fvQ9OMN4BAn9xjEj3T1YwLkRy5ryvUW8fpm8lAp8ZuZkczHh2FsZweT4SSwLKgaXORLKypMb+gKFWQITvjMF8nUPXAn34fczuUQhxOusrwOEIoVf3Lseg8yeGkgxDFUSMLgzb3FjRLvCvpDqd+++xq/FJvdrPLvyR5nDdsyzNVs2apRpuD84ZkdFDOVnE0Gb16vN/zfMekUNkms4eZ2Wtu+6bMHcexz16ec4DJ1rN7AeEXRFK/+h0xgFr5AfzuWHQvbWzKZGmxd9lDcDd94V0vVlm8efC4o/eyukymFvUKnq+YvKYrD7DSbuOyJzj6Lyi6gaw82r98/yiRv3rhFGRP/00Aq4i1FU0EN3kEL/B0VUVwum39JsVyzfqpBT3z7SHUioLBYXtBs6darVQanPQlK+2/WK/1p+3bzLM5rnQxChwMY3SCH9YxDLGE0Ez863TnCS01JLcAX+WqNwQo0syZVVoOhh2aEBrWyDXhFnvCu6xxww3sN0qaDz/Zj+EaraDmw9MVDFdo5zUf7pMhGZLh1pAhGZLh9pAhGZLh9pAhGZLh9pAhGZLh9pAhGZLh9pAhGZLh9pAhGZLh9pAhGZLh9pAhGZLh9pAhGZLh9pAhGb6V4X+6unX2BXDkfQAAAABJRU5ErkJggg==";

var ButtonAppBar =
/*#__PURE__*/
function (_Component) {
  Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(ButtonAppBar, _Component);

  function ButtonAppBar() {
    Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ButtonAppBar);

    return Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(ButtonAppBar).apply(this, arguments));
  }

  Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ButtonAppBar, [{
    key: "render",
    value: function render() {
      var classes = this.props.classes;
      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10__["MuiThemeProvider"], {
        theme: theme,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: classes.root,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_5___default.a, {
        position: "static",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_8___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 45
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: classes.grow,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_9___default.a, {
        variant: "h5",
        align: "left",
        color: "inherit",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        },
        __self: this
      }, "Collaborator Portal"), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_9___default.a, {
        variant: "h6",
        align: "left",
        color: "inherit",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        },
        __self: this
      }, "Philly Branch")), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6___default.a, {
        color: "inherit",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        },
        __self: this
      }, "Main Branch "), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6___default.a, {
        color: "inherit",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 56
        },
        __self: this
      }, "Philly Branch ")), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6___default.a, {
        color: "inherit",
        className: classes.accountButton,
        onClick: this.props.user ? this.props.handleSignOut : _firebase__WEBPACK_IMPORTED_MODULE_13__["default"].showAuthPopup.bind(_firebase__WEBPACK_IMPORTED_MODULE_13__["default"]),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        },
        __self: this
      }, this.props.user ? this.props.user.displayName : "Sign In"), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65
        },
        __self: this
      }))))));
    }
  }]);

  return ButtonAppBar;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10__["withStyles"])(styles)(ButtonAppBar));

/***/ }),

/***/ "./src/EditContributionView.js":
/*!*************************************!*\
  !*** ./src/EditContributionView.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/styles/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/Button/index.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/TextField */ "./node_modules/@material-ui/core/TextField/index.js");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_FormLabel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/FormLabel */ "./node_modules/@material-ui/core/FormLabel/index.js");
/* harmony import */ var _material_ui_core_FormLabel__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_FormLabel__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/FormControlLabel */ "./node_modules/@material-ui/core/FormControlLabel/index.js");
/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/Radio */ "./node_modules/@material-ui/core/Radio/index.js");
/* harmony import */ var _material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/RadioGroup */ "./node_modules/@material-ui/core/RadioGroup/index.js");
/* harmony import */ var _material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/FormControl */ "./node_modules/@material-ui/core/FormControl/index.js");
/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _material_ui_icons_CloudUpload__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/icons/CloudUpload */ "./node_modules/@material-ui/icons/CloudUpload.js");
/* harmony import */ var _material_ui_icons_CloudUpload__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_CloudUpload__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _MediaUpload__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./MediaUpload */ "./src/MediaUpload.js");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/core/Paper */ "./node_modules/@material-ui/core/Paper/index.js");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _material_ui_core_FormGroup__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/core/FormGroup */ "./node_modules/@material-ui/core/FormGroup/index.js");
/* harmony import */ var _material_ui_core_FormGroup__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_FormGroup__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/core/Checkbox */ "./node_modules/@material-ui/core/Checkbox/index.js");
/* harmony import */ var _material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var typeface_roboto__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! typeface-roboto */ "./node_modules/typeface-roboto/index.css");
/* harmony import */ var typeface_roboto__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(typeface_roboto__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./firebase */ "./src/firebase.js");






var _jsxFileName = "d:\\Documents\\GitHub\\jhdb-cms\\src\\EditContributionView.js";

















var theme = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__["createMuiTheme"])({
  palette: {
    primary: {
      main: '#c51162'
    }
  }
});

var styles = function styles(theme) {
  return {
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200
    },
    uploadWidth: {
      width: 600
    },
    dense: {
      marginTop: 19
    },
    menu: {
      width: 200
    },
    formControl: {
      margin: theme.spacing.unit * 2
    },
    rightIcon: {
      marginLeft: theme.spacing.unit
    },
    formWideControl: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 600
    },
    button2: {
      width: '40%',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    button3: {
      display: 'inline-block',
      width: '200px',
      height: '40px',
      margin: 20
    },
    reviewOptionLeft: {
      marginLeft: '10%'
    },
    reviewOptionRight: {
      marginRight: '10%'
    }
  };
};

var EditContributionView =
/*#__PURE__*/
function (_Component) {
  Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(EditContributionView, _Component);

  Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(EditContributionView, [{
    key: "handleBeforeButtonClick",
    value: function handleBeforeButtonClick() {
      this.props.windowSwap();
    }
  }]);

  function EditContributionView(props) {
    var _this;

    Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, EditContributionView);

    _this = Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(EditContributionView).call(this, props));

    _this.handleNameChange = function (event) {
      var data = _this.state.contributionData;
      data.name = event.target.value;

      _this.setState({
        contributionData: data
      });
    };

    _this.handleCheckBoxChange = function (event) {
      var data = _this.state.contributionData;
      data.type = event.target.value;

      _this.setState({
        contributionData: data
      });
    };

    _this.handleBioChange = function (event) {
      var data = _this.state.contributionData;
      data.description = event.target.value;

      _this.setState({
        contributionData: data
      });
    };

    _this.handleEndBoxChange = function (name) {
      return function (event) {
        _this.setState(Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, name, event.target.checked));
      };
    };

    _this.handleChildChange = function (newState) {
      var contrib = _this.state.contributionData;
      Object.keys(newState).forEach(function (key) {
        contrib[key] = newState[key];
      });

      _this.setState({
        contributionData: contrib
      });
    };

    _this.state = {
      contribName: '',
      contribType: '',
      contribBio: '',
      mediaProcess: '',
      contentEditing: '',
      contributionData: null
    };
    return _this;
  }

  Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(EditContributionView, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      console.log(this.props && this.props.selectedContribution);
      console.log(_firebase__WEBPACK_IMPORTED_MODULE_21__["default"].base);

      if (this.props.selectedContribution && this.props.selectedContribution.ref) {
        _firebase__WEBPACK_IMPORTED_MODULE_21__["default"].base.syncDoc(this.props.selectedContribution.ref.path, {
          context: this,
          state: 'contributionData',
          withRefs: true
        });
        console.log(this.state.contributionData);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var classes = this.props.classes;
      var contrib = this.state.contributionData;
      var _this$state = this.state,
          mediaProcess = _this$state.mediaProcess,
          contentEditing = _this$state.contentEditing;
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__["MuiThemeProvider"], {
        theme: theme,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 140
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 141
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h1", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 142
        },
        __self: this
      }, " Contribution "), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8___default.a, {
        onClick: this.handleBeforeButtonClick.bind(this),
        variant: "outlined",
        color: "primary",
        className: classes.button,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 143
        },
        __self: this
      }, " Back "), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 145
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_9___default.a, {
        id: "standard-name",
        label: "Contribution Title",
        className: classes.textField,
        value: contrib && contrib.name || "",
        onChange: this.handleNameChange,
        margin: "normal",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 146
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_14___default.a, {
        component: "fieldset",
        className: classes.formControl,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 154
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_FormLabel__WEBPACK_IMPORTED_MODULE_10___default.a, {
        component: "legend",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 155
        },
        __self: this
      }, " Contribution Type"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_13___default.a, {
        row: true,
        value: contrib && contrib.type || "",
        onChange: this.handleCheckBoxChange,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 156
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_11___default.a, {
        value: "artist",
        control: react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_12___default.a, {
          color: "primary",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 161
          },
          __self: this
        }),
        label: "Artist Type",
        labelPlacement: "start",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 159
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_11___default.a, {
        value: "collection",
        control: react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_12___default.a, {
          color: "primary",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 167
          },
          __self: this
        }),
        label: "Collection",
        labelPlacement: "start",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 165
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 173
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_14___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 174
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_9___default.a, {
        id: "filled-multiline-flexible, filled-full-width",
        label: "Biography",
        style: {
          margin: 5
        },
        multiline: true,
        value: contrib && contrib.description || "",
        onChange: this.handleBioChange,
        fullWidth: true,
        margin: "normal",
        variant: "filled",
        placeholder: "Insert Biography",
        className: classes.formWideControl,
        InputLabelProps: {
          shrink: true
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 175
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 192
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_14___default.a, {
        className: classes.uploadWidth,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 193
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_MediaUpload__WEBPACK_IMPORTED_MODULE_16__["default"], {
        uploadName: "Images",
        isSubpage: contrib && contrib.imagesSubpage,
        collection: this.props.selectedContribution.ref.collection("Images"),
        onChange: this.handleChildChange,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 194
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_MediaUpload__WEBPACK_IMPORTED_MODULE_16__["default"], {
        uploadName: "Audio",
        isSubpage: contrib && contrib.audioSubpage,
        collection: this.props.selectedContribution.ref.collection("Audio"),
        onChange: this.handleChildChange,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 198
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_MediaUpload__WEBPACK_IMPORTED_MODULE_16__["default"], {
        uploadName: "Video",
        isSubpage: contrib && contrib.videoSubpage,
        collection: this.props.selectedContribution.ref.collection("Video"),
        onChange: this.handleChildChange,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 202
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 207
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_14___default.a, {
        className: classes.uploadWidth,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 208
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 209
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_17___default.a, {
        className: classes.paper,
        elevation: 3,
        square: false,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 210
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 211
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_FormGroup__WEBPACK_IMPORTED_MODULE_18___default.a, {
        row: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 212
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_11___default.a, {
        className: classes.button2,
        control: react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_19___default.a, {
          checked: mediaProcess,
          onChange: this.handleEndBoxChange('mediaProcess'),
          value: "Media Processing",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 215
          },
          __self: this
        }),
        label: "Additional Media Processing Required",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 213
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_11___default.a, {
        className: classes.button2,
        control: react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_19___default.a, {
          checked: contentEditing,
          onChange: this.handleEndBoxChange('contentEditing'),
          value: "Content Editing",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 221
          },
          __self: this
        }),
        label: "Additional Content Editing Required",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 219
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 226
        },
        __self: this
      })))));
    }
  }]);

  return EditContributionView;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__["withStyles"])(styles)(EditContributionView));

/***/ }),

/***/ "./src/FileUpload.js":
/*!***************************!*\
  !*** ./src/FileUpload.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/styles/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./App.css */ "./src/App.css");
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_App_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_FormGroup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/FormGroup */ "./node_modules/@material-ui/core/FormGroup/index.js");
/* harmony import */ var _material_ui_core_FormGroup__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_FormGroup__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Fab */ "./node_modules/@material-ui/core/Fab/index.js");
/* harmony import */ var _material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/icons/Add */ "./node_modules/@material-ui/icons/Add.js");
/* harmony import */ var _material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_icons_Check__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/Check */ "./node_modules/@material-ui/icons/Check.js");
/* harmony import */ var _material_ui_icons_Check__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Check__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_icons_Delete__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons/Delete */ "./node_modules/@material-ui/icons/Delete.js");
/* harmony import */ var _material_ui_icons_Delete__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Delete__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/TextField */ "./node_modules/@material-ui/core/TextField/index.js");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./firebase */ "./src/firebase.js");
/* harmony import */ var _dropbox_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./dropbox.js */ "./src/dropbox.js");





var _jsxFileName = "d:\\Documents\\GitHub\\jhdb-cms\\src\\FileUpload.js";












var styles = function styles(theme) {
  return {
    root: {
      flexGrow: 1
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    fab: {
      margin: theme.spacing.unit
    },
    fabImg: {
      width: '50px',
      height: '50px',
      borderRadius: '100px'
    }
  };
};

var FileUpload =
/*#__PURE__*/
function (_Component) {
  Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(FileUpload, _Component);

  function FileUpload(props) {
    var _this;

    Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, FileUpload);

    _this = Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(FileUpload).call(this, props));

    _this.handleTextChange = function (event) {
      var fileDoc = _this.state.fileDoc;

      if (_this.props.fileType === 'Video' && event.target.id.indexOf('multiline') === -1) {
        fileDoc.url = event.target.value;
      } else {
        fileDoc.caption = event.target.value;
      }

      _this.setState({
        fileDoc: fileDoc
      });
    };

    _this.state = {
      fileDoc: undefined
    };
    return _this;
  }

  Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(FileUpload, [{
    key: "handleDelete",
    value: function handleDelete() {
      if (window.confirm("Are you sure you want to remove this file? This can not be undone!")) {
        _firebase__WEBPACK_IMPORTED_MODULE_14__["default"].base.removeDoc(this.props.fileDoc.ref);
      }
    }
  }, {
    key: "onChooserSuccess",
    value: function onChooserSuccess(file) {
      var fileDoc = this.state.fileDoc;
      fileDoc['name'] = file[0].name || "";
      fileDoc['url'] = file[0].link && file[0].link.replace('www.dropbox', 'dl.dropboxusercontent') || "";
      fileDoc['icon'] = file[0].icon || "";
      fileDoc['thumbnail'] = file[0].thumbnailLink && file[0].thumbnailLink.replace('www.dropbox', 'dl.dropboxusercontent') || "";
      this.setState({
        fileDoc: fileDoc
      });
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      if (this.props && this.props.fileDoc) {
        _firebase__WEBPACK_IMPORTED_MODULE_14__["default"].base.syncDoc(this.props.fileDoc.ref, {
          context: this,
          state: 'fileDoc',
          withRefs: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var classes = this.props.classes;
      var doc = this.state.fileDoc;

      if (!doc) {
        return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 80
          },
          __self: this
        });
      }

      var fileUploadIcon = doc.url ? doc.thumbnail || doc.icon ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("img", {
        className: classes.fabImg,
        src: doc.thumbnail || doc.icon,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 84
        },
        __self: this
      }) : react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_material_ui_icons_Check__WEBPACK_IMPORTED_MODULE_11___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        },
        __self: this
      }) : react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_10___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        },
        __self: this
      });
      var fileUploadComponent;

      if (this.props.fileType !== 'Video') {
        fileUploadComponent = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_9___default.a, {
          size: "small",
          color: doc.url ? 'none' : 'primary',
          "aria-label": "Upload",
          className: classes.fab,
          onClick: function onClick() {
            if (_this2.state.fileDoc) {
              _dropbox_js__WEBPACK_IMPORTED_MODULE_15__["default"].onChoose(_this2.props.fileType, _this2.onChooserSuccess.bind(_this2));
            }
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 91
          },
          __self: this
        }, fileUploadIcon);
      } else {
        fileUploadComponent = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_13___default.a, {
          id: "standard-static",
          label: "Link",
          style: {
            margin: 5
          },
          value: this.state.fileDoc && this.state.fileDoc.url || "",
          onChange: this.handleTextChange,
          margin: "normal",
          variant: "filled",
          InputLabelProps: {
            shrink: true
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 107
          },
          __self: this
        });
      }

      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: classes.root,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 122
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_material_ui_core_FormGroup__WEBPACK_IMPORTED_MODULE_8___default.a, {
        row: true,
        id: this.state.fileDoc && this.state.fileDoc.name || this.props.fileIndex,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 123
        },
        __self: this
      }, fileUploadComponent, this.state.fileDoc && this.state.fileDoc.name || this.props && this.props.fileIndex, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_13___default.a, {
        id: "standard-multiline-static",
        label: "Caption",
        style: {
          margin: 5
        },
        multiline: true,
        value: this.state.fileDoc && this.state.fileDoc.caption || "",
        onChange: this.handleTextChange,
        margin: "normal",
        variant: "filled",
        InputLabelProps: {
          shrink: true
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_9___default.a, {
        size: "small",
        "aria-label": "Delete",
        onClick: this.handleDelete.bind(this),
        className: classes.fab,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 139
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_material_ui_icons_Delete__WEBPACK_IMPORTED_MODULE_12___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 143
        },
        __self: this
      }))));
    }
  }]);

  return FileUpload;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__["withStyles"])(styles)(FileUpload));

/***/ }),

/***/ "./src/MainPageTB.css":
/*!****************************!*\
  !*** ./src/MainPageTB.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./MainPageTB.css */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./src/MainPageTB.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../node_modules/css-loader??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./MainPageTB.css */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./src/MainPageTB.css", function() {
		var newContent = __webpack_require__(/*! !../node_modules/css-loader??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./MainPageTB.css */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./src/MainPageTB.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/MainPageTB.js":
/*!***************************!*\
  !*** ./src/MainPageTB.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread */ "./node_modules/@babel/runtime/helpers/esm/objectSpread.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/Button/index.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/List */ "./node_modules/@material-ui/core/List/index.js");
/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/ListItem */ "./node_modules/@material-ui/core/ListItem/index.js");
/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/styles/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Paper */ "./node_modules/@material-ui/core/Paper/index.js");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/Fab */ "./node_modules/@material-ui/core/Fab/index.js");
/* harmony import */ var _material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_ui_icons_Settings__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/icons/Settings */ "./node_modules/@material-ui/icons/Settings.js");
/* harmony import */ var _material_ui_icons_Settings__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Settings__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./firebase */ "./src/firebase.js");
/* harmony import */ var _MainPageTB_css__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./MainPageTB.css */ "./src/MainPageTB.css");
/* harmony import */ var _MainPageTB_css__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_MainPageTB_css__WEBPACK_IMPORTED_MODULE_15__);






var _jsxFileName = "d:\\Documents\\GitHub\\jhdb-cms\\src\\MainPageTB.js";










var theme = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10__["createMuiTheme"])({
  palette: {
    primary: {
      main: '#c51162'
    }
  }
});

var styles = function styles(theme) {
  return {
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    button: {
      marginLeft: '10px'
    },
    adminFab: {
      position: 'fixed',
      right: '2vw',
      bottom: '2vw'
    },
    paper: Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_5__["default"])({}, theme.mixins.gutters(), {
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      width: '70%',
      marginLeft: 'auto',
      marginRight: 'auto'
    }),
    contributionList: {
      display: 'block',
      width: 'wrap',
      align: 'center'
    },
    contributionListName: {
      width: '20vw',
      textAlign: 'right',
      marginLeft: 'auto',
      paddingRight: '3vw'
    },
    contributionListStatus: {
      width: '7vw',
      textAlign: 'left',
      paddingLeft: '3vw',
      marginRight: 'auto'
    },
    cardColor: {
      backgroundColor: '#fce4ec'
    }
  };
};

var MainPageTB =
/*#__PURE__*/
function (_Component) {
  Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(MainPageTB, _Component);

  function MainPageTB() {
    Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, MainPageTB);

    return Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(MainPageTB).apply(this, arguments));
  }

  Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(MainPageTB, [{
    key: "handleAddButtonClick",
    // // Testing purposes. Attach this to a button's onClick to see in action - it opens a file attached to the collection, in dropbox.
    // onBioDocumentClick = function(documentName) {
    //     this.props.dropbox.openFile(documentName);
    // };
    value: function handleAddButtonClick() {
      var contribName = window.prompt("Enter collection name:");

      if (contribName) {
        _firebase__WEBPACK_IMPORTED_MODULE_14__["default"].base.addToCollection("Contributions", {
          name: contribName,
          description: '',
          type: 'collection',
          imagesSubpage: false,
          videoSubpage: false,
          audioSubpage: false,
          status: 'unpublished'
        });
      } else {
        window.alert("Collection name can not be blank!");
      }
    }
  }, {
    key: "handleEditButtonClick",
    value: function handleEditButtonClick(selectedContribution) {
      this.props.windowSwap(selectedContribution);
    }
  }, {
    key: "handleAdminButtonClick",
    value: function handleAdminButtonClick() {
      this.props.adminSwap();
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var classes = this.props.classes;
      var contrib = this.props.contributions;
      var adminButton = this.props.adminButton ? react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_12___default.a, {
        color: "primary",
        "aria-label": "Admin",
        className: classes.fab + " " + classes.adminFab,
        onClick: function onClick() {
          return _this.handleAdminButtonClick.bind(_this)();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 102
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_material_ui_icons_Settings__WEBPACK_IMPORTED_MODULE_13___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 103
        },
        __self: this
      })) : react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 105
        },
        __self: this
      });
      return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10__["MuiThemeProvider"], {
        theme: theme,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 108
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 109
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 110
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_11___default.a, {
        className: classes.paper,
        elevation: 3,
        square: false,
        classes: {
          root: classes.cardColor
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: " MainPage-format",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("h1", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        },
        __self: this
      }, "My Contributions"), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6___default.a, {
        onClick: function onClick() {
          return _this.handleAddButtonClick.bind(_this)();
        },
        variant: "outlined",
        color: "primary",
        className: classes.button,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        },
        __self: this
      }, "Add Contribution "), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_7___default.a, {
        className: classes.contributionList,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 116
        },
        __self: this
      }, contrib.map(function (e) {
        return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_8___default.a, {
          key: e.id || e.name,
          className: classes.contributionListItem,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 119
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("h3", {
          className: classes.contributionListName,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 120
          },
          __self: this
        }, e.name), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6___default.a, {
          variant: "outlined",
          color: "primary",
          onClick: function onClick() {
            return _this.handleEditButtonClick.bind(_this)(e);
          },
          className: classes.button,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 121
          },
          __self: this
        }, "Edit "), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6___default.a, {
          variant: "outlined",
          color: "primary",
          className: classes.button,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 124
          },
          __self: this
        }, "Preview "), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("h3", {
          className: classes.contributionListStatus,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 126
          },
          __self: this
        }));
      })))), adminButton);
    }
  }]);

  return MainPageTB;
}(react__WEBPACK_IMPORTED_MODULE_9__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10__["withStyles"])(styles)(MainPageTB));

/***/ }),

/***/ "./src/MediaUpload.js":
/*!****************************!*\
  !*** ./src/MediaUpload.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread */ "./node_modules/@babel/runtime/helpers/esm/objectSpread.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/styles/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./App.css */ "./src/App.css");
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_App_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/FormControlLabel */ "./node_modules/@material-ui/core/FormControlLabel/index.js");
/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_FormGroup__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/FormGroup */ "./node_modules/@material-ui/core/FormGroup/index.js");
/* harmony import */ var _material_ui_core_FormGroup__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_FormGroup__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Switch */ "./node_modules/@material-ui/core/Switch/index.js");
/* harmony import */ var _material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/Paper */ "./node_modules/@material-ui/core/Paper/index.js");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _FileUpload__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./FileUpload */ "./src/FileUpload.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/Button/index.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./firebase */ "./src/firebase.js");
/* harmony import */ var _dropbox_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./dropbox.js */ "./src/dropbox.js");
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! crypto */ "./node_modules/crypto-browserify/index.js");
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_17__);






var _jsxFileName = "d:\\Documents\\GitHub\\jhdb-cms\\src\\MediaUpload.js";













var styles = function styles(theme) {
  return {
    root: {
      flexGrow: 1
    },
    paper: Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_5__["default"])({}, theme.mixins.gutters(), {
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2
    }),
    nameStyle: {
      margin: theme.spacing.unit * 2
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    fab: {
      margin: theme.spacing.unit
    },
    cardColor: {
      backgroundColor: '#fce4ec'
    },
    mediaUploadTitle: {
      width: '10vw',
      textAlign: 'left'
    }
  };
};

var MediaUpload =
/*#__PURE__*/
function (_Component) {
  Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(MediaUpload, _Component);

  function MediaUpload(props) {
    var _this;

    Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, MediaUpload);

    _this = Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(MediaUpload).call(this, props));
    _this.state = {
      makeSubpage: '',
      contribText: '',
      collection: [],
      add: ''
    };
    return _this;
  }

  Object(d_Documents_GitHub_jhdb_cms_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(MediaUpload, [{
    key: "handleSubpage",
    value: function handleSubpage(event) {
      console.log("Callback: " + event.target.checked);
      var newState = {};

      switch (this.props && this.props.uploadName) {
        case "Images":
          newState["imagesSubpage"] = event.target.checked;
          break;

        case "Audio":
          newState["audioSubpage"] = event.target.checked;
          break;

        case "Video":
          break;

        default:
          newState["videoSubpage"] = event.target.checked;
          break;
      }

      this.props.onChange(newState);
    }
  }, {
    key: "addFileUpload",
    value: function addFileUpload(event) {
      // let lst = this.state.collection;
      _firebase__WEBPACK_IMPORTED_MODULE_15__["default"].base.addToCollection(this.props.collection, {
        name: "",
        url: "",
        caption: "",
        icon: "",
        thumbnail: "",
        index: this.state.collection.size
      });
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      if (this.props && this.props.collection) {
        _firebase__WEBPACK_IMPORTED_MODULE_15__["default"].base.bindCollection(this.props.collection, {
          context: this,
          state: 'collection',
          withRefs: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var classes = this.props.classes;
      var fileIndex = 0;
      var fileUploads = this.state.collection.map(function (fileDoc) {
        fileIndex++;
        return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_FileUpload__WEBPACK_IMPORTED_MODULE_13__["default"], {
          key: fileDoc.index || fileDoc.name || Object(crypto__WEBPACK_IMPORTED_MODULE_17__["randomBytes"])(2),
          fileType: _this2.props.uploadName,
          fileIndex: fileIndex,
          fileDoc: fileDoc,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 103
          },
          __self: this
        });
      });
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: classes.root,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_12___default.a, {
        className: classes.paper,
        elevation: 3,
        square: false,
        classes: {
          root: classes.cardColor
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_FormGroup__WEBPACK_IMPORTED_MODULE_10___default.a, {
        row: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h2", {
        className: classes.mediaUploadTitle,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        },
        __self: this
      }, this.props.uploadName || ""), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_9___default.a, {
        control: react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_11___default.a, {
          checked: this.props && this.props.isSubpage || false,
          onChange: this.handleSubpage.bind(this),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 120
          },
          __self: this
        }),
        label: "Make Subpage",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 118
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h4", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        },
        __self: this
      }, fileUploads), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_14___default.a, {
        variant: "contained",
        color: "primary",
        className: classes.button,
        onClick: this.addFileUpload.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 131
        },
        __self: this
      }, "+ ADD MORE"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 135
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 136
        },
        __self: this
      })));
    }
  }]);

  return MediaUpload;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__["withStyles"])(styles)(MediaUpload));

/***/ }),

/***/ "./src/dropbox.js":
/*!************************!*\
  !*** ./src/dropbox.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dropbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dropbox */ "./node_modules/dropbox/dist/Dropbox-sdk.min.js");
/* harmony import */ var dropbox__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dropbox__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var load_script__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! load-script */ "./node_modules/load-script/index.js");
/* harmony import */ var load_script__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(load_script__WEBPACK_IMPORTED_MODULE_1__);


var DROPBOX_SDK_URL = 'https://www.dropbox.com/static/api/2/dropins.js';
var SCRIPT_ID = 'dropboxjs';
var scriptLoadingStarted = false;
var dbx = {
  // Must be called in componentWillMount in App.js
  initialize: function initialize(callback) {
    var config = {
      appKey: "l3bfhq15xjjtxqp",
      redirectUri: "http://localhost:3000/"
    };
    var accessToken = this.getAccessTokenFromUrl();

    if (!accessToken) {
      window.location.href = "http://dropbox.com/oauth2/authorize?client_id=" + config.appKey + "&response_type=token&redirect_uri=" + window.location.href;
    } else {
      config.accessToken = accessToken;
      this.app = new dropbox__WEBPACK_IMPORTED_MODULE_0___default.a.Dropbox(config);

      if (!this.isDropboxReady() && !scriptLoadingStarted) {
        scriptLoadingStarted = true;
        load_script__WEBPACK_IMPORTED_MODULE_1___default()(DROPBOX_SDK_URL, {
          attrs: {
            id: SCRIPT_ID,
            'data-app-key': config.appKey
          }
        });
      }
    }
  },
  isDropboxReady: function isDropboxReady() {
    return !!window.Dropbox;
  },
  onChoose: function onChoose(fileType, successCallback) {
    if (!this.isDropboxReady() || !successCallback || fileType !== 'Images' && fileType !== 'Audio') return null;
    var options;
    if (fileType === 'Images') options = this.dbxImageOptions;else if (fileType === 'Audio') options = this.dbxAudioOptions;
    options.success = successCallback;
    window.Dropbox.choose(options);
  },
  getAccessTokenFromCode: function getAccessTokenFromCode(redirectUri, code) {
    this.app.getAccessTokenFromCode(redirectUri, code).catch(function (error) {
      console.log(error);
    });
  },
  // Parses the url and gets the access token if it is in the urls hash
  getAccessTokenFromUrl: function getAccessTokenFromUrl() {
    return this.getTokenFromRedirectUrl(window.location.hash);
  },
  isAuthenticated: function isAuthenticated() {
    return !!this.getAccessTokenFromUrl();
  },
  openFile: function openFile(fileName) {
    window.location.href = "https://www.dropbox.com/home?preview=" + fileName;
  },
  getTokenFromRedirectUrl: function getTokenFromRedirectUrl(str) {
    var params = new URLSearchParams(str);
    return params.get('#access_token');
  },
  dbxImageOptions: {
    success: null,
    cancel: null,
    linkType: "preview",
    // or "direct"
    multiselect: false,
    extensions: ['images'],
    folderselect: false,
    sizeLimit: 1024 * 1024 * 1024 // in bytes

  },
  dbxAudioOptions: {
    success: null,
    cancel: null,
    linkType: "preview",
    // or "direct"
    multiselect: false,
    extensions: ['audio'],
    folderselect: false,
    sizeLimit: 1024 * 1024 * 1024 // in bytes

  }
};
/* harmony default export */ __webpack_exports__["default"] = (dbx);

/***/ }),

/***/ "./src/firebase.js":
/*!*************************!*\
  !*** ./src/firebase.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/index.cjs.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/index.esm.js");
/* harmony import */ var re_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! re-base */ "./node_modules/re-base/index.js");
/* harmony import */ var re_base__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(re_base__WEBPACK_IMPORTED_MODULE_3__);




var fb = {
  // Must be bound to component — ie call initialize.bind(this)(callback) from App.componentWillMount()
  initialize: function initialize(callback) {
    var config = {
      apiKey: "AIzaSyBnkU1O4VkRUkbZS8LXuR7MYIBv2WQAupY",
      authDomain: "testproj-34045.firebaseapp.com",
      databaseURL: "https://testproj-34045.firebaseio.com",
      projectId: "testproj-34045",
      storageBucket: "testproj-34045.appspot.com",
      messagingSenderId: "461322757899"
    };
    this.app = firebase_app__WEBPACK_IMPORTED_MODULE_0___default.a.initializeApp(config);
    fb.db = firebase_app__WEBPACK_IMPORTED_MODULE_0___default.a.firestore(this.app);
    fb.auth = firebase_app__WEBPACK_IMPORTED_MODULE_0___default.a.auth();
    fb.base = re_base__WEBPACK_IMPORTED_MODULE_3___default.a.createClass(fb.db);
    fb.auth.onAuthStateChanged(function (user) {
      if (user) {
        callback(user);
      } else {
        callback(null);
      }
    });
  },
  showAuthPopup: function showAuthPopup() {
    var provider = new firebase_app__WEBPACK_IMPORTED_MODULE_0___default.a.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider).then(function (result) {
      // User signed in!
      this.user = result.user;
      console.log(this.user);
    }).catch(function (error) {// An error occurred
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (fb);

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./index.css */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./src/index.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../node_modules/css-loader??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./index.css */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./src/index.css", function() {
		var newContent = __webpack_require__(/*! !../node_modules/css-loader??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./index.css */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./src/index.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./App */ "./src/App.js");
/* harmony import */ var _serviceWorker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./serviceWorker */ "./src/serviceWorker.js");
var _jsxFileName = "d:\\Documents\\GitHub\\jhdb-cms\\src\\index.js";





react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_3__["default"], {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 7
  },
  __self: undefined
}), document.getElementById('root')); // If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

_serviceWorker__WEBPACK_IMPORTED_MODULE_4__["unregister"]();

/***/ }),

/***/ "./src/serviceWorker.js":
/*!******************************!*\
  !*** ./src/serviceWorker.js ***!
  \******************************/
/*! exports provided: register, unregister */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unregister", function() { return unregister; });
// This optional code is used to register a service worker.
// register() is not called by default.
// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.
// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA
var isLocalhost = Boolean(window.location.hostname === 'localhost' || // [::1] is the IPv6 localhost address.
window.location.hostname === '[::1]' || // 127.0.0.1/8 is considered localhost for IPv4.
window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
function register(config) {
  if (false) { var publicUrl; }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker.register(swUrl).then(function (registration) {
    registration.onupdatefound = function () {
      var installingWorker = registration.installing;

      if (installingWorker == null) {
        return;
      }

      installingWorker.onstatechange = function () {
        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            // At this point, the updated precached content has been fetched,
            // but the previous service worker will still serve the older
            // content until all client tabs are closed.
            console.log('New content is available and will be used when all ' + 'tabs for this page are closed. See https://bit.ly/CRA-PWA.'); // Execute callback

            if (config && config.onUpdate) {
              config.onUpdate(registration);
            }
          } else {
            // At this point, everything has been precached.
            // It's the perfect time to display a
            // "Content is cached for offline use." message.
            console.log('Content is cached for offline use.'); // Execute callback

            if (config && config.onSuccess) {
              config.onSuccess(registration);
            }
          }
        }
      };
    };
  }).catch(function (error) {
    console.error('Error during service worker registration:', error);
  });
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl).then(function (response) {
    // Ensure service worker exists, and that we really are getting a JS file.
    var contentType = response.headers.get('content-type');

    if (response.status === 404 || contentType != null && contentType.indexOf('javascript') === -1) {
      // No service worker found. Probably a different app. Reload the page.
      navigator.serviceWorker.ready.then(function (registration) {
        registration.unregister().then(function () {
          window.location.reload();
        });
      });
    } else {
      // Service worker found. Proceed as normal.
      registerValidSW(swUrl, config);
    }
  }).catch(function () {
    console.log('No internet connection found. App is running in offline mode.');
  });
}

function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.unregister();
    });
  }
}

/***/ }),

/***/ 0:
/*!**********************************************************************************!*\
  !*** multi ./node_modules/react-dev-utils/webpackHotDevClient.js ./src/index.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! d:\Documents\GitHub\jhdb-cms\node_modules\react-dev-utils\webpackHotDevClient.js */"./node_modules/react-dev-utils/webpackHotDevClient.js");
module.exports = __webpack_require__(/*! d:\Documents\GitHub\jhdb-cms\src\index.js */"./src/index.js");


/***/ }),

/***/ 1:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime~main",1]]]);
//# sourceMappingURL=main.chunk.js.map