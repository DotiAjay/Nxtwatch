import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import VideoDetails from './components/videoPlayerItem'
import Gaming from './components/Gaming'
import ProtectedRoute from './components/ProtectedRoute'
import ReactContext from './ReactContext'
import Save from './components/Saved'
import './App.css'

// Replace your code here
class App extends Component {
  state = {lightTheme: true, savedList: []}

  OnchangeTheme = () => {
    console.log('call')
    this.setState(preState => ({lightTheme: !preState.lightTheme}))
  }

  getSaved = saveObj => {
    this.setState(preState => ({savedList: [...preState.savedList, saveObj]}))
  }

  render() {
    const {lightTheme, savedList} = this.state
    return (
      <ReactContext.Provider
        value={{
          lightTheme,
          savedList,
          changeTheme: this.OnchangeTheme,
          addVideoTosave: this.getSaved,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/videos/:id" component={VideoDetails} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/Saved" component={Save} />
        </Switch>
      </ReactContext.Provider>
    )
  }
}

export default App
