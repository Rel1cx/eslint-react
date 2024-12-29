import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-duplicate-key";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        const App = () => {
            return [
                    <div key="1">1</div>,
                    <div key="1">2</div>,
                    <div key="1">3</div>,
                 ]
        };
      `,
      errors: [
        {
          messageId: "noDuplicateKey",
          data: {
            value: 'key="1"',
          },
        },
        {
          messageId: "noDuplicateKey",
          data: {
            value: 'key="1"',
          },
        },
        {
          messageId: "noDuplicateKey",
          data: {
            value: 'key="1"',
          },
        },
      ],
    },
    {
      code: /* tsx */ `
        const App = () => {
            return  (<div>
                        <div key="1">1</div>
                        <div key="1">2</div>
                        <div key="1">3</div>
                    </div>)
        };
      `,
      errors: [
        {
          messageId: "noDuplicateKey",
          data: {
            value: 'key="1"',
          },
        },
        {
          messageId: "noDuplicateKey",
          data: {
            value: 'key="1"',
          },
        },
        {
          messageId: "noDuplicateKey",
          data: {
            value: 'key="1"',
          },
        },
      ],
    },
    {
      code: /* tsx */ `
        const App = () => {
            return [1, 2, 3].map((item) => <div key="1">{item}</div>)
        };
      `,
      errors: [
        {
          messageId: "noDuplicateKey",
          data: {
            value: 'key="1"',
          },
        },
      ],
    },
    {
      code: /* tsx */ `
        const App = () => {
            return [1, 2, 3].map((item) => { return <div key="1">{item}</div> })
        };
      `,
      errors: [
        {
          messageId: "noDuplicateKey",
          data: {
            value: 'key="1"',
          },
        },
      ],
    },
    {
      code: /* tsx */ `
        const App = () => {
            return nested.map((item) => {
                return <div key="1">{item.map((i) => <div key="a">{i}</div>)}</div>
            })
        };
      `,
      errors: [
        {
          messageId: "noDuplicateKey",
          data: {
            value: 'key="1"',
          },
        },
        {
          messageId: "noDuplicateKey",
          data: {
            value: 'key="a"',
          },
        },
      ],
    },
    {
      code: /* tsx */ `
        const App = () => {
            return nested.map((foo) => {
                return <div key="foo">{foo.map((bar) => <div key="bar">{bar.map((baz) => <div key="baz">{baz}</div>)}</div>)}</div>
            })
        };
      `,
      errors: [
        {
          messageId: "noDuplicateKey",
          data: {
            value: 'key="foo"',
          },
        },
        {
          messageId: "noDuplicateKey",
          data: {
            value: 'key="bar"',
          },
        },
        {
          messageId: "noDuplicateKey",
          data: {
            value: 'key="baz"',
          },
        },
      ],
    },
    {
      code: /* tsx */ `
        const App = () => {
            return nested?.map((foo) => {
                return <div key="foo">{foo!.map((bar) => <div key="bar">{bar!!.map(((baz) => <div key="baz">{baz}</div>)!!! as A satisfies B)}</div>)}</div>
            })
        };
      `,
      errors: [
        {
          messageId: "noDuplicateKey",
          data: {
            value: 'key="foo"',
          },
        },
        {
          messageId: "noDuplicateKey",
          data: {
            value: 'key="bar"',
          },
        },
        {
          messageId: "noDuplicateKey",
          data: {
            value: 'key="baz"',
          },
        },
      ],
    },
    {
      code: /* tsx */ `
        const App = () => {
            return nested.map((foo) => {
                return <div key="foo">{foo.notmap((bar) => <div key="bar">{bar.map((baz) => <div key="baz">{baz}</div>)}</div>)}</div>
            })
        };
      `,
      errors: [
        {
          messageId: "noDuplicateKey",
          data: {
            value: 'key="foo"',
          },
        },
        {
          messageId: "noDuplicateKey",
          data: {
            value: 'key="baz"',
          },
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      const App = () => {
          return [<div key="1">1</div>]
      };
    `,
    /* tsx */ `
      const App = () => {
          return [
                  <div key="1">1</div>,
                  <div key="2">2</div>,
                  <div key="3">3</div>,
               ]
      };
    `,
    /* tsx */ `
      const App = () => {
          return [1, 2, 3].map((item) => { const key = item; return <div key={key}>{item}</div> })
      };
    `,
    /* tsx */ `
      const App = () => {
          return nested.map((item) => {
              return <div key={item}>{item.map((i) => { return <div key={i}>{i}</div> })}</div>
          })
      };
    `,
  ],
});
