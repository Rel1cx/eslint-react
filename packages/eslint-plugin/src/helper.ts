export function createRulesWithPrefix<T extends Record<string, unknown>, U extends string>(rules: T, prefix: U) {
  return Object.fromEntries(Object.entries(rules).map(([key, value]) => [`${prefix}/${String(key)}`, value])) as {
    [K in Extract<keyof T, string> as `${U}/${K}`]: T[K];
  };
}
