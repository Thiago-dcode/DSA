import { useEffect, useRef, useState } from "react";
import Stack from "../classes/Stack";

import { Primitive } from "../types";
import StackNode from "../classes/StackNode";
export const UseStack = () => {
  const [stack, setStack] = useState<Stack<Primitive> | null>(null);
  const [nodes, setNodes] = useState<StackNode<Primitive>[] | null>([]);
  const [isStackOverFlow, setIsStackOverFlow] = useState(false);
  const [isAnimationRunning, setAnimationRunning] = useState(false);
  const stackNodeRef = useRef<HTMLDivElement>(null);
  const push = () => {
    if (isAnimationRunning || stack == null) {
      return;
    }
    setIsStackOverFlow(false);
    if (nodes !== null && nodes?.length >= stack.getmaxSize()) {
      setIsStackOverFlow(true);
      return;
    }
    setAnimationRunning(true);
    stack.push("50");
    render("push");
  };
  const pop = () => {
    if (isAnimationRunning || stack == null) {
      return;
    }
    setIsStackOverFlow(false);
    stack.pop();
    render("pop");
  };
  const flush = () => {
    if (stack == null) {
      return;
    }
    setIsStackOverFlow(false);
    stack.flush();
    render("flush");
  };

  const render = (action: string) => {
    if (!stack) return;
    if (action == "push" || action == "flush") {
      console.log(stackNodeRef);
      setNodes((prev) => [...stack?._getStack_()]);
      //animation here;
    } else if (action == "pop") {
      //animation here;
      console.log(stackNodeRef);
      setNodes((prev) => [...stack?._getStack_()]);
    }
  };
  useEffect(() => {
    setStack(new Stack());
  }, []);

  useEffect(() => {
   
    if (
      stackNodeRef == null ||
      stackNodeRef.current == null ||
      stack == null ||
      !stack.peekNode()
    )
      return;
    stackNodeRef.current.style.setProperty(
      "--start",
      `${stack?.getmaxSize() * StackNode.height}px`
    );
    stackNodeRef.current.style.setProperty(
      "--end",
      `${stack?.peekNode().position}px`
    );
  }, [nodes]);
  const onAnimationEnds = (e: React.AnimationEvent) => {
    setAnimationRunning(false);
  };
  return {
    stack,
    render,
    nodes,
    push,
    pop,
    flush,
    isAnimationRunning,
    onAnimationEnds,
    isStackOverFlow,
    stackNodeRef,
  };
};
