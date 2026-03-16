import { useEffect, useState } from "react";

// ============================================
// Test: function-component-definition
// Should report: Function components must be defined with arrow functions
// ============================================

// ❌ Should report - Function declaration
function FunctionDeclarationComponent() {
  return <div>Function declaration</div>;
}

// ❌ Should report - Function expression
const FunctionExpressionComponent = function NamedFunction() {
  return <div>Function expression</div>;
};

// ✅ Correct - Arrow function
const ArrowFunctionComponent = () => {
  return <div>Arrow function</div>;
};

// ============================================
// Test: no-console-in-render
// Should report: Unexpected console statement in render
// ============================================

// ❌ Should report - console.log in render
const ConsoleInRender = () => {
  console.log("This is in render");
  return <div>Console in render</div>;
};

// ❌ Should report - console.count in render
const ConsoleCountInRender = () => {
  console.count("render count");
  return <div>Console count in render</div>;
};

// ❌ Should report - console in callback defined in render (still render phase)
const ConsoleInCallbackInRender = () => {
  const handler = () => {
    console.log("In callback defined in render");
  };
  void handler;
  return <div>Console in callback</div>;
};

// ✅ Correct - console in useEffect (outside render)
const ConsoleInEffect = () => {
  useEffect(() => {
    console.log("This is in effect");
  }, []);
  return <div>Console in effect</div>;
};

// ============================================
// Test: no-inline-styles
// Should report: Inline styles are not allowed
// ============================================

// ❌ Should report - Inline style object
const InlineStyleComponent = () => {
  return <div style={{ backgroundColor: "blue", color: "white" }}>Inline styles</div>;
};

// ❌ Should report - Dynamic inline style
const DynamicStyleComponent = ({ color }: { color: string }) => {
  return <div style={{ backgroundColor: color }}>Dynamic style</div>;
};

// ✅ Correct - CSS class
const CssClassComponent = () => {
  return <div className="my-class">CSS class</div>;
};

// ============================================
// Test: prefer-custom-hook
// Should report: Use `useXxx` instead of direct xxx access
// ============================================

// ❌ Should report - localStorage.getItem in render
const LocalStorageAccess = () => {
  const theme = localStorage.getItem("theme");
  return <div>Theme: {theme}</div>;
};

// ❌ Should report - localStorage.setItem in callback (still in component)
const LocalStorageSetItem = () => {
  const handleClick = () => {
    localStorage.setItem("key", "value");
  };
  void handleClick;
  return <div>LocalStorage setItem</div>;
};

// ❌ Should report - window.addEventListener in effect
const WindowEventListener = () => {
  useEffect(() => {
    const handleResize = () => console.log(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return <div>Window size</div>;
};

// ✅ Correct - No direct browser API access
const UsingStateOnly = () => {
  const [count] = useState(0);
  return <div>{count}</div>;
};

// ============================================
// Main export component
// ============================================

const RuleTests = () => {
  return (
    <div>
      <h1>Custom Rule Tests</h1>
      <p>Run `npm run lint` to see rule violations</p>
    </div>
  );
};

// Prevent tree-shaking and fast-refresh warnings
void FunctionDeclarationComponent;
void FunctionExpressionComponent;
void ArrowFunctionComponent;
void ConsoleInRender;
void ConsoleCountInRender;
void ConsoleInCallbackInRender;
void ConsoleInEffect;
void InlineStyleComponent;
void DynamicStyleComponent;
void CssClassComponent;
void LocalStorageAccess;
void LocalStorageSetItem;
void WindowEventListener;
void UsingStateOnly;

export default RuleTests;
