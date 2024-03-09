export default class Node {
    value: number
    nextNode: Node | null
    constructor(value: number) {
        this.value = value || 0
        this.nextNode = null
    }
}