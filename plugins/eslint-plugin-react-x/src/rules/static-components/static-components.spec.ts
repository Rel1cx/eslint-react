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
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
      ],
    },
    // Nested component inside an IIFE (from React Compiler's outlined-function-in-iife.js)
    {
      code: tsx`
        function Component() {
          return (function() {
            function Inner() {
              return <div onClick={() => null} />;
            }
            return <Inner />;
          })();
        }
      `,
      errors: [
        {
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
      ],
    },
    // An inline component returned from useMemo is still created during render.
    // The creation site is the inner component, not the useMemo call.
    {
      code: tsx`
        function Parent() {
          const Memoized = useMemo(() => () => <div />, []);
          return <Memoized />;
        }
      `,
      errors: [
        {
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
      ],
    },
    // A factory call returned from useMemo still produces a new component type.
    {
      code: tsx`
        function Parent() {
          const Memoized = useMemo(() => createComponent(), []);
          return <Memoized />;
        }
      `,
      errors: [
        {
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
      ],
    },
    // Memoizing a component that was itself created during render does not make it static.
    {
      code: tsx`
        function Parent() {
          const Message = () => <div />;
          const Memoized = useMemo(() => Message, []);
          return <Memoized />;
        }
      `,
      errors: [
        {
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
      ],
    },
    // useCallback returns its callback. An inline callback used as a component is dynamic.
    {
      code: tsx`
        function Parent() {
          const Memoized = useCallback(() => <div />, []);
          return <Memoized />;
        }
      `,
      errors: [
        {
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
      ],
    },
    // Boundary: a `ClassDeclaration` nested directly inside render is dynamic, mirroring the `FunctionDeclaration` case above.
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
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
      ],
    },
    // Boundary: an optional-chaining call (`factory?.()`) produces a ChainExpression, which is unwrapped to the inner CallExpression and treated as dynamic.
    {
      code: tsx`
        function Parent() {
          const C = factory?.();
          return <C />;
        }
      `,
      errors: [
        {
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
        {
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
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
      ],
    },
    // Boundary: ternary branches are traced in reassignment right-hand sides too, not only in declarator initializers.
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
          messageId: "created-here",
        },
        {
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
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
      ],
    },
    // Boundary: a sequence expression resolves to its final element; the creation site points at that element, not the sequence.
    {
      code: tsx`
        function Parent() {
          const C = (setup(), () => <div />);
          return <C />;
        }
      `,
      errors: [
        {
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
      ],
    },
    // Boundary: a component-named class-field arrow returning JSX is collected as a
    // component boundary (the detection hint does not exclude class properties), so a
    // component nested inside it is flagged — unlike the lowercase `_renderMessage`
    // helper in the valid cases below, which is not a component boundary.
    {
      code: tsx`
        class Component {
          RenderMessage = () => {
            const Message = () => <div />;
            return <Message />;
          };

          render() {
            return this.RenderMessage();
          }
        }
      `,
      errors: [
        {
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
      ],
    },
    // JSX member expression tags are analyzed: the property path selects the value
    // to trace, and an inline component held by the property is created during render.
    {
      code: tsx`
        function Parent() {
          const Namespace = { Bar: () => <div /> };
          return <Namespace.Bar />;
        }
      `,
      errors: [
        {
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
      ],
    },
    // Boundary: a member tag resolves down the property path to a factory call held by the property.
    {
      code: tsx`
        function Parent() {
          const Namespace = { Bar: createComponent() };
          return <Namespace.Bar />;
        }
      `,
      errors: [
        {
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
      ],
    },
    // Boundary: nested property paths are traced (`<Ns.Deep.Bar />`).
    {
      code: tsx`
        function Parent() {
          const Ns = { Deep: { Bar: () => <div /> } };
          return <Ns.Deep.Bar />;
        }
      `,
      errors: [
        {
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
      ],
    },
    // Boundary: a shorthand property traces through the aliased binding's creation site.
    {
      code: tsx`
        function Parent() {
          const Bar = () => <div />;
          const Ns = { Bar };
          return <Ns.Bar />;
        }
      `,
      errors: [
        {
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
      ],
    },
    // Boundary: a namespace object rebuilt by reassignment is traced the same way.
    {
      code: tsx`
        function Parent() {
          let Ns = DefaultNamespace;
          Ns = { Bar: () => <div /> };
          return <Ns.Bar />;
        }
      `,
      errors: [
        {
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
      ],
    },
    // Boundary: a member access in an initializer is traced as well (`const C = Ns.Bar`).
    {
      code: tsx`
        function Parent() {
          const Ns = { Bar: () => <div /> };
          const C = Ns.Bar;
          return <C />;
        }
      `,
      errors: [
        {
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
      ],
    },
    // Boundary: a lowercase member root is still a component reference (member tags
    // are never intrinsic elements), so a dynamic property value is flagged.
    {
      code: tsx`
        function Parent() {
          const ns = { Bar: () => <div /> };
          return <ns.Bar />;
        }
      `,
      errors: [
        {
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
      ],
    },
    // Boundary: the property value gets the full creation-site tracing — a component
    // created inside a useMemo factory held by the property is flagged.
    {
      code: tsx`
        function Parent() {
          const Ns = { Bar: useMemo(() => () => <div />, []) };
          return <Ns.Bar />;
        }
      `,
      errors: [
        {
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
      ],
    },
    // Boundary: the property value gets the full creation-site tracing — a ternary branch holding an inline component is flagged.
    {
      code: tsx`
        function Parent({ cond }) {
          const Ns = { Bar: cond ? () => <div /> : External };
          return <Ns.Bar />;
        }
      `,
      errors: [
        {
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
      ],
    },
    // Boundary: type expressions wrapping the namespace initializer are unwrapped before the property path is resolved.
    {
      code: tsx`
        function Parent() {
          const Ns = { Bar: () => <div /> } as const;
          return <Ns.Bar />;
        }
      `,
      errors: [
        {
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
      ],
    },
    // Boundary: scope resolution picks the nearest binding for a member tag's root.
    // The inner dynamic namespace shadows the static module-scope one, so the usage is flagged.
    {
      code: tsx`
        const Ns = { Bar: ExternalComponent };

        function Parent() {
          const Ns = { Bar: () => <div /> };
          return <Ns.Bar />;
        }
      `,
      errors: [
        {
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
      ],
    },
    // Boundary: the creation-site report is deduplicated across usage channels —
    // the identifier tag and the member tag share a single `created-here` report.
    {
      code: tsx`
        function Parent() {
          const Bar = () => <div />;
          const Ns = { Bar };
          return <><Bar /><Ns.Bar /></>;
        }
      `,
      errors: [
        {
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
        {
          messageId: "default",
        },
      ],
    },
    // Boundary: a method shorthand property is a fresh function on every rebuild of
    // the namespace object, so it is flagged like an inline component.
    {
      code: tsx`
        function Parent() {
          const Ns = { Bar() { return <div />; } };
          return <Ns.Bar />;
        }
      `,
      errors: [
        {
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
      ],
    },
    // Boundary: a getter that creates the component on each access is genuinely
    // dynamic, and the getter function is the creation site.
    {
      code: tsx`
        function Parent() {
          const Ns = { get Bar() { return () => <div />; } };
          return <Ns.Bar />;
        }
      `,
      errors: [
        {
          messageId: "created-here",
        },
        {
          messageId: "default",
        },
      ],
    },
    // Boundary: a getter is flagged even when it returns a stable outer-scope
    // component — the getter function itself is recreated with the namespace object
    // every render, and the IMPL does not trace getter return values. An accepted
    // over-approximation; accessor properties holding components are rare.
    {
      code: tsx`
        function Parent() {
          const Ns = { get Bar() { return ExternalComponent; } };
          return <Ns.Bar />;
        }
      `,
      errors: [
        {
          messageId: "created-here",
        },
        {
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
    // Boundary: a member tag whose property holds a stable outer-scope component is
    // static — the object is rebuilt every render, but the component type is not.
    {
      code: tsx`
        const ExternalComponent = () => <div />;

        function Parent() {
          const Namespace = { Bar: ExternalComponent };
          return <Namespace.Bar />;
        }
      `,
    },
    // Boundary: a namespace object declared at module scope is stable even though its property holds an inline component.
    {
      code: tsx`
        const Namespace = { Bar: () => <div /> };

        function Parent() {
          return <Namespace.Bar />;
        }
      `,
    },
    // Boundary: a namespace produced by a call is opaque — the property value cannot be resolved, so the usage is not flagged.
    {
      code: tsx`
        function Parent() {
          const Namespace = createNamespace();
          return <Namespace.Bar />;
        }
      `,
    },
    // Boundary: a member tag whose root binding cannot be resolved is skipped.
    {
      code: tsx`
        function Parent() {
          return <Namespace.Bar />;
        }
      `,
    },
    // Boundary: a member tag rooted at `this` resolves to no variable binding and is skipped.
    {
      code: tsx`
        class Parent extends React.Component {
          render() {
            return <this.Foo />;
          }
        }
      `,
    },
    // Boundary: a component memoized by useMemo and held by a property stays the
    // memoized value — a stable external component is not created during render.
    {
      code: tsx`
        function Parent() {
          const Ns = { Bar: useMemo(() => ExternalComponent, []) };
          return <Ns.Bar />;
        }
      `,
    },
    // Boundary: scope resolution picks the nearest binding for a member tag's root.
    // The inner static namespace shadows the dynamic module-scope one, so the usage is not flagged.
    {
      code: tsx`
        const ExternalComponent = () => <div />;

        function Parent() {
          const Ns = { Bar: ExternalComponent };
          return <Ns.Bar />;
        }
      `,
    },
    // Boundary: a class used as a namespace is not descended into — its static
    // properties are not traced, so the inline component is missed. A confirmed
    // conservative limitation; class namespaces are rare in modern code.
    {
      code: tsx`
        function Parent() {
          class Ns {
            static Bar = () => <div />;
          }
          return <Ns.Bar />;
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
    // Boundary: both branches of the ternary resolve to static/external references, so the assembled component is not considered dynamic.
    {
      code: tsx`
        function Parent({ type }) {
          const Component = type === "button" ? StaticButton : StaticText;
          return <Component />;
        }
      `,
    },
    // Boundary: mutual reassignment between two variables must not cause infinite recursion; the cycle-detection guard should terminate and treat it as static.
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
    // recognized as a function-component boundary (its name is not a component name), and the
    // nested Message definition is traced
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
    // A destructuring write `[C] = [...]` is not recognized, so the dynamic value flowing through it is missed.
    {
      code: tsx`
        function Parent() {
          let C = DefaultComponent;
          [C] = [createComponent()];
          return <C />;
        }
      `,
    },
    // https://github.com/Rel1cx/eslint-react/issues/1762
    // An external component returned from useMemo is still that component. The hook call itself is not a new component type.
    {
      code: tsx`
        function Component() {
          const Memoized = useMemo(() => Message, []);
          return <Memoized />;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const Memoized = useMemo(() => {
            return Message;
          }, []);
          return <Memoized />;
        }
      `,
    },
    {
      code: tsx`
        function Component(props) {
          const Memoized = React.useMemo(() => Message, [props.id]);
          return <Memoized />;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const Memoized = useCallback(Message, []);
          return <Memoized />;
        }
      `,
    },
    // Context variable reassigned via useMemo then used as JSX tag (from React Compiler fixtures).
    // The memoized value is the existing external component, so the reassignment is static.
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
    },
  ],
});
