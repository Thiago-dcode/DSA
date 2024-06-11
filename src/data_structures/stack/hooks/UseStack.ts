import { useEffect, useRef, useState } from "react";
import Stack from "../classes/Stack";

import { Primitive } from "../types";
import StackNode from "../classes/StackNode";
export const UseStack = () => {
  const [stack, setStack] = useState<Stack<Primitive> | null>(null);
  const [nodes, setNodes] = useState<StackNode<Primitive>[]>([]);
  const [isStackOverFlow, setIsStackOverFlow] = useState(false);
  const [isAnimationRunning, setAnimationRunning] = useState(false);
  const [action,setAction]= useState('');
  const push = (data:string) => {
    
    if (isAnimationRunning || stack == null) {
      return;
    }
    setIsStackOverFlow(false);
    if (nodes !== null && nodes?.length >= stack.getmaxSize()) {
      setIsStackOverFlow(true);
      return;
    }
    setAnimationRunning(true);
    stack.push(data);
    setNodes((prev)=>[...prev, stack.peekNode()]);
    setAction('push')
  };
  const pop = () => {
    if (isAnimationRunning || stack == null) {
      return;
    }

    setIsStackOverFlow(false);
    stack.pop();
    setAction('pop');
    setNodes((prev)=>[...stack?._getStack_()])
  
   ;
  };
  const flush = () => {
    if (stack == null) {
      return;
    }
    setIsStackOverFlow(false);
    stack.flush();
    setNodes([]);
  };
  useEffect(()=>{
if(action == 'pop'){
  setAnimationRunning(false)
}

  },[action])
  useEffect(() => {
    setStack(new Stack());
  }, []);

  const render = (action :string) => {
    if (!stack) return;
    
  };
  const onAnimationEnds = (e: React.AnimationEvent) => {
    console.log('ANIMATION')
    setAnimationRunning(false);
  };
  return {
    stack,
    render,
    action,
    nodes,
    push,
    pop,
    flush,
    isAnimationRunning,
    onAnimationEnds,
    isStackOverFlow,
    setAnimationRunning,
  };
};
