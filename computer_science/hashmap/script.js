export class HashMap {
    constructor(loadfactor = 0.75, capacity = 16) {
        this.loadfactor = loadfactor;
        this.capacity = capacity;
        this._length = 0;
        this.arrayOfBuckets = Array(this.capacity).fill(undefined).map(x => x = []);
    }
    get loadlevel() {
        return this._length / this.capacity;
    }
    get isOverLimit() {
        if (this.loadlevel > this.loadfactor) return true;
        else return false;
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
        this._length++;
        if (this.isOverLimit) this.grow();
    }
    grow() {
        let entries = this.entries();
        this.clear();
        this.capacity *= 2;
        this.arrayOfBuckets = Array(this.capacity).fill(undefined).map(x => x = []);
        entries.forEach(entry => this.set(entry.key, entry.value));
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
            this._length--;
            return true;
        }
        return false;
    }
    get length() { return this._length }
    clear() {
        this.arrayOfBuckets.forEach(bucket => bucket.splice(0));
        this._length = 0;
    }
    keys() {
        let array = [];
        this.arrayOfBuckets.forEach(bucket => {
            bucket.forEach(entry => array.push(entry.key))
        });
        return array;
    }
    values() {
        let array = [];
        this.arrayOfBuckets.forEach(bucket => {
            bucket.forEach(entry => array.push(entry.value))
        });
        return array;
    }
    entries() {
        let array = [];
        this.arrayOfBuckets.forEach(bucket => {
            bucket.forEach(entry => array.push(entry))
        });
        return array;
    }
}

