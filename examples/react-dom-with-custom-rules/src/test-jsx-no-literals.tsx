// Test: jsx-no-literals - should report error for unwrapped string literals
// Expected error: "String literals should be wrapped in JSX expression: {'Hello World'}"

const TestJsxNoLiterals = () => {
  return (
    <div>
      {/* eslint-disable-next-line @eslint-react/kit/jsx-no-literals */}
      <div>Hello World</div>
      {/* This is OK - wrapped in expression */}
      <div>{"Hello World"}</div>
    </div>
  );
};

export default TestJsxNoLiterals;
