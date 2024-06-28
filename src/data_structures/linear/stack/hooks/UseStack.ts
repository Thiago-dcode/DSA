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
  const push = (data: Primitive): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (stack == null || isAnimationRunning || isStackOverFlow) {
      }
      setIsStackOverFlow(false);
      if (stack && stack.size >= stack.maxSize) {
        setIsStackOverFlow(true);
        reject(false);
      }
      if (!isAnimationRunning && stack) {
        setAnimationRunning(true);
        stack.push(data);
        resolve(true);
      }
    });
  };
  const pop = async (): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      if (
        stack == null ||
        isAnimationRunning ||
        !stack.peekNode() ||
        !stack.peekNode()?.ref
      ) {
        reject(false);
      } else {
        // setStop(false);
        const ref = stack.peekNode()?.ref?.current;
        if (!ref) reject(false);
        else {
          setAnimationRunning(true);
          await handlePopAnimation(ref, () => {
            ref.style.display = "none";
            stack.pop();

            setAnimationRunning(false);
            resolve(true);
          });
        }
      }
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
    setAnimationRunning(false);
    setIsStackOverFlow(false);
    stack.flush();
  };

  // const stop = () => {
  //   console.log("stop");
  //   setStop(true);
  // };

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
    push,
    peek,

    pop,
    flush,
    isAnimationRunning,
    onAnimationEnds,
    isStackOverFlow,
    setAnimationRunning,
  };
};
