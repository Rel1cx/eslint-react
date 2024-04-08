/* eslint-disable perfectionist/sort-objects */
const createHeaderPrinter = (level: number) => (content: string): string => `${"#".repeat(level)} ${content}\n\n`;

export const MarkdownPrinter = {
  bold: (s: string) => `**${s}**`,
  code: (content: string) => `\`${content}\``,
  link: (text: string, url: string) => `[${text}](${url})`,
  list: (...items: string[]) => items.map((item) => `- ${item}`).join("\n"),

  fence: (language: string, content: string) => "```" + language + "\n" + content + "\n" + "```\n\n",
  paragraph: (...content: string[]) => `\n${content.join("")}\n\n`,
  strikethrough: (content: string) => `~~${content}~~`,
  h1: createHeaderPrinter(1),
  h2: createHeaderPrinter(2),
  h3: createHeaderPrinter(3),
  h4: createHeaderPrinter(4),
} as const;
