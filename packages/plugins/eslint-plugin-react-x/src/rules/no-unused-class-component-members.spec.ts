import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-unused-class-component-members";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
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
          messageId: "noUnusedClassComponentMembers",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noUnusedClassComponentMembers",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noUnusedClassComponentMembers",
        },
        {
          data: { className: "Foo", methodName: "handleClick" },
          messageId: "noUnusedClassComponentMembers",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noUnusedClassComponentMembers",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noUnusedClassComponentMembers",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noUnusedClassComponentMembers",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noUnusedClassComponentMembers",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noUnusedClassComponentMembers",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noUnusedClassComponentMembers",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noUnusedClassComponentMembers",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noUnusedClassComponentMembers",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noUnusedClassComponentMembers",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noUnusedClassComponentMembers",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noUnusedClassComponentMembers",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noUnusedClassComponentMembers",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noUnusedClassComponentMembers",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noUnusedClassComponentMembers",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noUnusedClassComponentMembers",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noUnusedClassComponentMembers",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noUnusedClassComponentMembers",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      class Foo extends React.Component {
        shouldComponentUpdate() {
          return true;
        }
      }
    `,
    /* tsx */ `
      class Foo extends React.Component {
        shouldComponentUpdate = () => {
          return true;
        }
      }
    `,
    /* tsx */ `
      function Foo() {
        return class Bar extends React.Component {
          shouldComponentUpdate() {
            return true;
          }
        };
      }
    `,
    /* tsx */ `
      class SmockTestForTypeOfNullError extends React.Component {
        handleClick() {}
        foo;
        render() {
          let a;
          return <button disabled onClick={this.handleClick} foo={this.foo}>Text</button>;
        }
      }
    `,
    /* tsx */ `
      class Foo extends React.Component {
        handleClick() {}
        render() {
          return <button onClick={this.handleClick}>Text</button>;
        }
      }
    `,
    /* tsx */ `
      var Foo = createReactClass({
        handleClick() {},
        render() {
          return <button onClick={this.handleClick}>Text</button>;
        },
      })
    `,
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
      class Foo extends React.Component {
        handleClick = () => {}
        render() {
          return <button onClick={this.handleClick}>Button</button>;
        }
      }
    `,
    /* tsx */ `
      class Foo extends React.Component {
        renderContent() {}
        render() {
          return <div>{this.renderContent()}</div>;
        }
      }
    `,
    /* tsx */ `
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
    /* tsx */ `
      class Foo extends React.Component {
        property = {}
        render() {
          return <div property={this.property}>Example</div>;
        }
      }
    `,
    /* tsx */ `
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
    /* tsx */ `
      class Foo extends React.Component {
        action = () => {}
        anotherAction = () => this.action()
        render() {
          return <button onClick={this.anotherAction}>Example</button>;
        }
      }
    `,
    /* tsx */ `
      class Foo extends React.Component {
        getValue = () => {}
        value = this.getValue()
        render() {
          return this.value;
        }
      }
    `,
    /* tsx */ `
      class Foo {
        action = () => {}
        anotherAction = () => this.action()
      }
    `,
    /* tsx */ `
      class Foo extends React.Component {
        action = async () => {}
        render() {
          return <button onClick={this.action}>Click</button>;
        }
      }
    `,
    /* tsx */ `
      class Foo extends React.Component {
        async action() {
          console.log('error');
        }
        render() {
          return <button onClick={() => this.action()}>Click</button>;
        }
      }
    `,
    /* tsx */ `
      class Foo extends React.Component {
        * action() {
          console.log('error');
        }
        render() {
          return <button onClick={() => this.action()}>Click</button>;
        }
      }
    `,
    /* tsx */ `
      class Foo extends React.Component {
        async * action() {
          console.log('error');
        }
        render() {
          return <button onClick={() => this.action()}>Click</button>;
        }
      }
    `,
    /* tsx */ `
      class Foo extends React.Component {
        action = function() {
          console.log('error');
        }
        render() {
          return <button onClick={() => this.action()}>Click</button>;
        }
      }
    `,
    /* tsx */ `
      class ClassPropertyTest extends React.Component {
        foo;
        render() {
          return <SomeComponent foo={this.foo} />;
        }
      }
    `,
    /* tsx */ `
      class ClassPropertyTest extends React.Component {
        foo = a;
        render() {
          return <SomeComponent foo={this.foo} />;
        }
      }
    `,
    /* tsx */ `
      class Foo extends React.Component {
        ['foo'] = a;
        render() {
          return <SomeComponent foo={this['foo']} />;
        }
      }
    `,
    /* tsx */ `
      class Foo extends React.Component {
        ['foo'];
        render() {
          return <SomeComponent foo={this['foo']} />;
        }
      }
    `,
    /* tsx */ `
      class ClassComputedTemplatePropertyTest extends React.Component {
        [\`foo\`] = a;
        render() {
          return <SomeComponent foo={this[\`foo\`]} />;
        }
      }
    `,
    /* tsx */ `
      class ClassComputedTemplatePropertyTest extends React.Component {
        state = {}
        render() {
          return <div />;
        }
      }
    `,
    /* tsx */ `
      class ClassLiteralComputedMemberTest extends React.Component {
        ['foo']() {}
        render() {
          return <SomeComponent foo={this.foo} />;
        }
      }
    `,
    /* tsx */ `
      class ClassComputedTemplateMemberTest extends React.Component {
        [\`foo\`]() {}
        render() {
          return <SomeComponent foo={this.foo} />;
        }
      }
    `,
    /* tsx */ `
      class ClassUseAssignTest extends React.Component {
        foo() {}
        render() {
          this.foo;
          return <SomeComponent />;
        }
      }
    `,
    /* tsx */ `
      class ClassUseAssignTest extends React.Component {
        foo() {}
        render() {
          const { foo } = this;
          return <SomeComponent />;
        }
      }
    `,
    /* tsx */ `
      class ClassUseDestructuringTest extends React.Component {
        foo() {}
        render() {
          const { foo } = this;
          return <SomeComponent />;
        }
      }
    `,
    /* tsx */ `
      class ClassUseDestructuringTest extends React.Component {
        ['foo']() {}
        render() {
          const { 'foo': bar } = this;
          return <SomeComponent />;
        }
      }
    `,
    /* tsx */ `
      class ClassComputedMemberTest extends React.Component {
        [foo]() {}
        render() {
          return <SomeComponent />;
        }
      }
    `,
    /* tsx */ `
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
