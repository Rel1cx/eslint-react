import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-missing-key";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`[<App />];`,
      errors: [{ messageId: "missingKey" }],
    },
    {
      code: tsx`[<App {...key} />];`,
      errors: [{ messageId: "missingKey" }],
    },
    {
      code: tsx`[<App key={0}/>, <App />];`,
      errors: [{ messageId: "missingKey" }],
    },
    {
      code: tsx`[1, 2 ,3].map(function(x) { return <App /> });`,
      errors: [{ messageId: "missingKey" }],
    },
    {
      code: tsx`[1, 2 ,3].map(x => <App />);`,
      errors: [{ messageId: "missingKey" }],
    },
    {
      code: tsx`[1, 2 ,3].map(x => x && <App x={x} />);`,
      errors: [{ messageId: "missingKey" }],
    },
    {
      code: '[1, 2 ,3].map(x => x ? <App x={x} key="1" /> : <OtherApp x={x} />);',
      errors: [{ messageId: "missingKey" }],
    },
    {
      code: '[1, 2 ,3].map(x => x ? <App x={x} /> : <OtherApp x={x} key="2" />);',
      errors: [{ messageId: "missingKey" }],
    },
    {
      code: tsx`[1, 2 ,3].map(x => { return <App /> });`,
      errors: [{ messageId: "missingKey" }],
    },
    {
      code: tsx`Array.from([1, 2 ,3], function(x) { return <App /> });`,
      errors: [{ messageId: "missingKey" }],
    },
    {
      code: tsx`Array.from([1, 2 ,3], (x => { return <App /> }));`,
      errors: [{ messageId: "missingKey" }],
    },
    {
      code: tsx`Array.from([1, 2 ,3], (x => <App />));`,
      errors: [{ messageId: "missingKey" }],
    },
    {
      code: tsx`[1, 2, 3]?.map(x => <BabelEslintApp />)`,
      errors: [{ messageId: "missingKey" }],
    },
    {
      code: tsx`[1, 2, 3]?.map(x => <TypescriptEslintApp />)`,
      errors: [{ messageId: "missingKey" }],
    },
    {
      code: tsx`[1, 2, 3].map(x => <>{x}</>);`,
      errors: [
        {
          messageId: "unexpectedFragmentSyntax",
        },
      ],
    },
    {
      code: tsx`[<></>];`,
      errors: [
        {
          messageId: "unexpectedFragmentSyntax",
        },
      ],
    },
    {
      code: tsx`
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
        { messageId: "missingKey" },
        { messageId: "missingKey" },
      ],
    },
    {
      code: tsx`
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
        { messageId: "missingKey" },
        { messageId: "missingKey" },
        { messageId: "missingKey" },
        { messageId: "missingKey" },
      ],
    },
    {
      code: tsx`
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
        { messageId: "missingKey" },
        { messageId: "missingKey" },
        { messageId: "missingKey" },
      ],
    },
    {
      code: tsx`
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
          messageId: "unexpectedFragmentSyntax",
        },
        {
          messageId: "missingKey",
        },
        {
          messageId: "unexpectedFragmentSyntax",
        },
      ],
    },
    // createElement: array literal without key
    {
      code: tsx`[React.createElement('div')];`,
      errors: [{ messageId: "missingKeyWithCreateElement" }],
    },
    // createElement: array literal with null props (no key)
    {
      code: tsx`[React.createElement('div', null)];`,
      errors: [{ messageId: "missingKeyWithCreateElement" }],
    },
    // createElement: array literal with props but no key
    {
      code: tsx`[React.createElement('div', { className: 'foo' })];`,
      errors: [{ messageId: "missingKeyWithCreateElement" }],
    },
    // createElement: multiple elements in array without key
    {
      code: tsx`[React.createElement('div'), React.createElement('div')];`,
      errors: [
        { messageId: "missingKeyWithCreateElement" },
        { messageId: "missingKeyWithCreateElement" },
      ],
    },
    // createElement: mixed JSX and createElement in array without key
    {
      code: tsx`[<App />, React.createElement('div')];`,
      errors: [
        { messageId: "missingKey" },
        { messageId: "missingKeyWithCreateElement" },
      ],
    },
    // createElement: one with key, one without key in array
    {
      code: tsx`[React.createElement('div', { key: '1' }), React.createElement('div')];`,
      errors: [{ messageId: "missingKeyWithCreateElement" }],
    },
    // createElement: .map() expression body without key
    {
      code: tsx`[1, 2, 3].map(x => React.createElement('div', null));`,
      errors: [{ messageId: "missingKeyWithCreateElement" }],
    },
    // createElement: .map() expression body without props
    {
      code: tsx`[1, 2, 3].map(x => React.createElement('div'));`,
      errors: [{ messageId: "missingKeyWithCreateElement" }],
    },
    // createElement: .map() block body without key
    {
      code: tsx`[1, 2, 3].map(function(x) { return React.createElement('div', null); });`,
      errors: [{ messageId: "missingKeyWithCreateElement" }],
    },
    // createElement: .map() block body with props but no key
    {
      code: tsx`[1, 2, 3].map(x => { return React.createElement('div', { className: 'foo' }); });`,
      errors: [{ messageId: "missingKeyWithCreateElement" }],
    },
    // createElement: Array.from callback expression body without key
    {
      code: tsx`Array.from([1, 2, 3], x => React.createElement('div', null));`,
      errors: [{ messageId: "missingKeyWithCreateElement" }],
    },
    // createElement: Array.from callback block body without key
    {
      code: tsx`Array.from([1, 2, 3], function(x) { return React.createElement('div', null); });`,
      errors: [{ messageId: "missingKeyWithCreateElement" }],
    },
    // createElement: optional chaining .map() without key
    {
      code: tsx`[1, 2, 3]?.map(x => React.createElement('div', null));`,
      errors: [{ messageId: "missingKeyWithCreateElement" }],
    },
    // createElement: conditional expression in .map(), one branch missing key
    {
      code: tsx`[1, 2, 3].map(x => x ? React.createElement('div', { key: x }) : React.createElement('span', null));`,
      errors: [{ messageId: "missingKeyWithCreateElement" }],
    },
    // createElement: conditional expression in .map(), other branch missing key
    {
      code: tsx`[1, 2, 3].map(x => x ? React.createElement('div', null) : React.createElement('span', { key: x }));`,
      errors: [{ messageId: "missingKeyWithCreateElement" }],
    },
    // createElement: logical expression in .map() without key
    {
      code: tsx`[1, 2, 3].map(x => x && React.createElement('div', null));`,
      errors: [{ messageId: "missingKeyWithCreateElement" }],
    },
    // createElement: imported createElement in .map() without key
    {
      code: tsx`
        import { createElement } from 'react';
        [1, 2, 3].map(x => createElement('div', null));
      `,
      errors: [{ messageId: "missingKeyWithCreateElement" }],
    },
    // createElement: imported createElement in array without key
    {
      code: tsx`
        import { createElement } from 'react';
        [createElement('div'), createElement('div')];
      `,
      errors: [
        { messageId: "missingKeyWithCreateElement" },
        { messageId: "missingKeyWithCreateElement" },
      ],
    },
    // createElement: block body with multiple returns, all missing key
    {
      code: tsx`
        [1, 2, 3].map(item => {
          if (item < 2) {
            return React.createElement('div', null);
          }
          return React.createElement('span', null);
        });
      `,
      errors: [
        { messageId: "missingKeyWithCreateElement" },
        { messageId: "missingKeyWithCreateElement" },
      ],
    },
    // createElement: block body with if/else, mixed JSX and createElement, all missing key
    {
      code: tsx`
        [1, 2, 3].map(item => {
          if (item < 2) {
            return <div>{item}</div>;
          }
          return React.createElement('span', null);
        });
      `,
      errors: [
        { messageId: "missingKey" },
        { messageId: "missingKeyWithCreateElement" },
      ],
    },
    // createElement: with undefined as props (no key)
    {
      code: tsx`[React.createElement('div', undefined)];`,
      errors: [{ messageId: "missingKeyWithCreateElement" }],
    },
    // TODO: Fix this test case
    // {
    //   code: tsx`
    //     const CustomDescription = (props: CustomDescriptionProps) => {
    //     	const { items } = props;

    //     	const newItems = items.map((item) => {
    //     		const label = <div>{item.label}</div>;

    //     		return { label, children: item.children };

    //     		// This one works without any error
    //     		return { label: <div>{item.label}</div>, children: item.children };
    //     	});

    //     	return <Descriptions items={newItems} />;
    //     };
    //   `,
    //   errors: [
    //     { messageId: "missingKey" },
    //   ],
    // },
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
    tsx`
      const spans = [
        <span key="notunique"/>,
        <span key="notunique"/>,
      ];
    `,
    tsx`
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
    tsx`
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
    tsx`
      // testrule.jsx
      const trackLink = () => {};
      const getAnalyticsUiElement = () => {};

      const onTextButtonClick = (e, item) => trackLink([, getAnalyticsUiElement(item), item.name], e);
    `,
    tsx`
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
    tsx`
      const baz = foo?.bar?.()?.[1] ?? 'qux';

      qux()?.map()

      const directiveRanges = comments?.map(tryParseTSDirective)
    `,
    tsx`
      import { observable } from "mobx";

      export interface ClusterFrameInfo {
        frameId: number;
        processId: number;
      }

      export const clusterFrameMap = observable.map<string, ClusterFrameInfo>();
    `,
    "React.Children.toArray([1, 2 ,3].map(x => <App />));",
    tsx`
      import { Children } from "react";
      Children.toArray([1, 2 ,3].map(x => <App />));
    `,
    tsx`
      import React from 'react';
      const { Children } = React;

      React.Children.toArray([1, 2 ,3].map(x => <App />));
      React.Children.toArray(Array.from([1, 2 ,3], x => <App />));
      Children.toArray([1, 2 ,3].map(x => <App />));
      Children.toArray(Array.from([1, 2 ,3], x => <App />));
    `,
    tsx`
      {Match.value(y).pipe(
       Match.when(true, () => <div>Test</div>),
       Match.when(false, () => <div>Test</div>),
       Match.exhaustive
      )}
    `,
    // createElement: standalone call (not in array/map context, no key needed)
    "React.createElement('div', null);",
    "React.createElement('div', { className: 'foo' });",
    // createElement: array literal with key on all elements
    "[React.createElement('div', { key: '1' }), React.createElement('div', { key: '2' })];",
    // createElement: .map() expression body with key
    "[1, 2, 3].map(x => React.createElement('div', { key: x }));",
    // createElement: .map() block body with key
    "[1, 2, 3].map(function(x) { return React.createElement('div', { key: x }); });",
    "[1, 2, 3].map(x => { return React.createElement('div', { key: x }); });",
    // createElement: Array.from callback with key
    "Array.from([1, 2, 3], x => React.createElement('div', { key: x }));",
    "Array.from([1, 2, 3], function(x) { return React.createElement('div', { key: x }); });",
    "Array.from([1, 2, 3], (x => { return React.createElement('div', { key: x }); }));",
    // createElement: conditional expression in .map(), both branches have key
    "[1, 2, 3].map(x => x ? React.createElement('div', { key: x }) : React.createElement('span', { key: x }));",
    // createElement: logical expression in .map() with key
    "[1, 2, 3].map(x => x && React.createElement('div', { key: x }));",
    // createElement: mixed JSX and createElement in array, all with key
    "[<App key={0} />, React.createElement('div', { key: '1' })];",
    // createElement: props is a variable (can't statically determine, assume key may exist)
    "[1, 2, 3].map(x => React.createElement('div', props));",
    // createElement: key with additional props
    "[1, 2, 3].map(x => React.createElement('div', { key: x, className: 'foo' }));",
    // createElement: imported createElement with key
    tsx`
      import { createElement } from 'react';
      [createElement('div', { key: '1' }), createElement('div', { key: '2' })];
    `,
    tsx`
      import { createElement } from 'react';
      [1, 2, 3].map(x => createElement('div', { key: x }));
    `,
    // createElement: not in map-like call (e.g., .foo()), no key needed
    "[1, 2, 3].foo(x => React.createElement('div', null));",
    // createElement: inside Children.toArray (key not needed)
    "React.Children.toArray([1, 2, 3].map(x => React.createElement('div', null)));",
    tsx`
      import { Children } from "react";
      Children.toArray([1, 2, 3].map(x => React.createElement('div', null)));
    `,
    tsx`
      import React from 'react';
      React.Children.toArray(Array.from([1, 2, 3], x => React.createElement('div', null)));
    `,
    // createElement: block body with key on all return paths
    tsx`
      [1, 2, 3].map(item => {
        if (item < 2) {
          return React.createElement('div', { key: item });
        }
        return React.createElement('span', { key: item });
      });
    `,
    // createElement: mixed JSX and createElement in block body, all with key
    tsx`
      [1, 2, 3].map(item => {
        if (item < 2) {
          return <div key={item}>{item}</div>;
        }
        return React.createElement('span', { key: item });
      });
    `,
  ],
});
