import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./no-unstable-default-props";

const MESSAGE_ID = "default";

const expectedViolations = [
  {
    messageId: MESSAGE_ID,
    data: {
      kind: "object expression",
      propName: "a",
    },
  },
  {
    messageId: MESSAGE_ID,
    data: {
      kind: "array expression",
      propName: "b",
    },
  },
  {
    messageId: MESSAGE_ID,
    data: {
      kind: "RegExp literal",
      propName: "c",
    },
  },
  {
    messageId: MESSAGE_ID,
    data: {
      kind: "arrow function expression",
      propName: "d",
    },
  },
  {
    messageId: MESSAGE_ID,
    data: {
      kind: "function expression",
      propName: "e",
    },
  },
  {
    messageId: MESSAGE_ID,
    data: {
      kind: "class expression",
      propName: "f",
    },
  },
  {
    messageId: MESSAGE_ID,
    data: {
      kind: "new expression",
      propName: "g",
    },
  },
  {
    messageId: MESSAGE_ID,
    data: {
      kind: "JSX element",
      propName: "h",
    },
  },
  {
    messageId: MESSAGE_ID,
    data: {
      kind: "call expression",
      propName: "i",
    },
  },
  {
    messageId: MESSAGE_ID,
    data: {
      kind: "call expression",
      propName: "j",
    },
  },
] as const;

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        function App({ foo = [], ...rest }) {
            return null
        }
      `,
      errors: [{
        messageId: MESSAGE_ID,
        data: {
          kind: "array expression",
          propName: "foo",
        },
      }],
    },
    {
      code: tsx`
        function MyComponent({ position = new Vector3(0, 0, 0) }) {
          return null
        }
      `,
      errors: [{
        messageId: MESSAGE_ID,
        data: {
          kind: "new expression",
          propName: "position",
        },
      }],
    },
    {
      code: tsx`
        function App({ foo = {}, ...rest }) {
            return null
        }
      `,
      errors: [{
        messageId: MESSAGE_ID,
        data: {
          kind: "object expression",
          propName: "foo",
        },
      }],
    },
    {
      code: tsx`
        function App(props) {
            const { foo = [] } = props
            return null
        }
      `,
      errors: [{
        messageId: MESSAGE_ID,
        data: {
          kind: "array expression",
          propName: "foo",
        },
      }],
    },
    {
      code: tsx`
        function App({
            a = {},
            b = ['one', 'two'],
            c = /regex/i,
            d = () => {},
            e = function() {},
            f = class {},
            g = new Thing(),
            h = <Thing />,
            i = Symbol('foo'),
            j = unknownFunction(),
            k = window.name
        }) {
            return null
        }
      `,
      errors: expectedViolations,
    },
    {
      code: tsx`
        const App = ({
            a = {},
            b = ['one', 'two'],
            c = /regex/i,
            d = () => {},
            e = function() {},
            f = class {},
            g = new Thing(),
            h = <Thing />,
            i = Symbol('foo'),
            j = unknownFunction(),
            k = window.name
        }) => {
            return null
        }
      `,
      errors: expectedViolations,
    },
    {
      code: tsx`
        function MyComponent({ position = new CustomClass() }) {
          return null
        }
      `,
      errors: [{
        messageId: MESSAGE_ID,
        data: {
          kind: "new expression",
          propName: "position",
        },
      }],
      options: [{ safeDefaultProps: ["Vector3"] }],
    },
    {
      code: tsx`
        function MyComponent({
          obj = {},
          items = [],
        }) {
          return null
        }
      `,
      errors: [{
        messageId: MESSAGE_ID,
        data: {
          kind: "object expression",
          propName: "obj",
        },
      }, {
        messageId: MESSAGE_ID,
        data: {
          kind: "array expression",
          propName: "items",
        },
      }],
      options: [{ safeDefaultProps: ["Vector3"] }],
    },
  ],
  valid: [
    {
      code: tsx`
        "use memo";
        const App = ({
            a = {},
            b = ['one', 'two'],
            c = /regex/i,
            d = () => {},
            e = function() {},
            f = class {},
            g = new Thing(),
            h = <Thing />,
            i = Symbol('foo'),
            j = unknownFunction(),
            k = window.name
        }) => {
            return null
        }
      `,
      settings: {
        "react-x": {
          compilationMode: "annotation",
        },
      },
    },
    {
      code: tsx`
        function MyComponent({ position = new Vector3(0, 0, 0) }) {
          return null
        }
      `,
      options: [{ safeDefaultProps: ["Vector3"] }],
    },
    {
      code: tsx`
        function MyComponent({
          position = vector.create(0, 0, 0),
          data = ImmutableMap.of(),
          standard = 5,
        }) {
          return null
        }
      `,
      options: [{ safeDefaultProps: ["vector", "/^Immutable.*/"] }],
    },
    tsx`
      const emptyFunction = () => {}

      function App({ foo = emptyFunction }) {
          return null
      }
    `,
    tsx`
      const emptyFunction = () => {}

      function App({ foo = emptyFunction, ...rest }) {
          return null
      }
    `,
    tsx`
        function App({ foo = 1, baz = 'hello' }) {
          return null
      }
    `,
    tsx`
        function App(props) {
          return null
      }
    `,
    tsx`
        function App(props) {
            return null
        }
        App.defaultProps = {
          foo: () => {}
      }
    `,
    tsx`
        const App = () => {
          return null
      }
    `,
    tsx`
      const App = ({ foo = 1 }) => {
          return null
      }
    `,
    tsx`
      const emptyArray = [];
      function Component(props) {
        const { items = emptyArray } = props;

        return <div>{items}</div>;
      }
    `,
    tsx`
      export default function NonComponent({ foo = {} }) {}
    `,
    tsx`
      export function DrawerItem(props: Props) {
        const { colors, fonts } = useTheme();

        const {
          href,
          icon,
          label,
          labelStyle,
          focused = false,
          allowFontScaling,
          activeTintColor = colors.primary,
          inactiveBackgroundColor = 'transparent',
          style,
          onPress,
          pressColor,
          pressOpacity = 1,
          testID,
          accessibilityLabel,
          ...rest
        } = props;

        const { borderRadius = 56 } = StyleSheet.flatten(style || {});
        const color = focused ? activeTintColor : inactiveTintColor;
        const backgroundColor = focused
          ? activeBackgroundColor
          : inactiveBackgroundColor;

        const iconNode = icon ? icon({ size: 24, focused, color }) : null;

        return (
          <View
            collapsable={false}
            {...rest}
            style={[styles.container, { borderRadius, backgroundColor }, style]}
          >
            <PlatformPressable
              testID={testID}
              onPress={onPress}
              accessibilityLabel={accessibilityLabel}
              accessibilityRole="button"
              accessibilityState={{ selected: focused }}
              pressColor={pressColor}
              pressOpacity={pressOpacity}
              hoverEffect={{ color }}
              href={href}
            >
              <View style={[styles.wrapper, { borderRadius }]}>
                {iconNode}
                <View style={[styles.label, { marginStart: iconNode ? 12 : 0 }]}>
                  {typeof label === 'string' ? (
                    <Text
                      numberOfLines={1}
                      allowFontScaling={allowFontScaling}
                      style={[styles.labelText, { color }, fonts.medium, labelStyle]}
                    >
                      {label}
                    </Text>
                  ) : (
                    label({ color, focused })
                  )}
                </View>
              </View>
            </PlatformPressable>
          </View>
        );
      }
    `,
  ],
});
