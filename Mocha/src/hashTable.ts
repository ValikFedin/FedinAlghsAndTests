export class HashTable {

    private hashTable;
    private salt: number;
    constructor(private hashSize = 137) {
        this.hashTable = new Array(hashSize);
        this.salt = Math.round(Math.random() * 100);
    }


    public add(key: string, value: any) {
        let hash = this.hash(key);

        if (this.hashTable[hash]) {
            while (!this.hashTable[hash] && hash <= this.hashSize) {
                hash++;
            }
        }

        if (hash) {
            this.hashTable[hash] = [key, value];
        }
    }

    public get(key: string): string | undefined {
        let hash: number = this.hash(key);

        if (this.hashTable[hash]) {
            if (this.hashTable[hash][0] !== key) {
                while (!this.hashTable[hash] && hash <= this.hashSize) {
                    hash++;
                }
            }
        }
        return this.hashTable[hash] ? this.hashTable[hash] : undefined;
    }

    public remove(key: string): any[] | undefined {
        let hash: number = this.hash(key);
        let result;
        if (this.hashTable[hash][0] === key) {
            result = this.hashTable.splice(hash, 1, undefined);
        }
        return result;
    }

    public hash(value: string): number {

        let aggregateHash = value.split('').map(v => v.charCodeAt(0))
            .reduce((accumulator, v) => {
                return ((this.salt * accumulator) + v);
            });


        aggregateHash = aggregateHash % this.hashSize;

        return aggregateHash;

    }
}