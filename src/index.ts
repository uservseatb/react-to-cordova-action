import core from '@actions/core'
import {processDir} from "./processors/DirProcessor";

try {
    const buildDir = core.getInput('build-dir');
    processDir(buildDir)
} catch (error) {
    core.setFailed(`${(error as any)?.message ?? error}`)
}