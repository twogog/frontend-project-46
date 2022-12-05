import fs from 'fs';
import path from 'path';
import { cwd } from 'node:process';
import yaml from 'js-yaml';

const parse = (filepath) => {
  const getpath = path.resolve(cwd(), filepath);
  const readfile = fs.readFileSync(getpath, 'utf-8');
  const format = path.extname(filepath);
  if (format === '.yaml' || format === '.yml') {
    return yaml.load(readfile);
  } if (format === '.json') {
    return JSON.parse(readfile);
  }
  return console.log('wrong format or path');
};

export default parse;
