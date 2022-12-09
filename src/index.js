import _ from 'lodash';
import parse from './parsers.js';
import stylish from './stylish.js';

const genDiff = (path1, path2) => {
  const firstfile = parse(path1);
  const secondfile = parse(path2);
  let tree = [];

  const isValueObject = (objvalue1, objvalue2) => {
    if ((_.isObject(objvalue1) && !_.isArray(objvalue1))
      && (_.isObject(objvalue2) && !_.isArray(objvalue2))) {
      return true;
    }
    return false;
  };
  let parents = '';
  const buildTree = (node1, node2) => {
    const obj1 = node1;
    const obj2 = node2;
    const allkeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
    allkeys.map((key) => {
      
      if (parents.length > 0) {
        const firsttry = _.get(firstfile, parents);
        const secondtry = _.get(secondfile, parents);
        if (firsttry !== undefined) {
          if (!Object.keys(firsttry).includes(key) && !Object.keys(secondtry).includes(key)) {
            if (parents.split('.').length > 1) {
              const temporare = parents.split('.');
              temporare.pop();
              parents = temporare.join('.');
            } else parents = '';
          }
        }
        if (secondtry !== undefined) {
          if (!Object.keys(secondtry).includes(key) && !Object.keys(firsttry).includes(key)) {
            if (parents.split('.').length > 1) {
              const temporare = parents.split('.');
              temporare.pop();
              parents = temporare.join('.');
            } else parents = '';
          }
        }
      }
      if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
        if (!_.isObject(obj1[key])) {
          if (obj1[key] === obj2[key]) {
            tree = [...tree, { name: key, parent: parents, value: obj1[key], status: 'unchanged' }];
          } else {
            tree = [...tree, { name: key, parent: parents, value: obj1[key], status: 'updated',
              from: obj1[key], to: obj2[key] }];
          }
        } else {
          tree = [...tree, { name: key, parent: parents, value: obj1[key], status: 'unchanged' }];
        }
      }
      if (!Object.hasOwn(obj1, key)) {
        tree = [...tree, { name: key, parent: parents, value: obj2[key], status: 'added' }];
      }
      if (!Object.hasOwn(obj2, key)) {
        tree = [...tree, { name: key, parent: parents, value: obj1[key], status: 'removed' }];
      }
      if (isValueObject(obj1[key], obj2[key])) {
        parents.length > 0 ? parents += `.${key}`: parents += key;
        buildTree(obj1[key], obj2[key]);
      }
    });
  };
  buildTree(firstfile, secondfile);

  return stylish(tree);
};

export default genDiff;
