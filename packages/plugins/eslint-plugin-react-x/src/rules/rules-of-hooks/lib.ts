// Code Path Analyzer

// This code is a forked version of ESLints Code Path Analyzer which includes
// support for Component Syntax.

// Forked from: https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks/src/code-path-analysis

// MIT License

// Copyright (c) Meta Platforms, Inc. and affiliates.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
// This code is a forked version of ESLints Code Path Analyzer which includes
// support for Component Syntax.

// Forked from: https://github.com/eslint/eslint/tree/main/lib/linter/code-path-analysis

// Copyright OpenJS Foundation and other contributors, <www.openjsf.org>

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// ---------------------------------------------------------------------------
// Type Definitions
// ---------------------------------------------------------------------------

/**
 * A minimal AST node type used throughout the code path analyzer.
 * This is intentionally broad to accommodate custom parser node types
 * (e.g. ComponentDeclaration, HookDeclaration from parser-hermes).
 *
 * Using `any` here is deliberate — the code path analyzer must work
 * with nodes from various parsers (including hermes) whose types are
 * not captured by a single static type definition.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ASTNode = any;

/** Internal bookkeeping data for a CodePathSegment. */
interface CodePathSegmentInternal {
  used: boolean;
  loopedPrevSegments: CodePathSegment[];
}

/** A factory function that creates a new CodePathSegment. */
type SegmentFactory = (id: string, allPrevSegments: CodePathSegment[]) => CodePathSegment;

/** Context object for choice (if/ternary/logical) tracking. */
interface ChoiceContext {
  upper: ChoiceContext | null;
  kind: string;
  isForkingAsResult: boolean;
  trueForkContext: ForkContext;
  falseForkContext: ForkContext;
  qqForkContext: ForkContext;
  processed: boolean;
}

/** Context object for switch statement tracking. */
interface SwitchContext {
  upper: SwitchContext | null;
  hasCase: boolean;
  defaultSegments: CodePathSegment[] | null;
  defaultBodySegments: CodePathSegment[] | null;
  foundDefault: boolean;
  lastIsDefault: boolean;
  countForks: number;
}

/** Context object for try statement tracking. */
interface TryContext {
  upper: TryContext | null;
  position: "try" | "catch" | "finally";
  hasFinalizer: boolean;
  returnedForkContext: ForkContext | null;
  thrownForkContext: ForkContext;
  lastOfTryIsReachable: boolean;
  lastOfCatchIsReachable: boolean;
}

/** Context object for WhileStatement loop tracking. */
interface WhileLoopContext {
  upper: LoopContext | null;
  type: "WhileStatement";
  label: string | null;
  test: boolean | undefined;
  continueDestSegments: CodePathSegment[] | null;
  brokenForkContext: ForkContext;
}

/** Context object for DoWhileStatement loop tracking. */
interface DoWhileLoopContext {
  upper: LoopContext | null;
  type: "DoWhileStatement";
  label: string | null;
  test: boolean | undefined;
  entrySegments: CodePathSegment[] | null;
  continueDestSegments?: null;
  continueForkContext: ForkContext;
  brokenForkContext: ForkContext;
}

/** Context object for ForStatement loop tracking. */
interface ForLoopContext {
  upper: LoopContext | null;
  type: "ForStatement";
  label: string | null;
  test: boolean | undefined;
  endOfInitSegments: CodePathSegment[] | null;
  testSegments: CodePathSegment[] | null;
  endOfTestSegments: CodePathSegment[] | null;
  updateSegments: CodePathSegment[] | null;
  endOfUpdateSegments: CodePathSegment[] | null;
  continueDestSegments: CodePathSegment[] | null;
  brokenForkContext: ForkContext;
}

/** Context object for ForInStatement / ForOfStatement loop tracking. */
interface ForInOfLoopContext {
  upper: LoopContext | null;
  type: "ForInStatement" | "ForOfStatement";
  label: string | null;
  prevSegments: CodePathSegment[] | null;
  leftSegments: CodePathSegment[] | null;
  endOfLeftSegments: CodePathSegment[] | null;
  continueDestSegments: CodePathSegment[] | null;
  brokenForkContext: ForkContext;
}

/** Discriminated union of all loop context types. */
type LoopContext = WhileLoopContext | DoWhileLoopContext | ForLoopContext | ForInOfLoopContext;

/** Context object for break statement tracking. */
interface BreakContext {
  upper: BreakContext | null;
  breakable: boolean;
  label: string | null;
  brokenForkContext: ForkContext;
}

/** Context object for ChainExpression tracking. */
interface ChainContext {
  upper: ChainContext | null;
  countChoiceContexts: number;
}

/**
 * An array of CodePathSegment with a patched `add` method.
 * Used for `returnedForkContext` and `thrownForkContext` on CodePathState.
 */
type SegmentDestination = CodePathSegment[] & {
  add(segments: CodePathSegment[]): void;
};

/** The origin of a CodePath (why it was started). */
type CodePathOrigin = "program" | "function" | "class-field-initializer" | "class-static-block";

/** Emitter events fired by the CodePathAnalyzer. */
interface CodePathAnalyzerEmitters {
  onCodePathStart?(codePath: CodePath, node: ASTNode): void;
  onCodePathEnd?(codePath: CodePath, node: ASTNode): void;
  onCodePathSegmentStart?(segment: CodePathSegment, node: ASTNode): void;
  onCodePathSegmentEnd?(segment: CodePathSegment, node: ASTNode): void;
  onCodePathSegmentLoop?(fromSegment: CodePathSegment, toSegment: CodePathSegment, node: ASTNode): void;
}

/** A minimal event emitter interface used internally. */
interface InternalEmitter {
  emit(event: string, ...args: unknown[]): void;
}

/**
 * Common interface for objects that have a `returnedForkContext` and
 * `thrownForkContext` with an `add` method. Both `CodePathState` and
 * `TryContext` satisfy this when relevant.
 */
interface HasForkContextAdd {
  returnedForkContext: { add(segments: CodePathSegment[]): void };
  thrownForkContext: { add(segments: CodePathSegment[]): void };
}

// #region code-path-analysis/assert.js

function assert(cond: unknown, message?: string): asserts cond {
  if (!cond) throw new Error(message ?? "Assertion violated.");
}

// #endregion
// #region code-path-analysis/code-path-segment.js

/**
 * Checks whether or not a given segment is reachable.
 */
function isReachable$1(segment: CodePathSegment): boolean {
  return segment.reachable;
}

/**
 * A code path segment.
 */
class CodePathSegment {
  /**
   * The identifier of this code path.
   * Rules use it to store additional information of each rule.
   */
  id: string;

  /** An array of the next reachable segments. */
  nextSegments: CodePathSegment[];

  /** An array of the previous reachable segments. */
  prevSegments: CodePathSegment[];

  /** An array of all next segments (including unreachable). */
  allNextSegments: CodePathSegment[];

  /** An array of all previous segments (including unreachable). */
  allPrevSegments: CodePathSegment[];

  /** Whether this segment is reachable. */
  reachable: boolean;

  /** Internal bookkeeping data. */
  internal: CodePathSegmentInternal;

  /**
   * @param id An identifier.
   * @param allPrevSegments An array of the previous segments (including unreachable).
   * @param reachable Whether this segment is reachable.
   */
  constructor(id: string, allPrevSegments: CodePathSegment[], reachable: boolean) {
    this.id = id;
    this.nextSegments = [];
    this.prevSegments = allPrevSegments.filter(isReachable$1);
    this.allNextSegments = [];
    this.allPrevSegments = allPrevSegments;
    this.reachable = reachable;

    // In the original code this was set via Object.defineProperty to be
    // non-enumerable. We declare it as a regular property for TypeScript.
    this.internal = {
      used: false,
      loopedPrevSegments: [],
    };
  }

  /**
   * Checks if a given previous segment is coming from the end of a loop.
   */
  isLoopedPrevSegment(segment: CodePathSegment): boolean {
    return this.internal.loopedPrevSegments.includes(segment);
  }

  /**
   * Creates the root segment.
   */
  static newRoot(id: string): CodePathSegment {
    return new CodePathSegment(id, [], true);
  }

  /**
   * Creates a segment that follows given segments.
   */
  static newNext(id: string, allPrevSegments: CodePathSegment[]): CodePathSegment {
    return new CodePathSegment(
      id,
      CodePathSegment.flattenUnusedSegments(allPrevSegments),
      allPrevSegments.some(isReachable$1),
    );
  }

  /**
   * Creates an unreachable segment that follows given segments.
   */
  static newUnreachable(id: string, allPrevSegments: CodePathSegment[]): CodePathSegment {
    const segment = new CodePathSegment(id, CodePathSegment.flattenUnusedSegments(allPrevSegments), false);
    CodePathSegment.markUsed(segment);
    return segment;
  }

