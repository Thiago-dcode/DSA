import { Primitive } from "@/types";
import React, { useEffect, useState } from "react";
import Queue from "../classes/Queue";
import UseAnimation from "../../stack/hooks/UseAnimation";
import "../../style.css";
import LinkedListNode from "../../linkedList/classes/LinkedListNode";
import { delay } from "@/lib/utils";
import { resolve } from "path";

function UseQueue() {
  const [queue, setQueue] = useState<Queue<Primitive> | null>(null);
  const [isStackOverFlow, setIsStackOverFlow] = useState(false);
  const [isAnimationRunning, setAnimationRunning] = useState(false);
  const { handlePopAnimation } = UseAnimation(queue);
  const enqueue = (data: Primitive) => {
    if (!queue) return;
    if (queue.size >= queue?.maxSize) {
      setIsStackOverFlow(true);
      return;
    }
    queue?.enqueue(data);
    setAnimationRunning(true);
    setQueue((prev) => {
      return prev;
    });
  };
  const dequeue = async () => {
    const moveNode = async (node: LinkedListNode<Primitive>, i: number) => {
      await new Promise(async (resolve, reject) => {
        if (!queue) {
          reject(false);
        } else {
          const ref = node.ref;
          if (ref) {
            const event = () => {
              console.log("on animation ends");
              ref.style.animation = "none";
              ref.offsetHeight;

              ref.removeEventListener("animationend", event);
            };
            console.log("REF:", node.data, ref);
            ref.style.setProperty("--start", `${node.position.y}px`);
            ref.style.setProperty(
              "--end",
              `${
                (queue.nodeHeight + queue.nodeSpacing) * i + queue.nodeSpacing
              }px`
            );
            ref.style.animationName = `move-node-${queue.name}`;
            ref.addEventListener("animationend", event);
            resolve(true);
          } else {
            console.log("NO REF:", node.data, ref);
            reject(false);
          }
        }
      });
    };
    return new Promise(async (resolve, reject) => {
      if (!queue || !queue.peekNode() || queue.size <= 0) {
        reject(false);
      } else {
        setAnimationRunning(true);
        const ref = queue.peekNode()?.ref;

        // await handlePopAnimation(ref ? ref : null, () => {});

        const nodes = queue.toNodeArray;
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          console.log(nodes.length);
          if (i === 0) {
            if (ref && ref.id === `${queue.name}-node-${i}`) {
              ref.style.background = "red";
            }
            await delay(100);
            queue.dequeue();
          

            continue;
          }
          // await moveNode(node, i);

          await delay(50);
          node.position.y =
            (queue.nodeHeight + queue.nodeSpacing) * (i - 1) +
            queue.nodeSpacing;
        }

        await delay(50);

        setAnimationRunning(false);
        resolve(true);
      }
    });
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
  //       setAnimationRunning(true);
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
  //         setAnimationRunning(true);
  //         handlePopAnimation(ref, () => {
  //           ref.style.display = "none";
  //           queue.dequeue();
  //           setAnimationRunning(false);
  //           resolve(true);
  //         });
  //       }
  //     }
  //   });

  const onAnimationEnds = (
    e: AnimationEvent | React.AnimationEvent<HTMLDivElement>
  ) => {
    setAnimationRunning(false);
  };
  const flushCallback = () => {
    // setAnimationRunning(false);
    setIsStackOverFlow(false);
  };
  useEffect(() => {
    setQueue(new Queue());
  }, []);

  return {
    enqueue,
    isAnimationRunning,
    queue,
    dequeue,
    onAnimationEnds,
    //   // handlePushAnimation,
    isStackOverFlow,
    flushCallback,
  };
}
export default UseQueue;
