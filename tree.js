const Node = require('./node');

class BinaryTree {
    constructor(array) {
        this.root = this.buildTree(array);
    }
    buildTree(array) {
        const sortedArray = [...new Set(array)].sort((a,b) => a - b);
        return this.buildTreehelper(0, sortedArray, sortedArray.length -1);
    }
    buildTreehelper(start, array, end) {
        if (start > end) return null;
        const mid = (start + end) / 2;
        const node = new Node(array[mid]);
        node.left = this.buildTreehelper(start, array, mid -1);
        node.right = this.buildTreehelper(mid + 1, array, end);
        return node;
    }
    insert(value) {
       this.root = this.insertNode(this.root, value);
    }
    insertNode(node, value) {
        if (node === null) return new Node(value);
        if (node.data === value) return;
        if (value < node.data) {
            node.left = this.insertNode(node.left, value);
        } else {
            node.right = this.insertNode(node.right, value);
        }
        return node;
    }
    deleteItem(value) {
        this.root = this.deleteNode(this.root, value);
    }
    deleteNode(node, value) {
        if (node === null) return null;
        if (value < node.data) {
            node.left = this.deleteNode(node.left, value);
        } else if (value > node.data) {
            node.right = this.deleteNode(node.right, value);
        } else if (node.left === null && node.right === null) {
            return null;
        } else if (node.left === null) {
            return node.right;
        } else if (node.right === null) {
            return node.left;
        } else {
            const minRight = this.findMin(node.right);
            node.data = minRight.data;
            node.right = this.deleteNode(node.right, minRight.data);
        }
        return node;
    }
    findMin(node) {
        if (node.left !== null) {
            node = node.left;
        }
        return node;
    }
    find(value) {
        return this.findNode(this.root, value);
    }
    findNode(node, value) {
        if (node === null) return null;
        if (node.data === value) {
            return node;
        } else {
            return node.data < value ? this.findNode(node.right, value) : this.findNode(node.left, value);
        }
    }
    //Breadth-first level-Order
    levelOrder(callback) {
        if (!callback) {
            const queue = [];
            const result = [];
            if (this.root !== null) {
                queue.push(this.root);
                while (queue.length > 0) {
                    const node = queue.shift();
                    if (node) {
                        result.push(node.data);
                        if (node.left !== null) {
                            queue.push(node.left);
                        }
                        if (node.right !== null) {
                            queue.push(node.right);
                        }
                    }
                }
            }
            return result;
        } else {
            const queue = [];
            if (this.root !== null) {
                queue.push(this.root);
                while (queue.length > 0) {
                    const node = queue.shift();
                    callback(node);
                    if (node.left  !== null) {
                        queue.push(node.left);
                    } else if (node.right !== null) {
                        queue.push(node.right);
                    }
                } 
            }
        }
    }
    //Depth-first traversal
    //InOrder: left subtree, root, right subtree
    inOrder(callback, node = this.root, result = []) {
       if (node === null) return;
       this.inOrder(callback, node.left, result);
       callback ? callback(node) : result.push(node.data);
       this.inOrder(callback, node.right, result);
       return result;
    }
    //PreOrder traversal: root, left subtree, right subtree
    preOrder(callback, node = this.root, result = []) {
        if (node === null) return;
        callback ? callback(node) : result.push(node.data);
        this.preOrder(callback, node.left, result);
        this.preOrder(callback, node.right, result);
        return result;
    }
    //PostOrder traversal: left subtree, right subtree, root;
    postOrder(callback, node = this.root, result = []) {
        if (node === null) return;
        this.postOrder(callback, node.left, result);
        this.postOrder(callback, node.right, result);
        callback ? callback(node) : result.push(node.data);
        return result;
    }
    height(node) {
        if (node === null) {
            return 0;
        } else {
            const leftheight = this.height(node.left);
            const rightheight = this.height(node.right);
            return Math.max(leftheight, rightheight) + 1;
        }
    }
    depth(value, node = this.root, count = 0) {
        if (node === null) return 0;
        if (value === node.data) return count;
        if (value < node.data) return this.depth(value, node.left, count++);
        if (value > node.data) return this.depth(value, node.right, count++);
    } 
    isBalanced() {
        return this.checkBalance(this.root) !== -1;
    }
    checkBalance(node) {
        if (node === null) return 0;
        const leftHeight = this.checkBalance(node.left);
        const rightHeight = this.checkBalance(node.right);
        if (leftHeight === -1|| rightHeight === -1 || Math.abs(leftHeight, rightHeight) > 1) {
            return -1
        } else {
            return Math.max(leftHeight, rightHeight) + 1;
        }
    }
    rebalance() {
        const nodeValues = this.inOrder();
        this.root = this.buildTree(nodeValues);
    }

}

module.exports = BinaryTree;