  /**
   * Creates a segment that follows given segments.
   * This factory method does not connect with `allPrevSegments`.
   * But this inherits `reachable` flag.
   */
  static newDisconnected(id: string, allPrevSegments: CodePathSegment[]): CodePathSegment {
    return new CodePathSegment(id, [], allPrevSegments.some(isReachable$1));
  }

  /**
   * Makes a given segment being used.
   * Also registers the segment into the previous segments as a next.
   */
  static markUsed(segment: CodePathSegment): void {
    if (segment.internal.used) return;
    segment.internal.used = true;
    let i: number;
    if (segment.reachable) {
      for (i = 0; i < segment.allPrevSegments.length; ++i) {
        const prevSegment = segment.allPrevSegments[i]!;
        prevSegment.allNextSegments.push(segment);
        prevSegment.nextSegments.push(segment);
      }
    } else {
      for (i = 0; i < segment.allPrevSegments.length; ++i) {
        segment.allPrevSegments[i]!.allNextSegments.push(segment);
      }
    }
  }

  /**
   * Marks a previous segment as looped.
   */
  static markPrevSegmentAsLooped(segment: CodePathSegment, prevSegment: CodePathSegment): void {
    segment.internal.loopedPrevSegments.push(prevSegment);
  }

  /**
   * Replaces unused segments with the previous segments of each unused segment.
   */
  static flattenUnusedSegments(segments: CodePathSegment[]): CodePathSegment[] {
    const done: Record<string, boolean> = Object.create(null);
    const retv: CodePathSegment[] = [];
    for (let i = 0; i < segments.length; ++i) {
      const segment = segments[i]!;
      if (done[segment.id]) continue;
      if (!segment.internal.used) {
        for (let j = 0; j < segment.allPrevSegments.length; ++j) {
          const prevSegment = segment.allPrevSegments[j]!;
          if (!done[prevSegment.id]) {
            done[prevSegment.id] = true;
            retv.push(prevSegment);
          }
        }
      } else {
        done[segment.id] = true;
        retv.push(segment);
      }
    }
    return retv;
  }
}

// #endregion
// #region code-path-analysis/fork-context.js

/**
 * Gets whether or not a given segment is reachable.
 */
function isReachable(segment: CodePathSegment): boolean {
  return segment.reachable;
}

/**
 * Creates new segments from the specific range of `context.segmentsList`.
 *
 * When `context.segmentsList` is `[[a, b], [c, d], [e, f]]`, `begin` is `0`, and
 * `end` is `-1`, this creates `[g, h]`. This `g` is from `a`, `c`, and `e`.
 * This `h` is from `b`, `d`, and `f`.
 */
function makeSegments(
  context: ForkContext,
  begin: number,
  end: number,
  create: SegmentFactory,
): CodePathSegment[] {
  const list = context.segmentsList;
  const normalizedBegin = begin >= 0 ? begin : list.length + begin;
  const normalizedEnd = end >= 0 ? end : list.length + end;
  const segments: CodePathSegment[] = [];
  for (let i = 0; i < context.count; ++i) {
    const allPrevSegments: CodePathSegment[] = [];
    for (let j = normalizedBegin; j <= normalizedEnd; ++j) allPrevSegments.push(list[j]![i]!);
    segments.push(create(context.idGenerator.next(), allPrevSegments));
  }
  return segments;
}

/**
 * `segments` becomes doubly in a `finally` block. Then if a code path exits by a
 * control statement (such as `break`, `continue`) from the `finally` block, the
 * destination's segments may be half of the source segments. In that case, this
 * merges segments.
 */
function mergeExtraSegments(context: ForkContext, segments: CodePathSegment[]): CodePathSegment[] {
  let currentSegments = segments;
  while (currentSegments.length > context.count) {
    const merged: CodePathSegment[] = [];
    for (let i = 0, length = currentSegments.length / 2 | 0; i < length; ++i) {
      merged.push(
        CodePathSegment.newNext(context.idGenerator.next(), [currentSegments[i]!, currentSegments[i + length]!]),
      );
    }
    currentSegments = merged;
  }
  return currentSegments;
}

/**
 * A class to manage forking.
 */
class ForkContext {
  idGenerator: IdGenerator;
  upper: ForkContext | null;
  count: number;
  segmentsList: CodePathSegment[][];

  constructor(idGenerator: IdGenerator, upper: ForkContext | null, count: number) {
    this.idGenerator = idGenerator;
    this.upper = upper;
    this.count = count;
    this.segmentsList = [];
  }

  /** The head segments. */
  get head(): CodePathSegment[] {
    const list = this.segmentsList;
    return list.length === 0 ? [] : list[list.length - 1]!;
  }

  /** Whether the segments list is empty. */
  get empty(): boolean {
    return this.segmentsList.length === 0;
  }

  /** Whether any head segment is reachable. */
  get reachable(): boolean {
    const segments = this.head;
    return segments.length > 0 && segments.some(isReachable);
  }

  /**
   * Creates new segments from this context.
   */
  makeNext(begin: number, end: number): CodePathSegment[] {
    return makeSegments(this, begin, end, CodePathSegment.newNext);
  }

  /**
   * Creates new unreachable segments from this context.
   */
  makeUnreachable(begin: number, end: number): CodePathSegment[] {
    return makeSegments(this, begin, end, CodePathSegment.newUnreachable);
  }

  /**
   * Creates new disconnected segments from this context.
   * The new segments don't have connections for previous segments,
   * but inherit the reachable flag.
   */
  makeDisconnected(begin: number, end: number): CodePathSegment[] {
    return makeSegments(this, begin, end, CodePathSegment.newDisconnected);
  }

  /**
   * Adds segments into this context. The added segments become the head.
   */
  add(segments: CodePathSegment[]): void {
    assert(segments.length >= this.count, `${segments.length} >= ${this.count}`);
    this.segmentsList.push(mergeExtraSegments(this, segments));
  }

  /**
   * Replaces the head segments with given segments.
   * The current head segments are removed.
   */
  replaceHead(segments: CodePathSegment[]): void {
    assert(segments.length >= this.count, `${segments.length} >= ${this.count}`);
    this.segmentsList.splice(-1, 1, mergeExtraSegments(this, segments));
  }

  /**
   * Adds all segments of a given fork context into this context.
   */
  addAll(context: ForkContext): void {
    assert(context.count === this.count);
    const source = context.segmentsList;
    for (let i = 0; i < source.length; ++i) this.segmentsList.push(source[i]!);
  }

  /**
   * Clears all segments in this context.
   */
  clear(): void {
    this.segmentsList = [];
  }

  /**
   * Creates the root fork context.
   */
  static newRoot(idGenerator: IdGenerator): ForkContext {
    const context = new ForkContext(idGenerator, null, 1);
    context.add([CodePathSegment.newRoot(idGenerator.next())]);
    return context;
  }

  /**
   * Creates an empty fork context preceded by a given context.
   */
  static newEmpty(parentContext: ForkContext, forkLeavingPath?: boolean): ForkContext {
    return new ForkContext(parentContext.idGenerator, parentContext, (forkLeavingPath ? 2 : 1) * parentContext.count);
  }
}

// #endregion
// #region code-path-analysis/code-path-state.js

/**
 * Adds given segments into the `dest` array.
 * If the `others` array does not include the given segments, adds to the `all`
 * array as well.
 *
 * This adds only reachable and used segments.
 */
function addToReturnedOrThrown(
  dest: CodePathSegment[],
  others: CodePathSegment[],
  all: CodePathSegment[],
  segments: CodePathSegment[],
): void {
  for (let i = 0; i < segments.length; ++i) {
    const segment = segments[i]!;
    dest.push(segment);
    if (!others.includes(segment)) all.push(segment);
  }
}

/**
 * Gets a loop-context for a `continue` statement.
 */
function getContinueContext(state: CodePathState, label: string | null): LoopContext | null {
  if (!label) return state.loopContext;
  let context = state.loopContext;
  while (context) {
    if (context.label === label) return context;
    context = context.upper;
  }
  /* c8 ignore next */
  return null;
}

/**
 * Gets a context for a `break` statement.
 */
function getBreakContext(state: CodePathState, label: string | null): BreakContext | null {
  let context = state.breakContext;
  while (context) {
    if (label ? context.label === label : context.breakable) return context;
    context = context.upper;
  }
  /* c8 ignore next */
  return null;
}

/**
 * Gets a context for a `return` statement.
 */
