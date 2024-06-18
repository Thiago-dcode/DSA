import React, { forwardRef, useEffect, useRef, useState } from 'react'
import StackNode from '../classes/StackNode'
import { Primitive } from '../types'

type props = {

  node: StackNode<Primitive>,
  id: number,
  height: number,
  onAnimationEnds?: (e: AnimationEvent) => void;
  handleEntranceAnimation: (ele: HTMLDivElement | null, onAnimationEnds: (e: AnimationEvent) => void) => void;

}
const StackNodeComponent = ({ node, height, id, onAnimationEnds = () => { }, handleEntranceAnimation }: props) => {
  const [isReady, setIsReady] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref == null) return
    node.ref = ref;
    handleEntranceAnimation(ref.current, onAnimationEnds)
  }, [ref])
  return (
    <>
      {node && <div ref={ref} id={`stackNode-${id}`} style={
        {
          animation: '',
          bottom: `${node.position}px`,
          height: `${height}px`,

        }
      } className="stack-node text-center flex items-center justify-center overflow-auto rounded-lg">
        {node.getData()}
      </div>}

    </>
  )
}
export default StackNodeComponent;