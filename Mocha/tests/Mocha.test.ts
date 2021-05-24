import { assert, expect } from 'chai';
import { HashTable } from '../src/hashTable';
import { Item } from '../src/priorityQueue/item';
import { PriorityQueue } from '../src/priorityQueue/priorityQueue';
import { Stack } from '../src/stack';
import * as sinon from "sinon";
import { Signal } from 'signals';
import { Order } from '../src/priorityQueue/IHeap';



const axios = require('axios');


describe('ReadonlyArray', function () {
  let reelStripArray: ReadonlyArray<any> = [23, 23, 14, 11, 20];
  it('Concat', () => {
    // reelStripArray[0] = 1;
    // reelStripArray.push(23)
    let newReelStripArray = reelStripArray.concat(22); // we can use concat because it not affect on real array
    expect(newReelStripArray).deep.equal([23, 23, 14, 11, 20, 22]); // added value
  });
  it('RealArray', function () {
    expect(reelStripArray).deep.equal([23, 23, 14, 11, 20]);// real array doesn`t change
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

  describe("Peek and pull head item", () => {
    let item2 = new Item(2, { value: 20 });
    let item3 = new Item(3, { value: 30 });
    let item1 = new Item(1, { value: 10 });
    let items = [item3, item1, item2];
    let queue = new PriorityQueue(items);
    queue.insert(new Item(2, { value: 20 }));
    queue.insert(new Item(1, { value: 19 }));
    queue.insert(new Item(4, { value: 19 }));
    it('Queue peek head item', () => {
      expect(queue.peek()).deep.equal(item1);
    });
    it('Queue pull head item', () => {
      expect(queue.pull()).deep.equal(item1);
    });
    it('Queue peek new head item', () => {
      expect(queue.peek()).deep.equal(new Item(1, { value: 19 }));
    });
    it('Queue is not empty', () => {
      expect(queue.isEmpty()).not.true;
    });

  })
  describe("Empty Queue", () => {
    let queue = new PriorityQueue([], Order.MAX);
    it("Is Empty", () => {
      expect(queue.isEmpty()).true;
    })
  })
  describe("Insert Test", () => {

    const sandbox = sinon.createSandbox();
    let item2 = new Item(2, { value: 20 });
    let item1 = new Item(1, { value: 10 });
    let items = [item1, item2];
    let queue = new PriorityQueue(items, Order.MAX);
    beforeEach(() => {
      sandbox.spy(queue.heap);
    });

    afterEach(() => {
      sandbox.restore();
    });
    it("Sure to call once", () => {
      queue.insert(new Item(12, { value: 20 }));
      expect((queue as any).heap.insert.calledOnce).true;
    })
  })
  describe("Peek and pull head item Max Order", () => {
    let item2 = new Item(2, { value: 20 });
    let item3 = new Item(3, { value: 30 });
    let item1 = new Item(1, { value: 10 });
    let items = [item3, item1, item2];
    let queue = new PriorityQueue(items, Order.MAX);
    queue.insert(new Item(2, { value: 20 }));
    queue.insert(new Item(1, { value: 19 }));
    it('Queue peek head item', () => {
      expect(queue.peek()).deep.equal(item3);
    });
    it('Queue pull head item', () => {
      expect(queue.pull()).deep.equal(item3);
    });
    it('Queue peek new head item', () => {
      expect(queue.peek()).deep.equal(item2);
    });
    it('Queue is not empty', () => {
      expect(queue.isEmpty()).not.true;
    });
  })

  describe("Insert item with biger priority", () => {
    let item2 = new Item(3, { value: 30 });
    let item3 = new Item(4, { value: 40 });
    let item1 = new Item(2, { value: 20 });
    let items = [item3, item1, item2];
    let queue = new PriorityQueue(items);
    it('Insert new Item with priority 1', () => {
      let newItem = new Item(1, { value: 10 });
      queue.insert(newItem);
      expect(queue.peek()).deep.equal(newItem);
    });
  })

  describe("Item Testing", () => {
    it("Create a new Item", () => {
      let itemPriority = 10;
      let itemValue = { value: 20 };
      let newItem = new Item(itemPriority, itemValue);
      expect(newItem.priority).is.equal(itemPriority);
      expect(newItem.value).deep.equal(itemValue);
    })
  })
})

describe('Hash Table', function () {
  describe("Adding Items", () => {
    let hash = new HashTable(100);
    hash.add("cat", "meow");
    it('Add new item', () => {
      expect(hash.get("cat")).deep.equal(["cat", "meow"]);
    });
    hash.add("dog", "woof");
    it('Add second item', () => {
      expect(hash.get("dog")).deep.equal(["dog", "woof"]);
    });
  })

  describe("Removing Items", () => {
    let hash = new HashTable(100);
    hash.add("cat", "meow");
    hash.add("dog", "woof");
    it('Remove firs item', () => {
      expect(hash.remove("cat")).deep.equal([["cat", "meow"]]);
    });
    it("Get first item ( that is does not exist ", () => {
      expect(hash.get("cat")).is.undefined;
    });
    it("Get second item ( that is exist) ", () => {
      expect(hash.get("dog")).deep.equal(["dog", "woof"]);
    });
    it("remove non exist", () => {
      hash.remove("noneexist");
    })
  })

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
    expect(translations.pt1.text).deep.equal("paytable1");
  });
});

