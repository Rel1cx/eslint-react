import { MermaidDiagram } from "@/components/MermaidDiagram";
import mermaid from "dedent";

const functionComponentCollectorSequence = mermaid`
  sequenceDiagram
    autonumber
    participant Rule as ESLint Rule
    participant Collector as getFunctionComponentCollector
    participant Visitor as visitor
    participant Stack as functionEntries (stack)
    participant Detect as function-component.ts
    participant Components as components (Map)

    Rule->>Collector: getFunctionComponentCollector(context, options)
    Collector-->>Rule: { api, visitor }

    loop AST traversal
      Rule->>Visitor: ":function" (enter)
      Visitor->>Detect: getFunctionComponentId / getFunctionInitPath / getFunctionDirectives
      Detect-->>Visitor: id, initPath, directives
      Visitor->>Detect: isFunctionComponentDefinition(context, node, hint)
      Detect-->>Visitor: true / false
      Visitor->>Stack: push(entry)
      opt is component definition and has "use memo" / "use no memo" directive
        Visitor->>Components: set(entry.key, entry)
      end

      Rule->>Visitor: ReturnStatement / implicit arrow return
      Visitor->>Stack: peek current entry
      Visitor->>Stack: entry.rets.push(argument)
      opt is component definition and return value is JSX-like
        Visitor->>Components: set(entry.key, entry)
      end

      Rule->>Visitor: CallExpression
      opt isHookCall(node)
        Visitor->>Stack: entry.hookCalls.push(node)
        opt is component definition
          Visitor->>Components: set(entry.key, entry)
        end
      end

      opt collectDisplayName enabled
        Rule->>Visitor: "Component.displayName = ..." assignment
        Visitor->>Components: find component by name, set displayName
      end

      Rule->>Visitor: ":function:exit"
      Visitor->>Stack: pop()
    end

    Rule->>Collector: api.getAllComponents(program)
    Collector->>Components: [...components.values()]
    Components-->>Rule: FunctionComponentSemanticNode[]
`;

export function FunctionComponentCollectorSequence() {
  return <MermaidDiagram code={functionComponentCollectorSequence} />;
}

const ruleDocumentationPipeline = mermaid`
  flowchart TD
    subgraph Sources
      RuleDocs["plugins/eslint-plugin-react-*/src/rules/*/*.mdx"]
      Relations["docs/rule-relations-table.md"]
      RuleChangelogs["per-rule CHANGELOG.md"]
      RootChangelog["CHANGELOG.md (repo root)"]
    end

    subgraph Pass1["Pass 1: Collect"]
      CollectDocs["collectDocs\nglob .mdx -> RuleMeta[]\n(name / title / source / destination)"]
      LoadRelations["loadRuleRelations\nparse 'Detailed References' table\n-> RuleRelationsMap"]
      GenVersions["generateRuleVersions (x8)\nparseChangelogVersions\n-> versionsMap (Accordions)"]
    end

    subgraph Pass2["Pass 2: Copy rule docs"]
      CopyDoc["copyRuleDoc (x8)"]
      AddImport["addAccordionImport\n(fumadocs-ui accordion)"]
      InsertVersions["insertVersionsSection\nbefore '## Resources' / '## See Also'"]
      SeeAlso["generateSeeAlsoSection\ngetFullRuleName -> links"]
    end

    subgraph Pass3["Pass 3: Site metadata"]
      MetaJson["generateRuleMetaJson\ngroup by category, sort A-Z"]
      ProcChangelog["processChangelog\nadd frontmatter, strip H1"]
    end

    subgraph Outputs
      OutDocs["apps/website/content/docs/rules/*.mdx"]
      OutMeta["apps/website/content/docs/rules/meta.json"]
      OutChangelog["apps/website/content/docs/changelog.md"]
    end

    RuleDocs --> CollectDocs
    Relations --> LoadRelations
    RuleChangelogs --> GenVersions
    CollectDocs --> GenVersions

    CollectDocs --> CopyDoc
    LoadRelations --> SeeAlso
    GenVersions --> InsertVersions

    CopyDoc --> AddImport --> InsertVersions --> SeeAlso --> OutDocs

    CollectDocs --> MetaJson --> OutMeta
    RootChangelog --> ProcChangelog --> OutChangelog
`;

export function RuleDocumentationPipelineDiagram() {
  return <MermaidDiagram code={ruleDocumentationPipeline} />;
}
