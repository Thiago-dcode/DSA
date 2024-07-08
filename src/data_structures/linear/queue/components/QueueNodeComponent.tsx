import { Primitive } from '@/types';
import {
    useCallback,
    useEffect, useMemo, useRef,
} from 'react'
import Node from '../../_classes/Node';
import LinearNodeComponent from '../../_components/LinearNodeComponent';
import UseQueueAnimation from '../hooks/UseQueueAnimation';
import Queue from '../classes/Queue';
import { action } from '../type';
import { Action } from '@radix-ui/react-alert-dialog';
import LinkedListNode from '../../linkedList/classes/LinkedListNode';
type props = {

    node: LinkedListNode<Primitive>,
    id: number,
    height: number,
    queue: Queue<Primitive>,
    setIsAnimationRunning: (bool: boolean) => void,


}
const QueueNodeComponent = ({ node, height, id, queue, setIsAnimationRunning }: props) => {
    const { enqueueAnimation } = UseQueueAnimation(queue)

    const handleRef = useCallback(async (element: HTMLElement | HTMLDivElement | null) => {

        if (!element) return
        node.ref = element;
        if (queue.size - 1 === id) {
            enqueueAnimation(node.ref, () => {
                setIsAnimationRunning(false)
            })

        }


    }, [])



    return (
        <LinearNodeComponent node={node} height={height} id={id} dsType={'queue'} ref={handleRef} />

    )
}
export default QueueNodeComponent;