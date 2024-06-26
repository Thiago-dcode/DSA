import { Primitive, speed } from "@/types";
import LinearNode from "./Node";
import Position from "@/lib/classes/Position";
import LinkedList from "../linkedList/classes/LinkedList";

export default abstract class LinearDs<T extends Primitive> {
  protected linkedList: LinkedList<T>;
  private _width: number;
  private _maxSize;
  private _nodeHeight: number;
  private _nodeSpacing: number;
  private _speed: speed;
  private _beginner: number;

  constructor(data: T[] = []) {
    this.linkedList = new LinkedList<T>(data);
    this._width = 350;
    this._maxSize = 10;
    this._nodeHeight = 50;
    this._nodeSpacing = 5;
    this._speed = 2;
    this._beginner = this.maxSize * this.nodeHeight;
  }
  get isEmpty() {
    return this.size == 0;
  }
  get isFull() {
    return this.size == this.maxSize;
  }
  get nodeHeight() {
    return this._nodeHeight;
  }
  get nodeSpacing() {
    return this._nodeSpacing;
  }
  get size() {
    return this.linkedList.size;
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
    this.linkedList.clean();
  }
  get toArray() {
    return this.linkedList.toArray();
  }
  get toNodeArray() {
    return this.linkedList.toNodeArray();
  }
}
