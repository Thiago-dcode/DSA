import React, { useMemo, useState } from 'react'
import LinearDs from '../_classes/LinearDs'
import { Primitive } from '@/types'
import Properties from '@/components/app/Properties'

export default function PropertiesLinearDs({ linearDs,trigger }: {

    linearDs: LinearDs<Primitive>,
    trigger: any[]
}) {
    
    const setProperties = useMemo(() => {
        return {
            'size': linearDs.size + '',
            'isEmpty': linearDs.isEmpty.toString(),
            'isFull': linearDs.isFull.toString(),
            'Max size': linearDs.maxSize + '',
        }

    },trigger);

    return (

        <Properties properties={setProperties}/>
  )
}
