
'use client'

import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { store, Persistor } from '@/redux/store/store'
import { Provider } from 'react-redux';

const Layout2 = ({
  children
}: {
  children: React.ReactNode,
  session: any
}) => {
  return (
     <Provider store={store}>
      <PersistGate persistor={Persistor}>
        {children}
        </PersistGate>
        </Provider>
  )
}
export default Layout2
 
