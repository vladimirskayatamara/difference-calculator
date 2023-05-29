import _ from 'lodash';

const plain = (tree, prefix = '') => {
  const getValue = ((value) => (_.isObject(value) ? '[complex value]' : JSON.stringify(value).replaceAll('"', '\'')));
  const getLineMap = {
    deleted: (name) => `Property '${prefix}${name}' was removed`,
    added: (name, value) => `Property '${prefix}${name}' was added with value: ${getValue(value)}`,
    changed: (name, value) => `Property '${prefix}${name}' was updated. From ${getValue(value.old)} to ${getValue(value.new)}`,
  };

  const getLine = (node) => {
    if (Object.hasOwn(node, 'children')) {
      return plain(node.children, `${prefix}${node.name}.`);
    }
    const buildLine = getLineMap[node.status];
    return buildLine(node.name, node.value);
  };

  return tree
    .filter((node) => node.status !== 'unchanged')
    .map((node) => getLine(node)).join('\n');
};

export default plain;
