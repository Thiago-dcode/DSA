import { useEffect, useState } from "react";
import Stack from "../classes/Stack";
import { Primitive } from "../../../../types";
import UseStackAnimation from "./UseStackAnimation";

export const UseStack = () => {
  const [stack, setStack] = useState<Stack<Primitive> | null>(null);
  const { handlePopAnimation, handlePeekAnimation, handlePushAnimation } =
    UseStackAnimation(stack);
  const [isStackOverFlow, setIsStackOverFlow] = useState(false);
  const [isAnimationRunning, setAnimationRunning] = useState(false);
  const push = (data: Primitive): Promise<boolean> => {
    return new Promise((resolve, reject) => {
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
        const ref = stack.peekNode()?.ref;
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
        const ref = stack.peekNode()?.ref;
        if (!ref) reject(false);
        else {
          setAnimationRunning(true);
          await handlePeekAnimation(ref, () => {
            setAnimationRunning(false);
            resolve(true);
          });
        }
      }
    });
  };
  const flushCallback = () => {
    setAnimationRunning(false);
    setIsStackOverFlow(false);
  };

  const onAnimationEnds = (
    e: AnimationEvent | React.AnimationEvent<HTMLDivElement>
  ) => {
    setAnimationRunning(false);
  };
  useEffect(() => {
    setStack(new Stack());
  }, []);

  return {
    stack,
    push,
    peek,

    pop,
    flushCallback,
    handlePushAnimation,
    isAnimationRunning,
    onAnimationEnds,
    isStackOverFlow,
    setAnimationRunning,
  };
};
