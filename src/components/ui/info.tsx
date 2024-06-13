import { CalendarDays } from 'lucide-react'
import React from 'react'
import { Button } from './button'
import { HoverCard, HoverCardTrigger, HoverCardContent } from './hover-card'
import { InfoIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
export default function Info({className = '', size= 30,text,color= 'white',title,trigger =    <InfoIcon size={size} color={color} />
}:{
    className?: string,
    size?: number;
    text:  React.ReactNode;
    color?:string,
    trigger?: React.ReactNode;
    title: string
}) {
    return (
        <HoverCard  >
            <HoverCardTrigger asChild className={className}>
                <Button variant="link">
           {trigger}
                </Button>
            </HoverCardTrigger>
            <HoverCardContent className="md:w-[800px] w-[400px] ">
                <div className="flex flex-col w-full gap-2 items-center  ">

                    <h3 className="text-xl text-center font-semibold">{title}</h3>
                    <p className='text-lg font-mono text-justify p-2'>{text}</p>

                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
