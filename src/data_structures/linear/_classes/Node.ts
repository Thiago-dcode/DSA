import { MutableRefObject } from "react";
import { Primitive } from "@/types";

export default class LinearNode<T extends Primitive> {
  private _data: T;
  private _ref: MutableRefObject<null | HTMLElement> | null;
  private _position: number;
  constructor(data: T, position: number, ref = null) {
    this._ref = ref;
    this._position = position;
    this._data = data;
    // (StackNode.height + StackNode.spacing) * this._index + StackNode.spacing;
  }

  // Getter for the value
  get data(): T {
    return this._data;
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
  set data(data: T) {
    this._data = data;
  }
}
