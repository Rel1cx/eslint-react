import type { ESLintReactSettings } from "@eslint-react/shared";

import { name, version } from "../package.json";
import noChildrenInVoidDomElements from "./rules/no-children-in-void-dom-elements";
import noDangerouslySetInnerHTML from "./rules/no-dangerously-set-innerhtml";
import noDangerouslySetInnerHTMLWithChildren from "./rules/no-dangerously-set-innerhtml-with-children";
import noFindDomNode from "./rules/no-find-dom-node";
import noMissingButtonType from "./rules/no-missing-button-type";
import noMissingIframeSandbox from "./rules/no-missing-iframe-sandbox";
import noNamespace from "./rules/no-namespace";
import noRenderReturnValue from "./rules/no-render-return-value";
import noScriptUrl from "./rules/no-script-url";
import noUnsafeIframeSandbox from "./rules/no-unsafe-iframe-sandbox";
import noUnsafeTargetBlank from "./rules/no-unsafe-target-blank";

export const meta = {
  name,
  version,
} as const;

export const rules = {
  "no-children-in-void-dom-elements": noChildrenInVoidDomElements,
  "no-dangerously-set-innerhtml": noDangerouslySetInnerHTML,
  "no-dangerously-set-innerhtml-with-children": noDangerouslySetInnerHTMLWithChildren,
  "no-find-dom-node": noFindDomNode,
  "no-missing-button-type": noMissingButtonType,
  "no-missing-iframe-sandbox": noMissingIframeSandbox,
  "no-namespace": noNamespace,
  "no-render-return-value": noRenderReturnValue,
  "no-script-url": noScriptUrl,
  "no-unsafe-iframe-sandbox": noUnsafeIframeSandbox,
  "no-unsafe-target-blank": noUnsafeTargetBlank,
} as const;

export const DEFAULT_ESLINT_REACT_SETTINGS = {
  additionalComponents: [
    {
      name: "Link",
      as: "a",
      attributes: [
        {
          name: "to",
          as: "href",
        },
      ],
    },
  ],
  skipImportCheck: false,
} as const satisfies ESLintReactSettings;
