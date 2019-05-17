const descendants = [];
export function getNodeDescendants(node, data) {
    descendants.push(node);
    data
      .filter(n => n.parentID === node.id)
      .forEach(n => getNodeDescendants(n, data));
    return descendants;
}