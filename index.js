const core = require('@actions/core');
const gh = require('@actions/github');
const path = require('path');
const fs = require('fs/promises');

const getVersion = async (filePath) => {
    console.log(filePath);
    const content = await fs.readFile(filePath);
    const pkg = JSON.parse(content.toString());
    core.setOutput('version', pkg.version);
}

const buildUri = (actor, token, uri) => {

    if(!url.startsWith('https://')) throw new Error('not an https uri, can not continue');
    core.setOutput('repoUri', uri.replace('https://', `https://${actor}:${token}@`));
}

const run = async () => {
    
    try {
        const path = core.getInput('path');
        const fullPath = path.join(process.env.GITHUB_WORKSPACE, path);
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
