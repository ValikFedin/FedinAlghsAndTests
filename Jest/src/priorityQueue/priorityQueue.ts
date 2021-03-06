import { BinaryHeap } from "./binaryHeap";
import { Item } from "./item";

export class PriorityQueue {
    heap: BinaryHeap;

    constructor(items: Item[]) {
        this.heap = new BinaryHeap(items);
    }

    public insert(item: Item): void {
        this.heap.insert(item);
    }

    public isEmpty(): boolean {
        return this.heap.size() == 0;
    }

    public peek(): Item {
        return this.heap.peek();
    }

    public pull(): Item {
        return this.heap.extract();
    }

    public show(): void {
        this.heap.show();
    }

}