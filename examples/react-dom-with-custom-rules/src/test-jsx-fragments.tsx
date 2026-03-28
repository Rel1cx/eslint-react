// Test: jsx-fragments - should report error for React.Fragment
// Expected error: "Use shorthand fragment syntax '<>...</>' instead of '<React.Fragment>...</React.Fragment>'."

const TestJsxFragments = () => {
  return (
    // eslint-disable-next-line @eslint-react/kit/jsx-fragments
    <React.Fragment>
      <div>Content</div>
    </React.Fragment>
  );
};

export default TestJsxFragments;
