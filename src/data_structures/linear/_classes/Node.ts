import { MutableRefObject } from "react";
import { Primitive, Ref } from "@/types";
import Position from "@/lib/classes/Position";

export default class Node<T extends Primitive> {
  private _data: T;
  private _ref: Ref;
  private _position: Position;
  constructor(data: T, position: Position, ref: Ref = null) {
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
  get ref(): Ref {
    return this._ref;
  }
  set ref(ref: Ref) {
    this._ref = ref;
  }

  // Setter for the value
  set data(data: T) {
    this._data = data;
  }
}
