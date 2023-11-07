# naming-convention/filename-extension

<!-- end auto-generated rule header -->

## Rule category

Style.

## What it does

Enforces consistent use of the JSX file extension.

## Why is this good?

Following naming conventions can make code base more consistent and easier to understand, navigate and work with.

And it's not a good practice to use `.jsx`, `.tsx` file extensions for files that don't contain JSX syntax.

## Examples

This rule enforces consistent file extensions for JSX files.

## Rule Options

This rule has a string option:

- `rule`: The rule to enforce. Possible values are:
  - `"always"`: (default) allow all file use JSX file extension.
  - `"as-needed"`: allow JSX file extension only if the file contains JSX syntax.
