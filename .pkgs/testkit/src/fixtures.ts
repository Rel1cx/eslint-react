/// <reference types="node" />
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

export function getFixturesRootDir(): string {
  return path.join(here, "..", "..", "..", "testing", "samples");
}
