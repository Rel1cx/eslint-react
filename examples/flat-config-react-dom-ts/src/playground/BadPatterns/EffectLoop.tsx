import { useEffect, useState } from "react";

// TODO: Add a rule to detect this pattern
export function EffectLoop() {
  const [items, setItems] = useState([4, 3, 2, 1, 0]);
  const [limit, setLimit] = useState(false);

  useEffect(() => {
    setItems(x => [...x].reverse());
  }, [limit]);

  // ...Many other hooks between the two `useEffect` calls

  useEffect(() => {
    setLimit(x => !x);
  }, [items]);
  // ...

  return null;
}
