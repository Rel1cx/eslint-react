// A set of React lifecycle methods that are implicitly used and should not be flagged as unused
export const LIFECYCLE_METHODS = new Set([
  "componentDidCatch",
  "componentDidMount",
  "componentDidUpdate",
  "componentWillMount",
  "componentWillReceiveProps",
  "componentWillUnmount",
  "componentWillUpdate",
  "constructor",
  "getSnapshotBeforeUpdate",
  "render",
  "shouldComponentUpdate",
  "state",
  "UNSAFE_componentWillMount",
  "UNSAFE_componentWillReceiveProps",
  "UNSAFE_componentWillUpdate",
]);

// A set of method names that host environments invoke through refs (e.g. React Native's `NativeMethods`
// interface) without any statically visible usage, so they should not be flagged as unused
export const HOST_CONVENTION_METHODS = new Set([
  "blur",
  "focus",
  "measure",
  "measureInWindow",
  "measureLayout",
  "setNativeProps",
]);
