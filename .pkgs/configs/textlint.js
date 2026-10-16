import textlintBase from "./textlint.base.json" with { type: "json" };
export function parseTextlintPattern(pattern) {
    const [, source, flags] = /^\/(.*)\/([a-z]*)$/.exec(pattern) ?? [];
    if (source == null || flags == null)
        return new RegExp(pattern, "g");
    return new RegExp(source, flags.includes("g") ? flags : `${flags}g`);
}
export function compileTextlintPatterns(entries) {
    return entries.map(({ message, pattern }) => ({
        message,
        regex: parseTextlintPattern(pattern),
    }));
}
export function loadTextlintPatterns() {
    return compileTextlintPatterns(textlintBase.rules["@textlint-rule/pattern"].patterns);
}
export function matchTextlintPatterns(text, patterns) {
    const matches = [];
    for (const { message, regex } of patterns) {
        regex.lastIndex = 0;
        for (;;) {
            const match = regex.exec(text);
            const matched = match?.[0];
            if (match == null || matched == null)
                break;
            matches.push({
                end: match.index + matched.length,
                message: `${message} ("${matched}")`,
                start: match.index,
            });
            if (matched.length === 0)
                regex.lastIndex += 1;
        }
    }
    return matches;
}
