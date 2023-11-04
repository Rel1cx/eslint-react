# jsx/enforce-component-name-pascal-case

<!-- end auto-generated rule header -->

## Rule Details

Enforces coding style that user-defined JSX components are defined and referenced in PascalCase.

Note that since React's JSX uses the upper vs. lower case convention to distinguish between local component classes and HTML tags this rule will not warn on components that start with a lower case letter.

### ❌ Incorrect

Examples of **incorrect** code for this rule:

```jsx
<Test_component />;
```

```jsx
<TEST_COMPONENT />;
```

### ✅ Correct

```jsx
<div />;
```

```jsx
<TestComponent />;
```

```jsx
<TestComponent>
  <div />
</TestComponent>;
```

```jsx
<CSSTransitionGroup />;
```
