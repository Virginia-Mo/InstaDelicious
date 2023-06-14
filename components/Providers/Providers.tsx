"use client"

import { SessionProvider } from 'next-auth/react'
import React from 'react'

interface ProvidersProps {
    children: React.ReactNode
}

const ProviderSession = ({children}: ProvidersProps) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default ProviderSession