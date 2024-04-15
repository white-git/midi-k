export class Model {
  public id = Math.random().toString(36).slice();

  public toJson() {
    const cache: object[] = [];

    return JSON.stringify(this, (_, value) => {
      if (value && typeof value === 'object') {
        if (~cache.indexOf(value)) return;
        cache.push(value);
      }

      return value;
    });
  }
}
