import { getConfigAdapters } from "@eslint-react/shared";

import * as recommendedConfig from "./configs/recommended";
import * as strictConfig from "./configs/strict";
import { plugin } from "./plugin";

const { toFlatConfig } = getConfigAdapters("react-dom", plugin);

export default {
  ...plugin,
  configs: {
    ["recommended"]: toFlatConfig(recommendedConfig),
    ["strict"]: toFlatConfig(strictConfig),
  },
};
