import Footer from '@/src/components/Footer'
import Navbar from '@/src/components/Navbar'
import React, { ReactNode } from 'react'

const RootLayout = ({ children }: {children: ReactNode}) => {
  return (
    <>
      <Navbar />
        {children}
      <Footer />
    </>
  )
}

export default RootLayout