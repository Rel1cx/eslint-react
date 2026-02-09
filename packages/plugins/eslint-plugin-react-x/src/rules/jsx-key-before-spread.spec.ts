import { JsxEmit } from "@eslint-react/core";
import { RuleTester } from "@typescript-eslint/rule-tester";
import tsx from "dedent";

import { allValid, defaultLanguageOptionsWithTypes, getProjectForJsxEmit, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./jsx-key-before-spread";

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
        return [
                <div key="1" {...props} key="2" {...props}>1</div>,
              ]
          };
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    {
      code: tsx`

        const App = (props) => {
        return [
                <div {...props} key="1" key="2" {...props}>1</div>,
              ]
          };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    // Additional invalid test cases
    {
      code: tsx`
        const App = (props) => {
          return <div {...props} key={props.id}>1</div>;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        const App = (props) => {
          return <div {...props} key={props.id} {...props.data}>1</div>;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        const App = (props) => {
          return [
            <Component {...props} key="a" />,
            <Component {...props} key="b" />,
          ];
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      code: tsx`
        const App = (props) => {
          return items.map((item, index) => <div {...item.props} key={item.id} />);
        };
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        const App = (props) => {
          return <div className="test" {...props} key="1">1</div>;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        const App = (props) => {
          return <div id="test" {...props} key="1" className="foo">1</div>;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        const App = (props) => {
          const items = [
            <span {...props} key="1">1</span>,
            <span {...props} key="2">2</span>,
          ];
          return <div>{items}</div>;
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      code: tsx`
        const App = (props) => {
          return (
            <>
              <div {...props} key="1">1</div>
              <div {...props} key="2">2</div>
            </>
          );
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
  ],
  valid: [
    ...allValid,
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
    tsx`
      /** @jsxRuntime automatic */
      const App = (props) => {
          return [
                  <div key="1" {...props}>1</div>,
                  <div key="2" {...props}>2</div>,
                  <div key="3" {...props}>3</div>,
               ]
      };
    `,
    tsx`
      const App = (props) => {
          return [1, 2, 3].map((item) => <div key={Math.random()}>{item}</div>)
      };
    `,
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
    // Additional valid test cases - key before spread
    tsx`
      const App = (props) => {
        return <div key="1" {...props}>1</div>;
      };
    `,
    tsx`
      const App = (props) => {
        return <div key={props.id} {...props}>1</div>;
      };
    `,
    tsx`
      const App = (props) => {
        return [
          <Component key="a" {...props} />,
          <Component key="b" {...props} />,
        ];
      };
    `,
    tsx`
      const App = (props) => {
        return items.map((item) => <div key={item.id} {...item.props} />);
      };
    `,
    tsx`
      const App = (props) => {
        return [
          <div key="1" {...props} className="foo">1</div>,
          <div key="2" {...props} id="bar">2</div>,
        ];
      };
    `,
    tsx`
      const App = (props) => {
        return <div key="1" className="test" {...props}>1</div>;
      };
    `,
    tsx`
      const App = (props) => {
        return <div key="1" id="foo" {...props} className="bar">1</div>;
      };
    `,
    tsx`
      const App = (props) => {
        const items = [
          <span key="1" {...props}>1</span>,
          <span key="2" {...props}>2</span>,
        ];
        return <div>{items}</div>;
      };
    `,
    tsx`
      const App = (props) => {
        return (
          <>
            <div key="1" {...props}>1</div>
            <div key="2" {...props}>2</div>
          </>
        );
      };
    `,
    tsx`
      const App = (props) => {
        return <div {...props}>No key needed</div>;
      };
    `,
    tsx`
      const App = (props) => {
        return <div className="test" {...props}>No key</div>;
      };
    `,
    tsx`
      const App = (props) => {
        return [
          <div key="only-key">1</div>,
          <div key="another-key">2</div>,
        ];
      };
    `,
  ],
});

const ruleTesterWithJsxClassicRuntime = new RuleTester({
  languageOptions: {
    ...defaultLanguageOptionsWithTypes,
    parserOptions: {
      ...defaultLanguageOptionsWithTypes.parserOptions,
      project: getProjectForJsxEmit(JsxEmit.React),
      projectService: false,
    },
  },
});

ruleTesterWithJsxClassicRuntime.run(RULE_NAME, rule, {
  invalid: [],
  valid: [
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

const ruleTesterWithJsxAutomaticRuntime = new RuleTester({
  languageOptions: {
    ...defaultLanguageOptionsWithTypes,
    parserOptions: {
      ...defaultLanguageOptionsWithTypes.parserOptions,
      project: getProjectForJsxEmit(JsxEmit.ReactJSX),
      projectService: false,
    },
  },
});

ruleTesterWithJsxAutomaticRuntime.run(RULE_NAME, rule, {
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
    // Additional invalid test cases for automatic runtime
    {
      code: tsx`
        const App = (props) => {
          return <Component {...props} key="test" />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        const App = (props) => {
          return items.map((item) => <div {...item} key={item.id} />);
        };
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        const App = (props) => {
          return <div {...props} key={props.key} id="test" />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        const App = (props) => {
          return (
            <>
              <span {...props} key="1" />
              <span {...props} key="2" />
            </>
          );
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
  ],
  valid: [
    // Valid cases for automatic runtime - key before spread
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
    tsx`
      const App = (props) => {
        return <div key={props.key} {...props} id="test" />;
      };
    `,
    tsx`
      const App = (props) => {
        return (
          <>
            <span key="1" {...props} />
            <span key="2" {...props} />
          </>
        );
      };
    `,
  ],
});
