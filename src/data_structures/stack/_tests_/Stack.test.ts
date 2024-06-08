import { describe, expect, it } from 'vitest';

import StackNode from '../StackNode';
import Stack from '../Stack';
describe("Stack class test",()=>{

    it("Should initialize with a empty stack",()=>{
        const stack = new Stack();
        expect(stack._getStack_().length).toBe(0);
       

    })
    it("Should initialze with an array of StackNode",()=>{
     
        const data: number[] = [];
        for (let i = 0; i < 10; i++) {
            data.push(i); 
        }
        const stack = new Stack(data);
        for (let i = 0; i < data.length; i++) {
            expect(i).toBe(stack._getStack_()[i].getData());

        }

    })
    it("Should push",()=>{
     
        const stack = new Stack<number>();
        for (let i = 0; i < 1000; i++) {
            stack.push(i); 
        }
        for (let i = 0; i < stack._getStack_().length; i++) {
            expect(i).toBe(stack._getStack_()[i].getData());
        }
        

    })

    it("Should pop",()=>{
     
        const stack = new Stack<number>();
        for (let i = 0; i < 1000; i++) {
            stack.push(i); 
        }

        expect(stack.size).toBe(1000);

        for (let i = 999; i >= 0; i--) {
            expect(stack.pop()).toBe(i);
        }

        expect(stack.size).toBe(0);
      

        

    })
    it("Should peek",()=>{
     
        const stack = new Stack<number>();

        expect(stack.peek()).toBe(undefined);

        for (let i = 0; i < 1000; i++) {
            stack.push(i); 
        }

       expect(stack.peek()).toBe(999);

        

    })
})