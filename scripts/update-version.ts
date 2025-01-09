import { isMatching, match, P } from "ts-pattern";

import { ignores } from "./ignores";
import { glob, readJsonFile, writeJsonFile } from "./libs";
import { version } from "./version";

const GLOB_PACKAGE_JSON = ["package.json", "packages/*/package.json", "packages/*/*/package.json"];

const mkTask = (path: string) => {
  return async () => {
    const packageJson = await readJsonFile(path);
    if (!isMatching({ version: P.string }, packageJson)) {
      throw new Error(`Invalid package.json at ${path}`);
    }
    const newVersion = version;
    const oldVersion = match(packageJson)
      .with({ version: P.select(P.string) }, v => v)
      .otherwise(() => "0.0.0");
    if (oldVersion === newVersion) {
      console.info(`Skipping ${path} as it's already on version ${newVersion}`);
      return;
    }
    const packageJsonUpdated = {
      ...packageJson,
      version: newVersion,
    };
    await writeJsonFile(path, packageJsonUpdated);
    console.info(`Updated ${path} to version ${packageJsonUpdated.version}`);
  };
};

async function main() {
  const tasks = glob(GLOB_PACKAGE_JSON, ignores);
  await Promise.all(tasks.map(mkTask));
}

await main();
