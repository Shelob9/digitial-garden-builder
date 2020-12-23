#!/usr/bin/env node

var shell = require('shelljs');

const {
    deploy,
    html,
    install
} = require('./bin/builder');
(async () => {
    /** */
    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git');
        shell.exit(1);
    } else {
        install();
        html();
        deploy();
    }
})()