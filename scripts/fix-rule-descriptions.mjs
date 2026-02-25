#!/usr/bin/env node
/**
 * Script to fix rule descriptions in MDX files to match rule source
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// List of all mismatched rules and their correct descriptions from the verify output
const descriptions = {
  // dom rules
  "no-dangerously-set-innerhtml": "Disallows DOM elements from using 'dangerouslySetInnerHTML'.",
  "no-dangerously-set-innerhtml-with-children": "Disallows DOM elements from using 'dangerouslySetInnerHTML' and 'children' at the same time.",
  "no-find-dom-node": "Disallows 'findDOMNode'.",
  "no-flush-sync": "Disallows 'flushSync'.",
  "no-hydrate": "Replaces usage of 'ReactDOM.hydrate()' with 'hydrateRoot()'.",
  "no-missing-button-type": "Enforces an explicit 'type' attribute for 'button' elements.",
  "no-missing-iframe-sandbox": "Enforces an explicit 'sandbox' attribute for 'iframe' elements.",
  "no-namespace": "Enforces the absence of a 'namespace' in React elements.",
  "no-render": "Replaces usage of 'ReactDOM.render()' with 'createRoot(node).render()'.",
  "no-render-return-value": "Disallows the return value of 'ReactDOM.render'.",
  "no-script-url": "Disallows 'javascript:' URLs as attribute values.",
  "no-string-style-prop": "Disallows the use of string style prop in JSX. Use an object instead.",
  "no-unknown-property": "Disallows unknown 'DOM' properties.",
  "no-unsafe-iframe-sandbox": "Enforces that the 'sandbox' attribute for 'iframe' elements is not set to unsafe combinations.",
  "no-unsafe-target-blank": "Disallows 'target=\"_blank\"' without 'rel=\"noreferrer noopener\"'.",
  "no-use-form-state": "Replaces usage of 'useFormState' with 'useActionState'.",
  "no-void-elements-with-children": "Disallows 'children' in void DOM elements.",
  "prefer-namespace-import": "Enforces importing React DOM via a namespace import.",
  // naming-convention rules
  "component-name": "Enforces naming conventions for components.",
  "context-name": "Enforces the context name to be a valid component name with the suffix 'Context'.",
  "id-name": "Enforces identifier names assigned from 'useId' calls to be either 'id' or end with 'Id'.",
  "ref-name": "Enforces identifier names assigned from 'useRef' calls to be either 'ref' or end with 'Ref'.",
  // web-api rules
  "no-leaked-event-listener": "Enforces that every 'addEventListener' in a component or custom hook has a corresponding 'removeEventListener'.",
  "no-leaked-interval": "Enforces that every 'setInterval' in a component or custom hook has a corresponding 'clearInterval'.",
  "no-leaked-resize-observer": "Enforces that every 'ResizeObserver' created in a component or custom hook has a corresponding 'ResizeObserver.disconnect()'.",
  "no-leaked-timeout": "Enforces that every 'setTimeout' in a component or custom hook has a corresponding 'clearTimeout'.",
  // x rules
  "component-hook-factories": "Disallows higher order functions that define components or hooks inside them.",
  "exhaustive-deps": "Verifies the list of dependencies for Hooks like 'useEffect' and similar.",
  "immutability": "Validates against mutating props, state, and other values that are immutable.",
  "jsx-dollar": "Prevents unintentional '$' sign before expression.",
  "jsx-key-before-spread": "Enforces 'key' prop placement before spread props.",
  "jsx-no-duplicate-props": "Disallows duplicate props in JSX elements.",
  "jsx-shorthand-boolean": "Enforces shorthand syntax for boolean props.",
  "jsx-shorthand-fragment": "Enforces shorthand syntax for fragment elements.",
  "no-access-state-in-setstate": "Disallows accessing 'this.state' inside 'setState' calls.",
  "no-component-will-receive-props": "Replaces usage of 'componentWillReceiveProps' with 'UNSAFE_componentWillReceiveProps'.",
  "no-component-will-update": "Replaces usage of 'componentWillUpdate' with 'UNSAFE_componentWillUpdate'.",
  "no-context-provider": "Replaces usage of '<Context.Provider>' with '<Context>'.",
  "no-create-ref": "Disallows 'createRef' in function components.",
  "no-direct-mutation-state": "Disallows direct mutation of 'this.state'.",
  "no-forward-ref": "Replaces usage of 'forwardRef' with passing 'ref' as a prop.",
  "no-missing-component-display-name": "Enforces that all components have a 'displayName' that can be used in DevTools.",
  "no-missing-context-display-name": "Enforces that all contexts have a 'displayName' that can be used in DevTools.",
  "no-missing-key": "Disallows missing 'key' on items in list rendering.",
  "no-nested-component-definitions": "Disallows nesting component definitions inside other components.",
  "no-nested-lazy-component-declarations": "Disallows nesting lazy component declarations inside other components.",
  "no-redundant-should-component-update": "Disallows 'shouldComponentUpdate' when extending 'React.PureComponent'.",
  "no-set-state-in-component-did-mount": "Disallows calling 'this.setState' in 'componentDidMount' outside functions such as callbacks.",
  "no-set-state-in-component-did-update": "Disallows calling 'this.setState' in 'componentDidUpdate' outside functions such as callbacks.",
  "no-set-state-in-component-will-update": "Disallows calling 'this.setState' in 'componentWillUpdate' outside functions such as callbacks.",
  "no-unnecessary-use-callback": "Disallows unnecessary usage of 'useCallback'.",
  "no-unnecessary-use-memo": "Disallows unnecessary usage of 'useMemo'.",
  "no-unnecessary-use-prefix": "Enforces that a function with the 'use' prefix uses at least one Hook inside it.",
  "no-use-context": "Replaces usage of 'useContext' with 'use'.",
  "no-useless-fragment": "Disallows useless fragment elements.",
  "prefer-destructuring-assignment": "Enforces destructuring assignment for component props and context.",
  "prefer-namespace-import": "Enforces importing React via a namespace import.",
  "purity": "Validates that components and hooks are pure by checking that they do not call known-impure functions during render.",
  "refs": "Validates correct usage of refs by checking that 'ref.current' is not read or written during render.",
  "rules-of-hooks": "Enforces the Rules of Hooks.",
  "set-state-in-effect": "Validates against setting state synchronously in an effect, which can lead to re-renders that degrade performance.",
  "set-state-in-render": "Validates against unconditionally setting state during render, which can trigger additional renders and potential infinite render loops.",
  "unsupported-syntax": "Validates against syntax that React Compiler does not support.",
  "use-memo": "Validates that 'useMemo' is called with a callback that returns a value.",
  "use-state": "Enforces correct usage of 'useState', including destructuring, symmetric naming of the value and setter, and wrapping expensive initializers in a lazy initializer function.",
};

function findMdxFile(ruleName) {
  // Determine domain based on rule name
  let domain = 'x';
  if (ruleName.startsWith('no-') || ruleName.startsWith('prefer-')) {
    // Check if it's a dom rule by looking at file existence
    const domPath = path.join(rootDir, 'packages/plugins/eslint-plugin-react-dom/src/rules', ruleName, `${ruleName}.mdx`);
    if (fs.existsSync(domPath)) {
      domain = 'dom';
    }
  }

  if (ruleName === 'component-name' || ruleName === 'context-name' || ruleName === 'id-name' || ruleName === 'ref-name') {
    domain = 'naming-convention';
  }

  if (ruleName.startsWith('no-leaked')) {
    domain = 'web-api';
  }

  const pluginMap = {
    'dom': 'eslint-plugin-react-dom',
    'web-api': 'eslint-plugin-react-web-api',
    'naming-convention': 'eslint-plugin-react-naming-convention',
    'x': 'eslint-plugin-react-x'
  };

  const plugin = pluginMap[domain];
  return path.join(rootDir, 'packages/plugins', plugin, 'src/rules', ruleName, `${ruleName}.mdx`);
}

function updateDescription(filePath, newDescription) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Check if the description needs to be updated
  const descMatch = content.match(/^(---\ntitle:.*\ndescription: )([^\n]+)(\n---)/s);
  if (!descMatch) {
    console.log(`Skipping ${filePath} - could not find description`);
    return;
  }

  const currentDesc = descMatch[2];
  if (currentDesc === newDescription) {
    return; // Already correct
  }

  // Replace the description
  const updated = content.replace(
    /^(---\ntitle:.*\ndescription: )([^\n]+)(\n---)/s,
    `$1${newDescription}$3`
  );

  if (updated !== content) {
    fs.writeFileSync(filePath, updated, 'utf-8');
    console.log(`Updated ${filePath}`);
    console.log(`  From: ${currentDesc}`);
    console.log(`  To:   ${newDescription}`);
  }
}

let count = 0;
for (const [ruleName, description] of Object.entries(descriptions)) {
  const mdxPath = findMdxFile(ruleName);
  if (fs.existsSync(mdxPath)) {
    updateDescription(mdxPath, description);
    count++;
  } else {
    console.log(`File not found: ${mdxPath}`);
  }
}

console.log(`\nProcessed ${count} rules`);
console.log('Done!');
