import { Tabs } from "nextra/components";
import React from "react";

export interface ESLintConfigTabsProps {
  defaultIndex?: number;
  children: React.ReactNode;
}

const ConfigItems = ["Flat Config", "Legacy Config"];

export function ESLintConfigTabs({
  defaultIndex = 0,
  children,
}: ESLintConfigTabsProps) {
  return (
    <Tabs
      defaultIndex={defaultIndex}
      items={ConfigItems}
    >
      {children}
    </Tabs>
  );
}

export const ConfigTab = Tabs.Tab;
