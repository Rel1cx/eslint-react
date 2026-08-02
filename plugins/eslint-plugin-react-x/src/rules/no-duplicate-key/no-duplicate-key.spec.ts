import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-duplicate-key";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      name: "duplicate key in map callback with implicit return",
      code: tsx`
        const App = () => {
            return [1, 2, 3].map((item) => <div key="1">{item}</div>)
        };
      `,
      errors: [
        {
          data: {
            value: 'key="1"',
          },
          messageId: "default",
        },
      ],
    },
    {
      name: "duplicate key in map callback with block body",
      code: tsx`
        const App = () => {
            return [1, 2, 3].map((item) => { return <div key="1">{item}</div> })
        };
      `,
      errors: [
        {
          data: {
            value: 'key="1"',
          },
          messageId: "default",
        },
      ],
    },
    {
      name: "duplicate keys in array literal",
      code: tsx`
        const App = () => {
            return [<div key="1">1</div>, <div key="1">2</div>, <div key="1">3</div>]
        };
      `,
      errors: [
        {
          data: {
            value: 'key="1"',
          },
          messageId: "default",
        },
        {
          data: {
            value: 'key="1"',
          },
          messageId: "default",
        },
        {
          data: {
            value: 'key="1"',
          },
          messageId: "default",
        },
      ],
    },
    {
      name: "duplicate keys in JSX children",
      code: tsx`
        const App = () => {
            return (<div><div key="1">1</div><div key="1">2</div><div key="1">3</div></div>)
        };
      `,
      errors: [
        {
          data: {
            value: 'key="1"',
          },
          messageId: "default",
        },
        {
          data: {
            value: 'key="1"',
          },
          messageId: "default",
        },
        {
          data: {
            value: 'key="1"',
          },
          messageId: "default",
        },
      ],
    },
    {
      name: "duplicate keys in nested map callbacks",
      code: tsx`
        const App = () => {
            return nested.map((item) => {
                return <div key="1">{item.map((i) => <div key="a">{i}</div>)}</div>
            })
        };
      `,
      errors: [
        {
          data: {
            value: 'key="1"',
          },
          messageId: "default",
        },
        {
          data: {
            value: 'key="a"',
          },
          messageId: "default",
        },
      ],
    },
    {
      name: "duplicate keys in triple-nested map callbacks",
      code: tsx`
        const App = () => {
            return nested.map((foo) => {
                return <div key="foo">{foo.map((bar) => <div key="bar">{bar.map((baz) => <div key="baz">{baz}</div>)}</div>)}</div>
            })
        };
      `,
      errors: [
        {
          data: {
            value: 'key="foo"',
          },
          messageId: "default",
        },
        {
          data: {
            value: 'key="bar"',
          },
          messageId: "default",
        },
        {
          data: {
            value: 'key="baz"',
          },
          messageId: "default",
        },
      ],
    },
    {
      name: "duplicate key in map with function callback",
      code: tsx`
        const App = () => {
          return [1, 2, 3].map(function(item) { return <div key="1">{item}</div> })
        };
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    {
      name: "duplicate keys with non-map call between maps",
      code: tsx`
        const App = () => {
            return nested.map((foo) => {
                return <div key="foo">{foo.notmap((bar) => <div key="bar">{bar.map((baz) => <div key="baz">{baz}</div>)}</div>)}</div>
            })
        };
      `,
      errors: [
        {
          data: {
            value: 'key="foo"',
          },
          messageId: "default",
        },
        {
          data: {
            value: 'key="baz"',
          },
          messageId: "default",
        },
      ],
    },
    {
      name: "duplicate key in map call cast to any",
      code: tsx`
        const App = () => {
          return (data.map as any)(x => <div key="dup" />);
        };
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    {
      name: "duplicate keys with optional chaining and non-null assertions",
      code: tsx`
        const App = () => {
            return nested?.map((foo) => {
                return <div key="foo">{foo!.map((bar) => <div key="bar">{bar!!.map(((baz) => <div key="baz">{baz}</div>)!!! as A satisfies B)}</div>)}</div>
            })
        };
      `,
      errors: [
        {
          data: {
            value: 'key="foo"',
          },
          messageId: "default",
        },
        {
          data: {
            value: 'key="bar"',
          },
          messageId: "default",
        },
        {
          data: {
            value: 'key="baz"',
          },
          messageId: "default",
        },
      ],
    },
  ],
  valid: [
    {
      name: "key derived from item in map callback",
      code: tsx`
        const App = () => {
            return [1, 2, 3].map((item) => { const key = item; return <div key={key}>{item}</div> })
        };
      `,
    },
    {
      name: "unique keys in array literal",
      code: tsx`
        const App = () => {
            return [
                    <div key="1">1</div>,
                    <div key="2">2</div>,
                    <div key="3">3</div>,
                 ]
        };
      `,
    },
    {
      name: "single element in array with key",
      code: tsx`
        const App = () => {
            return [<div key="1">1</div>]
        };
      `,
    },
    {
      name: "nested maps with dynamic keys",
      code: tsx`
        const App = () => {
            return nested.map((item) => {
                return <div key={item}>{item.map((i) => { return <div key={i}>{i}</div> })}</div>
            })
        };
      `,
    },
    {
      name: "single JSX element with key and no siblings",
      code: tsx`
        const App = () => {
          return <div key="only">text</div>;
        };
      `,
    },
    {
      name: "keyed elements in conditional expression",
      code: tsx`
        const App = ({ flag }) => {
          return flag ? <div key="a">yes</div> : <div key="b">no</div>;
        };
      `,
    },
    {
      name: "keyed element nested inside JSX",
      code: tsx`
        const App = () => {
          return (
            <div>
              <span key="nested">text</span>
            </div>
          );
        };
      `,
    },
    {
      name: "keyed element as object property value",
      code: tsx`
        const App = () => {
          const elements = {
            foo: <div key="obj">text</div>,
          };
          return elements.foo;
        };
      `,
    },
    {
      name: "SVG element with xlink attributes",
      code: tsx`
        const App = () => {
            return <svg xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon" />
        };
      `,
    },
  ],
});
