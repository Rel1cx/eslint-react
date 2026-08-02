import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-array-index-key";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      name: "array index as key in map callback",
      code: tsx`foo.map((bar, i) => <Foo key={i} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index parameter with nonstandard name as key",
      code: tsx`foo.map((bar, anything) => <Foo key={anything} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index in template literal as key",
      code: tsx`foo.map((bar, i) => <Foo key={\`foo-\${i}\`} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index in string concatenation as key",
      code: tsx`foo.map((bar, i) => <Foo key={'foo-' + i} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index in multi-part string concatenation as key",
      code: tsx`foo.map((bar, i) => <Foo key={'foo-' + i + '-bar'} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key in map on array literal",
      code: tsx`[{}, {}].map((bar, i) => <Foo key={i} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key in optional-chained map call",
      code: tsx`foo?.map((child, i) => <Foo key={i} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key in map on member expression",
      code: tsx`foo.bar.map((value, index) => <MyComponent key={index} />);`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key in multiline map callback",
      code: tsx`
        foo.map((bar, index) => (
          <Element key={index} bar={bar} />
        ))
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index with toString() call as key",
      code: tsx`
        foo.map((bar, index) => (
          <Element key={index.toString()} bar={bar} />
        ))
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index wrapped in String() as key",
      code: tsx`
        foo.map((bar, index) => (
          <Element key={String(index)} bar={bar} />
        ))
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "outer map index as key in nested map",
      code: tsx`foo.map((bar, i) => bar.items.map((baz) => <Foo key={i} />))`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "shadowed index from inner map as key",
      code: tsx`foo.map((bar, i) => bar.items.map((item, i) => <Foo key={i} />))`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key in React.cloneElement props",
      code: tsx`foo.map((baz, i) => React.cloneElement(someChild, { ...someChild.props, key: i }))`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key in imported cloneElement props",
      code: tsx`
        import { cloneElement } from 'react';

        foo.map((baz, i) => cloneElement(someChild, { ...someChild.props, key: i }))
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key in React.cloneElement with block body",
      code: tsx`
        foo.map((item, i) => {
          return React.cloneElement(someChild, {
            key: i
          })
        })
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key in imported cloneElement with block body",
      code: tsx`
        import { cloneElement } from 'react';

        foo.map((item, i) => {
          return cloneElement(someChild, {
            key: i
          })
        })
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key in React.createElement props",
      code: tsx`foo.map((bar, i) => React.createElement('Foo', { key: i }))`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index in template literal as key in React.createElement",
      code: tsx`foo.map((bar, i) => React.createElement('Foo', { key: \`foo-\${i}\` }))`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index in string concatenation as key in React.createElement",
      code: tsx`foo.map((bar, i) => React.createElement('Foo', { key: 'foo-' + i }))`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index in multi-part string concatenation as key in React.createElement",
      code: tsx`foo.map((bar, i) => React.createElement('Foo', { key: 'foo-' + i + '-bar' }))`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key in Children.map with React.cloneElement",
      code: tsx`
        Children.map(this.props.children, (child, index) => {
          return React.cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key in Children.map with imported cloneElement",
      code: tsx`
        import { cloneElement } from 'react';

        Children.map(this.props.children, (child, index) => {
          return cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key in React.Children.map with React.cloneElement",
      code: tsx`
        React.Children.map(this.props.children, (child, index) => {
          return React.cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key in React.Children.map with imported cloneElement",
      code: tsx`
        import { cloneElement } from 'react';

        React.Children.map(this.props.children, (child, index) => {
          return cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key in Children.forEach with React.cloneElement",
      code: tsx`
        Children.forEach(this.props.children, (child, index) => {
          return React.cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key in Children.forEach with imported cloneElement",
      code: tsx`
        import { cloneElement } from 'react';

        Children.forEach(this.props.children, (child, index) => {
          return cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key in React.Children.forEach with React.cloneElement",
      code: tsx`
        React.Children.forEach(this.props.children, (child, index) => {
          return React.cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key in React.Children.forEach with imported cloneElement",
      code: tsx`
        import { cloneElement } from 'react';

        React.Children.forEach(this.props.children, (child, index) => {
          return cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key in reduce callback",
      code: tsx`foo.reduce((a, b, i) => a.concat(<Foo key={i} />), [])`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key in reduceRight callback",
      code: tsx`foo.reduceRight((a, b, i) => a.concat(<Foo key={i} />), [])`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key in flatMap callback",
      code: tsx`foo.flatMap((a, i) => <Foo key={i} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key pushed in forEach callback",
      code: tsx`foo.forEach((bar, i) => { baz.push(<Foo key={i} />); })`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key pushed in filter callback",
      code: tsx`foo.filter((bar, i) => { baz.push(<Foo key={i} />); })`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key pushed in some callback",
      code: tsx`foo.some((bar, i) => { baz.push(<Foo key={i} />); })`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key pushed in every callback",
      code: tsx`foo.every((bar, i) => { baz.push(<Foo key={i} />); })`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key pushed in find callback",
      code: tsx`foo.find((bar, i) => { baz.push(<Foo key={i} />); })`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key pushed in findIndex callback",
      code: tsx`foo.findIndex((bar, i) => { baz.push(<Foo key={i} />); })`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as createElement key pushed in forEach callback",
      code: tsx`foo.forEach((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as createElement key pushed in filter callback",
      code: tsx`foo.filter((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as createElement key pushed in some callback",
      code: tsx`foo.some((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as createElement key pushed in every callback",
      code: tsx`foo.every((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as createElement key pushed in find callback",
      code: tsx`foo.find((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as createElement key pushed in findIndex callback",
      code: tsx`foo.findIndex((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as key in 'as any' cast map call",
      code: tsx`(foo.map as any)((bar, i) => <Foo key={i} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index toString call with 'as any' cast as key",
      code: tsx`foo.map((value, index) => <Foo key={(index.toString as any)()} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "String call with 'as any' cast on index as key",
      code: tsx`foo.map((value, index) => <Foo key={(String as any)(index)} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index wrapped in Number() as key",
      code: tsx`foo.map((bar, i) => <Foo key={Number(i)} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as nullish coalescing fallback in key",
      code: tsx`foo.map((bar, i) => <Foo key={bar.id ?? i} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index as ternary fallback in key",
      code: tsx`foo.map((bar, i) => <Foo key={bar.id != null ? bar.id : i} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index parameter with default value as key",
      code: tsx`foo.map((bar, i = 0) => <Foo key={i} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "index at end of chained nullish fallbacks in key",
      code: tsx`foo.map((bar, i) => <Foo key={bar.id ?? bar.name ?? i} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "string-literal 'key' property with index value",
      code: tsx`foo.map((bar, i) => React.createElement('Foo', { 'key': i }))`,
      errors: [{ messageId: "default" }],
    },
  ],
  valid: [
    {
      name: "key derived from item data",
      code: tsx`foo.map((bar, i) => <Foo key={bar.id} />)`,
    },
    {
      name: "key derived from item data with logical OR",
      code: tsx`foo.map((bar, i) => <Foo key={bar.id || bar.name} />)`,
    },
    {
      name: "non-index callback parameter as key",
      code: tsx`foo.map((bar, i) => <Foo key={bar} />)`,
    },
    {
      name: "non-index callback parameter as key in reduce",
      code: tsx`foo.reduce((acc, bar, i) => acc.concat(<Foo key={bar} />), [])`,
    },
    {
      name: "index in ternary test with key from item data",
      code: tsx`foo.map((bar, i) => <Foo key={i > 0 ? bar.id : bar.name} />)`,
    },
    {
      // https://github.com/oxc-project/oxc/issues/21110
      name: "composite key with string concatenation in template literal",
      code: tsx`
        function List({ items }) {
          return (
            <ul>
              {items.map((item, index) => (
                <li key={\`\${item.type + index}\`}>{item.text}</li>
              ))}
            </ul>
          );
        }
      `,
    },
    {
      name: "key from item data in template literal",
      code: tsx`
        function List({ items }) {
          return (
            <ul>
              {items.map((item, index) => (
                <li key={\`\${item.type}\`}>{item.text}</li>
              ))}
            </ul>
          );
        }
      `,
    },
    {
      name: "prefixed key from item data in template literal",
      code: tsx`
        function List({ items }) {
          return (
            <ul>
              {items.map((item, index) => (
                <li key={\`prefix-\${item.type}\`}>{item.text}</li>
              ))}
            </ul>
          );
        }
      `,
    },
    {
      name: "concatenated key from item data",
      code: tsx`
        function List({ items }) {
          return (
            <ul>
              {items.map((item, index) => (
                <li key={item.type + item.text}>{item.text}</li>
              ))}
            </ul>
          );
        }
      `,
    },
    {
      name: "index inside nested expression in template literal",
      code: tsx`foo.map((bar, i) => <Foo key={\`\${'foo' + i}\`} />)`,
    },
    {
      name: "untracked method call on index as key",
      code: tsx`foo.map((bar, i) => <Foo key={i.toFixed()} />)`,
    },
    {
      name: "computed 'key' property with index value",
      code: tsx`foo.map((bar, i) => React.createElement('Foo', { ['key']: i }))`,
    },
    {
      name: "index as key in unrecognized method call",
      code: tsx`foo.customMap((bar, i) => <Foo key={i} />)`,
    },
    {
      name: "function not at callback position of the call",
      code: tsx`foo.map(notCallback, (bar, i) => <Foo key={i} />)`,
    },
    {
      name: "index as key in referenced callback function",
      code: tsx`
        function renderItem(bar, i) {
          return <Foo key={i} />;
        }
        foo.map(renderItem);
      `,
    },
    {
      name: "index parameter shadowed by local binding",
      code: tsx`
        foo.map((bar, i) => {
          return bar.items.map((item) => {
            const i = item.id;
            return <Foo key={i} />;
          });
        })
      `,
    },
    {
      name: "identifier not bound to an index parameter",
      code: tsx`
        const i = getId();
        foo.map((bar) => <Foo key={i} />);
      `,
    },
  ],
});
