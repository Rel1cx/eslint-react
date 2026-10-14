import dedent from "dedent";
import ts from "typescript";
import { describe, expect, it } from "vitest";

import { getFullyQualifiedNameEx } from "./type-name";

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

function getSymbolOfFirstDeclaration(code: string, name: string): { checker: ts.TypeChecker; symbol: ts.Symbol } {
  const { checker, sourceFile } = createCheckerFor(code);
  let declaration: ts.Node | undefined;
  const visit = (node: ts.Node): void => {
    const named = node as ts.Node & { name?: ts.Node };
    if (
      declaration == null
      && named.name != null
      && ts.isIdentifier(named.name)
      && named.name.text === name
      && checker.getSymbolAtLocation(named.name) != null
    ) {
      declaration = named.name;
    }
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(sourceFile, visit);
  if (declaration == null) throw new Error(`No declaration named '${name}' found in: ${code}`);
  const symbol = checker.getSymbolAtLocation(declaration as ts.Identifier);
  if (symbol == null) throw new Error(`No symbol for '${name}' in: ${code}`);
  return { checker, symbol };
}

describe("getFullyQualifiedNameEx", () => {
  it("should prepend the 'export as namespace' namespace, unlike ts.TypeChecker.getFullyQualifiedName", () => {
    const code = dedent`
      export as namespace preact;
      declare namespace JSX {
        interface IntrinsicElements {
          div: { id?: string };
        }
      }
    `;
    const { checker, symbol } = getSymbolOfFirstDeclaration(code, "IntrinsicElements");
    expect(checker.getFullyQualifiedName(symbol)).toBe("JSX.IntrinsicElements");
    expect(getFullyQualifiedNameEx(checker, symbol)).toBe("preact.JSX.IntrinsicElements");
  });

  it("should not duplicate the namespace when the walked name already starts with it", () => {
    const code = dedent`
      export as namespace React;
      declare namespace React {
        interface Attributes {
          key?: string;
        }
      }
    `;
    const { checker, symbol } = getSymbolOfFirstDeclaration(code, "Attributes");
    expect(getFullyQualifiedNameEx(checker, symbol)).toBe("React.Attributes");
  });

  it("should qualify members of a namespace when there is no 'export as namespace' declaration", () => {
    const code = dedent`
      export {};
      declare namespace JSX {
        interface IntrinsicElements {
          div: { id?: string };
        }
      }
    `;
    const { checker, symbol } = getSymbolOfFirstDeclaration(code, "IntrinsicElements");
    expect(getFullyQualifiedNameEx(checker, symbol)).toBe("JSX.IntrinsicElements");
  });

  it("should include nested type literal property segments that getFullyQualifiedName skips", () => {
    const code = dedent`
      export {};
      interface A {
        b: {
          c: string;
        };
      }
    `;
    const { checker, symbol } = getSymbolOfFirstDeclaration(code, "c");
    // getFullyQualifiedName names the anonymous type literal "__type" and drops the interface segment
    expect(checker.getFullyQualifiedName(symbol)).toBe("__type.c");
    expect(getFullyQualifiedNameEx(checker, symbol)).toBe("A.b.c");
  });

  it("should qualify enum members and class members by their container names", () => {
    const code = dedent`
      export {};
      enum E { A }
      class C { m() {} }
    `;
    const { checker, symbol: member } = getSymbolOfFirstDeclaration(code, "A");
    expect(getFullyQualifiedNameEx(checker, member)).toBe("E.A");
    const { symbol: method } = getSymbolOfFirstDeclaration(code, "m");
    expect(getFullyQualifiedNameEx(checker, method)).toBe("C.m");
  });

  it("should qualify function-local variables by the function name, unlike getFullyQualifiedName", () => {
    const code = dedent`
      export {};
      function foo() {
        const x = 1;
        return x;
      }
    `;
    const { checker, symbol } = getSymbolOfFirstDeclaration(code, "x");
    expect(checker.getFullyQualifiedName(symbol)).toBe("x");
    expect(getFullyQualifiedNameEx(checker, symbol)).toBe("foo.x");
  });

  it("should return the plain name for a top-level declaration in a module without namespace export", () => {
    const code = dedent`
      export {};
      interface Props {
        a: string;
      }
    `;
    const { checker, symbol } = getSymbolOfFirstDeclaration(code, "Props");
    expect(getFullyQualifiedNameEx(checker, symbol)).toBe("Props");
  });
});
