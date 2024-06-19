import { Primitive } from "@/types";
import LinearNode from "../../_classes/Node";

export default class QueueNode<T extends Primitive> extends LinearNode<T> {
  constructor(data: T, position: number, ref = null) {
    super(data, position, ref);
    // (StackNode.height + StackNode.spacing) * this._index + StackNode.spacing;
  }
}
