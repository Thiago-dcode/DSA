import Main from "../../components/container/Main";
import './style.css';
import { Button } from "@/components/ui/button";
import { stackConfig } from "@/config";

import { UseStack } from "./hooks/UseStack";
import StackNodeComponent from "./components/StackNodeComponent";
import { useEffect, useRef, useState } from "react";
import StackNode from "./classes/StackNode";
const Stack = () => {
  const { stack, render, nodes, push, pop,flush, isStackOverFlow, isAnimationRunning, onAnimationEnds,stackNodeRef } = UseStack();




  useEffect(() => {

    if(isStackOverFlow){
      window.alert('STACK OVERFLOW ERROR')
      flush();
    }


  }, [isStackOverFlow])

  return (
    <>
      {stack && <Main>
        {<div className="border-2 border-white w-full flex gap-2">

          <Button style={{
            opacity: isAnimationRunning ? '0.4' : '1',
            cursor: isAnimationRunning ? 'wait' : 'pointer'
          }} onClick={() => {
            push();

          }} variant={"destructive"}>push</Button>
          {nodes !== null && nodes.length > 0 && <Button onClick={() => {
            pop();
          }} style={{
            opacity: isAnimationRunning ? '0.4' : '1',
            cursor: isAnimationRunning ? 'wait' : 'pointer'
          }} variant={"destructive"}>pop</Button>}
        </div>}


        <div className=" w-full h-full flex items-center justify-center">

          <div style={
            {
              paddingTop: stackConfig["button-space"] + 'px'
            }
          } className="border-8 border-white px-2">


            <div style={{
              height: `${(stackConfig.node.height + stackConfig["button-space"]) * stack.getmaxSize()}px`,
              width: `${stackConfig.stack.width}px`,


            }} className="relative" id="stack">

              {
                nodes && nodes.map((node, i) => {
                  return (
                    <StackNodeComponent key={'stackNode-' + i} onAnimationEnds={onAnimationEnds} myRef={stackNodeRef} node={node} id={i} />
                  )

                })
              }

            </div>
          </div>
        </div>

      </Main>}
    </>
  )
}

export default Stack;