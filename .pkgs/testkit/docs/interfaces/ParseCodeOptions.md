[@local/testkit](../README.md) / ParseCodeOptions

# Interface: ParseCodeOptions

## Properties

| Property                                       | Type                                     | Description                                                                                                   |
| ---------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| <a id="property-filepath"></a> `filePath?`     | `string`                                 | Anchor file path used for parser inference (a `.tsx` path enables JSX). Defaults to the `estree.tsx` fixture. |
| <a id="property-jsx"></a> `jsx?`               | `boolean`                                | Passed through to the parser; when omitted, JSX support is inferred from `filePath`.                          |
| <a id="property-sourcetype"></a> `sourceType?` | `"commonjs"` \| `"module"` \| `"script"` | -                                                                                                             |
