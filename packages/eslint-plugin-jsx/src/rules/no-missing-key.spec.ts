import dedent from "dedent";

import { allValid, defaultParserOptions, RuleTester } from "../../../../test";
import rule, { RULE_NAME } from "./no-missing-key";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    "fn()",
    "[1, 2, 3].map(function () {})",
    "<App />;",
    "[<App key={0} />, <App key={1} />];",
    "[1, 2, 3].map(function(x) { return <App key={x} /> });",
    "[1, 2, 3].map(x => <App key={x} />);",
    "[1, 2 ,3].map(x => x && <App x={x} key={x} />);",
    '[1, 2 ,3].map(x => x ? <App x={x} key="1" /> : <OtherApp x={x} key="2" />);',
    "[1, 2, 3].map(x => { return <App key={x} /> });",
    "Array.from([1, 2, 3], function(x) { return <App key={x} /> });",
    "Array.from([1, 2, 3], (x => <App key={x} />));",
    "Array.from([1, 2, 3], (x => {return <App key={x} />}));",
    "Array.from([1, 2, 3], someFn);",
    "Array.from([1, 2, 3]);",
    "[1, 2, 3].foo(x => <App />);",
    "var App = () => <div />;",
    "[1, 2, 3].map(function(x) { return; });",
    "foo(() => <div />);",
    "foo(() => <></>);",
    "<></>;",
    "<App {...{}} />;",
    '<App key="keyBeforeSpread" {...{}} />;',
    '<div key="keyBeforeSpread" {...{}} />;',
    dedent`
      const spans = [
        <span key="notunique"/>,
        <span key="notunique"/>,
      ];
    `,
    dedent`
      function Component(props) {
        return hasPayment ? (
          <div className="stuff">
            <BookingDetailSomething {...props} />
            {props.modal && props.calculatedPrice && (
              <SomeOtherThing items={props.something} discount={props.discount} />
            )}
          </div>
        ) : null;
      }
    `,
    dedent`
      import React, { FC, useRef, useState } from 'react';

      import './ResourceVideo.sass';
      import VimeoVideoPlayInModal from '../vimeoVideoPlayInModal/VimeoVideoPlayInModal';

      type Props = {
        videoUrl: string;
        videoTitle: string;
      };
      const ResourceVideo: FC<Props> = ({
        videoUrl,
        videoTitle,
      }: Props): JSX.Element => {
        return (
          <div className="resource-video">
            <VimeoVideoPlayInModal videoUrl={videoUrl} />
            <h3>{videoTitle}</h3>
          </div>
        );
      };

      export default ResourceVideo;
    `,
    dedent`
      // testrule.jsx
      const trackLink = () => {};
      const getAnalyticsUiElement = () => {};

      const onTextButtonClick = (e, item) => trackLink([, getAnalyticsUiElement(item), item.name], e);
    `,
    dedent`
      function Component({ allRatings }) {
        return (
          <RatingDetailsStyles>
            {Object.entries(allRatings)?.map(([key, value], index) => {
              const rate = value?.split(/(?=[%, /])/);

              if (!rate) return null;

              return (
                <li key={\`\${entertainment.tmdbId}\${index}\`}>
                  <img src={\`/assets/rating/\${key}.png\`} />
                  <span className="rating-details--rate">{rate?.[0]}</span>
                  <span className="rating-details--rate-suffix">{rate?.[1]}</span>
                </li>
              );
            })}
          </RatingDetailsStyles>
        );
      }
    `,
    dedent`
      const baz = foo?.bar?.()?.[1] ?? 'qux';

      qux()?.map()

      const directiveRanges = comments?.map(tryParseTSDirective)
    `,
    dedent`
      import { observable } from "mobx";

      export interface ClusterFrameInfo {
        frameId: number;
        processId: number;
      }

      export const clusterFrameMap = observable.map<string, ClusterFrameInfo>();
    `,
    "React.Children.toArray([1, 2 ,3].map(x => <App />));",
    dedent`
      import { Children } from "react";
      Children.toArray([1, 2 ,3].map(x => <App />));
    `,
    dedent`
      import React from 'react';
      import { Children as ReactChildren } from 'react';
      import dedent from 'dedent';

      const { Children } = React;
      const { toArray } = Children;

      React.Children.toArray([1, 2 ,3].map(x => <App />));
      React.Children.toArray(Array.from([1, 2 ,3], x => <App />));
      Children.toArray([1, 2 ,3].map(x => <App />));
      Children.toArray(Array.from([1, 2 ,3], x => <App />));
      // ReactChildren.toArray([1, 2 ,3].map(x => <App />));
      // ReactChildren.toArray(Array.from([1, 2 ,3], x => <App />));
      // toArray([1, 2 ,3].map(x => <App />));
      // toArray(Array.from([1, 2 ,3], x => <App />));
    `,
  ],
  invalid: [
    {
      code: "[<App />];",
      errors: [{ messageId: "NO_MISSING_KEY" }],
    },
    {
      code: "[<App {...key} />];",
      errors: [{ messageId: "NO_MISSING_KEY" }],
    },
    {
      code: "[<App key={0}/>, <App />];",
      errors: [{ messageId: "NO_MISSING_KEY" }],
    },
    {
      code: "[1, 2 ,3].map(function(x) { return <App /> });",
      errors: [{ messageId: "NO_MISSING_KEY" }],
    },
    {
      code: "[1, 2 ,3].map(x => <App />);",
      errors: [{ messageId: "NO_MISSING_KEY" }],
    },
    {
      code: "[1, 2 ,3].map(x => x && <App x={x} />);",
      errors: [{ messageId: "NO_MISSING_KEY" }],
    },
    {
      code: '[1, 2 ,3].map(x => x ? <App x={x} key="1" /> : <OtherApp x={x} />);',
      errors: [{ messageId: "NO_MISSING_KEY" }],
    },
    {
      code: '[1, 2 ,3].map(x => x ? <App x={x} /> : <OtherApp x={x} key="2" />);',
      errors: [{ messageId: "NO_MISSING_KEY" }],
    },
    {
      code: "[1, 2 ,3].map(x => { return <App /> });",
      errors: [{ messageId: "NO_MISSING_KEY" }],
    },
    {
      code: "Array.from([1, 2 ,3], function(x) { return <App /> });",
      errors: [{ messageId: "NO_MISSING_KEY" }],
    },
    {
      code: "Array.from([1, 2 ,3], (x => { return <App /> }));",
      errors: [{ messageId: "NO_MISSING_KEY" }],
    },
    {
      code: "Array.from([1, 2 ,3], (x => <App />));",
      errors: [{ messageId: "NO_MISSING_KEY" }],
    },
    {
      code: "[1, 2, 3]?.map(x => <BabelEslintApp />)",
      errors: [{ messageId: "NO_MISSING_KEY" }],
    },
    {
      code: "[1, 2, 3]?.map(x => <TypescriptEslintApp />)",
      errors: [{ messageId: "NO_MISSING_KEY" }],
    },
    {
      code: "[1, 2, 3].map(x => <>{x}</>);",
      errors: [
        {
          messageId: "NO_MISSING_KEY_WITH_FRAGMENT",
          data: {
            reactPragma: "React",
            fragmentPragma: "Fragment",
          },
        },
      ],
    },
    {
      code: "[<></>];",
      errors: [
        {
          messageId: "NO_MISSING_KEY_WITH_FRAGMENT",
          data: {
            reactPragma: "React",
            fragmentPragma: "Fragment",
          },
        },
      ],
    },
    {
      code: dedent`
        const Test = () => {
          const list = [1, 2, 3, 4, 5];

          return (
            <div>
              {list.map(item => {
                if (item < 2) {
                  return <div>{item}</div>;
                }

                return <div />;
              })}
            </div>
          );
        };
      `,
      errors: [
        { messageId: "NO_MISSING_KEY" },
        { messageId: "NO_MISSING_KEY" },
      ],
    },
    {
      code: dedent`
        const TestO = () => {
          const list = [1, 2, 3, 4, 5];

          return (
            <div>
              {list.map(item => {
                if (item < 2) {
                  return <div>{item}</div>;
                } else if (item < 5) {
                  return <div></div>
                }  else {
                  return <div></div>
                }

                return <div />;
              })}
            </div>
          );
        };
      `,
      errors: [
        { messageId: "NO_MISSING_KEY" },
        { messageId: "NO_MISSING_KEY" },
        { messageId: "NO_MISSING_KEY" },
        { messageId: "NO_MISSING_KEY" },
      ],
    },
    {
      code: dedent`
        const TestCase = () => {
          const list = [1, 2, 3, 4, 5];

          return (
            <div>
              {list.map(item => {
                if (item < 2) return <div>{item}</div>;
                else if (item < 5) return <div />;
                else return <div />;
              })}
            </div>
          );
        };
      `,
      errors: [
        { messageId: "NO_MISSING_KEY" },
        { messageId: "NO_MISSING_KEY" },
        { messageId: "NO_MISSING_KEY" },
      ],
    },
    {
      code: dedent`
        function Explain() {
          return (
            <div>
              {arr.map((id) => {
                return <>{id}</>;
              })}
              {arr.map((id) => {
                return <React.Fragment>{id}</React.Fragment>;
              })}
            </div>
          );
        }

        function Repro() {
          return (
            <div>
              {arr.map((id) => {
                return <>{id}</>;
              })}
            </div>
          );
        }
      `,
      errors: [
        {
          messageId: "NO_MISSING_KEY_WITH_FRAGMENT",
          data: {
            reactPragma: "React",
            fragmentPragma: "Fragment",
          },
        },
        {
          messageId: "NO_MISSING_KEY",
        },
        {
          messageId: "NO_MISSING_KEY_WITH_FRAGMENT",
          data: {
            reactPragma: "React",
            fragmentPragma: "Fragment",
          },
        },
      ],
    },
  ],
});
