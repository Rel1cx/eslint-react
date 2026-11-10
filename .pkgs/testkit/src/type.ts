import ts from "typescript";

/**
 * A minimal in-memory TypeScript program exposing its type checker.
 * Built for tests that need real `ts.Type`/`ts.Symbol` objects without fixture files on disk.
 */
export interface TypeTestBed {
  /** The type checker of the in-memory program. */
  checker: ts.TypeChecker;
  /**
   * Resolves the symbol of the first declaration named `name` in the virtual files.
   * @param name The declaration name to look up.
   * @returns The symbol of the declaration.
   */
  getSymbolOf(name: string): ts.Symbol;
  /**
   * Resolves the declared type of the first declaration named `name` in the virtual files.
   * @param name The declaration name to look up.
   * @returns The declared type of the declaration.
   */
  getTypeOf(name: string): ts.Type;
  /**
   * Resolves the type of `name` and splits it into union constituents.
   * Non-union types yield a single-element array.
   * @param name The declaration name to look up.
   * @returns The union constituents of the type, or the type itself.
   */
  getUnionPartsOf(name: string): ts.Type[];
  /** The in-memory program. */
  program: ts.Program;
}

/**
 * Returns the identifier naming `node` when it is a declaration-like node with an identifier name, `undefined` otherwise.
 * @param node The node to inspect.
 * @returns The name identifier of the node, if any.
 */
function getDeclarationName(node: ts.Node): ts.Identifier | undefined {
  switch (true) {
    case ts.isVariableDeclaration(node):
    case ts.isPropertySignature(node):
    case ts.isPropertyDeclaration(node):
    case ts.isMethodSignature(node):
    case ts.isMethodDeclaration(node):
    case ts.isPropertyAssignment(node):
    case ts.isFunctionDeclaration(node):
    case ts.isClassDeclaration(node):
    case ts.isClassExpression(node):
    case ts.isInterfaceDeclaration(node):
    case ts.isTypeAliasDeclaration(node):
    case ts.isEnumDeclaration(node):
    case ts.isEnumMember(node):
    case ts.isModuleDeclaration(node): {
      const { name } = node;
      if (name != null && ts.isIdentifier(name)) return name;
      return undefined;
    }
  }
  return undefined;
}

/**
 * Creates an in-memory TypeScript program from virtual source files and exposes its type checker.
 *
 * @remarks
 * The default libs are skipped (`noLib`) so program creation stays cheap; intrinsic types
 * (ex: `string`, `boolean`, literal types) still resolve without them, but globals declared by
 * lib files (ex: `Array`, `Promise`) are unavailable in the virtual sources.
 * @param files Virtual files keyed by absolute-ish path (ex: `{ "/fixture.ts": "declare const x: string;" }`).
 * @param options Extra compiler options overriding the defaults (`strict`, `noLib`, ESNext target/module, `noEmit`).
 * @returns The test bed for resolving types and symbols by declaration name.
 */
export function createTypeTestBed(files: Record<string, string>, options: ts.CompilerOptions = {}): TypeTestBed {
  const compilerOptions: ts.CompilerOptions = {
    module: ts.ModuleKind.ESNext,
    noEmit: true,
    noLib: true,
    strict: true,
    target: ts.ScriptTarget.ESNext,
    ...options,
  };
  const defaultHost = ts.createCompilerHost(compilerOptions);
  const host: ts.CompilerHost = {
    ...defaultHost,
    fileExists: (fileName) => fileName in files || defaultHost.fileExists(fileName),
    getSourceFile: (fileName, languageVersion, onError, shouldCreateNewSourceFile) =>
      fileName in files
        ? ts.createSourceFile(fileName, files[fileName] ?? "", languageVersion, true)
        : defaultHost.getSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile),
    readFile: (fileName) => (fileName in files ? files[fileName] : defaultHost.readFile(fileName)),
  };
  const program = ts.createProgram(Object.keys(files), compilerOptions, host);
  const checker = program.getTypeChecker();
  const virtualFiles = program.getSourceFiles().filter((sourceFile) => sourceFile.fileName in files);

  function findDeclaration(name: string): ts.Node {
    // `forEachChild` returns the first truthy callback result, which doubles as an early exit.
    const findIn = (node: ts.Node): ts.Node | undefined => getDeclarationName(node)?.text === name ? node : node.forEachChild((child) => findIn(child));
    for (const sourceFile of virtualFiles) {
      const found = findIn(sourceFile);
      if (found != null) return found;
    }
    throw new Error(`No declaration named '${name}' found in the virtual files`);
  }

  function getTypeOf(name: string): ts.Type {
    return checker.getTypeAtLocation(findDeclaration(name));
  }

  function getSymbolOf(name: string): ts.Symbol {
    const identifier = getDeclarationName(findDeclaration(name));
    const symbol = identifier == null ? undefined : checker.getSymbolAtLocation(identifier);
    if (symbol == null) throw new Error(`No symbol found for the declaration named '${name}'`);
    return symbol;
  }

  function getUnionPartsOf(name: string): ts.Type[] {
    const type = getTypeOf(name);
    return type.isUnion() ? type.types : [type];
  }

  return { checker, getSymbolOf, getTypeOf, getUnionPartsOf, program };
}
