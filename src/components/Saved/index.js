import {Component} from 'react'
import SideBar from '../Sider'
import Header from '../Header'
import Contact from '../Contact'
import ReactContext from '../../ReactContext'
import SavedVideo from '../savedVideoItem'
import './index.css'

class Save extends Component {
  render() {
    return (
      <ReactContext.Consumer>
        {value => {
          const {lightTheme, savedList} = value

          return (
            <div>
              <Header />
              <div className="mainbg">
                <div className={lightTheme ? 'light' : 'darkTheme'}>
                  <SideBar />
                  <Contact />
                </div>
                <h1>Saved Videos</h1>
                {savedList.length !== 0 ? (
                  <div>
                    <ul>
                      {savedList.map(eachItem => (
                        <SavedVideo savedDetails={eachItem} key={eachItem.id} />
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="noSavedImgCard">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                      alt="no saved videos"
                      className="noSavedImg"
                    />
                    <h1>No saved videos found</h1>
                    <p>Save your videos by clicking a button</p>
                  </div>
                )}
              </div>
            </div>
          )
        }}
      </ReactContext.Consumer>
    )
  }
}
export default Save
