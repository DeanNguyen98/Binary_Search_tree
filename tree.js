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
        if (node === null) return;
        if (value < node.data) {
            node.left = deleteNode(node.left, value)
        } else if (value > node.data) {
            node.right = deleteNote(node.right, value);
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
}

module.exports = BinaryTree;
