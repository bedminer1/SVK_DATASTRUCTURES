export default class Node {
    value: number;
    next: Node | null;
    constructor(value: number) {
      this.value = value || 0;
      this.next = null;
    }
  }