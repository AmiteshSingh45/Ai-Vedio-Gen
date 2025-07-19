'use client'

import dynamic from 'next/dynamic'

// Dynamically import Header on the client side
const Header = dynamic(() => import('./Header'), { ssr: false })

export default function ClientHeaderWrapper() {
  return <Header />
}