function getReturnContext(state: CodePathState): TryContext | CodePathState {
  let context = state.tryContext;
  while (context) {
    if (context.hasFinalizer && context.position !== "finally") return context;
    context = context.upper;
  }
  return state;
}

/**
 * Gets a context for a `throw` statement.
 */
function getThrowContext(state: CodePathState): TryContext | CodePathState {
  let context = state.tryContext;
  while (context) {
    if (context.position === "try" || (context.hasFinalizer && context.position === "catch")) return context;
    context = context.upper;
  }
  return state;
}

/**
 * Removes a given element from a given array.
 */
function remove<T>(xs: T[], x: T): void {
  xs.splice(xs.indexOf(x), 1);
}

/**
 * Disconnect given segments.
 *
 * This is used in a process for switch statements.
 * If there is the "default" chunk before other cases, the order is different
 * between node's and running's.
 */
function removeConnection(prevSegments: CodePathSegment[], nextSegments: CodePathSegment[]): void {
  for (let i = 0; i < prevSegments.length; ++i) {
    const prevSegment = prevSegments[i]!;
    const nextSegment = nextSegments[i]!;
    remove(prevSegment.nextSegments, nextSegment);
    remove(prevSegment.allNextSegments, nextSegment);
    remove(nextSegment.prevSegments, prevSegment);
    remove(nextSegment.allPrevSegments, prevSegment);
  }
}

/**
 * Creates looping path.
 */
function makeLooped(
  state: CodePathState,
  unflattenedFromSegments: CodePathSegment[],
  unflattenedToSegments: CodePathSegment[],
): void {
  const fromSegments = CodePathSegment.flattenUnusedSegments(unflattenedFromSegments);
  const toSegments = CodePathSegment.flattenUnusedSegments(unflattenedToSegments);
  const end = Math.min(fromSegments.length, toSegments.length);
  for (let i = 0; i < end; ++i) {
    const fromSegment = fromSegments[i]!;
    const toSegment = toSegments[i]!;
    if (toSegment.reachable) fromSegment.nextSegments.push(toSegment);
    if (fromSegment.reachable) toSegment.prevSegments.push(fromSegment);
    fromSegment.allNextSegments.push(toSegment);
    toSegment.allPrevSegments.push(fromSegment);
    if (toSegment.allPrevSegments.length >= 2) CodePathSegment.markPrevSegmentAsLooped(toSegment, fromSegment);
    state.notifyLooped(fromSegment, toSegment);
  }
}

/**
 * Finalizes segments of `test` chunk of a ForStatement.
 *
 * - Adds `false` paths to paths which are leaving from the loop.
 * - Sets `true` paths to paths which go to the body.
 */
function finalizeTestSegmentsOfFor(
  context: ForLoopContext,
  choiceContext: ChoiceContext,
  head: CodePathSegment[],
): void {
  if (!choiceContext.processed) {
    choiceContext.trueForkContext.add(head);
    choiceContext.falseForkContext.add(head);
    choiceContext.qqForkContext.add(head);
  }
  if (context.test !== true) context.brokenForkContext.addAll(choiceContext.falseForkContext);
  context.endOfTestSegments = choiceContext.trueForkContext.makeNext(0, -1);
}

/**
 * A class which manages state to analyze code paths.
 */
class CodePathState {
  idGenerator: IdGenerator;
  notifyLooped: (fromSegment: CodePathSegment, toSegment: CodePathSegment) => void;
  forkContext: ForkContext;
  choiceContext: ChoiceContext | null;
  switchContext: SwitchContext | null;
  tryContext: TryContext | null;
  loopContext: LoopContext | null;
  breakContext: BreakContext | null;
  chainContext: ChainContext | null;
  currentSegments: CodePathSegment[];
  initialSegment: CodePathSegment;
  finalSegments: CodePathSegment[];
  returnedForkContext: SegmentDestination;
  thrownForkContext: SegmentDestination;

  constructor(
    idGenerator: IdGenerator,
    onLooped: (fromSegment: CodePathSegment, toSegment: CodePathSegment) => void,
  ) {
    this.idGenerator = idGenerator;
    this.notifyLooped = onLooped;
    this.forkContext = ForkContext.newRoot(idGenerator);
    this.choiceContext = null;
    this.switchContext = null;
    this.tryContext = null;
    this.loopContext = null;
    this.breakContext = null;
    this.chainContext = null;
    this.currentSegments = [];
    this.initialSegment = this.forkContext.head[0]!;

    const final: CodePathSegment[] = [];
    this.finalSegments = final;

    const returned = [] as unknown as SegmentDestination;
    const thrown = [] as unknown as SegmentDestination;

    this.returnedForkContext = returned;
    this.thrownForkContext = thrown;

    returned.add = addToReturnedOrThrown.bind(null, returned, thrown, final);
    thrown.add = addToReturnedOrThrown.bind(null, thrown, returned, final);
  }

  /** The head segments. */
  get headSegments(): CodePathSegment[] {
    return this.forkContext.head;
  }

  /**
   * The parent forking context.
   * This is used for the root of new forks.
   */
  get parentForkContext(): ForkContext | null {
    const current = this.forkContext;
    return current && current.upper;
  }

  /**
   * Creates and stacks new forking context.
   */
  pushForkContext(forkLeavingPath?: boolean): ForkContext {
    this.forkContext = ForkContext.newEmpty(this.forkContext, forkLeavingPath);
    return this.forkContext;
  }

  /**
   * Pops and merges the last forking context.
   */
  popForkContext(): ForkContext {
    const lastContext = this.forkContext;
    this.forkContext = lastContext.upper!;
    this.forkContext.replaceHead(lastContext.makeNext(0, -1));
    return lastContext;
  }

  /**
   * Creates a new path.
   */
  forkPath(): void {
    this.forkContext.add(this.parentForkContext!.makeNext(-1, -1));
  }

  /**
   * Creates a bypass path.
   * This is used for such as IfStatement which does not have "else" chunk.
   */
  forkBypassPath(): void {
    this.forkContext.add(this.parentForkContext!.head);
  }

  /**
   * Creates a context for ConditionalExpression, LogicalExpression,
   * AssignmentExpression (logical assignments only), IfStatement,
   * WhileStatement, DoWhileStatement, or ForStatement.
   *
   * @param kind A kind string.
   *   If the new context is LogicalExpression's or AssignmentExpression's,
   *   this is `"&&"` or `"||"` or `"??"`.
   *   If it's IfStatement's or ConditionalExpression's, this is `"test"`.
   *   Otherwise, this is `"loop"`.
   * @param isForkingAsResult A flag that shows that goes different
   *   paths between `true` and `false`.
   */
  pushChoiceContext(kind: string, isForkingAsResult: boolean): void {
    this.choiceContext = {
      upper: this.choiceContext,
      kind,
      isForkingAsResult,
      trueForkContext: ForkContext.newEmpty(this.forkContext),
      falseForkContext: ForkContext.newEmpty(this.forkContext),
      qqForkContext: ForkContext.newEmpty(this.forkContext),
      processed: false,
    };
  }

  /**
   * Pops the last choice context and finalizes it.
   */
  popChoiceContext(): ChoiceContext {
    const context = this.choiceContext!;
    this.choiceContext = context.upper;
    const forkContext = this.forkContext;
    const headSegments = forkContext.head;
    switch (context.kind) {
      case "&&":
      case "||":
      case "??":
        if (!context.processed) {
          context.trueForkContext.add(headSegments);
          context.falseForkContext.add(headSegments);
          context.qqForkContext.add(headSegments);
        }
        if (context.isForkingAsResult) {
          const parentContext = this.choiceContext!;
          parentContext.trueForkContext.addAll(context.trueForkContext);
          parentContext.falseForkContext.addAll(context.falseForkContext);
          parentContext.qqForkContext.addAll(context.qqForkContext);
          parentContext.processed = true;
          return context;
        }
        break;
      case "test":
        if (!context.processed) {
          context.trueForkContext.clear();
          context.trueForkContext.add(headSegments);
        } else {
          context.falseForkContext.clear();
          context.falseForkContext.add(headSegments);
        }
        break;
      case "loop":
        return context;
      default:
        throw new Error("unreachable");
    }
    const prevForkContext = context.trueForkContext;
    prevForkContext.addAll(context.falseForkContext);
    forkContext.replaceHead(prevForkContext.makeNext(0, -1));
    return context;
  }

