import { HashTable } from "./hashTable";

let hash = new HashTable(100);
hash.add("cat", "meow");
hash.add("cat", "no");

console.log(hash.get("cat"));