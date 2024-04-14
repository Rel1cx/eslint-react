import dedent from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-unused-class-component-members";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: `
        class Foo extends React.Component {
          getDerivedStateFromProps() {}
          render() {
            return <div>Example</div>;
          }
        }
      `,
      errors: [
        {
          data: { className: "Foo", methodName: "getDerivedStateFromProps" },
          messageId: "NO_UNUSED_CLASS_COMPONENT_MEMBERS",
        },
      ],
    },
    {
      code: `
        class Foo extends React.Component {
          handleClick() {}
          render() {
            return null;
          }
        }
      `,
      errors: [
        {
          data: { className: "Foo", methodName: "handleClick" },
          messageId: "NO_UNUSED_CLASS_COMPONENT_MEMBERS",
        },
      ],
    },
    {
      code: `
        class Foo extends React.Component {
          handleScroll() {}
          handleClick() {}
          render() {
            return null;
          }
        }
      `,
      errors: [
        {
          data: { className: "Foo", methodName: "handleScroll" },
          messageId: "NO_UNUSED_CLASS_COMPONENT_MEMBERS",
        },
        {
          data: { className: "Foo", methodName: "handleClick" },
          messageId: "NO_UNUSED_CLASS_COMPONENT_MEMBERS",
        },
      ],
    },
    {
      code: `
        class Foo extends React.Component {
          handleClick = () => {}
          render() {
            return null;
          }
        }
      `,
      errors: [
        {
          data: { className: "Foo", methodName: "handleClick" },
          messageId: "NO_UNUSED_CLASS_COMPONENT_MEMBERS",
        },
      ],
    },
    {
      code: `
        class Foo extends React.Component {
          action = async () => {}
          render() {
            return null;
          }
        }
      `,
      errors: [
        {
          data: { className: "Foo", methodName: "action" },
          messageId: "NO_UNUSED_CLASS_COMPONENT_MEMBERS",
        },
      ],
    },
    {
      code: `
        class Foo extends React.Component {
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
          data: { className: "Foo", methodName: "action" },
          messageId: "NO_UNUSED_CLASS_COMPONENT_MEMBERS",
        },
      ],
    },
    {
      code: `
        class Foo extends React.Component {
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
          data: { className: "Foo", methodName: "action" },
          messageId: "NO_UNUSED_CLASS_COMPONENT_MEMBERS",
        },
      ],
    },
    {
      code: `
        class Foo extends React.Component {
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
          data: { className: "Foo", methodName: "action" },
          messageId: "NO_UNUSED_CLASS_COMPONENT_MEMBERS",
        },
      ],
    },
    {
      code: `
        class Foo extends React.Component {
          getInitialState() {}
          render() {
            return null;
          }
        }
      `,
      errors: [
        {
          data: { className: "Foo", methodName: "getInitialState" },
          messageId: "NO_UNUSED_CLASS_COMPONENT_MEMBERS",
        },
      ],
    },
    {
      code: `
        class Foo extends React.Component {
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
          data: { className: "Foo", methodName: "action" },
          messageId: "NO_UNUSED_CLASS_COMPONENT_MEMBERS",
        },
      ],
    },
    {
      code: `
         class ClassAssignPropertyInMethodTest extends React.Component {
           foo = 3;
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          data: { className: "ClassAssignPropertyInMethodTest", methodName: "foo" },
          messageId: "NO_UNUSED_CLASS_COMPONENT_MEMBERS",
        },
      ],
    },
    {
      code: `
         class ClassAssignPropertyInMethodTest extends React.Component {
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
          data: { className: "ClassAssignPropertyInMethodTest", methodName: "foo" },
          messageId: "NO_UNUSED_CLASS_COMPONENT_MEMBERS",
        },
      ],
    },
    {
      code: `
         class Foo extends React.Component {
           foo;
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          data: { className: "Foo", methodName: "foo" },
          messageId: "NO_UNUSED_CLASS_COMPONENT_MEMBERS",
        },
      ],
    },
    {
      code: `
         class Foo extends React.Component {
           foo = a;
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          data: { className: "Foo", methodName: "foo" },
          messageId: "NO_UNUSED_CLASS_COMPONENT_MEMBERS",
        },
      ],
    },
    {
      code: `
         class Foo extends React.Component {
           ['foo'];
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          data: { className: "Foo", methodName: "foo" },
          messageId: "NO_UNUSED_CLASS_COMPONENT_MEMBERS",
        },
      ],
    },
    {
      code: `
         class Foo extends React.Component {
           ['foo'] = a;
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          data: { className: "Foo", methodName: "foo" },
          messageId: "NO_UNUSED_CLASS_COMPONENT_MEMBERS",
        },
      ],
    },
    {
      code: `
         class Foo extends React.Component {
           foo = a;
           render() {
             return <SomeComponent foo={this[foo]} />;
           }
         }
       `,
      errors: [
        {
          data: { className: "Foo", methodName: "foo" },
          messageId: "NO_UNUSED_CLASS_COMPONENT_MEMBERS",
        },
      ],
    },
    {
      code: `
         class Foo extends React.Component {
           private foo;
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          data: { className: "Foo", methodName: "foo" },
          messageId: "NO_UNUSED_CLASS_COMPONENT_MEMBERS",
        },
      ],
    },
    {
      code: `
         class Foo extends React.Component {
           private foo() {}
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          data: { className: "Foo", methodName: "foo" },
          messageId: "NO_UNUSED_CLASS_COMPONENT_MEMBERS",
        },
      ],
    },
    {
      code: `
         class Foo extends React.Component {
           private foo = 3;
           render() {
             return <SomeComponent />;
           }
         }
       `,
      errors: [
        {
          data: { className: "Foo", methodName: "foo" },
          messageId: "NO_UNUSED_CLASS_COMPONENT_MEMBERS",
        },
      ],
    },
  ],
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
          return <div />;
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
});
