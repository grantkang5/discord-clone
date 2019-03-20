import React, { useState, useContext } from 'react'

const MainContext = React.createContext(null)

export const useChannelState = () => useContext(MainContext)

const ChannelsProvider = ({ children }) => {
  const [globalState, handleState] = useState({
    activeChannel: null,
    activeVoiceChannel: null
  })
  const handleActiveChannel = (channelId) => handleState({
    ...globalState,
    activeChannel: channelId
  })
  const handleActiveVoiceChannel = (voiceChannelId) => handleState({
    ...globalState,
    activeVoiceChannel: voiceChannelId
  })

  return (
    <MainContext.Provider
      value={{
        ...globalState,
        handleActiveChannel,
        handleActiveVoiceChannel
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export default ChannelsProvider