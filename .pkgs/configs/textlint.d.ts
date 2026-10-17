export type PatternEntry = {
    message: string;
    pattern: string;
};
export type CompiledPattern = {
    message: string;
    regex: RegExp;
};
export type LintReport = {
    message: string;
    range: {
        start: number;
        end: number;
    };
};
export declare function compile({ message, pattern }: PatternEntry): CompiledPattern;
export declare function loadDefaults(): CompiledPattern[];
export declare function lint(text: string, patterns: readonly CompiledPattern[]): LintReport[];
