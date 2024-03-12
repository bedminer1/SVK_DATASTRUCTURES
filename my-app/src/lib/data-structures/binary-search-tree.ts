class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(value: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.value = value;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

export default class BST {
  root: TreeNode | null;

  constructor(array: number[]) {
    this.root = this.buildTree(array);
  }

  #sortAndRemoveDupes(array: number[]): number[] {
    const sorted = [...new Set(array)].sort((a, b) => a - b);
    return sorted;
  }

  buildTree(array: number[]): TreeNode | null {
    let sorted = this.#sortAndRemoveDupes(array);
    if (sorted.length === 0) return null;
    const mid: number = Math.floor(sorted.length / 2);
    const root: TreeNode | null = new TreeNode(
      sorted[mid],
      this.buildTree(sorted.slice(0, mid)),
      this.buildTree(sorted.slice(mid + 1))
    );
    return root;
  }

  insert(value: number, root = this.root) {
    if (root === null) {
      return new TreeNode(value);
    }
    if (root.value < value) {
      root.right = this.insert(value, root.right);
    } else {
      root.left = this.insert(value, root.left);
    }
    return root;
  }

  #minValue(root: TreeNode) {
    let minv: number = root.value;
    while (root.left) {
      minv = root.left.value;
      root = root.left;
    }
    return minv;
  }

  delete(value: number, root = this.root) {
    if (!root) return root;
    if (root.value < value) root.right = this.delete(value, root.right);
    else if (root.value > value) root.left = this.delete(value, root.left);
    else {
      if (!root.left) return root.right;
      else if (!root.right) return root.left;
      root.value = this.#minValue(root.right);
      root.right = this.delete(root.value, root.right);
    }
    return root;
  }

  find(value: number, root = this.root): TreeNode | null {
    const node = root;
    if (!node) return null;
    if (node.value !== value) {
      if (this.find(value, node.right)) return this.find(value, node.right);
      else return this.find(value, node.left);
    }
    return node;
  }

  // bfs
  levelOrder(callback?: Function) {
    if (!this.root) return [];
    const queue = [this.root];
    const results = [];
    while (queue.length) {
      let levelArr = [];
      let levelSize = queue.length;
      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift();
        levelArr.push(node?.value);
        if (node?.left) queue.push(node.left);
        if (node?.right) queue.push(node.right);
        if (callback) callback(node);
      }
      results.push(levelArr);
    }
    if (!callback) return results;
  }

  // root left right
  preorder(callback: Function) {
    if (!this.root) return []
    const stack = [this.root]
    const results = []
    while (stack.length) {
      const node = stack.pop()
      if (node?.right) stack.push(node?.right)
      if (node?.left) stack.push(node?.left)
      if (callback) callback(node)
      results.push(node?.value)
    }
    if (!callback) return results
  }

  // left right root
  postorder(callback: Function) {
    if (!this.root) return []
    const stack = [this.root]
    const results = []
    while (stack.length) {
      const node = stack.pop()
      if (node?.left) stack.push(node?.left)
      if (node?.right) stack.push(node?.right)
      if (callback) callback(node)
      results.push(node?.value)
    }
    if (!callback) return results.reverse() //since it's executed as a stack
  }

  // left root right
  inorder(node:TreeNode | null = this.root, callback?: Function, result: number[] = []) {
    if (!this.root) return []
    if (!node) return
    this.inorder(node.left, callback, result)
    if (callback) callback(node)
    else result.push(node.value)
    this.inorder(node.right, callback, result)
    if (result) return result
  }

  // height is distance from leaf to node
  height(node = this.root): number {
    if (!node) return -1
    const leftHeight: number = this.height(node.left)
    const rightHeight: number = this.height(node.right)
    return Math.max(leftHeight, rightHeight) + 1
  }

  // depth is distance from root to node
  depth(node: TreeNode | null, root = this.root, level: number = 0): number {
    if (!node) return 0
    if (!root) return 0
    if (root.value = node.value) return level
    let count: number = this.depth(node, root.left, level + 1)
    if (count) return count
    return this.depth(node, root.right, level + 1)
  }

  isBalanced(node = this.root): boolean {
    if (!node) return true
    const heightDiff = Math.abs(this.height(node.left) - this.height(node.right))

    return (heightDiff <= 1 && this.isBalanced(node.left) && this.isBalanced(node.right))
  }

  rebalance() {
    if (!this.root) return
    const sorted = [...new Set(this.inorder()?.sort((a, b) => a - b))]
    this.root = this.buildTree(sorted)
    this.prettyPrint()
  }

  // imported from top
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

}
