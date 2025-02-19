[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / ProjectServiceOptions

# Interface: ProjectServiceOptions

Granular options to configure the project service.

## Properties

### allowDefaultProject?

> `optional` **allowDefaultProject**: `string`[]

Globs of files to allow running with the default project compiler options
despite not being matched by the project service.

***

### defaultProject?

> `optional` **defaultProject**: `string`

Path to a TSConfig to use instead of TypeScript's default project configuration.

#### Default

```ts
'tsconfig.json'
```

***

### loadTypeScriptPlugins?

> `optional` **loadTypeScriptPlugins**: `boolean`

Whether to allow TypeScript plugins as configured in the TSConfig.

***

### maximumDefaultProjectFileMatchCount\_THIS\_WILL\_SLOW\_DOWN\_LINTING?

> `optional` **maximumDefaultProjectFileMatchCount\_THIS\_WILL\_SLOW\_DOWN\_LINTING**: `number`

The maximum number of files [allowDefaultProject](ProjectServiceOptions.md#allowdefaultproject) may match.
Each file match slows down linting, so if you do need to use this, please
file an informative issue on typescript-eslint explaining why - so we can
help you avoid using it!

#### Default

```ts
8
```
