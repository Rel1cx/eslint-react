import { getConfigAdapters } from "@eslint-react/shared";

import * as recommendedConfig from "./configs/recommended";
import * as recommendedTypeCheckedConfig from "./configs/recommended-type-checked";
import * as recommendedTypeScriptConfig from "./configs/recommended-typescript";
import * as strictConfig from "./configs/strict";
import * as strictTypeCheckedConfig from "./configs/strict-type-checked";
import * as strictTypeScriptConfig from "./configs/strict-typescript";

import { plugin } from "./plugin";

const { toFlatConfig } = getConfigAdapters("react-x", plugin);

export default {
  ...plugin,
  configs: {
    ["recommended"]: toFlatConfig(recommendedConfig),
    ["recommended-type-checked"]: toFlatConfig(recommendedTypeCheckedConfig),
    ["recommended-typescript"]: toFlatConfig(recommendedTypeScriptConfig),
    ["strict"]: toFlatConfig(strictConfig),
    ["strict-type-checked"]: toFlatConfig(strictTypeCheckedConfig),
    ["strict-typescript"]: toFlatConfig(strictTypeScriptConfig),
  },
};
