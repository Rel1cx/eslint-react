/**
 * High complexity file (expected ~9)
 */
export function advancedHandler(input, options) {
  try {
    if (input == null) {
      return null;
    }

    if (options.enabled && options.mode === "fast") {
      for (let i = 0; i < input.length; i++) {
        if (input[i] > 100) {
          return "big";
        }
      }
      return "small";
    }

    if (options.mode === "safe" || options.mode === "strict") {
      switch (options.level) {
        case 1:
          return input.level1 ? "L1" : "L0";
        case 2:
          return input.level2 ? "L2" : "L1";
        case 3:
          return input.level3 ? "L3" : "L2";
        default:
          return "unknown";
      }
    }

    const fallback = options.fallback
      ? options.fallback(input)
      : input.default || (input.backup ? "backup" : "none");

    return fallback;
  } catch (err) {
    if (options.silent) {
      return null;
    }
    throw err;
  }
}
