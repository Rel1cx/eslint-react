import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-unused-props";

ruleTester.run(RULE_NAME, rule, {
  invalid: [],
  valid: [
    ...allValid,
  ],
});
