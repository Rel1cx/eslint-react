import ts from "typescript";
import { describe, expect, it } from "vitest";

import { getTypeVariants } from "./type-variant";

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

// Mirrors how callers (e.g. no-leaked-conditional-rendering via ts-api-utils
// unionConstituents) split unions before calling getTypeVariants.
function unionParts(type: ts.Type): ts.Type[] {
  return type.isUnion() ? [...type.types] : [type];
}

function variantsOf(code: string, name: string): string[] {
  return [...getTypeVariants(unionParts(getTypeOfDeclaredValue(code, name)))].sort();
}

describe("getTypeVariants", () => {
  it("should short-circuit to 'unknown' when any constituent is unknown", () => {
    expect(variantsOf("declare const x: unknown;", "x")).toEqual(["unknown"]);
    // unknown absorbs unions, so construct the input manually
    const unknownType = getTypeOfDeclaredValue("declare const x: unknown;", "x");
    const stringType = getTypeOfDeclaredValue("declare const x: string;", "x");
    expect([...getTypeVariants([unknownType, stringType])]).toEqual(["unknown"]);
  });

  it("should classify boolean constituents split from the 'boolean' union as 'boolean'", () => {
    expect(variantsOf("declare const x: boolean;", "x")).toEqual(["boolean"]);
  });

  it("should classify standalone true/false literals", () => {
    expect(variantsOf("declare const x: true;", "x")).toEqual(["truthy boolean"]);
    expect(variantsOf("declare const x: false;", "x")).toEqual(["falsy boolean"]);
  });

  it("should classify an unsplit 'boolean' union as 'boolean'", () => {
    const booleanType = getTypeOfDeclaredValue("declare const x: boolean;", "x");
    expect(booleanType.isUnion()).toBe(true);
    // The union type carries TypeFlags.Boolean but not BooleanLiteral, so it
    // matches isBooleanType without being true/false; the fallback treats it
    // as the full 'boolean' variant, mirroring the upstream rule.
    expect([...getTypeVariants([booleanType])]).toEqual(["boolean"]);
  });

  it("should classify an unsplit 'boolean' union inside a mixed union as 'boolean'", () => {
    // TS flattens 'boolean | string' into 'false | true | string' internally,
    // so construct the mixed input manually to exercise the fallback.
    const booleanType = getTypeOfDeclaredValue("declare const x: boolean;", "x");
    const stringType = getTypeOfDeclaredValue("declare const x: string;", "x");
    expect([...getTypeVariants([booleanType, stringType])].sort()).toEqual(["boolean", "string"]);
  });

  it("should classify string variants", () => {
    expect(variantsOf('declare const x: "";', "x")).toEqual(["falsy string"]);
    expect(variantsOf('declare const x: "a";', "x")).toEqual(["truthy string"]);
    expect(variantsOf("declare const x: string;", "x")).toEqual(["string"]);
    expect(variantsOf('declare const x: "" | "a";', "x")).toEqual(["string"]);
  });

  it("should classify number variants", () => {
    expect(variantsOf("declare const x: 0;", "x")).toEqual(["falsy number"]);
    expect(variantsOf("declare const x: 1;", "x")).toEqual(["truthy number"]);
    expect(variantsOf("declare const x: number;", "x")).toEqual(["number"]);
    expect(variantsOf("declare const x: 0 | 1;", "x")).toEqual(["number"]);
  });

  it("should classify bigint variants", () => {
    expect(variantsOf("declare const x: 0n;", "x")).toEqual(["falsy bigint"]);
    expect(variantsOf("declare const x: 1n;", "x")).toEqual(["truthy bigint"]);
    expect(variantsOf("declare const x: bigint;", "x")).toEqual(["bigint"]);
    expect(variantsOf("declare const x: 0n | 1n;", "x")).toEqual(["bigint"]);
  });

  it("should classify nullish constituents as 'nullish'", () => {
    expect(variantsOf("declare const x: null;", "x")).toEqual(["nullish"]);
    expect(variantsOf("declare const x: undefined;", "x")).toEqual(["nullish"]);
    expect(variantsOf("declare const x: void;", "x")).toEqual(["nullish"]);
    expect(variantsOf("declare const x: null | undefined;", "x")).toEqual(["nullish"]);
  });

  it("should combine variants of mixed unions", () => {
    expect(variantsOf("declare const x: string | undefined;", "x")).toEqual(["nullish", "string"]);
    expect(variantsOf("declare const x: 0 | null;", "x")).toEqual(["falsy number", "nullish"]);
  });

  it("should classify enum members as 'enum' plus the variant of their underlying literal", () => {
    // Numeric enum member types carry EnumLiteral|NumberLiteral flags with a
    // literal value, so they are classified by their runtime truthiness.
    expect(variantsOf("enum E { A, B } declare const x: E;", "x")).toEqual(["enum", "number"]);
    expect(variantsOf("enum E { A, B } declare const x: E.A;", "x")).toEqual(["enum", "falsy number"]);
    expect(variantsOf("enum E { A, B } declare const x: E.B;", "x")).toEqual(["enum", "truthy number"]);
    // String enum member types carry EnumLiteral|StringLiteral flags.
    expect(variantsOf("enum S { A = 'a', B = '' } declare const x: S.A;", "x")).toEqual(["enum", "truthy string"]);
    expect(variantsOf("enum S { A = 'a', B = '' } declare const x: S.B;", "x")).toEqual(["enum", "falsy string"]);
  });

  it("should classify symbol as 'object'", () => {
    expect(variantsOf("declare const x: symbol;", "x")).toEqual(["object"]);
  });

  it("should classify plain object and function types as 'object'", () => {
    expect(variantsOf("declare const x: { a: string };", "x")).toEqual(["object"]);
    expect(variantsOf("declare const x: () => void;", "x")).toEqual(["object"]);
    expect(variantsOf("declare const x: string[];", "x")).toEqual(["object"]);
    expect(variantsOf("declare const x: [number, string];", "x")).toEqual(["object"]);
  });

  it("should classify any and never", () => {
    expect(variantsOf("declare const x: any;", "x")).toEqual(["any"]);
    expect(variantsOf("declare const x: never;", "x")).toEqual(["never"]);
  });

  it("should classify an unconstrained type parameter as 'any'", () => {
    expect(variantsOf("function f<T>(x: T) { return x; }", "x")).toEqual(["any"]);
  });

  it("should return an empty set for an empty input", () => {
    expect(getTypeVariants([]).size).toBe(0);
  });
});
