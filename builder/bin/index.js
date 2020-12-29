#!/usr/bin/env node

var shell = require('shelljs');

const {
    deploy,
    html,
    install,
    after
} = require('./builder');
(async () => {
    /** */
    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git');
        shell.exit(1);
    } else {
        install();
        html();
        deploy();
        after();
    }
})()