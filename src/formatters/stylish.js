import _ from 'lodash';

const stylish = (asttree) => {
  const stylishtree = {};
  asttree.map((element) => {
    let value = '';
    let name = '';
    let prefix = '';
    let firstname = '';
    let secondname = '';
    if (_.isObject(element.value)) {
      switch (element.status) {
        case 'unchanged': value = {};
          break;
        case 'added':
          prefix = '+ ';
          value = element.value;
          break;
        case 'removed':
          prefix = '- ';
          value = element.value;
          break;
        case 'updated':
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
        default:
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
        default:
      }
    }
    if (element.status !== 'updated') {
      if (element.parent === '') {
        name = `${prefix}${element.name}`;
      } else name = `${element.parent}.${prefix}${element.name}`;
      _.set(stylishtree, name, value);
    }
  });

  const stylishstring = JSON.stringify(stylishtree, null, 4)
    .replaceAll('"', '')
    .replaceAll(',', '')
    .replaceAll('  +', '+')
    .replaceAll('  -', '-');
  return stylishstring;
};

export default stylish;
