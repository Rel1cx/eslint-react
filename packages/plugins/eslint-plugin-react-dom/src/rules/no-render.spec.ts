import tsx from "dedent";

import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-render";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        import React from "react";
        import { render } from "react-dom/client";
        import Component from "Component";

        render(<Component />, document.getElementById("app"));
      `,
      errors: [{ messageId: "noRender" }],
      output: tsx`
        import { createRoot } from "react-dom/client";
        import React from "react";
        import { render } from "react-dom/client";
        import Component from "Component";

        createRoot(document.getElementById("app")).render(<Component />);
      `,
    },
    {
      code: tsx`
        import React from "react";
        import ReactDom from "react-dom";
        import Component from "Component";

        ReactDom.render(<Component />, document.getElementById("app"));
      `,
      errors: [{ messageId: "noRender" }],
      output: tsx`
        import { createRoot } from "react-dom/client";
        import React from "react";
        import ReactDom from "react-dom";
        import Component from "Component";

        createRoot(document.getElementById("app")).render(<Component />);
      `,
    },
  ],
  valid: [
    tsx`
      import React from "react";
      import { render } from "react-dom/client";
      import Component from "Component";

      createRoot(document.getElementById("app")).render(<Component />);
    `,
    tsx`
      import React from "react";
      import ReactDom from "react-dom";
      import Component from "Component";

      createRoot(document.getElementById("app")).render(<Component />);
    `,
  ],
});
