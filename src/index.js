import _ from 'lodash';
import parse from './parsers.js';
import formatter from './formatters/index.js';

const makeNode = (key, parents, objvalue, statusvalue, fromobj, toobj) => {
  if (statusvalue !== 'updated') {
    return {
      name: key, parent: parents, value: objvalue, status: statusvalue,
    };
  }
  return {
    name: key,
    parent: parents,
    value: objvalue,
    status: statusvalue,
    from: fromobj,
    to: toobj,
  };
};

const genDiff = (path1, path2, formatName = 'stylish') => {
  const firstfile = parse(path1);
  const secondfile = parse(path2);

  const buildTree = (node1, node2, parents) => {
    const obj1 = node1;
    const obj2 = node2;
    const allkeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
    return allkeys.flatMap((key) => {
      if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
        if (!_.isObject(obj1[key])) {
          if (obj1[key] === obj2[key]) {
            return makeNode(key, parents, obj1[key], 'unchanged');
          }
          return makeNode(key, parents, obj1[key], 'updated', obj1[key], obj2[key]);
        }
        if (!_.isObject(obj2[key]) && _.isObject(obj1[key])) {
          return makeNode(key, parents, obj1[key], 'updated', obj1[key], obj2[key]);
        }
      }

      if (!Object.hasOwn(obj1, key)) {
        return makeNode(key, parents, obj2[key], 'added');
      }
      if (!Object.hasOwn(obj2, key)) {
        return makeNode(key, parents, obj1[key], 'removed');
      }
      return [makeNode(key, parents, {}, 'unchanged'), ...buildTree(obj1[key], obj2[key], [...parents, key])];
    });
  };
  const astTree = buildTree(firstfile, secondfile, []);
  return formatter(astTree, formatName);
};

export default genDiff;
