import { Tabs } from "nextra-theme-docs";
import React from "react";

export type ESLintConfigProps = {
  defaultIndex?: number;
  children: React.ReactNode;
};

export function ESLintConfig({
  defaultIndex = 0,
  children,
}: ESLintConfigProps) {
  return (
    <Tabs
      defaultIndex={defaultIndex}
      items={["Using LegacyConfig", "Using FlatConfig"]}
    >
      {children}
    </Tabs>
  );
}

export { Tab as Config } from "nextra-theme-docs";
