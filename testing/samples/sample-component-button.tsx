import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export function Button({ children }: ButtonProps) {
  return <button type="button">{children}</button>;
}
