export class Model {
  public toJson() {
    const cache: object[] = []

    return JSON.stringify(this, (_, value) => {
      if (value && typeof value === 'object') {
        if (~cache.indexOf(value)) return
        cache.push(value)
      }

      return value
    })
  }
}
