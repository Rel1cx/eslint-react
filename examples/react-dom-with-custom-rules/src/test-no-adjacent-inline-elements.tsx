// Test: no-adjacent-inline-elements - should report error for adjacent inline elements
// Expected error: "Adjacent inline elements "span" and "strong" should be separated by whitespace."

const TestNoAdjacentInlineElements = () => {
  return (
    <div>
      {/* eslint-disable-next-line @eslint-react/kit/no-adjacent-inline-elements */}
      <span>Span content</span>
      {/* eslint-disable-next-line @eslint-react/kit/no-adjacent-inline-elements */}
      <strong>Strong content</strong>
    </div>
  );
};

export default TestNoAdjacentInlineElements;
