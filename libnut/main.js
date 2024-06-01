const { keyboard, Key } = require('./nut-tree-js/nut-js')

module.exports = class Automation {
  setDelay(delay) {
    keyboard.config.autoDelayMs = delay
  }

  async sendKey(keys) {
    await keyboard.pressKey(...keys)
    await keyboard.releaseKey(...keys)
  }
}
