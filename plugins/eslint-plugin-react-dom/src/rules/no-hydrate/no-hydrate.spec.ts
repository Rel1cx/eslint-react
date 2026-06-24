import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
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
        import { hydrateRoot } from "react-dom/client";
        import ReactDOM from "react-dom";
        import Component from "Component";

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
        import { hydrateRoot } from "react-dom/client";
        import React from "react";
        import ReactDOM from "react-dom";
        import Component from "Component";

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
        import { hydrateRoot } from "react-dom/client";
        import React from "react";
        import ReactDOM from "react-dom";
        import Component from "Component";

        const rootEl = document.getElementById("app")!;
        hydrateRoot(rootEl, <Component />);
      `,
    },
    {
      code: tsx`
        import { hydrate } from "react-dom";
        (hydrate as any)(<div />, document.body);
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { hydrateRoot } from "react-dom/client";
        import { hydrate } from "react-dom";
        hydrateRoot(document.body, <div />);
      `,
    },
    // In assignment expression
    {
      code: tsx`
        import { hydrate } from "react-dom";
        const result = hydrate(<Component />, document.getElementById("app"));
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { hydrateRoot } from "react-dom/client";
        import { hydrate } from "react-dom";
        const result = hydrateRoot(document.getElementById("app"), <Component />);
      `,
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
