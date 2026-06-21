class HashMap {
    constructor(loadfactor = 0.75, capacity = 16) {
        this.loadfactor = loadfactor;
        this.capacity = capacity;
        this.arrayOfBuckets = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode %= this.capacity;
        }
        return hashCode;
    }
    set(key, value) {
        let bucket = this.bucket(key);
        for (let entry of bucket) {
            if (entry.key === key) {
                entry.value = value;
                return;
            }
        }
        bucket.push({ key, value });
    }
    get(key) {
        let bucket = this.bucket(key);
        for (let entry of bucket) {
            if (entry.key === key) {
                return entry.value;
            }
        }
        return null;
    }
    has(key) {
        let bucket = this.bucket(key);
        for (let entry of bucket) {
            if (entry.key === key) {
                return true;
            }
        }
        return false;
    }
    bucket(key) {
        let hashed = this.hash(key);
        return this.arrayOfBuckets[hashed];
    }
    remove(key) {
        let bucket = this.bucket(key);
        let index = bucket.findIndex(entry => entry.key === key);
        if (index >= 0) {
            bucket.splice(index, 1);
            return true;
        }
        return false;
    }
}

const hashmap = new HashMap();
hashmap.set("emez", "amaz");
console.log(hashmap);