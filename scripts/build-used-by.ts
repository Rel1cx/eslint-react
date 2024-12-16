/* eslint-disable no-mixed-operators */
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
  "Rel1cx/compose-components",
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

async function imageUrlToBase64(url: string) {
  const res: Blob = await ofetch(url);
  const buffer = await res.arrayBuffer();
  return `data:${res.type};base64,${Buffer.from(buffer).toString("base64")}`;
}

async function fetchGitHubAvatar(repo: string, token?: string): Promise<string> {
  const data = await ofetch<GitHubRepo>(`https://api.github.com/repos/${repo}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  const url = data.owner.avatar_url;
  return imageUrlToBase64(url);
}

function buildUsedByWall(users: string[]) {
  const viewWidth = 1024;
  const viewHeight = users.length / 8 * (viewWidth / 8);
  const gap = 16;
  const getItemX = (index: number) => index % 8 * (viewWidth / 8) + gap * 0.5;
  const getItemY = (index: number) => Math.floor(index / 8) * (viewWidth / 8) + gap * 0.5;
  return dedent`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewWidth} ${viewHeight}">
      <style>
        .avatar { width: ${viewWidth / 8 - gap}px; height: ${viewWidth / 8 - gap}px; }
      </style>
      ${
    users
      .map(
        (avatar, index) => `<image class="avatar" x="${getItemX(index)}" y="${getItemY(index)}" href="${avatar}" />`,
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
