export type TextlintPatternEntry = {
    message: string;
    pattern: string;
};
export type CompiledTextlintPattern = {
    message: string;
    regex: RegExp;
};
export type TextlintPatternMatch = {
    end: number;
    message: string;
    start: number;
};
export declare function parseTextlintPattern(pattern: string): RegExp;
export declare function compileTextlintPatterns(entries: readonly TextlintPatternEntry[]): CompiledTextlintPattern[];
export declare function loadTextlintPatterns(): CompiledTextlintPattern[];
export declare function matchTextlintPatterns(text: string, patterns: readonly CompiledTextlintPattern[]): TextlintPatternMatch[];
