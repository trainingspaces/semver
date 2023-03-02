const core = require('@actions/core');
const gh = require('@actions/github');
const path = require('path');
const fs = require('fs/promises');

const readPkgJson = async (file) => {
    const content = await fs.readFile(file);
    return JSON.parse(content.toString());
}

const run = async () => {
    
    try {
        const location = core.getInput('location');
        const pkg = await readPkgJson(path.join(process.env.GITHUB_WORKSPACE, location));
        core.setOutput('version', pkg.version);
    } catch (e) {
        core.setFailed(e.message);
    }
}

run();
