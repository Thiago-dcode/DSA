import { Primitive } from '@/types';
import {
    useCallback,
    useEffect, useRef,
} from 'react'
import Node from '../../_classes/Node';
import LinearNodeComponent from '../../components/LinearNodeComponent';
type props = {

    node: Node<Primitive>,
    id: number,
    height: number,
    onAnimationEnds?: (e: AnimationEvent) => void;
    handlePushAnimation: (ele: HTMLElement | null, onAnimationEnds: (e: AnimationEvent) => void) => void;
    dsType?: 'queue' | 'stack',
    action?: 'add' | 'delete'
}
const StackNodeComponent = ({ node, height, id, onAnimationEnds = () => { }, handlePushAnimation, dsType = 'stack' }: props) => {
      const handleRef =  useCallback((element:HTMLDivElement|null) => {
        if (element== null) return
        node.ref = element;
        handlePushAnimation(node.ref, onAnimationEnds)
    }, [])

    return (
        <LinearNodeComponent node={node} height={height} id={id} dsType= {dsType} key={id}ref={handleRef}/>
     
    )
}
export default StackNodeComponent;