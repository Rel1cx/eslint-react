import { getConfigAdapters } from "@eslint-react/shared";

import * as allConfig from "./configs/all";
import { plugin } from "./plugin";

const { toFlatConfig } = getConfigAdapters("react-debug", plugin);

export default {
  ...plugin,
  configs: {
    ["all"]: toFlatConfig(allConfig),
  },
};
