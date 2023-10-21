import dedent from "dedent";

import { allValid } from "../../../test/common/valid";
import RuleTester, { getFixturesRootDir } from "../../../test/rule-tester";
import rule, { RULE_NAME } from "./no-array-index-key";

const rootDir = getFixturesRootDir();

const ruleTester = new RuleTester({
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: rootDir,
    },
});

ruleTester.run(RULE_NAME, rule, {
    valid: [
        ...allValid,
    ],
    invalid: [
        {
            code: "foo.map((bar, i) => <Foo key={i} />)",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "[{}, {}].map((bar, i) => <Foo key={i} />)",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "foo.map((bar, anything) => <Foo key={anything} />)",
            errors: [{ messageId: "INVALID" }],
        },
        {
            // eslint-disable-next-line no-template-curly-in-string
            code: "foo.map((bar, i) => <Foo key={`foo-${i}`} />)",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "foo.map((bar, i) => <Foo key={'foo-' + i} />)",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "foo.map((bar, i) => <Foo key={'foo-' + i + '-bar'} />)",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "foo.map((baz, i) => React.cloneElement(someChild, { ...someChild.props, key: i }))",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                import { cloneElement } from 'react';

                foo.map((baz, i) => cloneElement(someChild, { ...someChild.props, key: i }))
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                foo.map((item, i) => {
                  return React.cloneElement(someChild, {
                    key: i
                  })
                })
            `,
            errors: [{ messageId: "INVALID" }],
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
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "foo.forEach((bar, i) => { baz.push(<Foo key={i} />); })",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "foo.filter((bar, i) => { baz.push(<Foo key={i} />); })",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "foo.some((bar, i) => { baz.push(<Foo key={i} />); })",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "foo.every((bar, i) => { baz.push(<Foo key={i} />); })",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "foo.find((bar, i) => { baz.push(<Foo key={i} />); })",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "foo.findIndex((bar, i) => { baz.push(<Foo key={i} />); })",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "foo.reduce((a, b, i) => a.concat(<Foo key={i} />), [])",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "foo.flatMap((a, i) => <Foo key={i} />)",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "foo.reduceRight((a, b, i) => a.concat(<Foo key={i} />), [])",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "foo.map((bar, i) => React.createElement('Foo', { key: i }))",
            errors: [{ messageId: "INVALID" }],
        },
        {
            // eslint-disable-next-line no-template-curly-in-string
            code: "foo.map((bar, i) => React.createElement('Foo', { key: `foo-${i}` }))",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "foo.map((bar, i) => React.createElement('Foo', { key: 'foo-' + i }))",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "foo.map((bar, i) => React.createElement('Foo', { key: 'foo-' + i + '-bar' }))",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "foo.forEach((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "foo.filter((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "foo.some((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "foo.every((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "foo.find((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "foo.findIndex((bar, i) => { baz.push(React.createElement('Foo', { key: i })); })",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                Children.map(this.props.children, (child, index) => {
                  return React.cloneElement(child, { key: index });
                })
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                import { cloneElement } from 'react';

                Children.map(this.props.children, (child, index) => {
                  return cloneElement(child, { key: index });
                })
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                React.Children.map(this.props.children, (child, index) => {
                  return React.cloneElement(child, { key: index });
                })
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                import { cloneElement } from 'react';

                React.Children.map(this.props.children, (child, index) => {
                  return cloneElement(child, { key: index });
                })
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                Children.forEach(this.props.children, (child, index) => {
                  return React.cloneElement(child, { key: index });
                })
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                import { cloneElement } from 'react';

                Children.forEach(this.props.children, (child, index) => {
                  return cloneElement(child, { key: index });
                })
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                React.Children.forEach(this.props.children, (child, index) => {
                  return React.cloneElement(child, { key: index });
                })
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                import { cloneElement } from 'react';

                React.Children.forEach(this.props.children, (child, index) => {
                  return cloneElement(child, { key: index });
                })
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "foo?.map((child, i) => <Foo key={i} />)",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                foo.map((bar, index) => (
                  <Element key={index.toString()} bar={bar} />
                ))
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                foo.map((bar, index) => (
                  <Element key={String(index)} bar={bar} />
                ))
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                foo.map((bar, index) => (
                  <Element key={index} bar={bar} />
                ))
            `,
            errors: [{ messageId: "INVALID" }],
        },
    ],
});
