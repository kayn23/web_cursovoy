export function useCreateInvoiceFilter<T extends Record<string, string>>(params: T) {
  return Object.keys(params)
    .filter((item) => !['page'].includes(item))
    .reduce((acc, key) => {
      return acc + ` and ${key} = '${params[key]}'`
    }, '')
}
