import { entries, fromEntries } from "../utils";
import { rules as debugRules } from "./debug";

export const name = "@eslint-react/disable-debug";

export const rules = fromEntries(entries(debugRules).map(([key]) => [key, "off"] as const));
