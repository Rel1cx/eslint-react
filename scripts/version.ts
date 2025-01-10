import fs from "fs/promises";

import { isVersion } from "./libs";

export const version = await fs.readFile("VERSION", "utf-8")
  .then((v) => {
    const trimmed = v.trim();
    const version = trimmed.replace("v", "");
    if (!isVersion(version)) {
      throw new Error("Invalid version format");
    }
    return version;
  });
