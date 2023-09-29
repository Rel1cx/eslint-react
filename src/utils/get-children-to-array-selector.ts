/**
 * @param reactPragma React pragma to use
 */
export function getChildrenToArraySelector(reactPragma: string) {
    return `:matches(CallExpression[callee.object.object.name=${reactPragma}][callee.object.property.name=Children][callee.property.name=toArray],CallExpression[callee.object.name=Children][callee.property.name=toArray])`;
}
