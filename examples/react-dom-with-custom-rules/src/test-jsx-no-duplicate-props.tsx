// Test: jsx-no-duplicate-props - should report error for duplicate props
// Expected error: "Duplicate prop "className" found."

const TestJsxNoDuplicateProps = () => {
  return (
    <div>
      {/* eslint-disable-next-line @eslint-react/kit/jsx-no-duplicate-props */}
      <div className="first" className="second">
        Duplicate props
      </div>
    </div>
  );
};

export default TestJsxNoDuplicateProps;
