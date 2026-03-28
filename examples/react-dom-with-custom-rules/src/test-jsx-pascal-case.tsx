// Test: jsx-pascal-case - should report errors for non-PascalCase component names
// Expected errors:
// - "Component name "MY_COMPONENT" should use PascalCase, not all uppercase."
// - "Component name "_PrivateComponent" should not start with an underscore."
// - "Component name "myComponent" should be in PascalCase."

const MY_COMPONENT = () => {
  return <div>All caps</div>;
};

const _PrivateComponent = () => {
  return <div>Leading underscore</div>;
};

const myComponent = () => {
  return <div>Not PascalCase</div>;
};

const TestJsxPascalCase = () => {
  return (
    <div>
      {/* eslint-disable-next-line @eslint-react/kit/jsx-pascal-case */}
      <MY_COMPONENT />
      {/* eslint-disable-next-line @eslint-react/kit/jsx-pascal-case */}
      <_PrivateComponent />
      {/* eslint-disable-next-line @eslint-react/kit/jsx-pascal-case */}
      <myComponent />
    </div>
  );
};

export default TestJsxPascalCase;
