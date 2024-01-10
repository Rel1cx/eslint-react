import dedent from "dedent";

import { allValid, defaultParserOptions, RuleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-unused-state";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    dedent`
      class Foo extends React.Component {
        shouldComponentUpdate() {
          return true;
        }
      }
    `,
    dedent`
      class Foo extends React.Component {
        shouldComponentUpdate = () => {
          return true;
        }
      }
    `,
    dedent`
      function Foo() {
        return class Bar extends React.Component {
          shouldComponentUpdate() {
            return true;
          }
        };
      }
    `,
    dedent`
      class SmockTestForTypeOfNullError extends React.Component {
        handleClick() {}
        foo;
        render() {
          let a;
          return <button disabled onClick={this.handleClick} foo={this.foo}>Text</button>;
        }
      }
    `,
    dedent`
      class Foo extends React.Component {
        handleClick() {}
        render() {
          return <button onClick={this.handleClick}>Text</button>;
        }
      }
    `,
    dedent`
      var Foo = createReactClass({
        handleClick() {},
        render() {
          return <button onClick={this.handleClick}>Text</button>;
        },
      })
    `,
    dedent`
      class Foo extends React.Component {
        action() {}
        componentDidMount() {
          this.action();
        }
        render() {
          return null;
        }
      }
    `,
    dedent`
      var Foo = createReactClass({
        action() {},
        componentDidMount() {
          this.action();
        },
        render() {
          return null;
        },
      })
    `,
    dedent`
      class Foo extends React.Component {
        action() {}
        componentDidMount() {
          const action = this.action;
          action();
        }
        render() {
          return null;
        }
      }
    `,
    dedent`
      class Foo extends React.Component {
        getValue() {}
        componentDidMount() {
          const action = this.getValue();
        }
        render() {
          return null;
        }
      }
    `,
    dedent`
      class Foo extends React.Component {
        handleClick = () => {}
        render() {
          return <button onClick={this.handleClick}>Button</button>;
        }
      }
    `,
    dedent`
      class Foo extends React.Component {
        renderContent() {}
        render() {
          return <div>{this.renderContent()}</div>;
        }
      }
    `,
    dedent`
      class Foo extends React.Component {
        renderContent() {}
        render() {
          return (
            <div>
              <div>{this.renderContent()}</div>;
            </div>
          );
        }
      }
    `,
    dedent`
      class Foo extends React.Component {
        property = {}
        render() {
          return <div property={this.property}>Example</div>;
        }
      }
    `,
    dedent`
      class Foo extends React.Component {
        action = () => {}
        anotherAction = () => {
          this.action();
        }
        render() {
          return <button onClick={this.anotherAction}>Example</button>;
        }
      }
    `,
    dedent`
      class Foo extends React.Component {
        action = () => {}
        anotherAction = () => this.action()
        render() {
          return <button onClick={this.anotherAction}>Example</button>;
        }
      }
    `,
    dedent`
      class Foo extends React.Component {
        getValue = () => {}
        value = this.getValue()
        render() {
          return this.value;
        }
      }
    `,
    dedent`
      class Foo {
        action = () => {}
        anotherAction = () => this.action()
      }
    `,
    dedent`
      class Foo extends React.Component {
        action = async () => {}
        render() {
          return <button onClick={this.action}>Click</button>;
        }
      }
    `,
    dedent`
      class Foo extends React.Component {
        async action() {
          console.log('error');
        }
        render() {
          return <button onClick={() => this.action()}>Click</button>;
        }
      }
    `,
    dedent`
      class Foo extends React.Component {
        * action() {
          console.log('error');
        }
        render() {
          return <button onClick={() => this.action()}>Click</button>;
        }
      }
    `,
    dedent`
      class Foo extends React.Component {
        async * action() {
          console.log('error');
        }
        render() {
          return <button onClick={() => this.action()}>Click</button>;
        }
      }
    `,
    dedent`
      class Foo extends React.Component {
        action = function() {
          console.log('error');
        }
        render() {
          return <button onClick={() => this.action()}>Click</button>;
        }
      }
    `,
    dedent`
      class ClassPropertyTest extends React.Component {
        foo;
        render() {
          return <SomeComponent foo={this.foo} />;
        }
      }
    `,
    dedent`
      class ClassPropertyTest extends React.Component {
        foo = a;
        render() {
          return <SomeComponent foo={this.foo} />;
        }
      }
    `,
    dedent`
      class Foo extends React.Component {
        ['foo'] = a;
        render() {
          return <SomeComponent foo={this['foo']} />;
        }
      }
    `,
    dedent`
      class Foo extends React.Component {
        ['foo'];
        render() {
          return <SomeComponent foo={this['foo']} />;
        }
      }
    `,
    dedent`
      class ClassComputedTemplatePropertyTest extends React.Component {
        [\`foo\`] = a;
        render() {
          return <SomeComponent foo={this[\`foo\`]} />;
        }
      }
    `,
    dedent`
      class ClassComputedTemplatePropertyTest extends React.Component {
        state = {}
        render() {
          return <div foo={this.state.foo} />;
        }
      }
    `,
    dedent`
      class ClassLiteralComputedMemberTest extends React.Component {
        ['foo']() {}
        render() {
          return <SomeComponent foo={this.foo} />;
        }
      }
    `,
    dedent`
      class ClassComputedTemplateMemberTest extends React.Component {
        [\`foo\`]() {}
        render() {
          return <SomeComponent foo={this.foo} />;
        }
      }
    `,
    dedent`
      class ClassUseAssignTest extends React.Component {
        foo() {}
        render() {
          this.foo;
          return <SomeComponent />;
        }
      }
    `,
    dedent`
      class ClassUseAssignTest extends React.Component {
        foo() {}
        render() {
          const { foo } = this;
          return <SomeComponent />;
        }
      }
    `,
    dedent`
      class ClassUseDestructuringTest extends React.Component {
        foo() {}
        render() {
          const { foo } = this;
          return <SomeComponent />;
        }
      }
    `,
    dedent`
      class ClassUseDestructuringTest extends React.Component {
        ['foo']() {}
        render() {
          const { 'foo': bar } = this;
          return <SomeComponent />;
        }
      }
    `,
    dedent`
      class ClassComputedMemberTest extends React.Component {
        [foo]() {}
        render() {
          return <SomeComponent />;
        }
      }
    `,
    dedent`
      class ClassWithLifecycleMethods extends React.Component {
        constructor(props) {
          super(props);
        }
        static getDerivedStateFromProps() {}
        componentWillMount() {}
        UNSAFE_componentWillMount() {}
        componentDidMount() {}
        componentWillReceiveProps() {}
        UNSAFE_componentWillReceiveProps() {}
        shouldComponentUpdate() {}
        componentWillUpdate() {}
        UNSAFE_componentWillUpdate() {}
        static getSnapshotBeforeUpdate() {}
        componentDidUpdate() {}
        componentDidCatch() {}
        componentWillUnmount() {}
        render() {
          return <SomeComponent />;
        }
      }
    `,
  ],
  invalid: [
    {
      code: `
        class Foo extends React.Component {
          state = {}
          getDerivedStateFromProps() {}
          render() {
            function f() {
              console.log(this.state);
            }

            return <div>Example</div>;
          }
        }
      `,
      errors: [
        {
          messageId: "NO_UNUSED_STATE",
          data: { className: "Foo" },
        },
      ],
    },
    {
      code: `
        class Foo extends React.Component {
          state = {}
          handleClick() {}
          render() {
            return null;
          }
        }
      `,
      errors: [
        {
          messageId: "NO_UNUSED_STATE",
          data: { className: "Foo" },
        },
      ],
    },
    {
      code: `
        class Foo extends React.Component {
          state = {}
          handleScroll() {}
          handleClick() {}
          render() {
            return null;
          }
        }
      `,
      errors: [
        {
          messageId: "NO_UNUSED_STATE",
          data: { className: "Foo" },
        },
      ],
    },
    {
      code: `
        class Foo extends React.Component {
          state = {}
          handleClick = () => {}
          render() {
            return null;
          }
        }
      `,
      errors: [
        {
          messageId: "NO_UNUSED_STATE",
          data: { className: "Foo" },
        },
      ],
    },
    {
      code: `
        class Foo extends React.Component {
          state = {}
          action = async () => {}
          render() {
            return null;
          }
        }
      `,
      errors: [
        {
          messageId: "NO_UNUSED_STATE",
          data: { className: "Foo" },
        },
      ],
    },
    {
      code: `
        class Foo extends React.Component {
          state = {};
          async action() {
            console.log('error');
          }
          render() {
            return null;
          }
        }
      `,
      errors: [
        {
          messageId: "NO_UNUSED_STATE",
          data: { className: "Foo" },
        },
      ],
    },
    {
      code: `
        class Foo extends React.Component {
          state = {};
          * action() {
            console.log('error');
          }
          render() {
            return null;
          }
        }
      `,
      errors: [
        {
          messageId: "NO_UNUSED_STATE",
          data: { className: "Foo" },
        },
      ],
    },
    {
      code: `
        class Foo extends React.Component {
          state = {};
          async * action() {
            console.log('error');
          }
          render() {
            return null;
          }
        }
      `,
      errors: [
        {
          messageId: "NO_UNUSED_STATE",
          data: { className: "Foo" },
        },
      ],
    },
    {
      code: `
        class Foo extends React.Component {
          state = {}
          getInitialState() {}
          render() {
            return null;
          }
        }
      `,
      errors: [
        {
          messageId: "NO_UNUSED_STATE",
          data: { className: "Foo" },
        },
      ],
    },
    {
      code: `
        class Foo extends React.Component {
          state = {}
          action = function() {
            console.log('error');
          }
          render() {
            return null;
          }
        }
      `,
      errors: [
        {
          messageId: "NO_UNUSED_STATE",
          data: { className: "Foo" },
        },
      ],
    },
    {
      code: `
         class ClassAssignPropertyInMethodTest extends React.Component {
           state = {}
           foo = 3;
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          messageId: "NO_UNUSED_STATE",
          data: { className: "ClassAssignPropertyInMethodTest" },
        },
      ],
    },
    {
      code: `
         class ClassAssignPropertyInMethodTest extends React.Component {
           state = {}
           constructor() {
             this.foo = 3;
           }
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          messageId: "NO_UNUSED_STATE",
          data: { className: "ClassAssignPropertyInMethodTest" },
        },
      ],
    },
    {
      code: `
         class Foo extends React.Component {
           state = {}
           foo;
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          messageId: "NO_UNUSED_STATE",
          data: { className: "Foo" },
        },
      ],
    },
    {
      code: `
         class Foo extends React.Component {
           state = {}
           foo = a;
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          messageId: "NO_UNUSED_STATE",
          data: { className: "Foo" },
        },
      ],
    },
    {
      code: `
         class Foo extends React.Component {
           state = {}
           ['foo'];
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          messageId: "NO_UNUSED_STATE",
          data: { className: "Foo" },
        },
      ],
    },
    {
      code: `
         class Foo extends React.Component {
           state = {}
           ['foo'] = a;
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          messageId: "NO_UNUSED_STATE",
          data: { className: "Foo" },
        },
      ],
    },
    {
      code: `
         class Foo extends React.Component {
           foo = a;
           state = {}
           render() {
             return <SomeComponent foo={this[foo]} />;
           }
         }
       `,
      errors: [
        {
          messageId: "NO_UNUSED_STATE",
          data: { className: "Foo" },
        },
      ],
    },
    {
      code: `
         class Foo extends React.Component {
           private foo;
           state = {}
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          messageId: "NO_UNUSED_STATE",
          data: { className: "Foo" },
        },
      ],
    },
    {
      code: `
         class Foo extends React.Component {
          state = {}
          private foo() {}
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          messageId: "NO_UNUSED_STATE",
          data: { className: "Foo" },
        },
      ],
    },
    {
      code: `
         class Foo extends React.Component {
           state = {}
           private foo = 3;
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          messageId: "NO_UNUSED_STATE",
          data: { className: "Foo" },
        },
      ],
    },
  ],
});
