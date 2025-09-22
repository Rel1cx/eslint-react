import { getConfigAdapters } from "@eslint-react/shared";

import * as recommendedConfig from "./configs/recommended";
import { plugin } from "./plugin";

const { toFlatConfig } = getConfigAdapters("react-web-api", plugin);

export default {
  ...plugin,
  configs: {
    ["recommended"]: toFlatConfig(recommendedConfig),
  },
};
