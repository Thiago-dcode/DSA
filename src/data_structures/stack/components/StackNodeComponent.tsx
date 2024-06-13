import React, { forwardRef} from 'react'
import StackNode from '../classes/StackNode'
import { Primitive } from '../types'

type props = {

  node: StackNode<Primitive>,
  id: number,
  height: number,
  onAnimationEnds: (e: React.AnimationEvent) => void;
  
}
const StackNodeComponent = forwardRef<HTMLDivElement,props>(({ node,height, id,onAnimationEnds},ref) => {

  return (
   <>
  { node && <div   onAnimationEnd={(e) => {
      onAnimationEnds(e)
    }} ref={ref} id={`stackNode-${id}`} style={
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
})
export default StackNodeComponent;