#!/usr/bin/env node

const Commander = require('commander');
const FS        = require('fs');
const Path      = require('path');
const Parser    = require('./parser');

Commander.arguments('<dir>')
  .action((dir) => {
    let resolved = Path.resolve(dir, 'fontawesome-icons.json');

    Parser.json().then((json) => {
      FS.writeFile(resolved, JSON.stringify(json), (err) => {
        console.log(err ? err : `File saved in `);
      })
    })
    .catch(console.log);
  })
  .parse(process.argv);