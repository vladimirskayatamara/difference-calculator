import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import format from './formatters/index.js';

const getAbsolutePath = (filepath) => path.resolve(filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf8');

const getFormat = (filepath) => path.extname(filepath);

export default (filepath1, filepath2, nameFormater = 'stylish') => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);

  const parsedFile1 = parse(file1, getFormat(filepath1));
  const parsedFile2 = parse(file2, getFormat(filepath2));

  const diffTree = buildDiff(parsedFile1, parsedFile2);

  return format(diffTree, nameFormater);
};
