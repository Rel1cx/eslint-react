# naming-convention/filename-extension

## Rule category

Style.

## What it does

Enforces consistent use of the JSX file extension.

## Why is this good?

Following naming conventions can make codebase more consistent and easier to understand, navigate and work with.

And it's not a good practice to use `.jsx`, `.tsx` file extensions for files that don't contain JSX syntax.

## Examples

This rule enforces consistent file extensions for JSX files.

## Rule Options

- `allow`: When to allow a JSX filename extension.
  - `"always"`: (default) allow all file use JSX file extension.
  - `"as-needed"`: allow JSX file extension only if the file contains JSX syntax.
- `extensions`: List of file extensions that should be checked by this rule. By default, it checks `.jsx`, `.tsx` and `.mtx` files.
