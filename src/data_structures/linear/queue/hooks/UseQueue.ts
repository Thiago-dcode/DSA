import { Primitive } from "@/types";
import React, { useEffect, useState } from "react";
import Queue from "../classes/Queue";
import "../../style.css";
import LinkedListNode from "../../linkedList/classes/LinkedListNode";
import { delay, getSpeed } from "@/lib/utils";
import UseQueueAnimation from "./UseQueueAnimation";

function UseQueue() {
  const [queue, setQueue] = useState<Queue<Primitive> | null>(null);
  const [isStackOverFlow, setIsStackOverFlow] = useState(false);
  const { dequeueAnimation, moveAnimation } = UseQueueAnimation(queue);
  const enqueue = (data: Primitive) => {
    if (!queue) return;
    if (queue.size >= queue?.maxSize) {
      setIsStackOverFlow(true);
      return;
    }
    queue?.enqueue(data);
  };
  const dequeue = async (callback = () => {}) => {
    if (!queue) return;
    const nodes = queue.toNodeArray;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (i === 0) {
      await dequeueAnimation(node.ref, () => {
          queue.dequeue();
        });
        continue;
      }
      console.log('HELLO?',i)
     moveAnimation(node.ref, i, () => {
        node.position.y = (queue.nodeHeight + queue.nodeSpacing) * (i - 1) + queue.nodeSpacing
      });
   
    }
  
    callback();
  };

  // const enqueue = async (data: Primitive) => {
  //   return new Promise((resolve, reject) => {
  //     if (queue && queue.size >= queue.maxSize) {
  //       setIsStackOverFlow(true);
  //       reject(false);
  //     }
  //     if (isAnimationRunning || !queue) {
  //       reject(false);
  //     } else {
  //
  //       queue?.enqueue(data);

  //       resolve(true);
  //     }
  //   });
  // };
  // const dequeue = async (): Promise<boolean> => {
  //   return new Promise(async (resolve, reject) => {
  //     if (
  //       queue == null ||
  //       queue.size <= 0 ||
  //       isAnimationRunning ||
  //       !queue.peekNode()
  //     ) {
  //       reject(false);
  //     } else {
  //       const ref = queue?.peekNode()?.ref?.current;
  //       console.log("DEQUEUE", queue?.toNodeArray);
  //       if (!ref) reject(false);
  //       else {
  //
  //         handlePopAnimation(ref, () => {
  //           ref.style.display = "none";
  //           queue.dequeue();
  //           setAnimationRunning(false);
  //           resolve(true);
  //         });
  //       }
  //     }
  //   });

  useEffect(() => {
    setQueue(new Queue());
  }, []);

  return {
    enqueue,
    queue,
    dequeue,

    isStackOverFlow,
    setIsStackOverFlow,
  };
}
export default UseQueue;
