import { name, version } from "../package.json";
import noDangerouslySetInnerHTML from "./rules/no-dangerously-set-innerhtml";
import noDangerouslySetInnerHTMLWithChildren from "./rules/no-dangerously-set-innerhtml-with-children";
import noFindDomNode from "./rules/no-find-dom-node";
import noFlushSync from "./rules/no-flush-sync";
import noHydrate from "./rules/no-hydrate";
import noMissingButtonType from "./rules/no-missing-button-type";
import noMissingIframeSandbox from "./rules/no-missing-iframe-sandbox";
import noNamespace from "./rules/no-namespace";
import noRender from "./rules/no-render";
import noRenderReturnValue from "./rules/no-render-return-value";
import noScriptUrl from "./rules/no-script-url";
import noUnknownProperty from "./rules/no-unknown-property";
import noUnsafeIframeSandbox from "./rules/no-unsafe-iframe-sandbox";
import noUnsafeTargetBlank from "./rules/no-unsafe-target-blank";
import noUseFormState from "./rules/no-use-form-state";
import noVoidElementsWithChildren from "./rules/no-void-elements-with-children";

export const plugin = {
  meta: {
    name,
    version,
  },
  rules: {
    "no-dangerously-set-innerhtml": noDangerouslySetInnerHTML,
    "no-dangerously-set-innerhtml-with-children": noDangerouslySetInnerHTMLWithChildren,
    "no-find-dom-node": noFindDomNode,
    "no-flush-sync": noFlushSync,
    "no-hydrate": noHydrate,
    "no-missing-button-type": noMissingButtonType,
    "no-missing-iframe-sandbox": noMissingIframeSandbox,
    "no-namespace": noNamespace,
    "no-render": noRender,
    "no-render-return-value": noRenderReturnValue,
    "no-script-url": noScriptUrl,
    "no-unknown-property": noUnknownProperty,
    "no-unsafe-iframe-sandbox": noUnsafeIframeSandbox,
    "no-unsafe-target-blank": noUnsafeTargetBlank,
    "no-use-form-state": noUseFormState,
    "no-void-elements-with-children": noVoidElementsWithChildren,
  },
} as const;
