import { entries, fromEntries } from "@eslint-react/types";

import { rules as domRules } from "./dom";

export const name = "@eslint-react/disable-dom";

export const rules = fromEntries(entries(domRules).map(([key]) => [key, "off"] as const));
