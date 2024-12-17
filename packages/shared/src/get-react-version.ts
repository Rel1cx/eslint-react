/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable import-x/no-extraneous-dependencies */
import module from "node:module";

const require = module.createRequire(import.meta.url);

export function getReactVersion(fallback = "19.0.0"): string {
  try {
    return require("react").version ?? fallback;
  } catch {
    // eslint-disable-next-line no-console
    console.warn(`Failed to detect React version. Falling back to ${fallback}.`);
    return fallback;
  }
}
