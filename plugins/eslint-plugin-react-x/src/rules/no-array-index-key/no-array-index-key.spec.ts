import tsx from "dedent";

import { ruleTester } from "#/test";
import rule, { RULE_NAME } from "./no-array-index-key";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`foo.map((bar, i) => <Foo key={i} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`[{}, {}].map((bar, i) => <Foo key={i} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.map((bar, anything) => <Foo key={anything} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.map((bar, i) => <Foo key={\`foo-\${i}\`} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.map((bar, i) => <Foo key={'foo-' + i} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.map((bar, i) => <Foo key={'foo-' + i + '-bar'} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.map((baz, i) => React.cloneElement(someChild, { ...someChild.props, key: i }))`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        import { cloneElement } from 'react';

        foo.map((baz, i) => cloneElement(someChild, { ...someChild.props, key: i }))
      `,
      errors: [{ messageId: "default" }],
    },
    {
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
      code: tsx`foo.forEach((bar, i) => { baz.push(<Foo key={i} />); })`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.filter((bar, i) => { baz.push(<Foo key={i} />); })`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.some((bar, i) => { baz.push(<Foo key={i} />); })`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.every((bar, i) => { baz.push(<Foo key={i} />); })`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.find((bar, i) => { baz.push(<Foo key={i} />); })`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.findIndex((bar, i) => { baz.push(<Foo key={i} />); })`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.reduce((a, b, i) => a.concat(<Foo key={i} />), [])`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.flatMap((a, i) => <Foo key={i} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.reduceRight((a, b, i) => a.concat(<Foo key={i} />), [])`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.map((bar, i) => React.createElement('Foo', { key: i }))`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.map((bar, i) => React.createElement('Foo', { key: \`foo-\${i}\` }))`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.map((bar, i) => React.createElement('Foo', { key: 'foo-' + i }))`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.map((bar, i) => React.createElement('Foo', { key: 'foo-' + i + '-bar' }))`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.forEach((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.filter((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.some((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.every((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.find((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.findIndex((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        Children.map(this.props.children, (child, index) => {
          return React.cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        import { cloneElement } from 'react';

        Children.map(this.props.children, (child, index) => {
          return cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        React.Children.map(this.props.children, (child, index) => {
          return React.cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        import { cloneElement } from 'react';

        React.Children.map(this.props.children, (child, index) => {
          return cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        Children.forEach(this.props.children, (child, index) => {
          return React.cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        import { cloneElement } from 'react';

        Children.forEach(this.props.children, (child, index) => {
          return cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        React.Children.forEach(this.props.children, (child, index) => {
          return React.cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        import { cloneElement } from 'react';

        React.Children.forEach(this.props.children, (child, index) => {
          return cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo?.map((child, i) => <Foo key={i} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        foo.map((bar, index) => (
          <Element key={index.toString()} bar={bar} />
        ))
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        foo.map((bar, index) => (
          <Element key={String(index)} bar={bar} />
        ))
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        foo.map((bar, index) => (
          <Element key={index} bar={bar} />
        ))
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.bar.map((value, index) => <MyComponent key={index} />);`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`(foo.map as any)((bar, i) => <Foo key={i} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.map((value, index) => <Foo key={(index.toString as any)()} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.map((value, index) => <Foo key={(String as any)(index)} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.map((bar, i) => <Foo key={Number(i)} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.map((bar, i) => <Foo key={bar.id ?? i} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.map((bar, i) => <Foo key={bar.id != null ? bar.id : i} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.map((bar, i = 0) => <Foo key={i} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`foo.map((bar, i) => bar.items.map((baz) => <Foo key={i} />))`,
      errors: [{ messageId: "default" }],
    },
    {
      // The identifier resolves to the nearest binding: the inner map's index
      code: tsx`foo.map((bar, i) => bar.items.map((item, i) => <Foo key={i} />))`,
      errors: [{ messageId: "default" }],
    },
    {
      // Recursion reaches the index through chained logical branches
      code: tsx`foo.map((bar, i) => <Foo key={bar.id ?? bar.name ?? i} />)`,
      errors: [{ messageId: "default" }],
    },
    {
      // String-literal 'key' property is treated like the identifier form
      code: tsx`foo.map((bar, i) => React.createElement('Foo', { 'key': i }))`,
      errors: [{ messageId: "default" }],
    },
  ],
  valid: [
    // https://github.com/oxc-project/oxc/issues/21110
    // Composite key using template literal with string concatenation should be allowed
    tsx`
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
    tsx`
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
    tsx`
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
    tsx`
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
    // The identifier shadows the index parameter with a different value
    tsx`
      foo.map((bar, i) => {
        return bar.items.map((item) => {
          const i = item.id;
          return <Foo key={i} />;
        });
      })
    `,
    // The identifier is not an index parameter of an iterator-like callback
    tsx`
      const i = getId();
      foo.map((bar) => <Foo key={i} />);
    `,
    tsx`foo.customMap((bar, i) => <Foo key={i} />)`,
    // The 'key' is derived from item data, not the array index
    tsx`foo.map((bar, i) => <Foo key={bar.id} />)`,
    tsx`foo.map((bar, i) => <Foo key={bar.id || bar.name} />)`,
    // Only the parameter at the index position counts, not other callback params
    tsx`foo.map((bar, i) => <Foo key={bar} />)`,
    tsx`foo.reduce((acc, bar, i) => acc.concat(<Foo key={bar} />), [])`,
    // The function must be at the callback position of the call
    tsx`foo.map(notCallback, (bar, i) => <Foo key={i} />)`,
    // Only inline callbacks are tracked, not function references
    tsx`
      function renderItem(bar, i) {
        return <Foo key={i} />;
      }
      foo.map(renderItem);
    `,
    // The index in a ternary test is not part of the key's value
    tsx`foo.map((bar, i) => <Foo key={i > 0 ? bar.id : bar.name} />)`,
    // Only direct template interpolations are checked, not nested expressions
    tsx`foo.map((bar, i) => <Foo key={\`\${'foo' + i}\`} />)`,
    // Only 'toString', 'String' and 'Number' conversions are tracked
    tsx`foo.map((bar, i) => <Foo key={i.toFixed()} />)`,
    // Computed 'key' properties are not checked
    tsx`foo.map((bar, i) => React.createElement('Foo', { ['key']: i }))`,
  ],
});
