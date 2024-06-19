import { Primitive } from "@/types";
import LinearDs from "../../_classes/LinearDs";
import QueueNode from "./QueueNode";

export default class Queue<T extends Primitive> extends LinearDs<T> {
  constructor(data: T[] = []) {
    super(data);
  }

  enqueue(data: T) {
    if (this.size >= this.maxSize) {
      return;
    }
    super.array.push(new QueueNode(data, this.nodeHeight + this.nodeSpacing));
  }
}
