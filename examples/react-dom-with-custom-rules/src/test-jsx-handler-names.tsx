// Test: jsx-handler-names - should report error for wrong handler naming
// Expected error: "Handler function "clickHandler" should be named "handleClick...""

const TestJsxHandlerNames = () => {
  const clickHandler = () => {
    console.log("clicked");
  };

  return (
    <div>
      {/* eslint-disable-next-line @eslint-react/kit/jsx-handler-names */}
      <button type="button" onClick={clickHandler}>
        Click me
      </button>
    </div>
  );
};

export default TestJsxHandlerNames;
