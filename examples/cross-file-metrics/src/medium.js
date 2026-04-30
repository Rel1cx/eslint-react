/**
 * Medium complexity file (expected ~4)
 */
export function classify(value) {
  if (value < 0) {
    return "negative";
  }
  if (value === 0) {
    return "zero";
  }
  if (value > 0 && value < 10) {
    return "small";
  }
  return "large";
}

export function process(items) {
  const results = [];
  for (const item of items) {
    results.push(item * 2);
  }
  return results;
}
