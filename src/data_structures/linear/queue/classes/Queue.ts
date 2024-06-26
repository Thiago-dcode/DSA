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
}
