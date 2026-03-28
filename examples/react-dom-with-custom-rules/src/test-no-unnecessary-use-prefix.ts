// Test: no-unnecessary-use-prefix - should report error for hooks that don't call other hooks
// Expected error: "Custom hook "useNonHook" doesn't call any hooks..."

// This is a valid hook - it calls another hook
const useValidHook = () => {
  const [state, setState] = useState(0);
  return { state, setState };
};

// This should trigger an error - hook that doesn't call any hooks
const useNonHook = () => {
  return { value: 42 };
};

// Import useState to make the valid hook work
import { useState } from "react";

export { useNonHook, useValidHook };
