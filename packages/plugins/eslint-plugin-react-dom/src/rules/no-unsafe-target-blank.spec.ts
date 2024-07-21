import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-unsafe-target-blank";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: '<a href="https://react.dev" target="_blank"></a>',
      errors: [{ messageId: "NO_UNSAFE_TARGET_BLANK" }],
    },
    {
      code: '<a href="https://react.dev" target={"_blank"}></a>',
      errors: [{ messageId: "NO_UNSAFE_TARGET_BLANK" }],
    },
    {
      code: '<a href="https://react.dev" target="_blank" rel="noopener"></a>',
      errors: [{ messageId: "NO_UNSAFE_TARGET_BLANK" }],
    },
    {
      code: '<Link href="https://react.dev" target="_blank"></Link>',
      errors: [{ messageId: "NO_UNSAFE_TARGET_BLANK" }],
    },
    {
      code: '<Link href="https://react.dev" target="_blank" rel="noopener"></Link>',
      errors: [{ messageId: "NO_UNSAFE_TARGET_BLANK" }],
    },
    // TODO: implement this
    // {
    //   code: '<a href="https://react.dev" target="_blank"></a><Link to="https://react.dev" target="_blank"></Link>',
    //   errors: [{ messageId: "NO_UNSAFE_TARGET_BLANK" }], // should be 1 error
    //   settings: {
    //     "react-x": {
    //       additionalComponents: [
    //         {
    //           name: "Link",
    //           as: "a",
    //           attributes: [
    //             {
    //               name: "to",
    //               as: "href",
    //               defaultValue: "",
    //             },
    //             {
    //               name: "rel",
    //               as: "rel",
    //               defaultValue: "noreferrer",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   },
    // },
  ],
  valid: [
    ...allValid,
    "<span></span>",
    "<a></a>",
    '<a href="https://react.dev" target="_self"></a>',
    '<a href="https://react.dev" target="_parent"></a>',
    '<Link href="https://react.dev" target="_self"></Link>',
    '<Link href="https://react.dev" target="_parent"></Link>',
    '<a href="https://react.dev" target="_blank" rel="noopener noreferrer"></a>',
    '<a href="https://react.dev" target="_blank" rel="noreferrer noopener"></a>',
    '<Link href="https://react.dev" target="_blank" rel="noopener noreferrer"></Link>',
    '<Link href="https://react.dev" target="_blank" rel={"noopener noreferrer"}></Link>',
    '<Link href="https://react.dev" target="_blank" rel="noreferrer"></Link>',
    {
      code: '<LinkButton href="https://react.dev" target="_blank"></LinkButton>',
      settings: {
        "react-x": {
          additionalComponents: [
            {
              name: "LinkButton",
              as: "a",
              attributes: [{
                name: "rel",
                as: "rel",
                defaultValue: "noreferrer",
              }],
            },
          ],
        },
      },
    },
    // TODO: implement this
    // {
    //   code: '<LinkButton to="https://react.dev" target="_blank"></LinkButton>',
    //   settings: {
    //     "react-x": {
    //       additionalComponents: [
    //         {
    //           name: "LinkButton",
    //           as: "a",
    //           attributes: [
    //             {
    //               name: "to",
    //               as: "href",
    //               defaultValue: "",
    //             },
    //             {
    //               name: "rel",
    //               as: "rel",
    //               defaultValue: "noreferrer",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   },
    // },
  ],
});
