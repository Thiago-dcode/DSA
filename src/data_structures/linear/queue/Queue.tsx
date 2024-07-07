import { useEffect, useState } from 'react'
import UseQueue from './hooks/UseQueue'
import Properties from '@/components/app/Properties';
import Main from '@/components/container/Main';
import OperationsContainer from '@/components/container/OperationsContainer';
import { PopOverComponent } from '@/components/ui/PopOverComponent';
import { PopUp } from '@/components/ui/PopUp';
import { Button } from '@/components/ui/button';
import { Wrench } from 'lucide-react';
import Info from '@/components/ui/info';
import ButtonAction from '../components/ButtonAction';
import LinearDsContainer from '../components/LinearDsContainer';
import PushData from '../components/PushData';
import UseLinear from '../hooks/UseLinear';
import QueueNodeComponent from './components/QueueNodeComponent';
import PropertiesLinearDs from '../components/PropertiesLinearDs';
import { action } from './type';
import LinearDsConfig from '../components/LinearDsConfig';
export default function Queue() {

  const { enqueue, queue, dequeue, isStackOverFlow, setIsStackOverFlow } = UseQueue();
  const [action, setAction] = useState<action>('enqueue');
  const [isAnimationRunning, setAnimationRunning] = useState(false);
  const { isFilling, fill, _render, render, flush } = UseLinear(queue)
  const [nodeData, setNodeData] = useState('let x = 25')
  return (
    <>
      {queue && <Main className="">
        {/* //ACTION BUTTONS: */}
        {<OperationsContainer>
          <div className="flex  items-center gap-2 justify-center">
            <PushData data={nodeData} setData={setNodeData} onClick={async () => {
              if (isFilling || isAnimationRunning) return;
              if(action != 'enqueue')  setAction('enqueue')
              setAnimationRunning(true)
              enqueue(nodeData)

            }} isLoading={isFilling || isAnimationRunning} />
            {queue.size > 0 && <ButtonAction title="pop" className='bg-red-400 hover:bg-red-600' isLoading={isFilling || isAnimationRunning} onClick={async () => {
              // console.log('DEQUEUE', isAnimationRunning)
              if (isFilling || isStackOverFlow || isAnimationRunning) return;
              if(action != 'dequeue')  setAction('dequeue')
              setAnimationRunning(true);
              await dequeue(()=>{
              setAnimationRunning(false)
      
            })
        
            }} />
            }
            {queue.size > 0 && <ButtonAction title="peek" className='bg-yellow-400 hover:bg-yellow-600' isLoading={isAnimationRunning || isFilling} onClick={async () => {
              if (isFilling || isStackOverFlow || isAnimationRunning) return;
              await peek();

            }} />
            }
          </div>
          {/* <div className=" flex items-center gap-2">
            <ButtonAction title="run" className='bg-blue-400 hover:bg-blue-600' isLoading={isAnimationRunning || isFilling} onClick={async () => {
              if (isFilling || isStackOverFlow) return;
              await fill(0, stack.maxSize - stack.size, push);
              await empty(pop);

            }} />
          </div> */}
        </OperationsContainer>
        }
        {/* // STATIC PROPERTIES: */}
        <PropertiesLinearDs trigger={[isAnimationRunning, _render]} linearDs={queue} />

        {/* //EXTRA INFO AND CONFIG: */}
        <div className="flex  justify-between w-full px-4">
          <Info title="STACK" text={<article>
            <p>  A stack is <b>a linear data structure</b> that follows the <b>Last In, First Out (LIFO)</b> principle. This means that the last element added to the stack is the first one to be removed. Stacks are commonly used in various algorithms and applications, such as managing function calls, undo mechanisms in software, and evaluating expressions.</p>

            <h4 className="font-semibold py-2"> Key Operations of a Stack:</h4>

            <ul>

              <li>
                <b className="font-semibold text-green-400"> Push: </b>This operation <b>adds an element to the top of the stack</b>. When a new element is pushed onto the stack, it becomes the new top element. The previous top element is now just below the new top element. <br /><b>Time complexity: O(1).</b>
              </li>
              <br />
              <li>
                <b className="font-semibold text-red-400"> Pop: </b>This operation <b>removes and returns the top element of the stack</b>. Since the stack follows the LIFO principle, the element that was most recently added is the one that is removed. If the stack is empty, attempting to pop an element will usually result in an error or an undefined value. <br /><b>Time complexity: O(1).</b>
              </li>
              <br />
              <li> <b className="font-semibold text-yellow-400"> Peek: </b> This operation <b>returns the top element of the stack without removing it</b>. It allows you to inspect the element at the top of the stack without modifying the stack's state. This is useful when you need to see what the top element is without altering the stack. <br /><b>Time complexity: O(1).</b> </li>

            </ul></article>} className="self-start" />
          {!isStackOverFlow && !isFilling && !isAnimationRunning && <div>
            <PopOverComponent content={
              <LinearDsConfig render={render} stack={queue} />
            } trigger={<Button><Wrench color="white" /></Button>} />
          </div>}

        </div>

        <LinearDsContainer dsType='queue' linearDs={queue}>
          {
            queue.toNodeArray.map((node, i) => {
            
              return (
      
                <QueueNodeComponent  trigger={[]} setIsAnimationRunning={setAnimationRunning} queue={queue} action={action} height={queue.nodeHeight} key={`${queue.name}-node-${node.id}`} node={node} id={i} />
               
              )
            })
          }
        </LinearDsContainer>

        <PopUp title="StackOverFlowError" buttonText="dismiss" handleOnPopUpButton={() => {
          flush(() => {
            setAnimationRunning(false)
            setIsStackOverFlow(false)
          });
        }} open={isStackOverFlow} showTrigger={false} description={`A Stack overflow error has ocurred. Stack maximum size of ${queue.maxSize} exceeded.`} />


      </Main>}
    </>
  )
}
