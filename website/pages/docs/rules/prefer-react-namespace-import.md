# prefer-react-namespace-import

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/prefer-react-namespace-import
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/prefer-react-namespace-import
```

**Features**

`🔍` `🔧`

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/prefer-react-namespace-import.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/prefer-react-namespace-import.spec.ts)

## What it does

Enforces React is imported via a namespace import.

## Examples

### Failing

```tsx
import React from "react";

import type React from "react";

import React, { useState } from "react";

import type React, { useState } from "react";
```

### Passing

```tsx
import * as React from "react";

import type * as React from "react";

import { useState } from "react";

import type { useState } from "react";
```
