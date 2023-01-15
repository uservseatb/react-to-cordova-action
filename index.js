const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {
    console.log(`The event payload 12`);
    const buildDir = core.getInput('build-dir');
    const walkBuildDir = walk(buildDir)
    let jsFiles = walkBuildDir.filter((f) => f.endsWith(".js"));
    let htmlFiles = walkBuildDir.filter((f) => f.endsWith(".html"));
    console.log(jsFiles)
    console.log(htmlFiles)
    const jsFile = fs.readFileSync(jsFiles[0])
    console.log(jsFile)
} catch (error) {
    core.setFailed(error.message);
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