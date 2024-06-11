import Main from "../../components/container/Main";
import './style.css';
import { Button } from "@/components/ui/button";
import { stackConfig } from "@/config";

import { UseStack } from "./hooks/UseStack";
import StackNodeComponent from "./components/StackNodeComponent";
import { useCallback, useEffect, useRef, useState } from "react";
import StackNode from "./classes/StackNode";
import { Input } from "@/components/ui/input";
const Stack = () => {
  const { isFillingStack, stack, nodes, action, push, pop, flush, fillStack, emptyStack, isStackOverFlow, isAnimationRunning, onAnimationEnds } = UseStack();
  const stackNodeRefs = useRef<HTMLDivElement[]>([])
  const [nodeData, setNodeData] = useState('');
  stackNodeRefs.current = [];
  const handleEntranceAnimation = useCallback((ref: HTMLDivElement) => {
    if (
      ref == null ||
      stack == null ||
      !stack.peekNode()
    ) {
      return;
    }

    ref.style.animationName = "add-node"
    ref.style.setProperty(
      "--start",
      `${stack?.getmaxSize() * StackNode.height}px`
    );
    ref.style.setProperty(
      "--end",
      `${stack?.peekNode().position}px`
    );
  }, [stack, nodes])

  const addToRef = (ele: HTMLDivElement | null) => {

    if (!ele) return;
    stackNodeRefs.current.push(ele)



  }
  useEffect(() => {

    if (isStackOverFlow) {
      window.alert('STACK OVERFLOW ERROR')
      flush();
    }


  }, [isStackOverFlow])
  useEffect(() => {

    if (action == 'push') { handleEntranceAnimation(stackNodeRefs.current[stackNodeRefs.current.length - 1]); }

  }, [nodes, action])

  return (
    <>
      {stack && <Main>
        {<div className="border-2 border-white w-full flex items-center justify-between gap-2 p-4">
          <div className="flex  items-center gap-10 justify-center">


            <div className="flex max-w-sm items-center space-x-2">
              <Input defaultValue={nodeData} placeholder="let x = 50" className="text-black" onChange={(e) => {
                setNodeData(e.target.value)
              }} type="text" name="" id="" />
              <Button style={{
                opacity: isAnimationRunning || isFillingStack ? '0.4' : '1',
                cursor: isAnimationRunning || isFillingStack ? 'wait' : 'pointer'
              }} onClick={async () => {
                if (isFillingStack) return;
                await push(nodeData || 'let x = 50');

              }} type="submit" className="bg-green-400  hover:bg-green-600" variant={"default"}>push</Button>
            </div>

            {nodes !== null && nodes.length > 0 && <Button onClick={async () => {
              if (isFillingStack) return;
              await pop(stackNodeRefs.current[nodes.length - 1]);



            }} style={{
              opacity: isAnimationRunning || isFillingStack ? '0.4' : '1',
              cursor: isAnimationRunning || isFillingStack ? 'wait' : 'pointer'
            }} type="submit" className="bg-red-400  hover:bg-red-600" >pop</Button>}
          </div>
          <div>
            <Button style={{
              opacity: isAnimationRunning || isFillingStack ? '0.4' : '1',
              cursor: isAnimationRunning || isFillingStack ? 'wait' : 'pointer'
            }} onClick={async () => {
              if (isFillingStack) return;
              await fillStack();
            
              await emptyStack(stackNodeRefs.current);


            }} type="submit" className="bg-blue-400  hover:bg-blue-600" variant={"default"}>run</Button>
          </div>
        </div>
        }


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
                nodes.length > 0 && nodes.map((node, i) => {
                  return (
                    <StackNodeComponent ref={(el) => {
                      addToRef(el)
                    }} key={'stackNode-' + i} onAnimationEnds={onAnimationEnds} node={node} id={i} />
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