import { Tabs } from "nextra/components";
import React from "react";

export interface ESLintConfigProps {
  defaultIndex?: number;
  children: React.ReactNode;
}

const ConfigItems = ["FlatConfig", "LegacyConfig"];

export function ESLintConfig({
  defaultIndex = 0,
  children,
}: ESLintConfigProps) {
  return (
    <Tabs
      defaultIndex={defaultIndex}
      items={ConfigItems}
    >
      {children}
    </Tabs>
  );
}

export const Config = Tabs.Tab;
