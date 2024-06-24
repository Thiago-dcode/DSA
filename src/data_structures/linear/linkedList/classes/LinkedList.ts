import { Primitive } from "@/types";
import LinkedListNode from "./LinkedListNode";
import Position from "@/lib/classes/Position";
import IndexOutOfBoundsError from "@/lib/errors/IndexOutOfTheBondError";

export default class LinkedList<T extends Primitive> {
  private _head: LinkedListNode<T> | null = null;
  private _tail: LinkedListNode<T> | null = null;
  private _size: number;
  constructor(data: T | T[] = []) {
    this._size = 0;
  }

  get(index: number): T | null {
    if (index === 0) {
      return this.getFirst();
    }
    if (index === this.size - 1) {
      return this.getLast();
    }
    const node = this.findNode(index);
    return node ? node.data : node;
  }
  getFirst(): T | null {
    if (!this.head) return null;
    return this.head?.data;
  }
  getLast(): T | null {
    if (!this.tail) return null;
    return this.tail?.data;
  }

  add(data: T, index: number = this._size) {
    const newNode = new LinkedListNode(data, new Position(0, 0));
    if (!this._head) {
      this._head = newNode;
      this._tail = newNode;
    } else {
      if (index === this._size) {
        this._addLast(newNode);
      } else if (index === 0) {
        this._addFirst(newNode);
      } else {
        const node = this.findNode(index);
        newNode.next = node;
        if (node?.prev) {
          newNode.prev = node.prev;
          node.prev.next = newNode;
          node.prev = newNode;
        }
      }
    }
    this._size++;
  }

  addFirst(data: T) {
    this._addFirst(new LinkedListNode(data, new Position(0, 0)));
    this._size++;
  }
  addLast(data: T) {
    this._addLast(new LinkedListNode(data, new Position(0, 0)));
    this._size++;
  }

  private _addFirst(node: LinkedListNode<T>) {
    node.next = this._head;
    if (!this._head) {
      this._head = node;
      this._tail = node;
      return;
    }
    if (this._head) {
      this._head.prev = node;
    }
    this._head = node;
  }
  private _addLast(node: LinkedListNode<T>) {
    node.prev = this.tail;
    if (!this._head) {
      this._head = node;
      this._tail = node;
      return;
    }
    if (this._tail) {
      this._tail.next = node;
    }
    this._tail = node;
  }

  delete(index: number) {
    if (index === 0) {
      this.deleteFirst();
      return;
    }
    if (index === this.size - 1) {
      this.deleteLast();
      return;
    } else {
      const node = this.findNode(index);
      if (node?.prev && node.next) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
      }
    }
    this._size--;
  }
  deleteFirst() {
    if (!this.head) return;
    this._head = this.head.next ? this.head.next : null;
    this._size--;
  }
  deleteLast() {
    if (!this._tail) return;
    this._tail = this._tail.prev ? this._tail.prev : null;
    this._size--;
  }
  private throwIfOutOfTheBounds(index: number, includesSize = true) {
    if (index < 0 || index > (includesSize ? this.size : this.size - 1)) {
      //throw error
      throw new IndexOutOfBoundsError(
        `Index: ${index} doesn't exist on linkedList.size: ${this.size}`
      );
    }
  }
  findNode(index: number) {
    this.throwIfOutOfTheBounds(index, false);
    let node: LinkedListNode<T> | null = null;
    if (this.isTail(index)) {
      let position = this._size - 1;
      node = this._tail;
      do {
        if (position == index) {
          break;
        }
        if (node) {
          node = node.prev;
        }
        position--;
      } while (position >= 0 || node);
    } else if (!this.isTail(index)) {
      let position = 0;
      node = this._head;
      do {
        if (position === index) {
          break;
        }
        if (node) {
          node = node.next;
        }
        position++;
      } while (position < this.size || node);
    }
    return node;
  }
  private isTail(index: number): boolean {
    if (index >= this._size) return true;
    return this._size - index < index;
  }
  get head() {
    return this._head;
  }
  get tail() {
    return this._tail;
  }

  get size() {
    return this._size;
  }
}
