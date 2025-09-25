import { Atom } from "@effect-atom/atom-react";

function getTheme(): "light" | "dark" {
  const selected = localStorage?.getItem("starlight-theme") ?? "system";
  if (selected === "light" || selected === "dark") {
    return selected;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export const themeAtom = Atom.make<"light" | "dark">((get) => {
  const observer = new MutationObserver(function() {
    get.setSelf(getTheme());
  });
  get.addFinalizer(() => {
    observer.disconnect();
  });
  observer.observe(document.documentElement, {
    attributeFilter: ["data-theme"],
  });
  return getTheme();
});
