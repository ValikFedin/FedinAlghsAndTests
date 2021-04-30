import { HashTable } from "./hashTable";

let hash = new HashTable(100);
hash.add("cat", "meow");
hash.add("dog", "woow");
console.log(hash.get("cat"));
console.log(hash.get("dog"));
hash.remove("cat");

console.log(hash.get("cat"));