import tsx from "dedent";

import { ruleTester } from "#/test";
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
      errors: [{ messageId: "default" }],
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
        import ReactDOM from "react-dom";
        import Component from "Component";

        ReactDOM.render(<Component />, document.getElementById("app"));
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { createRoot } from "react-dom/client";
        import React from "react";
        import ReactDOM from "react-dom";
        import Component from "Component";

        createRoot(document.getElementById("app")).render(<Component />);
      `,
    },
    {
      code: tsx`
        import React from "react";
        import ReactDOM from "react-dom";
        import Component from "Component";

        ReactDOM.render(<Component />, document.getElementById("app")!);
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { createRoot } from "react-dom/client";
        import React from "react";
        import ReactDOM from "react-dom";
        import Component from "Component";

        createRoot(document.getElementById("app")!).render(<Component />);
      `,
    },
    {
      code: tsx`
        import React from "react";
        import ReactDOM from "react-dom";
        import Component from "Component";

        const rootEl = document.getElementById("app")!;
        ReactDOM.render(<Component />, rootEl);
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { createRoot } from "react-dom/client";
        import React from "react";
        import ReactDOM from "react-dom";
        import Component from "Component";

        const rootEl = document.getElementById("app")!;
        createRoot(rootEl).render(<Component />);
      `,
    },
    {
      code: tsx`
        import { render } from "react-dom";
        (render as any)(<div />, document.body);
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { createRoot } from "react-dom/client";
        import { render } from "react-dom";
        createRoot(document.body).render(<div />);
      `,
    },
    // In assignment expression
    {
      code: tsx`
        import { render } from "react-dom";
        const result = render(<Component />, document.getElementById("app"));
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { createRoot } from "react-dom/client";
        import { render } from "react-dom";
        const result = createRoot(document.getElementById("app")).render(<Component />);
      `,
    },
    // Missing second argument (no auto-fix)
    {
      code: tsx`
        import { render } from "react-dom";
        render(<Component />);
      `,
      errors: [{ messageId: "default" }],
      output: null,
    },
    // No arguments (no auto-fix)
    {
      code: tsx`
        import { render } from "react-dom";
        render();
      `,
      errors: [{ messageId: "default" }],
      output: null,
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
      import ReactDOM from "react-dom";
      import Component from "Component";

      createRoot(document.getElementById("app")).render(<Component />);
    `,
    // render imported from another module
    tsx`
      import { render } from "some-other-lib";
      render(<Component />, document.getElementById("app"));
    `,
    // Variable named render but not called
    tsx`
      const render = 1;
      console.log(render);
    `,
  ],
});
