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
      class ClassComputedTemplatePropertyTest extends React.Component {
        constructor() {
          this.state = {}
        }
        render() {
          return <div foo={this.state.foo} />;
        }
      }
    `,
    dedent`
      class ClassComputedTemplatePropertyTest extends React.Component {
        constructor() {
          function F() {
            this.state = {}
          }
        }
        render() {
          return null;
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
    dedent`
      function StatelessFnUnaffectedTest(props) {
        return <SomeComponent foo={props.foo} />;
      };
    `,
    dedent`
      class NoStateTest extends React.Component {
        render() {
          return <SomeComponent />;
        }
      }
    `,
    dedent`
      class CtorStateTest extends React.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          return <SomeComponent foo={this.state.foo} />;
        }
      }
    `,
    dedent`
      class ComputedKeyFromVariableTest extends React.Component {
        constructor() {
          this.state = { [foo]: 0 };
        }
        render() {
          return <SomeComponent foo={this.state[foo]} />;
        }
      }
    `,
    dedent`
      class ComputedKeyFromBooleanLiteralTest extends React.Component {
        constructor() {
          this.state = { [false]: 0 };
        }
        render() {
          return <SomeComponent foo={this.state['false']} />;
        }
      }
    `,
    dedent`
      class ComputedKeyFromNumberLiteralTest extends React.Component {
        constructor() {
          this.state = { [345]: 0 };
        }
        render() {
          return <SomeComponent foo={this.state[345]} />;
        }
      }
    `,
    dedent`
      class ComputedKeyFromExpressionTest extends React.Component {
        constructor() {
          this.state = { [foo + bar]: 0 };
        }
        render() {
          return <SomeComponent foo={this.state[foo + bar]} />;
        }
      }
    `,
    dedent`
      class ComputedKeyFromBinaryExpressionTest extends React.Component {
        constructor() {
          this.state = { [1 + 2 * 8]: 0 };
        }
        render() {
          return <SomeComponent foo={this.state[17]} />;
        }
      }
    `,
    dedent`
      class ComputedKeyFromStringLiteralTest extends React.Component {
        constructor() {
          this.state = { ['foo']: 0 };
        }
        render() {
          return <SomeComponent foo={this.state.foo} />;
        }
      }
    `,
    dedent`
      class ComputedKeyFromTemplateLiteralTest extends React.Component {
        constructor() {
          this.state = { [\`foo\${bar}\`]: 0 };
        }
        render() {
          return <SomeComponent foo={this.state.foo} />;
        }
      }
    `,
    dedent`
      class ComputedKeyFromTemplateLiteralTest extends React.Component {
        constructor() {
          this.state = { [\`foo\`]: 0 };
        }
        render() {
          return <SomeComponent foo={this.state.foo} />;
        }
      }
    `,
    dedent`
      class SetStateTest extends React.Component {
        onFooChange(newFoo) {
          this.setState({ foo: newFoo });
        }
        render() {
          return <SomeComponent foo={this.state.foo} />;
        }
      }
    `,
    dedent`
      class ClassPropertyStateTest extends React.Component {
        state = { foo: 0 };
        render() {
          return <SomeComponent foo={this.state.foo} />;
        }
      }
    `,
    dedent`
      class OptionalChaining extends React.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          return <SomeComponent foo={this.state?.foo} />;
        }
      }
    `,
    dedent`
      class VariableDeclarationTest extends React.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          const foo = this.state.foo;
          return <SomeComponent foo={foo} />;
        }
      }
    `,
    dedent`
      class DestructuringTest extends React.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          const {foo: myFoo} = this.state;
          return <SomeComponent foo={myFoo} />;
        }
      }
    `,
    dedent`
      class ShorthandDestructuringTest extends React.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          const {foo} = this.state;
          return <SomeComponent foo={foo} />;
        }
      }
    `,
    dedent`
      class AliasDeclarationTest extends React.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          const state = this.state;
          return <SomeComponent foo={state.foo} />;
        }
      }
    `,
    dedent`
      class AliasAssignmentTest extends React.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          let state;
          state = this.state;
          return <SomeComponent foo={state.foo} />;
        }
      }
    `,
    dedent`
      class DestructuringAliasTest extends React.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          const {state: myState} = this;
          return <SomeComponent foo={myState.foo} />;
        }
      }
    `,
    dedent`
      class ShorthandDestructuringAliasTest extends React.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          const {state} = this;
          return <SomeComponent foo={state.foo} />;
        }
      }
    `,
    dedent`
      class RestPropertyTest extends React.Component {
        constructor() {
          this.state = {
            foo: 0,
            bar: 1,
          };
        }
        render() {
          const {foo, ...others} = this.state;
          return <SomeComponent foo={foo} bar={others.bar} />;
        }
      }
    `,
    dedent`
      class DeepDestructuringTest extends React.Component {
        state = { foo: 0, bar: 0 };
        render() {
          const {state: {foo, ...others}} = this;
          return <SomeComponent foo={foo} bar={others.bar} />;
        }
      }
    `,
    // A cleverer analysis might recognize that the following should be errors,
    // but they're out of scope for this lint rule.
    dedent`
      class MethodArgFalseNegativeTest extends React.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        consumeFoo(foo) {}
        render() {
          this.consumeFoo(this.state.foo);
          return <SomeComponent />;
        }
      }
    `,
    dedent`
      class AssignedToObjectFalseNegativeTest extends React.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          const obj = { foo: this.state.foo, bar: 0 };
          return <SomeComponent bar={obj.bar} />;
        }
      }
    `,
    dedent`
      class ComputedAccessFalseNegativeTest extends React.Component {
        constructor() {
          this.state = { foo: 0, bar: 1 };
        }
        render() {
          const bar = 'bar';
          return <SomeComponent bar={this.state[bar]} />;
        }
      }
    `,
    dedent`
      class JsxSpreadFalseNegativeTest extends React.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          return <SomeComponent {...this.state} />;
        }
      }
    `,
    dedent`
      class AliasedJsxSpreadFalseNegativeTest extends React.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          const state = this.state;
          return <SomeComponent {...state} />;
        }
      }
    `,
    dedent`
      class ObjectSpreadFalseNegativeTest extends React.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          const attrs = { ...this.state, foo: 1 };
          return <SomeComponent foo={attrs.foo} />;
        }
      }
    `,
    dedent`
      class ShadowingFalseNegativeTest extends React.Component {
        constructor() {
          this.state = { foo: 0 };
        }
        render() {
          const state = this.state;
          let foo;
          {
            const state = { foo: 5 };
            foo = state.foo;
          }
          return <SomeComponent foo={foo} />;
        }
      }
    `,
    dedent`
      class NonRenderClassMethodFalseNegativeTest extends React.Component {
        constructor() {
          this.state = { foo: 0, bar: 0 };
        }
        doSomething() {
          const { foo } = this.state;
          return this.state.foo;
        }
        doSomethingElse() {
          const { state: { bar }} = this;
          return bar;
        }
        render() {
          return <SomeComponent />;
        }
      }
    `,
    dedent`
      class ArrowFunctionClassMethodDestructuringFalseNegativeTest extends React.Component {
        constructor() {
          this.state = { foo: 0 };
        }

        doSomething = () => {
          const { state: { foo } } = this;

          return foo;
        }

        render() {
          return <SomeComponent />;
        }
      }
    `,
    dedent`
      class ArrowFunctionClassMethodWithClassPropertyTransformFalseNegativeTest extends React.Component {
        state = { foo: 0 };

        doSomething = () => {
          const { state:{ foo } } = this;

          return foo;
        }

        render() {
          return <SomeComponent />;
        }
      }
    `,
    dedent`
      class ArrowFunctionClassMethodDeepDestructuringFalseNegativeTest extends React.Component {
        state = { foo: { bar: 0 } };

        doSomething = () => {
          const { state: { foo: { bar }}} = this;

          return bar;
        }

        render() {
          return <SomeComponent />;
        }
      }
    `,
    dedent`
      class ArrowFunctionClassMethodDestructuringAssignmentFalseNegativeTest extends React.Component {
        state = { foo: 0 };

        doSomething = () => {
          const { state: { foo: bar }} = this;

          return bar;
        }

        render() {
          return <SomeComponent />;
        }
      }
    `,
    dedent`
      class ThisStateAsAnObject extends React.Component {
        state = {
          active: true
        };

        render() {
          return <div className={classNames('overflowEdgeIndicator', className, this.state)} />;
        }
      }
    `,
    dedent`
      class GetDerivedStateFromPropsTest extends Component {
        constructor(props) {
          super(props);
          this.state = {
            id: 123,
          };
        }
        static getDerivedStateFromProps(nextProps, otherState) {
          if (otherState.id === nextProps.id) {
            return {
              selected: true,
            };
          }
          return null;
        }
        render() {
          return (
            <h1>{this.state.selected ? 'Selected' : 'Not selected'}</h1>
          );
        }
      }
    `,
    dedent`
      class ComponentDidUpdateTest extends Component {
        constructor(props) {
          super(props);
          this.state = {
            id: 123,
          };
        }

        componentDidUpdate(someProps, someState) {
          if (someState.id === someProps.id) {
            doStuff();
          }
        }
        render() {
          return (
            <h1>{this.state.selected ? 'Selected' : 'Not selected'}</h1>
          );
        }
      }
    `,
    dedent`
      class ShouldComponentUpdateTest extends Component {
        constructor(props) {
          super(props);
          this.state = {
            id: 123,
          };
        }
        shouldComponentUpdate(nextProps, nextState) {
          return nextState.id === nextProps.id;
        }
        render() {
          return (
            <h1>{this.state.selected ? 'Selected' : 'Not selected'}</h1>
          );
        }
      }
    `,
    dedent`
      class NestedScopesTest extends Component {
        constructor(props) {
          super(props);
          this.state = {
            id: 123,
          };
        }
        shouldComponentUpdate(nextProps, nextState) {
          return (function() {
            return nextState.id === nextProps.id;
          })();
        }
        render() {
          return (
            <h1>{this.state.selected ? 'Selected' : 'Not selected'}</h1>
          );
        }
      }
    `,
    dedent`
      class Foo extends Component {
        state = {
          initial: 'foo',
        }
        handleChange = () => {
          this.setState(state => ({
            current: state.initial
          }));
        }
        render() {
          const { current } = this.state;
          return <div>{current}</div>
        }
      }
    `,
    dedent`
      class Foo extends Component {
        constructor(props) {
          super(props);
          this.state = {
            initial: 'foo',
          }
        }
        handleChange = () => {
          this.setState(state => ({
            current: state.initial
          }));
        }
        render() {
          const { current } = this.state;
          return <div>{current}</div>
        }
      }
    `,
    dedent`
      class Foo extends Component {
        constructor(props) {
          super(props);
          this.state = {
            initial: 'foo',
          }
        }
        handleChange = () => {
          this.setState((state, props) => ({
            current: state.initial
          }));
        }
        render() {
          const { current } = this.state;
          return <div>{current}</div>
        }
      }
    `,
    `
        class SetStateDestructuringCallback extends Component {
          state = {
              used: 1, unused: 2
          }
          handleChange = () => {
            this.setState(({unused}) => ({
              used: unused * unused,
            }));
          }
          render() {
            return <div>{this.state.used}</div>
          }
        }
      `,
    dedent`
      class SetStateCallbackStateCondition extends Component {
        state = {
            isUsed: true,
            foo: 'foo'
        }
        handleChange = () => {
          this.setState((prevState) => (prevState.isUsed ? {foo: 'bar', isUsed: false} : {}));
        }
        render() {
          return <SomeComponent foo={this.state.foo} />;
        }
      }
    `,
    dedent`
      class Foo extends Component {
        handleChange = function() {
          this.setState(() => ({ foo: value }));
        }
        render() {
          return <SomeComponent foo={this.state.foo} />;
        }
      }
    `,
    dedent`
      class Foo extends Component {
        handleChange = function() {
          this.setState(state => ({ foo: value }));
        }
        render() {
          return <SomeComponent foo={this.state.foo} />;
        }
      }
    `,
    dedent`
      class Foo extends Component {
        static handleChange = () => {
          this.setState(state => ({ foo: value }));
        }
        render() {
          return <SomeComponent foo={this.state.foo} />;
        }
      }
    `,
    dedent`
      class Foo extends Component {
        state = {
          thisStateAliasProp,
          thisStateAliasRestProp,
          thisDestructStateAliasProp,
          thisDestructStateAliasRestProp,
          thisDestructStateDestructRestProp,
          thisSetStateProp,
          thisSetStateRestProp,
        } as unknown

        constructor() {
          // other methods of defining state props
          ((this as unknown).state as unknown) = { thisStateProp } as unknown;
          ((this as unknown).setState as unknown)({ thisStateDestructProp } as unknown);
          ((this as unknown).setState as unknown)(state => ({ thisDestructStateDestructProp } as unknown));
        }

        thisStateAlias() {
          const state = (this as unknown).state as unknown;

          (state as unknown).thisStateAliasProp as unknown;
          const { ...thisStateAliasRest } = state as unknown;
          (thisStateAliasRest as unknown).thisStateAliasRestProp as unknown;
        }

        thisDestructStateAlias() {
          const { state } = this as unknown;

          (state as unknown).thisDestructStateAliasProp as unknown;
          const { ...thisDestructStateAliasRest } = state as unknown;
          (thisDestructStateAliasRest as unknown).thisDestructStateAliasRestProp as unknown;
        }

        thisSetState() {
          ((this as unknown).setState as unknown)(state => (state as unknown).thisSetStateProp as unknown);
          ((this as unknown).setState as unknown)(({ ...thisSetStateRest }) => (thisSetStateRest as unknown).thisSetStateRestProp as unknown);
        }

        render() {
          ((this as unknown).state as unknown).thisStateProp as unknown;
          const { thisStateDestructProp } = (this as unknown).state as unknown;
          const { state: { thisDestructStateDestructProp, ...thisDestructStateDestructRest } } = this as unknown;
          (thisDestructStateDestructRest as unknown).thisDestructStateDestructRestProp as unknown;

          return null;
        }
      }
    `,
    dedent`
      interface Props {}

      interface State {
        flag: boolean;
      }

      export default class RuleTest extends React.Component<Props, State> {
        readonly state: State = {
          flag: false,
        };

        static getDerivedStateFromProps = (props: Props, state: State) => {
          const newState: Partial<State> = {};
          if (!state.flag) {
            newState.flag = true;
          }
          return newState;
        };
      }
    `,
    dedent`
      class Foo extends React.Component {
        onCancel = (data) => {
          console.log('Cancelled', data)
          this.setState({ status: 'Cancelled. Try again?' })
        }
        render() {
          const { status } = this.state;
          return <div>{status}</div>
        }
      }
    `,
    dedent`
      class KarmaRefundPillComponent extends GenericPillComponent {
        renderContent = () => {
          const { action } = this.props

          return (
            <Box fontSize={[1]} mx={[2]} minWidth="10px" minHeight="26px" alignItems="center">
              <FormattedText
                fields={getKarmaClaimLevel1Fields(action)}
                i18nKey="pillTemplates.karmarefund.summary"
                fontSize={[1]}
              />
            </Box>
          )
        }
      }
    `,
    dedent`
      class AutoControlledComponent<P = {}, S = {}> extends UIComponent<P, S> {
        static getDerivedStateFromProps: React.GetDerivedStateFromProps<any, any>
      }
    `,
    {
      code: dedent`
        export const commonMixinWrapper = ComposeComponent => class extends ComposeComponent {
          static getDerivedStateFromProps = ComposeComponent.getDerivedStateFromProps;
          render() { return <div />; }
        }
      `,
      parserOptions: {
        sourceType: "module",
      },
    },
    {
      code: dedent`
        import React, { PureComponent } from 'react';

        class TestNoUnusedState extends React.Component {
          constructor(props) {
            super(props);
            this.state = {
              id: null,
            };
          }

          static getDerivedStateFromProps = (props, state) => {
            if (state.id !== props.id) {
              return {
                id: props.id,
              };
            }

            return null;
          };

          render() {
            return <h1>{this.state.id}</h1>;
          }
        }

        export default TestNoUnusedState;
      `,
      parserOptions: {
        sourceType: "module",
      },
    },
    dedent`
      class Component extends React.Component {
        static getDerivedStateFromProps = ({value, disableAnimation}: ToggleProps, {isControlled, isOn}: ToggleState) => {
          return { isControlled, isOn };
        };

        render() {
          const { isControlled, isOn } = this.state;
          return <div>{isControlled ? 'controlled' : ''}{isOn ? 'on' : ''}</div>;
        }
      }
    `,
  ],
  invalid: [
    {
      code: dedent`
        class ClassComputedTemplatePropertyTest extends React.Component {
          constructor() {
            this.state = {}
          }
          render() {
            return null;
          }
        }
      `,
      errors: [
        {
          messageId: "NO_UNUSED_STATE",
          data: { className: "ClassComputedTemplatePropertyTest" },
        },
      ],
    },
    {
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
