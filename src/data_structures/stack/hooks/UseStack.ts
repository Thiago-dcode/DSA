import { useEffect, useState } from "react";
import Stack from "../classes/Stack";

import { Primitive } from "../types";

import { delay, getSpeed } from "@/lib/utils";

import UseAnimation from "./UseAnimation";

export const UseStack = () => {
  const [stack, setStack] = useState<Stack<Primitive> | null>(null);
  const { handleExitAnimation } = UseAnimation(stack);
  const [isStackOverFlow, setIsStackOverFlow] = useState(false);
  const [isAnimationRunning, setAnimationRunning] = useState(false);
  const [isFillingStack, setIsFillingStack] = useState(false);
  const [_render, setRender] = useState(false);
  const push = (data: string) => {
    if (stack == null || isAnimationRunning || isStackOverFlow) {
      return;
    }
    setIsStackOverFlow(false);
    if (stack.size >= stack.maxSize) {
      setIsStackOverFlow(true);
      return;
    }
    return new Promise((resolve, reject) => {
      if (!isAnimationRunning) {
        setAnimationRunning(true);
        stack.push(data);
        resolve(true);
      }
    });
  };
  const pop = async () => {
    if (
      stack == null ||
      isAnimationRunning ||
      !stack.peekNode() ||
      !stack.peekNode().ref
    ) {
      return;
    }
    const ref = stack.peekNode().ref?.current;
    if (!ref) return;
    setAnimationRunning(true);
    await handleExitAnimation(ref, () => {
      ref.style.display = "none";
      stack.pop();
      setAnimationRunning(false);
      render();
    });
  };
  const flush = () => {
    if (stack == null) {
      return;
    }
    setAnimationRunning(false);
    setIsStackOverFlow(false);
    stack.flush();
  };

  const fillStack = async () => {
    if (!stack) return;
    setIsFillingStack(true);

    const spaceRemaining = stack.maxSize - stack.size;
    for (let i = 0; i < spaceRemaining; i++) {
      await push("let foo = " + i);
      await delay(getSpeed(stack.speed) * 1000);
    }
    setIsFillingStack(false);
  };
  const emptyStack = async () => {
    if (!stack) return;
    setIsFillingStack(true);

    for (let i = stack?.maxSize - 1; i >= 0; i--) {
      await pop();
    }

    setIsFillingStack(false);
  };
  const stop = () => {
    console.log("stopping?");
  };
  const render = (clean = false) => {
    if (clean && stack != null && stack?.size > 0) {
      flush();
      return;
    }
    setRender((prev) => !prev);
  };
  const onAnimationEnds = (
    e: AnimationEvent | React.AnimationEvent<HTMLDivElement>
  ) => {
    setAnimationRunning(false);
  };
  useEffect(() => {
    // console.log(isAnimationRunning);
  }, [isAnimationRunning]);
  useEffect(() => {
    setStack(new Stack());
  }, []);

  return {
    stack,
    render,
    fillStack,
    emptyStack,
    push,
    stop,
    isFillingStack,
    pop,
    flush,
    isAnimationRunning,
    onAnimationEnds,
    isStackOverFlow,
    setAnimationRunning,
  };
};
