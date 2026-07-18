import { createRuleTesterForJsxEmit, ruleTester } from "#/testing/helpers";
import tsx from "dedent";
import { JsxEmit } from "typescript";
import rule, { RULE_NAME } from "./no-key-after-spread";

// Default ruleTester tests (auto-detect runtime from tsconfig)
ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        const App = (props) => {
            return [
                    <div {...props} key="1">1</div>,
                    <div {...props} key="1">2</div>,
                    <div {...props} key="1">3</div>,
                 ]
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      code: tsx`
        const App = (props) => {
          return <div {...props} key={props.id}>1</div>;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Multiple spreads before key
    {
      code: tsx`
        const App = (props) => {
          return <div {...a} {...b} key="1">1</div>;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Attributes between spread and key
    {
      code: tsx`
        const App = (props) => {
          return <div {...props} className="x" key="1">1</div>;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Only the 'key' placed after the spread is reported
    {
      code: tsx`
        const App = (props) => {
          return <div key="1" {...props} key="2" />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
  ],
  valid: [
    tsx`
      const App = (props) => {
          return [<div key="1">1</div>]
      };
    `,
    tsx`
      const App = (props) => {
          return [
                  <div key="1" {...props}>1</div>,
                  <div key="2" {...props}>2</div>,
                  <div key="3" {...props}>3</div>,
               ]
      };
    `,
    // Key before spread (valid)
    tsx`
      const App = (props) => {
        return <div key="1" {...props} className="x">1</div>;
      };
    `,
    // Key after non-spread attributes but before spread (valid)
    tsx`
      const App = (props) => {
        return <div id="1" key="1" {...props} />;
      };
    `,
    // No spread (valid)
    tsx`
      const App = () => {
        return <div key="1">1</div>;
      };
    `,
    // No key (valid)
    tsx`
      const App = (props) => {
        return <div {...props}>1</div>;
      };
    `,
    // 'Key' (capitalized) is a regular prop, not React's key (compiles to _jsx with Key as a normal prop)
    tsx`
      const App = (props) => {
        return <div {...props} Key="1" />;
      };
    `,
    // classic runtime annotation — no deoptimization check
    tsx`
      /** @jsxRuntime classic */
      const App = (props) => {
          return [
                  <div {...props} key="1">1</div>,
                  <div {...props} key="1">2</div>,
                  <div {...props} key="1">3</div>,
               ]
      };
    `,
  ],
});

// Test with classic runtime (from tsconfig) - deoptimization should NOT apply
const ruleTesterWithJsxClassicRuntime = createRuleTesterForJsxEmit(JsxEmit.React);

ruleTesterWithJsxClassicRuntime.run(`${RULE_NAME} (classic runtime)`, rule, {
  invalid: [
    // '@jsxRuntime automatic' pragma overrides the classic tsconfig setting
    {
      code: tsx`
        /** @jsxRuntime automatic */
        const App = (props) => {
          return <div {...props} key="1" />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
  ],
  valid: [
    // no deoptimization check in classic runtime
    tsx`
      const App = (props) => {
        return [
          <div {...props} key="1">1</div>,
          <div {...props} key="1">2</div>,
          <div {...props} key="1">3</div>,
        ]
      };
    `,
  ],
});

// Test with react-native runtime (from tsconfig) - classic-family emit, deoptimization should NOT apply
const ruleTesterWithJsxReactNativeRuntime = createRuleTesterForJsxEmit(JsxEmit.ReactNative);

ruleTesterWithJsxReactNativeRuntime.run(`${RULE_NAME} (react-native runtime)`, rule, {
  invalid: [],
  valid: [
    tsx`
      const App = (props) => {
        return <div {...props} key="1">1</div>;
      };
    `,
  ],
});

// Test with automatic runtime (from tsconfig) - deoptimization SHOULD apply
const ruleTesterWithJsxAutomaticRuntime = createRuleTesterForJsxEmit(JsxEmit.ReactJSX);

ruleTesterWithJsxAutomaticRuntime.run(`${RULE_NAME} (automatic runtime)`, rule, {
  invalid: [
    {
      code: tsx`
        const App = (props) => {
            return [
                    <div {...props} key="1">1</div>,
                    <div {...props} key="1">2</div>,
                    <div {...props} key="1">3</div>,
                 ]
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      code: tsx`
        const App = (props) => {
          return <Component {...props} key="test" />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Multiple spreads before key
    {
      code: tsx`
        const App = (props) => {
          return <Component {...a} {...b} key="test" />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Key on explicit Fragment after spread
    {
      code: tsx`
        const App = (props) => {
          return <Fragment {...props} key="test" />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
  ],
  valid: [
    tsx`
      const App = (props) => {
        return <Component key="test" {...props} />;
      };
    `,
    tsx`
      const App = (props) => {
        return items.map((item) => <div key={item.id} {...item} />);
      };
    `,
    // Namespace attributes should not cause runtime errors
    tsx`
      const App = (props) => {
        return <div xml:space="preserve" {...props} />;
      };
    `,
    // xml:key after spread should NOT be reported (it's not the React key)
    tsx`
      const App = (props) => {
        return <div {...props} xml:key="test" />;
      };
    `,
    // Any JSXNamespacedName after spread should NOT be reported
    tsx`
      const App = (props) => {
        return <div {...props} x:key="test" />;
      };
    `,
    // Key inside a spread object is not a direct key prop
    tsx`
      const App = (props) => {
        return <div {...{ key: 1 }} />;
      };
    `,
    // xmlns:x after spread should NOT be reported
    tsx`
      const App = (props) => {
        return <svg {...props} xmlns:x="http://example.com" />;
      };
    `,
    // Key before spread followed by another spread
    tsx`
      const App = (props) => {
        return <div key="1" {...props} {...rest} />;
      };
    `,
  ],
});
