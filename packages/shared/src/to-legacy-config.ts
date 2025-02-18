import { dual } from "@eslint-react/eff";

import type { RulePreset } from "./types";

type FlatConfigLike = {
  name: string;
  rules: RulePreset;
};

type LegacyConfigLike = {
  plugins: string[];
  rules: RulePreset;
};

export const toLegacyConfig: {
  (config: FlatConfigLike, plugins: string[]): LegacyConfigLike;
  (plugins: string[]): (config: FlatConfigLike) => LegacyConfigLike;
} = dual(2, (config: FlatConfigLike, plugins: string[]) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name: drop, ...rest } = config;
  return {
    ...rest,
    plugins,
  };
});
