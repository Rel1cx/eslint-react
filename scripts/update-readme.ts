import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as Command from "@effect/platform/Command";
import * as CommandExecutor from "@effect/platform/CommandExecutor";
import * as FileSystem from "@effect/platform/FileSystem";
import * as Effect from "effect/Effect";
import * as Str from "effect/String";
import { P, match } from "ts-pattern";

const getCurrentBranch = Command.make("git", "branch", "--show-current");

const program = Effect.gen(function*() {
  const fs = yield* FileSystem.FileSystem;
  const ce = yield* CommandExecutor.CommandExecutor;
  const branch = yield* ce.string(getCurrentBranch);
  const source = "README.md";
  const destination = "packages/plugins/eslint-plugin/README.md";
  const buildToolVersion = match(JSON.parse(yield* fs.readFileString("package.json", "utf8")))
    .with({ devDependencies: { tsdown: P.select(P.string) } }, Str.replace("^", ""))
    .otherwise(() => "latest");
  const readmeContent = yield* fs.readFileString(source, "utf8");
  // dprint-ignore
  const readmeContentNew = readmeContent.replaceAll(/https:\/\/img\.shields\.io\/badge\/built_with-tsdown@.*-000000/g, `https://img.shields.io/badge/built_with-tsdown@${buildToolVersion.replaceAll("-", "--")}-000000`);
  // Convert relative links to absolute links
  const readmeContentAbs = readmeContentNew.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("#")) {
      return match; // Leave absolute links unchanged
    }
    const absoluteUrl = `${`https://github.com/Rel1cx/eslint-react/tree/${branch.trim()}`}/${url.replace(/^\.\//, "")}`;
    return `[${text}](${absoluteUrl})`;
  });
  // Ensure the destination directory exists
  yield* fs.makeDirectory("packages/plugins/eslint-plugin", { recursive: true });
  yield* fs.writeFileString(source, readmeContentNew);
  yield* fs.writeFileString(destination, readmeContentAbs);
  yield* Effect.log(`Updated ${destination} from ${source}`);
});

program.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
