import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as NodeServices from "@effect/platform-node/NodeServices";
// import * as ChildProcess from "effect/process/ChildProcess";
// import * as ChildProcessSpawner from "effect/process/ChildProcessSpawner";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Str from "effect/String";
import { P, match } from "ts-pattern";

const program = Effect.gen(function*() {
  const fs = yield* FileSystem.FileSystem;
  // const spawner = yield* ChildProcessSpawner.ChildProcessSpawner;
  // const branch = yield* spawner.string(ChildProcess.make("git", "branch", "--show-current"));
  const source = "README.md";
  const destination = "plugins/eslint-plugin/README.md";
  const buildToolVersion = match(JSON.parse(yield* fs.readFileString("package.json", "utf8")))
    .with({ devDependencies: { tsdown: P.select(P.string) } }, Str.replace("^", ""))
    .otherwise(() => "latest");
  const readmeContent = yield* fs.readFileString(source, "utf8");
  const readmeContentNew = readmeContent.replaceAll(
    /https:\/\/img\.shields\.io\/badge\/built_with-tsdown@.*-000000/g,
    `https://img.shields.io/badge/built_with-tsdown@${buildToolVersion.replaceAll("-", "--")}-000000`,
  );
  // Convert relative links to absolute links
  const readmeContentAbs = readmeContentNew.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("#")) {
      return match; // Leave absolute links unchanged
    }
    // const branchName = branch.trim();
    const branchName = "main";
    const absoluteUrl = `https://github.com/Rel1cx/eslint-react/tree/${branchName}/${url.replace(/^\.\//, "")}`;
    return `[${text}](${absoluteUrl})`;
  });
  // Ensure the destination directory exists
  yield* fs.makeDirectory("plugins/eslint-plugin", { recursive: true });
  yield* fs.writeFileString(source, readmeContentNew);
  yield* fs.writeFileString(destination, readmeContentAbs);
  yield* Effect.log(`Updated ${destination} from ${source}`);
});

program.pipe(Effect.provide(NodeServices.layer), NodeRuntime.runMain);
