/**
 * Iterator-like methods whose callback's return value becomes an item in a rendered list,
 * mapped to the position of the callback in the call's argument list.
 * `from` covers `Array.from(iterable, mapFn)`.
 */
export const KNOWN_CALLBACK_POSITIONS = new Map<string, number>([
  ["flatMap", 0],
  ["from", 1],
  ["map", 0],
]);
