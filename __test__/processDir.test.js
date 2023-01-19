const processDir = require("../index")
const fs = require("fs")
const path = require('path')

const expectDevFragmentCodeReworked = "/* harmony import */ var _components_App_App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/App/App */ \"./src/components/App/App.tsx\");document.addEventListener(\"deviceready\",(function(){\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    var root = react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot(document.getElementById('app-container'));\n" +
    "    root.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().StrictMode), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_components_App_App__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null)))}),!1);\n" +
    "}();\n" +
    "/******/ })()\n" +
    ";"
const expectProdFragmentCodeReworked = "\"version-dev mobile-hide tab-hide small-hide\"},{children:\"Планировщик покупок v0.3.7a\"}))}))}))})]}))]}))})}));document.addEventListener(\"deviceready\",(function(){e.createRoot(document.getElementById(\"app-container\")).render(t.createElement(t.StrictMode,null,t.createElement(la,null)))}),!1)}()}();"

const expectDevCodeReworked = ""
const expectProdCodeReworked = ""

const TEST_DIR_PATH = path.resolve("__test__") + "/"

test("should refactor react code into cordova code", function () {
    cleanTmp()

    fs.cpSync(TEST_DIR_PATH + "data/js", "tmp", {recursive: true})

    processDir("tmp")

    const file = fs.readFileSync("tmp/fragment.js").toString()
    expect(file.endsWith(expectDevFragmentCodeReworked)).toBeTruthy()

    cleanTmp()
})

test("should refactor react code into cordova code", function () {
    cleanTmp()

    fs.cpSync(TEST_DIR_PATH + "data/js", "tmp", {recursive: true})

    processDir("tmp")

    const file = fs.readFileSync("tmp/prod_fragment.js").toString()
    expect(file.endsWith(expectProdFragmentCodeReworked)).toBeTruthy()
    cleanTmp()
})

function cleanTmp() {
    if (fs.existsSync("tmp",)) {
        fs.rmdirSync("tmp", {recursive: true, force: true})
    }
}