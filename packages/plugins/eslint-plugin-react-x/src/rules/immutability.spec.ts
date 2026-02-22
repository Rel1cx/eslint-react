import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./immutability";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // -------------------------------------------------------------------------
    // Mutating array methods on state
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([1, 2, 3]);
          const addItem = () => {
            items.push(4);
            setItems(items);
          };
          return <div>{items.length}</div>;
        }
      `,
      errors: [{
        messageId: "mutatingArrayMethod",
        data: { method: "push", name: "items" },
      }],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([3, 1, 2]);
          const sortItems = () => {
            setItems(items.sort());
          };
          return <div>{items.length}</div>;
        }
      `,
      errors: [{
        messageId: "mutatingArrayMethod",
        data: { method: "sort", name: "items" },
      }],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([1, 2, 3]);
          const removeFirst = () => {
            items.shift();
            setItems(items);
          };
          return <div>{items.length}</div>;
        }
      `,
      errors: [{
        messageId: "mutatingArrayMethod",
        data: { method: "shift", name: "items" },
      }],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([1, 2, 3]);
          const removeLast = () => {
            items.pop();
            setItems(items);
          };
          return <div>{items.length}</div>;
        }
      `,
      errors: [{
        messageId: "mutatingArrayMethod",
        data: { method: "pop", name: "items" },
      }],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([1, 2, 3]);
          const removeItem = (index) => {
            items.splice(index, 1);
            setItems(items);
          };
          return <div>{items.length}</div>;
        }
      `,
      errors: [{
        messageId: "mutatingArrayMethod",
        data: { method: "splice", name: "items" },
      }],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([1, 2, 3]);
          const reverseItems = () => {
            items.reverse();
            setItems(items);
          };
          return <div>{items.length}</div>;
        }
      `,
      errors: [{
        messageId: "mutatingArrayMethod",
        data: { method: "reverse", name: "items" },
      }],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([1, 2, 3]);
          const prependItem = () => {
            items.unshift(0);
            setItems(items);
          };
          return <div>{items.length}</div>;
        }
      `,
      errors: [{
        messageId: "mutatingArrayMethod",
        data: { method: "unshift", name: "items" },
      }],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([1, 2, 3, 4, 5]);
          const fillItems = () => {
            items.fill(0);
            setItems(items);
          };
          return <div>{items.length}</div>;
        }
      `,
      errors: [{
        messageId: "mutatingArrayMethod",
        data: { method: "fill", name: "items" },
      }],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([1, 2, 3, 4, 5]);
          const copyWithinItems = () => {
            items.copyWithin(0, 3);
            setItems(items);
          };
          return <div>{items.length}</div>;
        }
      `,
      errors: [{
        messageId: "mutatingArrayMethod",
        data: { method: "copyWithin", name: "items" },
      }],
    },
    // -------------------------------------------------------------------------
    // Array index assignment on state
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([1, 2, 3]);
          const updateFirst = () => {
            items[0] = 10;
            setItems(items);
          };
          return <div>{items.length}</div>;
        }
      `,
      errors: [{
        messageId: "mutatingAssignment",
        data: { name: "items" },
      }],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [matrix, setMatrix] = useState([[1, 2], [3, 4]]);
          const updateNested = () => {
            matrix[0][1] = 99;
            setMatrix(matrix);
          };
          return <div>{matrix.length}</div>;
        }
      `,
      errors: [{
        messageId: "mutatingAssignment",
        data: { name: "matrix[0]" },
      }],
    },
    // -------------------------------------------------------------------------
    // Direct property assignment on state objects
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [user, setUser] = useState({ name: "Alice" });
          const updateName = () => {
            user.name = "Bob";
            setUser(user);
          };
          return <div>{user.name}</div>;
        }
      `,
      errors: [{
        messageId: "mutatingAssignment",
        data: { name: "user" },
      }],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [user, setUser] = useState({
            name: "Alice",
            settings: { theme: "light", notifications: true },
          });
          const toggleTheme = () => {
            user.settings.theme = "dark";
            setUser(user);
          };
          return <div>{user.settings.theme}</div>;
        }
      `,
      errors: [{
        messageId: "mutatingAssignment",
        data: { name: "user.settings" },
      }],
    },
    // -------------------------------------------------------------------------
    // Mutations directly in render
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([3, 1, 2]);
          setItems(items.sort());
          return <div>{items.length}</div>;
        }
      `,
      errors: [{
        messageId: "mutatingArrayMethod",
        data: { method: "sort", name: "items" },
      }],
    },
    // -------------------------------------------------------------------------
    // Mutations inside hooks
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function useItems() {
          const [items, setItems] = useState([1, 2, 3]);
          const addItem = () => {
            items.push(4);
            setItems(items);
          };
          return { items, addItem };
        }
      `,
      errors: [{
        messageId: "mutatingArrayMethod",
        data: { method: "push", name: "items" },
      }],
    },
    // -------------------------------------------------------------------------
    // Props object direct mutation
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component(props) {
          props.name = "Bob";
          return <div>{props.name}</div>;
        }
      `,
      errors: [{
        messageId: "mutatingAssignment",
        data: { name: "props" },
      }],
    },
    {
      code: tsx`
        function Component(props) {
          const handleClick = () => {
            props.items.push(4);
          };
          return <button onClick={handleClick}>Add</button>;
        }
      `,
      errors: [{
        messageId: "mutatingArrayMethod",
        data: { method: "push", name: "props.items" },
      }],
    },
    {
      code: tsx`
        function Component(props) {
          props.items[0] = "new value";
          return <div>{props.items[0]}</div>;
        }
      `,
      errors: [{
        messageId: "mutatingAssignment",
        data: { name: "props.items" },
      }],
    },
    {
      code: tsx`
        function Component(props) {
          props.user.settings.theme = "dark";
          return <div>{props.user.settings.theme}</div>;
        }
      `,
      errors: [{
        messageId: "mutatingAssignment",
        data: { name: "props.user.settings" },
      }],
    },
    // -------------------------------------------------------------------------
    // Mutations in useCallback
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState, useCallback } from "react";

        function Component() {
          const [items, setItems] = useState([1, 2, 3]);

          const addItem = useCallback(() => {
            items.push(4);
            setItems(items);
          }, [items, setItems]);

          return <button onClick={addItem}>Add</button>;
        }
      `,
      errors: [{
        messageId: "mutatingArrayMethod",
        data: { method: "push", name: "items" },
      }],
    },
    // -------------------------------------------------------------------------
    // Mutations in useEffect
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState, useEffect } from "react";

        function Component() {
          const [items, setItems] = useState([1, 2, 3]);

          useEffect(() => {
            items.sort();
            setItems(items);
          }, []);

          return <div>{items.length}</div>;
        }
      `,
      errors: [{
        messageId: "mutatingArrayMethod",
        data: { method: "sort", name: "items" },
      }],
    },
    // -------------------------------------------------------------------------
    // Multiple mutations in same function
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([1, 2, 3]);
          const modifyItems = () => {
            items.push(4);
            items.sort();
            setItems(items);
          };
          return <div>{items.length}</div>;
        }
      `,
      errors: [
        {
          messageId: "mutatingArrayMethod",
          data: { method: "push", name: "items" },
        },
        {
          messageId: "mutatingArrayMethod",
          data: { method: "sort", name: "items" },
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    // -------------------------------------------------------------------------
    // Creating new arrays instead of mutating
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([1, 2, 3]);
          const addItem = () => {
            setItems([...items, 4]);
          };
          return <div>{items.length}</div>;
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([3, 1, 2]);
          const sortItems = () => {
            setItems([...items].sort());
          };
          return <div>{items.length}</div>;
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([1, 2, 3]);
          const removeFirst = () => {
            setItems(items.slice(1));
          };
          return <div>{items.length}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Creating new objects instead of mutating
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [user, setUser] = useState({ name: "Alice" });
          const updateName = () => {
            setUser({ ...user, name: "Bob" });
          };
          return <div>{user.name}</div>;
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [user, setUser] = useState({
            name: "Alice",
            settings: { theme: "light", notifications: true },
          });
          const toggleTheme = () => {
            setUser({
              ...user,
              settings: { ...user.settings, theme: "dark" },
            });
          };
          return <div>{user.settings.theme}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Mutations on local (non-state, non-props) variables are fine
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([3, 1, 2]);
          const sortItems = () => {
            const copy = [...items];
            copy.sort();
            setItems(copy);
          };
          return <div>{items.length}</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const localItems = [3, 1, 2];
          localItems.sort();
          return <div>{localItems.length}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Non-component/hook functions are not checked
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function notAComponent() {
          const items = [1, 2, 3];
          items.push(4);
          return items;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Using Object.assign to create new objects
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [user, setUser] = useState({ name: "Alice", age: 25 });
          const updateUser = () => {
            setUser(Object.assign({}, user, { age: 26 }));
          };
          return <div>{user.name}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Using Array.from to create new arrays
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([1, 2, 3]);
          const doubleItems = () => {
            setItems(Array.from(items, x => x * 2));
          };
          return <div>{items.length}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Using structuredClone for deep copy
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [user, setUser] = useState({ name: "Alice", settings: { theme: "light" } });
          const deepUpdate = () => {
            const newUser = structuredClone(user);
            newUser.settings.theme = "dark";
            setUser(newUser);
          };
          return <div>{user.name}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Using JSON parse/stringify for deep copy (common pattern)
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [user, setUser] = useState({ name: "Alice", settings: { theme: "light" } });
          const deepUpdate = () => {
            const newUser = JSON.parse(JSON.stringify(user));
            newUser.settings.theme = "dark";
            setUser(newUser);
          };
          return <div>{user.name}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Using non-mutating array methods: slice, concat, flat, flatMap
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([1, 2, 3]);
          const sliced = items.slice(0, 2);
          const merged = items.concat([4, 5]);
          const flat = [[1, 2], [3, 4]].flat();
          const mapped = items.flatMap(x => [x, x * 2]);
          return <div>{sliced.length + merged.length}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Using non-mutating array methods: find, some, every, includes, indexOf
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([1, 2, 3]);
          const found = items.find(x => x > 1);
          const hasItem = items.some(x => x === 2);
          const allPositive = items.every(x => x > 0);
          const includesTwo = items.includes(2);
          const index = items.indexOf(2);
          const lastIndex = items.lastIndexOf(2);
          const joined = items.join(", ");
          return <div>{joined}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Using toSorted, toReversed, toSpliced (new non-mutating methods)
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([3, 1, 2]);
          const sorted = items.toSorted();
          const reversed = items.toReversed();
          const spliced = items.toSpliced(1, 1);
          return <div>{sorted.join(", ")}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Using Object.entries/keys/values for iteration
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [user, setUser] = useState({ name: "Alice", age: 25 });
          const keys = Object.keys(user);
          const values = Object.values(user);
          const entries = Object.entries(user);
          return <div>{keys.join(", ")}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Destructuring state values (still valid)
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [user, setUser] = useState({ name: "Alice", age: 25 });
          const { name, age } = user;
          return <div>{name} is {age}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Using useReducer instead of useState
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useReducer } from "react";

        function reducer(state, action) {
          switch (action.type) {
            case "add":
              return { ...state, items: [...state.items, action.payload] };
            default:
              return state;
          }
        }

        function Component() {
          const [state, dispatch] = useReducer(reducer, { items: [1, 2, 3] });
          return <div>{state.items.length}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Calling setter with functional update form
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [count, setCount] = useState(0);
          const [items, setItems] = useState([1, 2, 3]);
          const increment = () => setCount(c => c + 1);
          const addItem = () => setItems(prev => [...prev, 4]);
          return <div>{count}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Using immutable update patterns with nested objects
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [state, setState] = useState({
            users: [
              { id: 1, name: "Alice", settings: { theme: "light" } },
              { id: 2, name: "Bob", settings: { theme: "dark" } },
            ],
          });

          const updateUserTheme = (userId, theme) => {
            setState(prev => ({
              ...prev,
              users: prev.users.map(user =>
                user.id === userId
                  ? { ...user, settings: { ...user.settings, theme } }
                  : user
              ),
            }));
          };

          return <div>{state.users.length}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Props destructuring (reading is fine)
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component({ name, items, onClick }) {
          const firstItem = items[0];
          const itemCount = items.length;
          return <div onClick={onClick}>{name}: {itemCount} items</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Using static class properties (not mutation)
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { Component } from "react";

        class MyComponent extends Component {
          static defaultProps = { name: "Default" };

          render() {
            return <div>{this.props.name}</div>;
          }
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Chained non-mutating array operations
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([1, 2, 3, 4, 5]);
          const processed = items
            .filter(x => x > 2)
            .map(x => x * 2)
            .slice(0, 2);
          return <div>{processed.join(", ")}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Using at(), findIndex(), findLast() methods
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([1, 2, 3, 4, 5]);
          const first = items.at(0);
          const last = items.at(-1);
          const idx = items.findIndex(x => x === 3);
          return <div>{first} - {last} at {idx}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Reading (non-mutating) array methods on state are fine
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([1, 2, 3]);
          const doubled = items.map((x) => x * 2);
          return <ul>{doubled.map((x) => <li key={x}>{x}</li>)}</ul>;
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([1, 2, 3]);
          const filtered = items.filter((x) => x > 1);
          return <ul>{filtered.map((x) => <li key={x}>{x}</li>)}</ul>;
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([1, 2, 3]);
          const sum = items.reduce((acc, x) => acc + x, 0);
          return <div>{sum}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Reading state properties is fine
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [user, setUser] = useState({ name: "Alice" });
          const greet = () => console.log(user.name);
          return <button onClick={greet}>Greet</button>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Using immer produce with useState
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";
        import { produce } from "immer";

        function Component() {
          const [user, setUser] = useState({ name: "Alice", age: 25 });
          const updateName = () => {
            setUser(produce(user, draft => {
              draft.name = "Bob";
            }));
          };
          return <div>{user.name}</div>;
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";
        import { produce } from "immer";

        function Component() {
          const [items, setItems] = useState([1, 2, 3]);
          const addItem = () => {
            setUser(produce(items, draft => {
              draft.push(4);
            }));
          };
          return <div>{items.length}</div>;
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";
        import { produce } from "immer";

        function Component() {
          const [items, setItems] = useState([3, 1, 2]);
          const sortItems = () => {
            setItems(produce(items, draft => {
              draft.sort();
            }));
          };
          return <div>{items.length}</div>;
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";
        import { produce } from "immer";

        function Component() {
          const [user, setUser] = useState({
            name: "Alice",
            settings: { theme: "light", notifications: true },
          });
          const toggleTheme = () => {
            setUser(produce(user, draft => {
              draft.settings.theme = "dark";
            }));
          };
          return <div>{user.settings.theme}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Using immer produce with functional update form
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";
        import { produce } from "immer";

        function Component() {
          const [items, setItems] = useState([1, 2, 3]);
          const addItem = () => {
            setItems(prev => produce(prev, draft => {
              draft.push(4);
            }));
          };
          return <div>{items.length}</div>;
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";
        import { produce } from "immer";

        function Component() {
          const [user, setUser] = useState({ name: "Alice", age: 25 });
          const updateAge = () => {
            setUser(prev => produce(prev, draft => {
              draft.age += 1;
            }));
          };
          return <div>{user.age}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Using useImmer hook from use-immer
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useImmer } from "use-immer";

        function Component() {
          const [user, setUser] = useImmer({ name: "Alice", age: 25 });
          const updateName = () => {
            setUser(draft => {
              draft.name = "Bob";
            });
          };
          return <div>{user.name}</div>;
        }
      `,
    },
    {
      code: tsx`
        import { useImmer } from "use-immer";

        function Component() {
          const [items, setItems] = useImmer([1, 2, 3]);
          const addItem = () => {
            setItems(draft => {
              draft.push(4);
            });
          };
          return <div>{items.length}</div>;
        }
      `,
    },
    {
      code: tsx`
        import { useImmer } from "use-immer";

        function Component() {
          const [items, setItems] = useImmer([3, 1, 2]);
          const sortItems = () => {
            setItems(draft => {
              draft.sort();
            });
          };
          return <div>{items.length}</div>;
        }
      `,
    },
    {
      code: tsx`
        import { useImmer } from "use-immer";

        function Component() {
          const [user, setUser] = useImmer({
            name: "Alice",
            settings: { theme: "light", notifications: true },
          });
          const toggleTheme = () => {
            setUser(draft => {
              draft.settings.theme = "dark";
            });
          };
          return <div>{user.settings.theme}</div>;
        }
      `,
    },
    {
      code: tsx`
        import { useImmer } from "use-immer";

        function Component() {
          const [state, setState] = useImmer({
            users: [
              { id: 1, name: "Alice", settings: { theme: "light" } },
              { id: 2, name: "Bob", settings: { theme: "dark" } },
            ],
          });

          const updateUserTheme = (userId, theme) => {
            setState(draft => {
              const user = draft.users.find(u => u.id === userId);
              if (user) {
                user.settings.theme = theme;
              }
            });
          };

          return <div>{state.users.length}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Using immer with nested produce calls
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";
        import { produce } from "immer";

        function Component() {
          const [state, setState] = useState({
            items: [{ id: 1, values: [1, 2, 3] }],
          });
          const updateNested = () => {
            setState(produce(state, draft => {
              draft.items[0].values.push(4);
            }));
          };
          return <div>{state.items[0].values.length}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Using immer produce with curried form
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";
        import { produce } from "immer";

        function Component() {
          const [user, setUser] = useState({ name: "Alice", age: 25 });
          const updateName = (newName) => {
            setUser(produce(draft => {
              draft.name = newName;
            })(user));
          };
          return <div>{user.name}</div>;
        }
      `,
    },
  ],
});
