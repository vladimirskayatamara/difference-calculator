import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  return sortedKeys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, children: buildDiff(data1[key], data2[key]), status: 'nested' };
    }
    if (!Object.hasOwn(data1, key)) {
      return { key, value: data2[key], status: 'added' };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, value: data1[key], status: 'deleted' };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        valueOld: data1[key],
        valueNew: data2[key],
        status: 'changed',
      };
    }

    return { key, value: data1[key], status: 'unchanged' };
  });
};

export default buildDiff;
