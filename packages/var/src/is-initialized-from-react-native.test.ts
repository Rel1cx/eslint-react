import { findIdentifierReferences, runInRule } from "@local/testkit";
import { describe, expect, it } from "vitest";

import { isInitializedFromReactNative } from "./is-initialized-from-react-native";

function isInitialized(code: string, name: string, importSource?: string) {
  return runInRule(code, (context, ast) => {
    const ref = findIdentifierReferences(ast, name).at(0);
    const scope = context.sourceCode.getScope(ref ?? ast);
    return isInitializedFromReactNative(name, scope, importSource);
  });
}

describe("isInitializedFromReactNative", () => {
  describe("imports", () => {
    it("should return true for a named import from 'react-native'", () => {
      expect(isInitialized('import { View } from "react-native"; View();', "View")).toBe(true);
    });

    it("should match subpaths of 'react-native'", () => {
      const code = 'import { View } from "react-native/Libraries/Components/View/View"; View();';
      expect(isInitialized(code, "View")).toBe(true);
    });

    it("should match 'react-native-web' by prefix", () => {
      // Prefix matching is intentional: react-native-web is treated as part of
      // the React Native family.
      expect(isInitialized('import { View } from "react-native-web"; View();', "View")).toBe(true);
    });

    it("should return true for a require call", () => {
      expect(isInitialized('const RN = require("react-native"); RN;', "RN")).toBe(true);
    });

    it("should follow an alias chain to the React Native import", () => {
      const code = 'import { View } from "react-native"; const V = View; V();';
      expect(isInitialized(code, "V")).toBe(true);
    });

    it("should use a custom import source", () => {
      const code = 'import { View } from "react-native-web"; View();';
      expect(isInitialized(code, "View", "react-native-web")).toBe(true);
    });

    it("should return false for imports from another source", () => {
      expect(isInitialized('import { View } from "react"; View();', "View")).toBe(false);
    });

    it("should return false for an unknown variable", () => {
      expect(isInitialized("const x = 1;", "nonexistent")).toBe(false);
    });
  });

  describe("name heuristic", () => {
    it("should return true for the known React Native local names", () => {
      expect(isInitialized("const x = 1;", "react_native")).toBe(true);
      expect(isInitialized("const x = 1;", "ReactNative")).toBe(true);
      expect(isInitialized("const x = 1;", "RN")).toBe(true);
    });

    it("should not treat 'react' as React Native", () => {
      expect(isInitialized("const x = 1;", "React")).toBe(false);
    });
  });
});
