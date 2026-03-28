// Test: no-multi-comp - should report error for multiple components in one file
// Expected error: "Declare only one component per file. Found extra component "SecondComponent"."

const FirstComponent = () => {
  return <div>First</div>;
};

// This should trigger an error due to no-multi-comp rule
const SecondComponent = () => {
  return <div>Second</div>;
};

export { FirstComponent, SecondComponent };
