import dedent from "dedent";

import { allValid, defaultParserOptions, RuleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-array-index-key";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
  ],
  invalid: [
    {
      code: "foo.map((bar, i) => <Foo key={i} />)",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: "[{}, {}].map((bar, i) => <Foo key={i} />)",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: "foo.map((bar, anything) => <Foo key={anything} />)",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      // eslint-disable-next-line no-template-curly-in-string
      code: "foo.map((bar, i) => <Foo key={`foo-${i}`} />)",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: "foo.map((bar, i) => <Foo key={'foo-' + i} />)",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: "foo.map((bar, i) => <Foo key={'foo-' + i + '-bar'} />)",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: "foo.map((baz, i) => React.cloneElement(someChild, { ...someChild.props, key: i }))",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: dedent`
        import { cloneElement } from 'react';

        foo.map((baz, i) => cloneElement(someChild, { ...someChild.props, key: i }))
      `,
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: dedent`
        foo.map((item, i) => {
          return React.cloneElement(someChild, {
            key: i
          })
        })
      `,
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: dedent`
        import { cloneElement } from 'react';

        foo.map((item, i) => {
          return cloneElement(someChild, {
            key: i
          })
        })
      `,
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: "foo.forEach((bar, i) => { baz.push(<Foo key={i} />); })",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: "foo.filter((bar, i) => { baz.push(<Foo key={i} />); })",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: "foo.some((bar, i) => { baz.push(<Foo key={i} />); })",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: "foo.every((bar, i) => { baz.push(<Foo key={i} />); })",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: "foo.find((bar, i) => { baz.push(<Foo key={i} />); })",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: "foo.findIndex((bar, i) => { baz.push(<Foo key={i} />); })",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: "foo.reduce((a, b, i) => a.concat(<Foo key={i} />), [])",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: "foo.flatMap((a, i) => <Foo key={i} />)",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: "foo.reduceRight((a, b, i) => a.concat(<Foo key={i} />), [])",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: "foo.map((bar, i) => React.createElement('Foo', { key: i }))",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      // eslint-disable-next-line no-template-curly-in-string
      code: "foo.map((bar, i) => React.createElement('Foo', { key: `foo-${i}` }))",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: "foo.map((bar, i) => React.createElement('Foo', { key: 'foo-' + i }))",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: "foo.map((bar, i) => React.createElement('Foo', { key: 'foo-' + i + '-bar' }))",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: "foo.forEach((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: "foo.filter((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: "foo.some((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: "foo.every((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: "foo.find((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: "foo.findIndex((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: dedent`
        Children.map(this.props.children, (child, index) => {
          return React.cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: dedent`
        import { cloneElement } from 'react';

        Children.map(this.props.children, (child, index) => {
          return cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: dedent`
        React.Children.map(this.props.children, (child, index) => {
          return React.cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: dedent`
        import { cloneElement } from 'react';

        React.Children.map(this.props.children, (child, index) => {
          return cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: dedent`
        Children.forEach(this.props.children, (child, index) => {
          return React.cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: dedent`
        import { cloneElement } from 'react';

        Children.forEach(this.props.children, (child, index) => {
          return cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: dedent`
        React.Children.forEach(this.props.children, (child, index) => {
          return React.cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: dedent`
        import { cloneElement } from 'react';

        React.Children.forEach(this.props.children, (child, index) => {
          return cloneElement(child, { key: index });
        })
      `,
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: "foo?.map((child, i) => <Foo key={i} />)",
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: dedent`
        foo.map((bar, index) => (
          <Element key={index.toString()} bar={bar} />
        ))
      `,
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: dedent`
        foo.map((bar, index) => (
          <Element key={String(index)} bar={bar} />
        ))
      `,
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
    {
      code: dedent`
        foo.map((bar, index) => (
          <Element key={index} bar={bar} />
        ))
      `,
      errors: [{ messageId: "NO_ARRAY_INDEX_KEY" }],
    },
  ],
});
