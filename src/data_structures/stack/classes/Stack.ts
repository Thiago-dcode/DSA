import StackNode from "./StackNode";
import { Primitive } from "../types";
export default class Stack<T extends Primitive> {
 

    private stack: StackNode<T>[] ;

     constructor(data:T[] = []){
        this.stack = [];
      data.forEach(ele => {
        this.stack.push(new StackNode<T>(ele))
      });
     }
     
     


     push(element : T) {
       
        this.stack.push(new StackNode(element));
    }
    pop(): T|undefined {
       return this.stack.pop()?.getData();
    }
    peek(): T|undefined{
      
        return   this.stack[this.size -1]?.getData();
    }
  
    
    get size() {
       
       return this.stack.length; 
    }
    _getStack_(){
        return this.stack;
    }
}