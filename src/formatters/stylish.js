import _ from 'lodash';

const setNewValue = (acctree, node, parents, status) => {
  if (status === 'unchanged') {
    if (_.isObject(node.value)) {
      const parent = parents.length === 0 ? `${node.name}` : `${parents.join('.')}.${node.name}`;
      return _.set(acctree, parent, {});
    }
    const parent = parents.length === 0 ? `${node.name}` : `${parents.join('.')}.${node.name}`;
    return _.set(acctree, parent, node.value);
  } if (status === 'removed') {
    const parent = parents.length === 0 ? `- ${node.name}` : `${parents.join('.')}.- ${node.name}`;
    return _.set(acctree, parent, node.value);
  } if (status === 'added') {
    const parent = parents.length === 0 ? `+ ${node.name}` : `${parents.join('.')}.+ ${node.name}`;
    return _.set(acctree, parent, node.value);
  }
  const removed = parents.length === 0 ? `- ${node.name}` : `${parents.join('.')}.- ${node.name}`;
  const added = parents.length === 0 ? `+ ${node.name}` : `${parents.join('.')}.+ ${node.name}`;
  return [removed, added];
};

const stylish = (asttree) => {
  const stylishtree = asttree.reduce((acctree, node) => {
    const ifupdated = setNewValue(acctree, node, node.parent, node.status);
    if (node.status !== 'updated') {
      return acctree;
    }
    _.set(acctree, ifupdated[0], node.from);
    _.set(acctree, ifupdated[1], node.to);
    return acctree;
  }, {});

  const stylishstring = JSON.stringify(stylishtree, null, 4)
    .replaceAll('"', '')
    .replaceAll(',', '')
    .replaceAll('  +', '+')
    .replaceAll('  -', '-');
  return stylishstring;
};

export default stylish;
