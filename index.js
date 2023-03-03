const core = require('@actions/core');
const path = require('path');
const fs = require('fs/promises');

const getVersion = async (filePath) => {
    console.log(filePath);
    const content = await fs.readFile(filePath);
    const pkg = JSON.parse(content.toString());
    core.setOutput('version', pkg.version);
}

const run = async () => {
    
    try {
        const filePath = core.getInput('path');
        const fullPath = path.join(process.env.GITHUB_WORKSPACE, filePath);
        await getVersion(fullPath);
    } catch (e) {
        core.setFailed(e.message);
    }
}

run();
