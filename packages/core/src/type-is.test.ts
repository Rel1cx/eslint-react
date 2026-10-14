import ts from "typescript";
import { describe, expect, it } from "vitest";

import {
  isAnyType,
  isBigIntType,
  isBooleanLiteralType,
  isBooleanType,
  isEnumType,
  isFalseLiteralType,
  isFalsyBigIntType,
  isFalsyNumberType,
  isFalsyStringType,
  isNeverType,
  isNullishType,
  isNumberType,
  isObjectType,
  isStringType,
  isTrueLiteralType,
  isTruthyBigIntType,
  isTruthyNumberType,
  isTruthyStringType,
  isUnknownType,
} from "./type-is";

const FILE_NAME = "file.ts";

function createCheckerFor(code: string) {
  const options: ts.CompilerOptions = {
    strict: true,
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
  };
  const sourceFile = ts.createSourceFile(FILE_NAME, code, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TS);
  const defaultHost = ts.createCompilerHost(options);
  const host: ts.CompilerHost = {
    ...defaultHost,
    getSourceFile: (name, languageVersion, onError, shouldCreateNewSourceFile) =>
      name === FILE_NAME
        ? sourceFile
        : defaultHost.getSourceFile(name, languageVersion, onError, shouldCreateNewSourceFile),
    fileExists: (name) => name === FILE_NAME || defaultHost.fileExists(name),
    readFile: (name) => name === FILE_NAME ? code : defaultHost.readFile(name),
  };
  const program = ts.createProgram([FILE_NAME], options, host);
  return { checker: program.getTypeChecker(), sourceFile };
}

