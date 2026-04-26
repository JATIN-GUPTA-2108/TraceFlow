const { get, set } = require("lodash");
const { applyTransform } = require("./transform-registry");

function applyMapping(input, rules = []) {
  const output = {};

  for (const rule of rules) {
    const sourceValue = get(input, rule.sourcePath);
    const transformedValue = applyTransform(sourceValue, rule.transform);
    set(output, rule.targetPath, transformedValue);
  }

  return output;
}

module.exports = {
  applyMapping,
};
