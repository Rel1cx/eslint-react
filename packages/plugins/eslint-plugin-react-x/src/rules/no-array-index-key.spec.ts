import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-array-index-key";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `foo.map((bar, i) => <Foo key={i} />)`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `[{}, {}].map((bar, i) => <Foo key={i} />)`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo.map((bar, anything) => <Foo key={anything} />)`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo.map((bar, i) => <Foo key={\`foo-\${i}\`} />)`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo.map((bar, i) => <Foo key={'foo-' + i} />)`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo.map((bar, i) => <Foo key={'foo-' + i + '-bar'} />)`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo.map((baz, i) => React.cloneElement(someChild, { ...someChild.props, key: i }))`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `
        import { cloneElement } from 'react';

        foo.map((baz, i) => cloneElement(someChild, { ...someChild.props, key: i }))
      `,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `
        foo.map((item, i) => {
          return React.cloneElement(someChild, {
            key: i
          })
        })
      `,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `
        import { cloneElement } from 'react';

        foo.map((item, i) => {
          return cloneElement(someChild, {
            key: i
          })
        })
      `,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo.forEach((bar, i) => { baz.push(<Foo key={i} />); })`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo.filter((bar, i) => { baz.push(<Foo key={i} />); })`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo.some((bar, i) => { baz.push(<Foo key={i} />); })`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo.every((bar, i) => { baz.push(<Foo key={i} />); })`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo.find((bar, i) => { baz.push(<Foo key={i} />); })`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo.findIndex((bar, i) => { baz.push(<Foo key={i} />); })`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo.reduce((a, b, i) => a.concat(<Foo key={i} />), [])`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo.flatMap((a, i) => <Foo key={i} />)`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo.reduceRight((a, b, i) => a.concat(<Foo key={i} />), [])`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo.map((bar, i) => React.createElement('Foo', { key: i }))`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo.map((bar, i) => React.createElement('Foo', { key: \`foo-\${i}\` }))`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo.map((bar, i) => React.createElement('Foo', { key: 'foo-' + i }))`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo.map((bar, i) => React.createElement('Foo', { key: 'foo-' + i + '-bar' }))`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo.forEach((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo.filter((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo.some((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo.every((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo.find((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo.findIndex((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `
        Children.map(this.props.children, (child, index) => {
          return React.cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `
        import { cloneElement } from 'react';

        Children.map(this.props.children, (child, index) => {
          return cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `
        React.Children.map(this.props.children, (child, index) => {
          return React.cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `
        import { cloneElement } from 'react';

        React.Children.map(this.props.children, (child, index) => {
          return cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `
        Children.forEach(this.props.children, (child, index) => {
          return React.cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `
        import { cloneElement } from 'react';

        Children.forEach(this.props.children, (child, index) => {
          return cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `
        React.Children.forEach(this.props.children, (child, index) => {
          return React.cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `
        import { cloneElement } from 'react';

        React.Children.forEach(this.props.children, (child, index) => {
          return cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `foo?.map((child, i) => <Foo key={i} />)`,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `
        foo.map((bar, index) => (
          <Element key={index.toString()} bar={bar} />
        ))
      `,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `
        foo.map((bar, index) => (
          <Element key={String(index)} bar={bar} />
        ))
      `,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
    {
      code: /* tsx */ `
        foo.map((bar, index) => (
          <Element key={index} bar={bar} />
        ))
      `,
      errors: [{ messageId: "noArrayIndexKey" }],
    },
  ],
  valid: [
    ...allValid,
  ],
});
