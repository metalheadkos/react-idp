import React, { createContext, useContext } from 'react'
import { useLocalObservable } from 'mobx-react'
import { RootStore } from './RootStore'

const StoreContext = (() => createContext(null))()

export function createStore() {
  return new RootStore()
}

// eslint-disable-next-line react/prop-types
export default function StoreProvider({ children }) {
  const store = useLocalObservable(createStore)
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.')
  }

  return store
}

export const useFormStore = () => useStore().formStore
export const useDataStore = () => useStore().dataStore
