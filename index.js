const core = require('@actions/core');
const gh = require('@actions/github');


try {
    const pathToPackageJson = core.getInput('location', { required: true });
    console.log(`package to json set to ${pathToPackageJson}`);
    const now = (new Date()).toDateString();
    core.setOutput('time', now);
    const payload = JSON.stringify(gh.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);

} catch (e) {
    core.setFailed(e.message);
}
