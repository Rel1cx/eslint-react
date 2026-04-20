import { MermaidDiagram } from "#/components/ui/MermaidDiagram";
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
