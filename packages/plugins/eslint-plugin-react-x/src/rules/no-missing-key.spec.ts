import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-missing-key";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `[<App />];`,
      errors: [{ messageId: "noMissingKey" }],
    },
    {
      code: /* tsx */ `[<App {...key} />];`,
      errors: [{ messageId: "noMissingKey" }],
    },
    {
      code: /* tsx */ `[<App key={0}/>, <App />];`,
      errors: [{ messageId: "noMissingKey" }],
    },
    {
      code: /* tsx */ `[1, 2 ,3].map(function(x) { return <App /> });`,
      errors: [{ messageId: "noMissingKey" }],
    },
    {
      code: /* tsx */ `[1, 2 ,3].map(x => <App />);`,
      errors: [{ messageId: "noMissingKey" }],
    },
    {
      code: /* tsx */ `[1, 2 ,3].map(x => x && <App x={x} />);`,
      errors: [{ messageId: "noMissingKey" }],
    },
    {
      code: '[1, 2 ,3].map(x => x ? <App x={x} key="1" /> : <OtherApp x={x} />);',
      errors: [{ messageId: "noMissingKey" }],
    },
    {
      code: '[1, 2 ,3].map(x => x ? <App x={x} /> : <OtherApp x={x} key="2" />);',
      errors: [{ messageId: "noMissingKey" }],
    },
    {
      code: /* tsx */ `[1, 2 ,3].map(x => { return <App /> });`,
      errors: [{ messageId: "noMissingKey" }],
    },
    {
      code: /* tsx */ `Array.from([1, 2 ,3], function(x) { return <App /> });`,
      errors: [{ messageId: "noMissingKey" }],
    },
    {
      code: /* tsx */ `Array.from([1, 2 ,3], (x => { return <App /> }));`,
      errors: [{ messageId: "noMissingKey" }],
    },
    {
      code: /* tsx */ `Array.from([1, 2 ,3], (x => <App />));`,
      errors: [{ messageId: "noMissingKey" }],
    },
    {
      code: /* tsx */ `[1, 2, 3]?.map(x => <BabelEslintApp />)`,
      errors: [{ messageId: "noMissingKey" }],
    },
    {
      code: /* tsx */ `[1, 2, 3]?.map(x => <TypescriptEslintApp />)`,
      errors: [{ messageId: "noMissingKey" }],
    },
    {
      code: /* tsx */ `[1, 2, 3].map(x => <>{x}</>);`,
      errors: [
        {
          messageId: "noMissingKeyWithFragment",
        },
      ],
    },
    {
      code: /* tsx */ `[<></>];`,
      errors: [
        {
          messageId: "noMissingKeyWithFragment",
        },
      ],
    },
    {
      code: /* tsx */ `
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
        { messageId: "noMissingKey" },
        { messageId: "noMissingKey" },
      ],
    },
    {
      code: /* tsx */ `
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
        { messageId: "noMissingKey" },
        { messageId: "noMissingKey" },
        { messageId: "noMissingKey" },
        { messageId: "noMissingKey" },
      ],
    },
    {
      code: /* tsx */ `
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
        { messageId: "noMissingKey" },
        { messageId: "noMissingKey" },
        { messageId: "noMissingKey" },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noMissingKeyWithFragment",
        },
        {
          messageId: "noMissingKey",
        },
        {
          messageId: "noMissingKeyWithFragment",
        },
      ],
    },
  ],
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
    /* tsx */ `
      const spans = [
        <span key="notunique"/>,
        <span key="notunique"/>,
      ];
    `,
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
      // testrule.jsx
      const trackLink = () => {};
      const getAnalyticsUiElement = () => {};

      const onTextButtonClick = (e, item) => trackLink([, getAnalyticsUiElement(item), item.name], e);
    `,
    /* tsx */ `
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
    /* tsx */ `
      const baz = foo?.bar?.()?.[1] ?? 'qux';

      qux()?.map()

      const directiveRanges = comments?.map(tryParseTSDirective)
    `,
    /* tsx */ `
      import { observable } from "mobx";

      export interface ClusterFrameInfo {
        frameId: number;
        processId: number;
      }

      export const clusterFrameMap = observable.map<string, ClusterFrameInfo>();
    `,
    "React.Children.toArray([1, 2 ,3].map(x => <App />));",
    /* tsx */ `
      import { Children } from "react";
      Children.toArray([1, 2 ,3].map(x => <App />));
    `,
    /* tsx */ `
      import React from 'react';
      const { Children } = React;

      React.Children.toArray([1, 2 ,3].map(x => <App />));
      React.Children.toArray(Array.from([1, 2 ,3], x => <App />));
      Children.toArray([1, 2 ,3].map(x => <App />));
      Children.toArray(Array.from([1, 2 ,3], x => <App />));
    `,
  ],
});
