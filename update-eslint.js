const fs = require("fs");
let content = fs.readFileSync("examples/react-dom-with-custom-rules/eslint.config.ts", "utf8");

content = content.replace(
  'import { definePlugin, defineRuleListener } from "@eslint-react/kit";',
  'import { defineConfig as defineCustomRules, defineRuleListener } from "@eslint-react/kit";',
);

content = content.replace(
  "plugins: {\n      local: definePlugin(",
  "...defineCustomRules(",
);

content = content.replace(
  '        },\n      ),\n    },\n    rules: {\n      "local/function-component-definition": "error",\n    },\n  },\n);',
  "        }\n      )\n    },\n    { files: TSCONFIG_APP.include }\n  )\n);",
);

// wait actually it is better to just replace the whole block since it's cleaner.
