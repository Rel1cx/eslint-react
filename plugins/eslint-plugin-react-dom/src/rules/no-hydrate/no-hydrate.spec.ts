import tsx from "dedent";

import { ruleTester } from "@local/testkit";
import rule, { RULE_NAME } from "./no-hydrate";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        import ReactDOM from "react-dom";
        import Component from "Component";

        ReactDOM.hydrate(<Component />, document.getElementById("app"));
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import ReactDOM from "react-dom";
        import Component from "Component";
        import { hydrateRoot } from "react-dom/client";

        hydrateRoot(document.getElementById("app"), <Component />);
      `,
    },
    {
      code: tsx`
        import React from "react";
        import ReactDOM from "react-dom";
        import Component from "Component";

        ReactDOM.hydrate(<Component />, document.getElementById("app")!);
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import React from "react";
        import ReactDOM from "react-dom";
        import Component from "Component";
        import { hydrateRoot } from "react-dom/client";

        hydrateRoot(document.getElementById("app")!, <Component />);
      `,
    },
    {
      code: tsx`
        import React from "react";
        import ReactDOM from "react-dom";
        import Component from "Component";

        const rootEl = document.getElementById("app")!;
        ReactDOM.hydrate(<Component />, rootEl);
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import React from "react";
        import ReactDOM from "react-dom";
        import Component from "Component";
        import { hydrateRoot } from "react-dom/client";

        const rootEl = document.getElementById("app")!;
        hydrateRoot(rootEl, <Component />);
      `,
    },
    // Merges into an existing import from the same source
    {
      code: tsx`
        import { hydrate } from "react-dom";
        import { createRoot } from "react-dom/client";

        hydrate(<div />, document.body);
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { hydrate } from "react-dom";
        import { createRoot, hydrateRoot } from "react-dom/client";

        hydrateRoot(document.body, <div />);
      `,
    },
    // No duplicate import when `hydrateRoot` is already imported
    {
      code: tsx`
        import { hydrate } from "react-dom";
        import { hydrateRoot } from "react-dom/client";

        hydrate(<div />, document.body);
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { hydrate } from "react-dom";
        import { hydrateRoot } from "react-dom/client";

        hydrateRoot(document.body, <div />);
      `,
    },
    // Return value used in an assignment (no auto-fix)
    {
      code: tsx`
        import { hydrate } from "react-dom";
        const fact = hydrate(<Component />, document.getElementById("app"));
      `,
      errors: [{ messageId: "default" }],
      output: null,
    },
    // Return value used in a return statement (no auto-fix)
    {
      code: tsx`
        import { hydrate } from "react-dom";
        function mount() {
          return hydrate(<Component />, document.getElementById("app"));
        }
      `,
      errors: [{ messageId: "default" }],
      output: null,
    },
    {
      code: tsx`
        import { hydrate } from "react-dom";
        (hydrate as any)(<div />, document.body);
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { hydrate } from "react-dom";
        import { hydrateRoot } from "react-dom/client";
        hydrateRoot(document.body, <div />);
      `,
    },
    // Optional third callback argument (no auto-fix)
    {
      code: tsx`
        import { hydrate } from "react-dom";
        hydrate(<Component />, document.getElementById("app"), () => {});
      `,
      errors: [{ messageId: "default" }],
      output: null,
    },
    // Arguments hidden in a spread (no auto-fix)
    {
      code: tsx`
        import { hydrate } from "react-dom";
        hydrate(<Component />, ...[document.getElementById("app"), () => {}]);
      `,
      errors: [{ messageId: "default" }],
      output: null,
    },
    // Missing second argument (no auto-fix)
    {
      code: tsx`
        import { hydrate } from "react-dom";
        hydrate(<Component />);
      `,
      errors: [{ messageId: "default" }],
      output: null,
    },
    // No arguments (no auto-fix)
    {
      code: tsx`
        import { hydrate } from "react-dom";
        hydrate();
      `,
      errors: [{ messageId: "default" }],
      output: null,
    },
    // `hydrateRoot` is already bound by another module (no auto-fix)
    {
      code: tsx`
        import { hydrate } from "react-dom";
        import { hydrateRoot } from "some-other-lib";

        hydrate(<div />, document.body);
      `,
      errors: [{ messageId: "default" }],
      output: null,
    },
    // A default import bound to `hydrateRoot` does not provide the named export (no auto-fix)
    {
      code: tsx`
        import { hydrate } from "react-dom";
        import hydrateRoot from "react-dom/client";

        hydrate(<div />, document.body);
      `,
      errors: [{ messageId: "default" }],
      output: null,
    },
    // Known limitation: only import declarations are scanned for name conflicts, so a
    // local top-level binding is not detected and the fix inserts a duplicate import
    {
      code: tsx`
        import { hydrate } from "react-dom";

        const hydrateRoot = () => {};

        hydrate(<div />, document.body);
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { hydrate } from "react-dom";
        import { hydrateRoot } from "react-dom/client";

        const hydrateRoot = () => {};

        hydrateRoot(document.body, <div />);
      `,
    },
  ],
  valid: [
    tsx`
      import React from "react";
      import { hydrateRoot } from "react-dom/client";
      import Component from "Component";

      hydrateRoot(document.getElementById("app"), <Component />);
    `,
    tsx`
      import React from "react";
      import { hydrateRoot } from "react-dom/client";
      import Component from "Component";

      hydrateRoot(document.getElementById("app")!, <Component />);
    `,
    // hydrate imported from another module
    tsx`
      import { hydrate } from "some-other-lib";
      hydrate(<Component />, document.getElementById("app"));
    `,
    // Variable named hydrate but not called
    tsx`
      const hydrate = 1;
      console.log(hydrate);
    `,
  ],
});
