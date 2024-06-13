import { Primitive } from "../types";

export default class StackNode<T extends Primitive> {
  private data: T;
  
  private _position: number;
  constructor(data: T, position:number) {
   
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
 

  // Setter for the value
  setData(data: T) {
    this.data = data;
  }
}
