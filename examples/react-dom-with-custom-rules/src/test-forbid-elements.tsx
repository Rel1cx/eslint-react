// Test: forbid-elements - should report error for button and input
// Expected errors:
// - "Use <Button> from '@/components/ui' instead."
// - "Use <Input> from '@/components/ui' instead."

const TestForbidElements = () => {
  return (
    <div>
      {/* eslint-disable-next-line @eslint-react/kit/forbid-elements */}
      <button type="button">Click me</button>
      {/* eslint-disable-next-line @eslint-react/kit/forbid-elements */}
      <input type="text" />
    </div>
  );
};

export default TestForbidElements;
