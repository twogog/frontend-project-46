const whichValue = (value) => {
  switch (typeof value) {
    case 'object': return value !== null ? '[complex value]' : null;
    case 'string': return `'${value}'`;
    default: return value;
  }
};

const plain = (astTree) => {
  const plainformat = astTree.filter((node) => node.status !== 'unchanged')
    .map((node) => {
      const parent = node.parent.length === 0 ? node.name : `${node.parent.join('.')}.${node.name}`;
      if (node.status === 'added') {
        return `Property '${parent}' was added with value: ${whichValue(node.value)}`;
      } if (node.status === 'removed') {
        return `Property '${parent}' was removed`;
      }
      return `Property '${parent}' was updated. From ${whichValue(node.from)} to ${whichValue(node.to)}`;
    });
  return plainformat.join('\n');
};

export default plain;
