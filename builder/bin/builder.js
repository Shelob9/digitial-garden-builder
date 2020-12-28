var shell = require('shelljs');

var fs = require('fs');
function gardenConfig() {
    //Get config from the garden.json
    let config = fs.readFileSync('garden.json', 
        { encoding: 'utf8', flag: 'r' });
    //Write it to garden.js
    fs.writeFileSync('digitial-garden-builder/client/garden.js', `module.exports = ${config}`);
}

function git(cmd,errorMessage) {
    if (shell.exec(cmd).code !== 0) {
        shell.echo(errorMessage);
        shell.exit(1);
    } else {
        return true;
    }   
}

function install() {
    //** Install Garden Builder */
    if (shell.test('-d', 'digitial-garden-builder')) {
        shell.rm('-rf', 'digitial-garden-builder');
    }
    return git(
                'git clone --depth 1 git@github.com:Shelob9/digitial-garden-builder.git',
                'Error: Git checkout failed'
        )
}


function html() {
    /** Create Garden HTML */
    shell.echo( '!Making HTML and such out of the Garden!')
    shell.cp('client.env', 'digitial-garden-builder/client/.env');
    gardenConfig();
    shell.exec('cd digitial-garden-builder/client && yarn')
    shell.exec('cd digitial-garden-builder/client && yarn build')
    shell.exec('cd digitial-garden-builder/client && yarn export');
    return true;
}

function deploy() {
    /** Delete docs dir */
    if (shell.test('-d', 'docs')) {
        shell.rm('-rf', 'docs');
    }
    /** Copy out dir */
    shell.echo( '!Copying to output directory!')
    shell.cp('-R', 'digitial-garden-builder/client/out', 'docs');
    /** Switch to gh-pages branch, commit and push */
    git(
        'git checkout gh-pages',
        'Error: Checking out gh-pages branch'
    )
    git(
        'git pull origin gh-pages',
        'Error: Pulling gh-pages branch from origin'
    )
    git(
        //Add all to commit
        'git add .',
        'Error: adding build'
    )
    git(
        //-a adds all to commit
        'git commit -am "Commit HTML"',
        'Error: committing build'
    )
    git(
        'git push -u origin gh-pages',
        'Error: push failed'
    )
}

module.exports = {
    deploy,
    html,
    install
}