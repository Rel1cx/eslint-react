import { Tabs } from "nextra/components";
import React from "react";

export interface ESLintConfigProps {
  defaultIndex?: number;
  children: React.ReactNode;
}

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

export const Config = Tabs.Tab;
