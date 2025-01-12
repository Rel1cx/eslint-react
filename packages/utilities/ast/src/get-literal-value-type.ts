export function getLiteralValueType(input: bigint | boolean | null | number | string | symbol) {
  // eslint-disable-next-line local/prefer-eqeq-nullish-comparison
  if (input === null) return "null";
  return typeof input;
}
