import { describe, expect, it } from "vitest";
import Queue from "../../classes/Queue";

describe("Testing Queue class", () => {
  it("Should initialize with a empty queue", () => {
    const queue = new Queue();
    expect(queue.size).toBe(0);
  });

  it("Should initialze with an array of StackNode", () => {
    const data: number[] = [];
    for (let i = 0; i < 10; i++) {
      data.push(i);
    }
    const queue = new Queue(data);
    for (let i = 0; i < data.length; i++) {
      expect(i).toBe(queue.toNodeArray[i].data);
    }
  });
  it("Should enqueue ", () => {
    const queue = new Queue<number>();
    queue.maxSize = 1000;
    for (let i = 0; i < queue.maxSize; i++) {
      queue.enqueue(i);
    }
    for (let i = 0; i < queue.toArray.length; i++) {
      expect(i).toBe(queue.toNodeArray[i].data);
    }
  });
});
