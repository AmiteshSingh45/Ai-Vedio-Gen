import React from 'react'
import  Header from './_components/Header'
import SideNavbar from './_components/SideNavbar'

function dashboardlayout ({children}){
  return (
    <div>
       <div className='hidden md:block h-screen bg-white fixed mt-[65px] w-78'>
          <SideNavbar/>
       </div>
        <Header/>
       <div className='md:ml-78 p-10'>
        {children}
        </div>
    </div>
  )
}

export default dashboardlayout