function getTypeOfDeclaredValue(code: string, name: string): ts.Type {
  const { checker, sourceFile } = createCheckerFor(code);
  let declaration: ts.Node | undefined;
  const visit = (node: ts.Node): void => {
    if (
      (ts.isVariableDeclaration(node) || ts.isParameter(node))
      && ts.isIdentifier(node.name)
      && node.name.text === name
    ) {
      declaration = node.name;
    }
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(sourceFile, visit);
  if (declaration == null) throw new Error(`No declaration named '${name}' found in: ${code}`);
  return checker.getTypeAtLocation(declaration);
}

describe("isBooleanLiteralType / isFalseLiteralType / isTrueLiteralType", () => {
  const code = `
    declare const t: true;
    declare const f: false;
    declare const b: boolean;
    declare const s: "true";
  `;
  it("should detect boolean literal types", () => {
    expect(isBooleanLiteralType(getTypeOfDeclaredValue(code, "t"))).toBe(true);
    expect(isBooleanLiteralType(getTypeOfDeclaredValue(code, "f"))).toBe(true);
    expect(isBooleanLiteralType(getTypeOfDeclaredValue(code, "b"))).toBe(false);
    expect(isBooleanLiteralType(getTypeOfDeclaredValue(code, "s"))).toBe(false);
  });
  it("should distinguish false from true literals", () => {
    expect(isFalseLiteralType(getTypeOfDeclaredValue(code, "f"))).toBe(true);
    expect(isFalseLiteralType(getTypeOfDeclaredValue(code, "t"))).toBe(false);
    expect(isTrueLiteralType(getTypeOfDeclaredValue(code, "t"))).toBe(true);
    expect(isTrueLiteralType(getTypeOfDeclaredValue(code, "f"))).toBe(false);
  });
  it("should not treat the widened 'boolean' union as a boolean literal", () => {
    expect(isBooleanType(getTypeOfDeclaredValue(code, "b"))).toBe(true);
    expect(isFalseLiteralType(getTypeOfDeclaredValue(code, "b"))).toBe(false);
    expect(isTrueLiteralType(getTypeOfDeclaredValue(code, "b"))).toBe(false);
  });
});

describe("isAnyType", () => {
  it("should detect the any type", () => {
    expect(isAnyType(getTypeOfDeclaredValue("declare const a: any;", "a"))).toBe(true);
  });
  it("should treat an unconstrained type parameter as any-like", () => {
    const type = getTypeOfDeclaredValue("function f<T>(x: T) { return x; }", "x");
    expect(type.isTypeParameter()).toBe(true);
    expect(isAnyType(type)).toBe(true);
  });
  it("should not treat unknown as any-like", () => {
    expect(isAnyType(getTypeOfDeclaredValue("declare const u: unknown;", "u"))).toBe(false);
  });
});

describe("falsy/truthy literal types", () => {
  it("should detect falsy and truthy bigint literal types", () => {
    expect(isBigIntType(getTypeOfDeclaredValue("declare const x: 0n;", "x"))).toBe(true);
    expect(isFalsyBigIntType(getTypeOfDeclaredValue("declare const x: 0n;", "x"))).toBe(true);
    expect(isTruthyBigIntType(getTypeOfDeclaredValue("declare const x: 0n;", "x"))).toBe(false);
    expect(isTruthyBigIntType(getTypeOfDeclaredValue("declare const x: 1n;", "x"))).toBe(true);
    expect(isFalsyBigIntType(getTypeOfDeclaredValue("declare const x: 1n;", "x"))).toBe(false);
    expect(isFalsyBigIntType(getTypeOfDeclaredValue("declare const x: bigint;", "x"))).toBe(false);
    expect(isTruthyBigIntType(getTypeOfDeclaredValue("declare const x: bigint;", "x"))).toBe(false);
  });
  it("should detect falsy and truthy number literal types", () => {
    expect(isFalsyNumberType(getTypeOfDeclaredValue("declare const x: 0;", "x"))).toBe(true);
    expect(isFalsyNumberType(getTypeOfDeclaredValue("declare const x: -0;", "x"))).toBe(true);
    expect(isTruthyNumberType(getTypeOfDeclaredValue("declare const x: 1;", "x"))).toBe(true);
    expect(isTruthyNumberType(getTypeOfDeclaredValue("declare const x: -1;", "x"))).toBe(true);
    expect(isFalsyNumberType(getTypeOfDeclaredValue("declare const x: number;", "x"))).toBe(false);
    expect(isTruthyNumberType(getTypeOfDeclaredValue("declare const x: number;", "x"))).toBe(false);
  });
  it("should detect falsy and truthy string literal types", () => {
    expect(isFalsyStringType(getTypeOfDeclaredValue('declare const x: "";', "x"))).toBe(true);
    expect(isTruthyStringType(getTypeOfDeclaredValue('declare const x: "a";', "x"))).toBe(true);
    expect(isFalsyStringType(getTypeOfDeclaredValue("declare const x: string;", "x"))).toBe(false);
    expect(isTruthyStringType(getTypeOfDeclaredValue("declare const x: string;", "x"))).toBe(false);
  });
});

describe("isNullishType", () => {
  it.each([
    ["null", true],
    ["undefined", true],
    ["void", true],
    ["string", false],
    ["object", false],
  ])("should return %s -> %s", (annotation, expected) => {
    expect(isNullishType(getTypeOfDeclaredValue(`declare const x: ${annotation};`, "x"))).toBe(expected);
  });
});

describe("isObjectType", () => {
  it.each([
    ["object", true],
    ["{ a: string }", true],
    ["string[]", true],
    ["() => void", true],
    ["Date", true],
    ["string", false],
    ["number", false],
    ["bigint", false],
    ["boolean", false],
    ["null", false],
    ["undefined", false],
    ["void", false],
    ["any", false],
    ["unknown", false],
    ["never", false],
  ])("should return %s -> %s", (annotation, expected) => {
    expect(isObjectType(getTypeOfDeclaredValue(`declare const x: ${annotation};`, "x"))).toBe(expected);
  });
  it("should treat an unconstrained type parameter as non-object", () => {
    const type = getTypeOfDeclaredValue("function f<T>(x: T) { return x; }", "x");
    expect(isObjectType(type)).toBe(false);
  });
  it("should classify symbol as object-like (ESSymbolLike is not excluded)", () => {
    expect(isObjectType(getTypeOfDeclaredValue("declare const x: symbol;", "x"))).toBe(true);
  });
  it("should classify enum types as object-like (EnumLike is not excluded)", () => {
    const code = "enum E { A, B } declare const x: E;";
    expect(isEnumType(getTypeOfDeclaredValue(code, "x"))).toBe(true);
    expect(isObjectType(getTypeOfDeclaredValue(code, "x"))).toBe(true);
  });
});

describe("miscellaneous type flags", () => {
  it("isNeverType should only match never", () => {
    expect(isNeverType(getTypeOfDeclaredValue("declare const x: never;", "x"))).toBe(true);
    expect(isNeverType(getTypeOfDeclaredValue("declare const x: undefined;", "x"))).toBe(false);
  });
  it("isUnknownType should only match unknown", () => {
    expect(isUnknownType(getTypeOfDeclaredValue("declare const x: unknown;", "x"))).toBe(true);
    expect(isUnknownType(getTypeOfDeclaredValue("declare const x: any;", "x"))).toBe(false);
  });
  it("isStringType / isNumberType / isBigIntType / isBooleanType should match their like-flags", () => {
    expect(isStringType(getTypeOfDeclaredValue('declare const x: "a";', "x"))).toBe(true);
    expect(isStringType(getTypeOfDeclaredValue("declare const x: string;", "x"))).toBe(true);
    expect(isNumberType(getTypeOfDeclaredValue("declare const x: 1;", "x"))).toBe(true);
    expect(isNumberType(getTypeOfDeclaredValue("declare const x: number;", "x"))).toBe(true);
    expect(isBigIntType(getTypeOfDeclaredValue("declare const x: bigint;", "x"))).toBe(true);
    expect(isBooleanType(getTypeOfDeclaredValue("declare const x: false;", "x"))).toBe(true);
  });
});
