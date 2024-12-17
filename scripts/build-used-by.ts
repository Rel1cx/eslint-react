/* eslint-disable better-mutation/no-mutation */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-restricted-syntax */

import fs from "node:fs/promises";

import { createCanvas, loadImage } from "@napi-rs/canvas";
import { ofetch } from "ofetch";
import { x } from "tinyexec";

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
  "Rel1cx/compose-components",
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

async function fetchGitHubAvatar(repo: string, token?: string): Promise<string> {
  const data = await ofetch<GitHubRepo>(`https://api.github.com/repos/${repo}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  return data.owner.avatar_url;
}

async function buildUsedByImage(users: string[]) {
  const gap = 64;
  const width = 3840;
  const height = Math.ceil(users.length / 8) * (width / 8);
  const getItemX = (index: number) => index % 8 * (width / 8) + gap / 2;
  const getItemY = (index: number) => Math.floor(index / 8) * (width / 8) + gap / 2;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d", { alpha: true, colorSpace: "srgb" });
  ctx.fillStyle = "#FFFFFF00";
  ctx.fillRect(0, 0, width, height);
  for (const [index, avatar] of users.entries()) {
    const x = getItemX(index);
    const y = getItemY(index);
    const image = await loadImage(avatar);
    ctx.save();
    ctx.beginPath();
    ctx.arc(x + (width / 8 - gap) / 2, y + (width / 8 - gap) / 2, (width / 8 - gap) / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x, y, width / 8 - gap, width / 8 - gap);
    ctx.drawImage(image, x, y, width / 8 - gap, width / 8 - gap);
    ctx.strokeStyle = "#d1d9e070";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();
  }
  const displayWidth = width / 2;
  const displayHeight = height / 2;
  const displayCanvas = createCanvas(displayWidth, displayHeight);
  const displayCtx = displayCanvas.getContext("2d", { alpha: true, colorSpace: "srgb" });
  displayCtx.drawImage(canvas, 0, 0, displayWidth, displayHeight);
  return displayCanvas.encode("png");
}

const token = process.env["GITHUB_TOKEN"];
const avatars = await Promise.all(projects.map(async (repo) => fetchGitHubAvatar(repo, token)));
const avatarsDeDup = Array.from(new Set(avatars));
const img = await buildUsedByImage(avatarsDeDup);
await fs.writeFile("website/assets/used_by.png", img);
await fs.writeFile("website/public/used_by.png", img);
await x("oxipng", ["./website/assets/used_by.png"]);
await x("oxipng", ["./website/public/used_by.png"]);
