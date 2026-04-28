import { MermaidDiagram } from "@/components/ui/MermaidDiagram";
import mermaid from "dedent";

const functionComponentCollectorSequence = mermaid`
  sequenceDiagram
    autonumber
    participant Rule as ESLint Rule
    participant Factory as getFunctionComponentCollector
    participant Visitor as Rule Visitor
    participant Stack as FunctionEntry Stack
    participant Map as Components Map

    Rule->>Factory: invoke(context, options)
    Factory->>Factory: initialize functionEntries []
    Factory->>Factory: initialize components Map
    Factory-->>Rule: return { api, visitor }

    Note over Rule,Visitor: AST Traversal begins

    loop For every :function node
      Visitor->>Stack: onFunctionEnter(node)
      Stack->>Stack: generate key, id, name, initPath, directives
      Stack->>Stack: push(entry)
      alt is component definition + loose name + has memo directives
        Stack->>Map: components.set(key, entry)
      end

      alt ArrowFunctionExpression with expression body
        Visitor->>Stack: get current entry
        Stack-->>Visitor: entry
        Visitor->>Stack: entry.rets.push(body)
        alt is component definition && (already in map || JSX-like body)
          Visitor->>Map: components.set(key, entry)
        end
      end

      alt CallExpression (hook call)
        Visitor->>Stack: get current entry
        Stack-->>Visitor: entry
        Visitor->>Stack: entry.hookCalls.push(node)
        alt is component definition
          Visitor->>Map: components.set(key, entry)
        end
      end

      alt ReturnStatement
        Visitor->>Stack: get current entry
        Stack-->>Visitor: entry
        Visitor->>Stack: entry.rets.push(argument)
        alt is component definition && (already in map || JSX-like argument)
          Visitor->>Map: components.set(key, entry)
        end
      end

      opt Optional: displayName assignment
        Visitor->>Map: find component by name
        Map-->>Visitor: component
        Visitor->>Map: component.displayName = right
      end

      Visitor->>Stack: onFunctionExit()
      Stack->>Stack: pop entry
    end

    Note over Rule,Map: After traversal completes
    Rule->>Factory: api.getAllComponents(program)
    Factory-->>Rule: return Array.from(components.values())
`;

export function FunctionComponentCollectorSequence() {
  return <MermaidDiagram code={functionComponentCollectorSequence} />;
}

const configInheritance = mermaid`
  flowchart TB
    subgraph base["Base Configs (Leaf Nodes)"]
      x["x"]
      jsx["jsx"]
      dom["dom"]
      rsc["rsc"]
      webapi["web-api"]
      naming["naming-convention"]
      ts["_ts"]
    end

    subgraph compose["Composed Configs"]
      rec["recommended"]
      strict["strict"]
      rectypescript["recommended-typescript"]
      stricttypescript["strict-typescript"]
      rectypechecked["recommended-type-checked"]
      stricttypechecked["strict-type-checked"]
      all["all"]
      off["off"]
    end

    subgraph disable["Disable Configs"]
      disabledom["disable-dom"]
      disablejsx["disable-jsx"]
      disablersc["disable-rsc"]
      disablewebapi["disable-web-api"]
      disablenaming["disable-naming-convention"]
      disabletypechecked["disable-type-checked"]
      disableexperimental["disable-experimental"]
      disableconflictreact["disable-conflict-eslint-plugin-react"]
      disableconflicthooks["disable-conflict-eslint-plugin-react-hooks"]
    end

    x --> rec
    jsx --> rec
    dom --> rec
    rsc --> rec
    webapi --> rec
    naming --> rec

    rec --> strict
    rec --> rectypescript
    strict --> stricttypescript
    rectypescript --> rectypechecked
    stricttypescript --> stricttypechecked

    ts --> rectypescript
    ts --> stricttypescript

    all --> off
    disabletypechecked --> off

    dom --> disabledom
    jsx --> disablejsx
    rsc --> disablersc
    webapi --> disablewebapi
    naming --> disablenaming
`;

export function ConfigInheritanceDiagram() {
  return <MermaidDiagram code={configInheritance} />;
}

