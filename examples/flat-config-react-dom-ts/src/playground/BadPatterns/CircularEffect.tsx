import { useEffect, useState } from "react";

/**
 * @component
 * @description CircularEffect1 has a circular effect with a depth of 1
 */
export function CircularEffect1() {
  const [items, setItems] = useState([0, 1, 2, 3, 4]);

  useEffect(() => {
    setItems(x => [...x].reverse());
  }, [items]);

  return null;
}

/**
 * @component
 * @description CircularEffect2 has a circular effect with a depth of 2
 */
export function CircularEffect2() {
  const [items, setItems] = useState([0, 1, 2, 3, 4]);
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

/**
 * @component
 * @description CircularEffect3 has a circular effect with a depth of 3
 */
export function CircularEffect3() {
  const [items, setItems] = useState([0, 1, 2, 3, 4]);
  const [limit, setLimit] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setItems(x => [...x].reverse());
  }, [limit]);

  useEffect(() => {
    setCount(x => x + 1);
  }, [items]);

  useEffect(() => {
    setLimit(x => !x);
  }, [count]);

  return null;
}
