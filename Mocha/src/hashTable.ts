export class HashTable {

    private hashTable: any;
    private salt: number;
    private hashSize: number;
    constructor(hashSize: number) {
        this.hashTable = new Array(hashSize);
        this.hashSize = hashSize;
        this.salt = Math.round(Math.random() * 100);
    }


    public add(key: string, value: any) {
        let hash = this.hash(key);

        this.hashTable[hash] = [key, value];
    }

    public get(key: string): string | undefined {
        let hash: number = this.hash(key);

        return this.hashTable[hash] ? this.hashTable[hash] : undefined;
    }

    public remove(key: string): any[] | undefined {
        let hash: number = this.hash(key);
        let result;
        if (this.hashTable[hash]) {
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