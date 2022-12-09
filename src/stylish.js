import _ from 'lodash';

const stylish = (asttree) => {
  // _.repeat()
  // tylishtree.replaceAll('""', '');
  const stylishtree = {};
  asttree.map((element) => {
    let intend = element.parent.split('.').length;
    (element.parent).length === 0 ? '' : intend += 1;
    let value;
    _.isObject(element.value) ? value = {}: value = element.value;
    let name;
    if (element.parent === '') {
      name = `${element.name}`;
    } else name = `${element.parent}.${element.name}`;
    _.set(stylishtree, name, value);
  });
  return stylishtree.replaceAll('""', '');
};

export default stylish;
