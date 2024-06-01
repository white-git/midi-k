const { keyboard, Key } = require('@nut-tree/nut-js')

module.exports = class Automation {
  /**
   * @param {number} delay - in milliseconds.
   */
  setDelay(delay) {
    keyboard.config.autoDelayMs = delay
  }

  /**
   * @param {Key[]} keys - reference to nut.js Key enum.
   */
  async sendKey(keys) {
    await keyboard.pressKey(...keys)
    await keyboard.releaseKey(...keys)
  }
}
