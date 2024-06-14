const path = require('path');

// If certain message descriptors don't have id,
// this pattern will be used to automatically generate IDs for them.
// See https://github.com/webpack/loader-utils#interpolatename for sample patterns
const getIdInterpolationPattern = (resourcePath) => {
  // Babel might use absolute paths. For this case we should remove everything before 'app/'.
  const relativeResourcePath = resourcePath.replace(/^.*\/(?=app\/)/, '');
  const pathname = path.dirname(relativeResourcePath).split('/').join('.');
  return `${pathname}.[name].[sha512:contenthash:base64:10]`;
};

module.exports = getIdInterpolationPattern;
