export function trimLikeReact(text: string) {
  const leadingSpaces = /^\s*/u.exec(text)?.[0];
  const trailingSpaces = /\s*$/u.exec(text)?.[0];

  const start = leadingSpaces?.includes("\n") ? leadingSpaces.length : 0;
  const end = trailingSpaces?.includes("\n") ? text.length - trailingSpaces.length : text.length;

  return text.slice(start, end);
}
