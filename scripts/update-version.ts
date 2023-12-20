import type { BunFile } from "bun";
import type { PackageJson } from "type-fest";

import { version } from "./version";

const GLOB_PACKAGE_JSON = "packages/**/package.json";

async function makeTask(file: BunFile) {
  if (!file.name) {
    return;
  }

  const packageJson = await file.json<PackageJson>();
  const packageJsonUpdated = {
    ...packageJson,
    version,
  };

  await Bun.write(file, JSON.stringify(packageJsonUpdated, null, 2));
}

const tasks = Array
  .from(new Bun.Glob(GLOB_PACKAGE_JSON).scanSync())
  .map(p => Bun.file(p))
  .map(makeTask);

await Promise.all(tasks);
await makeTask(Bun.file("package.json"));
