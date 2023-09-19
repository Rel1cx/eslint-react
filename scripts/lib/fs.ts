export function copyFile(src: string, dest: string) {
    return Bun.write(dest, Bun.file(src));
}
