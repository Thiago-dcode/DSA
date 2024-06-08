import { describe, expect, it } from 'vitest';

import StackNode from '../StackNode';
describe("StackNode class test",()=>{

    it("Should accept numbers",()=>{
        const node = new StackNode<number>(50);
        expect(node.getData()).toBe(50);
        node.setData(75);
        expect(node.getData()).toBe(75);

    })
    it("Should accept Strings",()=>{
        const node = new StackNode<string>("hello");
        expect(node.getData()).toBe("hello");
        node.setData("bye");
        expect(node.getData()).toBe("bye");

    })

})