const core = require('@actions/core');
const github = require('@actions/github');

try {
    console.log(`The event payload 12`);

} catch (error) {
    core.setFailed(error.message);
}