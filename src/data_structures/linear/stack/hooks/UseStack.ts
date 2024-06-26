import { useEffect, useState } from "react";
import Stack from "../classes/Stack";
import { delay, getSpeed } from "@/lib/utils";
import { Primitive } from "../../../../types";

import UseAnimation from "./UseAnimation";

export const UseStack = () => {
  const [stack, setStack] = useState<Stack<Primitive> | null>(null);
  const { handlePopAnimation, handlePeekAnimation } = UseAnimation(stack);
  const [isStackOverFlow, setIsStackOverFlow] = useState(false);
  const [isAnimationRunning, setAnimationRunning] = useState(false);
  const [isFillingStack, setIsFillingStack] = useState(false);
  const [_render, setRender] = useState(false);
  const push = (data: string) => {
    if (stack == null || isAnimationRunning || isStackOverFlow) {
      return;
    }
    console.log("STACK size:", stack.size);
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
      !stack.peekNode()?.ref
    ) {
      return;
    }
    // setStop(false);
    const ref = stack.peekNode()?.ref?.current;
    if (!ref) return;
    setAnimationRunning(true);
    await handlePopAnimation(ref, () => {
      ref.style.display = "none";
      stack.pop();
      render()
      setAnimationRunning(false);
    });
  };
  const peek = async () => {
    if (
      stack == null ||
      isAnimationRunning ||
      !stack.peekNode() ||
      !stack.peekNode()?.ref
    ) {
      return;
    }
    // setStop(false);
    const ref = stack.peekNode()?.ref?.current;
    if (!ref) return;
    setAnimationRunning(true);
    await handlePeekAnimation(ref, () => {});
    setAnimationRunning(false);
  };
  const flush = () => {
    if (stack == null) {
      return;
    }
    setIsFillingStack(false);
    setAnimationRunning(false);
    setIsStackOverFlow(false);
    stack.flush();
  };

  const fillStack = async (i = 0, spaceRemaining: number) => {
    if (!stack) return;
    console.log(stack.toNodeArray);
    setIsFillingStack(true);
    const _delay = getSpeed(stack.speed) * 1000;

    if (spaceRemaining <= i || isStackOverFlow) {
      setIsFillingStack(false);

      return;
    }
    i++;
    await push("let foo = " + i);
    await delay(_delay);
    await fillStack(i, spaceRemaining);
  };
  const emptyStack = async () => {
    if (!stack) {
      flush();
      return;
    }
    setIsFillingStack(true);

    for (let i = stack?.maxSize - 1; i >= 0; i--) {
      await pop();
    }

    setIsFillingStack(false);
  };
  // const stop = () => {
  //   console.log("stop");
  //   setStop(true);
  // };
  const render = (clean = false) => {
    if (clean && stack != null && stack?.size > 0) {
      flush();
    }
    setRender((prev) => !prev);
  };
  const onAnimationEnds = (
    e: AnimationEvent | React.AnimationEvent<HTMLDivElement>
  ) => {
    setAnimationRunning(false);
  };
  useEffect(() => {
    setStack(new Stack());
  }, []);
  // useEffect(() => {
  //   console.log("STOP: ?", _stop);
  // }, [_stop]);

  return {
    stack,
    render,
    fillStack,
    emptyStack,
    push,
    peek,
    _render,
    isFillingStack,
    pop,
    flush,
    isAnimationRunning,
    onAnimationEnds,
    isStackOverFlow,
    setAnimationRunning,
  };
};
