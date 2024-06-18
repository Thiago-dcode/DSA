import { MutableRefObject, useRef } from "react";
import { Primitive } from "../../../../types";

export default class StackNode<T extends Primitive> {
  private data: T;
  private _ref: MutableRefObject<null | HTMLElement> | null;
  private _position: number;
  constructor(data: T, position: number) {
    this._ref = null;
    this._position = position;
    this.data = data;
    // (StackNode.height + StackNode.spacing) * this._index + StackNode.spacing;
  }

  // Getter for the value
  getData(): T {
    return this.data;
  }
  get position() {
    return this._position;
  }
  get ref(): MutableRefObject<null | HTMLElement> | null {
    return this._ref;
  }
  set ref(ref: MutableRefObject<null | HTMLElement>) {
    this._ref = ref;
  }

  // Setter for the value
  setData(data: T) {
    this.data = data;
  }
}
