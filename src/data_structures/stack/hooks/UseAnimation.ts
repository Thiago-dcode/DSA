import React, { useCallback } from "react";
import Stack from "../classes/Stack";
import { Primitive } from "../types";
import { getSpeed } from "@/lib/utils";

const UseAnimation = (stack: Stack<Primitive> | null) => {
  const handleEntranceAnimation = async (
    ref: HTMLDivElement | null,
    onAnimationEnds: ((e: AnimationEvent) => void) | null = null
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (ref == null || stack == null || !stack.peekNode()) {
        reject(false);
      } else {
        const animationDuration = getSpeed(stack.speed) + "s";
        if (ref.style.animationDuration !== animationDuration) {
          ref.style.animationDuration = animationDuration;
        }
        ref.style.setProperty("--start", `${stack?.beginner}px`);
        ref.style.setProperty("--end", `${stack?.peekNode().position}px`);
        ref.addEventListener("animationend", (e) => {
          if (onAnimationEnds) {
            onAnimationEnds(e);
          }
          resolve(true);
        });
      }
    });
  };
  const handleExitAnimation = async (
    ref: HTMLElement | null,
    onAnimationEnds: ((e: AnimationEvent) => void) | null = null
  ): Promise<boolean> => {
    return new Promise((res, rej) => {
      if (ref == null || stack == null || !stack.peekNode()) {
        rej(false);
      } else {
        ref.style.setProperty("--start", `${stack?.peekNode().position}px`);
        ref.style.setProperty(
          "--end",
          `${stack?.maxSize * stack.nodeHeight}px`
        );
        ref.style.animationDuration = getSpeed(stack.speed) + "s";
        ref.style.bottom = stack?.maxSize * stack.nodeHeight + "px";
        ref.style.animationName = "remove-node";
        ref.addEventListener("animationend", (e) => {
          if (onAnimationEnds) {
            onAnimationEnds(e);
          }
          res(true);
        });
      }
    });
  };

  return {
    handleEntranceAnimation,
    handleExitAnimation,
  };
};

export default UseAnimation;
