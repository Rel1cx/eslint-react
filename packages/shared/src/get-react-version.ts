/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import module from "node:module";

export function getReactVersion(at = import.meta.url, fallback = "19.0.0") {
  const _require = module.createRequire(at);
  try {
    const version = _require("react")?.version;
    if (typeof version !== "string") throw new Error("Failed to read version from 'react' package");
    return version;
  } catch {
    // eslint-disable-next-line no-console
    console.warn(`Failed to detect React version from dependencies. Using fallback: ${fallback}`);
    return fallback;
  }
}
