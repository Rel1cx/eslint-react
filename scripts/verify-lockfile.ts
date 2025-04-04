import ansis from "ansis";
import { x } from "tinyexec";

const { stdout } = await x("git", ["diff", "HEAD@{1}", "--stat", "--", "./pnpm-lock.yaml"]);

if (stdout.split("\n").length > 0) {
  console.info("");
  console.info(ansis.yellow("Detected changes in pnpm-lock.yaml!"));
  console.info(
    ansis.yellowBright(
      "Please run `pnpm install --fix-lockfile && pnpm dedupe` to update local dependencies.",
    ),
  );
}
