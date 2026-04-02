import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./no-leaked-semicolon";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        const Component = () => {
          return (
            <div>
              <div />;
            </div>
          );
        }
      `,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeSemicolon",
              output: tsx`
                const Component = () => {
                  return (
                    <div>
                      <div />
                    </div>
                  );
                }
              `,
            },
          ],
        },
      ],
    },
    {
      code: tsx`
        const Component = () => {
          return (
            <div>
              <Component>
                <div />
              </Component>;
            </div>
          );
        }
      `,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeSemicolon",
              output: tsx`
                const Component = () => {
                  return (
                    <div>
                      <Component>
                        <div />
                      </Component>
                    </div>
                  );
                }
              `,
            },
          ],
        },
      ],
    },
    {
      code: tsx`
        const Component = () => (
          <div>
            <Component />;
          </div>
        )
      `,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeSemicolon",
              output: tsx`
                const Component = () => (
                  <div>
                    <Component />
                  </div>
                )
              `,
            },
          ],
        },
      ],
    },
    {
      code: tsx`
        const Component = () => {
          return (
            <>
              <div />;
            </>
          );
        }
      `,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeSemicolon",
              output: tsx`
                const Component = () => {
                  return (
                    <>
                      <div />
                    </>
                  );
                }
              `,
            },
          ],
        },
      ],
    },
    {
      code: tsx`
        const Component = () => {
          return (
            <>
              <Component>
                <div />
              </Component>;
            </>
          );
        }
      `,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeSemicolon",
              output: tsx`
                const Component = () => {
                  return (
                    <>
                      <Component>
                        <div />
                      </Component>
                    </>
                  );
                }
              `,
            },
          ],
        },
      ],
    },
  ],
  valid: [
    tsx`
      const Component = () => {
        return (
          <div>
            <div />
          </div>
        );
      }
    `,
    tsx`
      const Component = () => {
        return (
          <div>
            <div />
            ;
          </div>
        );
      }
    `,
    tsx`
      const Component = () => {
        return (
          <div>
            <div />{';'}
          </div>
        );
      }
    `,
    tsx`
      const Component = () => {
        return (
          <div>
            <div />&#59;
          </div>
        );
      }
    `,
    tsx`
      const Component = () => {
        return (
          <div>
            <span>;</span>
            <span />;<span />
            text; text;
            &amp;
          </div>
        );
      }
    `,
    tsx`
      const Component = () => {
        return <div />;
      }
    `,
    tsx`
      const Component = () => {
        return (
          <div>
            <div />text;
          </div>
        );
      }
    `,
  ],
});
