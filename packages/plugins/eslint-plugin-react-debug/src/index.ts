import { getConfigAdapters } from "@eslint-react/shared";

import * as allConfig from "./configs/all";
import { plugin } from "./plugin";

const { toFlatConfig, toLegacyConfig } = getConfigAdapters("react-debug", plugin);

export default {
  ...plugin,
  configs: {
    ["all"]: toFlatConfig(allConfig),
    ["all-legacy"]: toLegacyConfig(allConfig),
  },
};
