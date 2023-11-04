export function isUpperCase(str: string) {
  const upperCaseStr = str.toUpperCase();
  const lowerCaseStr = str.toLowerCase();

  return str === upperCaseStr && upperCaseStr !== lowerCaseStr;
}

export function isLowerCase(str: string) {
  const upperCaseStr = str.toUpperCase();
  const lowerCaseStr = str.toLowerCase();

  return str === lowerCaseStr && upperCaseStr !== lowerCaseStr;
}

export function isPascalCase(str: string) {
  if (str[0] && !isUpperCase(str[0])) {
    return false;
  }

  if (str.length === 1) {
    return isUpperCase(str);
  }

  const anyNonAlphaNumeric = Array.from(str.slice(1)).some(
    (char) => char.toLowerCase() === char.toUpperCase() && !/\d/u.test(char),
  );

  if (anyNonAlphaNumeric) {
    return false;
  }

  return Array.from(str.slice(1)).some((char) =>
    isLowerCase(char)
    || /\d/u.test(char)
  );
}
