import React, { useState, useContext } from 'react'

const MainContext = React.createContext(null)

export const useMainState = () => useContext(MainContext)

const MainProvider = ({ children }) => {
  const [globalState, handleState] = useState({})

  return (
    <MainContext.Provider
      value={{
        ...globalState,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export default MainProvider