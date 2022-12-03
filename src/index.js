/* path.resolve(), process.cwd(): работа с абсолютным и относительными
путями */
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { cwd } from 'node:process';

const absolutepath = (filepath) => path.resolve(cwd(), filepath);

const readFileMakeObject = (filepath) => {
  const getpath = absolutepath(filepath);
  const readfile = fs.readFileSync(getpath, 'utf-8');
  return JSON.parse(readfile);
};

const genDiff = (path1, path2) => {
  const firstfile = readFileMakeObject(path1);
  const secondfile = readFileMakeObject(path2);
  const sortedfile1 = _.fromPairs(_.sortBy(Object.entries(firstfile)));
  const sortedfile2 = _.fromPairs(_.sortBy(Object.entries(secondfile)));
  const allkeysfromtwo = [...Object.keys(sortedfile1), ...Object.keys(sortedfile2)];
  const allvaluesfromtwo = [...Object.values(sortedfile1), ...Object.values(sortedfile2)];
  const lengthoffirstfile = Object.keys(firstfile).length;

  const result = allkeysfromtwo.reduce((acc, key, index) => {
    if (allkeysfromtwo.indexOf(key) === allkeysfromtwo.lastIndexOf(key)) {
      if (index < lengthoffirstfile) {
        return [...acc, [`  - ${key}`, firstfile[key]]];
      }
      return [...acc, [`  + ${key}`, secondfile[key]]];
    }
    const samevalue = allvaluesfromtwo[allkeysfromtwo.indexOf(key)]
     === allvaluesfromtwo[allkeysfromtwo.lastIndexOf(key)];
    if (samevalue && !acc.includes(key)) {
      return [...acc, [`    ${key}`, firstfile[key]]];
    } if (!samevalue) {
      return [...acc, [`  - ${key}`, firstfile[key]], [`  + ${key}`, secondfile[key]]];
    }
    return acc;
  }, []);

  const removedublicates = Object.entries(_.fromPairs(result));
  const finalstring = removedublicates.map((join) => join.join(': ')).join('\n');
  return `{\n${finalstring}\n}`;
};

export default genDiff;
