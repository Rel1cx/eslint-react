import type { BunFile } from "bun";
import type { PackageJson } from "type-fest";

import { version } from "./version";

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

  Bun.spawnSync(["bun", "x", "sort-package-json", file.name], {
    stdio: ["inherit", "inherit", "inherit"],
  });

  Bun.spawn(["bun", "x", "dprint", "fmt", file.name], {
    stdio: ["inherit", "inherit", "inherit"],
  });
}

const tasks = Array
  .from(new Bun.Glob("{packages,examples}/*/package.json").scanSync())
  .map(p => Bun.file(p))
  .map(makeTask);

await Promise.all(tasks);

await makeTask(Bun.file("package.json"));
