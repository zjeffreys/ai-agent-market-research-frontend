module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'require citation field in blueprint objects',
      recommended: false,
    },
    schema: [],
  },
  create(context) {
    function isBlueprintProperty(node) {
      if (!node) return false;
      if (node.type === 'Property') {
        const key = node.key;
        if (key.type === 'Identifier' && key.name === 'blueprint') return true;
        if (key.type === 'Literal' && key.value === 'blueprint') return true;
      }
      if (node.type === 'VariableDeclarator') {
        const id = node.id;
        if (id.type === 'Identifier' && id.name === 'blueprint') return true;
      }
      return false;
    }

    return {
      ObjectExpression(node) {
        const parent = node.parent;
        if (!isBlueprintProperty(parent)) return;
        const hasCitation = node.properties.some(
          (prop) =>
            prop.type === 'Property' &&
            ((prop.key.type === 'Identifier' && prop.key.name === 'citation') ||
              (prop.key.type === 'Literal' && prop.key.value === 'citation'))
        );
        if (!hasCitation) {
          context.report({
            node,
            message: 'Blueprint object should include a "citation" field.',
          });
        }
      },
    };
  },
};
