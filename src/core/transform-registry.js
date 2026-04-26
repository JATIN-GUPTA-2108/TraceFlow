const transforms = {
  string: (value) => String(value),
  number: (value) => Number(value),
  parseFloat: (value) => parseFloat(value),
  uppercase: (value) => (typeof value === "string" ? value.toUpperCase() : value),
};

function applyTransform(value, transformName) {
  if (!transformName || !transforms[transformName]) {
    return value;
  }

  return transforms[transformName](value);
}

module.exports = {
  transforms,
  applyTransform,
};
