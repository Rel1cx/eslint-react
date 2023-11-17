// Source: https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactWorkTags.js
// Commented out types are runtime only WorkTags that are not needed for static analysis purposes

export type ESLRComponentType =
  | 0
  | 1
  // | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  // | 15
  | 16
  // | 17
  | 18
  | 19
  | 20;
// | 21
// | 22
// | 23
// | 24
// | 25
// | 26
// | 27

export const ESLRFunctionComponent = 0;
export const ESLRClassComponent = 1;
// export const IndeterminateComponent = 2; // Before we know whether it is function or class
export const ESLRHostRoot = 3; // Root of a host tree. Could be nested inside another node.
export const ESLRHostPortal = 4; // A subtree. Could be an entry point to a different renderer.
export const ESLRHostComponent = 5;
export const ESLRHostText = 6;
export const ESLRFragment = 7;
export const ESLRMode = 8;
export const ESLRContextConsumer = 9;
export const ESLRContextProvider = 10;
export const ESLRForwardRef = 11;
export const ESLRProfiler = 12;
export const ESLRSuspenseComponent = 13;
export const ESLRMemoComponent = 14;
// export const SimpleMemoComponent = 15;
export const ESLRLazyComponent = 16;
// export const IncompleteClassComponent = 17;
export const ESLRDehydratedFragment = 18;
export const ESLRSuspenseListComponent = 19;
// export const ScopeComponent = 21;
// export const OffscreenComponent = 22;
// export const LegacyHiddenComponent = 23;
// export const CacheComponent = 24;
// export const TracingMarkerComponent = 25;
// export const HostHoistable = 26;
// export const HostSingleton = 27;

export type ESLRHostComponentType = 0 | 1 | 2;

export const ESLRHostHTMLComponent = 0;

export const ESLRHostSVGComponent = 1;

export const ESLRHostWebComponent = 2;
