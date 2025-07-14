"use client"
import React, { useState } from 'react'
import { Button } from '../../components/ui/button.jsx'
import EmptyState from './_components/EmptyState.jsx';
import Link from 'next/link.js';
function dashboard(){
  const [videoList,setVideoList]=useState([]);
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-2xl text-primary'> Dashboard</h2>
        <Link href={'/dashboard/create-new'}>
        <Button className={'rounder-md cursor-pointer'} >+ Create New</Button>
        </Link>
      </div>
      {/* empty State */}
      {videoList?.length==0&&<div>
           <EmptyState/>
        </div>}
    </div>
  )
}

export default dashboard
