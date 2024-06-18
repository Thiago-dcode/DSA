import StackNode from "./StackNode";
import { Primitive, speed } from "../../../../types";
import LinearNode from "../../_classes/Node";
import LinearDs from "../../_classes/LinearDs";

export default class Stack<T extends Primitive> extends LinearDs<T> {
  constructor(data: T[] = []) {
    super(data);
  }
  push(element: T) {
    if (this.size >= this.maxSize) {
      return;
    }
    this.array.push(
      new StackNode(
        element,
        (this.nodeHeight + this.nodeSpacing) * this.size + this.nodeSpacing
      )
    );
  }
  pop(): T | undefined {
    const node = this.array.pop();
    return node?.data;
  }
  peek(): T | undefined {
    return this.array[this.size - 1]?.data;
  }
  peekNode(): StackNode<Primitive> {
    return this.array[this.size - 1];
  }
}
