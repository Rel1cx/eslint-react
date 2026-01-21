export function isIdentifierName(name: string) {
  return /^[A-Z$_][\w$]*$/i.test(name);
}
