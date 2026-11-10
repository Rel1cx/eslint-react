/// <reference types="node" />
import { buildConfig } from "@local/configs/tsl.config.base";
import { globSync } from "tinyglobby";

const base = buildConfig(process.cwd());

export default {
  ...base,
  ignore: [
    ...base.ignore ?? [],
    // Forked from eslint-plugin-react-hooks; kept in sync with upstream, exempt from local lint rules
    ...globSync(["src/rules/exhaustive-deps/*.ts"], { ignore: ["**/node_modules/**"] }),
  ],
};
