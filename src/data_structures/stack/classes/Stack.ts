import StackNode from "./StackNode";
import { Primitive, speed } from "../types";

export default class Stack<T extends Primitive> {
  private stack: StackNode<T>[];
  private _width: number;
  private _maxSize;
  private _nodeHeight: number;
  private _nodeSpacing: number;
  private _speed: speed;
  private _beginner: number;

  constructor(data: T[] = []) {
    this.stack = [];
    this._width = 350;
    this._maxSize = 10;
    this._nodeHeight = 50;
    this._nodeSpacing = 5;
    this._speed = 2;
    this._beginner = this.maxSize * this.nodeHeight;
    data.forEach((ele, i) => {
      this.stack.push(
        new StackNode<T>(
          ele,
          (this.nodeHeight + this.nodeSpacing) * this.size + this.nodeSpacing
        )
      );
    });
  }
  push(element: T) {
    if (this.size >= this.maxSize) {
      return;
    }
    this.stack.push(
      new StackNode(
        element,
        (this.nodeHeight + this.nodeSpacing) * this.size + this.nodeSpacing
      )
    );
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

  get nodeHeight() {
    return this._nodeHeight;
  }
  get nodeSpacing() {
    return this._nodeSpacing;
  }
  get size() {
    return this.stack.length;
  }
  get width() {
    return this._width;
  }
  set width(width: number) {
    if (width < 100 || width > 600) {
      return;
    }
    this._width = width;
  }
  get maxSize() {
    return this._maxSize;
  }
  set maxSize(max: number) {
    if (max < 1 || max > 30) {
      return;
    }
    this.beginner = max * this.nodeHeight;
    this._maxSize = max;
  }
  get speed() {
    return this._speed;
  }
  set speed(speed: speed) {
    if (speed < 1 || speed > 3) {
      return;
    }
    this._speed = speed;
  }
  get beginner() {
    return this._beginner;
  }
  set beginner(beginner: number) {
    this._beginner = beginner;
  }
  flush() {
    this.stack = [];
  }
  _getStack_() {
    return this.stack;
  }
}
