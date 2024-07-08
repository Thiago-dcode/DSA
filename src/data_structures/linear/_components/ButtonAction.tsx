import { Button } from '@/components/ui/button';
import { title } from 'process';
import React from 'react'
import { cn } from '@/lib/utils';

function ButtonAction({ isLoading, onClick, color = "red", title, className='' }: {
    isLoading: boolean,
    onClick: () => void,
    color?: "green" | "red" | "blue" | "yellow",
    title: string,
    className?:string

}) {
    return (
        <Button style={{
            opacity: isLoading ? '0.4' : '1',
            cursor: isLoading ? 'wait' : 'pointer'
        }} onClick={(e) => {
            onClick();
        }} type="submit" className={cn("",className)} variant={"default"}>{title}</Button>
    )
}

export default ButtonAction