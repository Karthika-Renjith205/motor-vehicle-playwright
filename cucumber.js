const { TIMEOUT } = require("dns");

module.exports = {
  default: {
    timeout: 50 * 1000,
    require: ["tests/steps/*.ts", "tests/pageObjects/*.ts", "src/config/*.ts"],
    publishQuiet: true,
    format: ["progress"],
    paths: ["tests/features/*.feature"],
    requireModule: ["ts-node/register"]
  }
};
