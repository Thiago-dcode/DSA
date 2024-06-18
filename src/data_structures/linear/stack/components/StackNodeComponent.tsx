import React, { forwardRef, useEffect, useRef, useState } from 'react'
import StackNode from '../classes/StackNode'
import { Primitive } from '../../../../types'

type props = {

  node: StackNode<Primitive>,
  id: number,
  height: number,
  onAnimationEnds?: (e: AnimationEvent) => void;
  handlePushAnimation: (ele: HTMLDivElement | null, onAnimationEnds: (e: AnimationEvent) => void) => void;

}
const StackNodeComponent = ({ node, height, id, onAnimationEnds = () => { }, handlePushAnimation }: props) => {
  const [isReady, setIsReady] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref == null) return
    node.ref = ref;
    handlePushAnimation(ref.current, onAnimationEnds)
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