const releaseAutomationPipeline = mermaid`
  flowchart TB
    subgraph inputs["📥 Release Inputs"]
      VERSION["VERSION file"]
      CHANGELOG["CHANGELOG.md"]
      README_SRC["README.md"]
      RULE_DOCS["plugins/*/src/rules/*/*.mdx"]
      RELATIONS["docs/rule-relations-table.md"]
    end

    subgraph scripts["🔧 Automation Scripts"]
      UV["update-version.ts"]
      UR["update-readme.ts"]
      UW["update-website.ts"]
    end

    subgraph outputs["📤 Generated Outputs"]
      PKG["package.json<br/>packages/*/package.json<br/>plugins/*/package.json"]
      README_DST["README.md<br/>plugins/eslint-plugin/README.md"]
      WEB_RULES["apps/website/content/docs/rules/*.mdx"]
      META["apps/website/content/docs/rules/meta.json"]
      WEB_CL["apps/website/content/docs/changelog.md"]
    end

    VERSION -->|"reads version"| UV
    UV -->|"writes"| PKG

    README_SRC -->|"reads"| UR
    UR -->|"updates badges & links"| README_DST

    RULE_DOCS -->|"collects"| UW
    RELATIONS -->|"parses See Also"| UW
    CHANGELOG -->|"wraps frontmatter"| UW
    UW -->|"copies + generates"| WEB_RULES
    UW -->|"generates"| META
    UW -->|"syncs"| WEB_CL
`;

export function ReleaseAutomationPipelineDiagram() {
  return <MermaidDiagram code={releaseAutomationPipeline} />;
}

const ruleDocumentationPipeline = mermaid`
  flowchart LR
    subgraph sources["📥 Rule Sources"]
      MDX["plugins/*/src/rules/*/*.mdx"]
      REL["docs/rule-relations-table.md<br/>Detailed References"]
      CL["CHANGELOG.md"]
    end

    subgraph process["🔧 update-website.ts"]
      COLLECT["collectDocs()<br/>Gather rule metadata"]
      COPY["copyRuleDoc()<br/>Copy .mdx + append See Also"]
      META["generateRuleMetaJson()<br/>Build sidebar meta.json"]
      PROC_CL["processChangelog()<br/>Wrap with frontmatter"]
    end

    subgraph outputs["📤 Website Outputs"]
      WEB_MDX["apps/website/content/docs/rules/*.mdx"]
      WEB_META["apps/website/content/docs/rules/meta.json"]
      WEB_CL["apps/website/content/docs/changelog.md"]
    end

    MDX --> COLLECT
    COLLECT --> COPY
    REL --> COPY
    COPY --> WEB_MDX

    COLLECT --> META
    META --> WEB_META

    CL --> PROC_CL
    PROC_CL --> WEB_CL
`;

export function RuleDocumentationPipelineDiagram() {
  return <MermaidDiagram code={ruleDocumentationPipeline} />;
}

const verificationDataFlow = mermaid`
  flowchart TB
    subgraph rule_src["📥 Rule Source Files"]
      RULE_TS["plugins/*/src/rules/*/*.ts<br/>(excluding .spec.ts, .test.ts, lib.ts)"]
      RULE_MDX["plugins/*/src/rules/*/*.mdx"]
    end

    subgraph verify_configs["🔍 verify-configs.ts"]
      A1["1. Collect registered rules<br/>from plugin.ts exports"]
      A2["2. Check all rules accounted for<br/>in all / disable-experimental /<br/>disable-type-checked"]
      A3["3. Validate config keys<br/>against registered rules"]
      A4["4. Verify preset hierarchy<br/>recommended ⊂ strict ⊂ all"]
      A5["5. Check domain configs<br/>dom / jsx / rsc / web-api /<br/>naming-convention"]
    end

    subgraph verify_docs["🔍 verify-rule-docs.ts"]
      B1["Check description<br/>matches meta.docs.description"]
      B2["Check features emoji<br/>matches RULE_FEATURES"]
      B3["Check presets severity<br/>matches recommended/strict"]
      B4["Check resources links<br/>Rule Source + Test Source"]
      B5["Verify rules/index.mdx<br/>View by Domain table"]
    end

    RULE_TS --> A1
    A1 --> A2
    A1 --> A3
    A1 --> A5
    A3 --> A4

    RULE_TS --> B1
    RULE_TS --> B2
    RULE_TS --> B3
    RULE_MDX --> B4
    RULE_TS --> B5
    RULE_MDX --> B5
`;

export function VerificationDataFlowDiagram() {
  return <MermaidDiagram code={verificationDataFlow} />;
}
