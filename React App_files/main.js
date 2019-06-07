webpackHotUpdate("main",{

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

/***/ })

})
//# sourceMappingURL=main.d33353dc944bf9aebb3b.hot-update.js.map