import type { PackageJson } from "type-fest";

import { version } from "./version";

const tasks = Array
  .from(new Bun.Glob("packages/*/package.json").scanSync())
  .map(p => Bun.file(p))
  .map(async file => {
    if (!file.name) {
      return;
    }

    const packageJsonUpdated = {
      ...await file.json<PackageJson>(),
      version,
    };

    await Bun.write(file, JSON.stringify(packageJsonUpdated, null, 2));

    Bun.spawnSync(["bun", "x", "sort-package-json", file.name], {
      stdio: ["inherit", "inherit", "inherit"],
    });

    Bun.spawn(["bun", "x", "dprint", "fmt", file.name], {
      stdio: ["inherit", "inherit", "inherit"],
    });
  });

await Promise.all(tasks);
