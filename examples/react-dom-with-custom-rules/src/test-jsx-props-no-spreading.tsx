// Test: jsx-props-no-spreading - should report error for props spreading
// Expected error: "Props spreading is not allowed."

interface Props {
  className: string;
  children: React.ReactNode;
}

const TestJsxPropsNoSpreading = (props: Props) => {
  return (
    <div>
      {/* eslint-disable-next-line @eslint-react/kit/jsx-props-no-spreading */}
      <div {...props}>Props spreading</div>
    </div>
  );
};

export default TestJsxPropsNoSpreading;
