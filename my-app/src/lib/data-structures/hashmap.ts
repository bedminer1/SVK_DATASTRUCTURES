class HashNode {
  key: string;
  value: string;
  next: HashNode | null;

  constructor(key: string, value: string, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

export default class HashMap {
  bucketsArray: any[];
  loadFactor: number;
  capacity: number;
  occupied: number;

  constructor() {
    this.bucketsArray = new Array(16).fill(null);
    this.loadFactor = 0.75;
    this.capacity = this.bucketsArray.length;
    this.occupied = 0;
  }

  hash(key: string): number {
    let hashKey = 0;
    const prime = 31;
    for (let i = 0; i < key.length; i++) {
      hashKey += key.charCodeAt(i) * prime;
    }
    return hashKey % this.capacity;
  }

  resize() {
    const oldArray = this.bucketsArray;
    this.capacity *= 2;
    this.bucketsArray = new Array(this.capacity).fill(null);
    this.occupied = 0;

    oldArray.forEach((bucket) => {
      let curr = bucket;
      while (curr) {
        this.add(curr.key, curr.value);
        curr = curr.next;
      }
    });
  }

  has(key: string) {
    const bucket = this.hash(key);
    let curr = this.bucketsArray[bucket];

    // iterate thru LL to check
    while (curr) {
      if (curr.key === key) {
        return true;
      }
      curr = curr.next;
    }
    return false;
  }

  add(key: string, value: string) {
    // double bucketArr size if load exceeds 0.75
    if (this.occupied / this.capacity >= this.loadFactor) {
      this.resize();
    }
    const bucket = this.hash(key);
    if (!this.has(key)) {
      // if bucket doesn't contain key, add it to the bucket
      const newNode = new HashNode(key, value);
      if (this.bucketsArray[bucket] === null) {
        this.occupied += 1;
        this.bucketsArray[bucket] = newNode;
      } else {
        let curr = this.bucketsArray[bucket];
        while (curr.next) {
          curr = curr.next;
        }
        curr.next = newNode;
      }
    } else {
      // if it exists, update it
      let curr = this.bucketsArray[bucket];
      while (curr && curr.key !== key) curr = curr.next;
      if (curr) curr.value = value;
    }
  }

  get(key: string): string {
    const bucket = this.hash(key);
    let curr = this.bucketsArray[bucket];
    while (curr && curr.key !== key) curr = curr.next;
    if (!curr) return "Key not in HashMap :(";
    else return curr.value;
  }

  remove(key: string) {
    const bucket = this.hash(key);
    let curr = this.bucketsArray[bucket];
    let prev = null;

    while (curr && curr.key !== key) {
      prev = curr;
      curr = curr.next;
    }
    // key not found
    if (!curr) return;

    if (!prev && !curr.next) {
      // if node is sole node in bucket
      this.occupied -= 1;
      this.bucketsArray[bucket] = null;
    } else if (!prev) {
      // if node is listHead
      this.bucketsArray[bucket] = curr.next;
    } else {
      // deletion in LL
      prev.next = curr.next;
    }
  }

  length() {
    let count = 0;
    this.bucketsArray.forEach((bucket) => {
      let curr = bucket;
      if (bucket) {
        count++;
        while (curr.next) {
          count++;
          curr = curr.next;
        }
      }
    });
    return count;
  }

  clear() {
    this.bucketsArray = new Array(16).fill(null);
    this.occupied = 0;
    this.capacity = this.bucketsArray.length;
  }

  keys() {
    const arrayOfKeys: string[] = [];
    this.bucketsArray.forEach((bucket) => {
      let curr = bucket;
      if (bucket) {
        arrayOfKeys.push(curr.key);
        while (curr.next) {
          curr = curr.next;
          arrayOfKeys.push(curr.key);
        }
      }
    });
    return arrayOfKeys;
  }

  values() {
    const arrayOfValues: string[] = [];
    this.bucketsArray.forEach((bucket) => {
      let curr = bucket;
      if (bucket) {
        arrayOfValues.push(curr.value);
        while (curr.next) {
          curr = curr.next;
          arrayOfValues.push(curr.value);
        }
      }
    });
    return arrayOfValues;
  }

  entries() {
    const arrayOfEntries: string[][] = [];
    this.bucketsArray.forEach((bucket) => {
      let curr = bucket;
      if (bucket) {
        arrayOfEntries.push([curr.key, curr.value]);
        while (curr.next) {
          curr = curr.next;
          arrayOfEntries.push([curr.key, curr.value]);
        }
      }
    });
    return arrayOfEntries;
  }
}
