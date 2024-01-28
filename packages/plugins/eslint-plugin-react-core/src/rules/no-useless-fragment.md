# no-useless-fragment

## Rule category

Correctness.

## What it does

Prevents the use of useless `fragment` components or `<>` syntax.

## Why is this bad?

A fragment is redundant if it contains only one child, or if it is the child of a html element, and is not a [keyed fragment](https://react.dev/reference/react/Fragment#caveats).

And, it adds unnecessary visual noise to the code.

## Examples

### Failing

```tsx
<>{foo}</>

<><Foo /></>

<p><>foo</></p>

<></>

<Fragment>foo</Fragment>

<React.Fragment>foo</React.Fragment>

<section>
  <>
    <div />
    <div />
  </>
</section>

{showFullName ? <>{fullName}</> : <>{firstName}</>}
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

const cat = <>meow</>

<SomeComponent>
  <>
    <div />
    <div />
  </>
</SomeComponent>

<Fragment key={item.id}>{item.value}</Fragment>

{showFullName ? fullName : firstName}
```
