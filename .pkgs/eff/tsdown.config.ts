import { buildConfig } from "@local/configs/tsdown.config.base";
import type { UserConfig } from "tsdown";

export default {
  ...buildConfig(process.cwd()),
  platform: "neutral",
} satisfies UserConfig;
