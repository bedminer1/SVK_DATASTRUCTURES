export class Node {
    value: number
    next: Node | null
    constructor(value: number) {
        this.value = value || 0
        this.next = null
    }
}

export class LinkedList {
    listHead: Node | null
    constructor() {
        this.listHead = null
    }

    prepend(value: number) {
        // temp to keep track of old head
        let temp = null
        if (this.listHead != null) 
            temp = this.listHead
        this.listHead = new Node(value)
        this.listHead.next = temp
    }

    append(value: number) {
        if (this.listHead === null)
            this.prepend(value)
        else {
            let temp = this.listHead

            // iterate till the end of the list
            while (temp.next) 
                temp = temp.next
            temp.next = new Node(value)
        }
    }
}