import { getConfigAdapters } from "@eslint-react/shared";

import * as recommendedConfig from "./configs/recommended";
import * as recommendedTypeCheckedConfig from "./configs/recommended-type-checked";
import * as recommendedTypeScriptConfig from "./configs/recommended-typescript";
import { plugin } from "./plugin";

const { toFlatConfig } = getConfigAdapters("react-x", plugin);

export default {
  ...plugin,
  configs: {
    ["recommended"]: toFlatConfig(recommendedConfig),
    ["recommended-type-checked"]: toFlatConfig(recommendedTypeCheckedConfig),
    ["recommended-typescript"]: toFlatConfig(recommendedTypeScriptConfig),
  },
};
