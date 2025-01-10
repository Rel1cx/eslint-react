/* eslint-disable @susisu/safe-typescript/no-type-assertion */
/**
 * This is an enhanced version of the typeof operator to check the type of more complex values.
 * In this case we just mind about arrays and objects. We can add more on demand.
 * @param t the value to be checked
 * @returns the type of the value
 */
export function typeOf(t: unknown) {
  return Object.prototype.toString
    .call(t)
    .replace(/^\[object (.+)\]$/, "$1")
    .toLowerCase() as "array" | "object" | (string & {});
}
