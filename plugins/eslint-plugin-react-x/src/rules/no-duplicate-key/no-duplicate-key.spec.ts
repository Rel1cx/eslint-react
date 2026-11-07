import tsx from "dedent";

import { ruleTester } from "@local/testkit";
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
        { messageId: "default" },
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
        { messageId: "default" },
      ],
    },
    {
      name: "duplicate key returned from an if branch of a map callback",
      code: tsx`
        const App = ({ items, cond }) => {
            return items.map((item) => { if (cond) return <div key="1" />; return null; })
        };
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    {
      name: "duplicate key returned from a logical expression of a map callback",
      code: tsx`
        const App = ({ items, cond }) => {
            return items.map((item) => cond && <div key="1" />)
        };
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    {
      name: "duplicate key in one branch of a map callback with a dynamic key in the other",
      code: tsx`
        const App = ({ items, cond }) => {
            return items.map((item) => cond ? <a key="1" /> : <b key={item.id} />)
        };
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    {
      name: "duplicate keys in both literal branches of a map callback",
      code: tsx`
        const App = ({ items, cond }) => {
            return items.map((item) => { if (cond) return <a key="1" />; return <b key="2" />; })
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
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
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      name: "only the duplicated keys are reported in a partially duplicate array",
      code: tsx`
        const App = () => {
            return [<div key="a" />, <div key="a" />, <div key="b" />]
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      name: "only the duplicated keys are reported when the duplicate comes last",
      code: tsx`
        const App = () => {
            return [<div key="a" />, <div key="b" />, <div key="b" />]
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      name: "duplicate keys with non-adjacent duplicates",
      code: tsx`
        const App = () => {
            return [<div key="a" />, <div key="b" />, <div key="a" />]
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      name: "duplicate keys in array literal with spread siblings",
      code: tsx`
        const App = ({ items }) => {
            return [...items, <div key="1" />, <div key="1" />]
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
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
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
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
        { messageId: "default" },
        { messageId: "default" },
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
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
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
        { messageId: "default" },
        { messageId: "default" },
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
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      name: "duplicate keys separated from '=' by whitespace",
      code: tsx`
        const App = () => [<div key = "a" />, <div key = "a" />];
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      name: "duplicate keys next to a bare key",
      code: tsx`
        const App = () => [
          <div key />,
          <span>
            <div key = "a" />
            <div key = "a" />
          </span>,
        ];
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      name: "duplicate keys in array returned from a map callback",
      code: tsx`
        const App = ({ items }) => {
            return items.map((item) => [<div key="1" />, <div key="1" />])
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      name: "duplicate keys in fragment children returned from a map callback",
      code: tsx`
        const App = ({ items }) => {
            return items.map((item) => <><span key="1" /><span key="1" /></>)
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      name: "duplicate grandchildren inside elements passed to Children.toArray",
      code: tsx`
        const App = () => {
            return Children.toArray([<div key="1"><span key="x" /><span key="x" /></div>])
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      name: "duplicate keys in array returned from a Children.map callback",
      code: tsx`
        const App = ({ items }) => {
            return Children.map(items, (item) => [<a key="1" />, <a key="1" />])
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      name: "duplicate key in map over an array literal with two or more elements",
      code: tsx`
        const App = () => {
            return [1, 2].map((item) => <div key="1">{item}</div>)
        };
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    {
      name: "duplicate key in map over a spread array literal of unknown length",
      code: tsx`
        const App = ({ items }) => {
            return [...items].map((item) => <div key="1">{item}</div>)
        };
      `,
      errors: [
        { messageId: "default" },
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
    // Known limitation: expression containers are not unwrapped for comparison, so even identical dynamic keys currently produce no duplicate diagnostic.
    {
      name: "current behavior: identical dynamic keys are not compared",
      code: tsx`
        const App = () => [<div key={items.current}>1</div>, <div key={items.current}>2</div>];
      `,
    },
    // Known limitation: elements stored in variables are not traced into the return value of a map callback.
    {
      name: "current behavior: keyed element returned via a variable is not traced",
      code: tsx`
        const App = ({ items }) => items.map((item) => { const el = <div key="1" />; return el; });
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
      name: "keyed element behind a conditional inside an array",
      code: tsx`
        const App = ({ cond }) => {
          return [<a key="1" />, cond ? <b key="1" /> : null];
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
    {
      name: "keyed element passed as a non-callback argument of a map call",
      code: tsx`
        const App = () => {
            return items.map(renderItem, <div key="extra">text</div>);
        };
      `,
    },
    {
      name: "keyed element created but not returned by the map callback",
      code: tsx`
        const App = ({ items }) => {
            return items.map((item) => { helper(<div key="1" />); return null; })
        };
      `,
    },
    {
      name: "keyed element as a prop value of the element returned by the map callback",
      code: tsx`
        const App = ({ items }) => {
            return items.map((item) => <div foo={<span key="1" />} />)
        };
      `,
    },
    {
      name: "single keyed child in an expression container of the element returned by the map callback",
      code: tsx`
        const App = ({ items }) => {
            return items.map((item) => <div>{<span key="1" />}</div>)
        };
      `,
    },
    {
      name: "single-keyed-element array returned from a map callback",
      code: tsx`
        const App = ({ items }) => {
            return items.map((item) => [<div key="1" />])
        };
      `,
    },
    {
      name: "map over an empty array literal",
      code: tsx`
        const App = () => {
            return [].map((item) => <div key="1">{item}</div>)
        };
      `,
    },
    {
      name: "map over a single-element array literal",
      code: tsx`
        const App = () => {
            return [1].map((item) => <div key="1">{item}</div>)
        };
      `,
    },
    {
      name: "duplicate keys in an array passed to Children.toArray are re-keyed",
      code: tsx`
        const App = () => {
            return Children.toArray([<div key="1" />, <div key="1" />])
        };
      `,
    },
    {
      name: "duplicate keys in nested arrays passed to Children.toArray are re-keyed",
      code: tsx`
        const App = () => {
            return Children.toArray([[<a key="1" />, <a key="1" />]])
        };
      `,
    },
    {
      name: "duplicate keys in a fragment passed to React.Children.toArray are re-keyed",
      code: tsx`
        const App = () => {
            return React.Children.toArray(<><a key="1" /><a key="1" /></>)
        };
      `,
    },
    {
      name: "literal key in a Children.map callback is re-keyed",
      code: tsx`
        const App = ({ items }) => {
            return Children.map(items, (item) => <div key="1">{item}</div>)
        };
      `,
    },
    {
      name: "literal key in a React.Children.map callback is re-keyed",
      code: tsx`
        const App = ({ items }) => {
            return React.Children.map(items, (item) => <div key="1">{item}</div>)
        };
      `,
    },
    {
      name: "duplicate keys in an array passed as the children argument of Children.map are re-keyed",
      code: tsx`
        const App = ({ renderItem }) => {
            return Children.map([<a key="1" />, <a key="1" />], renderItem)
        };
      `,
    },
  ],
});
