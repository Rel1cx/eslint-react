/**
 * Returns a selector that matches the `React.Children.toArray` call expression
 * @param reactPragma The actual pragma used in the file
 */
export function getChildrenToArraySelector(reactPragma: string) {
    return `:matches(CallExpression[callee.object.object.name=${reactPragma}][callee.object.property.name=Children][callee.property.name=toArray],CallExpression[callee.object.name=Children][callee.property.name=toArray])`;
}
