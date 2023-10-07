import dedent from "dedent";

import { allValid } from "../../test/common/valid";
import RuleTester, { getFixturesRootDir } from "../../test/rule-tester";
import rule, { RULE_NAME } from "./no-unstable-nested-components";

const rootDir = getFixturesRootDir();

const ruleTester = new RuleTester({
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: rootDir,
    },
});

ruleTester.run(RULE_NAME, rule, {
    valid: [
        ...allValid,
        // TODO: add more valid cases
    ],
    invalid: [
        {
            code: dedent`
                function ParentComponent() {
                  function UnstableNestedFunctionComponent() {
                    return <div />;
                  }

                  return (
                    <div>
                      <UnstableNestedFunctionComponent />
                    </div>
                  );
                }
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                function ParentComponent() {
                  function UnstableNestedFunctionComponent() {
                    return React.createElement("div", null);
                  }

                  return React.createElement(
                    "div",
                    null,
                    React.createElement(UnstableNestedFunctionComponent, null)
                  );
                }
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                function ParentComponent() {
                  const UnstableNestedVariableComponent = () => {
                    return <div />;
                  }

                  return (
                    <div>
                      <UnstableNestedVariableComponent />
                    </div>
                  );
                }
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                function ParentComponent() {
                  const UnstableNestedVariableComponent = () => {
                    return React.createElement("div", null);
                  }

                  return React.createElement(
                    "div",
                    null,
                    React.createElement(UnstableNestedVariableComponent, null)
                  );
                }
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                const ParentComponent = () => {
                  function UnstableNestedFunctionComponent() {
                    return <div />;
                  }

                  return (
                    <div>
                      <UnstableNestedFunctionComponent />
                    </div>
                  );
                }
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                const ParentComponent = () => {
                  function UnstableNestedFunctionComponent() {
                    return React.createElement("div", null);
                  }

                  return React.createElement(
                    "div",
                    null,
                    React.createElement(UnstableNestedFunctionComponent, null)
                  );
                }
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                export default () => {
                  function UnstableNestedFunctionComponent() {
                    return <div />;
                  }

                  return (
                    <div>
                      <UnstableNestedFunctionComponent />
                    </div>
                  );
                }
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                export default () => {
                  function UnstableNestedFunctionComponent() {
                    return React.createElement("div", null);
                  }

                  return React.createElement(
                    "div",
                    null,
                    React.createElement(UnstableNestedFunctionComponent, null)
                  );
                };
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                const ParentComponent = () => {
                  const UnstableNestedVariableComponent = () => {
                    return <div />;
                  }

                  return (
                    <div>
                      <UnstableNestedVariableComponent />
                    </div>
                  );
                }
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                const ParentComponent = () => {
                  const UnstableNestedVariableComponent = () => {
                    return React.createElement("div", null);
                  }

                  return React.createElement(
                    "div",
                    null,
                    React.createElement(UnstableNestedVariableComponent, null)
                  );
                }
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                function ParentComponent() {
                  class UnstableNestedClassComponent extends React.Component {
                    render() {
                      return <div />;
                    }
                  };

                  return (
                    <div>
                      <UnstableNestedClassComponent />
                    </div>
                  );
                }
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                function ParentComponent() {
                  class UnstableNestedClassComponent extends React.Component {
                    render() {
                      return React.createElement("div", null);
                    }
                  }

                  return React.createElement(
                    "div",
                    null,
                    React.createElement(UnstableNestedClassComponent, null)
                  );
                }
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                class ParentComponent extends React.Component {
                  render() {
                    class UnstableNestedClassComponent extends React.Component {
                      render() {
                        return <div />;
                      }
                    };

                    return (
                      <div>
                        <UnstableNestedClassComponent />
                      </div>
                    );
                  }
                }
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                class ParentComponent extends React.Component {
                  render() {
                    class UnstableNestedClassComponent extends React.Component {
                      render() {
                        return React.createElement("div", null);
                      }
                    }

                    return React.createElement(
                      "div",
                      null,
                      React.createElement(UnstableNestedClassComponent, null)
                    );
                  }
                }
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                class ParentComponent extends React.Component {
                  render() {
                    function UnstableNestedFunctionComponent() {
                      return <div />;
                    }

                    return (
                      <div>
                        <UnstableNestedFunctionComponent />
                      </div>
                    );
                  }
                }
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                class ParentComponent extends React.Component {
                  render() {
                    function UnstableNestedClassComponent() {
                      return React.createElement("div", null);
                    }

                    return React.createElement(
                      "div",
                      null,
                      React.createElement(UnstableNestedClassComponent, null)
                    );
                  }
                }
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                class ParentComponent extends React.Component {
                  render() {
                    const UnstableNestedVariableComponent = () => {
                      return <div />;
                    }

                    return (
                      <div>
                        <UnstableNestedVariableComponent />
                      </div>
                    );
                  }
                }
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: `
            class ParentComponent extends React.Component {
              render() {
                const UnstableNestedClassComponent = () => {
                  return React.createElement("div", null);
                }

                return React.createElement(
                  "div",
                  null,
                  React.createElement(UnstableNestedClassComponent, null)
                );
              }
            }
          `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                function ParentComponent() {
                  function getComponent() {
                    function NestedUnstableFunctionComponent() {
                      return <div />;
                    };

                    return <NestedUnstableFunctionComponent />;
                  }

                  return (
                    <div>
                      {getComponent()}
                    </div>
                  );
                }
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                function ParentComponent() {
                  function getComponent() {
                    function NestedUnstableFunctionComponent() {
                      return React.createElement("div", null);
                    }

                    return React.createElement(NestedUnstableFunctionComponent, null);
                  }

                  return React.createElement("div", null, getComponent());
                }
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                function ComponentWithProps(props) {
                  return <div />;
                }

                function ParentComponent() {
                  return (
                    <ComponentWithProps
                      footer={
                        function SomeFooter() {
                          return <div />;
                        }
                      } />
                  );
                }
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                function ComponentWithProps(props) {
                  return React.createElement("div", null);
                }

                function ParentComponent() {
                  return React.createElement(ComponentWithProps, {
                    footer: function SomeFooter() {
                      return React.createElement("div", null);
                    }
                  });
                }
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
                function ComponentWithProps(props) {
                  return <div />;
                }

                function ParentComponent() {
                    return (
                      <ComponentWithProps footer={() => <div />} />
                    );
                }
            `,
            errors: [{ messageId: "INVALID" }],
        },
        // TODO: add more invalid cases
    ],
});
