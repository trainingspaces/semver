const core = require('@actions/core');
const gh = require('@actions/github');
const path = require('path');


try {
    const pathToPackageJson = core.getInput('location');
    console.log(process.env);
    console.log(`package to json set to ${path.join(process.env.GITHUB_WORKSPACE, pathToPackageJson)}`);
    const now = (new Date()).toDateString();
    core.setOutput('time', now);
    const payload = JSON.stringify(gh.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);

} catch (e) {
    core.setFailed(e.message);
}
