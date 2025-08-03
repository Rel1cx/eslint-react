import module from "node:module";

import path from "node:path";

/**
 * @internal
 */
export const _require = module.createRequire(process.cwd() + path.sep);
