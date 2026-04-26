import tsx from "dedent";

import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./static-components";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        function Parent() {
          const ChildComponent = () => {
            const [count, setCount] = useState(0);
            return <button onClick={() => setCount(count + 1)}>{count}</button>;
          };

          return <ChildComponent />;
        }
      `,
      errors: [
        {
          data: { name: "ChildComponent" },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function Parent() {
          function ChildComponent() {
            return <div />;
          }

          return <ChildComponent />;
        }
      `,
      errors: [
        {
          data: { name: "ChildComponent" },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function Parent({ type }) {
          const Component = type === "button"
            ? () => <button>Click</button>
            : () => <div>Text</div>;

          return <Component />;
        }
      `,
      errors: [
        {
          data: { name: "Component" },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function Parent() {
          const ChildComponent = React.memo(() => {
            return <div />;
          });

          return <ChildComponent />;
        }
      `,
      errors: [
        {
          data: { name: "ChildComponent" },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function Parent() {
          const ChildComponent = class extends React.Component {
            render() {
              return <div />;
            }
          };

          return <ChildComponent />;
        }
      `,
      errors: [
        {
          data: { name: "ChildComponent" },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function Parent() {
          const ChildComponent = createComponent();

          return <ChildComponent />;
        }
      `,
      errors: [
        {
          data: { name: "ChildComponent" },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        class Parent extends React.Component {
          render() {
            const ChildComponent = () => <div />;
            return <ChildComponent />;
          }
        }
      `,
      errors: [
        {
          data: { name: "ChildComponent" },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function Parent() {
          function getComponent() {
            const Nested = () => <div />;
            return <Nested />;
          }

          return <div>{getComponent()}</div>;
        }
      `,
      errors: [
        {
          data: { name: "Nested" },
          messageId: "default",
        },
      ],
    },
    // Ported from react-main/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler/static-components
    {
      code: tsx`
        function Example(props) {
          function Component() {
            return <div />;
          }
          return <Component />;
        }
      `,
      errors: [
        {
          data: { name: "Component" },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function Example(props) {
          const Component = new ComponentFactory();
          return <Component />;
        }
      `,
      errors: [
        {
          data: { name: "Component" },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function Example(props) {
          const Component = props.foo.bar();
          return <Component />;
        }
      `,
      errors: [
        {
          data: { name: "Component" },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function Example(props) {
          const Component = createComponent();
          return <Component />;
        }
      `,
      errors: [
        {
          data: { name: "Component" },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function Example(props) {
          let Component;
          if (props.cond) {
            Component = createComponent();
          } else {
            Component = DefaultComponent;
          }
          return <Component />;
        }
      `,
      errors: [
        {
          data: { name: "Component" },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function Parent() {
          const A = () => <div />;
          const B = A;
          return <B />;
        }
      `,
      errors: [
        {
          data: { name: "B" },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function Parent() {
          const A = createComponent();
          const B = A;
          return <B />;
        }
      `,
      errors: [
        {
          data: { name: "B" },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function Parent() {
          const A = () => <div />;
          const B = condition ? A : () => <span />;
          return <B />;
        }
      `,
      errors: [
        {
          data: { name: "B" },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function Parent() {
          let Component = DefaultComponent;
          Component = createComponent();
          const B = Component;
          return <B />;
        }
      `,
      errors: [
        {
          data: { name: "B" },
          messageId: "default",
        },
      ],
    },
  ],
  valid: [
    {
      code: tsx`
        function Parent() {
          return <ChildComponent />;
        }

        function ChildComponent() {
          return <div />;
        }
      `,
    },
    {
      code: tsx`
        function Parent() {
          const ChildComponent = () => <div />;
          return <div />;
        }
      `,
    },
    {
      code: tsx`
        function Parent() {
          function onClick(event) {
            console.log(event);
          }

          return <button onClick={onClick} />;
        }
      `,
    },
    {
      code: tsx`
        function Parent() {
          return <div><span>text</span></div>;
        }
      `,
    },
    {
      code: tsx`
        import ChildComponent from "./ChildComponent";

        function Parent() {
          return <ChildComponent />;
        }
      `,
    },
    {
      code: tsx`
        function Parent(props) {
          return (
            <ul>
              {props.items.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          );
        }
      `,
    },
    {
      code: tsx`
        function Parent() {
          return (
            <SomeComponent footer={<OutsideDefinedComponent />} />
          );
        }
      `,
    },
    {
      code: tsx`
        const External = () => <div />;

        function Parent() {
          const B = External;
          return <B />;
        }
      `,
    },
  ],
});
