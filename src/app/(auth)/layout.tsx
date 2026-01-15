import Image from 'next/image'
import React, { ReactNode } from 'react'

const AuthLayout = ({ children }: {children: ReactNode}) => {
  return (
    <main className='min-h-screen grid-cols-1 lg:grid-cols-2 grid'>
      <section className='hidden lg:flex flex-col justify-between bg-dark-900 text-light-100 p-10'>
        <div className='flex items-center'>
          <div className='inline-flex items-center justify-center h-8 w-8 rounded-md bg-orange'>
            <Image src={'/logo.svg'} alt='logo' width={20} height={20} />
          </div>
        </div>

        <div className='space-y-4'>
          <h2 className='text-heading-2'>Just Do It</h2>
          <p className='max-w-md text-lead text-light-300'>
            Join millions of athletes and fitness enthusiasts who trust Nike for their performance need.
          </p>
          <div className='flex gap-2' aria-hidden='true'>
            <span className='w-2 h-2 rounded-full bg-light-100/90' />
            <span className='w-2 h-2 rounded-full bg-light-100/50' />
            <span className='w-2 h-2 rounded-full bg-light-100/50' />
          </div>
        </div>

        <p className='text-footnote text-light-400'>2026 Nike. All Rights Reserved.</p>
      </section>

      <section className='flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md'>
          {children}
        </div>
      </section>
    </main>
  )
}

export default AuthLayout