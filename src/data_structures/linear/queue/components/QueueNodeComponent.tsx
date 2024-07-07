import { Primitive } from '@/types';
import {
    useCallback,
    useEffect, useMemo, useRef,
} from 'react'
import Node from '../../_classes/Node';
import LinearNodeComponent from '../../components/LinearNodeComponent';
import UseQueueAnimation from '../hooks/UseQueueAnimation';
import Queue from '../classes/Queue';
import { action } from '../type';
import { Action } from '@radix-ui/react-alert-dialog';
import LinkedListNode from '../../linkedList/classes/LinkedListNode';
type props = {

    node: LinkedListNode<Primitive>,
    id: number,
    height: number,
    action?: action,
    queue: Queue<Primitive>,
    setIsAnimationRunning: (bool: boolean) => void,
    trigger: any[]

}
const QueueNodeComponent = ({ node, height, id, action, queue, setIsAnimationRunning, trigger }: props) => {
    const { enqueueAnimation, dequeueAnimation } = UseQueueAnimation(queue)

    const handleRef = useCallback(async (element: HTMLElement | HTMLDivElement | null) => {

        if (!element) return
        node.ref = element;
        if (action === 'enqueue' && queue.size - 1 === id) {
            enqueueAnimation(node.ref, () => {
                setIsAnimationRunning(false)
            })

        }
        // if (action === 'dequeue') {

        //  dequeueAnimation(element, id, () => {
             
        //         if (id === 0) queue.dequeue();
        //         else {
        //             node.position.y = (queue.nodeHeight + queue.nodeSpacing) * (id - 1) + queue.nodeSpacing
        //         }
        //         setIsAnimationRunning(false)
        //         console.log('QUEUE.SIZE:',queue.size, 'ID:', id)
        //     })

        // }

    }, trigger)



    return (
        <LinearNodeComponent node={node} height={height} id={id} dsType={'queue'} ref={handleRef} />

    )
}
export default QueueNodeComponent;