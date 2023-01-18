const processDir = require("../DirProcessor")
const fs = require("fs")

console.log("processDir ", processDir.toString())

const expectCode = "var root = react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot(document.getElementById('app-container'));\n" +
    "        root.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().StrictMode), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_components_App_App__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null)));\n"

test("should add an element to an array", function () {

    processDir("./__test__/data/js/")

    const file = fs.readFileSync("./__test__/data/js/test1.js").toString()

    const fileLength = file.length
    let number = file.indexOf(expectCode);
    console.log("res ", fileLength, " number ", number)
})
