import React, { useState, useContext } from 'react'

const MainContext = React.createContext(null)

export const useMainState = () => useContext(MainContext)

const MainProvider = ({ children }) => {
  const [globalState, handleState] = useState({
    activeServer: null
  })

  const handleServerChange = (serverId) => handleState({
    ...globalState,
    activeServer: serverId
  })

  return (
    <MainContext.Provider
      value={{
        ...globalState,
        handleServerChange
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export default MainProvider