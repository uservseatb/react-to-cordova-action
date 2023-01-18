const fs = require("fs");

function processDir(dirName) {
    console.log("processing the ", dirName)
    const walkBuildDir = walk(dirName)
    let jsFiles = walkBuildDir.filter((f) => f.endsWith(".js"));
    let htmlFiles = walkBuildDir.filter((f) => f.endsWith(".html"));
    //
    // processJsFiles(jsFiles)
    // processHtmlFiles(jsFiles)
}

function processJsFiles(jsFiles) {
    jsFiles.forEach(function (jsFileName) {
        console.log(jsFileName)
        const jsFile = fs.readFileSync(jsFileName).toString()
        processJsFile(jsFile)
    })
}

function processHtmlFiles(htmlFiles) {
    htmlFiles.forEach(function (htmlFileName) {
        console.log(htmlFileName)
        const htmlFile = fs.readFileSync(htmlFileName).toString()
        processHtmlFile(htmlFile)
    })
}

function processJsFile(jsFileContent) {
    console.log(jsFileContent)

    jsFileContent.lastIndexOf("")
}

function processHtmlFile(htmlFileContent) {
    console.log(htmlFileContent)

    let lastIndexOfScript = htmlFileContent.lastIndexOf("</script>");
    console.log(lastIndexOfScript)
}

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + '/' + file;
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

// }

// document.addEventListener('deviceready', startApp, false)


// const root = ReactDOM.createRoot(
//     document.getElementById('app-container')
// );
//
// root.render(
//     <React.StrictMode>
//         <App/>
//     </React.StrictMode>
// );
