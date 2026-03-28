// Test: forbid-component-props - should report error for className/style on components
// Test: forbid-dom-props - should report error for style/className on DOM elements
// Expected errors:
// - "Prop "className" is forbidden on components."
// - "Prop "style" is forbidden on components."
// - "Prop "style" is forbidden on DOM elements."
// - "Prop "className" is forbidden on DOM elements."

const MyComponent = ({ className, style }: { className?: string; style?: React.CSSProperties }) => {
  return <div className={className} style={style}>Component</div>;
};

const TestForbidProps = () => {
  return (
    <div>
      {/* eslint-disable-next-line @eslint-react/kit/forbid-component-props */}
      <MyComponent className="test" />
      {/* eslint-disable-next-line @eslint-react/kit/forbid-component-props */}
      <MyComponent style={{ color: "red" }} />
      {/* eslint-disable-next-line @eslint-react/kit/forbid-dom-props */}
      <div style={{ color: "red" }}>DOM with style</div>
      {/* eslint-disable-next-line @eslint-react/kit/forbid-dom-props */}
      <div className="test">DOM with className</div>
    </div>
  );
};

export default TestForbidProps;
