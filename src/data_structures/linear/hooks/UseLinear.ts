import React, { useState } from "react";
import LinearDs from "../_classes/LinearDs";
import { Primitive } from "@/types";
import { delay, getSpeed } from "@/lib/utils";

function UseLinear(linearDs: LinearDs<Primitive> | null) {
  const [isStackOverFlow, setIsStackOverFlow] = useState(false);
  const [isFilling, setIsFilling] = useState(false);
  const [_render, setRender] = useState(false);
  const flush = (callBack = () => {}) => {
    if (linearDs == null) {
      return;
    }
    setIsFilling(false);
    setIsStackOverFlow(false);
    linearDs.flush();
  };
  const fill = async (
    i = 0,
    spaceRemaining: number,
    callBackFiller: (data: Primitive) => Promise<boolean>
  ) => {
    if (!linearDs) return;
    console.log(linearDs.toNodeArray);
    setIsFilling(true);
    const _delay = getSpeed(linearDs.speed) * 1000;

    if (spaceRemaining <= i || isStackOverFlow) {
      setIsFilling(false);

      return;
    }
    i++;
    await callBackFiller("let foo = " + i);
    await delay(_delay);
    await fill(i, spaceRemaining, callBackFiller);
  };
  const render = (clean = false) => {
    if (clean && linearDs != null && linearDs?.size > 0) {
      flush();
    }
    setRender((prev) => !prev);
  };
  const empty = async (callBackEmptier: () => Promise<boolean>) => {
    setIsFilling(true);
    if (!linearDs) {
      flush();
      return;
    }
    if (linearDs.size <= 0) {
      setIsFilling(false);
      return;
    }
    await callBackEmptier();
    render();
   await empty(callBackEmptier);
  };
  return {
    render,
    _render,
    isFilling,
    fill,
    flush,
    empty
  };
}

export default UseLinear;
