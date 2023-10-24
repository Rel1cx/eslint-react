import { allValid } from "@eslint-react/shared";
import dedent from "dedent";

import RuleTester, { getFixturesRootDir } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./class-component";

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
    ],
    invalid: [
        {
            code: dedent`
                class ParentComponent extends React.Component {
                  render() {
                    return <div />;
                  }
                }
            `,
            errors: [{ messageId: "CLASS_COMPONENT" }],
        },
        {
            code: dedent`
                const ClassComponent = class extends React.Component {
                    render() {
                        return <div />;
                    }
                 };
            `,
            errors: [{ messageId: "CLASS_COMPONENT" }],
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
            errors: [{ messageId: "CLASS_COMPONENT" }],
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
            errors: [
                { messageId: "CLASS_COMPONENT" },
                { messageId: "CLASS_COMPONENT" },
            ],
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
            errors: [
                { messageId: "CLASS_COMPONENT" },
                { messageId: "CLASS_COMPONENT" },
            ],
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
            errors: [{ messageId: "CLASS_COMPONENT" }],
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
            errors: [{ messageId: "CLASS_COMPONENT" }],
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
            errors: [{ messageId: "CLASS_COMPONENT" }],
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
            errors: [{ messageId: "CLASS_COMPONENT" }],
        },
        {
            code: dedent`
                class ParentComponent extends React.Component {
                  render() {
                    const List = () => {
                      return <ul>item</ul>;
                    };

                    return <List {...this.props} />;
                  }
                }
            `,
            errors: [{ messageId: "CLASS_COMPONENT" }],
        },
        {
            code: dedent`
                class ParentComponent extends React.Component {
                  render() {
                    const List = (props) => {
                      const items = props.items
                        .map((item) => (
                          <li key={item.key}>
                            <span>{item.name}</span>
                          </li>
                        ));

                      return <ul>{items}</ul>;
                    };

                    return <List {...this.props} />;
                  }
                }
            `,
            errors: [{ messageId: "CLASS_COMPONENT" }],
        },
    ],
});
