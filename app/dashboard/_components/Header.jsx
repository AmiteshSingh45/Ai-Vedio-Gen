"use client"
import React from 'react'
import Image from 'next/image'
import  {Button}  from '../../../components/ui/button.jsx'
import { UserButton } from '@clerk/nextjs'
function Header(){ 
  return (
    <div className='p-3 px-5 flex items-center justify-between shadow-md ' >
      <div className='flex gap-3 items-center'>
        <Image src='/logo.png' alt='logo' width={30} height={30}/>
      <h2 className='font-bold text-2xl'>Ai-Short Video</h2>
      </div>
      <div className='flex gap-4 items-center'>
        <Button>Dashboard</Button>
        <UserButton/>
      </div>
    </div>
  )
}

export default Header
