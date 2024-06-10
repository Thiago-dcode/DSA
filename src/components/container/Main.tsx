import React from 'react'



export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className='main-container'>
        {children}
    </main>
  )
}
