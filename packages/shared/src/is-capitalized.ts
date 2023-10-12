export function isCapitalized(word: string) {
    if (!word) {
        return false;
    }
    const firstLetter = word.replace(/^_+/u, "").charAt(0);

    return firstLetter.toUpperCase() === firstLetter;
}
