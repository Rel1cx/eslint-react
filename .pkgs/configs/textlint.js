import textlintConfig from "./textlint.base.json" with { type: "json" };
export function compile({ message, pattern }) {
    if (pattern.startsWith("/")) {
        const lastSlash = pattern.lastIndexOf("/");
        if (lastSlash > 0) {
            const flags = pattern.slice(lastSlash + 1);
            return {
                message,
                regex: new RegExp(pattern.slice(1, lastSlash), flags.includes("g") ? flags : `${flags}g`),
            };
        }
    }
    return { message, regex: new RegExp(pattern, "g") };
}
export function loadDefaults() {
    return textlintConfig.rules["@textlint-rule/pattern"].patterns.map(compile);
}
export function lint(text, patterns) {
    const reports = [];
    for (const { message, regex } of patterns) {
        for (const match of text.matchAll(regex)) {
            const start = match.index;
            reports.push({ message: `${message} ("${match[0]}")`, range: { start, end: start + match[0].length } });
        }
    }
    return reports.sort((a, b) => a.range.start - b.range.start);
}
