export function isSafeRel(value: string) {
  return /\bnoreferrer\b/u.test(value) && /\bnoopener\b/u.test(value);
}
