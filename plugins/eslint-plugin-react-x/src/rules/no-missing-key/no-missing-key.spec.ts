import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-missing-key";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // --- Typical missing-key patterns --------------------------------------------------------
    {
      name: "missing key in map arrow callback",
      code: tsx`[1, 2 ,3].map(x => <App />);`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "missing key in map function callback",
      code: tsx`[1, 2 ,3].map(function(x) { return <App /> });`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "missing key in map arrow callback with block body",
      code: tsx`[1, 2 ,3].map(x => { return <App /> });`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "missing key in array literal",
      code: tsx`[<App />];`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "missing key on one element in array literal",
      code: tsx`[<App key={0}/>, <App />];`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "missing key with spread props in array literal",
      code: tsx`[<App {...key} />];`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "missing key in logical expression in array literal",
      code: tsx`[x && <App x={x} />];`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "missing key in conditional branch in array literal",
      code: tsx`[x ? <App x={x} /> : <OtherApp x={x} key="2" />];`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "missing key in logical expression in map callback",
      code: tsx`[1, 2 ,3].map(x => x && <App x={x} />);`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "missing key in returned logical expression in map callback",
      code: tsx`[1, 2 ,3].map(x => { return x && <App x={x} /> });`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "missing key in nullish coalescing expression in map callback",
      // `??` branches are checked like `&&` and `? :`
      code: tsx`[1, 2 ,3].map(x => x ?? <App />);`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "missing key in false branch of conditional in map callback",
      code: '[1, 2 ,3].map(x => x ? <App x={x} key="1" /> : <OtherApp x={x} />);',
      errors: [{ messageId: "default" }],
    },
    {
      name: "missing key in true branch of conditional in map callback",
      code: '[1, 2 ,3].map(x => x ? <App x={x} /> : <OtherApp x={x} key="2" />);',
      errors: [{ messageId: "default" }],
    },
    {
      name: "missing key in false branch of returned conditional in map callback",
      code: '[1, 2 ,3].map(x => { return x ? <App x={x} key="1" /> : <OtherApp x={x} /> });',
      errors: [{ messageId: "default" }],
    },
    {
      name: "missing key in true branch of returned conditional in map callback",
      code: '[1, 2 ,3].map(x => { return x ? <App x={x} /> : <OtherApp x={x} key="2" /> });',
      errors: [{ messageId: "default" }],
    },
    {
      name: "missing keys in both branches of returned conditional in map callback",
      code: tsx`[1, 2 ,3].map(x => { return x ? <App /> : <OtherApp /> });`,
      errors: [{ messageId: "default" }, { messageId: "default" }],
    },
    {
      name: "missing keys in both branches of conditional in map callback",
      code: tsx`[1, 2 ,3].map(x => x ? <App /> : <OtherApp />);`,
      errors: [{ messageId: "default" }, { messageId: "default" }],
    },
    // --- Real-world component callbacks with conditional returns -----------------------------
    {
      name: "conditional returns in map callback in component",
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
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      name: "if-else chain returns in map callback in component",
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
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      name: "single-line if-else returns in map callback in component",
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
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    // --- Nested arrays and other iteration methods -------------------------------------------
    {
      name: "missing key in nested array returned from map",
      // A nested array returned from `.map` is reported exactly once
      // (by the ArrayExpression visitor, not the callback check)
      code: tsx`[1, 2 ,3].map(x => [<App />]);`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "missing keys in array returned from flatMap",
      code: tsx`[1, 2 ,3].flatMap(x => [<App />, <OtherApp />]);`,
      errors: [{ messageId: "default" }, { messageId: "default" }],
    },
    {
      name: "missing key in flatMap callback with block body",
      code: tsx`[1, 2 ,3].flatMap(x => { return <App /> });`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "missing key in Array.from function callback",
      code: tsx`Array.from([1, 2 ,3], function(x) { return <App /> });`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "missing key in Array.from arrow callback with block body",
      code: tsx`Array.from([1, 2 ,3], (x => { return <App /> }));`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "missing key in Array.from arrow callback",
      code: tsx`Array.from([1, 2 ,3], (x => <App />));`,
      errors: [{ messageId: "default" }],
    },
    // --- Fragments used where keys are required ----------------------------------------------
    {
      name: "fragment in conditional branch in array literal",
      code: tsx`[x ? <>{x}</> : <App key="1" />];`,
      errors: [{ messageId: "unexpectedFragmentSyntax" }],
    },
    {
      name: "fragment in map callback",
      code: tsx`[1, 2, 3].map(x => <>{x}</>);`,
      errors: [
        {
          messageId: "unexpectedFragmentSyntax",
        },
      ],
    },
    {
      name: "fragment in array literal",
      code: tsx`[<></>];`,
      errors: [
        {
          messageId: "unexpectedFragmentSyntax",
        },
      ],
    },
    {
      name: "fragments returned from map callbacks in components",
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
          messageId: "default",
        },
        {
          messageId: "unexpectedFragmentSyntax",
        },
      ],
    },
    // --- Children.toArray interaction --------------------------------------------------------
    {
      name: "missing key after exiting Children.toArray",
      // Checks resume after a `Children.toArray` call has been exited
      code: tsx`
        import { Children } from "react";
        Children.toArray(foo.map(x => <App />));
        bar.map(x => <App />);
      `,
      errors: [{ messageId: "default" }],
    },
    // --- Optional chaining and parser-specific edge cases ------------------------------------
    {
      name: "missing key with optional chaining on map (BabelEslintApp)",
      code: tsx`[1, 2, 3]?.map(x => <BabelEslintApp />)`,
      errors: [{ messageId: "default" }],
    },
    {
      name: "missing key with optional chaining on map (TypescriptEslintApp)",
      code: tsx`[1, 2, 3]?.map(x => <TypescriptEslintApp />)`,
      errors: [{ messageId: "default" }],
    },
    // --- `as any` cast edge cases ------------------------------------------------------------
    {
      name: "missing key in map call cast as any",
      code: tsx`
        const App = () => {
          return (data.map as any)(x => <App />);
        };
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    {
      name: "missing key in Array.from call cast as any",
      code: tsx`
        const App = () => {
          return (Array.from as any)(null, x => <App />);
        };
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    // TODO: Fix this test case
    // {
    //   code: tsx`
    //     const CustomDescription = (props: CustomDescriptionProps) => {
    //     	const { items } = props;
    //
    //     	const newItems = items.map((item) => {
    //     		const label = <div>{item.label}</div>;
    //
    //     		return { label, children: item.children };
    //
    //     		// This one works without any error
    //     		return { label: <div>{item.label}</div>, children: item.children };
    //     	});
    //
    //     	return <Descriptions items={newItems} />;
    //     };
    //   `,
    //   errors: [
    //     { messageId: "default" },
    //   ],
    // },
  ],
  valid: [
    // --- Baseline valid cases ----------------------------------------------------------------
    {
      name: "plain function call",
      code: "fn()",
    },
    {
      name: "arrow component returning JSX",
      code: "var App = () => <div />;",
    },
    {
      name: "single JSX element",
      code: "<App />;",
    },
    {
      name: "array of keyed elements",
      code: "[<App key={0} />, <App key={1} />];",
    },
    // --- Keyed `.map` callbacks --------------------------------------------------------------
    {
      name: "keyed element in map arrow callback",
      code: "[1, 2, 3].map(x => <App key={x} />);",
    },
    {
      name: "keyed element in map function callback",
      code: "[1, 2, 3].map(function(x) { return <App key={x} /> });",
    },
    {
      name: "keyed element in map arrow callback with block body",
      code: "[1, 2, 3].map(x => { return <App key={x} /> });",
    },
    {
      name: "map callback with empty body",
      code: "[1, 2, 3].map(function () {})",
    },
    {
      name: "map callback with empty return",
      code: "[1, 2, 3].map(function(x) { return; });",
    },
    // --- Conditional/ternary expressions with keys -------------------------------------------
    {
      name: "keyed element in logical expression in map callback",
      code: "[1, 2 ,3].map(x => x && <App x={x} key={x} />);",
    },
    {
      name: "keyed element in logical expression in array literal",
      code: "[x && <App x={x} key={x} />];",
    },
    {
      name: "keyed elements in conditional branches in array literal",
      code: '[x ? <App x={x} key="1" /> : <OtherApp x={x} key="2" />];',
    },
    {
      name: "keyed elements in conditional branches in map callback",
      code: '[1, 2 ,3].map(x => x ? <App x={x} key="1" /> : <OtherApp x={x} key="2" />);',
    },
    {
      name: "keyed element in returned logical expression in map callback",
      code: "[1, 2 ,3].map(x => { return x && <App x={x} key={x} /> });",
    },
    {
      name: "keyed elements in returned conditional branches in map callback",
      code: '[1, 2 ,3].map(x => { return x ? <App x={x} key="1" /> : <OtherApp x={x} key="2" /> });',
    },
    // --- Other iteration methods with keys ---------------------------------------------------
    {
      name: "keyed elements in array returned from flatMap",
      code: "[1, 2 ,3].flatMap(x => [<App key={x} />, <OtherApp key={-x} />]);",
    },
    {
      name: "keyed element in Array.from function callback",
      code: "Array.from([1, 2, 3], function(x) { return <App key={x} /> });",
    },
    {
      name: "keyed element in Array.from arrow callback",
      code: "Array.from([1, 2, 3], (x => <App key={x} />));",
    },
    {
      name: "keyed element in Array.from arrow callback with block body",
      code: "Array.from([1, 2, 3], (x => {return <App key={x} />}));",
    },
    {
      name: "Array.from with non-inline mapper",
      code: "Array.from([1, 2, 3], someFn);",
    },
    {
      name: "Array.from without mapper",
      code: "Array.from([1, 2, 3]);",
    },
    {
      name: "non-iteration method with JSX callback",
      code: "[1, 2, 3].foo(x => <App />);",
    },
    // --- Fragments and non-array JSX ---------------------------------------------------------
    {
      name: "fragment expression statement",
      code: "<></>;",
    },
    {
      name: "fragment in non-iteration callback",
      code: "foo(() => <></>);",
    },
    {
      name: "JSX in non-iteration callback",
      code: "foo(() => <div />);",
    },
    {
      name: "element with empty spread props",
      code: "<App {...{}} />;",
    },
    {
      name: "element with key before spread",
      code: '<App key="keyBeforeSpread" {...{}} />;',
    },
    {
      name: "host element with key before spread",
      code: '<div key="keyBeforeSpread" {...{}} />;',
    },
    {
      name: "array of elements with duplicate keys",
      code: tsx`
        const spans = [
          <span key="notunique"/>,
          <span key="notunique"/>,
        ];
      `,
    },
    // --- Real-world component examples -------------------------------------------------------
    {
      name: "component with conditional JSX and logical expression",
      code: tsx`
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
    },
    {
      name: "component returning fragment not in array",
      code: tsx`
        function Component() {
          return <>hello</>;
        }
      `,
    },
    {
      name: "fragment assigned to variable",
      code: tsx`
        function Component() {
          const fragment = <>hello</>;
          return fragment;
        }
      `,
    },
    {
      name: "conditional fragments assigned to variable",
      code: tsx`
        function Component() {
          const el = condition ? <>a</> : <>b</>;
          return <div>{el}</div>;
        }
      `,
    },
    {
      name: "real-world typed component without iteration",
      code: tsx`
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
    },
    {
      name: "sparse array in call expression",
      code: tsx`
        // testrule.jsx
        const trackLink = () => {};
        const getAnalyticsUiElement = () => {};

        const onTextButtonClick = (e, item) => trackLink([, getAnalyticsUiElement(item), item.name], e);
      `,
    },
    {
      name: "keyed element in Object.entries map callback",
      code: tsx`
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
    },
    // --- React.Children.toArray handling -----------------------------------------------------
    {
      name: "map inside React.Children.toArray",
      code: "React.Children.toArray([1, 2 ,3].map(x => <App />));",
    },
    {
      name: "map inside named Children.toArray",
      code: tsx`
        import { Children } from "react";
        Children.toArray([1, 2 ,3].map(x => <App />));
      `,
    },
    {
      name: "maps and Array.from inside Children.toArray calls",
      code: tsx`
        import React from 'react';
        const { Children } = React;

        React.Children.toArray([1, 2 ,3].map(x => <App />));
        React.Children.toArray(Array.from([1, 2 ,3], x => <App />));
        Children.toArray([1, 2 ,3].map(x => <App />));
        Children.toArray(Array.from([1, 2 ,3], x => <App />));
      `,
    },
    {
      name: "map inside nested Children.toArray",
      // Exiting a nested `Children.toArray` must not resume checks
      // while still inside the outer `Children.toArray`
      code: tsx`
        import { Children } from "react";
        Children.toArray([Children.toArray([1].map(x => <App />)), [2].map(x => <App />)]);
      `,
    },
    // --- Spread and nested-array edge cases --------------------------------------------------
    {
      name: "spread element alongside keyed element in array",
      code: tsx`[...items, <App key="1" />];`,
    },
    {
      name: "spread of keyed map result",
      code: tsx`[...items.map(x => <App key={x} />)];`,
    },
    {
      name: "keyed elements in nested array returned from map",
      code: tsx`[1, 2 ,3].map(x => [<App key={x} />]);`,
    },
    {
      name: "JSX in Match.when callbacks",
      code: tsx`
        {Match.value(y).pipe(
         Match.when(true, () => <div>Test</div>),
         Match.when(false, () => <div>Test</div>),
         Match.exhaustive
        )}
      `,
    },
    {
      name: "JSX inside nested function in map callback",
      code: tsx`
        [1, 2, 3].map(function(x) {
          const helper = () => <App />;
          return helper();
        });
      `,
    },
    // --- Optional chaining / TypeScript edge cases -------------------------------------------
    {
      name: "optional chaining calls without iteration",
      code: tsx`
        const baz = foo?.bar?.()?.[1] ?? 'qux';

        qux()?.map()

        const directiveRanges = comments?.map(tryParseTSDirective)
      `,
    },
    {
      name: "mobx observable.map without mapper",
      code: tsx`
        import { observable } from "mobx";

        export interface ClusterFrameInfo {
          frameId: number;
          processId: number;
        }

        export const clusterFrameMap = observable.map<string, ClusterFrameInfo>();
      `,
    },
  ],
});
