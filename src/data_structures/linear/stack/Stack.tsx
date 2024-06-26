import Main from "../../../components/container/Main";
import './style.css';
import { Button } from "@/components/ui/button";
import { UseStack } from "./hooks/UseStack";
import StackNodeComponent from "./components/StackNodeComponent";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Info from "@/components/ui/info";
import { PopUp } from "@/components/ui/PopUp";
import { Wrench } from "lucide-react";
import { PopOverComponent } from "@/components/ui/PopOverComponent";
import StackConfig from "./components/StackConfig";
import UseAnimation from "./hooks/UseAnimation";
import Properties from "@/components/app/Properties";

const Stack = () => {
  const { isFillingStack, stack, _render, render, push, pop, peek, flush, fillStack, emptyStack, isStackOverFlow, isAnimationRunning, onAnimationEnds } = UseStack();
  const { handlePushAnimation } = UseAnimation(stack);
  const [nodeData, setNodeData] = useState('');
  const [properties, setProperties] = useState<{
    [key: string]: string
  }>({})
  useEffect(() => {
    if (!stack) return;
    setProperties({
      'size': stack.size + '',
      'isEmpty': stack.isEmpty.toString(),
      'isFull': stack.isFull.toString(),
      'Stack size': stack.maxSize + '',
    })

  }, [stack, isAnimationRunning, isStackOverFlow, isFillingStack, _render])
  return (
    <>
      {stack && <Main className="">

        {/* //ACTION BUTTONS: */}

        {<div className="border-2 border-white w-full flex items-center justify-between gap-1 p-4">
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

            {stack.size > 0 && <Button onClick={async () => {
              if (isFillingStack || isStackOverFlow) return;

              await pop();

            }} style={{
              opacity: isAnimationRunning || isFillingStack ? '0.4' : '1',
              cursor: isAnimationRunning || isFillingStack ? 'wait' : 'pointer'
            }} type="submit" className="bg-red-400  hover:bg-red-600" >pop</Button>


            }
            {stack.size > 0 && <Button style={{
              opacity: isAnimationRunning || isFillingStack ? '0.4' : '1',
              cursor: isAnimationRunning || isFillingStack ? 'wait' : 'pointer'
            }} onClick={async () => {
              if (isFillingStack || isStackOverFlow) return;
              await peek();

            }} type="submit" className="bg-yellow-400  hover:bg-yellow-600" variant={"default"}>peek</Button>
            } </div>
          <div className=" flex items-center gap-2">

            <Button style={{
              opacity: isAnimationRunning || isFillingStack ? '0.4' : '1',
              cursor: isAnimationRunning || isFillingStack ? 'wait' : 'pointer'
            }} onClick={async () => {
              if (isFillingStack || isStackOverFlow) return;
              await fillStack(0, stack.maxSize - stack.size);

              await emptyStack();


            }} type="submit" className="bg-blue-400  hover:bg-blue-600" variant={"default"}>run</Button>
          </div>
        </div>
        }
        {/* //STACK STATIC PROPERTIES: */}
        <Properties properties={properties} />

        {/* //EXTRA INFO AND CONFIG: */}
        <div className="flex  justify-between w-full px-4">
          <Info title="STACK" text={<article>
            <p>  A stack is <b>a linear data structure</b> that follows the <b>Last In, First Out (LIFO)</b> principle. This means that the last element added to the stack is the first one to be removed. Stacks are commonly used in various algorithms and applications, such as managing function calls, undo mechanisms in software, and evaluating expressions.</p>

            <h4 className="font-semibold py-2"> Key Operations of a Stack:</h4>

            <ul>

              <li>
                <b className="font-semibold text-green-400"> Push: </b>This operation <b>adds an element to the top of the stack</b>. When a new element is pushed onto the stack, it becomes the new top element. The previous top element is now just below the new top element. <br /><b>Time complexity: O(1).</b>
              </li>
              <br />
              <li>
                <b className="font-semibold text-red-400"> Pop: </b>This operation <b>removes and returns the top element of the stack</b>. Since the stack follows the LIFO principle, the element that was most recently added is the one that is removed. If the stack is empty, attempting to pop an element will usually result in an error or an undefined value. <br /><b>Time complexity: O(1).</b>
              </li>
              <br />
              <li> <b className="font-semibold text-yellow-400"> Peek: </b> This operation <b>returns the top element of the stack without removing it</b>. It allows you to inspect the element at the top of the stack without modifying the stack's state. This is useful when you need to see what the top element is without altering the stack. <br /><b>Time complexity: O(1).</b> </li>

            </ul></article>} className="self-start" />
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
                stack.size > 0 && stack.toNodeArray.map((node, i) => {
                  return (
                    <StackNodeComponent onAnimationEnds={onAnimationEnds} handlePushAnimation={handlePushAnimation} height={stack.nodeHeight} key={'stackNode-' + i} node={node} id={i} />
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