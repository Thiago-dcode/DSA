import { describe, expect, it } from "vitest";
import LinkedList from "../../classes/LinkedList";
import Node from "@/data_structures/linear/_classes/Node";

describe("Testing LinkedList class", () => {
  it("should initilize with a 0 size", () => {
    const linkedList = new LinkedList();
    expect(linkedList.size).toBe(0);
  });
  it("Should create a head and a tail when linkedList is empty node", () => {
    const linkedList = new LinkedList();
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
    linkedList.add("hello");
    expect(linkedList.head).toBeInstanceOf(Node);
    expect(linkedList.head?.data).toBe("hello");
    expect(linkedList.tail).toBeInstanceOf(Node);
    expect(linkedList.tail?.data).toBe("hello");
  });
  it("Should add a element in the end", () => {
    const linkedList = new LinkedList();
    linkedList.add("hello"); //head and tail
    linkedList.add("world"); //tail
    expect(linkedList.tail?.data).toBe("world");
    expect(linkedList.head?.data).toBe("hello");
    expect(linkedList.head?.next?.data).toBe("world");
    expect(linkedList.tail?.prev?.data).toBe("hello");
    linkedList.add("bye");
    linkedList.add("hola");
    expect(linkedList.head?.next?.data).toBe("world");
    expect(linkedList.head?.next?.next?.data).toBe("bye");
    expect(linkedList.head?.next?.next?.prev?.data).toBe("world");
    expect(linkedList.head?.next?.next?.next?.data).toBe("hola");
    expect(linkedList.head?.next?.next?.next?.prev?.data).toBe("bye");
    expect(linkedList.tail?.data).toBe("hola");
    expect(linkedList.tail?.prev?.data).toBe("bye");
    expect(linkedList.size).toBe(4);
  });
  //TODO : testing add 
  it("Should add a element in the beginner when a index <= 0 is given", () => {
    const linkedList = new LinkedList();
    linkedList.add("hello"); //head and tail
    linkedList.add("world"); //tail
    linkedList.add("bye",0); 
    expect(linkedList.head?.data).toBe('bye')
    expect(linkedList.head?.next?.data).toBe('hello')
    expect(linkedList.head?.next?.prev?.data).toBe('bye')
    linkedList.add("hi",-1); 

  
  });
  it("Should add a element by given a index", () => {
    const linkedList = new LinkedList();
    linkedList.add("hello");
    linkedList.add("world");
    expect(linkedList.size).toBe(2);
    linkedList.add("bye", 1);
  });
  it("Should return the right side", () => {
    const linkedList = new LinkedList();
    for (let i = 0; i < 10; i++) {
      linkedList.add(i);
      expect(linkedList.tail?.data).toBe(i);
    }
    expect(linkedList.head?.data).toBe(0);
    expect(linkedList.size).toBe(10);
    expect(linkedList["isTail"](0)).toBeFalsy();
    expect(linkedList["isTail"](1)).toBeFalsy();
    expect(linkedList["isTail"](2)).toBeFalsy();
    expect(linkedList["isTail"](3)).toBeFalsy();
    expect(linkedList["isTail"](4)).toBeFalsy();
    expect(linkedList["isTail"](5)).toBeFalsy();
    expect(linkedList["isTail"](6)).toBeTruthy();
    expect(linkedList["isTail"](7)).toBeTruthy();
    expect(linkedList["isTail"](8)).toBeTruthy();
    expect(linkedList["isTail"](9)).toBeTruthy();
    expect(linkedList["isTail"](10)).toBeTruthy();
  });
});
