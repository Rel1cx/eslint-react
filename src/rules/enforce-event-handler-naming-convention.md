# enforce-event-handler-naming-convention

Enforce consistent event handler naming conventions in JSX.

## Rule Details

Examples of **incorrect** code for this rule:

```tsx
<Component handleChange={this.handleChange} />;
```

```tsx
<Component onChange={this.componentChanged} />;
```

Examples of **correct** code for this rule:

```tsx
<Component onChange={this.handleChange} />;
```

```tsx
<Component onChange={this.props.onFoo} />;
```

## Rule Options

- `eventHandlerPrefix`: Prefix for component methods used as event handlers. Defaults to `handle`
- `eventHandlerPropPrefix`: Prefix for props that are used as event handlers. Defaults to `on`
- `checkLocalVariables`: Determines whether event handlers stored as local variables are checked. Defaults to `false`
- `checkInlineFunction`: Determines whether event handlers set as inline functions are checked. Defaults to `false`

### Type Signature

```ts
type Options = {
    eventHandlerPrefix?: string | false;
    eventHandlerPropPrefix?: string | false;
    checkLocalVariables?: boolean;
    checkInlineFunction?: boolean;
  },
```

### Default Option

```json
"react-ts/enforce-event-handler-naming-convention": ["error", {
  "eventHandlerPrefix": "handle",
  "eventHandlerPropPrefix": "on",
  "checkLocalVariables": false,
  "checkInlineFunction": false
}]
```

## When Not To Use It

If you are not using JSX, or if you don't want to enforce specific naming conventions for event handlers.
