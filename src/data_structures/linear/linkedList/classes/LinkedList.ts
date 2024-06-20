import { Primitive } from "@/types";
import LinkedListNode from "./LinkedListNode";
import Node from "../../_classes/Node";
import Position from "@/lib/classes/Position";

export default class LinkedList<T extends Primitive> {
  private _head: LinkedListNode<T> | null = null;
  private _tail: LinkedListNode<T> | null = null;
  private _size: number;
  constructor(data: T | T[] = []) {
    this._size = 0;
  }
  add(data: T, index: number = this._size) {
    const newNode = new LinkedListNode(data, new Position(0, 0));
    if (!this._head) {
      this._head = newNode;
      this._tail = newNode;
    } else {
      if (index >= this._size) {
        //add at the end
        newNode.prev = this.tail;
        if (this._tail) {
          this._tail.next = newNode;
        }
        this._tail = newNode;
      } else if (index <= 0) {
        //add on the beginner;

        newNode.next = this._head;
        if (this._head) {
          this._head.prev = newNode;
        }
        this._head = newNode;
      } else if (this.isTail(index)) {
        //start looking for the position from the tail
      } else if (!this.isTail(index)) {
        //start looking for the position from the head
      }
    }
    this._size++;
  }
  private isTail(index: number): boolean {
    if (index >= this._size) return true;
    let right = this._size - index;
    return right < index;
  }
  get head() {
    return this._head;
  }
  get tail() {
    return this._tail;
  }
  private addRecusive(node: Node<T>) {}
  get size() {
    return this._size;
  }
}
