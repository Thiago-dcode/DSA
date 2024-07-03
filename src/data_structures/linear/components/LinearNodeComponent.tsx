import React, {
  useEffect, useRef,
} from 'react'
import { Primitive } from '../../../types'
import Node from '../_classes/Node';


type props = {

  node: Node<Primitive>,
  id: number,
  height: number,
  onAnimationEnds?: (e: AnimationEvent) => void;
  handlePushAnimation: (ele: HTMLElement | null, onAnimationEnds: (e: AnimationEvent) => void) => void;
  dsType?: 'queue' | 'stack'

}
const LinearNodeComponent = ({ node, height, id, onAnimationEnds = () => { }, handlePushAnimation, dsType = 'stack' }: props) => {

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current == null) return
    node.ref = ref.current;
    handlePushAnimation(node.ref, onAnimationEnds)
  }, [ref])
  return (
    <>
      {node && <div ref={ref} id={`${dsType}-node-${id}`} style={
        {
          top: dsType == 'queue' ? `${node.position.y}px` : '',
          bottom: dsType == 'stack' ? `${node.position.y}px` : '',
          height: `${height}px`,

        }
      } className="linear-node text-center flex items-center justify-center overflow-auto rounded-lg">
        {node.data}
      </div>}

    </>
  )
}
export default LinearNodeComponent;