describe('Stack', function () {
  let stack = new Stack<string>(Infinity);
  it('Push one element', () => {
    stack.push("First");
    expect(stack.size()).deep.equal(1);
    expect(stack.peek()).deep.equal("First");
  });
  it('Push second element', () => {
    stack.push("Second");
    expect(stack.size()).deep.equal(2);
    expect(stack.peek()).deep.equal("Second");
  })
  it('Pop one element', () => {
    expect(stack.pop()).deep.equal("Second");
    expect(stack.size()).deep.equal(1);
    expect(stack.peek()).deep.equal("First");
  })
  it("reach max size", () => {
    let smallStack = new Stack<string>(2);
    smallStack.push("One");
    smallStack.push("Twoo");
    expect(() => smallStack.push("Three")).throw("Stack has reached max capacity, you cannot add more items");
  })

});

function axiosGet(url: string, cb?: () => {}) {
  return axios.get(url);
}

describe("Async Tests", () => {
  it("Async test with callback", (done) => {
    axiosGet("http://httpbin.org/get?answer=Apple")
      .then((res: { data: { args: { answer: any; }; }; }) => {
        expect(res.data.args.answer).is.equal("Apple");
        done();
      }).catch((err: Error) => done(err))
  });

  it("Await ", async () => {
    const res = await axiosGet("http://httpbin.org/get?answer=Apple");
    expect(res.data.args.answer).is.equal("Apple");
  });

  it("get with rreturning promise", () => {
    return axiosGet("http://httpbin.org/get?answer=Apple")
      .then((res: { data: { args: { answer: any; }; }; }) => {
        expect(res.data.args.answer).is.equal("Apple");
      })
  })
});

describe("Fake Function", () => {
  it("Check call count", () => {
    let fake = sinon.fake();
    fake();
    expect(fake.callCount).is.equal(1);
  });
  it("Fake with custom behavior, return a number", () => {
    let fake = sinon.fake.returns(10);
    expect(fake()).is.equal(10);
    expect(fake.callCount).is.equals(1);
  });
  it("Fake that Throws an Error", () => {
    let error = new Error("Custom Error");
    let fake = sinon.fake.throws(error);
    expect(fake).to.throw(error);
  });
  it("Fake that ressolve Promiss", () => {
    let fake = sinon.fake.resolves("Apple");
    fake();
  });
  it("Replacement with fake", () => {
    let fake = sinon.fake.returns("Dog");
    sinon.replace(console, "log", fake);

    expect(console.log("Cat")).is.equal("Dog");
    sinon.restore();
  })

})

