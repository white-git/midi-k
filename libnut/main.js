const { keyboard } = require('@nut-tree/nut-js')

module.exports = class Automation {
  /**
   * @param {Number} delay Delay in milliseconds
   */
  setDelay(delay) {
    keyboard.config.autoDelayMs = delay
  }

  /**
   * @param {Number[]} keys
   */
  async sendKey(keys) {
    await keyboard.pressKey(...keys)
    await keyboard.releaseKey(...keys)
  }
}
