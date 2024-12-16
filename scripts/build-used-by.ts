/* eslint-disable no-mixed-operators */
/* eslint-disable no-restricted-syntax */

import fs from "node:fs/promises";

import { createCanvas, loadImage } from "@napi-rs/canvas";
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

async function fetchGitHubAvatar(repo: string, token?: string): Promise<string> {
  const data = await ofetch<GitHubRepo>(`https://api.github.com/repos/${repo}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  return data.owner.avatar_url;
}

async function buildUsedByImage(users: string[]) {
  const gap = 16;
  const viewWidth = 1024;
  const viewHeight = users.length / 8 * (viewWidth / 8);
  const getItemX = (index: number) => index % 8 * (viewWidth / 8) + gap * 0.5;
  const getItemY = (index: number) => Math.floor(index / 8) * (viewWidth / 8) + gap * 0.5;
  const canvas = createCanvas(viewWidth, viewHeight);
  const ctx = canvas.getContext("2d");
  for (const [index, avatar] of users.entries()) {
    const x = getItemX(index);
    const y = getItemY(index);
    const image = await loadImage(avatar);
    ctx.drawImage(image, x, y, viewWidth / 8 - gap, viewWidth / 8 - gap);
  }
  return canvas.encode("png");
}

const token = process.env["GITHUB_TOKEN"];
const avatars = await Promise.all(projects.map(async (repo) => fetchGitHubAvatar(repo, token)));
const avatarsDeDup = Array.from(new Set(avatars));
const img = await buildUsedByImage(avatarsDeDup);
await fs.writeFile("website/assets/used_by.png", img);
await fs.writeFile("website/public/used_by.png", img);
