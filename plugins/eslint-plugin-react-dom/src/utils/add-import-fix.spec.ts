import tsx from "dedent";

import { ruleTester } from "@local/testkit";
import { addImportFix } from "./add-import-fix";
import { createRule } from "./create-rule";

const RULE_NAME = "add-import-fix-test";

type TestOptions = [{ name: string; source: string }];

const defaultOptions: TestOptions = [{ name: "added", source: "module" }];

// A pass-through rule that reports on the program with addImportFix as its only fix
const testRule = createRule<TestOptions, "default">({
  meta: {
    type: "problem",
    docs: {
      description: "Test rule that applies addImportFix to the whole program.",
    },
    fixable: "code",
    messages: {
      default: "Add the import.",
    },
    schema: [
      {
        type: "object",
        properties: {
          name: { type: "string" },
          source: { type: "string" },
        },
        additionalProperties: false,
      },
    ],
  },
  name: RULE_NAME,
  create(context, [options]) {
    return {
      Program(node) {
        context.report({
          fix: (fixer) => {
            const result = addImportFix(context, fixer, options.name, options.source);
            return result.kind === "add" ? result.fix : null;
          },
          messageId: "default",
          node,
        });
      },
    };
  },
  defaultOptions,
});

ruleTester.run(RULE_NAME, testRule, {
  invalid: [
    // No imports, directives, or comments: the import goes to the very top
    {
      code: tsx`
        call();
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { added } from "module";
        call();
      `,
    },
    // Empty file
    {
      code: "",
      errors: [{ messageId: "default" }],
      output: 'import { added } from "module";\n',
    },
    // A file with only a comment keeps the comment on top
    {
      code: "// TODO: nothing here yet",
      errors: [{ messageId: "default" }],
      output: tsx`
        // TODO: nothing here yet
        import { added } from "module";
      `,
    },
    // Leading line comments stay above the new import
    {
      code: tsx`
        // Copyright (c) Example Corp.
        // Licensed under MIT.

        call();
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        // Copyright (c) Example Corp.
        // Licensed under MIT.
        import { added } from "module";

        call();
      `,
    },
    // Leading block comments stay above the new import
    {
      code: tsx`
        /*
         * Copyright (c) Example Corp.
         */

        call();
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        /*
         * Copyright (c) Example Corp.
         */
        import { added } from "module";

        call();
      `,
    },
    // A file-level directive stays at the very top
    {
      code: tsx`
        "use client";

        call();
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        "use client";
        import { added } from "module";

        call();
      `,
    },
    // The import goes after the whole directive prologue
    {
      code: tsx`
        "use strict";
        "use client";

        call();
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        "use strict";
        "use client";
        import { added } from "module";

        call();
      `,
    },
    // A header comment followed by a directive keeps both on top
    {
      code: tsx`
        // Copyright (c) Example Corp.
        "use client";

        call();
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        // Copyright (c) Example Corp.
        "use client";
        import { added } from "module";

        call();
      `,
    },
    // The import goes after the last existing import
    {
      code: tsx`
        import a from "a";
        import b from "b";

        call();
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import a from "a";
        import b from "b";
        import { added } from "module";

        call();
      `,
    },
    // Directive plus imports: after the last import, below the directive
    {
      code: tsx`
        "use client";
        import a from "a";

        call();
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        "use client";
        import a from "a";
        import { added } from "module";

        call();
      `,
    },
    // A trailing comment on the last import line stays on its own line
    {
      code: tsx`
        import a from "a"; // note
        call();
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import a from "a"; // note
        import { added } from "module";
        call();
      `,
    },
    // A trailing comment on the directive line stays on its own line
    {
      code: tsx`
        "use client"; // required
        call();
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        "use client"; // required
        import { added } from "module";
        call();
      `,
    },
    // Same-line block comments are trailing comments too
    {
      code: tsx`
        import a from "a"; /* note */ /* more */
        call();
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import a from "a"; /* note */ /* more */
        import { added } from "module";
        call();
      `,
    },
    // Boundary: a comment on the next line is not a trailing comment
    {
      code: tsx`
        import a from "a";
        // about the call below
        call();
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import a from "a";
        import { added } from "module";
        // about the call below
        call();
      `,
    },
    // A trailing comment at the end of the file
    {
      code: 'import a from "a"; // note',
      errors: [{ messageId: "default" }],
      output: 'import a from "a"; // note\nimport { added } from "module";',
    },
    // Merges into an existing import from the same source
    {
      code: tsx`
        import { existing } from "module";

        call();
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { existing, added } from "module";

        call();
      `,
    },
    // Merges after the last named specifier even with a default import
    {
      code: tsx`
        import mod, { existing } from "module";

        call();
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import mod, { existing, added } from "module";

        call();
      `,
    },
    // With several imports from the same source, merges into the first one
    {
      code: tsx`
        import { a } from "module";
        import { b } from "module";

        call();
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { a, added } from "module";
        import { b } from "module";

        call();
      `,
    },
    // An aliased import of the same export does not count as already imported
    {
      code: tsx`
        import { added as existing } from "module";

        call();
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { added as existing, added } from "module";

        call();
      `,
    },
    // Inline type specifiers do not prevent merging a value specifier
    {
      code: tsx`
        import { type Existing, other } from "module";

        call();
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { type Existing, other, added } from "module";

        call();
      `,
    },
    // A namespace-only import from the same source cannot be merged into
    {
      code: tsx`
        import * as mod from "module";

        call();
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import * as mod from "module";
        import { added } from "module";

        call();
      `,
    },
    // A default-only import from the same source cannot be merged into
    {
      code: tsx`
        import mod from "module";

        call();
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import mod from "module";
        import { added } from "module";

        call();
      `,
    },
    // A type-only import from the same source binds no runtime value
    {
      code: tsx`
        import type { added } from "module";

        call();
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import type { added } from "module";
        import { added } from "module";

        call();
      `,
    },
    // Subpath imports are not the same source
    {
      code: tsx`
        import { existing } from "module/sub";

        call();
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { existing } from "module/sub";
        import { added } from "module";

        call();
      `,
    },
    // Already imported under the same local name: no import fix
    {
      code: tsx`
        import { added } from "module";

        call();
      `,
      errors: [{ messageId: "default" }],
      output: null,
    },
    // Already imported among several specifiers: no import fix
    {
      code: tsx`
        import { a, added, b } from "module";

        call();
      `,
      errors: [{ messageId: "default" }],
      output: null,
    },
    // Custom name and source via options
    {
      code: tsx`
        import { useFormState } from "react-dom";
        import { useState } from "react";

        call();
      `,
      options: [{ name: "useActionState", source: "react" }],
      errors: [{ messageId: "default" }],
      output: tsx`
        import { useFormState } from "react-dom";
        import { useState, useActionState } from "react";

        call();
      `,
    },
    // Boundary: the local name is taken by a different export of the same source
    {
      code: tsx`
        import { other as added } from "module";

        call();
      `,
      errors: [{ messageId: "default" }],
      output: null,
    },
    // Boundary: the local name is taken by an import from another source
    {
      code: tsx`
        import { added } from "other";

        call();
      `,
      errors: [{ messageId: "default" }],
      output: null,
    },
    // Boundary: the local name is taken by a default import
    {
      code: tsx`
        import added from "other";

        call();
      `,
      errors: [{ messageId: "default" }],
      output: null,
    },
    // Boundary: the local name is taken by a namespace import
    {
      code: tsx`
        import * as added from "module";

        call();
      `,
      errors: [{ messageId: "default" }],
      output: null,
    },
    // Boundary: `import { default as x }` binds the default export, not `x`
    {
      code: tsx`
        import { default as added } from "module";

        call();
      `,
      errors: [{ messageId: "default" }],
      output: null,
    },
    // Boundary: an import below other statements is still the anchor
    {
      code: tsx`
        call();
        import a from "a";
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        call();
        import a from "a";
        import { added } from "module";
      `,
    },
    // Boundary: a side-effect import from the same source has nothing to merge into
    {
      code: tsx`
        import "module";

        call();
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import "module";
        import { added } from "module";

        call();
      `,
    },
    // Boundary: a string literal after other code is not a directive
    {
      code: tsx`
        call();
        "use client";
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { added } from "module";
        call();
        "use client";
      `,
    },
    // Boundary: a parenthesized string is not a directive
    {
      code: tsx`
        ("use client");
        call();
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { added } from "module";
        ("use client");
        call();
      `,
    },
    // Boundary: merging preserves a trailing comma
    {
      code: tsx`
        import { a, } from "module";
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { a, added, } from "module";
      `,
    },
    // Boundary: merging preserves the original spacing
    {
      code: tsx`
        import {existing} from "module";
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import {existing, added} from "module";
      `,
    },
    // Boundary: merging into a multiline import appends to the last specifier's line
    {
      code: tsx`
        import {
          a,
          b,
        } from "module";
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import {
          a,
          b, added,
        } from "module";
      `,
    },
    // Boundary: a re-export is not an import declaration
    {
      code: tsx`
        export { a } from "module";
        call();
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { added } from "module";
        export { a } from "module";
        call();
      `,
    },
    // Boundary: an import and code on the same line
    {
      code: 'import a from "a"; call();',
      errors: [{ messageId: "default" }],
      output: 'import a from "a";\nimport { added } from "module"; call();',
    },
    // Boundary: CRLF line endings are preserved
    {
      code: 'import a from "a";\r\ncall();',
      errors: [{ messageId: "default" }],
      output: 'import a from "a";\r\nimport { added } from "module";\r\ncall();',
    },
    // Boundary: CRLF line endings with no existing imports
    {
      code: "call();\r\nmore();",
      errors: [{ messageId: "default" }],
      output: 'import { added } from "module";\r\ncall();\r\nmore();',
    },
    // Boundary: a shebang stays at the very top of the file
    {
      code: "#!/usr/bin/env node\ncall();",
      errors: [{ messageId: "default" }],
      output: '#!/usr/bin/env node\nimport { added } from "module";\ncall();',
    },
    // Boundary: a leading BOM stays ahead of the inserted import
    {
      code: "\uFEFFcall();",
      errors: [{ messageId: "default" }],
      output: '\uFEFFimport { added } from "module";\ncall();',
    },
  ],
  valid: [],
});
