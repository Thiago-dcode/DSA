import StackNode from "./StackNode";
import { Primitive } from "../types";
export default class Stack<T extends Primitive> {
  private stack: StackNode<T>[];
  private maxSize;
  constructor(data: T[] = [], maxSize = 20) {
    this.stack = [];
    this.maxSize = maxSize;
    data.forEach((ele, i) => {
      this.stack.push(new StackNode<T>(ele, i));
    });
  }
  push(element: T) {
    if (this.size >= this.maxSize) {
      window.alert("STACK OVERFLOW!");
      this.flush();
      return;
    }
    this.stack.push(new StackNode(element, this.size));
  }
  pop(): T | undefined {
    const node = this.stack.pop();
    return node?.getData();
  }
  peek(): T | undefined {
    return this.stack[this.size - 1]?.getData();
  }
  peekNode(): StackNode<Primitive> {
    return this.stack[this.size - 1];
  }

  get size() {
    return this.stack.length;
  }
  getmaxSize() {
    return this.maxSize;
  }
  setmaxSize(max: number) {
    if (max > 0 && max < 51) {
      this.maxSize = max;
    }
  }

  flush() {
    this.stack = [];
  }
  _getStack_() {
    return this.stack;
  }
}
