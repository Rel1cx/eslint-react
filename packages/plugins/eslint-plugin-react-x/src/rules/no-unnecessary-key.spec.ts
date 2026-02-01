import tsx from "dedent";

import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-unnecessary-key";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // Invalid:  unnecessary key on a child element in a map
    {
      code: tsx`
        things.map(thing => <div key={thing.id}><p key='child-1' /></div>)
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: redundant key on a direct child when the parent Fragment already has the key
    {
      code: tsx`
        things.map(thing => <React.Fragment key={thing.id}><div key={thing.id}>{thing.name}</div></React. Fragment>)
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: multiple unnecessary keys on child elements
    {
      code: tsx`
        things.map(thing => <div key={thing.id}><p key='child-1' /><span key='child-2' /></div>)
      `,
      errors: [{ messageId: "default" }, { messageId: "default" }],
    },
    {
      code: tsx`
        things.map(function(thing) { return <div key={thing.id}><i key='icon' /></div>; })
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: unnecessary key in a nested map call
    {
      code: tsx`
        outers.map(outer => <div key={outer.id}>{inners.map(inner => <p key={inner.id}><span key='extra' /></p>)}</div>)
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: deeply nested unnecessary keys
    {
      code: tsx`
        things.map(thing => (
          <div key={thing.id}>
            <section>
              <article>
                <p key="deep-nested">Content</p>
              </article>
            </section>
          </div>
        ))
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: key on self-closing child element
    {
      code: tsx`
        things.map(thing => <ul key={thing.id}><li key="item" /></ul>)
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: multiple levels of unnecessary keys
    {
      code: tsx`
        things.map(thing => (
          <div key={thing. id}>
            <ul key="list">
              <li key="item">Content</li>
            </ul>
          </div>
        ))
      `,
      errors: [{ messageId: "default" }, { messageId: "default" }],
    },
    // Invalid: key on element inside JSX expression container
    {
      code: tsx`
        things.map(thing => <div key={thing.id}>{true && <span key="conditional-child" />}</div>)
      `,
      errors: [{ messageId: "default" }],
    },
  ],
  valid: [
    tsx`
      <React.Fragment key="static-key" />
    `,
    tsx`
      <React.Fragment key="static-key"></React.Fragment>
    `,
    // Valid: key on the top-level element in a map
    tsx`
      things.map(thing => <div key={thing.id} />)
    `,
    // Valid: key on the top-level React. Fragment in a map
    tsx`
      things.map(thing => <React.Fragment key={thing.id}><div /></React.Fragment>)
    `,
    // Valid: key on the top-level element returned from a function expression in a map
    tsx`
      things.map(function(thing) { return <p key={thing.id} />; })
    `,
    tsx`
      const element = <div key='1' />;
    `,
    tsx`
      const elements = [<div key='1' />, <div key='2' />]
    `,
    // Valid: child elements without a key prop
    tsx`
      things.map(thing => <div key={thing.id}><p>Hello</p></div>)
    `,
    tsx`
      things.map(thing => <div key={thing.id}><p {... props} key='child-1' /></div>);
    `,
    tsx`
      things.map(thing => <div key={thing.id}><p key='child-1' {... props} /></div>);
    `,
    tsx`
      function IResetChildrenOnWritingDirectionChange1({ lang = "en", children }: { lang?: "en" | "fr" | "ar"; children: React.ReactNode }) {
        return (
          <div>
            {lang === "en" && <div key="ltr">{children}</div>}
            {lang === "fr" && <div key="ltr">{children}</div>}
            {lang === "ar" && <div key="rtl">{children}</div>}
          </div>
        );
      }
    `,
    tsx`
      function IResetChildrenOnWritingDirectionChange2({ lang = "en", children }: { lang?: "en" | "fr" | "ar"; children: React.ReactNode }) {
        if (lang === "ar") return <div key="rtl">{children}</div>;
        return <div>{children}</div>;
      }
    `,
    tsx`
      function IResetChildrenOnWritingDirectionChange2({ lang = "en", children }: { lang?: "en" | "fr" | "ar"; children: React.ReactNode }) {
        if (lang === "ar") return <div key="rtl">{children}</div>;
        return <div key="ltr">{children}</div>;
      }
    `,
    // Valid: key in ternary expression (conditional rendering)
    tsx`
      function Component({ isActive }) {
        return isActive ?  <div key="active" /> :  <div key="inactive" />;
      }
    `,
    // Valid: key in logical AND expression
    tsx`
      function Component({ show }) {
        return show && <div key="conditional" />;
      }
    `,
    // Valid: key in logical OR expression
    tsx`
      function Component({ element }) {
        return element || <div key="fallback" />;
      }
    `,
    // Valid: key in nullish coalescing expression
    tsx`
      function Component({ element }) {
        return element ?? <div key="default" />;
      }
    `,
    // Valid: key on top-level element in flatMap
    tsx`
      things.flatMap(thing => <div key={thing.id} />)
    `,
    // Valid: key on top-level element in filter().map() chain
    tsx`
      things.filter(Boolean).map(thing => <div key={thing.id} />)
    `,
    // Valid: key on element returned from switch statement
    tsx`
      function Component({ type }) {
        switch (type) {
          case 'a':  return <div key="a" />;
          case 'b':  return <div key="b" />;
          default: return <div key="default" />;
        }
      }
    `,
    // Valid: key on element in if-else branches
    tsx`
      function Component({ condition }) {
        if (condition) {
          return <div key="true-branch" />;
        } else {
          return <div key="false-branch" />;
        }
      }
    `,
    // Valid: key on nested map (inner map needs its own key)
    tsx`
      outers.map(outer => (
        <div key={outer. id}>
          {outer.inners.map(inner => <span key={inner.id} />)}
        </div>
      ))
    `,
    // Valid: key on element stored in variable then used in array
    tsx`
      const item1 = <div key="1" />;
      const item2 = <div key="2" />;
      const items = [item1, item2];
    `,
    // Valid: Fragment shorthand in map with keyed children
    tsx`
      things.map(thing => <React.Fragment key={thing.id}><span /><span /></React.Fragment>)
    `,
    // Valid: key on top-level element in async map-like pattern
    tsx`
      Promise.all(things.map(async thing => <div key={thing. id} />))
    `,
    // Valid: key on object property value in array context
    tsx`
      const config = {
        items: [<div key="config-1" />, <div key="config-2" />]
      };
    `,
    // Valid: key on element in reduce accumulator
    tsx`
      items.reduce((acc, item) => [...acc, <div key={item.id} />], [])
    `,
    // Valid: key with spread attribute (should be skipped)
    tsx`
      things.map(thing => <div {... props} key={thing.id} />)
    `,
    // Valid: key in early return pattern
    tsx`
      function Component({ items }) {
        if (! items. length) return <div key="empty">No items</div>;
        return items.map(item => <div key={item.id}>{item.name}</div>);
      }
    `,
    // Valid: key on cloned element pattern (common in HOCs)
    tsx`
      children.map((child, index) => React.cloneElement(child, { key: index }))
    `,
    // Valid: multiple conditional keys at same level
    tsx`
      function TabPanel({ activeTab }) {
        return (
          <div>
            {activeTab === 'home' && <HomeTab key="home" />}
            {activeTab === 'settings' && <SettingsTab key="settings" />}
            {activeTab === 'profile' && <ProfileTab key="profile" />}
          </div>
        );
      }
    `,
    // Valid: key in optional chaining context
    tsx`
      items?.map(item => <div key={item.id} />)
    `,
    // Valid: key on element in callback passed to custom component
    tsx`
      <List renderItem={(item) => <ListItem key={item.id} />} />
    `,
    // Valid: key on element inside Object.entries map
    tsx`
      Object.entries(obj).map(([key, value]) => <div key={key}>{value}</div>)
    `,
    // Valid: key on element inside Object.keys map
    tsx`
      Object.keys(obj).map(key => <div key={key}>{obj[key]}</div>)
    `,
    // Valid: key on element inside Object.values map with index
    tsx`
      Object.values(obj).map((value, index) => <div key={index}>{value}</div>)
    `,
    // Valid: key on element inside Array.from map
    tsx`
      Array.from({ length: 5 }, (_, i) => <div key={i} />)
    `,
    // Valid: key on element inside [... array]. map
    tsx`
      [...items].map(item => <div key={item.id} />)
    `,
    // https://github.com/Rel1cx/eslint-react/issues/1436
    tsx`
      export default function App() {
        return [getChild()];
      }

      function getChild() {
        return <div key="key">foo</div>;
      }
    `,
  ],
});
