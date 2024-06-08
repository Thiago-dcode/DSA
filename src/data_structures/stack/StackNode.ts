import { Primitive } from "./types";

export default class StackNode<T extends Primitive> {
   private data: T;


    constructor(data: T) {
        this.data = data;
    }
    
    // Getter for the value
    getData(): T {
        return this.data;
    }

    // Setter for the value
    setData(data: T) {
        this.data = data;
    }

    
}