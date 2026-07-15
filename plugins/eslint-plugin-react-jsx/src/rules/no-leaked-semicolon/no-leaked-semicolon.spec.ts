import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
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
      code: "<div><span />;  \n</div>",
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeSemicolon",
              output: "<div><span />  \n</div>",
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
    // Semicolon after element followed by text on next line
    {
      code: tsx`
        const Component = () => {
          return (
            <div>
              <div />;
              text
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
                      text
                    </div>
                  );
                }
              `,
            },
          ],
        },
      ],
    },
    // Nested element
    {
      code: tsx`
        const Component = () => {
          return (
            <div>
              <span>
                <div />;
              </span>
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
                      <span>
                        <div />
                      </span>
                    </div>
                  );
                }
              `,
            },
          ],
        },
      ],
    },
    // Nested element with semicolon + newline (still a leaked semicolon)
    {
      code: tsx`
        const Component = () => {
          return (
            <div>
              <span>;
              </span>
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
                      <span>
                      </span>
                    </div>
                  );
                }
              `,
            },
          ],
        },
      ],
    },
    // Tab between semicolon and newline
    {
      code: tsx`<div><span />;	
</div>`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeSemicolon",
              output: tsx`<div><span />	
</div>`,
            },
          ],
        },
      ],
    },
    // CRLF after semicolon
    {
      code: tsx`<div><span />;
</div>`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeSemicolon",
              output: tsx`<div><span />
</div>`,
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
            <div />&#59;  
          </div>
        );
      }
    `,
    tsx`
      const Component = () => {
        return (
          <div>
            <div />&semi;
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
    // Not leaked: semicolon without following newline
    "<div>;<span /></div>",
    // Not leaked: whitespace before semicolon+newline
    tsx`
      const Component = () => {
        return (
          <div>
             ;
          </div>
        );
      }
    `,
    // Not leaked: semicolon in the middle of text
    tsx`
      const Component = () => {
        return (
          <div>
            text;
          </div>
        );
      }
    `,
    // Not leaked: semicolon inside nested element without following newline
    "<div><span>;</span></div>",
    // Not leaked: attribute value
    "<div attr='a;b' />",
  ],
});
