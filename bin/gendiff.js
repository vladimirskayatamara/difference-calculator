#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .version('0.0.1')

  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .description('Compares two configuration files and shows a difference.')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.opts().format));
  });
program.parse();
