// Test: jsx-max-depth (max: 4) - should report error for depth > 4
// Expected error: "JSX element exceeds maximum depth of 4 (found 5)."

const TestJsxMaxDepth = () => {
  return (
    <div>
      <div>
        <div>
          <div>
            <div>
              {/* Depth 5 - exceeds max of 4 */}
              {/* eslint-disable-next-line @eslint-react/kit/jsx-max-depth */}
              <span>Too deep!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestJsxMaxDepth;
