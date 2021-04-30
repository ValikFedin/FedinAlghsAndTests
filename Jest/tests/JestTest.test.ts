import { HashTable } from '../src/hashTable';
import { Item } from '../src/priorityQueue/item';
import { PriorityQueue } from '../src/priorityQueue/priorityQueue';
import { Stack } from '../src/stack';

describe('ReadonlyArray', function () {
  let reelStripArray: ReadonlyArray<any> = [23, 23, 14, 11, 20];
  it('Concat', () => {
    // reelStripArray[0] = 1;
    // reelStripArray.push(23)
    let newReelStripArray = reelStripArray.concat(22); // we can use concat because it not affect on real array
    expect(newReelStripArray).toEqual([23, 23, 14, 11, 20, 22]); // added value
  });
  it('RealArray', function () {
    expect(reelStripArray).toEqual([23, 23, 14, 11, 20]);// real array doesn`t change
  });

});




/* --Type Guard--

getPet(): Cat | Dog


if(pet.meow) -- however it throw an error (if it`s dog)

you can use Type Guard 
let pet = getPet()

let catPet = pet as Cat

let dogPet = pat as Dog
*/
describe('Priority Queue', function () {
  let item2 = new Item(2, { value: 20 });
  let item3 = new Item(3, { value: 30 });
  let item1 = new Item(1, { value: 10 });
  let items = [item3, item1, item2];
  let queue = new PriorityQueue(items);

  let item5 = new Item(5, { value: 50 });
  let item4 = new Item(4, { value: 40 });
  queue.insert(item5);
  queue.insert(item4);

  queue.show();
  it('Queue peek head item', () => {
    expect(queue.peek()).toEqual(item1);
  });
  it('Queue pull head item', () => {
    expect(queue.pull()).toEqual(item1);
  });
  it('Queue peek new head item', () => {
    expect(queue.peek()).toEqual(item2);
  });
  it('Queue is not empty', () => {
    expect(queue.isEmpty()).toEqual(false);
  });
  it('Queue insert new Item with priority 1', () => {
    queue.insert(new Item(1, { value: 10 }));
    expect(queue.peek()).toEqual(item1);
  });
  it('Queue insert new Item with priority 0', () => {
    queue.insert(new Item(0, { value: 0 }));
    expect(queue.peek()).toEqual(new Item(0, { value: 0 }));
    queue.show();
  });
})

describe('Hash Table', function () {
  let hash = new HashTable(100);
  it('Add new item', () => {
    hash.add("cat", "meow");
    expect(hash.get("cat")).toEqual(["cat", "meow"]);
  });
  it('Add second item', () => {
    hash.add("dog", "woof");
    expect(hash.get("dog")).toEqual(["dog", "woof"]);
  });
  it('Remove firs item', () => {
    expect(hash.remove("cat")).toEqual([["cat", "meow"]]);
  });
  it("Get first item ( that is does not exist ", () => {
    expect(hash.get("cat")).toBeUndefined();
  });
  it("Get second item ( that is exist) ", () => {
    expect(hash.get("dog")).toEqual(["dog", "woof"]);
  });
});

describe('Record Type', function () {
  interface TextInfo {
    text: string;
    color: string;
  }
  let translations: Record<string, TextInfo> = {
    pt1: { text: "paytable1", color: "#134f21" },
    pt2: { text: "paytable1", color: "#4287f5" },
    pt3: { text: "paytable1", color: "#2234f3" }
  };

  it('Concat', () => {
    expect(translations.pt1.text).toEqual("paytable1");
  });
});

describe('Stack', function () {
  let stack = new Stack<string>();
  it('Push one element', () => {
    stack.push("First");
    expect(stack.size()).toEqual(1);
    expect(stack.peek()).toEqual("First");
  });
  it('Push second element', () => {
    stack.push("Second");
    expect(stack.size()).toEqual(2);
    expect(stack.peek()).toEqual("Second");
  })
  it('Pop one element', () => {
    expect(stack.pop()).toEqual("Second");
    expect(stack.size()).toEqual(1);
    expect(stack.peek()).toEqual("First");
  })

});
