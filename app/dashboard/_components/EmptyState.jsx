import Link from 'next/link.js'
import { Button } from '../../../components/ui/button.jsx'
import React from 'react'
Button
function EmptyState() {
  return (
    <div className='p-5 py-24 flex items-center flex-col mt-10 border-2 border-dotted'>
        <h2>You don't have any short video created </h2>
        <Link href={'/dashboard/create-new'}>
        <Button className={' rounder-md cursor-pointer'}>Create New Short Video</Button>
        </Link>
    </div>
  )
}

export default EmptyState