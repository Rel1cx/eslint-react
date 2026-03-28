// Test: jsx-boolean-value - should report error for disabled={true}
// Expected error: "Omit the value for boolean attributes."

const TestJsxBooleanValue = () => {
  return (
    <div>
      {/* eslint-disable-next-line @eslint-react/kit/jsx-boolean-value */}
      <input type="text" disabled={true} />
    </div>
  );
};

export default TestJsxBooleanValue;
