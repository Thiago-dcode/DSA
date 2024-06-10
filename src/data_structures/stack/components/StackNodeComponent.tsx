import React, { useRef } from 'react'
import StackNode from '../classes/StackNode'
import { Primitive } from '../types'

type props = {
    
    node: StackNode<Primitive>,
    id: number,
    myRef: React.Ref<HTMLDivElement>
    onAnimationEnds: (e:React.AnimationEvent)=>void;
}
const  StackNodeComponent =  ({node,id,myRef,onAnimationEnds}:props) => {
  const divRef = useRef<HTMLDivElement>();
  return (
    <div onAnimationEnd={(e)=>{
      onAnimationEnds(e)
    }} ref={myRef} id={`stackNode-${id}`} style={
        {
          animation:'',
          bottom: `${node.position}px`,
          height: `${StackNode.height}px`,

        }
      } className="stack-node">
        {node.getData()}
      </div>
  )
}
export default StackNodeComponent;