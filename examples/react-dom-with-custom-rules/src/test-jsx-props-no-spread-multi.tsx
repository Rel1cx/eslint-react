// Test: jsx-props-no-spread-multi - should report error for spreading same identifier multiple times
// Expected error: "Spreading the same expression "props" multiple times is not allowed."

interface Props {
  a: string;
  b: string;
}

const TestJsxPropsNoSpreadMulti = (props: Props) => {
  return (
    <div>
      {/* eslint-disable-next-line @eslint-react/kit/jsx-props-no-spread-multi */}
      <div {...props} {...props}>
        Spread same props twice
      </div>
    </div>
  );
};

export default TestJsxPropsNoSpreadMulti;
