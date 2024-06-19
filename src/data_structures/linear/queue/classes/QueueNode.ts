import { Primitive } from "@/types";
import LinearNode from "../../_classes/Node";
import Position from "@/lib/classes/Position";

export default class QueueNode<T extends Primitive> extends LinearNode<T> {
  constructor(data: T, position: Position, ref = null) {
    super(data, position, ref);
    // (StackNode.height + StackNode.spacing) * this._index + StackNode.spacing;
  }
}
