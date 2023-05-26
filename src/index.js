import fs from 'fs';
import path from 'path';
import process from 'process';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import formatDiff from './formatters/index.js';

const getData = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(fullPath, 'utf8');
};

const getExtension = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(getData(filepath1), getExtension(filepath1));
  const data2 = parse(getData(filepath2), getExtension(filepath2));

  return formatDiff(buildDiff(data1, data2), formatName);
};

export default genDiff;
