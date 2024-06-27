import React, {  useEffect, useRef, 
 } from 'react'
import { Primitive } from '../../../types'
import Node from '../_classes/Node';

type props = {

  node: Node<Primitive>,
  id: number,
  height: number,
  onAnimationEnds?: (e: AnimationEvent) => void;
  handlePushAnimation: (ele: HTMLDivElement | null, onAnimationEnds: (e: AnimationEvent) => void) => void;

}
const LinearNodeComponent = ({ node, height, id, onAnimationEnds = () => { }, handlePushAnimation }: props) => {

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
          bottom: `${node.position.y}px`,
          height: `${height}px`,

        }
      } className="linear-node text-center flex items-center justify-center overflow-auto rounded-lg">
        {node.data}
      </div>}

    </>
  )
}
export default LinearNodeComponent;