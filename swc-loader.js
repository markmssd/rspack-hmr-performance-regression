const swc = require('@swc/core');

const prod = process.env.NODE_ENV === "production";

const swcOptions = {
  sourceMaps: true,
  jsc: {
    parser: {
      syntax: "typescript",
      tsx: true
    },
    transform: {
      react: {
        runtime: "automatic",
        development: !prod,
        refresh: !prod
      }
    },
    externalHelpers: true
  },
  env: {
    targets: "Chrome >= 48"
  }
};

module.exports = function swcLoader(source) {
  const callback = this.async();

  (async () => {
    try {
      const { code: finalCode, map: sourceMap } = await swc.transform(source, swcOptions);

      callback(null, finalCode, sourceMap);
    } catch (err) {
      callback(err);
    }
  })();
};
