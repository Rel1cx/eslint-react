import { Card, Cards } from "fumadocs-ui/components/card";

const presets = [
  {
    description: "Anthony's ESLint config preset",
    name: "antfu/eslint-config",
    link: "https://github.com/antfu/eslint-config",
  },
  {
    description: "Rebecca's ESLint config preset",
    name: "eslint-config-rebeccastevens",
    link: "https://github.com/RebeccaStevens/eslint-config-rebeccastevens",
  },
  {
    description: "A comprehensive and opinionated Typescript-first ESLint configuration",
    name: "eslint-config-sheriff",
    link: "https://github.com/AndreaPontrandolfo/sheriff",
  },
  {
    description: "Sukka's ESLint config preset",
    name: "eslint-config-sukka",
    link: "https://github.com/SukkaW/eslint-config-sukka",
  },
];

export function CommunityPresets() {
  return (
    <Cards className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {presets.map((preset) => (
        <Card description={preset.description} href={preset.link} key={preset.name} title={preset.name} />
      ))}
    </Cards>
  );
}
