import React, { useCallback, useState } from "react";
import Stack from "../classes/Stack";
import { Primitive } from "../../../../types";
import { getSpeed } from "@/lib/utils";
import LinearDs from "../../_classes/LinearDs";
const UseAnimation = (linearDs: LinearDs<Primitive> | null) => {
  var requestAnimation = function (
    ref: HTMLElement,
    animation: string,
    animationEvent: (e: AnimationEvent) => void
  ) {
    ref.style.animation = "none";
    window.requestAnimationFrame(function () {
      ref.style.animation = animation;
    });
    ref.addEventListener("animationend", animationEvent);
  };
  const handlePushAnimation = async (
    ref: HTMLElement | null,
    onAnimationEnds: ((e: AnimationEvent) => void) | null = null
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (ref == null || linearDs == null) {
        reject(false);
      } else {
        const animationEvent = (e: AnimationEvent) => {
          if (onAnimationEnds) {
            onAnimationEnds(e);
          }
          resolve(true);
          ref.removeEventListener("animationend", animationEvent);
        };
        ref.style.setProperty("--start", `${linearDs?.beginner}px`);
        ref.style.setProperty(
          "--end",
          `${linearDs?.currentNode()?.position.y}px`
        );
        requestAnimation(
          ref,
          `add-node-${linearDs.name} ${getSpeed(linearDs.speed) + "s"}`,
          animationEvent
        );
      }
    });
  };
  const handlePopAnimation = async (
    ref: HTMLElement | null,
    onAnimationEnds: ((e: AnimationEvent) => void) | null = null
  ): Promise<boolean> => {
    return new Promise((res, rej) => {
      if (ref == null || linearDs == null || !linearDs.currentNode()) {
        rej(false);
      } else {
        const animationEvent = (e: AnimationEvent) => {
          if (onAnimationEnds) {
            onAnimationEnds(e);
          }
          res(true);
          ref.removeEventListener("animationend", animationEvent);
        };
        ref.style.setProperty(
          "--start",
          `${linearDs?.peekNode()?.position.y}px`
        );
        ref.style.setProperty("--end", `${linearDs.beginner}px`);
        ref.style.bottom = linearDs.beginner + "px";
        requestAnimation(
          ref,
          `remove-node-${linearDs.name} ${getSpeed(linearDs.speed) + "s"}`,
          animationEvent
        );
      }
    });
  };
  const handlePeekAnimation = async (
    ref: HTMLElement | null,
    onAnimationEnds: ((e: AnimationEvent) => void) | null = null
  ): Promise<boolean> => {
    return new Promise((res, rej) => {
      if (ref == null || linearDs == null || !linearDs.currentNode()) {
        rej(false);
      } else {
        const animationEvent = (e: AnimationEvent) => {
          console.log("HELLO POP ANI END");
          if (onAnimationEnds) {
            onAnimationEnds(e);
          }
          res(true);
          ref.removeEventListener("animationend", animationEvent);
        };
        requestAnimation(ref, `peek-node ${0.5 + "s"}`, animationEvent);
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