  /**
   * Makes a code path segment of the right-hand operand of a logical
   * expression.
   */
  makeLogicalRight(): void {
    const context = this.choiceContext!;
    const forkContext = this.forkContext;
    if (context.processed) {
      let prevForkContext: ForkContext;
      switch (context.kind) {
        case "&&":
          prevForkContext = context.trueForkContext;
          break;
        case "||":
          prevForkContext = context.falseForkContext;
          break;
        case "??":
          prevForkContext = context.qqForkContext;
          break;
        default:
          throw new Error("unreachable");
      }
      forkContext.replaceHead(prevForkContext.makeNext(0, -1));
      prevForkContext.clear();
      context.processed = false;
    } else {
      switch (context.kind) {
        case "&&":
          context.falseForkContext.add(forkContext.head);
          break;
        case "||":
          context.trueForkContext.add(forkContext.head);
          break;
        case "??":
          context.trueForkContext.add(forkContext.head);
          context.falseForkContext.add(forkContext.head);
          break;
        default:
          throw new Error("unreachable");
      }
      forkContext.replaceHead(forkContext.makeNext(-1, -1));
    }
  }

  /**
   * Makes a code path segment of the `if` block.
   */
  makeIfConsequent(): void {
    const context = this.choiceContext!;
    const forkContext = this.forkContext;
    if (!context.processed) {
      context.trueForkContext.add(forkContext.head);
      context.falseForkContext.add(forkContext.head);
      context.qqForkContext.add(forkContext.head);
    }
    context.processed = false;
    forkContext.replaceHead(context.trueForkContext.makeNext(0, -1));
  }

  /**
   * Makes a code path segment of the `else` block.
   */
  makeIfAlternate(): void {
    const context = this.choiceContext!;
    const forkContext = this.forkContext;
    context.trueForkContext.clear();
    context.trueForkContext.add(forkContext.head);
    context.processed = true;
    forkContext.replaceHead(context.falseForkContext.makeNext(0, -1));
  }

  /**
   * Push a new `ChainExpression` context to the stack.
   * This method is called on entering to each `ChainExpression` node.
   * This context is used to count forking in the optional chain then merge
   * them on exiting from the `ChainExpression` node.
   */
  pushChainContext(): void {
    this.chainContext = {
      upper: this.chainContext,
      countChoiceContexts: 0,
    };
  }

  /**
   * Pop a `ChainExpression` context from the stack.
   * This method is called on exiting from each `ChainExpression` node.
   * This merges all forks of the last optional chaining.
   */
  popChainContext(): void {
    const context = this.chainContext!;
    this.chainContext = context.upper;
    for (let i = context.countChoiceContexts; i > 0; --i) this.popChoiceContext();
  }

  /**
   * Create a choice context for optional access.
   * This method is called on entering to each `(Call|Member)Expression[optional=true]` node.
   * This creates a choice context as similar to `LogicalExpression[operator="??"]` node.
   */
  makeOptionalNode(): void {
    if (this.chainContext) {
      this.chainContext.countChoiceContexts += 1;
      this.pushChoiceContext("??", false);
    }
  }

  /**
   * Create a fork.
   * This method is called on entering to the `arguments|property` property
   * of each `(Call|Member)Expression` node.
   */
  makeOptionalRight(): void {
    if (this.chainContext) this.makeLogicalRight();
  }

  /**
   * Creates a context object of SwitchStatement and stacks it.
   */
  pushSwitchContext(hasCase: boolean, label: string | null): void {
    this.switchContext = {
      upper: this.switchContext,
      hasCase,
      defaultSegments: null,
      defaultBodySegments: null,
      foundDefault: false,
      lastIsDefault: false,
      countForks: 0,
    };
    this.pushBreakContext(true, label);
  }

  /**
   * Pops the last context of SwitchStatement and finalizes it.
   *
   * - Disposes all forking stack for `case` and `default`.
   * - Creates the next code path segment from `context.brokenForkContext`.
   * - If the last `SwitchCase` node is not a `default` part, creates a path
   *   to the `default` body.
   */
  popSwitchContext(): void {
    const context = this.switchContext!;
    this.switchContext = context.upper;
    const forkContext = this.forkContext;
    const brokenForkContext = this.popBreakContext().brokenForkContext;
    if (context.countForks === 0) {
      if (!brokenForkContext.empty) {
        brokenForkContext.add(forkContext.makeNext(-1, -1));
        forkContext.replaceHead(brokenForkContext.makeNext(0, -1));
      }
      return;
    }
    const lastSegments = forkContext.head;
    this.forkBypassPath();
    const lastCaseSegments = forkContext.head;
    brokenForkContext.add(lastSegments);
    if (!context.lastIsDefault) {
      if (context.defaultBodySegments) {
        removeConnection(context.defaultSegments!, context.defaultBodySegments);
        makeLooped(this, lastCaseSegments, context.defaultBodySegments);
      } else brokenForkContext.add(lastCaseSegments);
    }
    for (let i = 0; i < context.countForks; ++i) this.forkContext = this.forkContext.upper!;
    this.forkContext.replaceHead(brokenForkContext.makeNext(0, -1));
  }

  /**
   * Makes a code path segment for a `SwitchCase` node.
   */
  makeSwitchCaseBody(isEmpty: boolean, isDefault: boolean): void {
    const context = this.switchContext!;
    if (!context.hasCase) return;
    const parentForkContext = this.forkContext;
    const forkContext = this.pushForkContext();
    forkContext.add(parentForkContext.makeNext(0, -1));
    if (isDefault) {
      context.defaultSegments = parentForkContext.head;
      if (isEmpty) context.foundDefault = true;
      else context.defaultBodySegments = forkContext.head;
    } else if (!isEmpty && context.foundDefault) {
      context.foundDefault = false;
      context.defaultBodySegments = forkContext.head;
    }
    context.lastIsDefault = isDefault;
    context.countForks += 1;
  }

  /**
   * Creates a context object of TryStatement and stacks it.
   */
  pushTryContext(hasFinalizer: boolean): void {
    this.tryContext = {
      upper: this.tryContext,
      position: "try",
      hasFinalizer,
      returnedForkContext: hasFinalizer ? ForkContext.newEmpty(this.forkContext) : null,
      thrownForkContext: ForkContext.newEmpty(this.forkContext),
      lastOfTryIsReachable: false,
      lastOfCatchIsReachable: false,
    };
  }

  /**
   * Pops the last context of TryStatement and finalizes it.
   */
  popTryContext(): void {
    const context = this.tryContext!;
    this.tryContext = context.upper;
    if (context.position === "catch") {
      this.popForkContext();
      return;
    }
    const returned = context.returnedForkContext;
    const thrown = context.thrownForkContext;
    if ((returned == null || returned.empty) && thrown.empty) return;
    const headSegments = this.forkContext.head;
    this.forkContext = this.forkContext.upper!;
    const normalSegments = headSegments.slice(0, headSegments.length / 2 | 0);
    const leavingSegments = headSegments.slice(headSegments.length / 2 | 0);
    if (returned && !returned.empty) {
      (getReturnContext(this) as HasForkContextAdd).returnedForkContext.add(leavingSegments);
    }
    if (!thrown.empty) {
      (getThrowContext(this) as HasForkContextAdd).thrownForkContext.add(leavingSegments);
    }
    this.forkContext.replaceHead(normalSegments);
    if (!context.lastOfTryIsReachable && !context.lastOfCatchIsReachable) this.forkContext.makeUnreachable(-1, -1);
  }

  /**
   * Makes a code path segment for a `catch` block.
   */
  makeCatchBlock(): void {
    const context = this.tryContext!;
    const forkContext = this.forkContext;
    const thrown = context.thrownForkContext;
    context.position = "catch";
    context.thrownForkContext = ForkContext.newEmpty(forkContext);
    context.lastOfTryIsReachable = forkContext.reachable;
    thrown.add(forkContext.head);
    const thrownSegments = thrown.makeNext(0, -1);
    this.pushForkContext();
    this.forkBypassPath();
    this.forkContext.add(thrownSegments);
  }

  /**
   * Makes a code path segment for a `finally` block.
   *
   * In the `finally` block, parallel paths are created. The parallel paths
   * are used as leaving-paths. The leaving-paths are paths from `return`
   * statements and `throw` statements in a `try` block or a `catch` block.
   */
  makeFinallyBlock(): void {
    const context = this.tryContext!;
    let forkContext = this.forkContext;
    const returned = context.returnedForkContext!;
    const thrown = context.thrownForkContext;
    const headOfLeavingSegments = forkContext.head;
    if (context.position === "catch") {
      this.popForkContext();
      forkContext = this.forkContext;
      context.lastOfCatchIsReachable = forkContext.reachable;
    } else context.lastOfTryIsReachable = forkContext.reachable;
    context.position = "finally";
    if (returned.empty && thrown.empty) return;
    const segments = forkContext.makeNext(-1, -1);
    for (let i = 0; i < forkContext.count; ++i) {
      const prevSegsOfLeavingSegment: CodePathSegment[] = [headOfLeavingSegments[i]!];
      for (let j = 0; j < returned.segmentsList.length; ++j) {
        prevSegsOfLeavingSegment.push(returned.segmentsList[j]![i]!);
      }
      for (let j = 0; j < thrown.segmentsList.length; ++j) prevSegsOfLeavingSegment.push(thrown.segmentsList[j]![i]!);
      segments.push(CodePathSegment.newNext(this.idGenerator.next(), prevSegsOfLeavingSegment));
    }
    this.pushForkContext(true);
    this.forkContext.add(segments);
  }

