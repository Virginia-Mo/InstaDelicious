'use client'

import './globals.css'
import { Provider } from 'react-redux';
import ProviderSession from '@/components/Providers/Providers'
import { PersistGate } from 'redux-persist/integration/react'
import { store, Persistor } from '@/redux/store/store'
import { Dancing_Script, Inter } from 'next/font/google';

const dancing = Dancing_Script({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dancing'})

const inter = Inter({ 
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '700'],
    variable: '--font-inter'})
  

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode,
  session: any
}) {
  return (
    
    <html lang="en" className={` ${inter.variable} ${dancing.variable} h-screen` }>
      <body className='h-screen' >
        <ProviderSession>
      <Provider store={store}>
      <PersistGate persistor={Persistor}>
        {children}
        </PersistGate>
        </Provider>
      </ProviderSession>
      <footer> <p className='text-center text-black'>CopyRights @ Virginia Mo</p></footer>
      </body>
    </html>
    
  )
}
