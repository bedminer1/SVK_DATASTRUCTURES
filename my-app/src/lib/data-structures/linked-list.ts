export class Node {
  value: number;
  next: Node | null;
  constructor(value: number) {
    this.value = value || 0;
    this.next = null;
  }
}

export class LinkedList {
  listHead: Node | null;
  constructor() {
    this.listHead = null;
  }

  // prepend(value) adds a new node containing value to the start of the list
  prepend(value: number) {
    // temp to keep track of old head
    let dummy = null;
    if (this.listHead != null) dummy = this.listHead;
    this.listHead = new Node(value);
    this.listHead.next = dummy;
  }

  // append(value) adds a new node containing value to the end of the list
  append(value: number) {
    if (this.listHead === null) this.prepend(value);
    else {
      let dummy = this.listHead;

      // iterate till the end of the list
      while (dummy.next) dummy = dummy.next;
      dummy.next = new Node(value);
    }
  }

  // size returns the total number of nodes in the list
  size() {
    let count: number = 0;
    let dummy = this.listHead;
    while (dummy) {
      count++;
      dummy = dummy.next;
    }
    return count;
  }

  // head returns the first node in the list
  head() {
    return this.listHead;
  }

  // tail returns the last node in the list
  tail() {
    let dummy = this.listHead;
    while (dummy && dummy.next) {
      dummy = dummy.next;
    }
    return dummy;
  }
  
  // at(index) returns the node at the given index
  at(index: number) {
    let dummy = this.listHead;
    for (let i = 0; i < index; i++) {
        if (dummy) dummy = dummy.next
        else return 'no item at this index'
    }
    return dummy;
  }
}
