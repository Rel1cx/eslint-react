import { Atom } from "@effect-atom/atom-react";
import * as Option from "effect/Option";

function getHash() {
  const hash = location.hash.slice(1);
  if (hash.length > 0) {
    return Option.some(hash);
  }
  return Option.none<string>();
}

export const hashAtom = Atom.make<Option.Option<string>>((get) => {
  function onHashChange() {
    get.setSelf(getHash());
  }
  window.addEventListener("hashchange", onHashChange);
  get.addFinalizer(() => {
    window.removeEventListener("hashchange", onHashChange);
  });
  return getHash();
});
