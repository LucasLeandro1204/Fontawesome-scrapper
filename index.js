#!/usr/bin/env node

const Commander = require('commander');
const FS        = require('fs');
const Path      = require('path');
const Parser    = require('./parser');

Commander.arguments('<dir> [filename]')
  .action((dir, filename = 'fontawesome-icons') => {
    let resolved = Path.join(dir, `${filename}.json`);

    Parser.json().then((json) => {
      FS.writeFile(resolved, JSON.stringify(json), (err) => {
        console.log(err ? err : `File saved in ${resolved}`);
      })
    })
    .catch(console.log);
  })
  .parse(process.argv);