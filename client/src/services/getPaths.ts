import pathToRegexp from 'path-to-regexp'

const getPaths = (location) => {
  const re = pathToRegexp('/channels/:serverId/:channelId?')
  const paths = re.exec(location.pathname)

  return {
    location: paths[0],
    serverPath: paths[1],
    channelPath: paths[2]
  }
}

export default getPaths