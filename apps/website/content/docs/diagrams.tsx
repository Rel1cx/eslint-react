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
