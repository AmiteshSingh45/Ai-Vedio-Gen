import React from 'react'
import SideNavbar from './_components/SideNavbar'
import ClientHeaderWrapper from './_components/ClientHeaderWrapper'

function dashboardlayout({ children }) {
  return (
    <div>
      <div className='hidden md:block h-screen bg-white fixed mt-[65px] w-78'>
        <SideNavbar />
      </div>
      <ClientHeaderWrapper />
      <div className='md:ml-78 p-10'>
        {children}
      </div>
    </div>
  )
}

export default dashboardlayout
