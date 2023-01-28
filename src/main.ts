import * as core from '@actions/core'
import {processDir} from "./processors/DirProcessor";

try {
    const buildDir = core.getInput('build-dir');
    let transformers = core.getInput('transformers');
    if (!transformers) {
        transformers = "reactjs,reacthtml"
    }
    let cordovaAppVersion = core.getInput('cordova-app-version');
    processDir(buildDir, transformers.split(","), cordovaAppVersion)
} catch (error) {
    console.log(error)
    core.setFailed(`${(error as any)?.message ?? error}`)
}