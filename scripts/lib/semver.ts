export const isStableVersion = (s: string) => /^\d+\.\d+\.\d+$/.test(s);

export const isBetaVersion = (s: string) => /^\d+\.\d+\.\d+-beta\.\d+$/.test(s);

export const isNextVersion = (s: string) => /^\d+\.\d+\.\d+-next\.\d+$/.test(s);

export const isVersion = (s: string) => isNextVersion(s) || isBetaVersion(s) || isStableVersion(s);
