import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }

  return _.isString(data) ? `'${data}'` : `${data}`;
};

const plain = (data) => {
  const iter = (diff, keys) => {
    const lines = diff.flatMap((obj) => {
      const currentPath = [...keys, obj.key].join('.');
      const { status } = obj;
      switch (status) {
        case 'added':
          return `Property '${currentPath}' was added with value: ${stringify(obj.value)}`;
        case 'deleted':
          return `Property '${currentPath}' was removed`;
        case 'changed':
          return `Property '${currentPath}' was updated. From ${stringify(obj.valueOld)} to ${stringify(obj.valueNew)}`;
        case 'unchanged':
          return [];
        case 'nested':
          return iter(obj.children, [...keys, obj.key]);
        default:
          throw new Error(`Unknown property status: '${status}'!`);
      }
    });

    return lines.length === 0 ? lines : lines.join('\n');
  };

  return iter(data, []);
};

export default plain;
