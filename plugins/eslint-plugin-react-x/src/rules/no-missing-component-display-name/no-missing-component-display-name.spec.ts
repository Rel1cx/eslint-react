import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-missing-component-display-name";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        const App = React.memo(() => <div>foo</div>)
      `,
      errors: [{
        messageId: "default",
      }],
    },
    {
      code: tsx`
        const App = React.memo(function () {
            return <div>foo</div>
        })
      `,
      errors: [{
        messageId: "default",
      }],
    },
    {
      code: tsx`
        const MemoComponent = React.memo(() => <div></div>)
      `,
      errors: [{
        messageId: "default",
      }],
    },
    {
      code: tsx`
        const App = React.forwardRef(() => <div>foo</div>)
      `,
      errors: [{
        messageId: "default",
      }],
    },
    {
      code: tsx`
        const ForwardRefComponent = React.forwardRef(() => <div></div>)
      `,
      errors: [{
        messageId: "default",
      }],
    },
    {
      code: tsx`
        const MemoForwardRefComponent = React.memo(forwardRef(() => <div></div>))
      `,
      errors: [{
        messageId: "default",
      }],
    },
    {
      code: tsx`
        const MemoForwardRefComponent = React.memo(React.forwardRef(() => <div></div>))
      `,
      errors: [{
        messageId: "default",
      }],
    },
  ],
  valid: [
    "const App = () => <div>foo</div>",
    tsx`
      function App() {
          return <div>foo</div>
      }
    `,
    tsx`
      function App() {
          return <div>foo</div>
      }

      App.displayName = "TestDisplayName";
    `,
    tsx`
      import { memo } from 'react'

      const App = memo(function App() {
          return <div>foo</div>
      })
    `,
    tsx`
      const App = forwardRef(function App() {
          return <div>foo</div>
      })
    `,
    tsx`
      const App = React.memo(function () {
          return <div>foo</div>
      })

      App.displayName = "TestDisplayName";
    `,
    tsx`
      const App = React.memo(function () {
          return <div>foo</div>
      })

      App.displayName = \`\${"TestDisplayName"}\`;
    `,
    tsx`
      const App = React.memo(function () {
          return <div>foo</div>
      })

      const displayName = "TestDisplayName";

      App.displayName = displayName;
    `,
    tsx`
      const someThing = {
        displayName: "someThing",
      }
      const Component = React.forwardRef(() => <div/>)
      Component.displayName = someThing.displayName
    `,
    tsx`
      function getDisplayName() { return "someThing" }
      const Component = React.forwardRef(() => <div/>)
      Component.displayName = getDisplayName()
    `,
    tsx`
      function getDisplayName() { return "someThing" }
      const Component = React.forwardRef(() => <div/>)
      Component.displayName = (true, 1 + 1, getDisplayName)()
    `,
    // https://github.com/Rel1cx/eslint-react/issues/177
    tsx`
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
    tsx`
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
    // https://github.com/oxc-project/oxc/issues/22685
    // should not flag functions that don't return JSX and don't start with capital letter
    tsx`
      const createHandler = () => () => {
        someGlobalFunc(<div />);
      };
    `,
    // variant with memo - should not flag inner function that doesn't return JSX
    tsx`
      const createHandler = React.memo(() => () => {
        someGlobalFunc(<div />);
      });
    `,
    // Ported from https://github.com/oxc-project/oxc/issues/25165
    // oxlint (and upstream eslint-plugin-react) flag the inner anonymous JSX-returning arrow
    // even when immediately invoked; our rule deliberately only targets memo/forwardRef-wrapped
    // components, so it intentionally does not report here
    tsx`
      const createCallback = () => () => <div />;
      createCallback()();
    `,
    // Ported from https://github.com/oxc-project/oxc/issues/25618
    // oxlint anchored the diagnostic on the outer HOC arrow and missed the inner JSX-returning
    // arrow; our rule only targets memo/forwardRef-wrapped components, so neither arrow is reported
    tsx`
      export const HOC =
        ({ label }: { label: string }) =>
        ({ onSubmit }: { onSubmit: () => void }) => <button onClick={onSubmit}>{label}</button>;
    `,
    // memo-wrapped variant of the curried HOC: the memo-wrapped outer arrow returns a function,
    // not JSX, so it is not collected as a component and no displayName is required
    tsx`
      export const HOC = React.memo(
        ({ label }: { label: string }) =>
        ({ onSubmit }: { onSubmit: () => void }) => <button onClick={onSubmit}>{label}</button>,
      );
    `,
    // Ported from https://github.com/oxc-project/oxc/issues/23478
    // oxlint false positive: camelCase helper returning JSX flagged as a component missing
    // display name; our rule only targets memo/forwardRef-wrapped components, so no report
    tsx`
      export default function Testing() {
        const renderThing = () => <div>Thing</div>;
        return <div>{renderThing()}</div>;
      }
      Testing.displayName = "Testing";
    `,
    // Ported from https://github.com/oxc-project/oxc/issues/23267
    // oxlint false positive: named default-exported function with an assigned displayName was
    // still flagged; our rule skips named functions and only targets memo/forwardRef wrappers
    tsx`
      export default function Testing() {
        return <div>Text</div>;
      }
      Testing.displayName = "Testing";
    `,
    // Ported from https://github.com/oxc-project/oxc/issues/21632
    // oxlint false positive: named default-exported class component flagged as missing display
    // name; our rule only collects function components, so classes are never reported
    tsx`
      export default class Logo extends React.Component<{ onClick: () => void }> {
        render() {
          return <div onClick={this.props.onClick} />;
        }
      }
    `,
  ],
});
