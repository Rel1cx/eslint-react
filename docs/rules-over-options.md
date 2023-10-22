# Rules Over Options

Each rule should have a single purpose. Make multiple rules work together to achieve more complex behaviors instead of adding endless options to a single rule.

## Why?

1. Rules are easier to maintain.
2. Rules are easier to document.
3. Rules are easier to test.
4. Rules are easier to setup and use.
5. Rules are easier to understand and reason about. (both for human and GitHub Copilot).
6. Rules are easier to enforce (e.g. in CI or editor).
7. Rules are easier to categorize (e.g. by type or severity).
8. Rules are easier to enable/disable conditionally (e.g. in config's presets or based on file path or file extension).
9. The behavior of rules is easier to understand, predict and debug.
10. The behavior of rules is easier to modify without backward compatibility concerns. Options are harder to change once they are in use.
11. The error messages of rules are easier to identify in codebase.
12. The error messages of rules are easier to search for on the internet (e.g. StackOverflow).
