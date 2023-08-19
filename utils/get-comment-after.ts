import * as TSEUtils from "@typescript-eslint/utils";

export const getCommentAfter = (
    node: TSEUtils.TSESTree.Node,
    source: TSEUtils.TSESLint.SourceCode,
): TSEUtils.TSESTree.Comment | null => {
    const token = source.getTokenAfter(node, {
        filter: ({ type, value }) =>
            !(
                type === TSEUtils.AST_TOKEN_TYPES.Punctuator &&
                [",", ";"].includes(value)
            ),
        includeComments: true,
    });

    if (
        (token?.type === TSEUtils.AST_TOKEN_TYPES.Block ||
            token?.type === TSEUtils.AST_TOKEN_TYPES.Line) &&
        node.loc.end.line === token.loc.end.line
    ) {
        return token;
    }

    return null;
};
