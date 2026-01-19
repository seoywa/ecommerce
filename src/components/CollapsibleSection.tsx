'use client';

import { ChevronDown, Divide } from "lucide-react";
import { ReactNode, useState } from "react";

export interface CollapsibleSectionProps {
  title: string, children?: ReactNode, defaultOpen?: boolean, rightMeta?: ReactNode, className?: string
}

import React from 'react'

const CollapsibleSection = ({
  title, children, defaultOpen = false, rightMeta, className=''
}: CollapsibleSectionProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className={`border-b border-light-100 ${className}`}>
      <button className='flex w-full items-center justify-between gap-4 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500]' onClick={() => setOpen(o => !o)}>
        <span className="text-body-medium text-dark-900">{title}</span>
        <span>
          {rightMeta}
          <ChevronDown className={`h-5 w-5 text-dark-900 transition-transform ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>

      {open && (
        <div className="pb-6">
          {children ? <div className="text-body text-dark-700">{children}</div> : null}
        </div>
      )}
    </section>
  )
}

export default CollapsibleSection