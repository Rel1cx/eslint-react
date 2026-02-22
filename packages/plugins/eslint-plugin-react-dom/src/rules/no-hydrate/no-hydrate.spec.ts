import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
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
