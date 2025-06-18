---
title: prefer-namespace-import
---

**Full Name in `eslint-plugin-react-x`**

```sh copy
react-x/prefer-namespace-import
```

**Full Name in `@eslint-react/eslint-plugin`**

```sh copy
@eslint-react/prefer-namespace-import
```

**Features**

`🔧`

## Description

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

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/prefer-namespace-import.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/prefer-namespace-import.spec.ts)
