/* eslint-disable no-restricted-syntax */

import fs from "node:fs/promises";

import dedent from "dedent";
import { ofetch } from "ofetch";

const projects = [
  "AndreaPontrandolfo/sheriff",
  "antfu/eslint-config",
  "christopher-buss/roblox-ts-eslint-config",
  "DimensionDev/Maskbook",
  "dream-num/univer",
  "electric-sql/pglite",
  "ensdomains/ensdomains-landing",
  "hairyf/overlastic",
  "hipstersmoothie/react-window-splitter",
  "johannschopplich/unlazy",
  "luxdotdev/parsertime",
  "npmgraph/npmgraph",
  "react-navigation/react-navigation",
  "RebeccaStevens/eslint-config-rebeccastevens",
  "refined-github/refined-github",
  "RightCapitalHQ/frontend-style-guide",
  "RSSNext/follow",
  "satya164/PocketGear",
  "SukkaW/eslint-config-sukka",
  "SukkaW/foxact",
  "TanStack/form",
  "TanStack/query",
  "TanStack/router",
  "TanStack/store",
  "timkurvers/wine-log-explorer",
  "toss/suspensive",
  "upleveled/eslint-config-upleveled",
];

interface GitHubRepo {
  owner: {
    avatar_url: string;
  };
}

async function fetchGitHubAvatar(repo: string, token?: string): Promise<string> {
  const data = await ofetch<GitHubRepo>(`https://api.github.com/repos/${repo}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  return data.owner.avatar_url;
}

function buildUsedByWall(users: string[]) {
  // render 8 columns dymaic height grid layout with 16px gap
  return dedent`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
      <style>
        .avatar { width: 100px; height: 100px; }
      </style>
      ${
    users
      .map(
        (avatar, index) =>
          `<image class="avatar" x="${index % 8 * 116}" y="${Math.floor(index / 8) * 116}" xlink:href="${avatar}" />`,
      )
      .join("")
  }
    </svg>
  `;
}

async function main() {
  const token = process.env["GITHUB_TOKEN"];
  const avatars = await Promise.all(projects.map(async (repo) => fetchGitHubAvatar(repo, token)));
  const avatarsDeDup = Array.from(new Set(avatars));
  const svg = buildUsedByWall(avatarsDeDup);
  await fs.writeFile("website/public/used_by.svg", svg);
}

await main();
