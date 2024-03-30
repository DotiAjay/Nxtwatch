import React from 'react'

const ReactContext = React.createContext({
  lightTheme: true,
  changeTheme: () => {},
  savedList: [],
  addVideoTosave: () => {},
})

export default ReactContext
