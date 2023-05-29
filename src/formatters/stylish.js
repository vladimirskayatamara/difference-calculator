import _ from 'lodash';

const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const indentSize = depth + spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - 1);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(value, 1);
};

const mapMarkers = {
  added: '+ ',
  deleted: '- ',
  unchanged: '  ',
  nested: '  ',
};
const lengthMarker = 2;

const stylish = (data) => {
  const iter = (currentValue, depth) => {
    const replacer = ' ';
    const spacesCount = 4;

    const indentSize = depth * spacesCount - lengthMarker;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat((depth - 1) * spacesCount);
    const createLine = (name, value, marker) => `${currentIndent}${marker}${name}: ${stringify(value, ' '.repeat(spacesCount), depth)}`;

    const lines = currentValue
      .reduce((acc, {
        name, value, status, children,
      }) => {
        if (status === 'changed') {
          const line1 = createLine(name, value.old, mapMarkers.deleted);
          const line2 = createLine(name, value.new, mapMarkers.added);
          return [...acc, line1, line2];
        }
        const currentData = (children !== undefined) ? iter(children, depth + 1) : value;
        const line = createLine(name, currentData, mapMarkers[status]);
        return [...acc, line];
      }, []);
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(data, 1);
};

export default stylish;
