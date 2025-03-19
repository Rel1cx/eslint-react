import tsx from "dedent";

import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-hydrate";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        import ReactDom from "react-dom";
        import Component from "Component";

        ReactDom.hydrate(<Component />, document.getElementById("app"));
      `,
      errors: [{ messageId: "noHydrate" }],
      output: tsx`
        import { hydrateRoot } from "react-dom/client";
        import ReactDom from "react-dom";
        import Component from "Component";

        hydrateRoot(document.getElementById("app"), <Component />);
      `,
    },
    {
      code: tsx`
        import React from "react";
        import ReactDom from "react-dom";
        import Component from "Component";

        ReactDom.hydrate(<Component />, document.getElementById("app")!);
      `,
      errors: [{ messageId: "noHydrate" }],
      output: tsx`
        import { hydrateRoot } from "react-dom/client";
        import React from "react";
        import ReactDom from "react-dom";
        import Component from "Component";

        hydrateRoot(document.getElementById("app")!, <Component />);
      `,
    },
    {
      code: tsx`
        import React from "react";
        import ReactDom from "react-dom";
        import Component from "Component";

        const rootEl = document.getElementById("app")!;
        ReactDom.hydrate(<Component />, rootEl);
      `,
      errors: [{ messageId: "noHydrate" }],
      output: tsx`
        import { hydrateRoot } from "react-dom/client";
        import React from "react";
        import ReactDom from "react-dom";
        import Component from "Component";

        const rootEl = document.getElementById("app")!;
        hydrateRoot(rootEl, <Component />);
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
  ],
});
