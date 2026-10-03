import tsx from "dedent";

import { ruleTester } from "@local/testkit";
import rule, { RULE_NAME } from "./static-components";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
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
          messageId: "created-here",
        },
        {
          data: { name: "ChildComponent" },
          messageId: "default",
        },
      ],
    },
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
          messageId: "created-here",
        },
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
          messageId: "created-here",
        },
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
          messageId: "created-here",
        },
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
          messageId: "created-here",
        },
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
          messageId: "created-here",
        },
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
          messageId: "created-here",
        },
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
          messageId: "created-here",
        },
        {
          data: { name: "Nested" },
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
          messageId: "created-here",
        },
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
          messageId: "created-here",
        },
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
          messageId: "created-here",
        },
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
          messageId: "created-here",
        },
        {
          data: { name: "B" },
          messageId: "default",
        },
      ],
    },
    // Ported from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler/static-components
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
          messageId: "created-here",
        },
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
          messageId: "created-here",
        },
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
          messageId: "created-here",
        },
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
          messageId: "created-here",
        },
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
          messageId: "created-here",
        },
        {
          data: { name: "Component" },
          messageId: "default",
        },
      ],
    },
    // Component tag function that does not return JSX (from React Compiler fixtures)
    {
      code: tsx`
        function Component() {
          const Foo = () => {
            someGlobal = true;
          };
          return <Foo />;
        }
      `,
      errors: [
        {
          data: { name: "Foo" },
          messageId: "created-here",
        },
        {
          data: { name: "Foo" },
          messageId: "default",
        },
      ],
    },
    // Context variable reassigned via useMemo then used as JSX tag (from React Compiler fixtures)
    // NOTE: The IMPL flags this as dynamic because it sees the CallExpression (useMemo)
    // in the reassignment, even though the result is an external component.
    {
      code: tsx`
        function Component(props) {
          let Component = Stringify;
          Component = useMemo(() => {
            return Component;
          }, [Component]);
          return <Component {...props} />;
        }
      `,
      errors: [
        {
          data: { name: "Component" },
          messageId: "created-here",
        },
        {
          data: { name: "Component" },
          messageId: "default",
        },
      ],
    },
    // Boundary: a `ClassDeclaration` nested directly inside render is dynamic,
    // mirroring the `FunctionDeclaration` case above.
    {
      code: tsx`
        function Parent() {
          class ChildComponent extends React.Component {
            render() {
              return <div />;
            }
          }

          return <ChildComponent />;
        }
      `,
      errors: [
        {
          data: { name: "ChildComponent" },
          messageId: "created-here",
        },
        {
          data: { name: "ChildComponent" },
          messageId: "default",
        },
      ],
    },
    // Boundary: only the alternate branch of a ternary is dynamic; the consequent is a
    // static external reference. The IMPL still flags the whole expression as dynamic.
    {
      code: tsx`
        function Parent({ type }) {
          const Component = type === "button"
            ? StaticButton
            : () => <div>Text</div>;

          return <Component />;
        }
      `,
      errors: [
        {
          data: { name: "Component" },
          messageId: "created-here",
        },
        {
          data: { name: "Component" },
          messageId: "default",
        },
      ],
    },
    // Boundary: only the consequent branch of a ternary is dynamic; the alternate is a
    // static external reference. The IMPL still flags the whole expression as dynamic.
    {
      code: tsx`
        function Parent({ type }) {
          const Component = type === "button"
            ? () => <button>Click</button>
            : StaticText;

          return <Component />;
        }
      `,
      errors: [
        {
          data: { name: "Component" },
          messageId: "created-here",
        },
        {
          data: { name: "Component" },
          messageId: "default",
        },
      ],
    },
    // Boundary: a reassignment whose right-hand side is an identifier resolves that
    // identifier recursively; the creation site points at the aliased arrow function,
    // not at the reassignment itself.
    {
      code: tsx`
        function Parent() {
          let A = DefaultComponent;
          const B = () => <div />;
          A = B;
          return <A />;
        }
      `,
      errors: [
        {
          data: { name: "A" },
          messageId: "created-here",
        },
        {
          data: { name: "A" },
          messageId: "default",
        },
      ],
    },
    // Boundary: TypeScript type expressions (`as`, `satisfies`, non-null assertion) are
    // unwrapped before classification, so a wrapped factory call is still dynamic.
    {
      code: tsx`
        function Parent() {
          const C = createComponent() as any;
          return <C />;
        }
      `,
      errors: [
        {
          data: { name: "C" },
          messageId: "created-here",
        },
        {
          data: { name: "C" },
          messageId: "default",
        },
      ],
    },
    // Boundary: an optional-chaining call (`factory?.()`) produces a ChainExpression,
    // which is unwrapped to the inner CallExpression and treated as dynamic.
    {
      code: tsx`
        function Parent() {
          const C = factory?.();
          return <C />;
        }
      `,
      errors: [
        {
          data: { name: "C" },
          messageId: "created-here",
        },
        {
          data: { name: "C" },
          messageId: "default",
        },
      ],
    },
    // Boundary: for class components the render boundary is the whole class body, not
    // just `render()`. A component created inside `componentDidMount` is still flagged
    // because its declaration lies within the collected class component node.
    {
      code: tsx`
        class Parent extends React.Component {
          componentDidMount() {
            const C = () => <div />;
            renderIntoDocument(<C />);
          }
          render() {
            return <div />;
          }
        }
      `,
      errors: [
        {
          data: { name: "C" },
          messageId: "created-here",
        },
        {
          data: { name: "C" },
          messageId: "default",
        },
      ],
    },
    // Boundary: for function components the entire component body counts as render,
    // including effect callbacks. A component created inside `useEffect` is flagged.
    {
      code: tsx`
        function Parent() {
          useEffect(() => {
            const C = () => <div />;
            mount(<C />);
          }, []);
          return <div />;
        }
      `,
      errors: [
        {
          data: { name: "C" },
          messageId: "created-here",
        },
        {
          data: { name: "C" },
          messageId: "default",
        },
      ],
    },
    // Boundary: `default` reporting is per JSX usage, while `createdHere` is reported
    // once per creation site. Two usages of the same dynamically created component each
    // produce a `default` report at the usage site, but share a single `createdHere`
    // report at the creation site.
    {
      code: tsx`
        function Parent() {
          const C = () => <div />;
          return <><C /><C /></>;
        }
      `,
      errors: [
        {
          data: { name: "C" },
          messageId: "created-here",
        },
        {
          data: { name: "C" },
          messageId: "default",
        },
        {
          data: { name: "C" },
          messageId: "default",
        },
      ],
    },
    // Boundary: the usage location is irrelevant — only the creation site must lie
    // inside render. A usage inside a non-component event-handler arrow is still flagged.
    {
      code: tsx`
        function Parent() {
          const C = () => <div />;
          const handle = () => <C />;
          return <button onClick={handle} />;
        }
      `,
      errors: [
        {
          data: { name: "C" },
          messageId: "created-here",
        },
        {
          data: { name: "C" },
          messageId: "default",
        },
      ],
    },
    // Boundary: scope resolution picks the nearest binding. The inner dynamic
    // declaration shadows the static module-scope component, so the usage is flagged
    // even though an identical static name exists at module scope.
    {
      code: tsx`
        const C = () => <span />;
        function Parent() {
          const C = () => <div />;
          return <C />;
        }
      `,
      errors: [
        {
          data: { name: "C" },
          messageId: "created-here",
        },
        {
          data: { name: "C" },
          messageId: "default",
        },
      ],
    },
    // Boundary: ternary branches are traced in reassignment right-hand sides too, not
    // only in declarator initializers.
    {
      code: tsx`
        function Parent({ cond }) {
          let C = DefaultComponent;
          C = cond ? createComponent() : DefaultComponent;
          return <C />;
        }
      `,
      errors: [
        {
          data: { name: "C" },
          messageId: "created-here",
        },
        {
          data: { name: "C" },
          messageId: "default",
        },
      ],
    },
    // Boundary: both sides of a logical expression are traced, mirroring ternary
    // branches. A dynamic arrow on the right-hand side of `||` makes the whole
    // expression dynamic.
    {
      code: tsx`
        function Parent() {
          const C = DefaultComponent || (() => <div />);
          return <C />;
        }
      `,
      errors: [
        {
          data: { name: "C" },
          messageId: "created-here",
        },
        {
          data: { name: "C" },
          messageId: "default",
        },
      ],
    },
    // Boundary: a sequence expression resolves to its final element; the creation site
    // points at that element, not the sequence.
    {
      code: tsx`
        function Parent() {
          const C = (setup(), () => <div />);
          return <C />;
        }
      `,
      errors: [
        {
          data: { name: "C" },
          messageId: "created-here",
        },
        {
          data: { name: "C" },
          messageId: "default",
        },
      ],
    },
  ],
  valid: [
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
          return <div><span>text</span></div>;
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
        function Parent() {
          const ChildComponent = () => <div />;
          return <div />;
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
    // Component variable referenced in non-assignment context should not crash
    {
      code: tsx`
        function Parent() {
          let Component = DefaultComponent;
          console.log(Component);
          return <Component />;
        }
      `,
    },
    // Component variable in array expression should not crash
    {
      code: tsx`
        function Parent() {
          let Component = DefaultComponent;
          const arr = [Component];
          return <Component />;
        }
      `,
    },
    // Component variable passed as argument should not crash
    {
      code: tsx`
        function Parent() {
          let Component = DefaultComponent;
          fn(Component);
          return <Component />;
        }
      `,
    },
    // Boundary: JSX member expression tags (e.g. `<Namespace.Bar />`) are ignored entirely,
    // even when the referenced property is dynamically created.
    {
      code: tsx`
        function Parent() {
          const Namespace = { Bar: () => <div /> };
          return <Namespace.Bar />;
        }
      `,
    },
    // Boundary: a lowercase-named binding is never treated as a component reference,
    // regardless of how its value was created, because JSX treats lowercase tags as
    // host elements rather than component references.
    {
      code: tsx`
        function Parent() {
          const childComponent = () => <div />;
          return <childComponent />;
        }
      `,
    },
    // Boundary: hooks (names starting with lowercase "use") are not recognized as
    // function-component render boundaries, so components nested directly inside a
    // top-level hook (not itself nested inside a component) are not flagged.
    {
      code: tsx`
        function useFoo() {
          function Component() {
            return <div />;
          }
          return <Component />;
        }
      `,
    },
    // Boundary: both branches of the ternary resolve to static/external references,
    // so the assembled component is not considered dynamic.
    {
      code: tsx`
        function Parent({ type }) {
          const Component = type === "button" ? StaticButton : StaticText;
          return <Component />;
        }
      `,
    },
    // Boundary: mutual reassignment between two variables must not cause infinite
    // recursion; the cycle-detection guard should terminate and treat it as static.
    {
      code: tsx`
        function Parent() {
          let A = DefaultComponent;
          let B = DefaultComponent;
          A = B;
          B = A;
          return <A />;
        }
      `,
    },
    // Class component with render helper containing nested component (from React Compiler fixtures)
    // NOTE: The IMPL does not flag this because the class-field arrow _renderMessage is not
    // recognized as a function-component boundary, and the nested Message definition is traced
    // through class-component detection in a way that does not surface here.
    {
      code: tsx`
        class Component {
          _renderMessage = () => {
            const Message = () => {
              const message = this.state.message;
              return <div>{message}</div>;
            };
            return <Message />;
          };

          render() {
            return this._renderMessage();
          }
        }
      `,
    },
    // External component aliased in lambda callback (from React Compiler fixtures)
    {
      code: tsx`
        function useFoo() {
          const MyLocal = Stringify;
          const callback = () => {
            return <MyLocal value={4} />;
          };
          return callback();
        }
      `,
    },
    // Boundary: a nested lowercase function is not itself collected as a component, and
    // its parameter used as a JSX tag is not flagged either — the IMPL distinguishes
    // parameter definitions from function/class declarations by definition type, so
    // receiving the static `DefaultComponent` through `Comp` stays valid.
    {
      code: tsx`
        function Parent() {
          function render(Comp) {
            return <Comp />;
          }
          return <div>{render(DefaultComponent)}</div>;
        }
      `,
    },
    // Boundary: the component's declaration itself must lie inside render for the
    // variable to be considered at all. A module-scope variable that is dynamically
    // reassigned inside render is not flagged, because the declaration-outside-render
    // gate returns before reassignments are examined.
    {
      code: tsx`
        let C = DefaultComponent;
        function Parent() {
          C = createComponent();
          return <C />;
        }
      `,
    },
    // Boundary: only plain `C = value` assignment writes are traced as reassignments.
    // A destructuring write `[C] = [...]` is not recognized, so the dynamic value
    // flowing through it is missed.
    {
      code: tsx`
        function Parent() {
          let C = DefaultComponent;
          [C] = [createComponent()];
          return <C />;
        }
      `,
    },
  ],
});
