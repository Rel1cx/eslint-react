/* eslint-disable no-restricted-syntax */
import fs from "node:fs/promises";

import { zip } from "effect/Array";
import { ofetch } from "ofetch";

const projects = [
  "DimensionDev/Maskbook",
  "dream-num/univer",
  "electric-sql/pglite",
  "ensdomains/ensdomains-landing",
  "flirtual/flirtual",
  "luxdotdev/parsertime",
  "ndom91/github-search-preview",
  "npmgraph/npmgraph",
  "react-navigation/react-navigation",
  "RebeccaStevens/eslint-config-rebeccastevens",
  "refined-github/refined-github",
  "Rel1cx/eslint-react",
  "TanStack/query",
  "toss/suspensive",
  "upleveled/eslint-config-upleveled",
  "zolplay-cn/config-monorepo",
];

interface GitHubRepo {
  owner: {
    avatar_url: string;
  };
}

async function fetchGitHubAvatar(repo: string): Promise<string> {
  const data = await ofetch<GitHubRepo>(`https://api.github.com/repos/${repo}`, {
    headers: {
      Authorization: `token ${process.env["GITHUB_TOKEN"]}`,
    },
  });
  return data.owner.avatar_url;
}

async function buildUsedBy(projects: string[]) {
  const avatars = await Promise.all(projects.map(async (repo) => fetchGitHubAvatar(repo)));
  return [
    '<div style="display: flex; flex-flow: row wrap; gap: 1rem;">',
    ...zip(projects, avatars)
      .map(([repo, avatar]) =>
        [
          `<a href="https://github.com/${repo}">`,
          `<img src="${avatar}" alt="${repo}" width="64" height="64" style="border-radius: 50%; background-color: #ffffff; border: 1px solid #1f232826;">`,
          "</a>",
        ].join("")
      ),
    "</div>",
  ].join("\n");
}

async function main() {
  const html = await buildUsedBy(projects);
  const readme = await fs.readFile("README.md", "utf-8");
  const start = "<!-- AUTO-GENERATED-CONTENT:START (used-by) -->";
  const end = "<!-- AUTO-GENERATED-CONTENT:END -->";
  if (!readme.includes(start) || !readme.includes(end)) throw new Error("README.md does not contain the markers");
  const before = readme.slice(0, readme.indexOf(start) + start.length);
  const after = readme.slice(readme.indexOf(end));
  const readmeUpdated = [before, html, after].join("\n");
  await fs.writeFile("README.md", readmeUpdated);
}

await main();
