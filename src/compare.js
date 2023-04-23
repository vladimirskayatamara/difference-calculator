import _ from 'lodash';

const compareObject = (content1, content2) => {
  const keys1 = Object.keys(content1);
  const keys2 = Object.keys(content2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);

  const treeOfDiff = sortedKeys.map((key) => {
    if (_.isPlainObject(content1[key]) && _.isPlainObject(content2[key])) {
      return { key, type: 'object', children: compareObject(content1[key], content2[key]) };
    }
    if (!_.has(content1, key)) {
      return { key, type: 'added', value: content2[key] };
    }
    if (!_.has(content2, key)) {
      return { key, type: 'deleted', value: content1[key] };
    }
    if (content1[key] !== content2[key]) {
      return { key, type: 'changed', oldValue: content1[key], newValue: content2[key] };
    }
    return { key, type: 'unchanged', value: content2[key] };
  });
  return treeOfDiff;
};

export default compareObject;