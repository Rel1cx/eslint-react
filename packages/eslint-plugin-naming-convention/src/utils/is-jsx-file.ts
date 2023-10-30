import { JSX_EXTENSIONS } from "@eslint-react/shared";

export const isJSXFile = (ext: string): ext is ".jsx" | ".tsx" => JSX_EXTENSIONS.includes(ext);
