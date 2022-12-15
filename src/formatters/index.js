import stylish from './stylish.js';
import plain from './plain.js';
import toJson from './json.js';

const formatter = (astTree, formatName) => {
  if (formatName === 'stylish') {
    return stylish(astTree);
  } if (formatName === 'plain') {
    return plain(astTree);
  } if (formatName === 'json') {
    return toJson(astTree);
  }
  return 'wrong format';
};

export default formatter;
