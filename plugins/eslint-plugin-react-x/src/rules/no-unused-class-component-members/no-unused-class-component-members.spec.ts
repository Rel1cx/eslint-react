import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-unused-class-component-members";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      name: "unused class method",
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
    {
      name: "unused arrow function property",
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
    {
      name: "multiple unused methods",
      code: tsx`
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
          messageId: "default",
        },
        {
          data: { className: "Foo", methodName: "handleClick" },
          messageId: "default",
        },
      ],
    },
    {
      name: "unused property with literal initializer",
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
    {
      name: "unused property with identifier initializer",
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
    {
      name: "unused property without initializer",
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
    {
      name: "unused async arrow function property",
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
    {
      name: "unused async method",
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
    {
      name: "unused generator method",
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
    {
      name: "unused async generator method",
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
    {
      name: "unused function expression property",
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
    {
      name: "unused property assigned in constructor",
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
    {
      name: "unused private property without initializer",
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
    {
      name: "unused private method",
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
    {
      name: "unused private property with initializer",
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
    {
      name: "unused property accessed via unrelated computed member",
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
    {
      name: "unused getInitialState method",
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
    {
      name: "unused getDerivedStateFromProps method",
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
    {
      name: "unused shouldComponentUpdate method in PureComponent",
      code: tsx`
        class Foo extends React.PureComponent {
          shouldComponentUpdate() {
            return true;
          }
          render() {
            return null;
          }
        }
      `,
      errors: [
        {
          data: { className: "Foo", methodName: "shouldComponentUpdate" },
          messageId: "default",
        },
      ],
    },
    {
      name: "unused shouldComponentUpdate property in PureComponent",
      code: tsx`
        class Foo extends PureComponent {
          shouldComponentUpdate = () => {
            return true;
          }
          render() {
            return null;
          }
        }
      `,
      errors: [
        {
          data: { className: "Foo", methodName: "shouldComponentUpdate" },
          messageId: "default",
        },
      ],
    },
    {
      name: "unused method in class expression",
      code: tsx`
        const Foo = class extends React.Component {
          handleClick() {}
          render() {
            return null;
          }
        };
      `,
      errors: [
        {
          data: { className: "Foo", methodName: "handleClick" },
          messageId: "default",
        },
      ],
    },
  ],
  valid: [
    {
      name: "method used as click handler",
      code: tsx`
        class Foo extends React.Component {
          handleClick() {}
          render() {
            return <button onClick={this.handleClick}>Text</button>;
          }
        }
      `,
    },
    {
      name: "arrow function property used as click handler",
      code: tsx`
        class Foo extends React.Component {
          handleClick = () => {}
          render() {
            return <button onClick={this.handleClick}>Button</button>;
          }
        }
      `,
    },
    {
      name: "state property without usage",
      code: tsx`
        class Foo extends React.Component {
          state = {}
          render() {
            return <div />;
          }
        }
      `,
    },
    {
      name: "method called in lifecycle method",
      code: tsx`
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
    },
    {
      name: "method called in render",
      code: tsx`
        class Foo extends React.Component {
          renderContent() {}
          render() {
            return <div>{this.renderContent()}</div>;
          }
        }
      `,
    },
    {
      name: "method called in nested JSX",
      code: tsx`
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
    },
    {
      name: "property used in JSX attribute",
      code: tsx`
        class Foo extends React.Component {
          property = {}
          render() {
            return <div property={this.property}>Example</div>;
          }
        }
      `,
    },
    {
      name: "uninitialized property used in JSX attribute",
      code: tsx`
        class ClassPropertyTest extends React.Component {
          foo;
          render() {
            return <SomeComponent foo={this.foo} />;
          }
        }
      `,
    },
    {
      name: "initialized property used in JSX attribute",
      code: tsx`
        class ClassPropertyTest extends React.Component {
          foo = a;
          render() {
            return <SomeComponent foo={this.foo} />;
          }
        }
      `,
    },
    {
      name: "method called in property initializer",
      code: tsx`
        class Foo extends React.Component {
          getValue = () => {}
          value = this.getValue()
          render() {
            return this.value;
          }
        }
      `,
    },
    {
      name: "property called in another property with block body",
      code: tsx`
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
    },
    {
      name: "property called in another property with expression body",
      code: tsx`
        class Foo extends React.Component {
          action = () => {}
          anotherAction = () => this.action()
          render() {
            return <button onClick={this.anotherAction}>Example</button>;
          }
        }
      `,
    },
    {
      name: "async arrow function property used as click handler",
      code: tsx`
        class Foo extends React.Component {
          action = async () => {}
          render() {
            return <button onClick={this.action}>Click</button>;
          }
        }
      `,
    },
    {
      name: "async method called in render",
      code: tsx`
        class Foo extends React.Component {
          async action() {
            console.log('error');
          }
          render() {
            return <button onClick={() => this.action()}>Click</button>;
          }
        }
      `,
    },
    {
      name: "generator method called in render",
      code: tsx`
        class Foo extends React.Component {
          * action() {
            console.log('error');
          }
          render() {
            return <button onClick={() => this.action()}>Click</button>;
          }
        }
      `,
    },
    {
      name: "async generator method called in render",
      code: tsx`
        class Foo extends React.Component {
          async * action() {
            console.log('error');
          }
          render() {
            return <button onClick={() => this.action()}>Click</button>;
          }
        }
      `,
    },
    {
      name: "function expression property called in render",
      code: tsx`
        class Foo extends React.Component {
          action = function() {
            console.log('error');
          }
          render() {
            return <button onClick={() => this.action()}>Click</button>;
          }
        }
      `,
    },
    {
      name: "shouldComponentUpdate method without render",
      code: tsx`
        class Foo extends React.Component {
          shouldComponentUpdate() {
            return true;
          }
        }
      `,
    },
    {
      name: "shouldComponentUpdate property without render",
      code: tsx`
        class Foo extends React.Component {
          shouldComponentUpdate = () => {
            return true;
          }
        }
      `,
    },
    {
      name: "lifecycle method in class returned from function",
      code: tsx`
        function Foo() {
          return class Bar extends React.Component {
            shouldComponentUpdate() {
              return true;
            }
          };
        }
      `,
    },
    {
      name: "createReactClass with method used as click handler",
      code: tsx`
        var Foo = createReactClass({
          handleClick() {},
          render() {
            return <button onClick={this.handleClick}>Text</button>;
          },
        })
      `,
    },
    {
      name: "createReactClass with method called in lifecycle method",
      code: tsx`
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
    },
    {
      name: "method referenced via local variable in lifecycle method",
      code: tsx`
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
    },
    {
      name: "method call result assigned in lifecycle method",
      code: tsx`
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
    },
    {
      name: "non-component class is ignored",
      code: tsx`
        class Foo {
          action = () => {}
          anotherAction = () => this.action()
        }
      `,
    },
    {
      name: "literal computed property used via computed access",
      code: tsx`
        class Foo extends React.Component {
          ['foo'] = a;
          render() {
            return <SomeComponent foo={this['foo']} />;
          }
        }
      `,
    },
    {
      name: "uninitialized literal computed property used via computed access",
      code: tsx`
        class Foo extends React.Component {
          ['foo'];
          render() {
            return <SomeComponent foo={this['foo']} />;
          }
        }
      `,
    },
    {
      name: "template literal computed property used via computed access",
      code: tsx`
        class ClassComputedTemplatePropertyTest extends React.Component {
          [\`foo\`] = a;
          render() {
            return <SomeComponent foo={this[\`foo\`]} />;
          }
        }
      `,
    },
    {
      name: "literal computed method used via dot access",
      code: tsx`
        class ClassLiteralComputedMemberTest extends React.Component {
          ['foo']() {}
          render() {
            return <SomeComponent foo={this.foo} />;
          }
        }
      `,
    },
    {
      name: "template literal computed method used via dot access",
      code: tsx`
        class ClassComputedTemplateMemberTest extends React.Component {
          [\`foo\`]() {}
          render() {
            return <SomeComponent foo={this.foo} />;
          }
        }
      `,
    },
    {
      name: "method referenced in expression statement",
      code: tsx`
        class ClassUseAssignTest extends React.Component {
          foo() {}
          render() {
            this.foo;
            return <SomeComponent />;
          }
        }
      `,
    },
    {
      name: "method destructured from this in assignment test",
      code: tsx`
        class ClassUseAssignTest extends React.Component {
          foo() {}
          render() {
            const { foo } = this;
            return <SomeComponent />;
          }
        }
      `,
    },
    {
      name: "method destructured from this in destructuring test",
      code: tsx`
        class ClassUseDestructuringTest extends React.Component {
          foo() {}
          render() {
            const { foo } = this;
            return <SomeComponent />;
          }
        }
      `,
    },
    {
      name: "computed method destructured from this with string key",
      code: tsx`
        class ClassUseDestructuringTest extends React.Component {
          ['foo']() {}
          render() {
            const { 'foo': bar } = this;
            return <SomeComponent />;
          }
        }
      `,
    },
    {
      name: "unresolvable computed method is ignored",
      code: tsx`
        class ClassComputedMemberTest extends React.Component {
          [foo]() {}
          render() {
            return <SomeComponent />;
          }
        }
      `,
    },
    {
      name: "untracked computed property without initializer",
      code: tsx`
        class Foo extends React.Component {
          ['foo'];
          render() {
            return <SomeComponent />;
          }
        }
      `,
    },
    {
      name: "untracked computed property with initializer",
      code: tsx`
        class Foo extends React.Component {
          ['foo'] = a;
          render() {
            return <SomeComponent />;
          }
        }
      `,
    },
    {
      name: "smoke test for typeof null error",
      code: tsx`
        class SmockTestForTypeOfNullError extends React.Component {
          handleClick() {}
          foo;
          render() {
            let a;
            return <button disabled onClick={this.handleClick} foo={this.foo}>Text</button>;
          }
        }
      `,
    },
    {
      name: "class with all lifecycle methods",
      code: tsx`
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
    },
  ],
});
