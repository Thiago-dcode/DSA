import { Primitive } from "../types";

export default class StackNode<T extends Primitive> {
  private data: T;
  static readonly height = 70;
  static readonly spacing = 5;
  private _index: number = 0;
  private _position: number;
  constructor(data: T,index: number) {
    this._index = index;
    this._position =
      (StackNode.height + StackNode.spacing) * this._index + StackNode.spacing;
    this.data = data;
  }

  // Getter for the value
  getData(): T {
    return this.data;
  }
  get position() {
    return this._position;
  }
  get index(){
    return this._index
  }

  // Setter for the value
  setData(data: T) {
    this.data = data;
  }
}
