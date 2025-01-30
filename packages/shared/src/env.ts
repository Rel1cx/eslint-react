/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable no-constant-binary-expression */
// Ported from https://github.com/antfu/eslint-config/blob/9a2a48bcda2e9ed026a9031924f8f6eae4af6728/src/utils.ts#L135
export function isInEditorEnv() {
  if (process.env["CI"]) {
    return false;
  }
  if (isInGitHooksOrLintStaged()) {
    return false;
  }
  return !!(false
    || process.env["VSCODE_PID"]
    || process.env["VSCODE_CWD"]
    || process.env["JETBRAINS_IDE"]
    || process.env["VIM"]
    || process.env["NVIM"]);
}

export function isInGitHooksOrLintStaged() {
  return !!(false
    || process.env["GIT_PARAMS"]
    || process.env["VSCODE_GIT_COMMAND"]
    || process.env["npm_lifecycle_script"]?.startsWith("lint-staged"));
}
