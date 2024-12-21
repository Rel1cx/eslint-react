import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./use-jsx-vars";

ruleTester.run(RULE_NAME, rule, {
  invalid: [],
  valid: [
    ...allValid,
    {
      code: /* tsx */ `
        function foo() {
          var App;
          var bar = React.render(<App/>);
          return bar;
        };
        foo()
      `,
    },
    {
      code: /* tsx */ `
        var App;
        React.render(<App/>);
      `,
    },
    {
      code: /* tsx */ `
        var a = 1;
        React.render(<img src={a} />);
      `,
    },
    {
      code: /* tsx */ `
        var App;
        function f() {
          return <App />;
        }
        f();
      `,
    },
    {
      code: /* tsx */ `
        var App;
        <App.Hello />
      `,
    },
    {
      code: /* tsx */ `
        class HelloMessage {};
        <HelloMessage />
      `,
    },
    {
      code: /* tsx */ `
        class HelloMessage {
          render() {
            var HelloMessage = <div>Hello</div>;
            return HelloMessage;
          }
        };
        <HelloMessage />
      `,
    },
    {
      code: /* tsx */ `
        function foo() {
          var App = { Foo: { Bar: {} } };
          var bar = React.render(<App.Foo.Bar/>);
          return bar;
        };
        foo()
      `,
    },
    {
      code: /* tsx */ `
        function foo() {
          var App = { Foo: { Bar: { Baz: {} } } };
          var bar = React.render(<App.Foo.Bar.Baz/>);
          return bar;
        };
        foo()
      `,
    },
    {
      code: /* tsx */ `
        var object;
        React.render(<object.Tag />);
      `,
    },
    {
      code: /* tsx */ `
        var object;
        React.render(<object.tag />);
      `,
    },
  ],
});
