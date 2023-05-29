import yaml from 'js-yaml';

const parsersMap = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.yaml': yaml.load,
};

export default (data, format) => {
  const parse = parsersMap[format];
  return parse(data);
};