  /**
   * Makes a code path segment from the first throwable node to the `catch`
   * block or the `finally` block.
   */
  makeFirstThrowablePathInTryBlock(): void {
    const forkContext = this.forkContext;
    if (!forkContext.reachable) return;
    const context = getThrowContext(this);
    if (
      context === (this as unknown)
      || (context as TryContext).position !== "try"
      || !(context as TryContext).thrownForkContext.empty
    ) return;
    (context as TryContext).thrownForkContext.add(forkContext.head);
    forkContext.replaceHead(forkContext.makeNext(-1, -1));
  }

  /**
   * Creates a context object of a loop statement and stacks it.
   */
  pushLoopContext(type: string, label: string | null): void {
    const forkContext = this.forkContext;
    const breakContext = this.pushBreakContext(true, label);
    switch (type) {
      case "WhileStatement":
        this.pushChoiceContext("loop", false);
        this.loopContext = {
          upper: this.loopContext,
          type: "WhileStatement",
          label,
          test: void 0,
          continueDestSegments: null,
          brokenForkContext: breakContext.brokenForkContext,
        };
        break;
      case "DoWhileStatement":
        this.pushChoiceContext("loop", false);
        this.loopContext = {
          upper: this.loopContext,
          type: "DoWhileStatement",
          label,
          test: void 0,
          entrySegments: null,
          continueForkContext: ForkContext.newEmpty(forkContext),
          brokenForkContext: breakContext.brokenForkContext,
        };
        break;
      case "ForStatement":
        this.pushChoiceContext("loop", false);
        this.loopContext = {
          upper: this.loopContext,
          type: "ForStatement",
          label,
          test: void 0,
          endOfInitSegments: null,
          testSegments: null,
          endOfTestSegments: null,
          updateSegments: null,
          endOfUpdateSegments: null,
          continueDestSegments: null,
          brokenForkContext: breakContext.brokenForkContext,
        };
        break;
      case "ForInStatement":
      case "ForOfStatement":
        this.loopContext = {
          upper: this.loopContext,
          type: type as "ForInStatement" | "ForOfStatement",
          label,
          prevSegments: null,
          leftSegments: null,
          endOfLeftSegments: null,
          continueDestSegments: null,
          brokenForkContext: breakContext.brokenForkContext,
        };
        break;
      default:
        throw new Error(`unknown type: "${type}"`);
    }
  }

  /**
   * Pops the last context of a loop statement and finalizes it.
   */
  popLoopContext(): void {
    const context = this.loopContext!;
    this.loopContext = context.upper;
    const forkContext = this.forkContext;
    const brokenForkContext = this.popBreakContext().brokenForkContext;
    switch (context.type) {
      case "WhileStatement":
      case "ForStatement":
        this.popChoiceContext();
        makeLooped(this, forkContext.head, context.continueDestSegments!);
        break;
      case "DoWhileStatement": {
        const choiceContext = this.popChoiceContext();
        if (!choiceContext.processed) {
          choiceContext.trueForkContext.add(forkContext.head);
          choiceContext.falseForkContext.add(forkContext.head);
        }
        if (context.test !== true) brokenForkContext.addAll(choiceContext.falseForkContext);
        const segmentsList = choiceContext.trueForkContext.segmentsList;
        for (let i = 0; i < segmentsList.length; ++i) makeLooped(this, segmentsList[i]!, context.entrySegments!);
        break;
      }
      case "ForInStatement":
      case "ForOfStatement":
        brokenForkContext.add(forkContext.head);
        makeLooped(this, forkContext.head, context.leftSegments!);
        break;
      default:
        throw new Error("unreachable");
    }
    if (brokenForkContext.empty) forkContext.replaceHead(forkContext.makeUnreachable(-1, -1));
    else forkContext.replaceHead(brokenForkContext.makeNext(0, -1));
  }

  /**
   * Makes a code path segment for the test part of a WhileStatement.
   */
  makeWhileTest(test: boolean | undefined): void {
    const context = this.loopContext as WhileLoopContext;
    const forkContext = this.forkContext;
    const testSegments = forkContext.makeNext(0, -1);
    context.test = test;
    context.continueDestSegments = testSegments;
    forkContext.replaceHead(testSegments);
  }

  /**
   * Makes a code path segment for the body part of a WhileStatement.
   */
  makeWhileBody(): void {
    const context = this.loopContext as WhileLoopContext;
    const choiceContext = this.choiceContext!;
    const forkContext = this.forkContext;
    if (!choiceContext.processed) {
      choiceContext.trueForkContext.add(forkContext.head);
      choiceContext.falseForkContext.add(forkContext.head);
    }
    if (context.test !== true) context.brokenForkContext.addAll(choiceContext.falseForkContext);
    forkContext.replaceHead(choiceContext.trueForkContext.makeNext(0, -1));
  }

  /**
   * Makes a code path segment for the body part of a DoWhileStatement.
   */
  makeDoWhileBody(): void {
    const context = this.loopContext as DoWhileLoopContext;
    const forkContext = this.forkContext;
    const bodySegments = forkContext.makeNext(-1, -1);
    context.entrySegments = bodySegments;
    forkContext.replaceHead(bodySegments);
  }

  /**
   * Makes a code path segment for the test part of a DoWhileStatement.
   */
  makeDoWhileTest(test: boolean | undefined): void {
    const context = this.loopContext as DoWhileLoopContext;
    const forkContext = this.forkContext;
    context.test = test;
    if (!context.continueForkContext.empty) {
      context.continueForkContext.add(forkContext.head);
      const testSegments = context.continueForkContext.makeNext(0, -1);
      forkContext.replaceHead(testSegments);
    }
  }

  /**
   * Makes a code path segment for the test part of a ForStatement.
   */
  makeForTest(test: boolean | undefined): void {
    const context = this.loopContext as ForLoopContext;
    const forkContext = this.forkContext;
    const endOfInitSegments = forkContext.head;
    const testSegments = forkContext.makeNext(-1, -1);
    context.test = test;
    context.endOfInitSegments = endOfInitSegments;
    context.continueDestSegments = context.testSegments = testSegments;
    forkContext.replaceHead(testSegments);
  }

  /**
   * Makes a code path segment for the update part of a ForStatement.
   */
  makeForUpdate(): void {
    const context = this.loopContext as ForLoopContext;
    const choiceContext = this.choiceContext!;
    const forkContext = this.forkContext;
    if (context.testSegments) finalizeTestSegmentsOfFor(context, choiceContext, forkContext.head);
    else context.endOfInitSegments = forkContext.head;
    const updateSegments = forkContext.makeDisconnected(-1, -1);
    context.continueDestSegments = context.updateSegments = updateSegments;
    forkContext.replaceHead(updateSegments);
  }

  /**
   * Makes a code path segment for the body part of a ForStatement.
   */
  makeForBody(): void {
    const context = this.loopContext as ForLoopContext;
    const choiceContext = this.choiceContext!;
    const forkContext = this.forkContext;
    if (context.updateSegments) {
      context.endOfUpdateSegments = forkContext.head;
      if (context.testSegments) makeLooped(this, context.endOfUpdateSegments, context.testSegments);
    } else if (context.testSegments) finalizeTestSegmentsOfFor(context, choiceContext, forkContext.head);
    else context.endOfInitSegments = forkContext.head;
    let bodySegments = context.endOfTestSegments;
    if (!bodySegments) {
      const prevForkContext = ForkContext.newEmpty(forkContext);
      prevForkContext.add(context.endOfInitSegments!);
      if (context.endOfUpdateSegments) prevForkContext.add(context.endOfUpdateSegments);
      bodySegments = prevForkContext.makeNext(0, -1);
    }
    context.continueDestSegments = context.continueDestSegments || bodySegments;
    forkContext.replaceHead(bodySegments);
  }

  /**
   * Makes a code path segment for the left part of a ForInStatement and a
   * ForOfStatement.
   */
  makeForInOfLeft(): void {
    const context = this.loopContext as ForInOfLoopContext;
    const forkContext = this.forkContext;
    const leftSegments = forkContext.makeDisconnected(-1, -1);
    context.prevSegments = forkContext.head;
    context.leftSegments = context.continueDestSegments = leftSegments;
    forkContext.replaceHead(leftSegments);
  }

