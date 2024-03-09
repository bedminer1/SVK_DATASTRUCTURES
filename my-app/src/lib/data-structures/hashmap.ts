class HashNode {
    key: string
    value: any
    next: HashNode | null

    constructor(key: string, value = null, next = null) {
        this.key = key
        this.value = value
        this.next = next
    }
}

export default class HashMap {
    bucketsArray: any[]
    loadFactor: number
    capacity: number
    occupied: number

    constructor() {
        this.bucketsArray = new Array(16).fill(null)
        this.loadFactor = 0.75
        this.capacity = this.bucketsArray.length
        this.occupied = 0
    }

    hash(key: string): number {
        let hashKey = 0
        const prime = 31
        for (let i = 0; i < key.length; i++) {
            hashKey += key.charCodeAt(i) * prime
        }
        return hashKey % this.capacity
    }

    resize() {
        const oldArray = this.bucketsArray
        this.capacity *= 2
        this.bucketsArray = new Array(this.capacity).fill(null)
        this.occupied = 0

        oldArray.forEach((bucket) => {
            let curr = bucket
            while (curr) {
                this.add(curr.key, curr.value)
                curr = curr.next
            }
        })
    }

    has(key: string) {
        const bucket = this.hash(key)
        let curr = this.bucketsArray[bucket]

        // iterate thru LL to check
        while (curr) {
            if (curr.key === key) {
                return true
            }
            curr = curr.next
        }
        return false
    }

    add(key: string, value: any) {
        // double bucketArr size if load exceeds 0.75
        if (this.occupied / this.capacity >= this.loadFactor) {
            this.resize()
        }
        const bucket = this.hash(key)
        if (!this.has(key)) {
            // if bucket doesn't contain key, add it to the bucket
            const newNode = new HashNode(key, value)
            if (this.bucketsArray[bucket] === null) {
                this.occupied += 1
                this.bucketsArray[bucket] = newNode
            } 
            
            else {
                let curr = this.bucketsArray[bucket]
                while (curr.next) {
                    curr = curr.next
                }
                curr.next = newNode
            }
        }
        else {
            // if it exists, update it
            let curr = this.bucketsArray[bucket]
            while (curr && curr.key !== key) 
                curr = curr.next
            if (curr)
                curr.value = value
        }
    }

    get(key: string) {
        const bucket = this.hash(key)
        let curr = this.bucketsArray[bucket]
        while (curr && curr.key !== key) 
            curr = curr.next
        if (!curr)
            return null
        else
            return curr.value
    }
}