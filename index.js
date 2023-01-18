const core = require('@actions/core')
const {processDir} = require('DirProcessor')

try {
    const buildDir = core.getInput('build-dir');
    processDir(buildDir)
} catch (error) {
    core.setFailed(error.message);
}
