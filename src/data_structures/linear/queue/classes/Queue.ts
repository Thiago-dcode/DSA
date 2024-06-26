import { Primitive } from "@/types";
import LinearDs from "../../_classes/LinearDs";
import QueueNode from "./QueueNode";
import Position from "@/lib/classes/Position";

export default class Queue<T extends Primitive> extends LinearDs<T> {
  constructor(data: T[] = []) {
    super(data);
  }
  enqueue(data: T) {
    if (this.size >= this.maxSize) {
      return;
    }
    this.linkedList.addLast(
      data,
      new Position(
        0,
        (this.nodeHeight + this.nodeSpacing) * this.size + this.nodeSpacing
      )
    );
  }
  dequeue() {
    if (this.size <= 0) {
      return;
    }
    this.linkedList.deleteFirst();
  }
  peek() {
    return this.linkedList.getFirst();
  }
  peekNode() {
    return this.linkedList.findNode(0);
  }
}
