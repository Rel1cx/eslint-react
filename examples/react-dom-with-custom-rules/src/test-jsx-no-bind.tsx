// Test: jsx-no-bind - should report errors for inline functions and .bind()
// Expected errors:
// - "JSX props should not use inline functions."
// - "JSX props should not use .bind()."

const TestJsxNoBind = () => {
  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <div>
      {/* eslint-disable-next-line @eslint-react/kit/jsx-no-bind */}
      <button type="button" onClick={() => handleClick()}>
        Inline arrow function
      </button>
      {/* eslint-disable-next-line @eslint-react/kit/jsx-no-bind */}
      <button type="button" onClick={handleClick.bind(null)}>
        Bind usage
      </button>
    </div>
  );
};

export default TestJsxNoBind;
