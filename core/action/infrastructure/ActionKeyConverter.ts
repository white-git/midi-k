import { Key } from '@nut-tree/nut-js/dist/lib/key.enum'

export class ActionKeyConverter {
  private mapping: Indexable = {
    '.': 'period',
    ';': 'semicolon',
    '/': 'slash',
  }

  private replaceForMappings(key: string) {
    const chars = Object.keys(this.mapping)
    const name = chars.find(m => m === key)
    if (name) return this.mapping[name]
    return key
  }

  private findNutValue(key: string) {
    const keys = Object.keys(Key)
    const result = keys.find(k => k.toLowerCase() === key.toLowerCase())
    if (result !== undefined) return Key[result as keyof typeof Key]
  }

  public convert(keys: string[]) {
    return keys.map(k => {
      // #1 Replace for mappings.
      const replaced = this.replaceForMappings(k)
      // #2 Search for correct values within nut.js
      const value = this.findNutValue(replaced)
      if (value) return value
      return -1
    })
  }
}
