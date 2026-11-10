import tsx from "dedent";

import { ruleTester } from "@local/testkit";
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
              messageId: "suggest",
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
              messageId: "suggest",
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
              messageId: "suggest",
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
              messageId: "suggest",
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
              messageId: "suggest",
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
              messageId: "suggest",
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
              messageId: "suggest",
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
              messageId: "suggest",
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
    // Trailing spaces between semicolon and newline
    {
      code: "<div><span />;  \n</div>",
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "suggest",
              output: "<div><span />  \n</div>",
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
              messageId: "suggest",
              output: tsx`<div><span />	
</div>`,
            },
          ],
        },
      ],
    },
    // LF after semicolon
    {
      code: tsx`<div><span />;
</div>`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "suggest",
              output: tsx`<div><span />
</div>`,
            },
          ],
        },
      ],
    },
    // CRLF after semicolon
    {
      code: "<div><span />;\r\n</div>",
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "suggest",
              output: "<div><span />\r\n</div>",
            },
          ],
        },
      ],
    },
    // Consecutive leaked semicolons: reported; the fix removes one at a time
    {
      code: tsx`
        const Component = () => {
          return (
            <div>
              <div />;;
            </div>
          );
        }
      `,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "suggest",
              output: tsx`
                const Component = () => {
                  return (
                    <div>
                      <div />;
                    </div>
                  );
                }
              `,
            },
          ],
        },
      ],
    },
    // Semicolon after a JSX child and directly before the closing tag
    {
      code: "<div><div />;</div>",
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "suggest",
              output: "<div><div /></div>",
            },
          ],
        },
      ],
    },
    // Semicolon after an expression container and directly before the closing tag
    {
      code: "<div>{x};</div>",
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "suggest",
              output: "<div>{x}</div>",
            },
          ],
        },
      ],
    },
    // Semicolon after a conditional expression container leaks when the condition is falsy
    {
      code: "<div>{cond && <span />};</div>",
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "suggest",
              output: "<div>{cond && <span />}</div>",
            },
          ],
        },
      ],
    },
    // An empty expression container renders nothing; the semicolon still leaks
    {
      code: "<div>{};</div>",
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "suggest",
              output: "<div>{}</div>",
            },
          ],
        },
      ],
    },
    {
      code: "<div>{/* c */};</div>",
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "suggest",
              output: "<div>{/* c */}</div>",
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
        return <div />;
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
    // Not leaked: text with content beyond semicolons after an expression container
    "<div>{x}; text</div>",
    // Out of scope: a semicolon between two expression containers is not adjacent to the closing tag
    "<div>{x};{y}</div>",
  ],
});
