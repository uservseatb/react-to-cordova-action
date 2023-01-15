const core = require('@actions/core');

try {
    console.log(`The event payload`);
} catch (error) {
    core.setFailed(error.message);
}