import tsx from "dedent";

import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./jsx-no-iife";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        function MyComponent() {
          // hooks etc

          return (
            <SomeJsx>
              <SomeMoreJsx />

              {(() => {
                const filteredThings = things.filter(callback);

                if (filteredThings.length === 0) {
                  return <Empty />;
                }

                return filteredThings.map((thing) => <Thing key={thing.id} data={thing} />);
              })()}

              <SomeMoreJsx />
            </SomeJsx>
          );
        }
      `,
      errors: [
        {
          messageId: "jsxNoIife",
          data: { name: "Foo" },
        },
      ],
    },
  ],
  valid: [
    tsx`
      function MyComponent() {
        // hooks etc

        const someThings = (() => {
          const filteredThings = things.filter(callback);

          if (filteredThings.length === 0) {
            return <Empty />;
          }

          return filteredThings.map((thing) => <Thing key={thing.id} data={thing} />);
        })();

        return (
          <SomeJsx>
            <SomeMoreJsx />
            {someThings}
            <SomeMoreJsx />
          </SomeJsx>
        );
      }
    `,
    tsx`
      function MyComponent() {
        // hooks etc

        const someThings = useMemo(() => {
          const filteredThings = things.filter(callback);

          if (filteredThings.length === 0) {
            return <Empty />;
          }

          return filteredThings.map((thing) => <Thing key={thing.id} data={thing} />);
        }, [things]);

        return (
          <SomeJsx>
            <SomeMoreJsx />
            {someThings}
            <SomeMoreJsx />
          </SomeJsx>
        );
      }
    `,
    tsx`
      function MyComponent() {
        // hooks etc

        const thingsList = useMemo(() => {
          const filteredThings = things.filter(callback);

          if (filteredThings.length === 0) {
            return <Empty />;
          }

          return filteredThings.map((thing) => <Thing key={thing.id} data={thing} />);
        }, [things]);

        return (
          <SomeJsx>
            <SomeMoreJsx />
            {thingsList}
            <SomeMoreJsx />
          </SomeJsx>
        );
      }
    `,
    tsx`
      function MyComponent() {
        // hooks etc

        const thingsList = (() => {
          const filteredThings = things.filter(callback);

          if (filteredThings.length === 0) {
            return <Empty />;
          }

          return filteredThings.map((thing) => <Thing key={thing.id} data={thing} />);
        })();

        return (
          <SomeJsx>
            <SomeMoreJsx />
            {thingsList}
            <SomeMoreJsx />
          </SomeJsx>
        );
      }
    `,
  ],
});
