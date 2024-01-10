
// a basic HashMap class with methods to implement knowledge and understanding of 
// HashMap functionality
// *Recommend to rather use the JS built in Map() functions

class HashMap {
    constructor(initialCapacity = 8, loadFactor = 0.75) {
        // Initialize an empty array to store buckets of key-value pairs
        this._buckets = new Array(initialCapacity);
        // set load factor
        this._loadFactor = loadFactor;
        // set the size of the hash map
        this._size = 0;
    }

    // method to resize the hash map when load factor is exceeded
    _resize() {
        const newCapacity = this._buckets.length * 2;
        const newBuckets = new Array(newCapacity);

        // rehash all the existing key-value pairs into the new array
        for(const bucket of this._buckets) {
            if(bucket) {
                for (const [key, value] of bucket) {
                    const newIndex = this._hash(key) % newCapacity;
                    if (!newBuckets[newIndex]) {
                        newBuckets[newIndex] = [];
                    }
                    newBuckets[newIndex].push([key, value])
                }
            }
        }
        // update the_buckets and clear old values
        this._buckets = newBuckets
    }

    // hashing function to convert a key into an index within the _buckets array
    _hash(key) {
        let hash  = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i)) % this._buckets.length;
        }
        // Bounds checking
        if (hash < 0 || hash >= this._buckets.length) {
            throw new Error("Trying to access index out of bound");
        }

        return hash; 
    }

    // method to add or update a key-value pair in the hash map 
    set(key, value) {
        // check the load factor and resize if needed 
        if ((this._size + 1) / this._buckets.length > this._loadFactor) {
            this._resize()
        }

        // calculate the index using the _hash method
        const index = this._hash(key);
        // check if there's already a bucket at the calculated index
        if (!this._buckets[index]) {
            // if not, create a new bucket (empty array)
            this._buckets[index] = []
        }

        // get the bucket at the calculated index 
        const bucket = this._buckets[index];
        // iterate through the elements in the bucket 
        for (let i = 0; i < bucket.length; i++) {
            // check if key already exits in the bucket
            if (bucket[i][0] === key) {
                // if key already exits, update the value
                bucket[i][1] = value
                return;
            }
            
        }

        // key doesn't exits in the bucket, add a whole new key-value
        // pair to the bucket
        bucket.push([key, value])
        // increment the size of the hash map
        this._size++; 
    }

    // method to fetch the key-value pair in the hash map
    get(key) {
        // calculate the index using the _hash method
        const index = this._hash(key);
        // retrieve the bucket at the calculated index 
        const bucket = this._buckets[index];
        // if the bucket is empty, return null
        if (!bucket) {
            return null
        }
        // Iterate through the elements in the bucket
        for (let i = 0; i < bucket.length; i++) {
            // check if the key matches the current element's key in the bucket
            if (bucket[i][0] === key) {
                // if match is fount, return the associated value
                return bucket[i][1];
            }
        }
        // if the key is not found in the bucket, return null 
        return null
    }

    // method that returns a boolean whether key is in hash map
    has(key) {
        // calculate the index using the _hash method
        const index = this._hash(key);
        // retrieve the bucket at the calculated index
        const bucket = this._buckets[index];
        if (!bucket) {
            return false
        }
        // Iterate through the elements in the bucket
        for (let i = 0; i < bucket.length; i++) {
            // check if the key matches the current element's key in the bucket
            if (bucket[i][0] === key) {
                // if match is fount, return true
                return true
            }
        }
        // if the key is not found in the bucket, return null 
        return false
    }

    // method to remove a key-value pair if in the hash map
    remove(key) {
        const index = this._hash(key);
        const bucket = this._buckets[index];
        // If the bucket is empty (undefined), there's nothing to remove
        if (!bucket) {
            return;
        }

        for (let i = 0; i < bucket.length; i++) {
            // check if the key matches the current element's key in the bucket
            if (bucket[i][0] === key) {
                // if match is found, remove the value from the hash table
                bucket.splice(i, 1)
                return;
            }
        }
        // decrement the size of key-value pairs in hashmap 
        this._size--;
    }

    // method to find the length of the hash map 
    mapLength() {
        return this._size;
    }

    // method to remove all entries in the hash map 
    clear() {
        this._buckets = new Array(this._buckets.length);
        this._size = 0;
    }

    // method that returns an array containing all the keys in the hash map
    keys() {
        // create an all keys array
        const allKeys = [];
        // push the keys in each bucket to all keys 
        for (const bucket of this._buckets) {
            if (bucket) {
                for (const [key] of bucket) {
                    allKeys.push(key)
                }
            }
        }
        return allKeys
    }

    // method that returns an array containing all the values in the hash map
    values() {
        // create an all values array
        const allValues = [];
        // push the values in each bucket to all values
        for (const bucket of this._buckets) {
            if (bucket) {
                for (const [, value] of bucket) {
                    allValues.push(value)
                }
            }
        }
        return allValues
    }

    // method that returns an array containing all key value pairs in the hash map
    entries() {
        // create an all entries array
        const allEntries = []
        // push the entries in each bucket to all entries
        for (const bucket of this._buckets) {
            if (bucket) {
                for (const [key, value] of bucket) {
                    allEntries.push([key, value])
                }
            }
        }
        return allEntries
    }

}

// Class testing console log methods

const myHashMap = new HashMap();
myHashMap.set("name", "John");
myHashMap.set("surname", "Doe")
myHashMap.set("age", 25);
myHashMap.set("job", "Dentist")

console.log("all entries:");
console.log(myHashMap.entries());
console.log("");

console.log("all keys:");
console.log(myHashMap.keys());
console.log("");

console.log("all values:");
console.log(myHashMap.values());
console.log("");

console.log("get name:");
console.log(myHashMap.get("name"));
console.log("");

console.log("get gender:");
console.log(myHashMap.get("gender"));
console.log("");

console.log("has gender?");
console.log(myHashMap.has("gender"));
console.log("");

console.log("has job?");
console.log(myHashMap.has("job"));
console.log("");

console.log("length:");
console.log(myHashMap.mapLength());
console.log("");

myHashMap.remove("job")

console.log("after remove job:");
console.log(myHashMap.entries());
console.log("");

myHashMap.clear()

console.log("after clear all");
console.log(myHashMap.entries());
console.log("");


