import _ from 'lodash';

const stylish = (asttree) => {
  // _.repeat()
  // tylishtree.replaceAll('""', '');
  const stylishtree = {};
  asttree.map((element) => {
    console.log(stylishtree)
    let intend = element.parent.split('.').length;
    (element.parent).length === 0 ? '' : intend += 1;
    let value = '';
    let name = '';
    let prefix = '';
    if (_.isObject(element.value)) {
      if (element.status === 'unchanged') {
        value = {};
      }
    }

    if (!_.isObject(element.value)) {
      value = element.value;
      switch (element.status) {
        case 'unchanged': prefix = '';
          break;
        case 'removed': prefix = '- ';
          break;
        case 'added': prefix = '+ ';
          break;
        case 'updated':
          let firstname;
          let secondname;
          if (element.parent === '') {
            firstname = `- ${element.name}`;
            secondname = `+ ${element.name}`;
          } else {
            firstname = `${element.parent}.- ${element.name}`;
            secondname = `${element.parent}.+ ${element.name}`;
          }
          _.set(stylishtree, firstname, element.from);
          _.set(stylishtree, secondname, element.to);
          break;
        default: return;
      }
    }
    if (element.status !== 'updated') {
      if (element.parent === '') {
        name = `${prefix}${element.name}`;
      } else name = `${element.parent}.${prefix}${element.name}`;
      _.set(stylishtree, name, value);
    }
  });
  console.log(stylishtree)
};

export default stylish;
