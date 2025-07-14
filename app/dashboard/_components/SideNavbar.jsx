"use client"
import { CircleUser, FileVideo, PanelsTopLeft, ShieldPlus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function SideNavbar () {
  const menuoption = [
    {
      id: '1',
      name: 'Dashboard',
      path: '/dashboard',
      icon: PanelsTopLeft
    },
    {
      id: '2',
      name: 'Account',
      path: '/dashboard/account',
      icon: CircleUser
    },
    {
      id: '3',
      name: 'Upgrade',
      path: '/dashboard/upgrade',
      icon: ShieldPlus
    },
    {
      id: '4',
      name: 'Create New',
      path: '/dashboard/create-new',
      icon: FileVideo
    }
  ]

  const path = usePathname();

  return (
    <div className='w-78 h-screen shadow-md p-5'>
      <div className='grid gap-2'>
        {menuoption.map((item) => {
          const Icon = item.icon;
          const isActive = path === item.path;
          return (
            <Link href={item.path} key={item.id}>
              <div
                className={`flex items-center gap-2 mb-2 p-3 rounded-md cursor-pointer
                hover:bg-primary hover:text-white transition-colors
                ${isActive ? 'bg-primary text-white' : ''}`}
              >
                <Icon />
                <h2 className='capitalize'>{item.name}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SideNavbar;
 