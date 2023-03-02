const core = require('@actions/core');
const path = require('path');
const fs = require('fs/promises');

const getVersion = async (filePath) => {
    console.log(filePath);
    const content = await fs.readFile(filePath);
    const pkg = JSON.parse(content.toString());
    core.setOutput('version', pkg.version);
}

const buildUri = (actor, token, uri) => {

    if(!uri.startsWith('https://')) throw new Error('not an https uri, can not continue');
    core.setOutput('repoUri', uri.replace('https://', `https://${actor}:${token}@`));
}

const run = async () => {
    
    try {
        const filePath = core.getInput('path');
        const fullPath = path.join(process.env.GITHUB_WORKSPACE, filePath);
        await getVersion(fullPath);

        buildUri(
            core.getInput('actor', { required: true }),
            core.getInput('uri', { required: true }),
            core.getInput('token', { required: true })
        );

    } catch (e) {
        core.setFailed(e.message);
    }
}

run();
