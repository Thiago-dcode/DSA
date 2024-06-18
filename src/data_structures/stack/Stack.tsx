import Main from "../../components/container/Main";
import './style.css';
import { Button } from "@/components/ui/button";
import { UseStack } from "./hooks/UseStack";
import StackNodeComponent from "./components/StackNodeComponent";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import Info from "@/components/ui/info";
import { PopUp } from "@/components/ui/PopUp";
import { Wrench } from "lucide-react";
import { PopOverComponent } from "@/components/ui/PopOverComponent";
import StackConfig from "./components/StackConfig";
import UseAnimation from "./hooks/UseAnimation";
import { delay } from "@/lib/utils";
const Stack = () => {
  const { isFillingStack, stack, render, stop: handleStop, push, pop, flush, fillStack, emptyStack, isStackOverFlow, isAnimationRunning, onAnimationEnds } = UseStack();
  const { handleEntranceAnimation } = UseAnimation(stack);
  const [nodeData, setNodeData] = useState('');

  return (
    <>
      {stack && <Main>
        {<div className="border-2 border-white w-full flex items-center justify-between gap-2 p-4">
          <div className="flex  items-center gap-2 justify-center">


            <div className="flex max-w-sm items-center space-x-2">
              <Input defaultValue={nodeData} placeholder="let x = 50" className="text-black" onChange={(e) => {
                setNodeData(e.target.value)
              }} type="text" name="" id="" />
              <Button style={{
                opacity: isAnimationRunning || isFillingStack ? '0.4' : '1',
                cursor: isAnimationRunning || isFillingStack ? 'wait' : 'pointer'
              }} onClick={async () => {

                if (isFillingStack || isStackOverFlow) return;
                await push(nodeData || 'let x = 50');

              }} type="submit" className="bg-green-400  hover:bg-green-600" variant={"default"}>push</Button>
            </div>

            {stack._getStack_().length > 0 && <Button onClick={async () => {
              if (isFillingStack || isStackOverFlow) return;

              await pop();



            }} style={{
              opacity: isAnimationRunning || isFillingStack ? '0.4' : '1',
              cursor: isAnimationRunning || isFillingStack ? 'wait' : 'pointer'
            }} type="submit" className="bg-red-400  hover:bg-red-600" >pop</Button>}
          </div>
          <div className=" flex items-center gap-2">
            {isFillingStack && <Button style={{

            }} onClick={() => {
              handleStop()

            }} type="submit" className="bg-red-400  hover:bg-red-600" variant={"default"}>stop</Button>}
            <Button style={{
              opacity: isAnimationRunning || isFillingStack ? '0.4' : '1',
              cursor: isAnimationRunning || isFillingStack ? 'wait' : 'pointer'
            }} onClick={async () => {
              if (isFillingStack || isStackOverFlow) return;
              await fillStack();

              await emptyStack();


            }} type="submit" className="bg-blue-400  hover:bg-blue-600" variant={"default"}>run</Button>
          </div>
        </div>
        }
        <div className="flex  justify-between w-full px-4">
          <Info title="STACK" text={<>
            A stack is a <b>linear</b> data structure that follows the <b>Last In, First Out (LIFO)</b> principle. This means that <b>the last element added to the stack is the first one to be removed</b>. Stacks are commonly used in various algorithms and applications, such as managing function calls, undo mechanisms in software, and evaluating expressions.</>} className="self-start" />
          {!isStackOverFlow && !isFillingStack && !isAnimationRunning && <div>
            <PopOverComponent content={
              <StackConfig render={render} stack={stack} />
            } trigger={<Button><Wrench color="white" /></Button>} />
          </div>}

        </div>

        <div className=" w-full h-full flex items-center justify-center">

          <div style={
            {
              paddingTop: stack.nodeSpacing + 'px'
            }
          } className="border-l-8 border-r-8 border-b-8 rounded-b-lg border-white px-2">


            <div style={{
              height: `${(stack.nodeHeight + stack.nodeSpacing) * stack.maxSize}px`,
              width: `${stack.width}px`,


            }} className="relative" id="stack">

              {
                stack._getStack_().length > 0 && stack._getStack_().map((node, i) => {
                  return (
                    <StackNodeComponent onAnimationEnds={onAnimationEnds} handleEntranceAnimation={handleEntranceAnimation} height={stack.nodeHeight} key={'stackNode-' + i} node={node} id={i} />
                  )
                })
              }

            </div>
          </div>
          <PopUp title="StackOverFlowError" buttonText="dismiss" handleOnPopUpButton={() => {
            flush();
          }} open={isStackOverFlow} showTrigger={false} description={`A Stack overflow error has ocurred. Stack maximum size of ${stack.maxSize} exceeded.`} />
        </div>

      </Main>}
    </>
  )
}

export default Stack;