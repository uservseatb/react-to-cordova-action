const core = require('@actions/core')
const fs = require("fs");

const RENDER_PART = '.render('
const GET_ELEMENT_BY_ID_PART = '.getElementById('
const CREATE_ROOT_PART = '.createRoot('

const TO_BE_FIND_IN_JS = [RENDER_PART, GET_ELEMENT_BY_ID_PART, CREATE_ROOT_PART]
const ADD_JS_BEFORE = "document.addEventListener(\"deviceready\",(function(){"
const ADD_JS_AFTER = "}),!1)"
const ADD_HTML = "<script src='cordova.js'></script>"


try {
    const buildDir = core.getInput('build-dir');
    processDir(buildDir)
} catch (error) {
    core.setFailed(error.message);
}

function processDir(dirName) {
    console.log("procdir processing the ", dirName)
    const walkBuildDir = walk(dirName)
    let jsFiles = walkBuildDir
        .filter((f) => f.endsWith(".js"))
    let htmlFiles = walkBuildDir
        .filter((f) => f.endsWith(".html"))

    processJsFiles(jsFiles)
    processHtmlFiles(htmlFiles)
}

function processJsFiles(jsFiles) {
    jsFiles.forEach(function (jsFileName) {
        processJsFile(jsFileName)
    })
}

function processHtmlFiles(htmlFiles) {
    htmlFiles.forEach(function (htmlFileName) {
        const htmlFile = fs.readFileSync(htmlFileName).toString()
        processHtmlFile(htmlFile)
    })
}

function processJsFile(jsFileName) {
    const jsFileContent = fs.readFileSync(jsFileName).toString()
    const fileContentAsList = jsFileContent.split(";")
    const filteredContent = {}
    for (let i = 0; i < fileContentAsList.length; i++) {
        const current = fileContentAsList[i].replaceAll("\n", "")
        if (current.trim() === '\n') continue
        TO_BE_FIND_IN_JS.forEach(se => {
            if (current.indexOf(se) > -1) {
                filteredContent[i] = current
                return false
            }
        })
    }

    const indiciesToCheck = Object.keys(filteredContent).reverse()

    const found = {}
    for (let i = 0; i < indiciesToCheck.length; i++) {
        if (Object.keys(found).length >= 3) {
            break
        }
        const currentLineNumber = indiciesToCheck[i]
        const currentLine = filteredContent[currentLineNumber]
        TO_BE_FIND_IN_JS.forEach(se => {
            if (currentLine.indexOf(se) > -1) {
                found[se] = currentLineNumber
                return false
            }
        })
    }

    const lines = distinctArray(Object.values(found)).sort()
    const firstLineNumber = +lines[0]
    const lastLineNumber = +lines[lines.length - 1]
    const linesCount = lastLineNumber - firstLineNumber + 1
    if (Object.keys(found).length < 3 || linesCount > 2 || linesCount < 1) {
        console.warn(jsFileName, "\n it's not a react app")
    } else {
        console.info("patching: [", jsFileName, "]")
        fileContentAsList[firstLineNumber] = ADD_JS_BEFORE + fileContentAsList[firstLineNumber]

        const lastLineContent = fileContentAsList[lastLineNumber]
        const closeBracketOfRenderIndex = indexOfCloseBracketOfRender(lastLineContent)
        fileContentAsList[lastLineNumber] = lastLineContent.substring(0, closeBracketOfRenderIndex + 1) +
            ADD_JS_AFTER +
            lastLineContent.substring(closeBracketOfRenderIndex + 1)

        fs.writeFileSync(jsFileName, fileContentAsList.join(";"))
    }
}

function indexOfCloseBracketOfRender(renderContainingString) {
    const indexOfStartRenderBracket = renderContainingString.indexOf(RENDER_PART) + RENDER_PART.length - 1
    let stackIndex = 0
    for (let i = indexOfStartRenderBracket; i < renderContainingString.length; i++) {
        const currentLetter = renderContainingString[i]
        if (currentLetter === '(') {
            stackIndex++
        }
        if (currentLetter === ')') {
            stackIndex--
        }
        if (stackIndex === 0) {
            return i
        }
    }
    return -1
}

function distinctArray(array) {
    return Array.of(...new Map(array.map(i => [i, i])).values())
}

function processHtmlFile(htmlFileContent) {
    let lastIndexOfScript = htmlFileContent.lastIndexOf("</script>");
}

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + '/' + file;
        file = file.replace("//", "/")
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

module.exports = processDir