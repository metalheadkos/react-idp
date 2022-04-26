import React from 'react'
import './App.css'
import Weather from './components/Weather'
import StoreProvider from './store/store'

function App() {
  return (
    <StoreProvider>
      <Weather />
    </StoreProvider>
  )
}

export default App
