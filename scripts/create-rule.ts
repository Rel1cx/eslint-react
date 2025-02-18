/* eslint-disable local/avoid-multiline-template-expression */
import fs from "node:fs/promises";
import path from "node:path";

import dedent from "dedent";

const [bin, pluginName = "x", ruleName] = process.argv;

if (!ruleName) {
  throw new Error("The rule name is required");
}

const pluginPath = path.resolve(__dirname, `../packages/plugins/eslint-plugin-react-${pluginName}`);
const rulePath = path.resolve(pluginPath, `src/rules/${ruleName}.ts`);
const testPath = path.resolve(pluginPath, `tests/rules/${ruleName}.spec.ts`);
const docsPath = path.resolve(pluginPath, `docs/rules/${ruleName}.md`);

const ruleTemplate = dedent`
  import * as AST from "@eslint-react/ast";
  import type { RuleFeature } from "@eslint-react/shared";

  import { createRule } from "../utils";

  export const RULE_NAME = "${ruleName}";

  export const RULE_FEATURES = [
    "CHK",
  ] as const satisfies RuleFeature[];

  export type MessageID = "MESSAGE_ID";

  export default createRule<[], MessageID>({
    meta: {
      type: "problem",
      docs: {
        description: "",
        [Symbol.for("rule_features")]: RULE_FEATURES,
      },
      messages: {
          MESSAGE_ID: "",
      },
      schema: [],
    },
    name: RULE_NAME,
    create(context) {
      return {};
    },
    defaultOptions: [],
  });
`;

const docsTemplate = dedent`
  ---
  title: ${ruleName}
  ---

  **Full Name in \`eslint-plugin-react-${pluginName}\`**

  \`\`\`plain copy
  react-${pluginName}/${ruleName}
  \`\`\`

  **Full Name in \`@eslint-react/eslint-plugin\`**

  \`\`\`plain copy
  @eslint-react/${ruleName}
  \`\`\`

  **Features**

  \`🔍\`

  ## What it does

  ## Examples

  ### Failing

  \`\`\`tsx
  \`\`\`

  ### Passing

  \`\`\`tsx
  \`\`\`

  ## Implementation

  - [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-${pluginName}/src/rules/${ruleName}.ts)
  - [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-${pluginName}/src/rules/${ruleName}.spec.ts)
`;
