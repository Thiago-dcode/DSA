import React, { forwardRef} from 'react'
import StackNode from '../classes/StackNode'
import { Primitive } from '../types'

type props = {

  node: StackNode<Primitive>,
  id: number,
  onAnimationEnds: (e: React.AnimationEvent) => void;
  
}
const StackNodeComponent = forwardRef<HTMLDivElement,props>(({ node, id,onAnimationEnds},ref) => {

  return (
   <>
  { node && <div   onAnimationEnd={(e) => {
      onAnimationEnds(e)
    }} ref={ref} id={`stackNode-${id}`} style={
      {
        animation: '',
        bottom: `${node.position}px`,
        height: `${StackNode.height}px`,

      }
    } className="stack-node text-center flex items-center justify-center overflow-auto">
      {node.getData()}
    </div>}
   
   </>
  )
})
export default StackNodeComponent;