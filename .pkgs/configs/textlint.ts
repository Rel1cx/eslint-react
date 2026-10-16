import textlintBase from "./textlint.base.json" with { type: "json" };

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

export function parseTextlintPattern(pattern: string): RegExp {
  const [, source, flags] = /^\/(.*)\/([a-z]*)$/.exec(pattern) ?? [];
  if (source == null || flags == null) return new RegExp(pattern, "g");
  return new RegExp(source, flags.includes("g") ? flags : `${flags}g`);
}

export function compileTextlintPatterns(entries: readonly TextlintPatternEntry[]): CompiledTextlintPattern[] {
  return entries.map(({ message, pattern }) => ({
    message,
    regex: parseTextlintPattern(pattern),
  }));
}

export function loadTextlintPatterns(): CompiledTextlintPattern[] {
  return compileTextlintPatterns(textlintBase.rules["@textlint-rule/pattern"].patterns);
}

export function matchTextlintPatterns(text: string, patterns: readonly CompiledTextlintPattern[]): TextlintPatternMatch[] {
  const matches: TextlintPatternMatch[] = [];
  for (const { message, regex } of patterns) {
    regex.lastIndex = 0;
    for (;;) {
      const match = regex.exec(text);
      const matched = match?.[0];
      if (match == null || matched == null) break;
      matches.push({
        end: match.index + matched.length,
        message: `${message} ("${matched}")`,
        start: match.index,
      });
      if (matched.length === 0) regex.lastIndex += 1;
    }
  }
  return matches;
}
