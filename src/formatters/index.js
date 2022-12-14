import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (astTree, formatName) => {
  if (formatName === 'stylish') {
    return stylish(astTree);
  } if (formatName === 'plain') {
    return plain(astTree);
  }
};

export default formatter;
