import React, { useCallback, useState } from "react";
import Stack from "../classes/Stack";
import { Primitive } from "../../../../types";
import { getSpeed } from "@/lib/utils";
const UseAnimation = (stack: Stack<Primitive> | null) => {
  const handlePushAnimation = async (
    ref: HTMLDivElement | null,
    onAnimationEnds: ((e: AnimationEvent) => void) | null = null
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (ref == null || stack == null || !stack.peekNode()) {
        reject(false);
      } else {
        const animationEvent = (e: AnimationEvent) => {
          if (onAnimationEnds) {
            onAnimationEnds(e);
          }
          ref.offsetHeight;
          ref.removeEventListener("animationend", animationEvent);
          resolve(true);
        };
        const animationDuration = getSpeed(stack.speed) + "s";
        if (ref.style.animationDuration !== animationDuration) {
          ref.style.animationDuration = animationDuration;
        }
        ref.style.setProperty("--start", `${stack?.beginner}px`);
        ref.style.setProperty("--end", `${stack?.peekNode()?.position.y}px`);
        ref.style.animationName = "add-node";
        ref.addEventListener("animationend", animationEvent);
      }
    });
  };
  const handlePopAnimation = async (
    ref: HTMLElement | null,
    onAnimationEnds: ((e: AnimationEvent) => void) | null = null
  ): Promise<boolean> => {
    return new Promise((res, rej) => {
      if (ref == null || stack == null || !stack.peekNode()) {
        rej(false);
      } else {
        const animationEvent = (e: AnimationEvent) => {
          if (onAnimationEnds) {
            onAnimationEnds(e);
          }
          ref.offsetHeight;
          res(true);
          ref.removeEventListener("animationend", animationEvent);
        };
        ref.style.setProperty("--start", `${stack?.peekNode()?.position.y}px`);
        ref.style.setProperty(
          "--end",
          `${stack?.maxSize * stack.nodeHeight}px`
        );
        ref.style.animationDuration = getSpeed(stack.speed) + "s";
        ref.style.bottom = stack?.maxSize * stack.nodeHeight + "px";
        ref.style.animationName = "remove-node";
        ref.addEventListener("animationend", animationEvent);
      }
    });
  };
  const handlePeekAnimation = async (
    ref: HTMLElement | null,
    onAnimationEnds: ((e: AnimationEvent) => void) | null = null
  ): Promise<boolean> => {
    return new Promise((res, rej) => {
      if (ref == null || stack == null || !stack.peekNode()) {
        rej(false);
      } else {
        const animationEvent = (e: AnimationEvent) => {
          if (onAnimationEnds) {
            onAnimationEnds(e);
          }
          ref.offsetHeight;
          res(true);
          ref.removeEventListener("animationend", animationEvent);
        };
        ref.style.animation = "peek-node";

        ref.style.animationDuration = 0.5 + "s";
        ref.addEventListener("animationend", animationEvent);
      }
    });
  };

  return {
    handlePushAnimation,
    handlePopAnimation,
    handlePeekAnimation,
  };
};

export default UseAnimation;
