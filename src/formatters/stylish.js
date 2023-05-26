import _ from 'lodash';

const getIndent = (depth, replacer = ' ', count = 4) => replacer.repeat((depth + 1) * count);
const getBracketIndent = (depth, replacer = ' ', count = 4) => replacer.repeat(depth * count);

const stringify = (node, depth) => {
  if (_.isArray(node)) {
    return `[${node}]`;
  }

  if (!_.isObject(node)) {
    return `${node}`;
  }

  const indent = getIndent(depth);
  const bracketIndent = getBracketIndent(depth);
  const lines = Object
    .entries(node)
    .map(([key, value]) => `${indent}${key}: ${stringify(value, depth + 1)}`);

  return ['{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (data) => {
  const iter = (diff, depth) => {
    const indent = getIndent(depth).slice(0, -2);
    const bracketIndent = getBracketIndent(depth);
    const lines = diff.map((obj) => {
      const { status } = obj;
      switch (status) {
        case 'added':
          return `${indent}+ ${obj.key}: ${stringify(obj.value, depth + 1)}`;
        case 'deleted':
          return `${indent}- ${obj.key}: ${stringify(obj.value, depth + 1)}`;
        case 'changed':
          return [
            `${indent}- ${obj.key}: ${stringify(obj.valueOld, depth + 1)}`,
            `${indent}+ ${obj.key}: ${stringify(obj.valueNew, depth + 1)}`,
          ].join('\n');
        case 'unchanged':
          return `${indent}  ${obj.key}: ${stringify(obj.value, depth + 1)}`;
        case 'nested':
          return `${indent}  ${obj.key}: ${iter(obj.children, depth + 1)}`;
        default:
          throw new Error(`Unknown property status: '${status}'!`);
      }
    });

    return ['{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(data, 0);
};

export default stylish;
