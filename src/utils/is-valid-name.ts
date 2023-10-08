import { isNil } from "rambda";

const reComponentName = /^[A-Z]/u;
const reHookName = /^use[A-Z\d].*$/u;

export function isValidReactComponentName(name: null | string | undefined): name is string {
    if (isNil(name)) {
        return false;
    }

    return reComponentName.test(name);
}

export function isValidReactHookName(name: null | string | undefined): name is string {
    if (isNil(name)) {
        return false;
    }

    return reHookName.test(name);
}
