import renderStylish from './stylish.js';
import renderPlain from './plain.js';
import renderJson from './json.js';

const formatMap = {
  stylish: renderStylish,
  plain: renderPlain,
  json: renderJson,
};

export default (data, nameFormater) => {
  const render = formatMap[nameFormater];
  return render(data);
};
