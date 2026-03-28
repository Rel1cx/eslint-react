// Test: function-component-definition - should report error for non-arrow function components
// Expected error: "Function components must be defined with arrow functions."

// This should trigger an error - function declaration instead of arrow function
function TestFunctionComponentDefinition() {
  return <div>Not an arrow function</div>;
}

export default TestFunctionComponentDefinition;
