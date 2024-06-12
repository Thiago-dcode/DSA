import { useEffect, useRef, useState } from "react";
import Stack from "../classes/Stack";

import { Primitive } from "../types";
import StackNode from "../classes/StackNode";
import { delay } from "@/lib/utils";

export const UseStack = () => {
  const [stack, setStack] = useState<Stack<Primitive> | null>(null);
  const [nodes, setNodes] = useState<StackNode<Primitive>[]>([]);
  const [isStackOverFlow, setIsStackOverFlow] = useState(false);
  const [isAnimationRunning, setAnimationRunning] = useState(false);
  const [isFillingStack, setIsFillingStack] = useState(false);
  const [action, setAction] = useState("");
  const push = (data: string) => {
    if (stack == null || isAnimationRunning || isStackOverFlow) {
      return;
    }
    setIsStackOverFlow(false);
    if (nodes !== null && nodes?.length >= stack.getmaxSize()) {
      setIsStackOverFlow(true);
      return;
    }
    return new Promise((resolve, reject) => {
      if (!isAnimationRunning) {
        setAnimationRunning(true);
        stack.push(data);
        setNodes((prev) => [...prev, stack.peekNode()]);
        setAction("push");
        resolve(true);
      }
    });
  };
  const pop = async (ref: HTMLDivElement) => {
    if (stack == null || isAnimationRunning || !stack.peekNode() || !ref) {
      return;
    }

    return await new Promise((resolve, reject) => {
      if (!isAnimationRunning) {
        setAction("pop");
        setAnimationRunning(true);
        ref.style.setProperty("--start", `${stack?.peekNode().position}px`);
        ref.style.setProperty(
          "--end",
          `${stack?.getmaxSize() * StackNode.height}px`
        );

        ref.style.animationName = "remove-node";
        ref.style.bottom = stack?.getmaxSize() * StackNode.height + "px";

        ref.addEventListener("animationend", () => {
          ref.style.display = "none";
          console.log("ANIMATION POP");
          stack.pop();
          setNodes((prev) => [...stack?._getStack_()]);
          setAnimationRunning(false);
          resolve(true);
        });
      }
    });
  };
  const flush = () => {
    if (stack == null) {
      return;
    }
    setIsStackOverFlow(false);
    stack.flush();
    setNodes(() => []);
  };

  const fillStack = async () => {
    if (!stack || stack?.getmaxSize() - nodes?.length == 0) return;
    setIsFillingStack(true);

    for (let i = 0; i < stack?.getmaxSize() - nodes?.length; i++) {
      await push("let foo = " + i);
      await delay(500);
    }

    setIsFillingStack(false);
  };
  const emptyStack = async (refs: HTMLDivElement[]) => {
    if (!stack) return;
    setIsFillingStack(true);

    for (let i = refs.length - 1; i >= 0; i--) {
      await pop(refs[i]);
    }

    setIsFillingStack(false);
  };
  useEffect(() => {
    if (action == "pop") {
      setAnimationRunning(false);
    }
  }, [action]);
  useEffect(() => {
    setStack(new Stack());
  }, []);

  const render = (action: string) => {
    if (!stack) return;
  };
  const onAnimationEnds = (e: React.AnimationEvent) => {
    setAnimationRunning(false);
  };
  return {
    stack,
    render,
    action,
    nodes,
    fillStack,
    emptyStack,
    push,
    isFillingStack,
    pop,
    flush,
    isAnimationRunning,
    onAnimationEnds,
    isStackOverFlow,
    setAnimationRunning,
  };
};
