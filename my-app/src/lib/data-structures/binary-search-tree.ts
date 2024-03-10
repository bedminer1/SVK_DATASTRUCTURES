class TreeNode {
    value: number
    left: TreeNode | null
    right: TreeNode | null

    constructor(value: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.value = value
        this.left = left ?? null
        this.right = right ?? null
    }
}

export default class BST {
    root: TreeNode | null

    constructor(array: number[]) {
        this.root = this.buildTree(array)
    }

    #sortAndRemoveDupes(array: number[]): number[] {
        const sorted = [...new Set(array)].sort((a, b) => a - b)
        return sorted
    }

    buildTree(array: number[]): TreeNode | null {
        let sorted = this.#sortAndRemoveDupes(array)
        if (sorted.length === 0) return null
        const mid: number = sorted.length / 2
        const root: TreeNode | null = new TreeNode(sorted[mid], this.buildTree(sorted.slice(0, mid)), this.buildTree(sorted.slice(mid + 1)))
        return root
    }

    insert(value: number, root = this.root) {
        if (root === null) 
            return new TreeNode(value)
        if (root.value < value) {
            root.right = this.insert(value, root.right)
        } else {
            root.left = this.insert(value, root.left)
        }
        return root
    }

    #minValue(root: TreeNode) {
        let minv: number = root.value 
        while (root.left) {
            minv = root.left.value
            root = root.left
        } 
        return minv
    }

    delete(value: number, root = this.root) {
        if (!root) return root
        if (root.value < value) 
            root.right = this.delete(value, root.right)
        else if (root.value > value) 
            root.left = this.delete(value, root.left)
        else {
            if (!root.left)
                return root.right
            else if (!root.right)
                return root.left
            root.value = this.#minValue(root.right)
            root.right = this.delete(value, root.right)
        } 
        return root
    }
}