  /**
   * Makes a code path segment for the right part of a ForInStatement and a
   * ForOfStatement.
   */
  makeForInOfRight(): void {
    const context = this.loopContext as ForInOfLoopContext;
    const forkContext = this.forkContext;
    const temp = ForkContext.newEmpty(forkContext);
    temp.add(context.prevSegments!);
    const rightSegments = temp.makeNext(-1, -1);
    context.endOfLeftSegments = forkContext.head;
    forkContext.replaceHead(rightSegments);
  }

  /**
   * Makes a code path segment for the body part of a ForInStatement and a
   * ForOfStatement.
   */
  makeForInOfBody(): void {
    const context = this.loopContext as ForInOfLoopContext;
    const forkContext = this.forkContext;
    const temp = ForkContext.newEmpty(forkContext);
    temp.add(context.endOfLeftSegments!);
    const bodySegments = temp.makeNext(-1, -1);
    makeLooped(this, forkContext.head, context.leftSegments!);
    context.brokenForkContext.add(forkContext.head);
    forkContext.replaceHead(bodySegments);
  }

  /**
   * Creates new context for BreakStatement.
   */
  pushBreakContext(breakable: boolean, label: string | null): BreakContext {
    this.breakContext = {
      upper: this.breakContext,
      breakable,
      label,
      brokenForkContext: ForkContext.newEmpty(this.forkContext),
    };
    return this.breakContext;
  }

  /**
   * Removes the top item of the break context stack.
   */
  popBreakContext(): BreakContext {
    const context = this.breakContext!;
    const forkContext = this.forkContext;
    this.breakContext = context.upper;
    if (!context.breakable) {
      const brokenForkContext = context.brokenForkContext;
      if (!brokenForkContext.empty) {
        brokenForkContext.add(forkContext.head);
        forkContext.replaceHead(brokenForkContext.makeNext(0, -1));
      }
    }
    return context;
  }

  /**
   * Makes a path for a `break` statement.
   *
   * It registers the head segment to a context of `break`.
   * It makes new unreachable segment, then it set the head with the segment.
   */
  makeBreak(label: string | null): void {
    const forkContext = this.forkContext;
    if (!forkContext.reachable) return;
    const context = getBreakContext(this, label);
    if (context) context.brokenForkContext.add(forkContext.head);
    /* c8 ignore next */
    forkContext.replaceHead(forkContext.makeUnreachable(-1, -1));
  }

  /**
   * Makes a path for a `continue` statement.
   *
   * It makes a looping path.
   * It makes new unreachable segment, then it set the head with the segment.
   */
  makeContinue(label: string | null): void {
    const forkContext = this.forkContext;
    if (!forkContext.reachable) return;
    const context = getContinueContext(this, label);
    if (context) {
      if (context.continueDestSegments != null) {
        makeLooped(this, forkContext.head, context.continueDestSegments);
        if (context.type === "ForInStatement" || context.type === "ForOfStatement") {
          (context as ForInOfLoopContext).brokenForkContext.add(forkContext.head);
        }
      } else {
        (context as DoWhileLoopContext).continueForkContext.add(forkContext.head);
      }
    }
    forkContext.replaceHead(forkContext.makeUnreachable(-1, -1));
  }

  /**
   * Makes a path for a `return` statement.
   *
   * It registers the head segment to a context of `return`.
   * It makes new unreachable segment, then it set the head with the segment.
   */
  makeReturn(): void {
    const forkContext = this.forkContext;
    if (forkContext.reachable) {
      (getReturnContext(this) as HasForkContextAdd).returnedForkContext.add(forkContext.head);
      forkContext.replaceHead(forkContext.makeUnreachable(-1, -1));
    }
  }

  /**
   * Makes a path for a `throw` statement.
   *
   * It registers the head segment to a context of `throw`.
   * It makes new unreachable segment, then it set the head with the segment.
   */
  makeThrow(): void {
    const forkContext = this.forkContext;
    if (forkContext.reachable) {
      (getThrowContext(this) as HasForkContextAdd).thrownForkContext.add(forkContext.head);
      forkContext.replaceHead(forkContext.makeUnreachable(-1, -1));
    }
  }

  /**
   * Makes the final path.
   */
  makeFinal(): void {
    const segments = this.currentSegments;
    if (segments.length > 0 && segments[0]!.reachable) this.returnedForkContext.add(segments);
  }
}

// #endregion
// #region code-path-analysis/id-generator.js

/**
 * A generator for unique ids.
 */
class IdGenerator {
  prefix: string;
  n: number;

  constructor(prefix: string) {
    this.prefix = String(prefix);
    this.n = 0;
  }

  /**
   * Generates id.
   */
  next(): string {
    this.n = 1 + this.n | 0;
    /* c8 ignore start */
    if (this.n < 0) this.n = 1;
    return this.prefix + this.n;
  }
}

// #endregion
// #region code-path-analysis/code-path.js

/** Options for creating a CodePath. */
interface CodePathOptions {
  id: string;
  origin: CodePathOrigin;
  upper: CodePath | null;
  onLooped: (fromSegment: CodePathSegment, toSegment: CodePathSegment) => void;
}

/** Options for traverseSegments. */
interface TraverseSegmentsOptions {
  first?: CodePathSegment;
  last?: CodePathSegment;
}

/** Controller for traverseSegments callback. */
interface TraverseController {
  skip(): void;
  break(): void;
}

/** Callback for traverseSegments. */
type TraverseCallback = (segment: CodePathSegment, controller: TraverseController) => void;

/**
 * A code path.
 */
class CodePath {
  /** The identifier of this code path. */
  id: string;

  /**
   * The reason that this code path was started. May be "program",
   * "function", "class-field-initializer", or "class-static-block".
   */
  origin: CodePathOrigin;

  /** The code path of the upper function scope. */
  upper: CodePath | null;

  /** The code paths of nested function scopes. */
  childCodePaths: CodePath[];

  /** Internal state for the code path. */
  internal: CodePathState;

  constructor({ id, origin, upper, onLooped }: CodePathOptions) {
    this.id = id;
    this.origin = origin;
    this.upper = upper;
    this.childCodePaths = [];

    // In the original code this was set via Object.defineProperty to be
    // non-enumerable. We declare it as a regular property for TypeScript.
    this.internal = new CodePathState(new IdGenerator(`${id}_`), onLooped);

    if (upper) upper.childCodePaths.push(this);
  }

  /**
   * Gets the state of a given code path.
   */
  static getState(codePath: CodePath): CodePathState {
    return codePath.internal;
  }

  /** The initial code path segment. */
  get initialSegment(): CodePathSegment {
    return this.internal.initialSegment;
  }

  /**
   * Final code path segments.
   * This array is a mix of `returnedSegments` and `thrownSegments`.
   */
  get finalSegments(): CodePathSegment[] {
    return this.internal.finalSegments;
  }

  /**
   * Final code path segments which is with `return` statements.
   * This array contains the last path segment if it's reachable.
   * Since the reachable last path returns `undefined`.
   */
  get returnedSegments(): CodePathSegment[] {
    return this.internal.returnedForkContext;
  }

  /** Final code path segments which is with `throw` statements. */
  get thrownSegments(): CodePathSegment[] {
    return this.internal.thrownForkContext;
  }

  /** Current code path segments. */
  get currentSegments(): CodePathSegment[] {
    return this.internal.currentSegments;
  }

