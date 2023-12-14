// Copied from https://github.com/eslint-functional/eslint-plugin-functional/blob/e4bd4ad79502ff77ae26e703e1761ab80a46868b/src/utils/merge-configs.ts
import { deepmergeCustom } from "deepmerge-ts";

export const mergeConfigs = deepmergeCustom<
  {},
  {
    keyPath: PropertyKey[];
  }
>({
  mergeArrays(values, utils, meta) {
    if (
      meta !== undefined
      && meta.keyPath.length >= 2
      && meta.keyPath[0] === "rules"
    ) {
      return utils.defaultMergeFunctions.mergeOthers(values);
    }

    return utils.actions.defaultMerge;
  },
  metaDataUpdater: (previousMeta, metaMeta) => {
    if (previousMeta === undefined) {
      if (metaMeta.key === undefined) {
        return { keyPath: [] };
      }

      return { keyPath: [metaMeta.key] };
    }
    if (metaMeta.key === undefined) {
      return previousMeta;
    }

    return {
      ...metaMeta,
      keyPath: [...previousMeta.keyPath, metaMeta.key],
    };
  },
});
