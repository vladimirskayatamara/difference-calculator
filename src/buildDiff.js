import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const sortesKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  return sortesKeys.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return { name: key, status: 'added', value: obj2[key] };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { name: key, status: 'deleted', value: obj1[key] };
    }
    if ((_.isObject(obj1[key])) && (_.isObject(obj2[key]))) {
      return { name: key, status: 'nested', children: buildDiff(obj1[key], obj2[key]) };
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      return { name: key, status: 'unchanged', value: obj1[key] };
    }
    return { name: key, status: 'changed', value: { old: obj1[key], new: obj2[key] } };
  });
};

export default buildDiff;