  /**
   * Traverses all segments in this code path.
   *
   * This method enumerates segments in order from the head.
   *
   * The `controller` object has two methods:
   * - `controller.skip()` - Skip the following segments in this branch.
   * - `controller.break()` - Skip all following segments.
   */
  traverseSegments(options: TraverseSegmentsOptions | TraverseCallback, callback?: TraverseCallback): void {
    let resolvedOptions: TraverseSegmentsOptions;
    let resolvedCallback: TraverseCallback;
    if (typeof options === "function") {
      resolvedCallback = options;
      resolvedOptions = {};
    } else {
      resolvedOptions = options || {};
      resolvedCallback = callback!;
    }
    const startSegment = resolvedOptions.first || this.internal.initialSegment;
    const lastSegment = resolvedOptions.last;
    let item: [CodePathSegment, number] | null = null;
    let index = 0;
    let end = 0;
    let segment: CodePathSegment | null = null;
    const visited: Record<string, boolean> = Object.create(null);
    const stack: [CodePathSegment, number][] = [[startSegment, 0]];
    let skippedSegment: CodePathSegment | null = null;
    let broken = false;
    const controller: TraverseController = {
      skip() {
        if (stack.length <= 1) broken = true;
        else skippedSegment = stack[stack.length - 2]![0];
      },
      break() {
        broken = true;
      },
    };

    function isVisited(prevSegment: CodePathSegment): boolean {
      return visited[prevSegment.id] || segment!.isLoopedPrevSegment(prevSegment);
    }

    while (stack.length > 0) {
      item = stack[stack.length - 1]!;
      segment = item[0];
      index = item[1];
      if (index === 0) {
        if (visited[segment.id]) {
          stack.pop();
          continue;
        }
        if (segment !== startSegment && segment.prevSegments.length > 0 && !segment.prevSegments.every(isVisited)) {
          stack.pop();
          continue;
        }
        if (skippedSegment && segment.prevSegments.includes(skippedSegment)) skippedSegment = null;
        visited[segment.id] = true;
        if (!skippedSegment) {
          resolvedCallback.call(this, segment, controller);
          if (segment === lastSegment) controller.skip();
          if (broken) break;
        }
      }
      end = segment.nextSegments.length - 1;
      if (index < end) {
        item[1] += 1;
        stack.push([segment.nextSegments[index]!, 0]);
      } else if (index === end) {
        item[0] = segment.nextSegments[index]!;
        item[1] = 0;
      } else stack.pop();
    }
  }
}

// #endregion
// #region code-path-analysis/code-path-analyzer.js

const breakableTypePattern = /^(?:(?:Do)?While|For(?:In|Of)?|Switch)Statement$/u;

/**
 * Checks whether or not a given node is a `case` node (not `default` node).
 */
function isCaseNode(node: ASTNode): boolean {
  return Boolean(node.test);
}

/**
 * Checks if a given node appears as the value of a PropertyDefinition node.
 */
function isPropertyDefinitionValue(node: ASTNode): boolean {
  const parent = node.parent;
  return parent && parent.type === "PropertyDefinition" && parent.value === node;
}

/**
 * Checks whether the given logical operator is taken into account for the code
 * path analysis.
 */
function isHandledLogicalOperator(operator: string): boolean {
  return operator === "&&" || operator === "||" || operator === "??";
}

/**
 * Checks whether the given assignment operator is a logical assignment operator.
 * Logical assignments are taken into account for the code path analysis
 * because of their short-circuiting semantics.
 */
function isLogicalAssignmentOperator(operator: string): boolean {
  return operator === "&&=" || operator === "||=" || operator === "??=";
}

/**
 * Gets the label if the parent node of a given node is a LabeledStatement.
 */
function getLabel(node: ASTNode): string | null {
  if (node.parent.type === "LabeledStatement") return node.parent.label.name;
  return null;
}

/**
 * Checks whether or not a given logical expression node goes different path
 * between the `true` case and the `false` case.
 */
function isForkingByTrueOrFalse(node: ASTNode): boolean {
  const parent = node.parent;
  switch (parent.type) {
    case "ConditionalExpression":
    case "IfStatement":
    case "WhileStatement":
    case "DoWhileStatement":
    case "ForStatement":
      return parent.test === node;
    case "LogicalExpression":
      return isHandledLogicalOperator(parent.operator);
    case "AssignmentExpression":
      return isLogicalAssignmentOperator(parent.operator);
    default:
      return false;
  }
}

/**
 * Gets the boolean value of a given literal node.
 *
 * This is used to detect infinity loops (e.g. `while (true) {}`).
 * Statements preceded by an infinity loop are unreachable if the loop didn't
 * have any `break` statement.
 */
function getBooleanValueIfSimpleConstant(node: ASTNode): boolean | undefined {
  if (node.type === "Literal") return Boolean(node.value);
  return void 0;
}

/**
 * Checks that a given identifier node is a reference or not.
 *
 * This is used to detect the first throwable node in a `try` block.
 */
function isIdentifierReference(node: ASTNode): boolean {
  const parent = node.parent;
  switch (parent.type) {
    case "LabeledStatement":
    case "BreakStatement":
    case "ContinueStatement":
    case "ArrayPattern":
    case "RestElement":
    case "ImportSpecifier":
    case "ImportDefaultSpecifier":
    case "ImportNamespaceSpecifier":
    case "CatchClause":
      return false;
    case "FunctionDeclaration":
    case "ComponentDeclaration":
    case "HookDeclaration":
    case "FunctionExpression":
    case "ArrowFunctionExpression":
    case "ClassDeclaration":
    case "ClassExpression":
    case "VariableDeclarator":
      return parent.id !== node;
    case "Property":
    case "PropertyDefinition":
    case "MethodDefinition":
      return parent.key !== node || parent.computed || parent.shorthand;
    case "AssignmentPattern":
      return parent.key !== node;
    default:
      return true;
  }
}

/**
 * Updates the current segment with the head segment.
 * This is similar to local branches and tracking branches of git.
 *
 * To separate the current and the head is in order to not make useless segments.
 *
 * In this process, both "onCodePathSegmentStart" and "onCodePathSegmentEnd"
 * events are fired.
 */
function forwardCurrentToHead(analyzer: CodePathAnalyzer, node: ASTNode): void {
  const codePath = analyzer.codePath!;
  const state = CodePath.getState(codePath);
  const currentSegments = state.currentSegments;
  const headSegments = state.headSegments;
  const end = Math.max(currentSegments.length, headSegments.length);
  let i: number;
  let currentSegment: CodePathSegment | undefined;
  let headSegment: CodePathSegment | undefined;
  for (i = 0; i < end; ++i) {
    currentSegment = currentSegments[i];
    headSegment = headSegments[i];
    if (currentSegment !== headSegment && currentSegment) {
      if (currentSegment.reachable) analyzer.emitter.emit("onCodePathSegmentEnd", currentSegment, node);
    }
  }
  state.currentSegments = headSegments;
  for (i = 0; i < end; ++i) {
    currentSegment = currentSegments[i];
    headSegment = headSegments[i];
    if (currentSegment !== headSegment && headSegment) {
      CodePathSegment.markUsed(headSegment);
      if (headSegment.reachable) analyzer.emitter.emit("onCodePathSegmentStart", headSegment, node);
    }
  }
}

/**
 * Updates the current segment with empty.
 * This is called at the last of functions or the program.
 */
function leaveFromCurrentSegment(analyzer: CodePathAnalyzer, node: ASTNode): void {
  const state = CodePath.getState(analyzer.codePath!);
  const currentSegments = state.currentSegments;
  for (let i = 0; i < currentSegments.length; ++i) {
    const currentSegment = currentSegments[i]!;
    if (currentSegment.reachable) analyzer.emitter.emit("onCodePathSegmentEnd", currentSegment, node);
  }
  state.currentSegments = [];
}

/**
 * Updates the code path due to the position of a given node in the parent node
 * thereof.
 *
 * For example, if the node is `parent.consequent`, this creates a fork from the
 * current path.
 */
function preprocess(analyzer: CodePathAnalyzer, node: ASTNode): void {
  const codePath = analyzer.codePath!;
  const state = CodePath.getState(codePath);
  const parent = node.parent;
  switch (parent.type) {
    case "CallExpression":
      if (parent.optional === true && parent.arguments.length >= 1 && parent.arguments[0] === node) {
        state.makeOptionalRight();
      }
      break;
    case "MemberExpression":
      if (parent.optional === true && parent.property === node) state.makeOptionalRight();
      break;
    case "LogicalExpression":
      if (parent.right === node && isHandledLogicalOperator(parent.operator)) state.makeLogicalRight();
      break;
    case "AssignmentExpression":
      if (parent.right === node && isLogicalAssignmentOperator(parent.operator)) state.makeLogicalRight();
      break;
    case "ConditionalExpression":
    case "IfStatement":
      if (parent.consequent === node) state.makeIfConsequent();
      else if (parent.alternate === node) state.makeIfAlternate();
      break;
    case "SwitchCase":
      if (parent.consequent[0] === node) state.makeSwitchCaseBody(false, !parent.test);
      break;
    case "TryStatement":
      if (parent.handler === node) state.makeCatchBlock();
      else if (parent.finalizer === node) state.makeFinallyBlock();
      break;
    case "WhileStatement":
      if (parent.test === node) state.makeWhileTest(getBooleanValueIfSimpleConstant(node));
      else {
        assert(parent.body === node);
        state.makeWhileBody();
      }
      break;
    case "DoWhileStatement":
      if (parent.body === node) state.makeDoWhileBody();
      else {
        assert(parent.test === node);
        state.makeDoWhileTest(getBooleanValueIfSimpleConstant(node));
      }
      break;
    case "ForStatement":
      if (parent.test === node) state.makeForTest(getBooleanValueIfSimpleConstant(node));
      else if (parent.update === node) state.makeForUpdate();
      else if (parent.body === node) state.makeForBody();
      break;
    case "ForInStatement":
    case "ForOfStatement":
      if (parent.left === node) state.makeForInOfLeft();
      else if (parent.right === node) state.makeForInOfRight();
      else {
        assert(parent.body === node);
        state.makeForInOfBody();
      }
      break;
    case "AssignmentPattern":
      if (parent.right === node) {
        state.pushForkContext();
        state.forkBypassPath();
        state.forkPath();
      }
      break;
    default:
      break;
  }
}

