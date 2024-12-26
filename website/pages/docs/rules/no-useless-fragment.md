# no-useless-fragment

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-useless-fragment
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-useless-fragment
```

**Labels**

`JSX` `Fragments`

**Features**

`🔍` `⚙️`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Prevents the use of useless fragments.

A fragment is redundant if it contains only one child, or if it is the child of a html element, and is not a [keyed fragment](https://react.dev/reference/react/Fragment#caveats).

Moreoever, rendering fragments with multiple levels of depth can cause React to not retain the state of components nested within the fragment after [certain re-renders](https://gist.github.com/clemmy/b3ef00f9507909429d8aa0d3ee4f986b), which may lead to unexpected [state resetting](https://react.dev/learn/preserving-and-resetting-state).

## Examples

### Failing

```tsx
<><Foo /></>

<p><>foo</></p>

<></>

<section>
  <>
    <div />
    <div />
  </>
</section>
```

### Passing

```tsx
{foo}

<Foo />

<>
  <Foo />
  <Bar />
</>

<>foo {bar}</>

<> {foo}</>

<>{children}</>

<>{props.children}</>

const cat = <>meow</>

<SomeComponent>
  <>
    <div />
    <div />
  </>
</SomeComponent>

<Fragment key={item.id}>{item.value}</Fragment>
```

## Note

[By default, this rule always allows single expressions in a fragment](https://github.com/rEl1cx/eslint-react/pull/188). This is useful in
places like Typescript where `string` does not satisfy the expected return type
of `JSX.Element`. A common workaround is to wrap the variable holding a string
in a fragment and expression. To change this behaviour, use the `allowExpressions` option.

### Examples of correct code for single expressions in fragments:

```tsx
<>{foo}</>

<Fragment>{foo}</Fragment>
```

## Examples with `allowExpressions: false`

### Failing

```tsx
<><Foo /></>

<p><>foo</></p>

<></>

<Foo bar={<>baz</>} />

<section>
  <>
    <div />
    <div />
  </>
</section>

const cat = <>meow</>

<>{children}</>

<>{props.children}</>

<> {foo}</>

<SomeComponent>
  <>
    <div />
    <div />
  </>
</SomeComponent>
```

### Passing

```tsx
{foo}

<Foo />

<>
  <Foo />
  <Bar />
</>

<>foo {bar}</>

<Fragment key={item.id}>{item.value}</Fragment>
```

## Implementation

- [Rule source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-useless-fragment.ts)
- [Test source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-useless-fragment.spec.ts)

## Further Reading

- [React: Fragment](https://react.dev/reference/react/Fragment)
- [React: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
- [clemmy/react_state_preservation_behavior](https://gist.github.com/clemmy/b3ef00f9507909429d8aa0d3ee4f986b)
