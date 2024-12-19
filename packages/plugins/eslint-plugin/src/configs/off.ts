import { entries, fromEntries } from "@eslint-react/types";

import { rules as allRules } from "./all";
import { rules as disableTypeCheckedRules } from "./disable-type-checked";

export const name = "@eslint-react/off";

export const rules = {
  ...fromEntries(entries(allRules).map(([key]) => [key, "off"] as const)),
  ...disableTypeCheckedRules,
};
