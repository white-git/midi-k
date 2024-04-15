export function formdataToObject<T>(formdata: FormData) {
  return <T>Array
    .from(formdata.keys())
    .reduce((obj: Indexable, k: string) => (obj[k] = formdata.get(k), obj), {});
}
