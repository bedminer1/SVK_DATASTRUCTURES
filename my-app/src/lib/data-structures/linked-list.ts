import Node from '$lib/data-structures/LL-node'

export default class LinkedList {
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

// pop removes the last element from the list
    pop() {
        let curr = this.listHead
        let prev = null
        while (curr && curr.next) {
            prev = curr
            curr = curr.next
        }

        if (prev) 
            prev.next = null
    }  
    
// contains(value) returns true if the passed in value is in the list and otherwise returns false.
    contains(value: number) {
        let temp = this.listHead
        while (temp) {
            if (temp.value === value) return true
            temp = temp.next
        }
        return false
    }

// find(value) returns the index of the node containing value, or null if not found.
    find(value: number) {
        let count = 0
        let temp = this.listHead
        while (temp) {
            if (temp.value === value) return count
            count++
            temp = temp.next
        }
        return null
    }

// toString represents your LinkedList objects as strings, so you can print them out and preview them in the console.
    toString() {
        let temp = this.listHead
        let listArr = []
        while (temp) {
            listArr.push(temp.value)
            temp = temp.next
        }
        if (listArr[0])
            listArr[0] = '(' + listArr[0]
        if (listArr[listArr.length - 1]) 
            listArr[listArr.length - 1] = listArr[listArr.length - 1] + ') -> null'
        return (listArr.join(') -> ('))
    }
}
