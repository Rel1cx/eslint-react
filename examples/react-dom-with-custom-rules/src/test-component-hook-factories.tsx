// Test: component-hook-factories - should report error for defining component inside function
// Expected error: "Don't define Component "InnerComponent" inside a function..."

const TestComponentHookFactories = () => {
  // Defining a component inside another component is a factory pattern
  const InnerComponent = () => {
    return <div>Inner</div>;
  };

  return (
    <div>
      <InnerComponent />
    </div>
  );
};

export default TestComponentHookFactories;