/**
 * Updates the code path due to the type of a given node in entering.
 */
function processCodePathToEnter(analyzer: CodePathAnalyzer, node: ASTNode): void {
  let codePath = analyzer.codePath;
  let state = codePath && CodePath.getState(codePath);
  const parent = node.parent;

  /**
   * Creates a new code path and trigger the onCodePathStart event
   * based on the currently selected node.
   */
  function startCodePath(origin: CodePathOrigin): void {
    if (codePath) forwardCurrentToHead(analyzer, node);
    codePath = analyzer.codePath = new CodePath({
      id: analyzer.idGenerator.next(),
      origin,
      upper: codePath,
      onLooped: analyzer.onLooped,
    });
    state = CodePath.getState(codePath);
    analyzer.emitter.emit("onCodePathStart", codePath, node);
  }

  if (isPropertyDefinitionValue(node)) startCodePath("class-field-initializer");
  switch (node.type) {
    case "Program":
      startCodePath("program");
      break;
    case "FunctionDeclaration":
    case "ComponentDeclaration":
    case "HookDeclaration":
    case "FunctionExpression":
    case "ArrowFunctionExpression":
      startCodePath("function");
      break;
    case "StaticBlock":
      startCodePath("class-static-block");
      break;
    case "ChainExpression":
      state!.pushChainContext();
      break;
    case "CallExpression":
      if (node.optional === true) state!.makeOptionalNode();
      break;
    case "MemberExpression":
      if (node.optional === true) state!.makeOptionalNode();
      break;
    case "LogicalExpression":
      if (isHandledLogicalOperator(node.operator)) {
        state!.pushChoiceContext(node.operator, isForkingByTrueOrFalse(node));
      }
      break;
    case "AssignmentExpression":
      if (isLogicalAssignmentOperator(node.operator)) {
        state!.pushChoiceContext(node.operator.slice(0, -1), isForkingByTrueOrFalse(node));
      }
      break;
    case "ConditionalExpression":
    case "IfStatement":
      state!.pushChoiceContext("test", false);
      break;
    case "SwitchStatement":
      state!.pushSwitchContext(node.cases.some(isCaseNode), getLabel(node));
      break;
    case "TryStatement":
      state!.pushTryContext(Boolean(node.finalizer));
      break;
    case "SwitchCase":
      if (parent.discriminant !== node && parent.cases[0] !== node) state!.forkPath();
      break;
    case "WhileStatement":
    case "DoWhileStatement":
    case "ForStatement":
    case "ForInStatement":
    case "ForOfStatement":
      state!.pushLoopContext(node.type, getLabel(node));
      break;
    case "LabeledStatement":
      if (!breakableTypePattern.test(node.body.type)) state!.pushBreakContext(false, node.label.name);
      break;
    default:
      break;
  }
  forwardCurrentToHead(analyzer, node);
}

/**
 * Updates the code path due to the type of a given node in leaving.
 */
function processCodePathToExit(analyzer: CodePathAnalyzer, node: ASTNode): void {
  const codePath = analyzer.codePath!;
  const state = CodePath.getState(codePath);
  let dontForward = false;
  switch (node.type) {
    case "ChainExpression":
      state.popChainContext();
      break;
    case "IfStatement":
    case "ConditionalExpression":
      state.popChoiceContext();
      break;
    case "LogicalExpression":
      if (isHandledLogicalOperator(node.operator)) state.popChoiceContext();
      break;
    case "AssignmentExpression":
      if (isLogicalAssignmentOperator(node.operator)) state.popChoiceContext();
      break;
    case "SwitchStatement":
      state.popSwitchContext();
      break;
    case "SwitchCase":
      if (node.consequent.length === 0) state.makeSwitchCaseBody(true, !node.test);
      if (state.forkContext.reachable) dontForward = true;
      break;
    case "TryStatement":
      state.popTryContext();
      break;
    case "BreakStatement":
      forwardCurrentToHead(analyzer, node);
      state.makeBreak(node.label && node.label.name);
      dontForward = true;
      break;
    case "ContinueStatement":
      forwardCurrentToHead(analyzer, node);
      state.makeContinue(node.label && node.label.name);
      dontForward = true;
      break;
    case "ReturnStatement":
      forwardCurrentToHead(analyzer, node);
      state.makeReturn();
      dontForward = true;
      break;
    case "ThrowStatement":
      forwardCurrentToHead(analyzer, node);
      state.makeThrow();
      dontForward = true;
      break;
    case "Identifier":
      if (isIdentifierReference(node)) {
        state.makeFirstThrowablePathInTryBlock();
        dontForward = true;
      }
      break;
    case "CallExpression":
    case "ImportExpression":
    case "MemberExpression":
    case "NewExpression":
    case "YieldExpression":
      state.makeFirstThrowablePathInTryBlock();
      break;
    case "WhileStatement":
    case "DoWhileStatement":
    case "ForStatement":
    case "ForInStatement":
    case "ForOfStatement":
      state.popLoopContext();
      break;
    case "AssignmentPattern":
      state.popForkContext();
      break;
    case "LabeledStatement":
      if (!breakableTypePattern.test(node.body.type)) state.popBreakContext();
      break;
    default:
      break;
  }
  if (!dontForward) forwardCurrentToHead(analyzer, node);
}

/**
 * Updates the code path to finalize the current code path.
 */
function postprocess(analyzer: CodePathAnalyzer, node: ASTNode): void {
  function endCodePath(): void {
    const codePath = analyzer.codePath!;
    CodePath.getState(codePath).makeFinal();
    leaveFromCurrentSegment(analyzer, node);
    analyzer.emitter.emit("onCodePathEnd", codePath, node);
    analyzer.codePath = analyzer.codePath!.upper;
  }
  switch (node.type) {
    case "Program":
    case "FunctionDeclaration":
    case "ComponentDeclaration":
    case "HookDeclaration":
    case "FunctionExpression":
    case "ArrowFunctionExpression":
    case "StaticBlock":
      endCodePath();
      break;
    case "CallExpression":
      if (node.optional === true && node.arguments.length === 0) {
        CodePath.getState(analyzer.codePath!).makeOptionalRight();
      }
      break;
    default:
      break;
  }
  if (isPropertyDefinitionValue(node)) endCodePath();
}

/**
 * The class to analyze code paths.
 * This class implements the EventGenerator interface.
 */
class CodePathAnalyzer {
  emitter: InternalEmitter;
  codePath: CodePath | null;
  idGenerator: IdGenerator;
  currentNode: ASTNode | null;
  onLooped: (fromSegment: CodePathSegment, toSegment: CodePathSegment) => void;

  constructor(emitters: CodePathAnalyzerEmitters) {
    this.emitter = {
      emit(event: string, ...args: unknown[]) {
        (emitters as Record<string, ((...a: unknown[]) => void) | undefined>)[event]?.(...args);
      },
    };
    this.codePath = null;
    this.idGenerator = new IdGenerator("s");
    this.currentNode = null;
    this.onLooped = this._onLooped.bind(this);
  }

  /**
   * Does the process to enter a given AST node.
   * This updates state of analysis and calls `enterNode` of the wrapped.
   */
  enterNode(node: ASTNode): void {
    this.currentNode = node;
    if (node.parent) preprocess(this, node);
    processCodePathToEnter(this, node);
    this.currentNode = null;
  }

  /**
   * Does the process to leave a given AST node.
   * This updates state of analysis and calls `leaveNode` of the wrapped.
   */
  leaveNode(node: ASTNode): void {
    this.currentNode = node;
    processCodePathToExit(this, node);
    postprocess(this, node);
    this.currentNode = null;
  }

  /**
   * This is called on a code path looped.
   * Then this raises a looped event.
   */
  private _onLooped(fromSegment: CodePathSegment, toSegment: CodePathSegment): void {
    if (fromSegment.reachable && toSegment.reachable) {
      this.emitter.emit("onCodePathSegmentLoop", fromSegment, toSegment, this.currentNode);
    }
  }
}

export { CodePathAnalyzer };

// #endregion
