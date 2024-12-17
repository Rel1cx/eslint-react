/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable import-x/no-extraneous-dependencies */
import module from "node:module";

export function getReactVersion(at = import.meta.url, fallback = "19.0.0"): string {
  const require = module.createRequire(at);
  try {
    return require("react").version ?? fallback;
  } catch {
    // eslint-disable-next-line no-console
    console.warn(`Failed to detect React version. Falling back to ${fallback}.`);
    return fallback;
  }
}
