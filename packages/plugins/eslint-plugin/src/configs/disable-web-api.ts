import { entries, fromEntries } from "../utils";

import { rules as webApiRules } from "./web-api";

export const name = "@eslint-react/disable-web-api";

export const rules = fromEntries(entries(webApiRules).map(([key]) => [key, "off"] as const));
