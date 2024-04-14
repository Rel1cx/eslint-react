import dedent from "dedent";

import { allFunctions, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-missing-component-display-name";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: "const App = React.memo(() => <div>foo</div>)",
      errors: [{
        messageId: "NO_MISSING_COMPONENT_DISPLAY_NAME",
      }],
    },
    {
      code: dedent`
        const App = React.memo(function () {
            return <div>foo</div>
        })
      `,
      errors: [{
        messageId: "NO_MISSING_COMPONENT_DISPLAY_NAME",
      }],
    },
    {
      code: "const App = React.forwardRef(() => <div>foo</div>)",
      errors: [{
        messageId: "NO_MISSING_COMPONENT_DISPLAY_NAME",
      }],
    },
    {
      code: "const MemoComponent = React.memo(() => <div></div>)",
      errors: [{
        messageId: "NO_MISSING_COMPONENT_DISPLAY_NAME",
      }],
    },
    {
      code: "const ForwardRefComponent = React.forwardRef(() => <div></div>)",
      errors: [{
        messageId: "NO_MISSING_COMPONENT_DISPLAY_NAME",
      }],
    },
    {
      code: "const MemoForwardRefComponent = React.memo(forwardRef(() => <div></div>))",
      errors: [{
        messageId: "NO_MISSING_COMPONENT_DISPLAY_NAME",
      }],
    },
    {
      code: "const MemoForwardRefComponent = React.memo(React.forwardRef(() => <div></div>))",
      errors: [{
        messageId: "NO_MISSING_COMPONENT_DISPLAY_NAME",
      }],
    },
  ],
  valid: [
    ...allFunctions,
    "const App = () => <div>foo</div>",
    dedent`
      function App() {
          return <div>foo</div>
      }
    `,
    dedent`
      function App() {
          return <div>foo</div>
      }

      App.displayName = "TestDisplayName";
    `,
    dedent`
      import { memo } from 'react'

      const App = memo(function App() {
          return <div>foo</div>
      })
    `,
    dedent`
      const App = forwardRef(function App() {
          return <div>foo</div>
      })
    `,
    dedent`
      const App = React.memo(function () {
          return <div>foo</div>
      })

      App.displayName = "TestDisplayName";
    `,
    dedent`
      const App = React.memo(function () {
          return <div>foo</div>
      })

      App.displayName = \`\${"TestDisplayName"}\`;
    `,
    dedent`
      const App = React.memo(function () {
          return <div>foo</div>
      })

      const displayName = "TestDisplayName";

      App.displayName = displayName;
    `,
    dedent`
      const someThing = {
        displayName: "someThing",
      }
      const Component = React.forwardRef(() => <div/>)
      Component.displayName = someThing.displayName
    `,
    dedent`
      function getDisplayName() { return "someThing" }
      const Component = React.forwardRef(() => <div/>)
      Component.displayName = getDisplayName()
    `,
    dedent`
      function getDisplayName() { return "someThing" }
      const Component = React.forwardRef(() => <div/>)
      Component.displayName = (true, 1 + 1, getDisplayName)()
    `,
    // https://github.com/Rel1cx/eslint-react/issues/177
    dedent`
      import { forwardRef, ReactNode } from 'react';

      interface Props {
        children?: ReactNode;
      }
      export type Ref = HTMLButtonElement;

      const FancyButton = forwardRef<Ref, Props>((props, ref) => {
        // It's works without this
        if (!props.children) return null;
        return (
          <button ref={ref} className="MyClassName" type="button">
            {props.children}
            hell
          </button>
        );
      });

      FancyButton.displayName = 'FancyButton';
    `,
    dedent`
      import { forwardRef, ReactNode } from 'react';

      interface Props {
        children?: ReactNode;
      }
      export type Ref = HTMLButtonElement;

      const FancyButton = forwardRef<Ref, Props>((props, ref) => {
        // It's works without this
        if (!props.children) return <div>foo</div>;
        return (
          <button ref={ref} className="MyClassName" type="button">
            {props.children}
            hell
          </button>
        );
      });

      FancyButton.displayName = 'FancyButton';
    `,
  ],
});