describe("Spies", () => {

  it("Spy as anonymous func", () => {
    const callback = sinon.spy();
    let signal = new Signal();
    signal.add(callback);

    signal.dispatch();

    expect(callback.calledOnce).is.true;
  });

  let myExternalLibrary = {
    getJSON(url: any) {
      return this.doNetworkCall({ url: url, dataType: "json" });
    },
    doNetworkCall(httpParams: { url: any; dataType: string; }) {
      return { result: 42 };
    },
  };
  describe("Spi wrap object ", () => {
    const sandbox = sinon.createSandbox();
    beforeEach(() => {
      sandbox.spy(myExternalLibrary);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("should inspect the external lib's usage of its internal methods", () => {

      const url = "https://jsonplaceholder.typicode.com/todos/1";
      myExternalLibrary.getJSON(url);

      expect((myExternalLibrary as any).getJSON.calledOnce).true;
      expect((myExternalLibrary as any).doNetworkCall.calledOnce).true;
      expect(url).is.equal((myExternalLibrary as any).doNetworkCall.getCall(0).args[0].url)

      expect("json").is.equal((myExternalLibrary as any).doNetworkCall.getCall(0).args[0].dataType);
    })
  });


  describe("Wrap Hash method", () => {
    const sandbox = sinon.createSandbox();
    let hashTable = new HashTable(100);
    let item = { key: "key", value: "value" };
    beforeEach(function () {
      sandbox.spy(hashTable, "hash");
    });

    afterEach(function () {
      sandbox.restore();
    });

    it("should inspect hash.hash method usage in hash.add", () => {
      hashTable.add(item.key, item.value);
      expect((hashTable as any).hash.calledOnce).true;
      expect(item.key).is.equal((hashTable as any).hash.getCall(0).args[0]);
    })
  })

  it("Wrap Getter and Setter", () => {
    let Obj = {
      _property: 0,
      get property() {
        return this._property;
      },
      set property(value) {
        this._property = value * 2;
      },
    };
    let spy = sinon.spy(Obj, "property", ["get", "set"]);
    Obj.property = 10;
    expect(spy.set.calledOnce).true;
    expect(Obj.property).is.equal(20);
    expect(spy.get.calledOnce).true;

  });

  it("Check if method has been called with specific arghs", () => {
    let arr = new Array();
    let spy = sinon.spy(arr, "push");

    arr.push(1);
    arr.push(2);

    expect(spy.withArgs(1).calledOnce).true;
    expect(spy.withArgs(2).calledOnce).true;
    expect(spy.withArgs(3).notCalled).true;
  })
});

describe("Stub", () => {
  it("on Calls, different behavior on each call", () => {
    const callback = sinon.stub();
    callback.onCall(0).returns(1);
    callback.onCall(1).returns(2);
    callback.returns(3);

  });

  it("on Calls, different behavior different arghuments in call", () => {
    let callback = sinon.stub();
    callback.withArgs(10).onFirstCall().returns(1);
    callback.withArgs(10).onSecondCall().returns(2);
    callback.returns(10);


    expect(callback(1)).is.equal(10);
    expect(callback(10)).is.equal(1);
    expect(callback(10)).is.equal(2);
  })

  it("reset stub behavior", () => {
    let stub = sinon.stub();
    stub.returns(100);
    expect(stub()).is.equals(100);

    stub.resetBehavior();
    expect(stub()).undefined;
  })
  it("stub call fake func", () => {
    let hashTable = new HashTable(100);

    sinon.stub(hashTable, "add").callsFake(() => {
      return "Fake Add";
    })

    expect(hashTable.add("key", "value")).is.equal("Fake Add");
  })

  it("Call original method when none of condition are mach", () => {
    let hashTable = new HashTable(100);

    sinon.stub(hashTable, "add").withArgs("key", "value").callsFake(() => {
      return "FAKE";
    });

    (hashTable as any).add.callThrough();

    expect(hashTable.add("key", "value")).is.equal("FAKE");
    hashTable.add("key2", "value2")
    expect(hashTable.get("key2")).deep.equal(["key2", "value2"]);
  })
})

describe("Mocks", () => {
  it("Mock verify", () => {

    let hash = new HashTable(100);
    let item = { key: "key", value: "value" };
    var hashMock = sinon.mock(hash);
    hashMock.expects("add").once().withArgs(item.key, item.value);

    hash.add(item.key, item.value);

    hashMock.verify();
  })

})
