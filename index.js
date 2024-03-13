const BinaryTree = require("./tree");

const tree = new BinaryTree([5, 3, 7, 2, 4, 6, 8]);
console.dir(tree, { depth: null });
tree.insert(9);
console.log("Tree after inserting 9:");
console.dir(tree, { depth: null });