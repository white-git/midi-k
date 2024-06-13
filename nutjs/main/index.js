const { keyboard } = require('nutjs');

module.exports = async function press(codes) {
  await keyboard.pressKey(...codes);
  await keyboard.releaseKey(...codes);
};
