import {processDir} from '../src/processors/DirProcessor'
import * as path from 'path'
import * as fs from 'fs'

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

const expectHtmlFragment = "<script defer=\"defer\" src=\"index.js?9b34bd6a7b5c1be8c603\"></script><script src=\"cordova.js\"></script>" +
    "<link href=\"main.74262c1b98c22c8c8769.css?9b34bd6a7b5c1be8c603\" rel=\"stylesheet\"></head>" +
    "<div id=\"app-container\"></div></html>"

const TEST_DIR_PATH = path.resolve("__test__") + "/"

test("should refactor react js code into cordova code", function () {
    cleanTmp()

    fs.cpSync(TEST_DIR_PATH + "data/js", "tmp", {recursive: true})

    processDir("tmp")

    const file = fs.readFileSync("tmp/fragment.js").toString()
    expect(file.endsWith(expectDevFragmentCodeReworked)).toBeTruthy()

    cleanTmp()
})

test("should refactor react prod js code into cordova code", function () {
    cleanTmp()

    fs.cpSync(TEST_DIR_PATH + "data/js", "tmp", {recursive: true})

    processDir("tmp")

    const file = fs.readFileSync("tmp/prod_fragment.js").toString()
    expect(file.endsWith(expectProdFragmentCodeReworked)).toBeTruthy()
    cleanTmp()
})

test("should refactor react app html code into cordova code", function () {
    cleanTmp()

    fs.cpSync(TEST_DIR_PATH + "data/html", "tmp", {recursive: true})

    processDir("tmp")

    const file = fs.readFileSync("tmp/index.html").toString()
    expect(file.endsWith(expectHtmlFragment)).toBeTruthy()
    cleanTmp()
})

function cleanTmp() {
    if (fs.existsSync("tmp",)) {
        fs.rmSync("tmp", {recursive: true})
    }
}