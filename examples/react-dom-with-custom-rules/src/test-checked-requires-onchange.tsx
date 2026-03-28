// Test: checked-requires-onchange-or-readonly - should report error for input without onChange/readOnly
// Expected error: "`checked` requires `onChange` or `readOnly`."

const TestCheckedRequiresOnchange = () => {
  return (
    <div>
      {/* eslint-disable-next-line @eslint-react/kit/checked-requires-onchange-or-readonly */}
      <input type="checkbox" checked />
    </div>
  );
};

export default TestCheckedRequiresOnchange;
